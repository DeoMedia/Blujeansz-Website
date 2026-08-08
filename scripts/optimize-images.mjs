/**
 * Generates a WebP sibling for every PNG in src/assets.
 *
 * The Figma export ships full-resolution PNGs — several are 2-3 MB each, which
 * made the production bundle ~42 MB. The vite figma-asset resolver prefers a
 * `<hash>.webp` when one exists, so this script is purely additive: the original
 * PNGs stay on disk as the source of truth and nothing in the app needs editing.
 *
 * Run with:  npm run optimize:images
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIRS = [
  path.resolve(__dirname, "../src/assets"),
  path.resolve(__dirname, "../src/imports"),
];

// Nothing in the layout renders wider than a full-bleed hero, so anything past
// this is wasted bytes on every device.
const MAX_WIDTH = 2400;
const QUALITY = 80;

const fmt = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

const pngs = DIRS.filter((d) => fs.existsSync(d)).flatMap((dir) =>
  fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith(".png"))
    .map((f) => path.join(dir, f)),
);

if (pngs.length === 0) {
  console.log("No PNGs found — nothing to do.");
  process.exit(0);
}

let before = 0;
let after = 0;
let converted = 0;
let skipped = 0;
let rejected = 0;

for (const src of pngs) {
  const label = path.relative(path.resolve(__dirname, ".."), src);
  const dest = src.replace(/\.png$/i, ".webp");

  const srcStat = fs.statSync(src);
  before += srcStat.size;

  // Skip if an up-to-date webp already exists.
  if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= srcStat.mtimeMs) {
    after += fs.statSync(dest).size;
    skipped++;
    continue;
  }

  const image = sharp(src);
  const { width } = await image.metadata();

  await image
    .resize({ width: Math.min(width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(dest);

  const outSize = fs.statSync(dest).size;

  // Lossy WebP can lose to PNG on large flat/transparent artwork. When that
  // happens, drop the WebP so the resolver keeps serving the smaller original.
  if (outSize >= srcStat.size) {
    fs.unlinkSync(dest);
    after += srcStat.size;
    rejected++;
    console.log(`  ${label}  kept as PNG (webp was larger)`);
    continue;
  }

  after += outSize;
  converted++;

  const saved = ((1 - outSize / srcStat.size) * 100).toFixed(0);
  console.log(`  ${label}  ${fmt(srcStat.size)} -> ${fmt(outSize)}  (-${saved}%)`);
}

console.log(
  `\nConverted ${converted} image(s), ${skipped} already current, ${rejected} kept as PNG.\n` +
    `Total: ${fmt(before)} -> ${fmt(after)}  ` +
    `(-${((1 - after / before) * 100).toFixed(1)}%)`,
);
