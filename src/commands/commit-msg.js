import fs from "fs";
import { getBranchName, extractTicket, hasTicket, formatTicket, loadConfig } from "../utils.js";
import { checkSensitiveFiles } from "../checks/checkSensitiveFiles.js";
import { runHooks } from "../utils/runHooks.js";
import { execSync } from "child_process";

export async function checkCommit(msgFilePath) {
  let stagedFiles = []
  try{
    stagedFiles = execSync("git diff --cached --name-only")
     .toString()
     .trim()
     .split("\n")
     .filter(Boolean);
  }catch(err){
     console.warn("⚠️ Could not get staged files:", err?.message || err);
  }
  let changedFiles = [];
  try{
    changedFiles = execSync("git diff --name-only")
     .toString()
     .trim()
     .split("\n")
     .filter(Boolean);
  }catch(err){
     console.warn("⚠️ Could not get changed files:", err?.message || err);
  }

  checkSensitiveFiles(stagedFiles);
  let message = fs.readFileSync(msgFilePath, "utf8").trim();
  const config = loadConfig();
  const commitConf = config.commit || {};
  const branch = getBranchName();
  const ticket = extractTicket(branch, commitConf.ticketPattern || "[A-Z]+-\\d+");
  await runHooks("commit-msg", { message, commitConf, branch, ticket, stagedFiles, changedFiles });
  // console.log("\n🧠 Validating commit message...");
  // console.log(commitConf.autoInjectTicketFromBranch ? "🧠 Auto-injecting ticket from branch name..." : "🧠 No auto-injection configured.");
  // console.log(ticket ? `🧠 Found ticket: ${ticket}` : "🧠 No ticket found in branch name.");
  // 🧠 Auto-inject ticket if configured
  if (commitConf.autoInjectTicketFromBranch && ticket) {
    const formattedTicket = formatTicket(ticket, commitConf.ticketFormat || "%TICKET%");
    // console.log("the returned value is", hasTicket(message, ticket));
    if (!hasTicket(message, ticket)) {
      // console.log("🧠 Adding ticket to commit message...");
      if (commitConf.injectPosition === "postfix") {
        message = `${message} ${formattedTicket}`;
      } else {
        message = `${formattedTicket} ${message}`;
      }
      // console.log(message);
      fs.writeFileSync(msgFilePath, message.trim());
    }
  }

  const errors = [];

  // ❌ Validate length
  if (commitConf.minLength && message.length < commitConf.minLength) {
    errors.push(`Message must be at least ${commitConf.minLength} characters.`);
  }

  // ❌ Validate regex pattern
  if (commitConf.pattern) {
    const pattern = new RegExp(commitConf.pattern);
    if (!pattern.test(message)) {
      errors.push(`Message must match pattern: ${commitConf.pattern}`);
    }
  }

  if (errors.length) {
    console.log("\n❌ Commit rejected:");
    errors.forEach((err) => console.log("•", err));
    process.exit(1);
  } else {
    console.log("✅ Commit message passed validation.");
  }
}

