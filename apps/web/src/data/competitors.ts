export type Competitor = {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  idealFor: string;
  resumebuildIdealFor: string;
  pricing: {
    free: string;
    starting: string;
    pro: string;
    hiddenCosts: string;
  };
  features: {
    category: string;
    items: {
      name: string;
      competitorSupport: string;
      resumebuildSupport: string;
    }[];
  }[];
  tldr: string;
  strengths: string[];
  weaknesses: string[];
  migration: {
    transferable: string[];
    reconfiguration: string[];
  };
  testimonials: {
    quote: string;
    author: string;
    role: string;
  }[];
};

export const competitors: Competitor[] = [
  {
    id: "zety",
    name: "Zety",
    slug: "zety",
    logo: "/logos/zety.svg", // Placeholder, add actual logo path if available
    description:
      "Zety is a popular resume builder known for its step-by-step wizard and extensive pre-written content suggestions.",
    idealFor:
      "Entry-level job seekers who need a lot of hand-holding and pre-written phrases to fill out their resume quickly.",
    resumebuildIdealFor:
      "Professionals who want AI that genuinely understands their career trajectory, optimizing for ATS rather than just filling templates.",
    tldr: "Zety excels at providing pre-written bullet points but struggles with modern ATS optimization and custom AI tailoring. resumebuild.cv is built for ATS compatibility, offering deeply personalized AI assistance. Choose Zety if you want quick, generic phrases. Choose resumebuild.cv if you want an AI copilot that crafts a unique, highly-optimized professional narrative.",
    pricing: {
      free: "Basic features, limited downloads",
      starting: "$2.70 for 14-day trial",
      pro: "$23.70/month (auto-renews)",
      hiddenCosts: "Trial auto-renews at full monthly price if not canceled.",
    },
    strengths: [
      "Massive library of pre-written bullet points",
      "Easy-to-use step-by-step wizard",
      "Cover letter builder included",
    ],
    weaknesses: [
      "Rigid templates that can break ATS parsers",
      "Subscription model can be confusing and hard to cancel",
      "Pre-written content is generic and used by millions",
    ],
    features: [
      {
        category: "Content Generation",
        items: [
          {
            name: "AI Assistance",
            competitorSupport: "Basic pre-written phrase suggestions",
            resumebuildSupport:
              "Advanced LLM-powered context-aware generation and refinement",
          },
          {
            name: "ATS Optimization",
            competitorSupport: "Basic keyword checks",
            resumebuildSupport:
              "Deep semantic analysis against target job descriptions",
          },
        ],
      },
      {
        category: "Formatting & Design",
        items: [
          {
            name: "Templates",
            competitorSupport: "Many colorful, graphical templates",
            resumebuildSupport:
              "Modern, clean, rigorously ATS-tested templates",
          },
          {
            name: "Customization",
            competitorSupport:
              "Rigid structure, hard to adjust specific spacing",
            resumebuildSupport:
              "Highly flexible layout with intelligent auto-formatting",
          },
        ],
      },
      {
        category: "Value & Experience",
        items: [
          {
            name: "Pricing Transparency",
            competitorSupport: "Known for tricky auto-renewing trials",
            resumebuildSupport:
              "Clear, straightforward pricing with no hidden traps",
          },
        ],
      },
    ],
    migration: {
      transferable: ["Basic contact info", "Work history dates and titles"],
      reconfiguration: [
        "Re-writing generic bullet points with AI",
        "Re-formatting to ensure ATS readability",
      ],
    },
    testimonials: [
      {
        quote:
          "I was stuck paying Zety's monthly fee and my resume felt like everyone else's. resumebuild.cv's AI helped me actually highlight my unique skills.",
        author: "Sarah J.",
        role: "Marketing Manager",
      },
    ],
  },
  {
    id: "resume-io",
    name: "Resume.io",
    slug: "resume-io",
    logo: "/logos/resume-io.svg",
    description:
      "Resume.io offers a streamlined, visually appealing resume creation process with a focus on beautiful templates.",
    idealFor:
      "Users applying in creative fields where visual design trumps strict ATS-parsability.",
    resumebuildIdealFor:
      "Job seekers who need their resume to pass corporate ATS filters while still looking modern and professional.",
    tldr: "Resume.io excels at beautiful, creative templates but struggles with strict ATS compatibility due to complex layouts. resumebuild.cv is built for the modern job hunt, prioritizing machine-readability and AI-tailored content. Choose Resume.io if you're handing a printed resume to a creative director. Choose resumebuild.cv if you're applying online to modern applicant tracking systems.",
    pricing: {
      free: "1 resume, limited templates",
      starting: "$2.95 for 7-day trial",
      pro: "$24.95/month",
      hiddenCosts: "Automatic subscription after 7-day trial.",
    },
    strengths: [
      "Visually stunning templates",
      "Very fast initial setup",
      "Good tracking features for sent resumes",
    ],
    weaknesses: [
      "Templates often use tables/columns that confuse ATS",
      "Expensive monthly subscription",
      "Limited real AI content generation",
    ],
    features: [
      {
        category: "Content Generation",
        items: [
          {
            name: "AI Assistance",
            competitorSupport: "Basic AI spelling and grammar checks",
            resumebuildSupport:
              "Full conversational AI copilot for drafting and editing",
          },
        ],
      },
      {
        category: "Formatting & Design",
        items: [
          {
            name: "ATS Parsing",
            competitorSupport: "Complex layouts can fail parsing",
            resumebuildSupport:
              "100% parse-guaranteed clean HTML/PDF generation",
          },
        ],
      },
    ],
    migration: {
      transferable: ["Text content", "Link URLs"],
      reconfiguration: [
        "Selecting an ATS-friendly template",
        "Applying AI to strengthen weak impact statements",
      ],
    },
    testimonials: [
      {
        quote:
          "My Resume.io CV looked great, but I wasn't getting callbacks. I switched to resumebuild.cv, optimized for the ATS, and got interviews within a week.",
        author: "Michael T.",
        role: "Software Engineer",
      },
    ],
  },
  {
    id: "novoresume",
    name: "Novoresume",
    slug: "novoresume",
    logo: "/logos/novoresume.svg",
    description:
      "Novoresume is a feature-rich resume builder with a focus on getting all your information onto a single page.",
    idealFor:
      "Students or precise individuals who like tightly controlled, grid-based single-page layouts.",
    resumebuildIdealFor:
      "Professionals who want fluid, content-first creation driven by AI, rather than fighting with strict layout boundaries.",
    tldr: "Novoresume excels at strict one-page layouts but struggles with flexibility when you have extensive experience. resumebuild.cv is built for content-first creation, using AI to distill your experience ideally. Choose Novoresume if you want a rigid, pre-defined grid. Choose resumebuild.cv if you want intelligent formatting that adapts to your unique career history.",
    pricing: {
      free: "Basic 1-page resume",
      starting: "$19.99/month",
      pro: "$39.99/3 months",
      hiddenCosts: "Premium features locked tightly behind paywall.",
    },
    strengths: [
      "Excellent one-page optimization",
      "Live content feedback",
      "Good cover letter integration",
    ],
    weaknesses: [
      "Can be difficult to customize formatting",
      "Multi-page resumes require premium",
      "UI can feel cluttered",
    ],
    features: [
      {
        category: "Content Generation",
        items: [
          {
            name: "AI Assistance",
            competitorSupport: "Basic suggestions",
            resumebuildSupport: "Deep contextual AI generation",
          },
        ],
      },
      {
        category: "Flexibility",
        items: [
          {
            name: "Layout Engine",
            competitorSupport: "Rigid grid blocks",
            resumebuildSupport: "Dynamic, content-aware flowing layouts",
          },
        ],
      },
    ],
    migration: {
      transferable: ["Section data", "Skill lists"],
      reconfiguration: [
        "Letting resumebuild.cv's engine naturally format without forced page breaks",
      ],
    },
    testimonials: [
      {
        quote:
          "I fought with Novoresume's margins for hours trying to fit my 10-year career on one page. resumebuild.cv's AI summarized my experience perfectly so it fit naturally.",
        author: "David L.",
        role: "Sales Director",
      },
    ],
  },
];

export function getCompetitorBySlug(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug);
}
