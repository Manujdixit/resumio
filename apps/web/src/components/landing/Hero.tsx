"use client";
import React, { useState, useRef, useEffect } from "react";
import { CheckCircle2, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "./Button";
import { motion, AnimatePresence } from "motion/react";
import { LineShadowText } from "../ui/line-shadow-text";

const CornerBrackets = ({
  className = "border-zinc-600",
}: {
  className?: string;
}) => (
  <>
    <div
      className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${className}`}
    />
    <div
      className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${className}`}
    />
    <div
      className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${className}`}
    />
    <div
      className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${className}`}
    />
  </>
);

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  isTyping?: boolean;
}

const INITIAL_RESUME = {
  name: "ALEXANDER CHEN",
  role: "SENIOR PRODUCT MANAGER",
  contact: "sf.dev@example.com | (555) 012-3456 | San Francisco, CA",
  summary: "Product leader with 7+ years of experience in SaaS.",
  experience: {
    company: "TechFlow Dynamics",
    role: "Product Lead",
    date: "2022 - Present",
    bullets: [
      "Spearheaded the launch of the core SaaS platform, resulting in 50k+ daily active users within 3 months.",
      "Managed cross-functional teams of engineers and designers to deliver features 2 weeks ahead of schedule.",
      "Responsible for selling software to clients and I did a good job hitting my numbers.", // The weak bullet
    ],
  },
};

