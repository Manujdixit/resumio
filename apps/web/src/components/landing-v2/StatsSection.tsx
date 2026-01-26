"use client";
import type React from "react";

const stats = [
  {
    value: "96%",
    label: "higher interview rate",
    color: "text-blue-500",
  },
  {
    value: "3x",
    label: "faster resume creation",
    color: "text-purple-500",
  },
  {
    value: "85%",
    label: "ATS pass rate improvement",
    color: "text-green-500",
  },
  {
    value: "4.9★",
    label: "average user rating",
    color: "text-amber-500",
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
            Real results from job seekers
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Join thousands who have successfully landed their dream jobs using
            our AI-powered resume builder.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className={`font-bold text-5xl md:text-6xl ${stat.color} mb-2`}
              >
                {stat.value}
              </div>
              <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
