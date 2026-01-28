"use client";

import { Loader2, UploadCloud } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ATSCheckResponse } from "@/lib/ats/types";

interface ATSCheckerFormProps {
  onResults: (data: ATSCheckResponse) => void;
}

export function ATSCheckerForm({ onResults }: ATSCheckerFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload a resume file first.");
      return;
    }

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("file", file);
    if (jobDesc) {
      formData.append("jobDescription", jobDesc);
    }

    try {
      const res = await fetch("/api/tools/ats-check", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze resume");
      }

      onResults(data.data);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="resume-upload">Upload Resume (PDF or DOCX)</Label>
            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="resume-upload"
                className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-300 border-dashed bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="mb-3 h-8 w-8 text-gray-400" />
                  <p className="mb-2 text-gray-500 text-sm">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-gray-500 text-xs">
                    PDF or DOCX (MAX. 2MB)
                  </p>
                </div>
                <Input
                  id="resume-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {file && (
              <p className="font-medium text-green-600 text-sm">
                Selected: {file.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="job-desc">Job Description (Optional)</Label>
            <Textarea
              id="job-desc"
              placeholder="Paste the job description here to check for keyword matching..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              className="min-h-[150px]"
            />
            <p className="text-gray-500 text-xs">
              Adding a job description helps us find missing keywords.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              "Check My Resume Score"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
