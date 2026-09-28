import { Music, Palette, Trophy, type LucideIcon } from "lucide-react";

import type { LanguageCode } from "@/lib/language";

export type ActivityId = "sports" | "music" | "hobbies";

export type ActivityText = {
  title: string;
  blurb: string;
  nearbyTitle: string;
  detail: string;
};

export type Activity = {
  id: ActivityId;
  text: Record<LanguageCode, ActivityText>;
  icon: LucideIcon;
};

export const ACTIVITIES: Activity[] = [
  {
    id: "sports",
    text: {
      en: {
        title: "Sports",
        blurb: "Exercise and outdoor activities",
        nearbyTitle: "Sports activities near you",
        detail:
          "Find exercise groups, brisk walks and outdoor activities happening close to you.",
      },
      zh: {
        title: "体育",
        blurb: "运动和户外活动",
        nearbyTitle: "您附近的体育活动",
        detail: "寻找在您附近举行的运动小组、健步行和户外活动。",
      },
      ms: {
        title: "Sukan",
        blurb: "Senaman dan aktiviti luar",
        nearbyTitle: "Aktiviti sukan berdekatan anda",
        detail:
          "Cari kumpulan senaman, jalan kaki pantas dan aktiviti luar yang berlangsung berhampiran anda.",
      },
      ta: {
        title: "விளையாட்டு",
        blurb: "உடற்பயிற்சி மற்றும் வெளிப்புற நிகழ்வுகள்",
        nearbyTitle: "அருகில் உள்ள விளையாட்டு நிகழ்வுகள்",
        detail:
          "உங்களுக்கு அருகில் நடக்கும் உடற்பயிற்சிக் குழுக்கள், வேகமான நடைப்பயணங்கள் மற்றும் வெளிப்புற நிகழ்வுகளைக் கண்டறியுங்கள்.",
      },
    },
    icon: Trophy,
  },
  {
    id: "music",
    text: {
      en: {
        title: "Music",
        blurb: "Singing, instruments, and performances",
        nearbyTitle: "Music activities near you",
        detail:
          "Find choirs, music groups and performances you can join or enjoy nearby.",
      },
      zh: {
        title: "音乐",
        blurb: "唱歌、乐器和演出",
        nearbyTitle: "您附近的音乐活动",
        detail: "寻找您附近可以参加或欣赏的合唱团、音乐小组和演出。",
      },
      ms: {
        title: "Muzik",
        blurb: "Menyanyi, alat muzik, dan persembahan",
        nearbyTitle: "Aktiviti muzik berdekatan anda",
        detail:
          "Cari koir, kumpulan muzik dan persembahan yang boleh anda sertai atau nikmati berhampiran anda.",
      },
      ta: {
        title: "இசை",
        blurb: "பாடல், இசைக்கருவிகள், நிகழ்ச்சிகள்",
        nearbyTitle: "அருகில் உள்ள இசை நிகழ்வுகள்",
        detail:
          "உங்களுக்கு அருகில் சேரவோ ரசிக்கவோ கூடிய பாடகக் குழுக்கள், இசைக் குழுக்கள் மற்றும் நிகழ்ச்சிகளைக் கண்டறியுங்கள்.",
      },
    },
    icon: Music,
  },
  {
    id: "hobbies",
    text: {
      en: {
        title: "Hobbies",
        blurb: "Crafts, games, and creative pursuits",
        nearbyTitle: "Hobby activities near you",
        detail:
          "Find craft circles, game sessions and creative classes happening close to you.",
      },
      zh: {
        title: "兴趣",
        blurb: "手工、游戏和创意活动",
        nearbyTitle: "您附近的兴趣活动",
        detail: "寻找在您附近举行的手工小组、游戏活动和创意课程。",
      },
      ms: {
        title: "Hobi",
        blurb: "Kraftangan, permainan, dan aktiviti kreatif",
        nearbyTitle: "Aktiviti hobi berdekatan anda",
        detail:
          "Cari kelab kraftangan, sesi permainan dan kelas kreatif yang berlangsung berhampiran anda.",
      },
      ta: {
        title: "பொழுதுபோக்கு",
        blurb: "கைவினை, விளையாட்டுகள், படைப்புத்திறன் நடைமுறைகள்",
        nearbyTitle: "அருகில் உள்ள பொழுதுபோக்கு நிகழ்வுகள்",
        detail:
          "உங்களுக்கு அருகில் நடக்கும் கைவினைக் குழுக்கள், விளையாட்டு அமர்வுகள் மற்றும் படைப்பு வகுப்புகளைக் கண்டறியுங்கள்.",
      },
    },
    icon: Palette,
  },
];

export function getActivity(id: string | undefined): Activity | undefined {
  return ACTIVITIES.find((activity) => activity.id === id);
}

export function getActivityText(
  activity: Activity,
  language: LanguageCode | null,
): ActivityText {
  return activity.text[language ?? "en"];
}
