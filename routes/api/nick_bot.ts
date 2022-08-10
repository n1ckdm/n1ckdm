import { HandlerContext } from "$fresh/server.ts";
import { buildPrompt } from "../../src/server.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  const questions = await _req.json();
  const res = await fetch("https://api.ai21.com/studio/v1/j1-jumbo/complete", {
    headers: {
      Authorization: `Bearer ${Deno.env.get("AI21_TOKEN")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: buildPrompt(questions),
      numResults: 1,
      maxTokens: 100,
      temperature: 0.5,
      topKReturn: 0,
      topP: 0.9,
      countPenalty: {
        scale: 0,
        applyToNumbers: false,
        applyToPunctuations: false,
        applyToStopwords: false,
        applyToWhitespaces: false,
        applyToEmojis: false,
      },
      frequencyPenalty: {
        scale: 0,
        applyToNumbers: false,
        applyToPunctuations: false,
        applyToStopwords: false,
        applyToWhitespaces: false,
        applyToEmojis: false,
      },
      presencePenalty: {
        scale: 0,
        applyToNumbers: false,
        applyToPunctuations: false,
        applyToStopwords: false,
        applyToWhitespaces: false,
        applyToEmojis: false,
      },
      stopSequences: ["##", "Person:"],
    }),
    method: "POST",
  });
  const answer = await res.text();
  return new Response(answer);
};
