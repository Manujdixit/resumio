"use client";

import { toPng } from "html-to-image";
import { Check, Copy, Download, Linkedin, Twitter } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ShareableScoreCardProps {
  grade: string;
  overallScore: number;
  categoryScores: {
    content: number;
    formatting: number;
    ats: number;
    impact: number;
    completeness: number;
  };
}

export function ShareableScoreCard({
  grade,
  overallScore,
  categoryScores,
}: ShareableScoreCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
      case "A":
        return "bg-gradient-to-br from-emerald-400 to-emerald-600";
      case "B+":
      case "B":
        return "bg-gradient-to-br from-blue-400 to-blue-600";
      case "C":
        return "bg-gradient-to-br from-amber-400 to-orange-500";
      default:
        return "bg-gradient-to-br from-gray-400 to-gray-600";
    }
  };

  const getRarityLabel = (grade: string) => {
    switch (grade) {
      case "A+":
        return "EXCEPTIONAL";
      case "A":
        return "EXCELLENT";
      case "B+":
      case "B":
        return "GOOD";
      case "C":
        return "FAIR";
      default:
        return "NEEDS WORK";
    }
  };

  const categories = [
    { label: "Content", score: categoryScores.content },
    { label: "Format", score: categoryScores.formatting },
    { label: "ATS", score: categoryScores.ats },
    { label: "Impact", score: categoryScores.impact },
    { label: "Complete", score: categoryScores.completeness },
  ];

  const topCategory = categories.reduce((prev, current) =>
    prev.score > current.score ? prev : current,
  );

  const downloadCard = useCallback(async () => {
    if (cardRef.current === null) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `resume-score-${grade}.png`;
      link.href = dataUrl;
      link.click();

      toast.success("Score card downloaded!");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to download image");
    }
  }, [grade]);

  const copyToClipboard = useCallback(async () => {
    if (cardRef.current === null) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
      });

      const response = await fetch(dataUrl);
      const blob = await response.blob();

      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);

      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast.error("Failed to copy image");
    }
  }, []);

  const shareOnLinkedIn = () => {
    const text = encodeURIComponent(
      `I scored ${grade} (${overallScore}/100) on my resume!`,
    );
    const url = encodeURIComponent("https://resumio.io/tools/resume-scorer");
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`,
      "_blank",
      "width=600,height=400",
    );
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      `Resume score: ${grade} (${overallScore}/100)`,
    );
    const url = encodeURIComponent("https://resumio.io/tools/resume-scorer");
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
      "width=600,height=400",
    );
  };

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <div className="flex justify-center">
        <div
          ref={cardRef}
          className="w-[320px] overflow-hidden rounded-[28px] bg-[#0a0a0a] p-2.5"
        >
          <div className="overflow-hidden rounded-[22px]">
            {/* Grade Display */}
            <div className={`relative aspect-square ${getGradeColor(grade)}`}>
              {/* Rarity Badge */}
              <div className="-translate-x-1/2 absolute top-4 left-1/2 z-10">
                <div className="rounded-full bg-white/25 px-3 py-1 backdrop-blur-sm">
                  <span className="font-semibold text-white text-xs tracking-wider">
                    {getRarityLabel(grade)}
                  </span>
                </div>
              </div>

              {/* Grade */}
              <div className="flex h-full items-center justify-center">
                <span className="font-black text-[120px] text-white leading-none">
                  {grade}
                </span>
              </div>

              {/* Score Bar */}
              <div className="absolute right-0 bottom-0 left-0 bg-black/50 py-3">
                <p className="text-center font-bold text-2xl text-white">
                  {overallScore}/100
                </p>
              </div>
            </div>

            {/* Info Section */}
            <div className="bg-[#141414] p-5">
              {/* Title */}
              <h3 className="mb-1 font-bold text-white text-xl">
                RESUME <span className="text-gray-500">#{overallScore}</span>
              </h3>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-1 font-medium text-gray-500 text-xs uppercase tracking-wide">
                    Top Category
                  </p>
                  <p className="font-semibold text-base text-white">
                    {topCategory.label}
                  </p>
                </div>
                <div>
                  <p className="mb-1 font-medium text-gray-500 text-xs uppercase tracking-wide">
                    Score
                  </p>
                  <p className="font-semibold text-base text-white">
                    {overallScore}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          onClick={shareOnLinkedIn}
          className="bg-[#0077b5] hover:bg-[#006396]"
        >
          <Linkedin className="mr-2 h-4 w-4" />
          LinkedIn
        </Button>
        <Button onClick={shareOnTwitter} className="bg-black hover:bg-gray-800">
          <Twitter className="mr-2 h-4 w-4" />X
        </Button>
        <Button onClick={downloadCard} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button onClick={copyToClipboard} variant="outline">
          {copied ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
