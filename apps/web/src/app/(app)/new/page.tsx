"use client";

import { useRouter } from "next/navigation";
import { useCreateResume } from "@/hooks/use-resumes";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

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
    <div className="flex flex-col h-full">
      {/* Header with sidebar trigger */}
      <div className="md:hidden h-14 flex items-center px-4 border-b border-border shrink-0">
        <SidebarTrigger />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl space-y-8">
          {/* Greeting */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Resumio AI</h1>
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
