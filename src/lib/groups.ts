import groupData from "@/data/groups.json";
import type { LanguageCode } from "@/lib/language";

export type GroupText = {
  description: string;
  eligibility: string;
  location: string;
  schedule: string;
};

export type GroupOption = {
  id: string;
  name: string;
  provider: string;
  url: string;
  source: string;
  text: Record<LanguageCode, GroupText>;
};

export const GROUP_OPTIONS: GroupOption[] = groupData;

export function getGroupText(
  group: GroupOption,
  language: LanguageCode | null,
): GroupText {
  return group.text[language ?? "en"];
}