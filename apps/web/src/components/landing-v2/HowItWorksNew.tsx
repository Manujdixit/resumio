"use client";
import { Download, Sparkles, Upload } from "lucide-react";
import type React from "react";

const steps = [
  {
    step: "1",
    icon: Upload,
    title: "Upload your resume",
    description:
      "Upload your existing resume in PDF, DOC, or DOCX format. We'll extract all your information automatically, or start from scratch with our guided builder.",
  },
  {
    step: "2",
    icon: Sparkles,
    title: "Let AI optimize it",
    description:
      "Our AI analyzes your content, enhances weak bullet points, adds missing keywords, and ensures ATS compatibility—all in seconds.",
  },
  {
    step: "3",
    icon: Download,
    title: "Download and apply",
    description:
      "Download your polished resume in PDF format, ready to send to employers. Track your applications and iterate as needed.",
  },
];

export const HowItWorksNew: React.FC = () => {
  return (
    <section id="how-it-works" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
            How to create a professional resume
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Three simple steps to your dream job.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, _index) => (
            <div
              key={step.title}
              className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-6 inline-flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-600 text-sm">
                Step {step.step}
              </div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                <step.icon size={24} className="text-gray-600" />
              </div>
              <h3 className="mb-3 font-bold text-gray-900 text-xl">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
