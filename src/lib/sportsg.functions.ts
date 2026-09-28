import { createServerFn } from "@tanstack/react-start";

const DATASET_ID = "d_9b87bab59d036a60fad2a91530e10773";

export type SportFacility = {
  id: number;
  venue: string;
  address: string;
  postalCode: string;
  detailsUrl: string | null;
  lat: number | null;
  lng: number | null;
};

type Feature = {
  properties?: Record<string, unknown>;
  geometry?: { type?: string; coordinates?: number[] };
};

const CACHE_MS = 6 * 60 * 60 * 1000;
let cache: { at: number; data: SportFacility[] } | null = null;

async function fetchWithRetry(url: string, label: string): Promise<Response> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url);
    if (res.status !== 429 && res.status < 500) return res;
    if (attempt < 2) await new Promise((r) => setTimeout(r, 800 * 2 ** attempt));
    else return res;
  }
  throw new Error(`${label} failed`);
}

export const getSportFacilities = createServerFn({ method: "GET" }).handler(
  async (): Promise<SportFacility[]> => {
    if (cache && Date.now() - cache.at < CACHE_MS) return cache.data;
    try {
      const data = await loadFacilities();
      cache = { at: Date.now(), data };
      return data;
    } catch (err) {
      if (cache) return cache.data; // serve stale list when rate-limited
      throw err;
    }
  },
);

async function loadFacilities(): Promise<SportFacility[]> {
    const poll = await fetchWithRetry(
      `https://api-open.data.gov.sg/v1/public/api/datasets/${DATASET_ID}/poll-download`,
      "poll",
    );
    if (!poll.ok) {
      throw new Error(
        poll.status === 429
          ? "data.gov.sg is busy right now. Please try again in a minute."
          : `data.gov.sg poll failed (${poll.status})`,
      );
    }
    const pollJson = (await poll.json()) as { data?: { url?: string } };
    const url = pollJson.data?.url;
    if (!url) throw new Error("data.gov.sg returned no download link");

    const res = await fetchWithRetry(url, "download");
    if (!res.ok) throw new Error(`Dataset download failed (${res.status})`);
    const geo = (await res.json()) as { features?: Feature[] };


    return (geo.features ?? [])
      .map((f): SportFacility => {
        const p = f.properties ?? {};
        const block = String(p["ADDRESSBLOCKHOUSENUMBER"] ?? "").trim();
        const street = String(p["ADDRESSSTREETNAME"] ?? "").trim();
        const details = String(p["DETAILS"] ?? "").trim();
        const coords = f.geometry?.coordinates;
        return {
          id: Number(p["OBJECTID"] ?? 0),
          venue: String(p["VENUE"] ?? "").trim(),
          address: [block, street].filter(Boolean).join(" "),
          postalCode: String(p["POSTAL_CODE"] ?? "").trim(),
          detailsUrl: details.startsWith("http") ? details : null,
          lng: coords?.[0] ?? null,
          lat: coords?.[1] ?? null,
        };
      })
      .filter((f) => f.venue)
      .sort((a, b) => a.venue.localeCompare(b.venue));
}
