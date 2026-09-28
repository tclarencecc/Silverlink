import type { LanguageCode } from "@/lib/language";

export type UiStrings = {
  languageLabel: string;
  languageNotSet: string;
  change: string;
  homeHeading: string;
  homeSubheading: string;
  youChose: string;
  back: string;
  comingSoonNote: string;
  backToStart: string;
};

export const UI_STRINGS: Record<LanguageCode, UiStrings> = {
  en: {
    languageLabel: "Language:",
    languageNotSet: "Not set",
    change: "Change",
    homeHeading: "How can we help you today?",
    homeSubheading: "Take your time. Choose one and we will take it from there.",
    youChose: "You chose:",
    back: "Back",
    comingSoonNote:
      "These screens are still being made. Soon you will see what is nearby, when it happens, and how to join in.",
    backToStart: "Back to start",
  },
  zh: {
    languageLabel: "语言：",
    languageNotSet: "未设置",
    change: "更改",
    homeHeading: "我们今天能帮您什么？",
    homeSubheading: "慢慢来。选择一项，我们会为您安排接下来的步骤。",
    youChose: "您选择了：",
    back: "返回",
    comingSoonNote:
      "这些页面仍在制作中。很快您就能看到附近有什么活动、什么时候举行，以及如何参加。",
    backToStart: "回到开始",
  },
  ms: {
    languageLabel: "Bahasa:",
    languageNotSet: "Belum ditetapkan",
    change: "Tukar",
    homeHeading: "Apa yang boleh kami bantu hari ini?",
    homeSubheading: "Ambil masa anda. Pilih satu dan kami akan uruskan selepas itu.",
    youChose: "Anda memilih:",
    back: "Kembali",
    comingSoonNote:
      "Skrin ini masih disediakan. Tidak lama lagi anda akan melihat apa yang berdekatan, bila ia berlaku, dan cara untuk menyertainya.",
    backToStart: "Kembali ke mula",
  },
  ta: {
    languageLabel: "மொழி:",
    languageNotSet: "அமைக்கப்படவில்லை",
    change: "மாற்று",
    homeHeading: "இன்று நாங்கள் உங்களுக்கு எப்படி உதவலாம்?",
    homeSubheading: "அவசரமில்லை. ஒன்றைத் தேர்ந்தெடுங்கள், மீதியை நாங்கள் கவனித்துக்கொள்வோம்.",
    youChose: "நீங்கள் தேர்ந்தது:",
    back: "பின்செல்",
    comingSoonNote:
      "இந்தத் திரைகள் இன்னும் தயாராகிக் கொண்டிருக்கின்றன. விரைவில் அருகில் என்ன இருக்கிறது, எப்போது நடக்கிறது, எப்படி சேர்வது என்பதை நீங்கள் காணலாம்.",
    backToStart: "மீண்டும் தொடக்கத்திற்கு",
  },
};

export function getStrings(language: LanguageCode | null): UiStrings {
  return UI_STRINGS[language ?? "en"];
}
