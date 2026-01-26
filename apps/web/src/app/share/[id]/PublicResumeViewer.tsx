"use client";

import { useEffect } from "react";
import { type ResumeEntity, useResumeStore } from "@/store/useResumeStore";
import ResumePreview from "../../../components/resume/ResumePreview";

export function PublicResumeViewer({ data }: { data: unknown }) {
  const { setResumeData } = useResumeStore();

  useEffect(() => {
    if (data) {
      setResumeData(data as ResumeEntity);
    }
  }, [data, setResumeData]);

  return <ResumePreview />;
}
