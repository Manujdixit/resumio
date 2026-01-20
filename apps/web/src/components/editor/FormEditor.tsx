"use client";

import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
	Conversation,
	ConversationContent,
	ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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

	const savePersonalInfo = () => {
		updateContent({ personalInfo: localPersonalInfo });
		markSaved("personalInfo");
		toast.success("Personal information saved");
	};

	const saveSummary = () => {
		updateContent({ summary: localSummary });
		markSaved("summary");
		toast.success("Summary saved");
	};

	const saveExperience = () => {
		updateContent({ experience: localExperience });
		markSaved("experience");
		toast.success("Experience saved");
	};

	const saveEducation = () => {
		updateContent({ education: localEducation });
		markSaved("education");
		toast.success("Education saved");
	};

	const saveSkills = () => {
		updateContent({ skills: localSkills });
		markSaved("skills");
		toast.success("Skills saved");
	};

	const saveProjects = () => {
		updateContent({ projects: localProjects });
		markSaved("projects");
		toast.success("Projects saved");
	};

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
						/>

						<SummaryForm
							data={localSummary}
							onChange={handleSummaryChange}
							onSave={saveSummary}
							hasUnsavedChanges={unsavedSections.has("summary")}
						/>

						<ExperienceForm
							data={localExperience}
							onChange={handleExperienceChange}
							onSave={saveExperience}
							hasUnsavedChanges={unsavedSections.has("experience")}
						/>

						<EducationForm
							data={localEducation}
							onChange={handleEducationChange}
							onSave={saveEducation}
							hasUnsavedChanges={unsavedSections.has("education")}
						/>

						<SkillsForm
							data={localSkills}
							onChange={handleSkillsChange}
							onSave={saveSkills}
							hasUnsavedChanges={unsavedSections.has("skills")}
						/>

						<ProjectsForm
							data={localProjects}
							onChange={handleProjectsChange}
							onSave={saveProjects}
							hasUnsavedChanges={unsavedSections.has("projects")}
						/>

						<ExperienceForm
							data={currentContent.experience}
							onChange={handleExperienceChange}
						/>

						<EducationForm
							data={currentContent.education}
							onChange={handleEducationChange}
						/>

						<SkillsForm
							data={currentContent.skills}
							onChange={handleSkillsChange}
						/>

						<ProjectsForm
							data={currentContent.projects}
							onChange={handleProjectsChange}
						/>
					</div>
				</ConversationContent>
				<ConversationScrollButton />
			</Conversation>
		</div>
	);
}
