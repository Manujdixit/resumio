import {
  streamText,
  type UIMessage,
  convertToModelMessages,
  tool,
  type InferUITools,
  type UIDataTypes,
  stepCountIs,
} from "ai";
import { chatModel } from "@/app/constants/modals";
import { ResumeSchema, type ResumeType } from "@/app/schemas/ResumeSchema";
import { auth } from "@resumio/auth";
import { headers } from "next/headers";
import { db, schema } from "@resumio/db";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

const tools = {
  updateResume: tool({
    description: "Update the resume data based on user requests",
    inputSchema: ResumeSchema,
    execute: async (resumeData) => {
      return {
        success: true,
        message: "Resume updated successfully.",
        updatedResume: resumeData,
      };
    },
  }),

  updateTitle: tool({
    description: "Update the resume title based on user requests/response.",
    inputSchema: z.object({
      title: z.string().describe("The new resume title"),
    }),
    execute: async (resumeTitle) => {
      return {
        success: true,
        message: "Resume updated successfully.",
        updatedTitle: resumeTitle,
      };
    },
  }),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessages = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req: Request) {
  try {
    const {
      messages,
      currentResumeState,
      resumeId,
    }: {
      messages: ChatMessages[];
      currentResumeState: ResumeType;
      resumeId?: string;
    } = await req.json();

    // Get authenticated user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const result = streamText({
      model: chatModel,
      messages: convertToModelMessages(messages),
      system: `You are an expert resume builder AI. 
             
      Current resume data:
      ${JSON.stringify(currentResumeState, null, 2)}


      Job title: 
      1. If job title is not provided, ask user for it.
      2. If job title is provided, use 'updateTitle' tool to update it.
      3. ResumeTitle would be like- "User Name | Job Title".
      4. Dont tell about updating title to the user. Just show that you are asking to structure resume better.

      Instructions:
      1. Before calling 'updateResume' tool tell , user what changes you are making in a normal language.
      2. Help users update their resume by calling the 'updateResume' tool.
      3. ALWAYS call the tool if the user provides new information.
      4. AFTER calling the tool, the system will give you the result.
      5. ONCE you receive the tool result, you MUST generate a text response to the user.
      6. In that text response:
         - Confirm what you updated.
         - **Proactively ask for the next missing section.**
         - Example: "I've added your experience at Google. Now, tell me about your Education history?"

      Important:
      - NEVER make changes directly to the resume yourself. ALWAYS use the 'updateResume' tool to make any changes.
      - If the user provides information that is already present in the resume, do NOT call the tool again for that information. Instead, politely inform the user that the information is already included and ask for any new details they would like to add.
      - This ensures that the resume remains accurate and avoids unnecessary updates.
      - If the user asks for a new section, ask them to provide the details for that section.
      - Do not write too much text in your responses. Keep it short and precise.

      only ask for- Resume fields that are missing.
      `,
      tools,
      stopWhen: stepCountIs(5),
      onFinish: async ({ response }) => {
        // Handle database updates after tool calls
        if (resumeId && response.messages) {
          let currentResume = currentResumeState;

          for (const message of response.messages) {
            if (message.role === "assistant" && message.content) {
              // Check if message content is an array with tool call parts
              const content = Array.isArray(message.content)
                ? message.content
                : [message.content];

              for (const part of content) {
                if (
                  typeof part === "object" &&
                  part !== null &&
                  "type" in part &&
                  part.type === "tool-call" &&
                  "toolName" in part &&
                  part.toolName === "updateTitle" &&
                  "input" in part &&
                  part.input &&
                  typeof part.input === "object" &&
                  "title" in part.input
                ) {
                  try {
                    // Update the title in the database
                    await db
                      .update(schema.resume)
                      .set({
                        title: part.input.title as string,
                        updatedAt: new Date(),
                      })
                      .where(
                        and(
                          eq(schema.resume.id, resumeId),
                          eq(schema.resume.userId, session.user.id)
                        )
                      );
                  } catch (error) {
                    console.error("Error updating title in database:", error);
                  }
                } else if (
                  typeof part === "object" &&
                  part !== null &&
                  "type" in part &&
                  part.type === "tool-call" &&
                  "toolName" in part &&
                  part.toolName === "updateResume" &&
                  "input" in part &&
                  part.input &&
                  typeof part.input === "object"
                  // &&  "title" in part.input
                ) {
                  try {
                    currentResume = {
                      ...currentResume,
                      ...(part.input as ResumeType),
                    };

                    await db
                      .update(schema.resume)
                      .set({
                        content: currentResume,
                        updatedAt: new Date(),
                      })
                      .where(
                        and(
                          eq(schema.resume.id, resumeId),
                          eq(schema.resume.userId, session.user.id)
                        )
                      );
                  } catch (error) {
                    console.error("Error updating resume in database:", error);
                  }
                }
              }
            }
          }
        }
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
