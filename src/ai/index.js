import { callGroqAI } from "./providers/groq.js";
import { defaultPrompt } from "./prompts/defaultPrompt.js";
import dotenv from "dotenv";

export async function runAIReview(context) {
  dotenv.config();
  const prompt = defaultPrompt(context);
  const apiKey = process.env.PULLBEAR_GROQ_KEY;
  if (!apiKey) throw new Error("Groq API key missing in env");

  const output = await callGroqAI(prompt, apiKey);
  // let sanitizeOutput=sanitizeSuggestions(output)
  console.log("🤖 AI Review Output:");
  console.log(output);
}
// export function sanitizeSuggestions(suggestions) {
//   const seen = new Set();
//   return suggestions.filter(s => {
//     const key = s.toLowerCase().replace(/[^a-z0-9]/gi, '').slice(0, 100);
//     if (seen.has(key)) return false;
//     seen.add(key);
//     return true;
//   });
// }
