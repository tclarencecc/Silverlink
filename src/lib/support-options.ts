import { HeartPulse, WalletCards, type LucideIcon } from "lucide-react";

import type { LanguageCode } from "@/lib/language";

export type SupportOptionId = "money" | "health-safety";

export type SupportOptionText = {
  title: string;
  blurb: string;
  nearbyTitle: string;
  detail: string;
};

export type SupportOption = {
  id: SupportOptionId;
  text: Record<LanguageCode, SupportOptionText>;
  icon: LucideIcon;
};

export const SUPPORT_OPTIONS: SupportOption[] = [
  {
    id: "money",
    text: {
      en: {
        title: "Money Matters",
        blurb: "Find help with bills and financial support",
        nearbyTitle: "Money help near you",
        detail: "Find support for daily expenses, bills, benefits and financial concerns.",
      },
      zh: {
        title: "财务事项",
        blurb: "寻找账单和经济援助",
        nearbyTitle: "您附近的经济援助",
        detail: "寻找日常开支、账单、福利和财务问题方面的援助。",
      },
      ms: {
        title: "Hal Kewangan",
        blurb: "Cari bantuan untuk bil dan sokongan kewangan",
        nearbyTitle: "Bantuan kewangan berdekatan anda",
        detail: "Cari sokongan untuk perbelanjaan harian, bil, faedah dan masalah kewangan.",
      },
      ta: {
        title: "பண விவகாரங்கள்",
        blurb: "கட்டணங்கள் மற்றும் நிதி உதவியைப் பெறுங்கள்",
        nearbyTitle: "அருகிலுள்ள நிதி உதவி",
        detail: "அன்றாடச் செலவுகள், கட்டணங்கள், சலுகைகள் மற்றும் நிதிக் கவலைகளுக்கான உதவியைப் பெறுங்கள்.",
      },
    },
    icon: WalletCards,
  },
  {
    id: "health-safety",
    text: {
      en: {
        title: "Health and safety",
        blurb: "Get support to stay well and safe",
        nearbyTitle: "Health and safety help near you",
        detail: "Find health, home safety and emergency support services near you.",
      },
      zh: {
        title: "健康与安全",
        blurb: "获取保持健康与安全的援助",
        nearbyTitle: "您附近的健康与安全援助",
        detail: "寻找您附近的健康、居家安全和紧急援助服务。",
      },
      ms: {
        title: "Kesihatan dan keselamatan",
        blurb: "Dapatkan sokongan untuk kekal sihat dan selamat",
        nearbyTitle: "Bantuan kesihatan dan keselamatan berdekatan anda",
        detail: "Cari perkhidmatan kesihatan, keselamatan rumah dan bantuan kecemasan berdekatan anda.",
      },
      ta: {
        title: "உடல்நலம் மற்றும் பாதுகாப்பு",
        blurb: "நலமாகவும் பாதுகாப்பாகவும் இருக்க உதவி பெறுங்கள்",
        nearbyTitle: "அருகிலுள்ள உடல்நலம் மற்றும் பாதுகாப்பு உதவி",
        detail: "அருகிலுள்ள உடல்நலம், வீட்டுப் பாதுகாப்பு மற்றும் அவசர உதவிச் சேவைகளைக் கண்டறியுங்கள்.",
      },
    },
    icon: HeartPulse,
  },
];

export function getSupportOption(id: string | undefined): SupportOption | undefined {
  return SUPPORT_OPTIONS.find((option) => option.id === id);
}

export function getSupportOptionText(
  option: SupportOption,
  language: LanguageCode | null,
): SupportOptionText {
  return option.text[language ?? "en"];
}