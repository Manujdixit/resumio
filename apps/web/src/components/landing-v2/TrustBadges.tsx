"use client";
import { Award, Shield, Star, Users } from "lucide-react";
import type React from "react";

const badges = [
  {
    icon: Award,
    text: "Product Hunt #1",
    subtext: "Product of the Day",
  },
  {
    icon: Star,
    text: "4.9 Rating",
    subtext: "500+ Reviews",
  },
  {
    icon: Users,
    text: "50,000+",
    subtext: "Resumes Created",
  },
  {
    icon: Shield,
    text: "ATS Tested",
    subtext: "100% Compatible",
  },
];

const LaurelLeft = () => (
  <svg
    className="h-8 w-6 text-gray-300"
    viewBox="0 0 24 32"
    fill="currentColor"
    aria-hidden="true"
  >
    <title>Laurel Left</title>
    <path d="M12 0C8 4 4 12 4 20c0 4 1 8 2 12h2c-1-4-2-8-2-12 0-7 3-14 6-18V0z" />
    <path d="M8 6C5 10 3 16 3 22c0 2 0 4 1 6h2c0-2-1-4-1-6 0-5 2-10 4-14l-1-2z" />
  </svg>
);

const LaurelRight = () => (
  <svg
    className="h-8 w-6 text-gray-300"
    viewBox="0 0 24 32"
    fill="currentColor"
    aria-hidden="true"
  >
    <title>Laurel Right</title>
    <path d="M12 0c4 4 8 12 8 20 0 4-1 8-2 12h-2c1-4 2-8 2-12 0-7-3-14-6-18V0z" />
    <path d="M16 6c3 4 5 10 5 16 0 2 0 4-1 6h-2c0-2 1-4 1-6 0-5-2-10-4-14l1-2z" />
  </svg>
);

export const TrustBadges: React.FC = () => {
  return (
    <section className="border-gray-100 border-y bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {badges.map((badge, _index) => (
            <div key={badge.text} className="group flex items-center gap-3">
              <LaurelLeft />
              <div className="flex min-w-[100px] flex-col items-center text-center">
                <badge.icon className="mb-1 h-5 w-5 text-gray-400" />
                <span className="font-semibold text-gray-900 text-sm">
                  {badge.text}
                </span>
                <span className="text-gray-500 text-xs">{badge.subtext}</span>
              </div>
              <LaurelRight />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
