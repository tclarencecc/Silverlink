import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

import type { LanguageCode } from "@/lib/language";
import type { QuestionItem, QuestionTopic } from "@/lib/sports-question.functions";
import { createLovableAiGatewayRunIdFetch } from "@/lib/ai-run-id.server";

const FALLBACKS: Record<LanguageCode, string> = {
  en: "I don't have that information yet—let me connect you to a helper.",
  zh: "我还没有这方面的资料——让我帮您联系一位工作人员。",
  ms: "Saya belum mempunyai maklumat itu—biar saya hubungkan anda dengan seorang pembantu.",
  ta: "அந்தத் தகவல் இன்னும் என்னிடம் இல்லை—உங்களை ஓர் உதவியாளருடன் இணைக்கிறேன்.",
};

const TOPIC_LABELS: Record<QuestionTopic, string> = {
  sports: "SportSG sports facility data",
  music: "Arts Republic music event data",
  hobbies: "OnePA hobby course category data",
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
  topic: QuestionTopic;
  facilities: QuestionItem[];
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

  const facilities = input.facilities;
  const label = TOPIC_LABELS[input.topic];

  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    maxRetries: 2,
    system: [
      `Answer the user's question using only the supplied ${label}.`,
      "Answer in one or two short sentences of plain text, with no markdown or bold.",
      `Answer in ${LANGUAGE_NAMES[input.language]}.`,
      `If the answer is not explicitly supported by the supplied data, reply with exactly: ${FALLBACKS[input.language]}`,
      "Do not infer venues, amenities, opening hours, prices, accessibility, travel distance, or other facts absent from the data.",
    ].join("\n"),
    prompt: `Question:\n${input.question}\n\n${label}:\n${JSON.stringify(facilities)}`,
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