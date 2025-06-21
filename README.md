# 🐼 PullBear — Your PR's New BFF

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
- ✅ Supports customizable ticket format using `%TICKET%`
- ✅ Single-file JSONC config with inline documentation
- ✅ One-line setup via `npx pullbear`
- ✅ Works cross-platform (tested on Windows & Unix)
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
- 🐚 Full-blown `pullbear.conf.jsonc` validation schema and autocompletion support

---

## 🚀 Installation & Usage

### Quick Setup

```bash
npx pullbear init
```
>This will:
- Create a .git/hooks/commit-msg hook
- Link it to PullBear for validation
- Generate a pullbear.conf.jsonc with inline-documented settings

---
## 🛠 Configuration

PullBear uses a single `pullbear.conf.jsonc` file at the root of your repo. It is JSONC (JSON with comments), so it's easy to read, edit, and understand.

You can also use `pullbear.json` if you prefer plain JSON. The `.jsonc` format is preferred for clarity and inline docs.

---

### 🧩 Example `pullbear.conf.jsonc`

```jsonc
{
  "commit": {
    // 🔢 Minimum number of characters allowed in a commit message
    "minLength": 10,

    // 🎯 Regex pattern that the commit message must match
    // Example below requires the message to end with a period.
    "pattern": ".*\\.$",

    // 🧠 Automatically extract a ticket ID from the branch name
    // Set to true to enable.
    "autoInjectTicketFromBranch": true,

    // 📍 Where to inject the ticket: 'prefix' or 'postfix'
    // prefix → [TICKET] Commit message
    // postfix → Commit message [TICKET]
    "injectPosition": "prefix",

    // 🔎 Regex used to extract the ticket ID from the branch name
    // For example, feature/PROJ-123-login will extract "PROJ-123"
    "ticketPattern": "[A-Z]+-\\d+",

    // 🧱 Format of the injected ticket
    // Use `%TICKET%` placeholder. Examples:
    // "[%TICKET%]" → [PROJ-123]
    // "(#%TICKET%)" → (#PROJ-123)
    "ticketFormat": "[%TICKET%]"
  }
}
```
---

### &nbsp;
Made with ❤️ by former pandas who wanted their weekends back.

**Ship clean. Sleep clean.** 🐼
