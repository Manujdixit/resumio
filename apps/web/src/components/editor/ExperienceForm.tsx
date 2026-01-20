"use client";

import { Calendar, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import type { ResumeType } from "@/app/schemas/ResumeSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ExperienceFormProps {
	data: ResumeType["experience"];
	onChange: (data: ResumeType["experience"]) => void;
	onSave?: () => void;
	hasUnsavedChanges?: boolean;
	isSaving?: boolean;
}

const emptyExperience = {
	company: "",
	role: "",
	startDate: "",
	endDate: "",
	description: "",
};

export function ExperienceForm({
	data,
	onChange,
	onSave,
	hasUnsavedChanges,
	isSaving,
}: ExperienceFormProps) {
	const handleAdd = () => {
		onChange([...(data || []), emptyExperience]);
	};

	const handleRemove = (index: number) => {
		onChange((data || []).filter((_, i) => i !== index));
	};

	const handleFieldChange = (index: number, field: string, value: string) => {
		const updatedData = [...(data || [])];
		updatedData[index] = {
			...updatedData[index],
			[field]: value,
		};
		onChange(updatedData);
	};

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<div className="flex flex-col gap-1">
					<CardTitle>Work Experience</CardTitle>
					{hasUnsavedChanges && (
						<span className="font-medium text-orange-500 text-xs">
							Unsaved changes
						</span>
					)}
				</div>
				<div className="flex gap-2">
					<Button onClick={handleAdd} size="sm" variant="outline">
						<Plus className="mr-2 h-4 w-4" />
						Add Experience
					</Button>
					{onSave && (
						<Button
							onClick={onSave}
							size="sm"
							variant="outline"
							disabled={isSaving}
						>
							{isSaving ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Save className="mr-2 h-4 w-4" />
							)}
							{isSaving ? "Saving..." : "Save"}
						</Button>
					)}
				</div>
			</CardHeader>
			<CardContent className="space-y-6">
				{data?.map((experience, index) => (
					<div
						key={`experience-${index}-${experience.company}`}
						className="space-y-4 rounded-lg border p-4"
					>
						<div className="flex items-start justify-between">
							<h4 className="font-medium">Experience {index + 1}</h4>
							<Button
								onClick={() => handleRemove(index)}
								size="sm"
								variant="ghost"
								className="text-destructive hover:text-destructive"
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor={`company-${index}`}>Company</Label>
								<Input
									id={`company-${index}`}
									value={experience.company || ""}
									onChange={(e) =>
										handleFieldChange(index, "company", e.target.value)
									}
									placeholder="Google"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor={`role-${index}`}>Role</Label>
								<Input
									id={`role-${index}`}
									value={experience.role || ""}
									onChange={(e) =>
										handleFieldChange(index, "role", e.target.value)
									}
									placeholder="Software Engineer"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor={`startDate-${index}`}>Start Date</Label>
								<Input
									id={`startDate-${index}`}
									value={experience.startDate || ""}
									onChange={(e) =>
										handleFieldChange(index, "startDate", e.target.value)
									}
									placeholder="Jan 2020"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor={`endDate-${index}`}>End Date</Label>
								<Input
									id={`endDate-${index}`}
									value={experience.endDate || ""}
									onChange={(e) =>
										handleFieldChange(index, "endDate", e.target.value)
									}
									placeholder="Dec 2022 (or leave empty for current)"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor={`description-${index}`}>Description</Label>
							<Textarea
								id={`description-${index}`}
								value={experience.description || ""}
								onChange={(e) =>
									handleFieldChange(index, "description", e.target.value)
								}
								placeholder="Describe your responsibilities and achievements..."
								rows={4}
							/>
						</div>
					</div>
				))}

				{(!data || data.length === 0) && (
					<div className="py-8 text-center text-muted-foreground">
						No work experience added yet. Click "Add Experience" to get started.
					</div>
				)}
			</CardContent>
		</Card>
	);
}
