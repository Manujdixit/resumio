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
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessages = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req: Request) {
  try {
    const {
      messages,
      currentResumeState,
    }: {
      messages: ChatMessages[];
      currentResumeState: ResumeType;
    } = await req.json();
    const result = streamText({
      model: chatModel,
      messages: convertToModelMessages(messages),
      system: `You are an expert resume builder AI. 
             
      Current resume data:
      ${JSON.stringify(currentResumeState, null, 2)}

      Instructions:
      1. Help users update their resume by calling the 'updateResume' tool.
      2. ALWAYS call the tool if the user provides new information.
      3. AFTER calling the tool, the system will give you the result.
      4. ONCE you receive the tool result, you MUST generate a text response to the user.
      5. In that text response:
         - Confirm what you updated.
         - **Proactively ask for the next missing section.**
         - Example: "I've added your experience at Google. Now, tell me about your Education history?" or "Do you have any certifications to add?"
      `,
      tools,
      stopWhen: stepCountIs(5),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
