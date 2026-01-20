"use client";

import { Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import type { ResumeType } from "@/app/schemas/ResumeSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EducationFormProps {
	data: ResumeType["education"];
	onChange: (data: ResumeType["education"]) => void;
	onSave?: () => void;
	hasUnsavedChanges?: boolean;
}

const emptyEducation = {
	institution: "",
	degree: "",
	startDate: "",
	endDate: "",
	grade: "",
};

export function EducationForm({
	data,
	onChange,
	onSave,
	hasUnsavedChanges,
}: EducationFormProps) {
	const handleAdd = () => {
		onChange([...(data || []), emptyEducation]);
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
					<CardTitle>Education</CardTitle>
					{hasUnsavedChanges && (
						<span className="font-medium text-orange-500 text-xs">
							Unsaved changes
						</span>
					)}
				</div>
				<div className="flex gap-2">
					<Button onClick={handleAdd} size="sm" variant="outline">
						<Plus className="mr-2 h-4 w-4" />
						Add Education
					</Button>
					{onSave && (
						<Button onClick={onSave} size="sm" variant="outline">
							<Save className="mr-2 h-4 w-4" />
							Save
						</Button>
					)}
				</div>
			</CardHeader>
			<CardContent className="space-y-6">
				{data?.map((education, index) => (
					<div
						key={`education-${index}-${education.institution}`}
						className="space-y-4 rounded-lg border p-4"
					>
						<div className="flex items-start justify-between">
							<h4 className="font-medium">Education {index + 1}</h4>
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
								<Label htmlFor={`institution-${index}`}>Institution</Label>
								<Input
									id={`institution-${index}`}
									value={education.institution || ""}
									onChange={(e) =>
										handleFieldChange(index, "institution", e.target.value)
									}
									placeholder="Stanford University"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor={`degree-${index}`}>Degree</Label>
								<Input
									id={`degree-${index}`}
									value={education.degree || ""}
									onChange={(e) =>
										handleFieldChange(index, "degree", e.target.value)
									}
									placeholder="Bachelor of Science in Computer Science"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor={`edu-startDate-${index}`}>Start Date</Label>
								<Input
									id={`edu-startDate-${index}`}
									value={education.startDate || ""}
									onChange={(e) =>
										handleFieldChange(index, "startDate", e.target.value)
									}
									placeholder="Sep 2018"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor={`edu-endDate-${index}`}>End Date</Label>
								<Input
									id={`edu-endDate-${index}`}
									value={education.endDate || ""}
									onChange={(e) =>
										handleFieldChange(index, "endDate", e.target.value)
									}
									placeholder="Jun 2022"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor={`grade-${index}`}>Grade/GPA (Optional)</Label>
								<Input
									id={`grade-${index}`}
									value={education.grade || ""}
									onChange={(e) =>
										handleFieldChange(index, "grade", e.target.value)
									}
									placeholder="3.8 GPA or First Class Honors"
								/>
							</div>
						</div>
					</div>
				))}

				{(!data || data.length === 0) && (
					<div className="py-8 text-center text-muted-foreground">
						No education added yet. Click "Add Education" to get started.
					</div>
				)}
			</CardContent>
		</Card>
	);
}
