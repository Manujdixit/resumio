"use client";
import { useResumeStore } from "@/store/useResumeStore";
import { forwardRef } from "react";
import {
  ModernTemplate,
  SidebarTemplate,
  MinimalTemplate,
} from "./ResumeTemplates";

const ResumePreview = forwardRef<HTMLDivElement>((props, ref) => {
  const { resumeData: data, selectedTemplate } = useResumeStore();

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">No Resume Data Yet</p>
          <p className="text-sm">Start chatting to build your resume</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref}>
      {selectedTemplate === "modern" && <ModernTemplate data={data} />}
      {selectedTemplate === "sidebar" && <SidebarTemplate data={data} />}
      {selectedTemplate === "minimal" && <MinimalTemplate data={data} />}
    </div>
  );
});

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
