"use client";
import { useEffect, useState, useRef } from "react";
import { Loader2, Minus, Plus, ZoomIn, ZoomOut, Download } from "lucide-react";
import { pdfjs, Document, Page } from 'react-pdf';
import { usePDF } from "@react-pdf/renderer";
import 'react-pdf/dist/Page/TextLayer.css';
import { SelectionActionMenu } from "./SelectionActionMenu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/useResumeStore";
import { ModernTemplatePdf } from "./pdf/ModernTemplatePdf";
import type { ResumeType } from "@/app/schemas/ResumeSchema";

// Configure worker
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

export default function PdfResumePreview() {
  const { resumeData, selectedTemplate } = useResumeStore();
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(0.8);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  // PDF Generation Hook
  const [instance, updateInstance] = usePDF({ 
    document: resumeData?.content ? <ModernTemplatePdf data={resumeData.content as ResumeType} /> : <></>
  });

  // Update PDF instance when data changes
  useEffect(() => {
    if (resumeData?.content) {
      updateInstance(<ModernTemplatePdf data={resumeData.content as ResumeType} />);
    }
  }, [resumeData?.content, updateInstance]);


  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2.0));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.4));

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
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/90 px-3 py-1.5 text-zinc-100 shadow-xl backdrop-blur-sm transition-all hover:bg-zinc-800">
          <button
            type="button"
            onClick={handleZoomOut}
            className="rounded p-1 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            aria-label="Zoom out"
          >
            <Minus size={14} />
          </button>
          <span className="min-w-[3rem] text-center text-xs font-medium">
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
        </div>

        <ContextMenuTrigger asChild>
          <div
            ref={pdfContainerRef}
            id="pdf-container"
            className="flex h-full w-full justify-center overflow-auto p-8 pb-24 cursor-pdf-custom"
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
                {Array.from(new Array(numPages), (el, index) => (
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
