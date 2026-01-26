"use client";

import { Bot, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useResumeStore } from "@/store/useResumeStore";

export type EditorMode = "chat" | "form";

interface ModeSelectorProps {
  mode: EditorMode;
  onModeChange: (mode: EditorMode) => void;
  className?: string;
}

export function ModeSelector({
  mode,
  onModeChange,
  className,
}: ModeSelectorProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-lg bg-muted p-1",
        className,
      )}
    >
      <Button
        variant={mode === "chat" ? "default" : "ghost"}
        size="sm"
        onClick={() => onModeChange("chat")}
        className="gap-2"
      >
        <Bot className="h-4 w-4" />
        Chat
      </Button>
      <Button
        variant={mode === "form" ? "default" : "ghost"}
        size="sm"
        onClick={() => onModeChange("form")}
        className="gap-2"
      >
        <Edit className="h-4 w-4" />
        Form
      </Button>
    </div>
  );
}
