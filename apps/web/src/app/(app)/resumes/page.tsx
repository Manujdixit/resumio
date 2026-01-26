"use client";
import { formatDistanceToNow } from "date-fns";
import {
  Edit,
  ExternalLink,
  FileText,
  Globe,
  Lock,
  MoreVertical,
  Plus,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  useCreateResume,
  useDeleteResume,
  useResumes,
  useUpdateResume,
} from "@/hooks/use-resumes";

interface Resume {
  id: string;
  title: string;
  updatedAt: string;
  isPublic: boolean;
  thumbnail?: string;
  shareId?: string;
  content?: unknown;
}

const CornerBrackets = () => (
  <>
    <div className="absolute top-0 left-0 h-2 w-2 border-border border-t border-l transition-colors group-hover:border-foreground" />
    <div className="absolute top-0 right-0 h-2 w-2 border-border border-t border-r transition-colors group-hover:border-foreground" />
    <div className="absolute bottom-0 left-0 h-2 w-2 border-border border-b border-l transition-colors group-hover:border-foreground" />
    <div className="absolute right-0 bottom-0 h-2 w-2 border-border border-r border-b transition-colors group-hover:border-foreground" />
  </>
);

export default function ResumesPage() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const router = useRouter();

  const { data: resumes = [], isLoading } = useResumes();
  const createResumeMutation = useCreateResume();
  const deleteResumeMutation = useDeleteResume();
  const updateResumeMutation = useUpdateResume();

  const handleCreateResume = async () => {
    const newResume = await createResumeMutation.mutateAsync("Untitled Resume");
    router.push(`/chat/${newResume.id}`);
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this resume?")) return;
    await deleteResumeMutation.mutateAsync(id);
  };

  const handleTogglePublic = async () => {
    if (!selectedResume) return;
    await updateResumeMutation.mutateAsync({
      id: selectedResume.id,
      data: {
        isPublic: !selectedResume.isPublic,
        title: selectedResume.title,
        content: selectedResume.content,
      },
    });
    toast.success(
      !selectedResume.isPublic
        ? "Resume is now public!"
        : "Resume is now private",
    );
    setAlertOpen(false);
    setSelectedResume(null);
  };

  const openPublicDialog = (e: React.MouseEvent, resume: Resume) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedResume(resume);
    setAlertOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="font-mono text-muted-foreground">
          Loading resumes...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center border-border border-b px-4">
        <SidebarTrigger />
        <h1 className="ml-4 font-semibold text-foreground text-lg">
          My Resumes
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Create New Card */}
            <motion.button
              onClick={handleCreateResume}
              disabled={createResumeMutation.isPending}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative flex h-[280px] flex-col items-center justify-center gap-4 border border-border bg-muted/20 p-6 text-muted-foreground transition-all hover:border-muted-foreground hover:bg-muted/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CornerBrackets />
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-muted transition-transform group-hover:scale-110">
                <Plus size={32} />
              </div>
              <span className="font-bold font-mono">
                {createResumeMutation.isPending ? "CREATING..." : "CREATE NEW"}
              </span>
            </motion.button>

            {/* Resume Cards */}
            {resumes.map((resume, i) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                index={i}
                onDelete={handleDelete}
                onTogglePublic={openPublicDialog}
                isDeleting={deleteResumeMutation.isPending}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedResume?.isPublic
                ? "Make Resume Private?"
                : "Make Resume Public?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedResume?.isPublic
                ? "This will make your resume private. The share link will no longer work."
                : "This will make your resume publicly accessible. Anyone with the link can view it."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleTogglePublic}
              disabled={updateResumeMutation.isPending}
            >
              {updateResumeMutation.isPending
                ? "Updating..."
                : selectedResume?.isPublic
                  ? "Make Private"
                  : "Make Public"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

const ResumeCard = ({
  resume,
  index,
  onDelete,
  onTogglePublic,
  isDeleting,
}: {
  resume: Resume;
  index: number;
  onDelete: (e: React.MouseEvent, id: string) => void;
  onTogglePublic: (e: React.MouseEvent, resume: Resume) => void;
  isDeleting: boolean;
}) => {
  return (
    <Link href={`/chat/${resume.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group relative flex h-[280px] flex-col border border-border bg-muted/20 transition-all hover:border-muted-foreground hover:bg-muted/40"
      >
        <CornerBrackets />

        {/* Preview Area */}
        <div className="relative m-2 flex flex-1 items-center justify-center overflow-hidden rounded-sm bg-background/30 p-6">
          <div className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30">
            <div className="flex h-full w-full flex-col gap-2 p-4">
              <div className="mb-4 h-2 w-1/3 rounded-full bg-muted-foreground" />
              <div className="h-1.5 w-full rounded-full bg-muted" />
              <div className="h-1.5 w-full rounded-full bg-muted" />
              <div className="h-1.5 w-2/3 rounded-full bg-muted" />
              <div className="mt-4 h-2 w-1/4 rounded-full bg-muted-foreground/60" />
              <div className="h-1.5 w-full rounded-full bg-muted" />
            </div>
          </div>
          <FileText
            size={48}
            className="relative z-10 text-muted transition-colors group-hover:text-muted-foreground"
          />
        </div>

        {/* Footer */}
        <div className="border-border/50 border-t bg-muted/20 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className="max-w-[150px] truncate font-bold font-mono text-foreground"
                  title={resume.title}
                >
                  {resume.title}
                </h3>
                {resume.isPublic && (
                  <Globe size={14} className="flex-shrink-0 text-emerald-500" />
                )}
              </div>
              <p className="mt-1 font-mono text-muted-foreground text-xs">
                Edited {formatDistanceToNow(new Date(resume.updatedAt))} ago
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="-mr-2 h-8 w-8"
                  onClick={(e) => e.preventDefault()}
                >
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/chat/${resume.id}`}>
                    <Edit size={14} className="mr-2" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    if (!resume.isPublic) {
                      toast.error("Resume must be public to share");
                      return;
                    }
                    navigator.clipboard.writeText(
                      `${window.location.origin}/share/${
                        resume.shareId || resume.id
                      }`,
                    );
                    toast.success("Share link copied!");
                  }}
                  disabled={!resume.isPublic}
                >
                  <ExternalLink size={14} className="mr-2" />
                  {resume.isPublic
                    ? "Copy Share Link"
                    : "Share (Make Public First)"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => onTogglePublic(e, resume)}>
                  {resume.isPublic ? (
                    <>
                      <Lock size={14} className="mr-2" />
                      Make Private
                    </>
                  ) : (
                    <>
                      <Globe size={14} className="mr-2" />
                      Make Public
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => onDelete(e, resume.id)}
                  disabled={isDeleting}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 size={14} className="mr-2" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
