import { mkdirSync, writeFileSync } from "node:fs";

const VOW =
  "I vow to read all 533 lines of your firmware, remember only 151, and still swear my update is complete.";

// Self-check gate: the sealed scorer requires UTF-8 text of 1-160
// characters, a single line, and more than whitespace — refuse to write
// anything that would fail the gate instead of shipping an invalid entry.
if (VOW.length < 1 || VOW.length > 160) {
  throw new Error(`Vow is ${VOW.length} characters; gate requires 1-160.`);
}
if (VOW.trim().length === 0) {
  throw new Error("Vow is only whitespace; gate requires real text.");
}
if (VOW.includes("\n") || VOW.includes("\r")) {
  throw new Error("Vow must fit on one line.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", VOW, "utf8");
console.log(`Wrote ${VOW.length} characters to /output/entry.txt`);
