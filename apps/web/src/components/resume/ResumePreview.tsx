"use client";
import { useResumeStore } from "@/store/useResumeStore";
import { forwardRef } from "react";
import {
  ModernTemplate,
  SidebarTemplate,
  MinimalTemplate,
} from "./ResumeTemplates";
import type { ResumeType } from "@/app/schemas/ResumeSchema";

const ResumePreview = forwardRef<HTMLDivElement>((props, ref) => {
  const { resumeData, selectedTemplate } = useResumeStore();

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">No Resume Data Yet</p>
          <p className="text-sm">Start chatting to build your resume</p>
        </div>
      </div>
    );
  }
  console.log({ resumeData });

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
