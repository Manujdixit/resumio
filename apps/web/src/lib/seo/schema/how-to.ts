import type { HowTo, WithContext } from "schema-dts";

export function createHowToSchema(data: {
  name: string;
  description: string;
  steps: { name: string; text: string; image?: string; url?: string }[];
  totalTime?: string; // ISO 8601 duration format (e.g. "PT30M")
  image?: string;
  url?: string;
}): WithContext<HowTo> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.name,
    description: data.description,
    image: data.image,
    url: data.url,
    totalTime: data.totalTime,
    step: data.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
      url: step.url,
    })),
  };
}
