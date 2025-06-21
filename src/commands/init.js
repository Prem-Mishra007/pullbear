import fs from 'fs';
import path from 'path';

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
  // ✅ Minimum allowed commit message length
  "commit": {
    "minLength": 15,

    // 🎯 Commit format rule
    // Example: "JIRA-123: feat: added login flow"
    // Pattern: <TICKET-ID>: <type>: <message>
    "pattern": "^(JIRA|BUG)-\\\\d+: (feat|fix|chore): .+"
  }
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
