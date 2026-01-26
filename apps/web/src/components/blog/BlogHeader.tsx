import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Route } from "next";

export function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-xl"
          >
            <span>resumebuild.cv</span>
          </Link>
          <nav className="hidden items-center gap-6 font-medium text-muted-foreground text-sm md:flex">
            <Link
              href="/blog"
              className="transition-colors hover:text-foreground"
            >
              Blog
            </Link>
            <Link
              href="/blog/category/resume-writing-tips"
              className="transition-colors hover:text-foreground"
            >
              Resume Tips
            </Link>
            <Link
              href="/blog/category/career-advice"
              className="transition-colors hover:text-foreground"
            >
              Career Advice
            </Link>
            <Link
              href="/resume-templates"
              className="transition-colors hover:text-foreground"
            >
              Templates
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href={"/builder" as Route}>
            <Button size="sm">Build Your Resume</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
