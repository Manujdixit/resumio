"use client";
import { FileText, Sparkles, Upload } from "lucide-react";
import Link from "next/link";
import type React from "react";

export const HeroNew: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white pt-32 pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Main Content */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <h1 className="mb-6 font-bold text-5xl text-gray-900 tracking-tight md:text-6xl lg:text-7xl">
            Build your resume
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-gray-600 text-lg md:text-xl">
           Build ur resume now
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-4 font-medium text-white transition-all hover:scale-105 hover:bg-gray-800"
            >
              <Sparkles size={18} />
              Get started for free
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 font-medium text-gray-900 transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              See how it works
            </Link>
          </div>
        </div>

        {/* Interactive Upload Area */}
        <div className="relative mx-auto max-w-4xl">
          {/* Floating Resume Images */}
          <div className="-left-12 -translate-y-1/2 absolute top-1/2 hidden lg:block">
            <div className="-rotate-6 h-40 w-32 transform rounded-xl border border-gray-100 bg-white shadow-2xl shadow-gray-200/50 transition-transform duration-500 hover:rotate-0">
              <div className="space-y-2 p-3">
                <div className="h-3 w-3/4 rounded bg-gray-200" />
                <div className="h-2 w-full rounded bg-gray-100" />
                <div className="h-2 w-5/6 rounded bg-gray-100" />
                <div className="h-2 w-4/5 rounded bg-gray-100" />
              </div>
            </div>
          </div>

          <div className="-right-12 -translate-y-1/2 absolute top-1/2 hidden lg:block">
            <div className="h-40 w-32 rotate-6 transform rounded-xl border border-gray-100 bg-white shadow-2xl shadow-gray-200/50 transition-transform duration-500 hover:rotate-0">
              <div className="space-y-2 p-3">
                <div className="h-3 w-2/3 rounded bg-gray-800" />
                <div className="h-2 w-full rounded bg-gray-200" />
                <div className="h-2 w-4/5 rounded bg-gray-200" />
                <div className="h-2 w-3/4 rounded bg-gray-200" />
              </div>
            </div>
          </div>

          {/* Upload Card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-gray-200/50 shadow-xl md:p-12">
            <div className="group cursor-pointer rounded-xl border-2 border-gray-200 border-dashed p-12 text-center transition-all hover:border-gray-300 hover:bg-gray-50/50">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 transition-colors group-hover:bg-gray-200">
                <Upload className="h-8 w-8 text-gray-500" />
              </div>
              <p className="mb-2 font-medium text-gray-900 text-lg">
                Drop your resume here
              </p>
              <p className="mb-6 text-gray-500">
                or click to upload a PDF, DOC, or DOCX file
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <FileText size={14} />
                  PDF
                </span>
                <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <FileText size={14} />
                  DOCX
                </span>
                <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <FileText size={14} />
                  DOC
                </span>
              </div>
            </div>

            {/* Sample Images */}
            <div className="mt-8 text-center">
              <p className="mb-4 text-gray-500 text-sm">
                No resume? Try one of these:
              </p>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    type="button"
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 transition-colors hover:bg-gray-200"
                  >
                    <FileText size={20} className="text-gray-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
