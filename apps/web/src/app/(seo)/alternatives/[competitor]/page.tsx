import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { competitors, getCompetitorBySlug } from "@/data/competitors";
import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";
import {
  generateCanonical,
  generateDescription,
  generateTitle,
} from "@/lib/seo/metadata";
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

  const title = generateTitle(
    `Best ${competitorData.name} Alternative in 2026`,
    SITE_NAME,
  );
  const description = generateDescription(
    `Comparing ${competitorData.name} vs ${SITE_NAME}. Find out why job seekers are switching to the best ATS-optimized AI resume builder.`,
  );
  const canonical = generateCanonical(`/alternatives/${slug}`, SITE_URL);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
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
