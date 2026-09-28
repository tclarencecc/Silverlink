import helplineData from "@/data/helplines.json";
import type { LanguageCode } from "@/lib/language";

export type HelplineText = {
  description: string;
  eligibility: string;
  hours: string;
};

export type Helpline = {
  id: string;
  name: string;
  provider: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  url: string;
  text: Record<LanguageCode, HelplineText>;
};

export const HELPLINES: Helpline[] = helplineData;

export function getHelplineText(
  helpline: Helpline,
  language: LanguageCode | null,
): HelplineText {
  return helpline.text[language ?? "en"];
}