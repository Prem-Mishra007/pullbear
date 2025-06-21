import fs from "fs";
import path from "path";
import stripJsonComments from "strip-json-comments";
const configPath = path.resolve("pullbear.config.jsonc");
export function checkCommit(msgFilePath) {
  const message = fs.readFileSync(msgFilePath, "utf8").trim();
  //   const configPath = path.resolve("pullbear.json");
  let config;

  try {
    const jsonWithComments = fs.readFileSync(configPath, "utf8");
    config = JSON.parse(stripJsonComments(jsonWithComments));
  } catch (e) {
    console.error("❌ Missing pullbear.config.jsonc in project root.");
    process.exit(1);
  }

  const errors = [];
  if (config.commit?.minLength && message.length < config.commit.minLength) {
    errors.push(`Message must be at least ${config.commit.minLength} chars.`);
  }
  if (config.commit?.pattern) {
    const pattern = new RegExp(config.commit.pattern);
    if (!pattern.test(message)) {
      errors.push(`Message must match pattern: ${config.commit.pattern}`);
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
