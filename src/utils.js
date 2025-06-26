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