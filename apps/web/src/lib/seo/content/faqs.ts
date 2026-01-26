import type { FAQItem } from "@/lib/seo/types";

/**
 * Generate industry-specific FAQs
 */
export function generateIndustryFAQs(
  industry: string,
  industryName: string,
): FAQItem[] {
  return [
    {
      question: `What should I include in my ${industryName} resume?`,
      answer: `A strong ${industryName} resume should highlight relevant skills, certifications, and quantifiable achievements. Focus on industry-specific keywords and demonstrate your impact with metrics and results.`,
    },
    {
      question: `How do I make my ${industryName} resume ATS-friendly?`,
      answer: `Use standard section headings, include relevant keywords from job descriptions, avoid complex formatting, and save as PDF. Our AI optimizes your resume for ${industryName} ATS systems automatically.`,
    },
    {
      question: `What are the most important skills for ${industryName} professionals?`,
      answer: `Top ${industryName} skills include both technical competencies specific to your role and soft skills like communication and problem-solving. Tailor your skills section to match each job posting.`,
    },
  ];
}

/**
 * Generate job title-specific FAQs
 */
export function generateJobTitleFAQs(jobTitle: string): FAQItem[] {
  return [
    {
      question: `How do I write a ${jobTitle} resume with no experience?`,
      answer: `Focus on transferable skills, relevant coursework, projects, and internships. Highlight achievements from volunteer work or personal projects that demonstrate ${jobTitle} competencies.`,
    },
    {
      question: `What format works best for a ${jobTitle} resume?`,
      answer: `A reverse-chronological format works best for ${jobTitle} roles, highlighting your most recent and relevant experience first. Use clear sections and bullet points for readability.`,
    },
    {
      question: `How long should a ${jobTitle} resume be?`,
      answer: `For most ${jobTitle} positions, keep your resume to one page if you have less than 10 years of experience. Senior ${jobTitle} professionals with extensive experience may use two pages.`,
    },
  ];
}
