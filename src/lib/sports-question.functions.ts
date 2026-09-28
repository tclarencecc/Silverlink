import { createServerFn } from "@tanstack/react-start";

import type { LanguageCode } from "@/lib/language";
import type { SportFacility } from "@/lib/sportsg.functions";

type SportsQuestionInput = {
  question: string;
  language: LanguageCode;
  facilities: SportFacility[];
};

const LANGUAGES = new Set<LanguageCode>(["en", "zh", "ms", "ta"]);

function validateInput(value: SportsQuestionInput): SportsQuestionInput {
  if (
    !value ||
    typeof value.question !== "string" ||
    !value.question.trim() ||
    value.question.length > 500 ||
    !LANGUAGES.has(value.language) ||
    !Array.isArray(value.facilities) ||
    value.facilities.length > 200
  ) {
    throw new Error("Please enter a valid question.");
  }

  return { ...value, question: value.question.trim() };
}

export const askSportsQuestion = createServerFn({ method: "POST" })
  .inputValidator(validateInput)
  .handler(async ({ data }) => {
    const { answerSportsQuestion } = await import("@/lib/sports-question.server");
    return { answer: await answerSportsQuestion(data) };
  });