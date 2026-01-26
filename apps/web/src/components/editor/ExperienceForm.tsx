"use client";

import { Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ResumeType } from "@/lib/schemas/ResumeSchema";

interface ExperienceFormProps {
  data: ResumeType["experience"];
  onChange: (data: ResumeType["experience"]) => void;
  onSave?: () => void;
  hasUnsavedChanges?: boolean;
  isSaving?: boolean;
}

const emptyExperience = {
  id: crypto.randomUUID(),
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  description: [],
};

export function ExperienceForm({
  data,
  onChange,
  onSave,
  hasUnsavedChanges,
  isSaving,
}: ExperienceFormProps) {
  // Ensure all experience entries have IDs and proper description format (for backward compatibility)
  const normalizedData = data?.map((exp) => {
    let updatedExp = exp.id ? exp : { ...exp, id: crypto.randomUUID() };

    // Convert string description to array if needed
    if (typeof updatedExp.description === "string") {
      updatedExp = {
        ...updatedExp,
        description: updatedExp.description ? [updatedExp.description] : [],
      };
    } else if (!updatedExp.description) {
      updatedExp = {
        ...updatedExp,
        description: [],
      };
    }

    return updatedExp;
  });

  const handleAdd = () => {
    const newExperience = { ...emptyExperience, id: crypto.randomUUID() };
    onChange([...(normalizedData || []), newExperience]);
  };

  const handleRemove = (index: number) => {
    onChange(normalizedData?.filter((_, i) => i !== index) || []);
  };

  const handleFieldChange = (index: number, field: string, value: string) => {
    const updatedData = [...(normalizedData || [])];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value,
    };
    onChange(updatedData);
  };

  const handleDescriptionPointChange = (
    experienceIndex: number,
    pointIndex: number,
    value: string,
  ) => {
    const updatedData = [...(normalizedData || [])];
    const updatedDescription = [
      ...(updatedData[experienceIndex].description || []),
    ];
    updatedDescription[pointIndex] = value;
    updatedData[experienceIndex] = {
      ...updatedData[experienceIndex],
      description: updatedDescription,
    };
    onChange(updatedData);
  };

  const handleAddDescriptionPoint = (experienceIndex: number) => {
    const updatedData = [...(normalizedData || [])];
    const updatedDescription = [
      ...(updatedData[experienceIndex].description || []),
    ];
    updatedDescription.push("");
    updatedData[experienceIndex] = {
      ...updatedData[experienceIndex],
      description: updatedDescription,
    };
    onChange(updatedData);
  };

  const handleRemoveDescriptionPoint = (
    experienceIndex: number,
    pointIndex: number,
  ) => {
    const updatedData = [...(normalizedData || [])];
    const updatedDescription = [
      ...(updatedData[experienceIndex].description || []),
    ];
    updatedDescription.splice(pointIndex, 1);
    updatedData[experienceIndex] = {
      ...updatedData[experienceIndex],
      description: updatedDescription,
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
        {normalizedData?.map((experience, index) => (
          <div
            key={experience.id || `experience-${index}`}
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

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Description</Label>
                <Button
                  onClick={() => handleAddDescriptionPoint(index)}
                  size="sm"
                  variant="outline"
                  className="h-7 px-2 text-xs"
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Add Point
                </Button>
              </div>
              <div className="space-y-2">
                {(experience.description || []).map((point, pointIndex) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: description points are simple strings
                    key={`point-${index}-${pointIndex}`}
                    className="flex gap-2"
                  >
                    <div className="relative flex-1">
                      <Textarea
                        value={point}
                        onChange={(e) =>
                          handleDescriptionPointChange(
                            index,
                            pointIndex,
                            e.target.value,
                          )
                        }
                        placeholder="• Describe a responsibility or achievement..."
                        rows={1}
                        className="min-h-[38px] resize-none pr-8"
                      />
                      {(experience.description || []).length > 1 && (
                        <Button
                          onClick={() =>
                            handleRemoveDescriptionPoint(index, pointIndex)
                          }
                          size="sm"
                          variant="ghost"
                          className="absolute top-1 right-1 h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {(!experience.description ||
                  experience.description.length === 0) && (
                  <div className="rounded-lg border-2 border-dashed py-4 text-center text-muted-foreground text-sm">
                    Click "Add Point" to add description bullets
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {(!normalizedData || normalizedData.length === 0) && (
          <div className="py-8 text-center text-muted-foreground">
            No work experience added yet. Click "Add Experience" to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
