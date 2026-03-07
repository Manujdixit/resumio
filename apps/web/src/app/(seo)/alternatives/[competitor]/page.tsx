import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { competitors, getCompetitorBySlug } from "@/data/competitors";
import AlternativeClientPage from "./client-page";

type Props = {
  params: Promise<{
    competitor: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competitor: slug } = await params;
  const competitorData = getCompetitorBySlug(slug);

  if (!competitorData) {
    return {
      title: "Competitor Not Found",
    };
  }

  return {
    title: `Best ${competitorData.name} Alternative in 2026 | resumebuild.cv`,
    description: `Comparing ${competitorData.name} vs resumebuild.cv. Find out why job seekers are switching to the best ATS-optimized AI resume builder.`,
  };
}

export function generateStaticParams() {
  return competitors.map((competitor) => ({
    competitor: competitor.slug,
  }));
}

export default async function CompetitorPage({ params }: Props) {
  const { competitor: slug } = await params;
  const competitor = getCompetitorBySlug(slug);

  if (!competitor) {
    notFound();
  }

  return <AlternativeClientPage competitor={competitor} />;
}
