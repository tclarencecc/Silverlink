import financialSupportData from "@/data/financial-support.json";
import type { LanguageCode } from "@/lib/language";

export type FinancialSupportText = {
  description: string;
  eligibility: string;
  benefit: string;
};

export type FinancialSupportScheme = {
  id: string;
  name: string;
  provider: string;
  url: string;
  source: string;
  text: Record<LanguageCode, FinancialSupportText>;
};

export const FINANCIAL_SUPPORT_SCHEMES: FinancialSupportScheme[] = financialSupportData;

export function getFinancialSupportText(
  scheme: FinancialSupportScheme,
  language: LanguageCode | null,
): FinancialSupportText {
  return scheme.text[language ?? "en"];
}