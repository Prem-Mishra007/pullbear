#!/usr/bin/env node
import { program } from "commander";
import { init } from "../src/commands/init.js";
import { checkCommit } from "../src/commands/commit-msg.js";

import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgPath = path.join(__dirname, '../package.json');

const showMetaFlags = async () => {
  const args = process.argv.slice(2);

  if (args.includes('--version') || args.includes('-v')) {
    const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
    console.log(`🐼 PullBear CLI v${pkg.version}`);
    process.exit(0);
  }

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🐼  PullBear — your PR’s new BFF

Usage:
  pullbear [command]

Commands:
  init            Set up PullBear in your repo
  commit-msg      Run commit message validation

Options:
  -v, --version   Show version number
  -h, --help      Show this help message

Docs → https://pullbear.dev/docs
`);
    process.exit(0);
  }
};

await showMetaFlags();

program.command("init").description("Setup git hooks").action(init);
program.command("commit-msg <msgfile>").description("Check commit message").action(checkCommit);

program.parse(process.argv);
