/**
 * Job title definitions for programmatic SEO pages
 */

export interface JobTitleData {
  slug: string;
  title: string;
  industry: string;
  experienceLevel: "entry" | "mid" | "senior" | "executive";
  keywords: string[];
  skills: string[];
  description?: string;
  responsibilities?: string[];
  summary?: string;
}

export const jobTitles: JobTitleData[] = [
  // Technology
  {
    slug: "software-engineer",
    title: "Software Engineer",
    industry: "technology",
    experienceLevel: "mid",
    keywords: ["software developer resume", "programmer resume"],
    skills: ["JavaScript", "Python", "Git", "AWS"],
    description:
      "Software Engineers design, develop, and maintain software applications. They are responsible for the entire software development lifecycle, from requirements gathering to deployment and maintenance.",
    responsibilities: [
      "Write clean, scalable code using programming languages like JavaScript and Python.",
      "Collaborate with cross-functional teams to define, design, and ship new features.",
      "Troubleshoot, debug and upgrade existing software.",
      "Participate in code reviews to maintain code quality and ensure best practices.",
    ],
    summary:
      "Creative Software Engineer with 4+ years of experience in full-stack development. Proficient in React, Node.js, and cloud technologies. Proven track record of delivering high-quality software solutions that improve user experience and drive business growth.",
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    industry: "technology",
    experienceLevel: "mid",
    keywords: ["PM resume", "product management resume"],
    skills: ["Product Strategy", "Agile", "User Research", "Roadmapping"],
    description:
      "Product Managers are responsible for the strategy, roadmap, and feature definition for a product or product line. They work with engineering, design, and marketing to deliver products that customers love.",
    responsibilities: [
      "Define the product strategy and roadmap based on market research and user feedback.",
      "Work closely with engineering, design, and marketing teams to deliver products on time.",
      "Prioritize features and requirements based on business value and customer needs.",
      "Analyze product performance and make data-driven decisions to improve the product.",
    ],
    summary:
      "Strategic Product Manager with 5+ years of experience in B2B SaaS. Expert in agile methodologies, user research, and product lifecycle management. Successfully launched 3 major products that generated over $5M in revenue.",
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    industry: "technology",
    experienceLevel: "mid",
    keywords: ["data science resume", "ML resume"],
    skills: ["Python", "Machine Learning", "SQL", "Statistics"],
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    industry: "technology",
    experienceLevel: "mid",
    keywords: ["DevOps resume", "SRE resume"],
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
  },
  // Healthcare
  {
    slug: "registered-nurse",
    title: "Registered Nurse",
    industry: "healthcare",
    experienceLevel: "mid",
    keywords: ["RN resume", "nursing resume"],
    skills: ["Patient Care", "IV Therapy", "EMR", "Triage"],
    description:
      "Registered Nurses (RNs) provide critical patient care, educate patients about health conditions, and provide advice and emotional support to patients and their family members.",
    responsibilities: [
      "Assess patient health problems and needs, developing and implementing nursing care plans.",
      "Administer nursing care to ill, injured, convalescent, or disabled patients.",
      "Monitor and record patient vitals and medical information.",
      "Collaborate with physicians and other healthcare professionals to ensure continuity of care.",
    ],
    summary:
      "Compassionate Registered Nurse (RN) with 7+ years of experience in acute care and ER settings. Certified in ACLS and PALS. Dedicated to providing high-quality patient care and advocating for patient safety. Recognized for maintaining a 98% patient satisfaction rate.",
  },
  {
    slug: "physician",
    title: "Physician",
    industry: "healthcare",
    experienceLevel: "senior",
    keywords: ["doctor resume", "MD resume"],
    skills: [
      "Diagnosis",
      "Patient Care",
      "Medical Records",
      "Treatment Planning",
    ],
  },
  // Finance
  {
    slug: "financial-analyst",
    title: "Financial Analyst",
    industry: "finance",
    experienceLevel: "mid",
    keywords: ["finance resume", "analyst resume"],
    skills: ["Financial Modeling", "Excel", "Valuation", "Reporting"],
    description:
      "Financial Analysts guide businesses and individuals in making investment decisions. They assess the performance of stocks, bonds, and other types of investments.",
    responsibilities: [
      "Analyze financial data and create financial models for decision support.",
      "Report on financial performance and prepare for regular leadership reviews.",
      "Analyze past results, perform variance analysis, identify trends, and make recommendations for improvements.",
      "Guide the cost analysis process by establishing and enforcing policies and procedures.",
    ],
    summary:
      "Detail-oriented Financial Analyst with a CFA Level II candidacy and 3 years of experience in corporate finance. Expert in financial modeling, forecasting, and data analysis using Excel and SQL. Saved the company $500k annually by identifying cost inefficiencies.",
  },
  {
    slug: "accountant",
    title: "Accountant",
    industry: "finance",
    experienceLevel: "mid",
    keywords: ["CPA resume", "accounting resume"],
    skills: ["GAAP", "Financial Reporting", "QuickBooks", "Tax Preparation"],
    description:
      "Accountants prepare and examine financial records. They ensure that financial records are accurate and that taxes are paid properly and on time.",
    responsibilities: [
      "Prepare and examine accounting records, financial statements, taxes, and other financial reports.",
      "Develop, maintain, and analyze budgets, preparing periodic reports that compare budgeted costs to actual costs.",
      "Create, maintain, and analyze general ledger accounts.",
      "Ensure compliance with relevant laws and regulations and integrity of financial data.",
    ],
    summary:
      "Certified Public Accountant (CPA) with 5+ years of experience in public accounting and tax preparation. Proven ability to manage multiple client accounts and ensure 100% compliance with GAAP. Streamlined month-end close process, reducing time by 20%.",
  },
  // Marketing
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    industry: "marketing",
    experienceLevel: "mid",
    keywords: ["marketing resume", "brand manager resume"],
    skills: [
      "Campaign Management",
      "Analytics",
      "Brand Strategy",
      "Budget Management",
    ],
  },
  {
    slug: "seo-specialist",
    title: "SEO Specialist",
    industry: "marketing",
    experienceLevel: "mid",
    keywords: ["SEO resume", "digital marketing resume"],
    skills: [
      "Keyword Research",
      "Google Analytics",
      "Technical SEO",
      "Content Strategy",
    ],
    description:
      "SEO Specialists optimize website content and technical architecture to improve search engine rankings and drive organic traffic. This role demands a blend of creative content strategy and technical analysis.",
    responsibilities: [
      "Conduct comprehensive keyword research to identify high-potential search terms.",
      "Perform technical site audits to fix crawl errors, broken links, and speed issues.",
      "Develop and execute link-building strategies to improve domain authority.",
      "Analyze traffic data using Google Analytics and Search Console to refine strategies.",
    ],
    summary:
      "Analytical SEO Specialist with 5 years of experience managing organic growth for e-commerce brands. Expert in technical SEO, on-page optimization, and content strategy. Increased organic traffic by 200% within 12 months for key clients.",
  },
  // Design
  {
    slug: "ux-designer",
    title: "UX Designer",
    industry: "design",
    experienceLevel: "mid",
    keywords: ["UX resume", "user experience resume"],
    skills: ["Figma", "User Research", "Wireframing", "Prototyping"],
  },
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    industry: "design",
    experienceLevel: "mid",
    keywords: ["design resume", "creative resume"],
    skills: ["Adobe Photoshop", "Illustrator", "Typography", "Brand Design"],
  },
  // Education
  {
    slug: "teacher",
    title: "Teacher",
    industry: "education",
    experienceLevel: "mid",
    keywords: ["teacher resume", "educator resume"],
    skills: [
      "Curriculum Design",
      "Classroom Management",
      "Lesson Planning",
      "Student Assessment",
    ],
  },
  {
    slug: "professor",
    title: "Professor",
    industry: "education",
    experienceLevel: "senior",
    keywords: ["academic resume", "faculty resume"],
    skills: ["Research", "Public Speaking", "Academic Writing", "Mentoring"],
  },
  // Engineering
  {
    slug: "mechanical-engineer",
    title: "Mechanical Engineer",
    industry: "engineering",
    experienceLevel: "mid",
    keywords: ["mechanical engineering resume", "CAD resume"],
    skills: ["SolidWorks", "AutoCAD", "Thermodynamics", "Prototyping"],
    description:
      "Mechanical Engineers design, develop, and test mechanical devices, from small components to large-scale machinery. They are proficient in CAD software and understand thermodynamics, fluid mechanics, and material science.",
    responsibilities: [
      "Design and model mechanical components using SolidWorks and AutoCAD.",
      "Analyze problems and develop prototypes to test design feasibility.",
      "Collaborate with manufacturing teams to ensure designs are production-ready.",
      "Conduct thermal and structural analysis to ensure product reliability.",
    ],
    summary:
      "Innovative Mechanical Engineer with a Master's degree and 6 years of experience in automotive design. Proficient in SolidWorks, FEA analysis, and rapid prototyping. Successfully led a team of 4 engineers to deliver a new engine component 2 weeks ahead of schedule.",
  },
  {
    slug: "civil-engineer",
    title: "Civil Engineer",
    industry: "engineering",
    experienceLevel: "mid",
    keywords: ["civil engineering resume", "structural engineer resume"],
    skills: [
      "AutoCAD",
      "Project Management",
      "Structural Analysis",
      "Site Planning",
    ],
  },
  // Sales
  {
    slug: "sales-representative",
    title: "Sales Representative",
    industry: "sales",
    experienceLevel: "entry",
    keywords: ["sales resume", "sales rep resume"],
    skills: ["Cold Calling", "CRM", "Negotiation", "Lead Generation"],
    description:
      "A Sales Representative is the driving force behind revenue growth, acting as the bridge between a company's products and its customers. Top Sales Reps combine relationship-building with data-driven sales strategies.",
    responsibilities: [
      "Prospect and qualify new leads through cold calling, email outreach, and social selling.",
      "Conduct product demonstrations and presentations tailored to client needs.",
      "Negotiate contracts and close deals to meet or exceed monthly sales quotas.",
      "Maintain accurate records of all sales activities and client interactions in CRM software.",
    ],
    summary:
      "Results-driven Sales Representative with 4+ years of experience in B2B SaaS sales. Proven track record of exceeding quotas by 150% and generating $1.2M in annual recurring revenue. Skilled in consultative selling, relationship building, and pipeline management.",
  },
  {
    slug: "account-executive",
    title: "Account Executive",
    industry: "sales",
    experienceLevel: "mid",
    keywords: ["AE resume", "B2B sales resume"],
    skills: [
      "Pipeline Management",
      "Salesforce",
      "Strategic Selling",
      "Client Relations",
    ],
  },
];

export function getJobTitleBySlug(slug: string): JobTitleData | undefined {
  return jobTitles.find((j) => j.slug === slug);
}

export function getJobTitlesByIndustry(industry: string): JobTitleData[] {
  return jobTitles.filter((j) => j.industry === industry);
}

export function getAllJobTitleSlugs(): string[] {
  return jobTitles.map((j) => j.slug);
}
