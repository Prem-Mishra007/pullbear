#!/usr/bin/env node
import { program } from "commander";
import { init } from "../src/commands/init.js";
import { checkCommit } from "../src/commands/commit-msg.js";


program.command("init").description("Setup git hooks").action(init);
program.command("commit-msg <msgfile>").description("Check commit message").action(checkCommit);

program.parse(process.argv);