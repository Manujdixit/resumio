import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTERKEY,
});

export const chatModel = openrouter.chat(process.env.MODAL_NAME as string);
