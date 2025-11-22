import React from 'react';
import { FileInput, Cpu, ArrowDown } from 'lucide-react';

const CornerBrackets = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-700 group-hover:border-white transition-colors duration-300" />
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-zinc-700 group-hover:border-white transition-colors duration-300" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-zinc-700 group-hover:border-white transition-colors duration-300" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-700 group-hover:border-white transition-colors duration-300" />
  </>
);

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="bg-background border-b border-zinc-800">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12">
        
        {/* Left Label */}
        <div className="lg:col-span-3 p-6 lg:p-12 border-b lg:border-b-0 lg:border-r border-zinc-800/30">
          <h3 className="font-mono text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">Process</h3>
          <h2 className="text-2xl text-white font-bold mb-4">HOW IT WORKS</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Three simple steps to your new professional resume.
          </p>
        </div>

        {/* Steps */}
        <div className="lg:col-span-9 p-6 lg:p-12 grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              label: "IMPORT DETAILS",
              text: "Upload your existing resume or start from scratch. We extract your history automatically.",
              icon: <FileInput size={20} />
            },
            {
              step: "02",
              label: "AI IMPROVEMENT",
              text: "Our AI rewrites your bullet points to sound professional and adds missing keywords.",
              icon: <Cpu size={20} />
            },
            {
              step: "03",
              label: "DOWNLOAD PDF",
              text: "Choose a clean, professional template and download your resume ready for application.",
              icon: <ArrowDown size={20} />
            }
          ].map((item, i) => (
            <div key={i} className="relative group p-8 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors min-h-[280px] flex flex-col">
              <CornerBrackets />
              
              <div className="font-mono text-xs text-zinc-500 mb-8 flex items-center gap-2">
                <span className="text-zinc-700 group-hover:text-white transition-colors">//</span>
                STEP_{item.step}
              </div>
              
              <div className="mb-6 text-zinc-400 group-hover:text-white transition-colors">
                {item.icon}
              </div>
              
              <h4 className="font-mono text-sm font-bold text-white mb-3">{item.label}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed flex-1">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};