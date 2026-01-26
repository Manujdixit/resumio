"use client";

import { Loader2, Save } from "lucide-react";
import type { ResumeType } from "@/app/schemas/ResumeSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SummaryFormProps {
  data: ResumeType["summary"];
  onChange: (data: ResumeType["summary"]) => void;
  onSave?: () => void;
  hasUnsavedChanges?: boolean;
  isSaving?: boolean;
}

export function SummaryForm({
  data,
  onChange,
  onSave,
  hasUnsavedChanges,
  isSaving,
}: SummaryFormProps) {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle>Professional Summary</CardTitle>
          {hasUnsavedChanges && (
            <span className="font-medium text-orange-500 text-xs">
              Unsaved changes
            </span>
          )}
        </div>
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
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            value={data || ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="A brief overview of your professional background and key achievements..."
            rows={4}
          />
          <p className="text-muted-foreground text-xs">
            Write a compelling 2-3 sentence summary that highlights your
            expertise and career goals.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
