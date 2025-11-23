"use client";

import { useEffect } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import ResumePreview from "../../../components/resume/ResumePreview";

export function PublicResumeViewer({ data }: { data: any }) {
  const { setResumeData } = useResumeStore();

  useEffect(() => {
    if (data) {
      setResumeData(data);
    }
  }, [data, setResumeData]);

  return <ResumePreview />;
}
