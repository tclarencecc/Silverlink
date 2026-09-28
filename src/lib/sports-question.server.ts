import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

import type { LanguageCode } from "@/lib/language";
import type { SportFacility } from "@/lib/sportsg.functions";
import { createLovableAiGatewayRunIdFetch } from "@/lib/ai-run-id.server";

const FALLBACKS: Record<LanguageCode, string> = {
  en: "I don't have that information yet—let me connect you to a helper.",
  zh: "我还没有这方面的资料——让我帮您联系一位工作人员。",
  ms: "Saya belum mempunyai maklumat itu—biar saya hubungkan anda dengan seorang pembantu.",
  ta: "அந்தத் தகவல் இன்னும் என்னிடம் இல்லை—உங்களை ஓர் உதவியாளருடன் இணைக்கிறேன்.",
};

const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  en: "English",
  zh: "Simplified Chinese",
  ms: "Malay",
  ta: "Tamil",
};

export async function answerSportsQuestion(input: {
  question: string;
  language: LanguageCode;
  facilities: SportFacility[];
}) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("Lovable AI is not configured for this app.");

  const runIdFetch = createLovableAiGatewayRunIdFetch();
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: {
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
    fetch: runIdFetch.fetch,
  });

  const facilities = input.facilities.map(({ venue, address, postalCode, detailsUrl }) => ({
    venue,
    address,
    postalCode,
    detailsUrl,
  }));

  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    maxRetries: 2,
    system: [
      "Answer the user's question using only the supplied SportSG facility data.",
      "Answer in one or two short sentences.",
      `Answer in ${LANGUAGE_NAMES[input.language]}.`,
      `If the answer is not explicitly supported by the supplied data, reply with exactly: ${FALLBACKS[input.language]}`,
      "Do not infer facilities, amenities, opening hours, prices, accessibility, travel distance, or other facts absent from the data.",
    ].join("\n"),
    prompt: `Question:\n${input.question}\n\nSportSG facility data:\n${JSON.stringify(facilities)}`,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  const answer = (await result.text).trim();
  return answer || FALLBACKS[input.language];
}