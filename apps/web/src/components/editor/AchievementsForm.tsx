"use client";

import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ResumeType } from "@/lib/schemas/ResumeSchema";

interface AchievementsFormProps {
  data: ResumeType["achievements"];
  onChange: (data: ResumeType["achievements"]) => void;
  onSave?: () => void;
  hasUnsavedChanges?: boolean;
  isSaving?: boolean;
}

const emptyAchievement = {
  id: crypto.randomUUID(),
  title: "",
  description: [""],
  date: "",
};

export function AchievementsForm({
  data,
  onChange,
  onSave,
  hasUnsavedChanges,
  isSaving,
}: AchievementsFormProps) {
  // Ensure all achievement entries have IDs (for backward compatibility)
  const normalizedData = data?.map((achievement) =>
    achievement.id ? achievement : { ...achievement, id: crypto.randomUUID() },
  );

  const handleAdd = () => {
    const newAchievement = { ...emptyAchievement, id: crypto.randomUUID() };
    onChange([...(normalizedData || []), newAchievement]);
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

  const handleDescriptionChange = (
    index: number,
    descriptionString: string,
  ) => {
    const descriptionArray = descriptionString
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);
    handleFieldChange(index, "description", descriptionArray);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle>Achievements</CardTitle>
          {hasUnsavedChanges && (
            <span className="font-medium text-orange-500 text-xs">
              Unsaved changes
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAdd} size="sm" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Achievement
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
        {normalizedData?.map((achievement, index) => (
          <div
            key={achievement.id || `achievement-${index}`}
            className="space-y-4 rounded-lg border p-4"
          >
            <div className="flex items-start justify-between">
              <h4 className="font-medium">Achievement {index + 1}</h4>
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
                <Label htmlFor={`achievement-title-${index}`}>
                  Achievement Title
                </Label>
                <Input
                  id={`achievement-title-${index}`}
                  value={achievement.title || ""}
                  onChange={(e) =>
                    handleFieldChange(index, "title", e.target.value)
                  }
                  placeholder="Employee of the Year"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`achievement-date-${index}`}>
                  Date (Optional)
                </Label>
                <Input
                  id={`achievement-date-${index}`}
                  value={achievement.date || ""}
                  onChange={(e) =>
                    handleFieldChange(index, "date", e.target.value)
                  }
                  placeholder="2023"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`achievement-description-${index}`}>
                  Description (Bullet Points)
                </Label>
                <Textarea
                  id={`achievement-description-${index}`}
                  value={(achievement.description || []).join("\n")}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value)
                  }
                  placeholder="• Recognized for exceptional performance&#10;• Led team to exceed Q4 targets by 25%&#10;• Implemented cost-saving initiatives"
                  rows={4}
                />
                <p className="text-muted-foreground text-xs">
                  Enter bullet points separated by new lines
                </p>
              </div>
            </div>
          </div>
        ))}

        {(!normalizedData || normalizedData.length === 0) && (
          <div className="py-8 text-center text-muted-foreground">
            No achievements added yet. Click "Add Achievement" to showcase your
            accomplishments.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
