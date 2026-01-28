import {
  FAQ,
  FeaturesNew,
  FooterNew,
  HeroNew,
  HowItWorksNew,
  NavbarNew,
  StatsSection,
  Testimonials,
  ToolsGrid,
  TrustBadges,
  UseCases,
} from "@/components/landing-v2";
import { JsonLd } from "@/components/seo/JsonLd";
import { landingPageSchema } from "@/lib/seo-config";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={landingPageSchema} />
      <NavbarNew />
      <main>
        <HeroNew />
        <TrustBadges />
        <FeaturesNew />
        <StatsSection />
        <HowItWorksNew />
        <ToolsGrid />
        <Testimonials />
        <UseCases />
        <FAQ />
      </main>
      <FooterNew />
    </div>
  );
}
