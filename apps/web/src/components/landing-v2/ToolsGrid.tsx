"use client";
import {
  Download,
  FileCheck,
  FileText,
  GitMerge,
  Globe,
  Layout,
  Palette,
  Shield,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import type React from "react";

const tools = [
  {
    icon: Sparkles,
    title: "AI Bullet Enhancer",
    description:
      "Transform weak descriptions into powerful, results-oriented achievements automatically.",
  },
  {
    icon: Target,
    title: "Keyword Matching",
    description:
      "Identify missing keywords from job descriptions and add them seamlessly to your resume.",
  },
  {
    icon: FileCheck,
    title: "ATS Scanner",
    description:
      "Check your resume against 50+ ATS systems to ensure it passes automated screening.",
  },
  {
    icon: Layout,
    title: "Smart Formatting",
    description:
      "Automatic margin and spacing adjustments for perfect layout every time.",
  },
  {
    icon: GitMerge,
    title: "Version Control",
    description:
      "Create multiple versions of your resume for different job applications and track changes.",
  },
  {
    icon: FileText,
    title: "Cover Letter Generator",
    description:
      "Generate tailored cover letters that complement your resume for each application.",
  },
  {
    icon: Palette,
    title: "Template Library",
    description:
      "Access 50+ professionally designed templates suitable for any industry.",
  },
  {
    icon: Zap,
    title: "Instant PDF Export",
    description:
      "Download your resume as a perfectly formatted PDF in one click.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your data is encrypted and never shared. Delete anytime with one click.",
  },
  {
    icon: Download,
    title: "LinkedIn Import",
    description:
      "Import your LinkedIn profile instantly and convert it to a professional resume.",
  },
  {
    icon: Users,
    title: "Expert Review",
    description:
      "Get feedback from professional resume writers on our premium plan.",
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description:
      "Create resumes in 20+ languages with proper localization and formatting.",
  },
];

export const ToolsGrid: React.FC = () => {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
            All the tools you need to land interviews
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Everything to create, optimize, and manage your job applications in
            one place.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, _index) => (
            <div key={tool.title} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                <tool.icon size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900">
                  {tool.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
