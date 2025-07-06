import fs from "fs";
import path from "path";
import stripJsonComments from "strip-json-comments";
import { execSync } from "child_process";
const configPath = path.resolve("pullbear.config.jsonc");
export function loadConfig(){
  let config;
  try {
    const jsonWithComments = fs.readFileSync(configPath, "utf8");
    config = JSON.parse(stripJsonComments(jsonWithComments));
  } catch (e) {
    console.error("❌ Missing pullbear.config.jsonc in project root.",e?.message || e);
    process.exit(1);
  }
  return config;
}
export function getBranchName() {
  try {
    let branchname = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    // console.log("Branch name:", branchname);
    return branchname;
  } catch(e) {
    console.error("❌ Could not get branch name.",e?.message||e);
    return '';
  }
}
export function extractTicket(branch, pattern) {
  const match = branch.match(new RegExp(pattern));
  return match ? match[0] : null;
}
export function hasTicket(msg, ticket) {
  return msg.includes(ticket);
}
export function formatTicket(ticket, format) {
  return format.replace('%TICKET%', ticket);
}
export function getGitDiff(targetBranch) {
  try {
    const diff = execSync(`git diff ${targetBranch}`, {
      encoding: "utf-8",
      maxBuffer: 1024 * 1024 * 10, // 10 MB
    });

    if (!diff.trim()) {
      console.warn(`[PullBear] No changes found against ${targetBranch}.`);
    }

    return diff.trim();
  } catch (err) {
    console.error(`[PullBear] Failed to get git diff from ${targetBranch}`);
    console.error(err);
    return "";
  }
}

export function getStagedFiles(){
  let stagedFiles = [];
   try{
    stagedFiles = execSync("git diff --cached --name-only")
     .toString()
     .trim()
     .split("\n")
     .filter(Boolean);
  }catch(err){
     console.warn("⚠️ Could not get staged files:", err?.message || err);
  }
  return stagedFiles;
}
export function getChangedFiles(){
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
  return changedFiles;
}
export function branchExists(branch) {
   try {
    // Local branches
    const local = execSync(`git branch --list "${branch}"`, {
      stdio: ["ignore", "pipe", "ignore"],
    }).toString();

    // Remote branches
    const remotes = execSync(`git branch -r`, {
      stdio: ["ignore", "pipe", "ignore"],
    }).toString();

    return local.includes(branch) || remotes.includes(branch);
  } catch {
    return false;
  }
}