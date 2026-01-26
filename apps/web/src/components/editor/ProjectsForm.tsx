"use client";

import { Loader2, Plus, Save, Trash2 } from "lucide-react";

import type { ResumeType } from "@/app/schemas/ResumeSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProjectsFormProps {
  data: ResumeType["projects"];
  onChange: (data: ResumeType["projects"]) => void;
  onSave?: () => void;
  hasUnsavedChanges?: boolean;
  isSaving?: boolean;
}

const emptyProject = {
  id: crypto.randomUUID(),
  name: "",
  description: "",
  tech: [],
};

export function ProjectsForm({
  data,
  onChange,
  onSave,
  hasUnsavedChanges,
  isSaving,
}: ProjectsFormProps) {
  // Ensure all project entries have IDs (for backward compatibility)
  const normalizedData = data?.map((project) =>
    project.id ? project : { ...project, id: crypto.randomUUID() },
  );

  const handleAdd = () => {
    const newProject = { ...emptyProject, id: crypto.randomUUID() };
    onChange([...(normalizedData || []), newProject]);
  };

  const handleRemove = (index: number) => {
    onChange(normalizedData?.filter((_, i) => i !== index) || []);
  };

  const handleFieldChange = (
    index: number,
    field: string,
    value: string | string[],
  ) => {
    const updatedData = [...(normalizedData || [])];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value,
    };
    onChange(updatedData);
  };

  const handleTechChange = (index: number, techString: string) => {
    const techArray = techString
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);
    handleFieldChange(index, "tech", techArray);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle>Projects</CardTitle>
          {hasUnsavedChanges && (
            <span className="font-medium text-orange-500 text-xs">
              Unsaved changes
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAdd} size="sm" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
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
        {normalizedData?.map((project, index) => (
          <div
            key={project.id || `project-${index}`}
            className="space-y-4 rounded-lg border p-4"
          >
            <div className="flex items-start justify-between">
              <h4 className="font-medium">Project {index + 1}</h4>
              <Button
                onClick={() => handleRemove(index)}
                size="sm"
                variant="ghost"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                <Input
                  id={`project-name-${index}`}
                  value={project.name || ""}
                  onChange={(e) =>
                    handleFieldChange(index, "name", e.target.value)
                  }
                  placeholder="E-commerce Platform"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`project-description-${index}`}>
                  Description
                </Label>
                <Textarea
                  id={`project-description-${index}`}
                  value={project.description || ""}
                  onChange={(e) =>
                    handleFieldChange(index, "description", e.target.value)
                  }
                  placeholder="Describe the project, your role, and key achievements..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`project-tech-${index}`}>Technologies</Label>
                <Input
                  id={`project-tech-${index}`}
                  value={(project.tech || []).join(", ")}
                  onChange={(e) => handleTechChange(index, e.target.value)}
                  placeholder="React, Node.js, MongoDB, TypeScript"
                />
                <p className="text-muted-foreground text-xs">
                  Enter technologies separated by commas
                </p>
              </div>
            </div>
          </div>
        ))}

        {(!normalizedData || normalizedData.length === 0) && (
          <div className="py-8 text-center text-muted-foreground">
            No projects added yet. Click "Add Project" to showcase your work.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
