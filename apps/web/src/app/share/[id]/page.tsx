import { db, schema } from "@resumio/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PublicResumeViewer } from "./PublicResumeViewer";

// Force dynamic rendering since we're fetching data
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

async function getResume(shareId: string) {
  const resume = await db.query.resume.findFirst({
    where: eq(schema.resume.shareId, shareId),
  });

  if (!resume || !resume.isPublic) return null;
  return resume;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const resume = await getResume(id);

  if (!resume) {
    return {
      title: "Resume Not Found",
    };
  }

  return {
    title: `${resume.title} - Resumio`,
    description: `View ${resume.title} on Resumio`,
  };
}

export default async function SharePage({ params }: Props) {
  const { id } = await params;
  const resume = await getResume(id);

  if (!resume) {
    notFound();
  }

  // We need to pass the data to the client component.
  // ResumePreview expects data from the store, but for a public page,
  // we should probably pass it as a prop or initialize the store.
  // However, ResumePreview is tightly coupled to the store.
  // A better approach for the public page is to have a wrapper that initializes the store.

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center py-10">
      <div className="w-full max-w-[210mm] bg-white shadow-2xl min-h-[297mm]">
        {/* We need a client wrapper to set the store data */}
        <PublicResumeViewer data={resume} />
      </div>
      <div className="mt-8 text-zinc-500 text-sm">
        Built with <span className="font-bold text-white">Resumio</span>
      </div>
    </div>
  );
}
