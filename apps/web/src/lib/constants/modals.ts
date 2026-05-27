import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

/**
 * NVIDIA NIM (OpenAI-compatible) language model for the website module.
 *
 * Configure via:
 * - NIM_API_KEY
 * - NIM_BASE_URL (optional; defaults to provider default)
 * - MODAL_NAME (model name, e.g. "meta/llama-3.1-70b-instruct")
 */
const nim = createOpenAICompatible({
  name: "nim",
  apiKey: process.env.NIM_API_KEY ?? "",
  baseURL: process.env.NIM_BASE_URL,
});

export const chatModel = nim.languageModel(process.env.MODAL_NAME as string);
