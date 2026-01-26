import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../index.css";
import Providers from "@/components/providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, siteConfig } from "@/lib/seo-config";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.resumebuild.cv"),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "resumebuild.cv" }],
  creator: "resumebuild.cv",
  publisher: "resumebuild.cv",

  // OpenGraph for AI search engines and social platforms
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "resumebuild.cv - AI Resume Builder",
      },
    ],
  },

  // Twitter Cards for social sharing
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@resumebuildcv",
  },

  // Search engine verification
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },

  // Robots directives for AI crawlers
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical URL
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <body className={`${manrope.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
