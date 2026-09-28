import type { LanguageCode } from "@/lib/language";

export type UiStrings = {
  languageLabel: string;
  languageNotSet: string;
  change: string;
  homeHeading: string;
  homeSubheading: string;
  communityHeading: string;
  connectionHeading: string;
  supportHeading: string;
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
  hobbiesCount: string;
  hobbiesSource: string;
  viewCourses: string;
  musicCount: string;
  musicSource: string;
  viewEvent: string;
  helplinesCount: string;
  helplinesSource: string;
  providedBy: string;
  eligibility: string;
  hours: string;
  callNow: string;
  sendEmail: string;
  viewDetails: string;
  groupsCount: string;
  groupsSource: string;
  location: string;
  schedule: string;
  findOutMore: string;
};

export const UI_STRINGS: Record<LanguageCode, UiStrings> = {
  en: {
    languageLabel: "Language:",
    languageNotSet: "Not set",
    change: "Change",
    homeHeading: "How can we help you today?",
    homeSubheading: "Take your time. Choose one and we will take it from there.",
    communityHeading: "What kind of activities?",
    connectionHeading: "What kind of connection?",
    supportHeading: "What kind of support?",
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
    hobbiesCount: "hobby courses from OnePA",
    hobbiesSource: "Source: People's Association, onepa.gov.sg",
    viewCourses: "View courses",
    musicCount: "music events in Singapore",
    musicSource: "Source: Arts Republic, artsrepublic.sg",
    viewEvent: "View event",
    helplinesCount: "services you can contact",
    helplinesSource: "Sources: SAGE Counselling Centre and SG Social Support",
    providedBy: "Provided by",
    eligibility: "Who this is for",
    hours: "When to call",
    callNow: "Call now",
    sendEmail: "Email",
    viewDetails: "View details",
    groupsCount: "groups and programmes you can explore",
    groupsSource: "Sources: Volunteer.gov.sg and Homage",
    location: "Where",
    schedule: "When",
    findOutMore: "Find out more",
  },
  zh: {
    languageLabel: "语言：",
    languageNotSet: "未设置",
    change: "更改",
    homeHeading: "我们今天能帮您什么？",
    homeSubheading: "慢慢来。选择一项，我们会为您安排接下来的步骤。",
    communityHeading: "什么样的活动？",
    connectionHeading: "您想要哪种联系？",
    supportHeading: "您需要哪种援助？",
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
    hobbiesCount: "个人民协会兴趣课程",
    hobbiesSource: "资料来源：人民协会，onepa.gov.sg",
    viewCourses: "查看课程",
    musicCount: "场新加坡音乐活动",
    musicSource: "资料来源：Arts Republic，artsrepublic.sg",
    viewEvent: "查看活动",
    helplinesCount: "项可联系的服务",
    helplinesSource: "资料来源：SAGE 辅导中心及 SG Social Support",
    providedBy: "服务机构",
    eligibility: "适合对象",
    hours: "服务时间",
    callNow: "立即拨打",
    sendEmail: "电邮",
    viewDetails: "查看详情",
    groupsCount: "个可探索的小组和活动",
    groupsSource: "资料来源：Volunteer.gov.sg 及 Homage",
    location: "地点",
    schedule: "时间",
    findOutMore: "了解如何参加",
  },
  ms: {
    languageLabel: "Bahasa:",
    languageNotSet: "Belum ditetapkan",
    change: "Tukar",
    homeHeading: "Apa yang boleh kami bantu hari ini?",
    homeSubheading: "Ambil masa anda. Pilih satu dan kami akan uruskan selepas itu.",
    communityHeading: "Jenis aktiviti apa?",
    connectionHeading: "Jenis hubungan apa?",
    supportHeading: "Apakah jenis sokongan?",
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
    hobbiesCount: "kursus hobi daripada OnePA",
    hobbiesSource: "Sumber: People's Association, onepa.gov.sg",
    viewCourses: "Lihat kursus",
    musicCount: "acara muzik di Singapura",
    musicSource: "Sumber: Arts Republic, artsrepublic.sg",
    viewEvent: "Lihat acara",
    helplinesCount: "khidmat yang boleh anda hubungi",
    helplinesSource: "Sumber: SAGE Counselling Centre dan SG Social Support",
    providedBy: "Disediakan oleh",
    eligibility: "Untuk siapa",
    hours: "Waktu untuk menelefon",
    callNow: "Telefon sekarang",
    sendEmail: "E-mel",
    viewDetails: "Lihat butiran",
    groupsCount: "kumpulan dan program untuk diterokai",
    groupsSource: "Sumber: Volunteer.gov.sg dan Homage",
    location: "Lokasi",
    schedule: "Masa",
    findOutMore: "Ketahui lebih lanjut",
  },
  ta: {
    languageLabel: "மொழி:",
    languageNotSet: "அமைக்கப்படவில்லை",
    change: "மாற்று",
    homeHeading: "இன்று நாங்கள் உங்களுக்கு எப்படி உதவலாம்?",
    homeSubheading: "அவசரமில்லை. ஒன்றைத் தேர்ந்தெடுங்கள், மீதியை நாங்கள் கவனித்துக்கொள்வோம்.",
    communityHeading: "எந்த வகையான நிகழ்வுகள்?",
    connectionHeading: "எந்த வகையான தொடர்பு?",
    supportHeading: "எந்த வகையான உதவி?",
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
    hobbiesCount: "OnePA பொழுதுபோக்கு வகுப்புகள்",
    hobbiesSource: "ஆதாரம்: People's Association, onepa.gov.sg",
    viewCourses: "வகுப்புகளைக் காண்க",
    musicCount: "சிங்கப்பூரில் இசை நிகழ்வுகள்",
    musicSource: "ஆதாரம்: Arts Republic, artsrepublic.sg",
    viewEvent: "நிகழ்வைக் காண்க",
    helplinesCount: "தொடர்புகொள்ளக்கூடிய சேவைகள்",
    helplinesSource: "ஆதாரங்கள்: SAGE Counselling Centre மற்றும் SG Social Support",
    providedBy: "வழங்குபவர்",
    eligibility: "யாருக்கானது",
    hours: "அழைக்கும் நேரம்",
    callNow: "இப்போது அழைக்கவும்",
    sendEmail: "மின்னஞ்சல்",
    viewDetails: "விவரங்களைக் காண்க",
    groupsCount: "ஆராயக்கூடிய குழுக்கள் மற்றும் நிகழ்ச்சிகள்",
    groupsSource: "ஆதாரங்கள்: Volunteer.gov.sg மற்றும் Homage",
    location: "இடம்",
    schedule: "நேரம்",
    findOutMore: "மேலும் அறிக",
  },
};

export function getStrings(language: LanguageCode | null): UiStrings {
  return UI_STRINGS[language ?? "en"];
}
