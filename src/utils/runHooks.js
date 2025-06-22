import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { getBranchName, loadConfig } from "../utils.js";

export async function runHooks(type, contextOverrides = {}) {
  const config = loadConfig();

  if (!config.customHooks?.enabled || !config.customHooks[type]) return;

  const hooks = config.customHooks[type];
  const cwd = process.cwd();
  const branch = getBranchName();
  const context = {
    cwd,
    branch,
    config,
    ...contextOverrides,
    log: console.log,
    exit: (code = 1) => process.exit(code)
  };

  for (const hookPath of hooks) {
    const absolutePath = path.resolve(cwd, hookPath);
    if (!fs.existsSync(absolutePath)) {
      console.warn(`⚠️ Custom hook not found: ${hookPath}`);
      continue;
    }

    try {
      const hookModule = await import(pathToFileURL(absolutePath).href);
      if (typeof hookModule.default === "function") {
        await hookModule.default(context);
      } else {
        console.warn(`⚠️ No default export function in ${hookPath}`);
      }
    } catch (err) {
      console.error(`❌ Error in custom hook: ${hookPath}`);
      console.error(err.message);
      process.exit(1);
    }
  }
}
