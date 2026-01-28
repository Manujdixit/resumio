"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  content: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [headings, setHeadings] = useState<TocItem[]>([]);

  useEffect(() => {
    // Parse headings from markdown content
    const headingRegex = /^(##)\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match: RegExpExecArray | null;

    // biome-ignore lint/suspicious/noAssignInExpressions: Regex exec loop
    while ((match = headingRegex.exec(content)) !== null) {
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      items.push({ id, text, level: match[1].length });
    }

    setHeadings(items);

    // Setup intersection observer for active state
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -66%" },
    );

    for (const { id } of items) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 hidden h-[calc(100vh-6rem)] w-64 flex-col gap-4 overflow-y-auto pb-10 xl:flex">
      <h4 className="font-semibold text-sm">On This Page</h4>
      <div className="flex flex-col gap-2 border-l pl-4">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "text-muted-foreground text-sm transition-colors hover:text-foreground",
              activeId === heading.id &&
                "font-medium text-primary hover:text-primary",
            )}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({
                behavior: "smooth",
              });
              setActiveId(heading.id);
            }}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </nav>
  );
}
