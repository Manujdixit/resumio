import { gateway } from "@ai-sdk/gateway";

console.log("Gateway export:", gateway);
console.log("Keys:", Object.keys(gateway));

try {
  const model = gateway("test");
  console.log("Model keys:", Object.keys(model));
} catch (e) {
  console.log("Error calling gateway:", e);
}
