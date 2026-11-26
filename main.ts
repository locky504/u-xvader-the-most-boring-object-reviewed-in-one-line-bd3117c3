// The Most Boring Object, Reviewed in One Line
// Entry: a one-line review of a doorstop — the dullest everyday object
// in the house. The joke is the object's own dullness: it has exactly one
// job, nobody notices it doing it, and it still gets blamed when it fails.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "The doorstop has exactly one job — hold the door open — and spends its entire career being kicked, ignored, and blamed anyway when the door slams shut.";

// The bounty gate: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space, on a single line. Fail loudly here
// instead of shipping an entry the gate would refuse.
function validate(text) {
  const chars = [...text].length;
  if (text.trim().length === 0) throw new Error("entry is blank");
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, must be 1-200`);
  }
}

validate(ENTRY);

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");

// Round-trip: what the grader reads must be exactly what we printed.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) throw new Error("written entry differs from ENTRY");
console.log(ENTRY);
console.log(`Wrote ${[...ENTRY].length} characters to ${outPath}`);
