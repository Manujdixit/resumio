/**
 * Generate page introductions
 */
export function generateIndustryIntro(industryName: string): string {
  const year = new Date().getFullYear();
  return `Create a professional ${industryName} resume that stands out to recruiters and passes ATS systems. Our AI-powered resume builder helps ${industryName} professionals craft compelling resumes optimized for ${year} job applications.`;
}

export function generateJobTitleIntro(
  jobTitle: string,
  industry: string,
): string {
  const year = new Date().getFullYear();
  return `Build a winning ${jobTitle} resume with our AI-powered builder. Get expert tips, ATS-optimized templates, and real examples tailored for ${jobTitle} positions in ${year}. Land more interviews with a resume that showcases your ${industry} expertise.`;
}

export function generateTemplateIntro(
  templateName: string,
  style: string,
): string {
  return `Our ${templateName} resume template features a ${style} design that's proven to catch recruiters' attention. ATS-optimized and professionally designed to help you make a strong first impression.`;
}
