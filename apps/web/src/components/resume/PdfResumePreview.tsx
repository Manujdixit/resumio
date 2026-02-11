"use client";
import { usePDF } from "@react-pdf/renderer";
import {
  Download,
  Loader2,
  Minus,
  Plus,
  RefreshCw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { ResumeType } from "@/lib/schemas/ResumeSchema";
import { useResumeStore } from "@/store/useResumeStore";
import { SelectionActionMenu } from "./SelectionActionMenu";
import { getPdfTemplate } from "./templateUtils";

// Configure worker
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

export default function PdfResumePreview() {
  const { resumeData, selectedTemplate } = useResumeStore();
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(0.8);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  // PDF Generation Hook
  const [instance, updateInstance] = usePDF({
    document: resumeData?.content ? (
      getPdfTemplate(selectedTemplate, resumeData.content as ResumeType)
    ) : (
      <Document />
    ),
  });

  // Update PDF instance when data changes
  useEffect(() => {
    if (resumeData?.content) {
      updateInstance(
        getPdfTemplate(selectedTemplate, resumeData.content as ResumeType),
      );
    }
  }, [resumeData?.content, selectedTemplate, updateInstance]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2.0));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.4));

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (resumeData?.content) {
      await updateInstance(
        getPdfTemplate(selectedTemplate, resumeData.content as ResumeType),
      );
    }
    // Small delay to show the refresh animation
    await updateInstance(
      getPdfTemplate(selectedTemplate, resumeData.content as ResumeType),
    );
    setIsRefreshing(false);
  };

  const handleDownload = () => {
    if (instance.url) {
      const link = document.createElement("a");
      link.href = instance.url;
      link.download = `${resumeData?.title || "resume"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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

  if (!instance.url) {
    return (
      <div className="flex h-full items-center justify-center text-zinc-500">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Generating Preview...</span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-zinc-900/50">
      <ContextMenu>
        {/* Zoom Controls */}
        <div className="-translate-x-1/2 absolute bottom-6 left-1/2 z-10 flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/90 px-3 py-1.5 text-zinc-100 shadow-xl backdrop-blur-sm transition-all hover:bg-zinc-800">
          <button
            type="button"
            onClick={handleZoomOut}
            className="rounded p-1 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            aria-label="Zoom out"
          >
            <Minus size={14} />
          </button>
          <span className="min-w-[3rem] text-center font-medium text-xs">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            className="rounded p-1 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            aria-label="Zoom in"
          >
            <Plus size={14} />
          </button>
          <div className="h-4 w-px bg-zinc-600" />
          <button
            type="button"
            onClick={handleRefresh}
            className="rounded p-1 text-zinc-400 hover:bg-zinc-700 hover:text-white disabled:opacity-50"
            aria-label="Refresh PDF"
            disabled={isRefreshing}
          >
            <RefreshCw
              size={14}
              className={isRefreshing ? "animate-spin" : ""}
            />
          </button>
        </div>

        <ContextMenuTrigger asChild>
          <div
            ref={pdfContainerRef}
            id="pdf-container"
            className="flex h-full w-full cursor-pdf-custom justify-center overflow-auto p-8 pb-24"
          >
            <div className="max-w-max">
              <Document
                file={instance.url}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex items-center text-zinc-400">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
                    Document...
                  </div>
                }
                error={
                  <div className="text-red-400">Failed to load preview.</div>
                }
                className="flex flex-col gap-4"
              >
                {Array.from(new Array(numPages), (_el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    renderTextLayer={true}
                    renderAnnotationLayer={false}
                    className="shadow-xl"
                    canvasBackground="white"
                    scale={scale}
                  />
                ))}
              </Document>
            </div>
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent className="w-48 cursor-pdf-custom">
          <ContextMenuItem onClick={handleZoomIn}>
            <ZoomIn className="mr-2 h-4 w-4" /> Zoom In
          </ContextMenuItem>
          <ContextMenuItem onClick={handleZoomOut}>
            <ZoomOut className="mr-2 h-4 w-4" /> Zoom Out
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {/* Selection Action Menu for AI-powered text editing */}
      <SelectionActionMenu containerRef={pdfContainerRef} />
    </div>
  );
}
