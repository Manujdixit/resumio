"use client";

import Chat from "@/components/chat/Chat";
import ResumePreview from "@/components/resume/ResumePreview";
import { TemplateSelector } from "@/components/resume/TemplateSelector";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Download, Share2, Loader2, CheckCircle2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRef, useState, use } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { useReactToPrint } from "react-to-print";
import { useResume, useUpdateResume } from "@/hooks/use-resumes";
import { toast } from "sonner";

export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const isMobile = useIsMobile();
  const resumeRef = useRef<HTMLDivElement>(null);
  const { resumeData } = useResumeStore();
  const [isExporting, setIsExporting] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  const { isLoading } = useResume(id);
  const updateResumeMutation = useUpdateResume();

  const reactToPrintFn = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: resumeData?.title || "Resume",
    onAfterPrint: () => {
      setIsExporting(false);
    },
    onPrintError: () => {
      setIsExporting(false);
      toast.error("Failed to export PDF. Please try again.");
    },
  });

  const handleExport = () => {
    setIsExporting(true);
    reactToPrintFn();
  };

  const handleShare = async () => {
    if (!resumeData?.isPublic) {
      // Make public first
      await updateResumeMutation.mutateAsync({
        id,
        data: {
          isPublic: true,
          title: resumeData?.title,
          content: resumeData?.content,
        },
      });
    }

    const shareUrl = `${window.location.origin}/share/${
      resumeData?.shareId || id
    }`;
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied!");
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const hasResumeContent = Boolean(resumeData?.content);

  return (
    <div className="h-full overflow-hidden">
      <ResizablePanelGroup
        className="h-full"
        direction={isMobile ? "vertical" : "horizontal"}
      >
        {/* Chat Panel with its own header */}
        <ResizablePanel className="min-w-0 h-full flex flex-col">
          {/* Chat Header */}
          <div className=" shrink-0">
            <div className="h-12 relative flex items-center px-8  bg-background">
              <h1 className="text-sm font-medium text-foreground truncate">
                {resumeData?.title || "Untitled Resume"}
              </h1>
              <div className="absolute left-0 right-0 bottom-0 translate-y-full h-6 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
            </div>
            {/* Blur mask gradient effect */}
          </div>
          <div className="flex-1 overflow-hidden relative">
            <Chat resumeId={id} className="pt-0" />
          </div>
        </ResizablePanel>

        {hasResumeContent && (
          <>
            <ResizableHandle withHandle />
            {/* Preview Panel with its own header */}
            <ResizablePanel className="min-w-0 h-full flex flex-col bg-muted/20">
              {/* Preview Header */}
              <div className="h-12 border-b border-border flex items-center justify-between px-4 shrink-0 bg-background">
                <TemplateSelector />
                <div className="flex items-center gap-1">
                  {/* Auto-save indicator */}
                  <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md text-xs">
                    {isAutoSaving ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                        <span className="text-muted-foreground">Saving...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        <span className="text-emerald-500">Saved</span>
                      </>
                    )}
                  </div>

                  {/* Copy/Share button */}
                  <Button
                    onClick={handleShare}
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2"
                    disabled={updateResumeMutation.isPending}
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline ml-1.5 text-xs">
                      Share
                    </span>
                  </Button>

                  {/* Publish button */}
                  <Button
                    onClick={handleExport}
                    size="sm"
                    variant="default"
                    className="h-8 px-3"
                    disabled={isExporting}
                  >
                    <Download className="h-4 w-4 sm:mr-1.5" />
                    <span className="hidden sm:inline text-xs">
                      {isExporting ? "Exporting..." : "Download"}
                    </span>
                  </Button>
                </div>
              </div>
              {/* Preview Content */}
              <div className="flex-1 overflow-auto p-6">
                <ResumePreview ref={resumeRef} />
              </div>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}
