"use client";
import Chat from "../../../../components/chat/Chat";
import ResumePreview from "../../../../components/resume/ResumePreview";
import { TemplateSelector } from "../../../../components/resume/TemplateSelector";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRef, useState, useEffect, use } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import Link from "next/link";
import { useResume } from "@/hooks/use-resumes";

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
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  const { isLoading, isError } = useResume(id);

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
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  console.log({ resumeData });

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="h-14 border-b border-zinc-800 flex items-center px-4 justify-between bg-background z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-semibold text-white truncate max-w-[200px]">
            {resumeData?.title || "Untitled Resume"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Auto-save status indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-900/50 border border-zinc-800">
            {isAutoSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
                <span className="text-sm text-zinc-400">Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-emerald-500">Auto-saved</span>
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
        <ResizablePanel className="min-w-0 h-full p-2">
          <Chat resumeId={id} />
        </ResizablePanel>
        {resumeData?.content! && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel className="min-w-0 p-6 flex flex-col gap-6 bg-zinc-950/50">
              <div className="flex items-center gap-2 shrink-0">
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
