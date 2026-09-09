import fs from "fs";
import path from "path";

/** Where photos live. Anything dropped in here shows up on /photos. */
export const PHOTOS_DIR = path.join(process.cwd(), "public", "images", "photos");
export const PHOTOS_PUBLIC_PATH = "/images/photos";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

/** Massively's grid modifiers: a wide, tall or 2x2 cell. */
export type PhotoSpan = "" | "wide" | "tall" | "big";

export type Photo = {
  src: string;
  alt: string;
  span: PhotoSpan;
};

/**
 * Repeating span pattern so an unordered folder of photos still produces the
 * varied mosaic the template is built around. Length is coprime with common
 * row widths to avoid visible banding.
 */
const SPAN_PATTERN: PhotoSpan[] = [
  "",
  "",
  "tall",
  "wide",
  "",
  "tall",
  "big",
  "",
  "wide",
  "big",
  "tall",
  "",
  "",
];

/**
 * A filename may pin its own cell size by ending in -wide, -tall or -big
 * (e.g. "band-on-stage-big.jpg"), which wins over the pattern.
 */
function spanFromFilename(filename: string): PhotoSpan | null {
  const stem = path.parse(filename).name.toLowerCase();
  for (const span of ["wide", "tall", "big"] as const) {
    if (stem.endsWith(`-${span}`) || stem.endsWith(`_${span}`)) return span;
  }
  return null;
}

/** "03-car-standing-tall.jpg" -> "Ritchie Royale - car standing" */
function altFromFilename(filename: string, bandName: string): string {
  const words = path
    .parse(filename)
    .name.replace(/[-_](wide|tall|big)$/i, "")
    // Leading digits only order the gallery; they are not part of the caption.
    .replace(/^\d+[-_\s]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!words) return `${bandName} photo`;
  return `${bandName} - ${words}`;
}

/**
 * Reads the photo folder at render time, so adding a photo is just dropping a
 * file in public/images/photos. Server-only.
 */
export function getPhotos(bandName = "Ritchie Royale"): Photo[] {
  let filenames: string[];

  try {
    filenames = fs.readdirSync(PHOTOS_DIR);
  } catch {
    // Folder not created yet.
    return [];
  }

  const images = filenames
    .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .filter((name) => !name.startsWith("."))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return images.map((name, index) => ({
    src: `${PHOTOS_PUBLIC_PATH}/${name}`,
    alt: altFromFilename(name, bandName),
    span: spanFromFilename(name) ?? SPAN_PATTERN[index % SPAN_PATTERN.length],
  }));
}
