import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["src", "scripts", "README.md", ".env.example"].filter((path) =>
  existsSync(path),
);

function filesIn(path, found = []) {
  const stat = statSync(path);
  if (stat.isFile()) {
    found.push(path);
    return found;
  }
  for (const name of readdirSync(path)) {
    if (name === "node_modules" || name === ".next" || name === "out") continue;
    filesIn(join(path, name), found);
  }
  return found;
}

const files = roots.flatMap((path) => filesIn(path));
const phone = /(?<!\d)\d{10}(?!\d)/;
const email = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const siteSource = readFileSync("src/content/site.ts", "utf8");
const emailField = siteSource.match(/email:\s*"([^"]*)"/);
const emailConfigured = Boolean(emailField && emailField[1].length > 0);
let failed = false;

for (const file of files) {
  if (!/\.(tsx?|jsx?|mdx?|css|mjs|md|json|example)$/.test(file)) continue;
  const text = readFileSync(file, "utf8");
  if (phone.test(text)) {
    console.error(`Phone-like number in ${file}`);
    failed = true;
  }
  if (!emailConfigured && email.test(text)) {
    console.error(`Email address in ${file} while site.email is empty`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log("Privacy check passed");
