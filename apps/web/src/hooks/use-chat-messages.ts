import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import type { UIMessage } from "ai";

// Query key factory
const chatKeys = {
  all: ["chat"] as const,
  messages: (resumeId: string) =>
    [...chatKeys.all, "messages", resumeId] as const,
};

// Fetch chat messages for a resume
export function useChatMessages(resumeId?: string) {
  return useQuery({
    queryKey: chatKeys.messages(resumeId ?? ""),
    queryFn: async () => {
      if (!resumeId) return [];
      const res = await fetch(`/api/chat/messages?resumeId=${resumeId}`);
      if (!res.ok) throw new Error("Failed to fetch chat messages");
      const data = await res.json();
      return data.messages as UIMessage[];
    },
    enabled: !!resumeId,
    staleTime: Infinity, // Don't refetch, we manage this manually
    refetchOnWindowFocus: false,
  });
}

// Save chat messages - debounced
export function useSaveChatMessages(resumeId?: string) {
  const queryClient = useQueryClient();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingMessagesRef = useRef<UIMessage[] | null>(null);

  const mutation = useMutation({
    mutationFn: async (messages: UIMessage[]) => {
      if (!resumeId) return;
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId, messages }),
      });
      if (!res.ok) throw new Error("Failed to save chat messages");
      return res.json();
    },
    onSuccess: () => {
      // Update the cache after save
      if (resumeId && pendingMessagesRef.current) {
        queryClient.setQueryData(
          chatKeys.messages(resumeId),
          pendingMessagesRef.current
        );
      }
    },
  });

  // Debounced save function
  const saveMessages = useCallback(
    (messages: UIMessage[]) => {
      if (!resumeId) return;

      pendingMessagesRef.current = messages;

      // Clear any pending save
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Debounce the save by 1 second
      timeoutRef.current = setTimeout(() => {
        mutation.mutate(messages);
      }, 1000);
    },
    [resumeId, mutation]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Immediate save (for when component unmounts)
  const saveImmediately = useCallback(
    (messages: UIMessage[]) => {
      if (!resumeId) return;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      mutation.mutate(messages);
    },
    [resumeId, mutation]
  );

  return { saveMessages, saveImmediately, isSaving: mutation.isPending };
}
