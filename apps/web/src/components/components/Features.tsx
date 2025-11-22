"use client";
import React, { useState, useEffect } from "react";
import {
  Database,
  Shield,
  Zap,
  GitMerge,
  LayoutTemplate,
  FileCode2,
  Check,
  Search,
  MousePointerClick,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const CornerBrackets = () => (
  <>
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1, borderColor: "#fff" }}
      className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700 transition-colors group-hover:border-white"
    />
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1, borderColor: "#fff" }}
      className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-700 transition-colors group-hover:border-white"
    />
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1, borderColor: "#fff" }}
      className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-700 transition-colors group-hover:border-white"
    />
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1, borderColor: "#fff" }}
      className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-700 transition-colors group-hover:border-white"
    />
  </>
);

export const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="bg-background border-b border-zinc-800 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="px-6 py-16 lg:py-24 border-l border-r border-zinc-800/30">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white font-mono mb-2"
          >
            POWERFUL FEATURES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 font-mono text-sm"
          >
            Optimized for human and machine readers.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pb-24">
          {/* 1. AI Bullet Enhancer (Large) */}
          <FeatureCard
            colSpan=""
            icon={<Zap size={20} className="text-white" />}
            title="AI Bullet Enhancer"
            description="Instantly transform weak, passive descriptions into powerful, results-oriented achievements."
          >
            <AiEnhancerViz />
          </FeatureCard>

          {/* 2. Keyword Matching (Standard) */}
          <FeatureCard
            colSpan=""
            icon={<Database size={20} className="text-white" />}
            title="Keyword Match"
            description="Auto-inject job description keywords."
          >
            <KeywordMatchViz />
          </FeatureCard>

          {/* 3. ATS Scan (Standard) */}
          <FeatureCard
            colSpan=""
            icon={<Shield size={20} className="text-white" />}
            title="ATS Proof"
            description="Pass automated filters with clean code."
          >
            <AtsScanViz />
          </FeatureCard>

          {/* 4. Cover Letter (Large) */}
          <FeatureCard
            colSpan=""
            icon={<FileCode2 size={20} className="text-white" />}
            title="Cover Letters"
            description="Generate tailored cover letters that perfectly match your resume and the job description in seconds."
          >
            <CoverLetterViz />
          </FeatureCard>

          {/* 5. Formatting (Standard) */}
          <FeatureCard
            colSpan=""
            icon={<LayoutTemplate size={20} className="text-white" />}
            title="Auto Format"
            description="Perfect margins and spacing every time."
          >
            <AutoFormatViz />
          </FeatureCard>

          {/* 6. Versions (Standard) */}
          <FeatureCard
            colSpan=""
            icon={<GitMerge size={20} className="text-white" />}
            title="Version Control"
            description="Branch your resume for different roles."
          >
            <VersionControlViz />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ colSpan, icon, title, description, children }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative ${colSpan} bg-zinc-900/20 hover:bg-zinc-900/40 p-8 overflow-hidden flex flex-col justify-between`}
    >
      <CornerBrackets />
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-md shadow-lg shadow-black/50 group-hover:border-zinc-600 transition-colors">
            {icon}
          </div>
          <h3 className="font-mono text-lg text-white font-bold">{title}</h3>
        </div>
        <p className="text-zinc-400 text-sm max-w-md">{description}</p>
      </div>
      <div className="relative z-10 mt-auto min-h-[120px] flex items-center justify-center bg-zinc-950/50 border border-zinc-800/50 rounded-lg p-4 overflow-hidden">
        {React.cloneElement(children, { isHovered })}
      </div>
    </motion.div>
  );
};

/* --- Visualization Components --- */

const AiEnhancerViz = ({ isHovered }: { isHovered?: boolean }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isHovered) {
      setStep(0);
      return;
    }
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 2);
    }, 2000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <div className="w-full font-mono text-xs">
      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="bad"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 opacity-50"
          >
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
            <span className="line-through decoration-red-500/50 text-zinc-500">
              Responsible for sales and hitting targets.
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="good"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0"
            >
              <Check size={12} className="text-black" />
            </motion.div>
            <div className="relative">
              <motion.span
                className="text-green-400 block"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0 0 0)" }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                Surpassed sales targets by 150% in Q3 2024.
              </motion.span>
              {/* <motion.div
                className="absolute bottom-0 left-0 h-[1px] bg-green-500 w-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              /> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar Loop */}
      {/* <div className="absolute bottom-0 left-0 h-0.5 bg-zinc-800 w-full">
        <motion.div
          className="h-full bg-white/20"
          animate={isHovered ? { width: ["0%", "100%"] } : { width: "0%" }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: isHovered ? Infinity : 0,
          }}
        />
      </div> */}
    </div>
  );
};

const KeywordMatchViz = ({ isHovered }: { isHovered?: boolean }) => {
  const keywords = ["React", "TypeScript", "Node.js", "AWS"];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <div className="flex flex-wrap justify-center gap-2">
        {keywords.map((word, i) => (
          <motion.div
            key={word}
            initial={{ scale: 1, opacity: 1 }}
            animate={
              isHovered
                ? {
                    scale: [1, 1.1, 1],
                    opacity: [1, 1, 1],
                  }
                : { scale: 1, opacity: 1 }
            }
            transition={{
              delay: isHovered ? i * 0.15 : 0,
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 2,
              duration: 0.4,
            }}
            className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-[10px] text-zinc-300"
          >
            {word}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="flex items-center gap-2 text-[10px] text-zinc-500"
        animate={isHovered ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.5 }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
      >
        <Search size={12} />
        <span>Scanning Description...</span>
      </motion.div>
    </div>
  );
};

const AtsScanViz = ({ isHovered }: { isHovered?: boolean }) => {
  return (
    <div className="relative w-32 h-20 bg-zinc-900 border border-zinc-800 rounded-sm flex flex-col gap-2 p-2 overflow-hidden">
      <div className="w-full h-2 bg-zinc-800 rounded-sm" />
      <div className="w-2/3 h-2 bg-zinc-800 rounded-sm" />
      <div className="w-full h-2 bg-zinc-800 rounded-sm" />
      <div className="w-1/2 h-2 bg-zinc-800 rounded-sm" />

      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,1)]"
        animate={isHovered ? { top: ["0%", "100%", "0%"] } : { top: "0%" }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: isHovered ? Infinity : 0,
        }}
      />

      <div className="absolute bottom-1 right-1 bg-green-900/80 border border-green-700 px-1.5 py-0.5 rounded text-[9px] text-green-400 font-mono font-bold z-10">
        98%
      </div>
    </div>
  );
};

const CoverLetterViz = ({ isHovered }: { isHovered?: boolean }) => {
  const text =
    "I am confident that my skills in software development make me an ideal candidate.";
  const words = text.split(" ");

  return (
    <div className="w-full font-mono text-[10px] text-zinc-300 leading-relaxed p-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.3 }}
          animate={isHovered ? { opacity: [0.6, 1, 0.6] } : { opacity: 0.3 }}
          transition={{
            delay: isHovered ? i * 0.08 : 0,
            duration: 0.3,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 2,
          }}
          className="mr-1 inline-block"
        >
          {word}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-1.5 h-3 bg-green-500 align-middle ml-1"
        animate={isHovered ? { opacity: [1, 0] } : { opacity: 0 }}
        transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
      />
    </div>
  );
};

const AutoFormatViz = ({ isHovered }: { isHovered?: boolean }) => {
  return (
    <div className="relative w-24 h-24 bg-zinc-900 border border-zinc-800 rounded-sm p-2 grid gap-1">
      <motion.div
        className="bg-orange-500/10 h-2 rounded-sm w-full"
        animate={
          isHovered ? { x: [5, 0], rotate: [2, 0] } : { x: 0, rotate: 0 }
        }
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="bg-pink-700/10 h-8 rounded-sm w-full"
        animate={
          isHovered ? { x: [-5, 0], rotate: [-1, 0] } : { x: 0, rotate: 0 }
        }
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          repeatType: "reverse",
          delay: 0.1,
        }}
      />
      <motion.div
        className="bg-zinc-700 h-2 rounded-sm w-2/3"
        animate={
          isHovered ? { x: [3, 0], rotate: [1, 0] } : { x: 0, rotate: 0 }
        }
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          repeatType: "reverse",
          delay: 0.2,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="bg-white/10 backdrop-blur-sm p-1 rounded-full"
          animate={isHovered ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        >
          <MousePointerClick size={12} className="text-white" />
        </motion.div>
      </div>
    </div>
  );
};

const VersionControlViz = ({ isHovered }: { isHovered?: boolean }) => {
  return (
    <div className="flex items-center justify-center w-full h-full gap-4">
      <div className="relative flex flex-col items-center gap-1">
        <div className="w-8 h-8 bg-zinc-800 border border-zinc-600 rounded flex items-center justify-center">
          <span className="text-[8px] text-zinc-400">MAIN</span>
        </div>
        <motion.div
          className="absolute top-1/2 left-full w-8 h-px bg-zinc-600"
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{
            duration: 1,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 2,
          }}
          style={{ originX: 0 }}
        />
        <motion.div
          className="absolute top-1/2 left-full w-8 h-px bg-zinc-600 origin-left"
          initial={{ scaleX: 0, rotate: 0 }}
          animate={
            isHovered ? { scaleX: 1, rotate: -30 } : { scaleX: 0, rotate: 0 }
          }
          transition={{
            duration: 1,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-full w-8 h-px bg-zinc-600 origin-left"
          initial={{ scaleX: 0, rotate: 0 }}
          animate={
            isHovered ? { scaleX: 1, rotate: 30 } : { scaleX: 0, rotate: 0 }
          }
          transition={{
            duration: 1,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 2,
          }}
        />
      </div>

      <div className="flex flex-col gap-4 ml-6">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.5,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 2.5,
          }}
          className="w-10 h-6 bg-blue-900/20 border border-blue-500/30 rounded flex items-center justify-center text-[8px] text-blue-400"
        >
          TECH
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
          transition={{
            delay: 0.7,
            duration: 0.5,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 2.3,
          }}
          className="w-10 h-6 bg-green-900/20 border border-green-500/30 rounded flex items-center justify-center text-[8px] text-green-400"
        >
          MGMT
        </motion.div>
      </div>
    </div>
  );
};
