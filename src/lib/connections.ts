import { MessageCircleHeart, UsersRound, type LucideIcon } from "lucide-react";

import type { LanguageCode } from "@/lib/language";

export type ConnectionOptionId = "talk" | "group";

export type ConnectionOptionText = {
  title: string;
  blurb: string;
  nearbyTitle: string;
  detail: string;
};

export type ConnectionOption = {
  id: ConnectionOptionId;
  text: Record<LanguageCode, ConnectionOptionText>;
  icon: LucideIcon;
};

export const CONNECTION_OPTIONS: ConnectionOption[] = [
  {
    id: "talk",
    text: {
      en: {
        title: "Someone to talk to",
        blurb: "A friendly voice when you need one",
        nearbyTitle: "Someone to talk to, near you",
        detail:
          "Find helplines, befrienders and counselling services where someone will listen.",
      },
      zh: {
        title: "找人倾诉",
        blurb: "需要时，有人倾听",
        nearbyTitle: "您附近可以倾诉的对象",
        detail: "寻找热线、关怀义工和辅导服务，有人愿意倾听您的心声。",
      },
      ms: {
        title: "Seseorang untuk berbual",
        blurb: "Suara mesra bila anda perlukannya",
        nearbyTitle: "Seseorang untuk berbual, berdekatan anda",
        detail:
          "Cari talian bantuan, rakan peneman dan perkhidmatan kaunseling di mana seseorang akan mendengar.",
      },
      ta: {
        title: "பேச ஒருவர்",
        blurb: "தேவைப்படும்போது ஒரு நட்பான குரல்",
        nearbyTitle: "அருகில் பேச ஒருவர்",
        detail:
          "கவனிக்க ஒருவர் இருக்கும் உதவி எண்கள், நட்புறவு சேவைகள் மற்றும் ஆலோசனை சேவைகளைக் கண்டறியுங்கள்.",
      },
    },
    icon: MessageCircleHeart,
  },
  {
    id: "group",
    text: {
      en: {
        title: "Find a group to join",
        blurb: "Meet people who share your interests",
        nearbyTitle: "Groups you can join, near you",
        detail:
          "Find interest groups, senior activity clubs and regular meet-ups close to you.",
      },
      zh: {
        title: "加入小组",
        blurb: "结识志同道合的朋友",
        nearbyTitle: "您附近可以加入的小组",
        detail: "寻找您附近的兴趣小组、乐龄活动俱乐部和定期聚会。",
      },
      ms: {
        title: "Cari kumpulan untuk disertai",
        blurb: "Berjumpa orang yang berkongsi minat anda",
        nearbyTitle: "Kumpulan yang boleh anda sertai, berdekatan anda",
        detail:
          "Cari kumpulan minat, kelab aktiviti warga emas dan pertemuan berkala berhampiran anda.",
      },
      ta: {
        title: "சேர ஒரு குழுவைக் கண்டறியுங்கள்",
        blurb: "உங்கள் ஆர்வங்களைப் பகிரும் மக்களைச் சந்தியுங்கள்",
        nearbyTitle: "அருகில் சேரக்கூடிய குழுக்கள்",
        detail:
          "உங்களுக்கு அருகில் உள்ள ஆர்வக் குழுக்கள், மூத்தோர் செயல்பாட்டு கிளப்கள் மற்றும் வழக்கமான சந்திப்புகளைக் கண்டறியுங்கள்.",
      },
    },
    icon: UsersRound,
  },
];

export function getConnectionOption(
  id: string | undefined,
): ConnectionOption | undefined {
  return CONNECTION_OPTIONS.find((option) => option.id === id);
}

export function getConnectionOptionText(
  option: ConnectionOption,
  language: LanguageCode | null,
): ConnectionOptionText {
  return option.text[language ?? "en"];
}
