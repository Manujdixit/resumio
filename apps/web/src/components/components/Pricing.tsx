import React from "react";
import { Check } from "lucide-react";
import { Button } from "./Button";

const CornerBrackets = () => (
  <>
    <div
      className={`absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700 group-hover:border-white`}
    />
    <div
      className={`absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-700 group-hover:border-white`}
    />
    <div
      className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-700 group-hover:border-white`}
    />
    <div
      className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-700 group-hover:border-white`}
    />
  </>
);

const plans = [
  {
    name: "FREE",
    price: "$0",
    description: "Perfect for getting started.",
    features: [
      "1 Resume Build",
      "Basic Templates",
      "Standard AI Analysis",
      "PDF Export",
    ],
    highlight: false,
  },
  {
    name: "PRO",
    price: "$12",
    description: "Best for active job seekers.",
    features: [
      "Unlimited Resumes",
      "Job Specific Targeting",
      "Cover Letter Generator",
      "LinkedIn Optimizer",
      "Priority Support",
    ],
    highlight: true,
  },
  {
    name: "PREMIUM",
    price: "$49",
    description: "Full career concierge.",
    features: [
      "All Pro Features",
      "Human Expert Review",
      "Personal Website",
      "Interview Prep Guide",
      "Salary Negotiation Scripts",
    ],
    highlight: false,
  },
];

export const Pricing: React.FC = () => {
  return (
    <section
      id="pricing"
      className="bg-background py-24 border-b border-zinc-800"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-6 border-b border-zinc-800/30">
          <div>
            <h2 className="text-3xl font-bold text-white font-mono mb-2">
              SIMPLE PRICING
            </h2>
            <p className="text-zinc-500 font-mono text-sm">
              Invest in your career today.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="relative inline-flex items-center gap-2 text-xs text-zinc-500 font-mono px-3 py-1">
              <CornerBrackets />
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Servers Online
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative flex flex-col p-8 ${
                plan.highlight ? "bg-zinc-900/40" : "bg-zinc-900/10"
              }`}
            >
              <CornerBrackets />

              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3
                    className={`font-mono text-lg font-bold ${
                      plan.highlight ? "text-white" : "text-zinc-300"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono mt-1">
                    {plan.description}
                  </p>
                </div>
                <div className="font-mono text-xl text-white">{plan.price}</div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-zinc-400"
                  >
                    <Check
                      size={14}
                      className={`mt-0.5 ${
                        plan.highlight ? "text-white" : "text-zinc-600"
                      }`}
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlight ? "primary" : "outline"}
                className="w-full"
                mono
              >
                CHOOSE {plan.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
