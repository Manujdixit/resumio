import { create } from "zustand";
import type { ResumeType } from "@/app/schemas/ResumeSchema";

export type TemplateId = "modern" | "sidebar" | "minimal";

interface ResumeStore {
  resumeData: ResumeType | null;
  selectedTemplate: TemplateId;
  setResumeData: (data: ResumeType | null) => void;
  updateResumeData: (data: Partial<ResumeType>) => void;
  resetResumeData: () => void;
  setSelectedTemplate: (template: TemplateId) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: null,
  selectedTemplate: "modern",

  setResumeData: (data) => set({ resumeData: data }),

  updateResumeData: (data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        ...data,
      },
    })),

  resetResumeData: () => set({ resumeData: null }),
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
}));
