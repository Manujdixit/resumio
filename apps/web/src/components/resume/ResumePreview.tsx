"use client";
import { forwardRef } from "react";
import type { ResumeType } from "@/lib/schemas/ResumeSchema";
import { useResumeStore } from "@/store/useResumeStore";
import {
  MinimalTemplate,
  ModernTemplate,
  SidebarTemplate,
} from "./ResumeTemplates";

const ResumePreview = forwardRef<HTMLDivElement>((_props, ref) => {
  const { resumeData, selectedTemplate } = useResumeStore();

  if (!resumeData) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <div className="space-y-2 text-center">
          <p className="font-medium text-lg">No Resume Data Yet</p>
          <p className="text-sm">Start chatting to build your resume</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref}>
      {selectedTemplate === "modern" && (
        <ModernTemplate data={resumeData.content as ResumeType} />
      )}
      {selectedTemplate === "sidebar" && (
        <SidebarTemplate data={resumeData.content as ResumeType} />
      )}
      {selectedTemplate === "minimal" && (
        <MinimalTemplate data={resumeData.content as ResumeType} />
      )}
    </div>
  );
});

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
