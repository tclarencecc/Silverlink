import type { LanguageCode } from "@/lib/language";

export type UiStrings = {
  languageLabel: string;
  languageNotSet: string;
  change: string;
  homeHeading: string;
  homeSubheading: string;
  communityHeading: string;
  youChose: string;
  back: string;
  comingSoonNote: string;
  backToStart: string;
  sportsLoading: string;
  sportsError: string;
  sportsCount: string;
  singapore: string;
  moreInfo: string;
  openMap: string;
  sportsSource: string;
};

export const UI_STRINGS: Record<LanguageCode, UiStrings> = {
  en: {
    languageLabel: "Language:",
    languageNotSet: "Not set",
    change: "Change",
    homeHeading: "How can we help you today?",
    homeSubheading: "Take your time. Choose one and we will take it from there.",
    communityHeading: "What kind of activities?",
    youChose: "You chose:",
    back: "Back",
    comingSoonNote:
      "These screens are still being made. Soon you will see what is nearby, when it happens, and how to join in.",
    backToStart: "Back to start",
    sportsLoading: "Finding sport centres…",
    sportsError: "Sorry, we could not load the list right now. Please try again later.",
    sportsCount: "sport centres in Singapore",
    singapore: "Singapore",
    moreInfo: "More info",
    openMap: "Map",
    sportsSource: "Source: Sport Singapore, data.gov.sg",
  },
  zh: {
    languageLabel: "语言：",
    languageNotSet: "未设置",
    change: "更改",
    homeHeading: "我们今天能帮您什么？",
    homeSubheading: "慢慢来。选择一项，我们会为您安排接下来的步骤。",
    communityHeading: "什么样的活动？",
    youChose: "您选择了：",
    back: "返回",
    comingSoonNote:
      "这些页面仍在制作中。很快您就能看到附近有什么活动、什么时候举行，以及如何参加。",
    backToStart: "回到开始",
    sportsLoading: "正在寻找体育中心…",
    sportsError: "抱歉，暂时无法加载列表。请稍后再试。",
    sportsCount: "个新加坡体育中心",
    singapore: "新加坡",
    moreInfo: "了解更多",
    openMap: "地图",
    sportsSource: "资料来源：新加坡体育理事会，data.gov.sg",
  },
  ms: {
    languageLabel: "Bahasa:",
    languageNotSet: "Belum ditetapkan",
    change: "Tukar",
    homeHeading: "Apa yang boleh kami bantu hari ini?",
    homeSubheading: "Ambil masa anda. Pilih satu dan kami akan uruskan selepas itu.",
    communityHeading: "Jenis aktiviti apa?",
    youChose: "Anda memilih:",
    back: "Kembali",
    comingSoonNote:
      "Skrin ini masih disediakan. Tidak lama lagi anda akan melihat apa yang berdekatan, bila ia berlaku, dan cara untuk menyertainya.",
    backToStart: "Kembali ke mula",
    sportsLoading: "Mencari pusat sukan…",
    sportsError: "Maaf, senarai tidak dapat dimuatkan sekarang. Sila cuba lagi nanti.",
    sportsCount: "pusat sukan di Singapura",
    singapore: "Singapura",
    moreInfo: "Maklumat lanjut",
    openMap: "Peta",
    sportsSource: "Sumber: Sport Singapore, data.gov.sg",
  },
  ta: {
    languageLabel: "மொழி:",
    languageNotSet: "அமைக்கப்படவில்லை",
    change: "மாற்று",
    homeHeading: "இன்று நாங்கள் உங்களுக்கு எப்படி உதவலாம்?",
    homeSubheading: "அவசரமில்லை. ஒன்றைத் தேர்ந்தெடுங்கள், மீதியை நாங்கள் கவனித்துக்கொள்வோம்.",
    communityHeading: "எந்த வகையான நிகழ்வுகள்?",
    youChose: "நீங்கள் தேர்ந்தது:",
    back: "பின்செல்",
    comingSoonNote:
      "இந்தத் திரைகள் இன்னும் தயாராகிக் கொண்டிருக்கின்றன. விரைவில் அருகில் என்ன இருக்கிறது, எப்போது நடக்கிறது, எப்படி சேர்வது என்பதை நீங்கள் காணலாம்.",
    backToStart: "மீண்டும் தொடக்கத்திற்கு",
    sportsLoading: "விளையாட்டு மையங்களைத் தேடுகிறோம்…",
    sportsError: "மன்னிக்கவும், பட்டியலை இப்போது ஏற்ற முடியவில்லை. பிறகு மீண்டும் முயற்சிக்கவும்.",
    sportsCount: "சிங்கப்பூரில் உள்ள விளையாட்டு மையங்கள்",
    singapore: "சிங்கப்பூர்",
    moreInfo: "மேலும் தகவல்",
    openMap: "வரைபடம்",
    sportsSource: "ஆதாரம்: Sport Singapore, data.gov.sg",
  },
};

export function getStrings(language: LanguageCode | null): UiStrings {
  return UI_STRINGS[language ?? "en"];
}
