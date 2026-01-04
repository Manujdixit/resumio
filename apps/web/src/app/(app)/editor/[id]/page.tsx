"use client";
import { ArrowLeft, CheckCircle2, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { use, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useIsMobile } from "@/hooks/use-mobile";
import { useResume } from "@/hooks/use-resumes";
import { useResumeStore } from "@/store/useResumeStore";
import Chat from "../../../../components/chat/Chat";
import ResumePreview from "../../../../components/resume/ResumePreview";
import { TemplateSelector } from "../../../../components/resume/TemplateSelector";

export default function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const isMobile = useIsMobile();
  const resumeRef = useRef<HTMLDivElement>(null);
  const { resumeData, setResumeData } = useResumeStore();
  const [isExporting, setIsExporting] = useState(false);
  const [isAutoSaving, _setIsAutoSaving] = useState(false);

  const { isLoading } = useResume(id);

  const reactToPrintFn = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: resumeData?.title || "Resume",
    onAfterPrint: () => {
      setIsExporting(false);
    },
    onPrintError: () => {
      setIsExporting(false);
      alert("Failed to export PDF. Please try again.");
    },
  });

  const handleExport = () => {
    setIsExporting(true);
    reactToPrintFn();
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="z-10 flex h-14 items-center justify-between border-zinc-800 border-b bg-background px-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="max-w-[200px] truncate font-semibold text-white">
            {resumeData?.title || "Untitled Resume"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Auto-save status indicator */}
          <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-1.5">
            {isAutoSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
                <span className="text-sm text-zinc-400">Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-500 text-sm">Auto-saved</span>
              </>
            )}
          </div>
          <Button
            onClick={handleExport}
            size="sm"
            variant="outline"
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Export
          </Button>
        </div>
      </div>
      <ResizablePanelGroup
        className="flex-1"
        direction={isMobile ? "vertical" : "horizontal"}
      >
        <ResizablePanel className="h-full min-w-0 p-2">
          <Chat resumeId={id} />
        </ResizablePanel>
        {Boolean(resumeData?.content) && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel className="flex min-w-0 flex-col gap-6 bg-zinc-950/50 p-6">
              <div className="flex shrink-0 items-center gap-2">
                <TemplateSelector />
              </div>
              <div className="flex-1 overflow-auto">
                <ResumePreview ref={resumeRef} />
              </div>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}
