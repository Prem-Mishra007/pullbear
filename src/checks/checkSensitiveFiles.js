import fs from "fs";
import micromatch from "micromatch";
import { loadConfig } from "../utils.js";

export function checkSensitiveFiles(stagedFiles) {
  const config = loadConfig();
  const restrictConf = config.restrict?.sensitiveFiles;

  if (!restrictConf?.enabled) return;

  const patterns = restrictConf.patterns || [];
  const allowlist = restrictConf.allowlist || [];

  const blockedFiles = stagedFiles.filter(file => {
    return (
      micromatch.isMatch(file, patterns) &&
      !micromatch.isMatch(file, allowlist)
    );
  });

  if (blockedFiles.length > 0) {
    console.log("❌ Commit rejected due to sensitive file(s):");
    blockedFiles.forEach(f => console.log("•", f));
    process.exit(1);
  }
}
