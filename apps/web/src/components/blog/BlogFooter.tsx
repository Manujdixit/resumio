import type { Route } from "next";
import Link from "next/link";

export function BlogFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="font-bold text-xl">resumebuild.cv</span>
            <p className="mt-4 max-w-sm text-muted-foreground text-sm">
              The AI-powered resume builder that helps you land your dream job
              faster. Expert advice, professional templates, and smart tools.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-sm">Categories</h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li>
                <Link
                  href="/blog/category/resume-writing-tips"
                  className="hover:text-foreground"
                >
                  Resume Writing
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/category/career-advice"
                  className="hover:text-foreground"
                >
                  Career Advice
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/category/interview-prep"
                  className="hover:text-foreground"
                >
                  Interview Prep
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/category/industry-insights"
                  className="hover:text-foreground"
                >
                  Industry Insights
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-sm">Tools</h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li>
                <Link
                  href={"/builder" as Route}
                  className="hover:text-foreground"
                >
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link
                  href="/resume-templates"
                  className="hover:text-foreground"
                >
                  Resume Templates
                </Link>
              </li>
              <li>
                <Link href="/resume-examples" className="hover:text-foreground">
                  Resume Examples
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-muted-foreground text-sm">
          <p>
            © {new Date().getFullYear()} resumebuild.cv. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
