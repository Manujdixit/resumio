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

export default function LandingPageNew() {
	return (
		<div className="min-h-screen bg-white">
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
