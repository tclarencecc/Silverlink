import hobbiesJson from "@/data/hobbies.json";
import type { LanguageCode } from "@/lib/language";

export type Hobby = {
  id: string;
  url: string;
  name: Record<LanguageCode, string>;
};

export const HOBBIES: Hobby[] = hobbiesJson as Hobby[];

export function getHobbyName(hobby: Hobby, language: LanguageCode | null): string {
  return hobby.name[language ?? "en"] ?? hobby.name.en;
}
