import { create } from "zustand";

export type AiActionType =
  | "improve"
  | "bolder"
  | "shorten"
  | "expand"
  | "impactify"
  | "grammar"
  | "custom";

export interface AiAction {
  type: AiActionType;
  selectedText: string;
}

interface AiActionStore {
  pendingAction: AiAction | null;
  setPendingAction: (action: AiAction) => void;
  clearPendingAction: () => void;
}

export const useAiActionStore = create<AiActionStore>((set) => ({
  pendingAction: null,
  setPendingAction: (action) => set({ pendingAction: action }),
  clearPendingAction: () => set({ pendingAction: null }),
}));

/**
 * Generates an AI prompt based on the action type and selected text
 */
export function generatePromptForAction(action: AiAction): string {
  const text = action.selectedText.trim();
  const truncatedText =
    text.length > 500 ? `${text.substring(0, 500)}...` : text;

  switch (action.type) {
    case "improve":
      return `Make this text more impactful and action-oriented: "${truncatedText}"`;
    case "bolder":
      return `Rewrite this using stronger, more assertive language: "${truncatedText}"`;
    case "shorten":
      return `Shorten this while keeping the key information: "${truncatedText}"`;
    case "expand":
      return `Expand this with more specific details: "${truncatedText}"`;
    case "impactify":
      return `Add specific metrics, numbers, or quantifiable results to make this more impactful: "${truncatedText}"`;
    case "grammar":
      return `Fix any grammar or spelling issues in: "${truncatedText}"`;
    case "custom":
      // For custom, we return a quoted format for the user to add their instruction
      return `Regarding this text: "${truncatedText}"\n\n`;
    default:
      return truncatedText;
  }
}
