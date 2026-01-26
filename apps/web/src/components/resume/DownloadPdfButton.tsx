"use client";

import { usePDF } from "@react-pdf/renderer";
import { Download, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { getPdfTemplate } from "@/components/resume/templateUtils";
import { Button } from "@/components/ui/button";
import type { ResumeType } from "@/lib/schemas/ResumeSchema";

interface DownloadPdfButtonProps {
  data: ResumeType;
  title?: string;
  templateId?: "modern" | "sidebar" | "minimal";
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  disabled?: boolean;
}

export default function DownloadPdfButton({
  data,
  title = "resume",
  templateId = "modern",
  className,
  size = "default",
  variant = "default",
  disabled = false,
}: DownloadPdfButtonProps) {
  const [instance, updateInstance] = usePDF({
    document: getPdfTemplate(templateId, data),
  });

  useEffect(() => {
    updateInstance(getPdfTemplate(templateId, data));
  }, [data, templateId, updateInstance]);

  const handleExport = () => {
    if (instance.url) {
      const link = document.createElement("a");
      link.href = instance.url;
      link.download = `${title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const isLoading = instance.loading;

  return (
    <Button
      onClick={handleExport}
      size={size}
      variant={variant}
      className={className}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin sm:mr-1.5" />
      ) : (
        <Download className="h-4 w-4 sm:mr-1.5" />
      )}
      <span className="hidden text-xs sm:inline">
        {isLoading ? "Generating..." : "Download"}
      </span>
    </Button>
  );
}
