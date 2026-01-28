import type { Metadata } from "next";
import { FooterNew } from "@/components/landing-v2/FooterNew";
import { NavbarNew } from "@/components/landing-v2/NavbarNew";

export const metadata: Metadata = {
  title: "Free Resume Tools | Resumio",
  description:
    "Free tools to help you build, optimize, and improve your resume.",
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <NavbarNew />
      <main className="flex-1 pt-16">{children}</main>
      <FooterNew />
    </div>
  );
}
