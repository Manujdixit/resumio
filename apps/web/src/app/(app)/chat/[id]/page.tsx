"use client";

import { CheckCircle2, Download, Loader2, Share2 } from "lucide-react";
import { use, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import Chat from "@/components/chat/Chat";
import ResumePreview from "@/components/resume/ResumePreview";
import { TemplateSelector } from "@/components/resume/TemplateSelector";
import { Button } from "@/components/ui/button";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useIsMobile } from "@/hooks/use-mobile";
import { useResume, useUpdateResume } from "@/hooks/use-resumes";
import { useResumeStore } from "@/store/useResumeStore";

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
	const [isAutoSaving, _setIsAutoSaving] = useState(false);

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
			<div className="flex h-full items-center justify-center">
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
				<ResizablePanel className="flex h-full min-w-0 flex-col">
					{/* Chat Header */}
					<div className="shrink-0">
						<div className="relative flex h-12 items-center bg-background px-8">
							<h1 className="truncate font-medium text-foreground text-sm">
								{resumeData?.title || "Untitled Resume"}
							</h1>
							<div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-6 translate-y-full bg-gradient-to-b from-background to-transparent" />
						</div>
						{/* Blur mask gradient effect */}
					</div>
					<div className="relative flex-1 overflow-hidden">
						<Chat resumeId={id} className="pt-0" />
					</div>
				</ResizablePanel>

				{hasResumeContent && (
					<>
						<ResizableHandle withHandle />
						{/* Preview Panel with its own header */}
						<ResizablePanel className="flex h-full min-w-0 flex-col bg-muted/20">
							{/* Preview Header */}
							<div className="flex h-12 shrink-0 items-center justify-between border-border border-b bg-background px-4">
								<TemplateSelector />
								<div className="flex items-center gap-1">
									{/* Auto-save indicator */}
									<div className="hidden items-center gap-1.5 rounded-md px-2 py-1 text-xs sm:flex">
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
										<span className="ml-1.5 hidden text-xs sm:inline">
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
										<span className="hidden text-xs sm:inline">
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
