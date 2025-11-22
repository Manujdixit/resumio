import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTERKEY,
});

export const chatModel = openrouter.chat("x-ai/grok-4.1-fast");
