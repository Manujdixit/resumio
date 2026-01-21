import type { schema } from "@resumio/db";
import { create } from "zustand";
import type { ResumeType } from "@/app/schemas/ResumeSchema";

export type { ResumeType };

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
	updateContent: (updates: ResumeType) =>
		set((state) => {
			if (!state.resumeData) {
				return { resumeData: null };
			}

			const currentContent = (state.resumeData.content as ResumeType) ?? {};
			const { personalInfo, ...otherUpdates } = updates;

			return {
				resumeData: {
					...state.resumeData,
					content: {
						...currentContent,
						...otherUpdates,
						personalInfo: {
							...(currentContent.personalInfo ?? {}),
							...(personalInfo ?? {}),
						},
					},
				},
			};
		}),
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
