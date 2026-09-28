import { HandHeart, House, Users, type LucideIcon } from "lucide-react";

import type { LanguageCode } from "@/lib/language";

export type ServiceId = "community" | "connection" | "support";

export type ServiceText = {
  title: string;
  blurb: string;
  detail: string;
};

export type Service = {
  id: ServiceId;
  text: Record<LanguageCode, ServiceText>;
  icon: LucideIcon;
};

export const SERVICES: Service[] = [
  {
    id: "community",
    text: {
      en: {
        title: "Community",
        blurb: "Meet people and join activities",
        detail:
          "Find groups, classes and get-togethers happening close to where you live.",
      },
      zh: {
        title: "社区",
        blurb: "结识朋友，参加活动",
        detail: "寻找在您住处附近举办的团体、课程和聚会。",
      },
      ms: {
        title: "Komuniti",
        blurb: "Berjumpa orang dan sertai aktiviti",
        detail:
          "Cari kumpulan, kelas dan perhimpunan yang berlangsung berhampiran tempat tinggal anda.",
      },
      ta: {
        title: "சமூகம்",
        blurb: "மக்களைச் சந்தித்து நிகழ்வுகளில் சேருங்கள்",
        detail:
          "நீங்கள் வசிக்கும் இடத்திற்கு அருகில் நடக்கும் குழுக்கள், வகுப்புகள் மற்றும் கூட்டங்களைக் கண்டறியுங்கள்.",
      },
    },
    icon: Users,
  },
  {
    id: "connection",
    text: {
      en: {
        title: "Connection",
        blurb: "Find someone to talk to",
        detail:
          "Reach a friendly voice — a volunteer, a neighbour, or someone who understands.",
      },
      zh: {
        title: "倾诉",
        blurb: "找人聊一聊",
        detail: "联系一个友善的声音——义工、邻居，或理解您的人。",
      },
      ms: {
        title: "Hubungan",
        blurb: "Cari seseorang untuk berbual",
        detail:
          "Hubungi suara yang mesra — sukarelawan, jiran, atau seseorang yang memahami anda.",
      },
      ta: {
        title: "தொடர்பு",
        blurb: "பேச ஒருவரைக் கண்டறியுங்கள்",
        detail:
          "நட்பான குரலை அடையுங்கள் — ஒரு தொண்டர், அயலவர், அல்லது உங்களைப் புரிந்துகொள்ளும் ஒருவர்.",
      },
    },
    icon: HandHeart,
  },
  {
    id: "support",
    text: {
      en: {
        title: "Support",
        blurb: "Get help with daily needs",
        detail:
          "Practical help at home: meals, transport, errands, and someone to guide you.",
      },
      zh: {
        title: "援助",
        blurb: "获得日常生活上的帮助",
        detail: "在家中的实际帮助：膳食、交通、办事，以及有人为您指引。",
      },
      ms: {
        title: "Sokongan",
        blurb: "Dapatkan bantuan untuk keperluan harian",
        detail:
          "Bantuan praktikal di rumah: makanan, pengangkutan, urusan harian, dan seseorang untuk membimbing anda.",
      },
      ta: {
        title: "ஆதரவு",
        blurb: "அன்றாட தேவைகளுக்கு உதவி பெறுங்கள்",
        detail:
          "வீட்டில் நடைமுறை உதவி: உணவு, போக்குவரத்து, சிறு வேலைகள், மற்றும் உங்களுக்கு வழிகாட்ட ஒருவர்.",
      },
    },
    icon: House,
  },
];

export function getService(id: string | undefined): Service | undefined {
  return SERVICES.find((service) => service.id === id);
}

export function getServiceText(
  service: Service,
  language: LanguageCode | null,
): ServiceText {
  return service.text[language ?? "en"];
}
