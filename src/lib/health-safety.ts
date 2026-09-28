import healthSafetyData from "@/data/health-safety.json";
import type { LanguageCode } from "@/lib/language";

export type HotlineText = { description: string; hours: string };
export type HealthResourceText = { description: string; eligibility: string; access: string };

export type HealthHotline = {
  id: string;
  name: string;
  provider: string;
  phone: string;
  phoneDisplay: string;
  url: string;
  text: Record<LanguageCode, HotlineText>;
};

export type HealthResource = {
  id: string;
  name: string;
  provider: string;
  url: string;
  text: Record<LanguageCode, HealthResourceText>;
};

export const HEALTH_HOTLINES: HealthHotline[] = healthSafetyData.hotlines;
export const HEALTH_RESOURCES: HealthResource[] = healthSafetyData.resources;

export function getHotlineText(item: HealthHotline, language: LanguageCode | null) {
  return item.text[language ?? "en"];
}

export function getHealthResourceText(item: HealthResource, language: LanguageCode | null) {
  return item.text[language ?? "en"];
}