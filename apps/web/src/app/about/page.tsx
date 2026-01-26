import type { Metadata } from "next";
import { FooterNew, NavbarNew } from "@/components/landing-v2";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateWebPageSchema, siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "About Us | resumebuild.cv",
  description:
    "Learn more about resumebuild.cv, our mission to democratize career success, and the team behind the AI-powered resume builder.",
  openGraph: {
    title: "About Us | resumebuild.cv",
    description:
      "Learn more about resumebuild.cv, our mission to democratize career success, and the team behind the AI-powered resume builder.",
    url: `${siteConfig.url}/about`,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

const aboutPageSchema = generateWebPageSchema(
  "About Us",
  "Learn more about resumebuild.cv, our mission to democratize career success, and the team behind the AI-powered resume builder.",
  `${siteConfig.url}/about`,
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-white">
      <JsonLd data={aboutPageSchema} />
      {/* Grid Background Layer */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern bg-grid-sm opacity-[0.03]" />

      <div className="relative z-10 flex flex-col">
        <NavbarNew />
        <main className="flex-grow py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="mb-8 font-bold text-4xl text-white">About Us</h1>
            <p className="mb-12 text-xl text-zinc-400 leading-relaxed">
              We are on a mission to help job seekers everywhere land their
              dream jobs with confidence and ease.
            </p>

            <div className="space-y-12 text-zinc-300">
              <section>
                <h2 className="mb-4 font-semibold text-2xl text-white">
                  Our Mission
                </h2>
                <p className="leading-relaxed">
                  At resumebuild.cv, we believe that everyone deserves a fair
                  shot at career success. The job market can be competitive and
                  overwhelming, but creating a professional, ATS-friendly resume
                  shouldn't be. We leverage cutting-edge AI technology to
                  simplify the resume creation process, helping you showcase
                  your skills and experience in the best possible light.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-semibold text-2xl text-white">
                  Why Choose Us?
                </h2>
                <p className="mb-4 leading-relaxed">
                  We understand that writing a resume is more than just listing
                  your job history. It's about telling your professional story.
                </p>
                <ul className="ml-4 list-inside list-disc space-y-2 text-zinc-400">
                  <li>
                    <strong className="text-white">AI-Powered Writing:</strong>{" "}
                    Our smart algorithms help you craft compelling bullet
                    points.
                  </li>
                  <li>
                    <strong className="text-white">
                      ATS-Friendly Templates:
                    </strong>{" "}
                    Designed to pass through Applicant Tracking Systems.
                  </li>
                  <li>
                    <strong className="text-white">
                      Real-Time Suggestions:
                    </strong>{" "}
                    Get instant feedback to improve your content.
                  </li>
                  <li>
                    <strong className="text-white">Privacy First:</strong> Your
                    data is yours. We prioritize security and privacy.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 font-semibold text-2xl text-white">
                  Our Story
                </h2>
                <p className="leading-relaxed">
                  Started by a team of engineers and career coaches,
                  resumebuild.cv was born out of frustration with clunky,
                  outdated resume builders. We wanted to build a tool that feels
                  modern, fast, and actually helpful. Today, we're proud to be
                  helping thousands of professionals take the next step in their
                  careers.
                </p>
              </section>
            </div>
          </div>
        </main>
        <FooterNew />
      </div>
    </div>
  );
}
