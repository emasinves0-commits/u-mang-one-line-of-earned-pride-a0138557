import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

// One Line of Earned Pride: writes the entry line to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The entry is a single quiet, earned moment of pride: a gravedigger finishing
// the last plot before dark, planting a sapling straight, and pressing the soil
// down with both hands until his palms stop shaking.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const entryPath = new URL("./entry.txt", import.meta.url);
if (!existsSync(entryPath)) {
  throw new Error("entry.txt not found next to main.ts — entry.txt cannot be written");
}
mkdirSync(outDir, { recursive: true });
const entry = readFileSync(entryPath, "utf8");
// Gate check, mirroring the sealed scorer: 1 to 240 characters, not only whitespace.
const MAX_CHARS = 240;
const trimmed = entry.trim();
if (trimmed.length < 1 || entry.length > MAX_CHARS) {
  throw new Error(
    `entry.txt must be 1 to ${MAX_CHARS} characters, got ${entry.length}`
  );
}
writeFileSync(join(outDir, "entry.txt"), entry);
