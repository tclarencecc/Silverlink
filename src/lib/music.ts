import musicData from "@/data/music.json";

export type MusicEvent = {
  id: string;
  url: string;
  title: string;
  date: string;
  venue: string;
  blurb: string;
};

export const MUSIC_EVENTS: MusicEvent[] = musicData;
