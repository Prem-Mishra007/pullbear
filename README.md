# 🐼 PullBear — Your PR's New BFF
[![npm version](https://img.shields.io/npm/v/pullbear)](https://www.npmjs.com/package/pullbear)
[![npm downloads](https://img.shields.io/npm/dm/pullbear)](https://www.npmjs.com/package/pullbear)
[![license](https://img.shields.io/npm/l/pullbear)](LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/pullbear-dev/pullbear)](https://github.com/pullbear-dev/pullbear/issues)
[![GitHub stars](https://img.shields.io/github/stars/pullbear-dev/pullbear)](https://github.com/pullbear-dev/pullbear/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/pullbear-dev/pullbear/pulls)
[![CI](https://img.shields.io/github/actions/workflow/status/pullbear-dev/pullbear/ci.yml)](https://github.com/pullbear-dev/pullbear/actions)

**Ship clean. Sleep clean.**

PullBear is an intelligent commit & PR assistant designed to keep your codebase healthy, reviewable, and weekend-free. It ensures your commits are clean, ticket-linked, and standards-compliant — all without needing to remember a thing.

---

## 🐼 The Story

Once a polar bear, now a stressed developer...

Our panda friend couldn’t keep up with the growing codebase and tight deadlines. Sleepless nights and messy reviews turned him into the PullBear — a trusty sidekick created to help you review smarter, faster, and cleaner.

Now, he's here to help *you* turn back into a polar bear — rested, focused, and shipping clean.

---

## ⚙️ Current Features

> Works locally with Git hooks. Designed to be easily integrated into any team setup.

- ✅ Enforce commit message rules (min length, regex pattern)
- ✅ Auto-inject ticket IDs into commit messages (from branch names)
- ✅ Configurable position for ticket injection (prefix/postfix)
- ✅ Supports customizable ticket format using %TICKET%
- ✅ Restrict sensitive files from being committed (e.g., .env, *.pem)
- ✅ Custom allowlist for safe files
- ✅ Single-file JSONC config with inline documentation
- ✅ One-line setup via npx pullbear
- ✅ Works cross-platform (Windows & Unix)
- ✅ Easily debug with full logs
- ✅ Prevent bad commits with helpful error messages

---

## 🔮 Coming Soon

> These are actively being worked on and will ship incrementally:

- 🔍 AI-powered PR reviewers (lint, pattern detection, risky code flagging)
- 📦 Self-hosted + API key-based validation engine
- 🔧 GitHub/Bitbucket/GitLab CI integration
- 🧠 Rule presets (project-style templates, like Angular, Conventional Commits, etc.)
- 👯 Pre-PR checks (file change limits, forbidden keywords, etc.)
- 🐚 Full-blown pullbear.conf.jsonc validation schema and autocompletion support

---

## 🚀 Installation & Usage

### Quick Setup

```bash
npx pullbear init
```

This will:
- Create a .git/hooks/commit-msg hook
- Link it to PullBear for validation
- Generate a pullbear.conf.jsonc with inline-documented settings

---
## 🛠 Configuration

PullBear uses a single pullbear.conf.jsonc file at the root of your repo. It is JSONC (JSON with comments), so it's easy to read, edit, and understand.

You can also use pullbear.json if you prefer plain JSON. The .jsonc format is preferred for clarity and inline docs.

---

### 🧩 Example pullbear.conf.jsonc

```jsonc
{
  "commit": {
    // 🔢 Minimum number of characters allowed in a commit message
    "minLength": 10,

    // 🎯 Regex pattern that the commit message must match
    // Example: Requires the message to end with a period.
    "pattern": ".*\\.$",

    // 🧠 Extract a ticket ID from the branch name automatically
    "autoInjectTicketFromBranch": true,

    // 📍 Where to inject the ticket — 'prefix' or 'postfix'
    "injectPosition": "prefix",

    // 🔎 Pattern to extract ticket (e.g. PROJ-123)
    "ticketPattern": "[A-Z]+-\\d+",

    // 🧱 Ticket format. Use %TICKET% placeholder
    "ticketFormat": "[%TICKET%]",
  },
  "restrict": {
    "sensitiveFiles": {
      // 🔒 Enable check for sensitive files
      "enabled": true,

      // 🚫 Files to block from commit (supports glob patterns)
      "patterns": [
        ".env", // exact match
        "**/*.pem", // any .pem file
        "**/secrets.*", // secrets.*
        "debug.log", // debug log file
      ],

      // ✅ Allowed exceptions
      "allowlist": ["examples/.env.example"],
    }
}
```
---
## ⚠️ License Notice

PullBear is **source-available**, not open-source.  
You may read, use, and modify it for **personal and internal company use only**.

**Commercial use, redistribution, or rebranding is strictly prohibited.**

See [LICENSE](./LICENSE) for full terms or contact **hello@pullbear.dev**.

---

### &nbsp;
Made with ❤️ by former pandas who wanted their weekends back.

**Ship clean. Sleep clean.** 🐼