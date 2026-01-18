"use client";

import { Download, Loader2 } from "lucide-react";
import { usePDF } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { ModernTemplatePdf } from "@/components/resume/pdf/ModernTemplatePdf";
import type { ResumeType } from "@/app/schemas/ResumeSchema";
import { useEffect } from "react";

interface DownloadPdfButtonProps {
  data: ResumeType;
  title?: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  disabled?: boolean;
}

export default function DownloadPdfButton({ 
  data, 
  title = "resume", 
  className,
  size = "default",
  variant = "default",
  disabled = false
}: DownloadPdfButtonProps) {
  const [instance, updateInstance] = usePDF({
    document: <ModernTemplatePdf data={data} />,
  });

  useEffect(() => {
    updateInstance(<ModernTemplatePdf data={data} />);
  }, [data, updateInstance]);

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
