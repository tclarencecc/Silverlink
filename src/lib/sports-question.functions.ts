import { createServerFn } from "@tanstack/react-start";

import type { LanguageCode } from "@/lib/language";

export type QuestionTopic = "sports" | "music" | "hobbies";
export type QuestionItem = Record<string, string | null>;

type SportsQuestionInput = {
  question: string;
  language: LanguageCode;
  topic: QuestionTopic;
  facilities: QuestionItem[];
};

const TOPICS = new Set<QuestionTopic>(["sports", "music", "hobbies"]);

const LANGUAGES = new Set<LanguageCode>(["en", "zh", "ms", "ta"]);

function validateInput(value: SportsQuestionInput): SportsQuestionInput {
  if (
    !value ||
    typeof value.question !== "string" ||
    !value.question.trim() ||
    value.question.length > 500 ||
    !LANGUAGES.has(value.language) ||
    !TOPICS.has(value.topic) ||
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