export const Hero: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "System online. I noticed a weak bullet point in your experience section. Paste it here, and I'll rewrite it for maximum impact.",
    },
  ]);
  const [inputText, setInputText] = useState(
    "Responsible for selling software to clients and I did a good job hitting my numbers."
  );
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [resumeData, setResumeData] = useState(INITIAL_RESUME);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOptimizing]);

  // const handleSendMessage = async (e?: React.FormEvent) => {
  //   e?.preventDefault();
  //   if (!inputText.trim() || isOptimizing) return;

  //   const userText = inputText;
  //   const userMsg: Message = { id: Date.now(), role: "user", text: userText };
  //   setMessages((prev) => [...prev, userMsg]);
  //   setIsOptimizing(true);
  //   setInputText("");

  //   try {
  //     // Simulate a bit of "thinking" time for better UX before the API call
  //     await new Promise((resolve) => setTimeout(resolve, 500));

  //     const result = await optimizeResumeBullet(userText);

  //     const aiMsg: Message = {
  //       id: Date.now() + 1,
  //       role: "assistant",
  //       text: `I've optimized that for you. ${result.explanation}`,
  //     };
  //     setMessages((prev) => [...prev, aiMsg]);

  //     // Update the specific bullet in the resume
  //     setResumeData((prev) => ({
  //       ...prev,
  //       experience: {
  //         ...prev.experience,
  //         bullets: [
  //           prev.experience.bullets[0],
  //           prev.experience.bullets[1],
  //           result.improvedText, // Update the last bullet
  //         ],
  //       },
  //     }));
  //   } catch (err) {
  //     console.error(err);
  //     setInputText(userText); // Restore text so user can try again
  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         id: Date.now() + 1,
  //         role: "assistant",
  //         text: "I encountered an error connecting to the AI service. Please try again.",
  //       },
  //     ]);
  //   } finally {
  //     setIsOptimizing(false);
  //   }
  // };

  const handleSendMessage2 = () => {
    console.log("send message");
  };

  return (
    <section className="relative min-h-screen flex flex-col border-b border-zinc-800 bg-[#050505]">
      {/* Hero Content */}
      <div className="max-w-[1400px] my-auto mx-auto pt-14 px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Copy */}
        <div className="lg:col-span-5 flex flex-col justify-center pt-12 lg:pt-0 order-2 lg:order-1 items-center text-center lg:items-start lg:text-left">
          <div className="relative inline-flex items-center gap-2 text-[10px] font-mono text-zinc-500 mb-6 px-3 py-1.5 w-fit uppercase tracking-widest">
            <CornerBrackets className="border-zinc-700" />
            <span className="w-1.5 h-1.5 bg-green-500 animate-pulse"></span>
            AI Agent Active
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-7xl font-bold text-white selection:text-neutral-950 selection:bg-neutral-50 leading-[0.9] tracking-tighter mb-8">
            RESUME <br />
            <LineShadowText className="italic" shadowColor={"white"}>
              ARCHITECT.
            </LineShadowText>
          </h1>

          <p className="text-zinc-400 text-md leading-relaxed mb-10 max-w-md mx-auto lg:mx-0">
            Collaborate with an intelligent agent to build your resume.
            Real-time formatting, content optimization, and ATS validation in a
            simple chat interface.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
            <Button size="lg" variant="primary" mono className="h-12">
              START CHAT
            </Button>
            <Button size="lg" variant="outline" mono className="h-12">
              VIEW TEMPLATES
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-4 text-xs font-mono text-zinc-600 w-full justify-center lg:justify-start">
            <div className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-zinc-500" />
              <span>CHAT BASED</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-zinc-500" />
              <span>REAL-TIME PREVIEW</span>
            </div>
          </div>
        </div>

        {/* Right: Chat & Preview Interface */}
        <div className="hidden lg:block lg:col-span-7 w-full h-[600px] order-1 lg:order-2">
          <div className="relative group w-full h-full bg-zinc-900/20 border border-zinc-800 rounded-sm backdrop-blur-sm flex flex-col md:flex-row overflow-hidden shadow-2xl shadow-black/50">
            <CornerBrackets className="border-zinc-700 group-hover:border-white" />
            {/* Left Pane: Chat Interface */}
            <div className="w-full md:w-[40%] flex flex-col border-b md:border-b-0 md:border-r border-zinc-800 bg-[#080808]">
              {/* Chat Header */}
              <div className="h-12 border-b border-zinc-800 flex items-center px-4 justify-between bg-zinc-900/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-mono text-xs text-zinc-400 tracking-wider">
                    AGENT_CHAT
                  </span>
                </div>
                <Bot size={14} className="text-zinc-600" />
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${
                        msg.role === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 border ${
                          msg.role === "assistant"
                            ? "bg-zinc-900 border-zinc-700 text-zinc-300"
                            : "bg-white border-white text-black"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <Bot size={14} />
                        ) : (
                          <User size={14} />
                        )}
                      </div>
                      <div
                        className={`p-3 rounded-sm text-xs leading-relaxed max-w-[85%] font-mono ${
                          msg.role === "assistant"
                            ? "bg-zinc-900/50 text-zinc-400 border border-zinc-800"
                            : "bg-zinc-800 text-zinc-200 border border-zinc-700"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isOptimizing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-sm bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0">
                      <Bot size={14} className="text-zinc-400" />
                    </div>
                    <div className="flex items-center gap-1 h-8 px-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                      <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce"></span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-zinc-900/30 border-t border-zinc-800">
                <form onSubmit={handleSendMessage2} className="relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask AI to improve..."
                    className="w-full bg-[#050505] border border-zinc-800 text-zinc-300 text-xs p-3 pr-10 rounded-sm focus:outline-none focus:border-zinc-600 font-mono placeholder:text-zinc-700"
                    disabled={isOptimizing}
                  />
                  <button
                    type="submit"
                    disabled={isOptimizing || !inputText.trim()}
                    className="absolute right-2 top-2 p-1 text-zinc-500 hover:text-white disabled:opacity-50 transition-colors"
                  >
                    {isOptimizing ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Send size={14} />
                    )}
                  </button>
                </form>
              </div>
            </div>
            {/* Right Pane: Resume Preview */}
            <div className="w-full md:w-[60%] bg-[#111] flex flex-col relative overflow-hidden">
              {/* Toolbar */}
              <div className="h-12 border-b border-zinc-800 flex items-center justify-between px-4 bg-zinc-900/50 z-10">
                <span className="font-mono text-xs text-zinc-500">
                  PREVIEW_MODE
                </span>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
                </div>
              </div>

              {/* Document Canvas */}
              <div className="flex-1 p-8 overflow-hidden flex items-center justify-center bg-[#0c0c0c] relative">
                {/* Grid Background for Canvas */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />

                {/* The Paper */}
                <motion.div
                  layout
                  className="w-full max-w-[400px] aspect-[1/1.4142] bg-white text-black p-6 md:p-8 shadow-2xl shadow-black relative text-[8px] md:text-[10px] leading-relaxed overflow-hidden origin-top"
                >
                  {/* Resume Header */}
                  <div className="border-b-2 border-black pb-4 mb-4">
                    <h1 className="text-lg md:text-xl font-bold tracking-tight mb-1">
                      {resumeData.name}
                    </h1>
                    <p className="font-medium text-zinc-600 mb-1">
                      {resumeData.role}
                    </p>
                    <p className="text-zinc-500 text-[8px]">
                      {resumeData.contact}
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="mb-4">
                    <h2 className="font-bold border-b border-zinc-200 mb-2 pb-0.5 text-[9px] uppercase tracking-wider">
                      Professional Summary
                    </h2>
                    <p className="text-zinc-700">{resumeData.summary}</p>
                  </div>

                  {/* Experience */}
                  <div className="mb-4">
                    <h2 className="font-bold border-b border-zinc-200 mb-2 pb-0.5 text-[9px] uppercase tracking-wider">
                      Experience
                    </h2>

                    <div className="mb-2">
                      <div className="flex justify-between font-bold">
                        <span>{resumeData.experience.company}</span>
                        <span>{resumeData.experience.date}</span>
                      </div>
                      <p className="italic text-zinc-600 mb-1">
                        {resumeData.experience.role}
                      </p>
                      <ul className="list-disc list-outside ml-3 space-y-1 text-zinc-700">
                        {resumeData.experience.bullets.map((bullet, i) => (
                          <motion.li
                            key={i}
                            initial={false}
                            animate={
                              i === 2
                                ? { color: isOptimizing ? "#a1a1aa" : "#000" }
                                : {}
                            }
                            className={i === 2 ? "font-medium" : ""}
                          >
                            {i === 2 ? (
                              <span
                                className={`relative ${
                                  isOptimizing ? "blur-[1px]" : ""
                                } transition-all duration-500`}
                              >
                                {bullet}
                                {!isOptimizing &&
                                  bullet !==
                                    INITIAL_RESUME.experience.bullets[2] && (
                                    <span className="absolute -right-3 -top-1 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                                  )}
                              </span>
                            ) : (
                              bullet
                            )}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Education Placeholder */}
                  <div>
                    <h2 className="font-bold border-b border-zinc-200 mb-2 pb-0.5 text-[9px] uppercase tracking-wider">
                      Education
                    </h2>
                    <div className="flex justify-between font-bold text-zinc-400">
                      <span>University of Technology</span>
                      <span>2018 - 2022</span>
                    </div>
                    <p className="italic text-zinc-400">
                      Bachelor of Science in Computer Science
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
            <CornerBrackets className="border-zinc-700 group-hover:border-white" />
          </div>
        </div>
      </div>
    </section>
  );
};
