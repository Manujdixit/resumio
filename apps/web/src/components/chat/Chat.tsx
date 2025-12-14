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
import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { CopyIcon, RefreshCcwIcon, Loader2Icon } from "lucide-react";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import { useResumeStore } from "@/store/useResumeStore";
import { Shimmer } from "../ai-elements/shimmer";
import { cn } from "@/lib/utils";

const Chat = ({
  resumeId,
  className,
}: {
  resumeId?: string;
  className?: string;
}) => {
  const [input, setInput] = useState("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const { resumeData, updateContent, updateTitle } = useResumeStore();
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingMessageSent = useRef(false);

  const { messages, sendMessage, status, regenerate, setMessages } = useChat({
    onToolCall: ({ toolCall }) => {
      if (toolCall.toolName === "updateResume") {
        // @ts-expect-error - input is not in the type definition but present in runtime
        const args = toolCall.args ?? toolCall.input;
        updateContent(args);
      }
      if (toolCall.toolName === "updateTitle") {
        // @ts-expect-error - input is not in the type definition but present in runtime
        const args = toolCall.args ?? toolCall.input;
        updateTitle(args.title);
      }
    },
  });

  // Load saved chat messages on mount
  useEffect(() => {
    const loadChatHistory = async () => {
      if (!resumeId) return;

      setIsLoadingHistory(true);
      try {
        const response = await fetch(`/api/chat/messages?resumeId=${resumeId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages);
          }
        }
      } catch (error) {
        console.error("Failed to load chat history:", error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    loadChatHistory();
  }, [resumeId, setMessages]);

  // Handle pending message from /new page
  useEffect(() => {
    if (!resumeId || isLoadingHistory || pendingMessageSent.current) return;

    const pendingMessage = sessionStorage.getItem("pendingMessage");
    if (pendingMessage) {
      sessionStorage.removeItem("pendingMessage");
      pendingMessageSent.current = true;

      // Send the pending message
      (sendMessage as any)(
        { text: pendingMessage },
        {
          body: {
            currentResumeState: resumeData?.content,
            resumeId,
          },
        }
      );
    }
  }, [resumeId, isLoadingHistory, resumeData?.content, sendMessage]);

  // Save messages when they change (debounced)
  useEffect(() => {
    if (!resumeId || messages.length === 0 || isLoadingHistory) return;

    // Clear any pending save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce save by 1 second
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await fetch("/api/chat/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeId, messages }),
        });
      } catch (error) {
        console.error("Failed to save chat messages:", error);
      }
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [messages, resumeId, isLoadingHistory]);

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

  if (isLoadingHistory) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2Icon className="size-6 animate-spin" />
          <span className="text-sm">Loading chat history...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("h-full flex flex-col p-4", className)}>
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
          {status === "submitted" && <Shimmer duration={4}>Generating</Shimmer>}
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
  );
};
export default Chat;
