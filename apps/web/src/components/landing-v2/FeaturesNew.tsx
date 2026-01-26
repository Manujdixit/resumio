"use client";
import { FileCheck, Palette, Sparkles, Target } from "lucide-react";
import Link from "next/link";
import type React from "react";

const features = [
  {
    icon: Sparkles,
    title: "AI-powered content optimization",
    headline: "Transform weak bullet points into powerful achievements",
    description:
      "Our AI analyzes your experience and rewrites content to highlight impact and results. Turn passive descriptions into compelling achievements that catch recruiters' attention.",
    image: "/placeholder-feature-1.png",
    imagePosition: "right" as const,
  },
  {
    icon: Target,
    title: "ATS optimization built-in",
    headline: "Pass automated screening with flying colors",
    description:
      "Every resume is optimized for Applicant Tracking Systems. We ensure proper formatting, keyword density, and structure so your resume gets seen by human recruiters.",
    image: "/placeholder-feature-2.png",
    imagePosition: "left" as const,
  },
  {
    icon: FileCheck,
    title: "Job-specific targeting",
    headline: "Tailor your resume to any position instantly",
    description:
      "Paste a job description and watch as AI identifies missing keywords and suggests improvements. Get a perfect match score and increase your chances of landing interviews.",
    image: "/placeholder-feature-3.png",
    imagePosition: "right" as const,
  },
  {
    icon: Palette,
    title: "Professional templates",
    headline: "Beautiful designs that work everywhere",
    description:
      "Choose from dozens of professionally designed templates. Each one is tested for ATS compatibility while looking stunning in PDF format.",
    image: "/placeholder-feature-4.png",
    imagePosition: "left" as const,
  },
];

export const FeaturesNew: React.FC = () => {
  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
            Professional resumes without the hassle
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Everything you need to create, optimize, and land your dream job.
          </p>
        </div>

        <div className="space-y-32">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                feature.imagePosition === "left"
                  ? "lg:flex-row-reverse"
                  : "lg:flex-row"
              } items-center gap-12 lg:gap-20`}
            >
              {/* Text Content */}
              <div className="max-w-xl flex-1">
                <div className="mb-4 flex items-center gap-2 text-gray-500 text-sm">
                  <feature.icon size={18} />
                  <span>{feature.title}</span>
                </div>
                <h3 className="mb-4 font-bold text-2xl text-gray-900 md:text-3xl">
                  {feature.headline}
                </h3>
                <p className="mb-6 text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
                >
                  Get started for free
                </Link>
              </div>

              {/* Image/Visual */}
              <div className="w-full flex-1">
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
                  {/* Placeholder visual - In production, replace with actual images */}
                  <div className="absolute inset-4 flex items-center justify-center rounded-xl bg-white shadow-lg">
                    <div className="p-8 text-center">
                      <feature.icon
                        size={48}
                        className="mx-auto mb-4 text-gray-300"
                      />
                      <p className="text-gray-400 text-sm">
                        Feature visualization
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
