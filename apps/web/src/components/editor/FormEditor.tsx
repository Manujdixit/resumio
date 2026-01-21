"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
	Conversation,
	ConversationContent,
	ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { useUpdateResume } from "@/hooks/use-resumes";
import { type ResumeType, useResumeStore } from "@/store/useResumeStore";
import { EducationForm } from "./EducationForm";
import { ExperienceForm } from "./ExperienceForm";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ProjectsForm } from "./ProjectsForm";
import { SkillsForm } from "./SkillsForm";
import { SummaryForm } from "./SummaryForm";

interface FormEditorProps {
	resumeId: string;
}

export function FormEditor({ resumeId }: FormEditorProps) {
	const { resumeData, updateContent } = useResumeStore();
	const updateResumeMutation = useUpdateResume();

	const currentContent = resumeData?.content as ResumeType;

	// Local state for each section
	const [localPersonalInfo, setLocalPersonalInfo] = useState(
		currentContent?.personalInfo,
	);
	const [localSummary, setLocalSummary] = useState(currentContent?.summary);
	const [localExperience, setLocalExperience] = useState(
		currentContent?.experience,
	);
	const [localEducation, setLocalEducation] = useState(
		currentContent?.education,
	);
	const [localSkills, setLocalSkills] = useState(currentContent?.skills);
	const [localProjects, setLocalProjects] = useState(currentContent?.projects);

	// Save states to track if sections have unsaved changes
	const [unsavedSections, setUnsavedSections] = useState<Set<string>>(
		new Set(),
	);

	// Sync local state with resume data when it changes
	useEffect(() => {
		if (currentContent) {
			setLocalPersonalInfo(currentContent.personalInfo);
			setLocalSummary(currentContent.summary);
			setLocalExperience(currentContent.experience);
			setLocalEducation(currentContent.education);
			setLocalSkills(currentContent.skills);
			setLocalProjects(currentContent.projects);
			setUnsavedSections(new Set());
		}
	}, [currentContent]);

	// Mark section as unsaved
	const markUnsaved = (section: string) => {
		setUnsavedSections((prev) => new Set(prev).add(section));
	};

	// Mark section as saved
	const markSaved = (section: string) => {
		setUnsavedSections((prev) => {
			const newSet = new Set(prev);
			newSet.delete(section);
			return newSet;
		});
	};

	const handlePersonalInfoChange = (
		personalInfo: ResumeType["personalInfo"],
	) => {
		setLocalPersonalInfo(personalInfo);
		markUnsaved("personalInfo");
	};

	const handleSummaryChange = (summary: ResumeType["summary"]) => {
		setLocalSummary(summary);
		markUnsaved("summary");
	};

	const handleExperienceChange = (experience: ResumeType["experience"]) => {
		setLocalExperience(experience);
		markUnsaved("experience");
	};

	const handleEducationChange = (education: ResumeType["education"]) => {
		setLocalEducation(education);
		markUnsaved("education");
	};

	const handleSkillsChange = (skills: ResumeType["skills"]) => {
		setLocalSkills(skills);
		markUnsaved("skills");
	};

	const handleProjectsChange = (projects: ResumeType["projects"]) => {
		setLocalProjects(projects);
		markUnsaved("projects");
	};

	// Save function that persists to database
	const saveSection = async (section: string, data: Partial<ResumeType>) => {
		try {
			// First update local store state for immediate UI feedback
			updateContent(data);
			markSaved(section);

			// Then persist to database
			const updatedContent = {
				...currentContent,
				...data,
			};

			await updateResumeMutation.mutateAsync({
				id: resumeId,
				data: {
					content: updatedContent,
				},
			});

			toast.success(
				`${section.charAt(0).toUpperCase() + section.slice(1)} saved`,
			);
		} catch (error) {
			console.error(`Failed to save ${section}:`, error);
			toast.error(`Failed to save ${section}`);
			// Don't mark as saved if database save failed
			markUnsaved(section);
		}
	};

	const savePersonalInfo = () =>
		saveSection("personal info", { personalInfo: localPersonalInfo });
	const saveSummary = () => saveSection("summary", { summary: localSummary });
	const saveExperience = () =>
		saveSection("experience", { experience: localExperience });
	const saveEducation = () =>
		saveSection("education", { education: localEducation });
	const saveSkills = () => saveSection("skills", { skills: localSkills });
	const saveProjects = () =>
		saveSection("projects", { projects: localProjects });

	if (!currentContent) {
		return (
			<div className="flex h-full items-center justify-center">
				<div className="text-center">
					<Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
					<p className="mt-2 text-muted-foreground">
						Loading resume content...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex h-full flex-col">
			{/* Header */}
			<div className="shrink-0 border-b bg-background p-4">
				<div className="flex items-center justify-between">
					<h2 className="font-semibold text-lg">Form Editor</h2>
				</div>
			</div>

			{/* Form Content */}
			<Conversation className="flex-1">
				<ConversationContent>
					<div className="space-y-6">
						<PersonalInfoForm
							data={localPersonalInfo}
							onChange={handlePersonalInfoChange}
							onSave={savePersonalInfo}
							hasUnsavedChanges={unsavedSections.has("personalInfo")}
							isSaving={updateResumeMutation.isPending}
						/>

						<SummaryForm
							data={localSummary}
							onChange={handleSummaryChange}
							onSave={saveSummary}
							hasUnsavedChanges={unsavedSections.has("summary")}
							isSaving={updateResumeMutation.isPending}
						/>

						<ExperienceForm
							data={localExperience}
							onChange={handleExperienceChange}
							onSave={saveExperience}
							hasUnsavedChanges={unsavedSections.has("experience")}
							isSaving={updateResumeMutation.isPending}
						/>

						<EducationForm
							data={localEducation}
							onChange={handleEducationChange}
							onSave={saveEducation}
							hasUnsavedChanges={unsavedSections.has("education")}
							isSaving={updateResumeMutation.isPending}
						/>

						<SkillsForm
							data={localSkills}
							onChange={handleSkillsChange}
							onSave={saveSkills}
							hasUnsavedChanges={unsavedSections.has("skills")}
							isSaving={updateResumeMutation.isPending}
						/>

						<ProjectsForm
							data={localProjects}
							onChange={handleProjectsChange}
							onSave={saveProjects}
							hasUnsavedChanges={unsavedSections.has("projects")}
							isSaving={updateResumeMutation.isPending}
						/>
					</div>
				</ConversationContent>
				<ConversationScrollButton />
			</Conversation>
		</div>
	);
}
