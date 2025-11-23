"use client";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
  MessageActions,
  MessageAction,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import { useResumeStore } from "@/store/useResumeStore";
import { Shimmer } from "../ai-elements/shimmer";

const Chat = ({ resumeId }: { resumeId?: string }) => {
  const [input, setInput] = useState("");
  const { resumeData, updateContent, updateTitle } = useResumeStore();

  const { messages, sendMessage, status, regenerate } = useChat({
    onToolCall: ({ toolCall }) => {
      if (toolCall.toolName === "updateResume") {
        // @ts-expect-error - input is not in the type definition but present in runtime
        const args = toolCall.args ?? toolCall.input;
        updateContent(args);
      }
      if (toolCall.toolName === "updateTitle") {
        // @ts-expect-error - input is not in the type definition but present in runtime
        const args = toolCall.args ?? toolCall.input;
        updateTitle(args);
      }
    },
  });

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);
    if (!(hasText || hasAttachments)) {
      return;
    }
    (sendMessage as any)(
      {
        text: message.text || "Sent with attachments",
        files: message.files,
      },
      {
        body: {
          currentResumeState: resumeData?.content,
          resumeId,
        },
      }
    );
    setInput("");
  };
  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full max-h-screen">
      <div className="flex flex-col h-full">
        <Conversation className="h-full">
          <ConversationContent>
            {messages.map((message) => (
              <div key={message.id}>
                {message.role === "assistant" &&
                  message.parts.filter((part) => part.type === "source-url")
                    .length > 0 && (
                    <Sources>
                      <SourcesTrigger
                        count={
                          message.parts.filter(
                            (part) => part.type === "source-url"
                          ).length
                        }
                      />
                      {message.parts
                        .filter((part) => part.type === "source-url")
                        .map((part, i) => (
                          <SourcesContent key={`${message.id}-${i}`}>
                            <Source
                              key={`${message.id}-${i}`}
                              href={part.url}
                              title={part.url}
                            />
                          </SourcesContent>
                        ))}
                    </Sources>
                  )}
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <Message key={`${message.id}-${i}`} from={message.role}>
                          <MessageContent>
                            <MessageResponse>{part.text}</MessageResponse>
                          </MessageContent>
                          {message.role === "assistant" &&
                            i === messages.length - 1 && (
                              <MessageActions>
                                <MessageAction
                                  onClick={() => regenerate()}
                                  label="Retry"
                                >
                                  <RefreshCcwIcon className="size-3" />
                                </MessageAction>
                                <MessageAction
                                  onClick={() =>
                                    navigator.clipboard.writeText(part.text)
                                  }
                                  label="Copy"
                                >
                                  <CopyIcon className="size-3" />
                                </MessageAction>
                              </MessageActions>
                            )}
                        </Message>
                      );
                    // case "reasoning":
                    //   return (
                    //     <Reasoning
                    //       key={`${message.id}-${i}`}
                    //       className="w-full"
                    //       isStreaming={
                    //         status === "streaming" &&
                    //         i === message.parts.length - 1 &&
                    //         message.id === messages.at(-1)?.id
                    //       }
                    //     >
                    //       <ReasoningTrigger />
                    //       <ReasoningContent>{part.text}</ReasoningContent>
                    //     </Reasoning>
                    //   );
                    default:
                      return null;
                  }
                })}
              </div>
            ))}
            {status === "submitted" && (
              <Shimmer duration={4}>Generating</Shimmer>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
        <PromptInput
          onSubmit={handleSubmit}
          className="mt-4 border-2"
          globalDrop
          multiple
        >
          <PromptInputHeader>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
          </PromptInputHeader>
          <PromptInputBody>
            <PromptInputTextarea
              placeholder="Lets build your resume!"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>
            </PromptInputTools>
            <PromptInputSubmit disabled={!input && !status} status={status} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
};
export default Chat;
