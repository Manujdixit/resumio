import { SITE_NAME, SITE_URL } from "../constants";

interface HowToStep {
	name: string;
	text: string;
}

interface HowToParams {
	name: string;
	description: string;
	steps: HowToStep[];
	totalTime?: string;
}

/**
 * Generate HowTo schema
 */
export function createHowToSchema(params: HowToParams) {
	return {
		"@context": "https://schema.org",
		"@type": "HowTo",
		name: params.name,
		description: params.description,
		totalTime: params.totalTime,
		step: params.steps.map((step, i) => ({
			"@type": "HowToStep",
			position: i + 1,
			name: step.name,
			text: step.text,
		})),
		publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
	};
}
