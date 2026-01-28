import type React from "react";
import { cn } from "@/lib/utils";

interface ATSResultCardProps {
  score: number;
  grade: string;
  summary: string;
}

export const ATSResultCard: React.FC<ATSResultCardProps> = ({
  score,
  grade,
  summary,
}) => {
  // Determine color based on score
  let colorClass = "text-red-500";
  let bgClass = "bg-red-50";
  let strokeColor = "#ef4444"; // red-500

  if (score >= 90) {
    colorClass = "text-green-600";
    bgClass = "bg-green-50";
    strokeColor = "#16a34a"; // green-600
  } else if (score >= 70) {
    colorClass = "text-blue-600";
    bgClass = "bg-blue-50";
    strokeColor = "#2563eb"; // blue-600
  } else if (score >= 50) {
    colorClass = "text-yellow-600";
    bgClass = "bg-yellow-50";
    strokeColor = "#ca8a04"; // yellow-600
  }

  // Calculate circle dash array
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
      <div className="relative mb-6 h-40 w-40">
        {/* Background Circle */}
        <svg
          className="-rotate-90 h-full w-full transform"
          viewBox="0 0 120 120"
          role="img"
          aria-label={`ATS Score: ${score} out of 100`}
        >
          <title>ATS Score Gauge</title>
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
          />
          {/* Progress Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold text-4xl", colorClass)}>{score}</span>
          <span className="font-medium text-gray-500 text-xs uppercase">
            Score
          </span>
        </div>
      </div>

      <div
        className={cn(
          "mb-3 inline-flex rounded-full px-3 py-1 font-bold text-sm",
          bgClass,
          colorClass,
        )}
      >
        Grade: {grade}
      </div>

      <h3 className="mb-2 font-semibold text-gray-900 text-xl">
        Analysis Result
      </h3>
      <p className="text-gray-600">{summary}</p>
    </div>
  );
};
