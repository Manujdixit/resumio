import { gateway } from "@ai-sdk/gateway";
import { embed } from "ai";

/**
 * Generate a vector embedding for the given text.
 * Uses Vercel AI Gateway with alibaba/qwen3-embedding-0.6b model (1024 dimensions).
 *
 * @param text - The text to embed
 * @returns The embedding vector
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    // Truncate text to avoid token limits (32k context for Qwen3)
    // A safe approximation is ~24k chars
    const safeText = text.slice(0, 24000);

    const { embedding } = await embed({
      model: gateway.textEmbeddingModel("alibaba/qwen3-embedding-0.6b"),
      value: safeText,
    });
    return embedding;
  } catch (error) {
    console.error("Embedding generation failed:", error);
    throw error;
  }
}
