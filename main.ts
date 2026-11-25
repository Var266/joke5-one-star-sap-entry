// Entry program for the make.fun bounty
// "One Star, Written in Sap"
// (u-steady-puffin-78-1922-one-star-written-in-sap-2ea1f4f4).
//
// The review below was picked by pairwise comparison of 12 candidates
// against the judge brief: a genuine one-star review in a houseplant's
// voice, with a clear grievance and a reason for the single star. The
// winning angle is performative care — the owner misted the plant once,
// posted about it, claimed the "plant dad" title, and then let the soil
// stay dry for days. The last sentence is the turn: the post, not the
// plant, got all the attention (400 likes). Every detail is plant-side
// (misting, soil, dryness) and specific (once, since Tuesday, 400 likes),
// with no stock wilting or drama-queen phrasing.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const REVIEW =
  "One star: he misted me once, posted it, and called himself a plant dad. The soil has been dry since Tuesday. The post got 400 likes.";
const MAX_CHARS = 279;

function main(): void {
  // The gate accepts 1-279 chars of non-whitespace UTF-8 text in a single
  // line, so reject anything outside that here instead of shipping it.
  if (
    REVIEW.length === 0 ||
    REVIEW.length > MAX_CHARS ||
    REVIEW.trim().length === 0 ||
    REVIEW.includes("\n")
  ) {
    throw new Error(
      `review fails the 1-${MAX_CHARS} char single-line gate (${REVIEW.length} chars)`,
    );
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", REVIEW, "utf8");
  // Read the file back and confirm it holds exactly the review: a silent
  // partial write would otherwise ship a truncated entry to the judge.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== REVIEW) {
    throw new Error("entry.txt does not match the review after writing");
  }
  console.log(`wrote ${REVIEW.length} chars to /output/entry.txt`);
}

main();
