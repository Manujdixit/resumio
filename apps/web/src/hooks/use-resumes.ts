import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { useResumeStore } from "@/store/useResumeStore";

interface Resume {
  id: string;
  title: string;
  updatedAt: string;
  isPublic: boolean;
  thumbnail?: string;
  shareId?: string;
  content?: any;
}

// Query Keys
export const resumeKeys = {
  all: ["resumes"] as const,
  detail: (id: string) => ["resumes", id] as const,
};

export function useResume(id: string) {
  const setResumeData = useResumeStore((state) => state.setResumeData);

  const query = useQuery({
    queryKey: resumeKeys.detail(id),
    queryFn: async () => {
      const res = await fetch(`/api/resumes/${id}`);
      if (!res.ok) throw new Error("Failed to fetch resume");
      return res.json();
    },
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (query.data) {
      setResumeData(query.data);
    }
  }, [query.data, setResumeData]);

  return query;
}

// Fetch all resumes
export function useResumes() {
  return useQuery({
    queryKey: resumeKeys.all,
    queryFn: async (): Promise<Resume[]> => {
      const res = await fetch("/api/resumes");
      if (!res.ok) throw new Error("Failed to fetch resumes");
      return res.json();
    },
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
}

// Create a new resume
export function useCreateResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title: string = "Untitled Resume") => {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error("Failed to create resume");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resumeKeys.all });
    },
    onError: () => {
      toast.error("Failed to create resume");
    },
  });
}

// Delete a resume
export function useDeleteResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/resumes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete resume");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resumeKeys.all });
      toast.success("Resume deleted");
    },
    onError: () => {
      toast.error("Failed to delete resume");
    },
  });
}

// Update resume (including toggle public/private)
export function useUpdateResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Resume> }) => {
      const res = await fetch(`/api/resumes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update resume");
      return res.json();
    },
    onSuccess: (updatedResume) => {
      queryClient.invalidateQueries({ queryKey: resumeKeys.all });
      queryClient.invalidateQueries({
        queryKey: resumeKeys.detail(updatedResume.id),
      });
    },
    onError: () => {
      toast.error("Failed to update resume");
    },
  });
}
