"use client";

import { Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";

import type { ResumeType } from "@/app/schemas/ResumeSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SkillsFormProps {
	data: ResumeType["skills"];
	onChange: (data: ResumeType["skills"]) => void;
	onSave?: () => void;
	hasUnsavedChanges?: boolean;
}

export function SkillsForm({
	data,
	onChange,
	onSave,
	hasUnsavedChanges,
}: SkillsFormProps) {
	const [newSkill, setNewSkill] = useState("");

	const handleAdd = () => {
		if (newSkill.trim()) {
			onChange([...(data || []), newSkill.trim()]);
			setNewSkill("");
		}
	};

	const handleRemove = (index: number) => {
		onChange((data || []).filter((_, i) => i !== index));
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAdd();
		}
	};

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<div className="flex flex-col gap-1">
					<CardTitle>Skills</CardTitle>
					{hasUnsavedChanges && (
						<span className="font-medium text-orange-500 text-xs">
							Unsaved changes
						</span>
					)}
				</div>
				{onSave && (
					<Button onClick={onSave} size="sm" variant="outline">
						<Save className="mr-2 h-4 w-4" />
						Save
					</Button>
				)}
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex gap-2">
					<Input
						value={newSkill}
						onChange={(e) => setNewSkill(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder="Add a skill (e.g., JavaScript, Project Management)"
					/>
					<Button onClick={handleAdd} disabled={!newSkill.trim()}>
						<Plus className="h-4 w-4" />
					</Button>
				</div>

				{data && data.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{data.map((skill, index) => (
							<div
								key={`skill-${index}-${skill}`}
								className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-secondary-foreground text-sm"
							>
								{skill}
								<Button
									onClick={() => handleRemove(index)}
									size="sm"
									variant="ghost"
									className="h-auto p-0 hover:bg-transparent"
								>
									<X className="h-3 w-3" />
								</Button>
							</div>
						))}
					</div>
				)}

				{(!data || data.length === 0) && (
					<div className="py-8 text-center text-muted-foreground">
						No skills added yet. Add your technical and professional skills
						above.
					</div>
				)}

				<div className="text-muted-foreground text-xs">
					Include technical skills (programming languages, tools), soft skills
					(communication, leadership), and industry-specific skills relevant to
					your target role.
				</div>
			</CardContent>
		</Card>
	);
}
