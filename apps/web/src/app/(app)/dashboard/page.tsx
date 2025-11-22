// import { redirect } from "next/navigation";
// import Dashboard from "./dashboard";
// import { headers } from "next/headers";
// import { auth } from "@resumio/auth";
// import { authClient } from "@/lib/auth-client";

// export default async function DashboardPage() {
// 	const session = await auth.api.getSession({
// 		headers: await headers(),
// 	});

// 	if (!session?.user) {
// 		redirect("/login");
// 	}

// 	const { data: customerState } = await authClient.customer.state({
// 		fetchOptions: {
// 			headers: await headers(),
// 		},
// 	});

// 	return (
// 		<div>
// 			<h1>Dashboard</h1>
// 			<p>Welcome {session.user.name}</p>
// 			<Dashboard session={session} customerState={customerState} />
// 		</div>
// 	);
// }

"use client";
import Chat from "../../../components/chat/Chat";
import ResumePreview from "../../../components/resume/ResumePreview";
import { TemplateSelector } from "../../../components/resume/TemplateSelector";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRef, useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Loader2 } from "lucide-react";
import { useReactToPrint } from "react-to-print";

export default function Page() {
  const isMobile = useIsMobile();
  const resumeRef = useRef<HTMLDivElement>(null);
  const { resumeData } = useResumeStore();
  const [isExporting, setIsExporting] = useState(false);

  const reactToPrintFn = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: resumeData?.personalInfo?.fullName || "Resume",
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

  return (
    <div className="h-full overflow-hidden">
      <ResizablePanelGroup
        className="h-full"
        direction={isMobile ? "vertical" : "horizontal"}
      >
        <ResizablePanel className="min-w-0 h-full p-2">
          <Chat />
        </ResizablePanel>
        {resumeData && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel className="min-w-0 p-6 flex flex-col gap-6">
              <div className="flex items-center gap-2 shrink-0">
                <TemplateSelector />
                <Button
                  onClick={handleExport}
                  size="sm"
                  variant="outline"
                  className="ml-auto"
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="mr-2 h-4 w-4" />
                  )}
                  {isExporting ? "Exporting..." : "Export"}
                </Button>
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
