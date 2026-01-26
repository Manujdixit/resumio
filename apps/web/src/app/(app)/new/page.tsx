"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useCreateResume } from "@/hooks/use-resumes";

export default function NewPage() {
  const router = useRouter();
  const createResumeMutation = useCreateResume();
  const [input, setInput] = useState("");

  const handleSubmit = async (message: PromptInputMessage) => {
    if (!message.text?.trim()) return;

    // Create a new resume and redirect to chat
    const newResume = await createResumeMutation.mutateAsync("Untitled Resume");

    // Store the initial message to send after redirect
    sessionStorage.setItem("pendingMessage", message.text);

    router.push(`/chat/${newResume.id}`);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header with sidebar trigger */}
      <div className="flex h-14 shrink-0 items-center border-border border-b px-4 md:hidden">
        <SidebarTrigger />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl space-y-8">
          {/* Greeting */}
          <div className="space-y-2 text-center">
            <h1 className="font-bold text-3xl text-foreground">
              resumebuild.cv
            </h1>
            <p className="text-muted-foreground">
              Let's build your professional resume together
            </p>
          </div>

          {/* Prompt Input */}
          <PromptInput onSubmit={handleSubmit} className="border-2">
            <PromptInputBody>
              <PromptInputTextarea
                placeholder="Tell me about yourself to get started..."
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
            </PromptInputBody>
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit
                disabled={!input.trim() || createResumeMutation.isPending}
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
}
