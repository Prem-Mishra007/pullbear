import fs from "fs";
import path from "path";

export function init() {
  const hookDir = path.resolve(".git/hooks");
  const hookFile = path.join(hookDir, "commit-msg");
  const binPath = path.join("node_modules", ".bin", "pullbear");
  const script = `#!/bin/sh\n"${process.cwd()}/node_modules/.bin/pullbear" commit-msg "$1"`;

  fs.writeFileSync(hookFile, script, { mode: 0o755 });
  createConfigIfMissing();
  console.log("✅ PullBear hook installed successfully.");
}
const configFile = "pullbear.config.jsonc";

const defaultJsonc = `{
  // 🎯 Commit message configuration block
  "commit": {
    // ✅ Enforce a minimum commit message length (optional)
    // Example: Minimum 10 characters
    "minLength": 10,

    // ✅ Optional RegEx pattern that commit message must match
    // Example: message should end with a period (.)
    "pattern": ".*\\.$",

    // ✅ Enable auto-injection of ticket ID from branch name
    "autoInjectTicketFromBranch": true,

    // ✅ Choose where to insert the ticket ID: 'prefix' or 'postfix'
    // Example: [PROJ-123] Commit message  OR  Commit message [PROJ-123]
    "injectPosition": "prefix",

    // ✅ Define the pattern to extract ticket from the branch name
    // Example: will match PROJ-123, JIRA-456, etc.
    "ticketPattern": "[A-Z]+-\\d+",

    // ✅ Define how the ticket should be formatted when injected
    // You can use %TICKET% placeholder
    // Examples:
    // - "%TICKET%" → PROJ-123
    // - "[%TICKET%]" → [PROJ-123]
    // - "(#%TICKET%)" → (#PROJ-123)
    "ticketFormat": "[%TICKET%]"
  }

  // 🚀 Future: will be adding more sections here for merge rules, PR checks, etc.
}

`;

function createConfigIfMissing() {
  const filePath = path.join(process.cwd(), configFile);

  if (fs.existsSync(filePath)) {
    console.log(`📄 ${configFile} already exists, skipping.`);
    return;
  }

  fs.writeFileSync(filePath, defaultJsonc, { flag: "wx" });
  console.log(`✅ Created ${configFile} with inline docs.`);
}
