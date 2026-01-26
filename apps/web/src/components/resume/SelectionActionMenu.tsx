"use client";

import {
  CheckCircle,
  FileText,
  MessageSquare,
  Scissors,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { type AiActionType, useAiActionStore } from "@/store/useAiActionStore";

interface SelectionPosition {
  top: number;
  left: number;
}

interface SelectionState {
  text: string;
  position: SelectionPosition;
}

const AI_ACTIONS: {
  type: AiActionType;
  label: string;
  icon: React.ReactNode;
}[] = [
  { type: "improve", label: "Improve", icon: <Sparkles className="size-4" /> },
  { type: "bolder", label: "Bolder", icon: <Zap className="size-4" /> },
  { type: "shorten", label: "Shorten", icon: <Scissors className="size-4" /> },
  { type: "expand", label: "Expand", icon: <FileText className="size-4" /> },
  {
    type: "impactify",
    label: "Impactify",
    icon: <TrendingUp className="size-4" />,
  },
  {
    type: "grammar",
    label: "Fix Grammar",
    icon: <CheckCircle className="size-4" />,
  },
  {
    type: "custom",
    label: "Custom",
    icon: <MessageSquare className="size-4" />,
  },
];

interface SelectionActionMenuProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export function SelectionActionMenu({
  containerRef,
}: SelectionActionMenuProps) {
  const [selection, setSelection] = useState<SelectionState | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { setPendingAction } = useAiActionStore();

  const handleSelectionChange = useCallback(() => {
    const sel = window.getSelection();
    const text = sel?.toString().trim();

    if (!text || text.length === 0) {
      setIsVisible(false);
      return;
    }

    // Check if selection is within our container
    if (containerRef.current && sel?.rangeCount) {
      const range = sel.getRangeAt(0);
      const container = containerRef.current;

      // Verify selection is inside the PDF container
      if (!container.contains(range.commonAncestorContainer)) {
        setIsVisible(false);
        return;
      }

      const rect = range.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Position menu below the selection, centered horizontally
      const menuWidth = 600; // Approximate width of the menu
      let left = rect.left + rect.width / 2 - menuWidth / 2;

      // Keep menu within viewport bounds
      const viewportWidth = window.innerWidth;
      if (left < 10) left = 10;
      if (left + menuWidth > viewportWidth - 10) {
        left = viewportWidth - menuWidth - 10;
      }

      setSelection({
        text,
        position: {
          top: rect.top - 8, // Position above selection
          left,
        },
      });
      setIsVisible(true);
    }
  }, [containerRef]);

  // Listen for mouseup to detect selection end
  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      // Small delay to let the selection finalize
      setTimeout(handleSelectionChange, 10);
    };

    const handleMouseDown = (e: MouseEvent) => {
      // If clicking outside the menu, hide it
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVisible(false);
        window.getSelection()?.removeAllRanges();
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSelectionChange]);

  const handleAction = (type: AiActionType) => {
    if (!selection) return;

    setPendingAction({
      type,
      selectedText: selection.text,
    });

    // Clear selection and hide menu
    window.getSelection()?.removeAllRanges();
    setIsVisible(false);
  };

  if (!isVisible || !selection) return null;

  // Use portal to render menu at document level
  return createPortal(
    <div
      ref={menuRef}
      className={cn(
        "fixed z-50 flex items-center gap-1 rounded-xl",
        "-translate-y-full",
        "cursor-pdf-custom",
        "border border-zinc-700/50 bg-zinc-900/95 backdrop-blur-xl",
        "p-1.5 shadow-2xl shadow-black/50",
        "fade-in-0 zoom-in-95 animate-in duration-150",
      )}
      style={{
        top: selection.position.top,
        left: selection.position.left,
      }}
    >
      {AI_ACTIONS.map((action) => (
        <button
          key={action.type}
          type="button"
          onClick={() => handleAction(action.type)}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5",
            "font-medium text-xs text-zinc-300",
            "transition-all duration-150",
            "hover:bg-zinc-700/70 hover:text-white",
            "focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900",
          )}
        >
          {action.icon}
          <span>{action.label}</span>
        </button>
      ))}
    </div>,
    document.body,
  );
}
