"use client";
import { Minus, Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { JsonLd } from "@/components/seo/JsonLd";

const faqs = [
  {
    question: "Is the resume builder really free?",
    answer:
      "Yes! You can create and download one resume completely free. Our free plan includes AI optimization, ATS checking, and PDF export. Premium features like unlimited resumes, cover letter generation, and expert review are available on paid plans.",
  },
  {
    question: "How does the AI resume optimization work?",
    answer:
      "Our AI analyzes your resume content and compares it against thousands of successful resumes. It identifies weak bullet points, suggests improvements using action verbs and quantified achievements, and ensures your content is optimized for both human recruiters and ATS systems.",
  },
  {
    question: "Will my resume pass ATS (Applicant Tracking Systems)?",
    answer:
      "Absolutely. Every resume created with our tool is designed to be ATS-compatible. We test against 50+ popular ATS systems and ensure proper formatting, keyword optimization, and structure that automated systems can easily parse.",
  },
  {
    question: "Can I import my LinkedIn profile?",
    answer:
      "Yes, you can import your LinkedIn profile with one click. We'll extract your experience, education, and skills, then help you optimize the content for a professional resume format.",
  },
  {
    question: "How is my data protected?",
    answer:
      "Your privacy is our priority. All data is encrypted in transit and at rest. We never share your personal information with third parties, and you can delete your account and all associated data at any time with one click.",
  },
  {
    question: "Can I create multiple versions of my resume?",
    answer:
      "Yes! With our Pro plan, you can create unlimited resume versions tailored for different job applications. Each version is saved separately, making it easy to track which resume you sent to which employer.",
  },
];

// Generate FAQPage Schema for AI search engines
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-24">
      <JsonLd data={faqSchema} />
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
            Frequently asked questions
          </h2>
          <p className="text-gray-600">
            Everything you need to know about our resume builder.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-xl border border-gray-100 bg-white"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
              >
                <span className="pr-4 font-medium text-gray-900">
                  {faq.question}
                </span>
                <div className="shrink-0">
                  {openIndex === index ? (
                    <Minus size={20} className="text-gray-500" />
                  ) : (
                    <Plus size={20} className="text-gray-500" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
