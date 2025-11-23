import { create } from "zustand";
import type { schema } from "@resumio/db";
import type { ResumeType } from "@/app/schemas/ResumeSchema";

export type TemplateId = "modern" | "sidebar" | "minimal";

export type ResumeEntity = typeof schema.resume.$inferSelect;

interface ResumeStore {
  resumeData: ResumeEntity | null;
  selectedTemplate: TemplateId;
  setResumeData: (data: ResumeEntity | null) => void;
  resetResumeData: () => void;
  setSelectedTemplate: (template: TemplateId) => void;
  updateContent: (content: ResumeType) => void;
  updateTitle: (title: string) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: null,
  selectedTemplate: "modern",
  setResumeData: (data) => set({ resumeData: data }),
  resetResumeData: () => set({ resumeData: null }),
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  updateContent: (content: ResumeType) =>
    set((state) => ({
      resumeData: state.resumeData
        ? {
            ...state.resumeData,
            content: { ...(state.resumeData.content as object), ...content },
          }
        : null,
    })),
  updateTitle: (title: string) =>
    set((state) => ({
      resumeData: state.resumeData
        ? {
            ...state.resumeData,
            title,
          }
        : null,
    })),
}));
