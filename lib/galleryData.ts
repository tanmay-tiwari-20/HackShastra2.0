// Curated static gallery seed images (17 high-res images from HackShastra events)
export const STATIC_GALLERY: string[] = [
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402429/3_ewhcxs.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402431/7_c4axuu.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402429/11_x88zyt.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402429/1_gaiwhl.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402430/4_mbd5ak.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402429/13_qqolcu.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402431/14_esbxla.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402433/16_nhp0kd.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402433/17_kjiyiu.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402432/8_v0g0is.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402431/5_cibwsm.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402430/12_ubduyk.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402432/9_dige7e.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402431/6_bep8ex.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402432/15_bopebl.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402434/2_holzer.webp",
  "https://res.cloudinary.com/dunacoujw/image/upload/v1772402433/reach_xhdfbp.webp",
];

/**
 * Generate a deterministic daily hash from a date string (YYYY-MM-DD)
 */
export function getDailySeed(dateStr?: string): number {
  const d = dateStr || new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < d.length; i++) {
    const char = d.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Mulberry32 pseudo-random number generator
 */
function seededRandom(seed: number) {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Returns a daily randomized subset of images using seeded Fisher-Yates shuffle.
 * Guarantees consistency across re-renders on the same day while rotating daily.
 */
export function getDailyRandomImages(
  images: string[],
  count = 5,
  dateStr?: string,
): string[] {
  if (!images || images.length === 0) return [];
  if (images.length <= count) return [...images];

  const rng = seededRandom(getDailySeed(dateStr));
  const pool = [...images];

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, count);
}

/**
 * Helper to fetch gallery images from the MongoDB API and combine with static fallback
 */
export async function fetchGalleryImages(): Promise<string[]> {
  try {
    const res = await fetch("/api/gallery");
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const dynamicUrls = data
          .map((item: any) => (typeof item === "string" ? item : item?.url))
          .filter(Boolean);
        // Combine dynamic images first, then unique static gallery images
        const combined = Array.from(new Set([...dynamicUrls, ...STATIC_GALLERY]));
        return combined;
      }
    }
  } catch (err) {
    console.error("Failed to fetch gallery images:", err);
  }
  return [...STATIC_GALLERY];
}
