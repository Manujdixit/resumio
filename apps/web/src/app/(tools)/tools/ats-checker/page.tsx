import type { Metadata } from "next";
import ATSCheckeClient from "./ATSCheckeClient";

export const metadata: Metadata = {
  title: "Free ATS Resume Checker | Scan Your Resume for ATS Compatibility",
  description:
    "Check if your resume is ATS-friendly. Our free ATS checker scans your resume for formatting issues, missing keywords, and compatibility with Applicant Tracking Systems.",
  keywords: [
    "ATS checker",
    "resume scanner",
    "ATS compatibility",
    "resume parser",
    "applicant tracking system",
  ],
  openGraph: {
    title: "Free ATS Resume Checker",
    description: "Scan your resume for ATS compatibility issues",
    type: "website",
  },
  alternates: {
    canonical: "/tools/ats-checker",
  },
};

export default function ATSCheckerPage() {
  return <ATSCheckeClient />;
}
