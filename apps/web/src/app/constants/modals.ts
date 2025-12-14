import { createGateway } from "ai";
// import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? "",
});

// const openrouter = createOpenRouter({
//   apiKey: process.env.OPENROUTERKEY,
// });

// export const chatModel = openrouter.chat(process.env.MODAL_NAME as string);

export const chatModel = gateway.languageModel(
  process.env.MODAL_NAME as string
);
