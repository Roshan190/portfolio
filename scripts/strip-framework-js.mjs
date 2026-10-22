import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function htmlFiles(dir, found = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) htmlFiles(path, found);
    else if (name.endsWith(".html")) found.push(path);
  }
  return found;
}

const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;

for (const file of htmlFiles("out")) {
  // The pier entry is a client page. Every other route is plain HTML.
  if (file === join("out", "index.html")) continue;
  const html = readFileSync(file, "utf8");
  const next = html
    .replace(/<link\b[^>]*rel="preload"[^>]*as="script"[^>]*>/g, "")
    .replace(scriptPattern, (full, attrs, body) => {
      const source = `${attrs}\n${body}`;
      if (source.includes("/_next/static/chunks/")) return "";
      if (source.includes("__next_f") || source.includes("TURBOPACK")) return "";
      return full;
    });
  if (next !== html) writeFileSync(file, next);
}

console.log("Stripped the Next.js client runtime from static HTML");
