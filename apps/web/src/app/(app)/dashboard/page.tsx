"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Plus,
  FileText,
  MoreVertical,
  Trash2,
  ExternalLink,
  Edit,
  Globe,
  Lock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import {
  useResumes,
  useCreateResume,
  useDeleteResume,
  useUpdateResume,
} from "@/hooks/use-resumes";

interface Resume {
  id: string;
  title: string;
  updatedAt: string;
  isPublic: boolean;
  thumbnail?: string;
  shareId?: string;
  content?: any;
}

const CornerBrackets = () => (
  <>
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700 transition-colors group-hover:border-white" />
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-700 transition-colors group-hover:border-white" />
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-700 transition-colors group-hover:border-white" />
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-700 transition-colors group-hover:border-white" />
  </>
);

export default function DashboardPage() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const router = useRouter();

  // React Query hooks
  const { data: resumes = [], isLoading } = useResumes();
  const createResumeMutation = useCreateResume();
  const deleteResumeMutation = useDeleteResume();
  const updateResumeMutation = useUpdateResume();

  const handleCreateResume = async () => {
    const newResume = await createResumeMutation.mutateAsync("Untitled Resume");
    router.push(`/editor/${newResume.id}` as any);
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
        : "Resume is now private"
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
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <div className="text-zinc-500 font-mono">Loading resumes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-white font-mono mb-2">
            MY RESUMES
          </h1>
          <p className="text-zinc-500 font-mono text-sm">
            Manage and organize your professional profiles.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Create New Card */}
          <motion.button
            onClick={handleCreateResume}
            disabled={createResumeMutation.isPending}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative h-[280px] bg-zinc-900/20 hover:bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all p-6 flex flex-col items-center justify-center gap-4 text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CornerBrackets />
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus size={32} />
            </div>
            <span className="font-mono font-bold">
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

      {/* Alert Dialog for Making Resume Public */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white font-mono">
              {selectedResume?.isPublic
                ? "Make Resume Private?"
                : "Make Resume Public?"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              {selectedResume?.isPublic ? (
                <>
                  This will make your resume private. The share link will no
                  longer work and only you will be able to view it.
                </>
              ) : (
                <>
                  This will make your resume publicly accessible. Anyone with
                  the share link will be able to view your resume (read-only).
                  <br />
                  <br />
                  <strong className="text-zinc-300">
                    Are you sure you want to make this public?
                  </strong>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleTogglePublic}
              disabled={updateResumeMutation.isPending}
              className="bg-white text-black hover:bg-zinc-200 disabled:opacity-50"
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
    <Link href={`/editor/${resume.id}` as any}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group relative h-[280px] bg-zinc-900/20 hover:bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col"
      >
        <CornerBrackets />

        {/* Preview Area */}
        <div className="flex-1 p-6 flex items-center justify-center bg-zinc-950/30 m-2 rounded-sm overflow-hidden relative">
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
            {/* Abstract representation of a resume */}
            <div className="w-full h-full p-4 flex flex-col gap-2">
              <div className="w-1/3 h-2 bg-zinc-500 rounded-full mb-4" />
              <div className="w-full h-1.5 bg-zinc-700 rounded-full" />
              <div className="w-full h-1.5 bg-zinc-700 rounded-full" />
              <div className="w-2/3 h-1.5 bg-zinc-700 rounded-full" />
              <div className="mt-4 w-1/4 h-2 bg-zinc-600 rounded-full" />
              <div className="w-full h-1.5 bg-zinc-700 rounded-full" />
              <div className="w-full h-1.5 bg-zinc-700 rounded-full" />
            </div>
          </div>
          <FileText
            size={48}
            className="text-zinc-700 group-hover:text-zinc-500 transition-colors relative z-10"
          />
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/20">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3
                    className="font-mono font-bold text-white truncate max-w-[150px]"
                    title={resume.title}
                  >
                    {resume.title}
                  </h3>
                  {resume.isPublic && (
                    <Globe
                      size={14}
                      className="text-emerald-500 flex-shrink-0"
                      aria-label="Public resume"
                    />
                  )}
                </div>
                <p className="text-xs text-zinc-500 font-mono mt-1">
                  Edited {formatDistanceToNow(new Date(resume.updatedAt))} ago
                </p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mr-2 text-zinc-500 hover:text-white"
                  onClick={(e) => e.preventDefault()}
                >
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-zinc-900 border-zinc-800"
              >
                <DropdownMenuItem asChild>
                  <Link
                    href={`/editor/${resume.id}` as any}
                    className="flex items-center cursor-pointer text-zinc-300 focus:text-white focus:bg-zinc-800"
                  >
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
                      }`
                    );
                    toast.success("Share link copied!");
                  }}
                  className="flex items-center cursor-pointer text-zinc-300 focus:text-white focus:bg-zinc-800"
                  disabled={!resume.isPublic}
                >
                  <ExternalLink size={14} className="mr-2" />
                  {resume.isPublic
                    ? "Copy Share Link"
                    : "Share (Make Public First)"}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  onClick={(e) => onTogglePublic(e, resume)}
                  className="flex items-center cursor-pointer text-zinc-300 focus:text-white focus:bg-zinc-800"
                >
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
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  onClick={(e) => onDelete(e, resume.id)}
                  disabled={isDeleting}
                  className="flex items-center cursor-pointer text-red-400 focus:text-red-300 focus:bg-red-900/20 disabled:opacity-50"
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
