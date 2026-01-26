import type { Route } from "next";
import Link from "next/link";
import type { RelatedPage } from "@/lib/seo/types";

interface Props {
  links: RelatedPage[];
  title?: string;
}

export function RelatedLinks({ links, title = "Related Pages" }: Props) {
  if (links.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-4 font-semibold text-gray-900 text-xl">{title}</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {links.slice(0, 6).map((link) => (
          <Link
            key={link.path}
            href={link.path as Route}
            className="rounded-lg border border-gray-200 p-3 transition-colors hover:border-blue-500"
          >
            <span className="font-medium text-gray-900">{link.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
