/**
 * Logger Utility for Mastra Workflow
 * Handles timing, cost estimation, and formatted output.
 */

// Estimated Rates per 1M tokens (USD)
// User can update these as pricing changes.
export const MODEL_RATES: Record<string, { input: number; output: number }> = {
  // Flagship Models
  "openai/gpt-5": { input: 5.0, output: 15.0 },
  "anthropic/claude-sonnet-4": { input: 3.0, output: 15.0 },
  "anthropic/claude-opus-4.1": { input: 15.0, output: 75.0 },

  // Fast/Efficient Models
  "openai/gpt-5-mini": { input: 0.15, output: 0.6 },
  "google/gemini-2.5-flash": { input: 0.1, output: 0.4 },
  "x-ai/grok-4": { input: 2.0, output: 10.0 },

  // Legacy / Fallback
  "openai/gpt-4o": { input: 2.5, output: 10.0 },
  "openai/gpt-4o-mini": { input: 0.15, output: 0.6 },

  "minimax/minimax-m2.1": { input: 0.28, output: 1.2 },
  "xiaomi/mimo-v2-flash": { input: 0.09, output: 0.29 },
  "zai/glm-4.7": { input: 0.2, output: 0.2 },
};

export function logStepStart(stepName: string): number {
  const start = Date.now();
  console.log(`\n⏳ [${stepName}] Starting...`);
  return start;
}

export function logStepEnd(
  stepName: string,
  startTime: number,
  usage?: { promptTokens: number; completionTokens: number },
  modelId?: string,
) {
  const durationMs = Date.now() - startTime;
  const durationSec = (durationMs / 1000).toFixed(2);

  let costInfo = "";
  if (usage && modelId) {
    const rate = MODEL_RATES[modelId];
    if (rate) {
      const cost =
        (usage.promptTokens * rate.input +
          usage.completionTokens * rate.output) /
        1_000_000;
      costInfo = ` | 💰 ~$${cost.toFixed(5)} (In: ${usage.promptTokens}, Out: ${usage.completionTokens})`;
    } else {
      costInfo = ` | ❓ Cost unknown for model: ${modelId}`;
    }
  }

  console.log(`✅ [${stepName}] Completed in ${durationSec}s${costInfo}`);
}
