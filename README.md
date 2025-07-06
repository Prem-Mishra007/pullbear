# 🐼 PullBear — Your PR's New BFF
[![npm version](https://img.shields.io/npm/v/pullbear)](https://www.npmjs.com/package/pullbear)
[![npm downloads](https://img.shields.io/npm/dm/pullbear)](https://www.npmjs.com/package/pullbear)
[![license](https://img.shields.io/npm/l/pullbear)](LICENSE)

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

- ✅ Commit message rules (length, patterns)
- 🔖 Ticket ID injection from branch names
- 🚫 Blocking sensitive files (`.env`, `*.pem`, etc.)
- 🔌 Plug-in custom JavaScript hooks
- 💬 AI-powered PR review (Groq-powered)
- 🧠 All in a single JSONC config file

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
        "debug.log" // debug log file
      ],

      // ✅ Allowed exceptions
      "allowlist": ["examples/.env.example"]
    }
  },
  "customHooks": {
    //need to be enabled then only hook will be called
    "enabled": true,
    // takes an array of Paths to custom commit-msg hook script (must be .mjs)
    "commit-msg": [
      "./custom-hooks/commitCheck.mjs"
    ]
  }
}
```
---
## 🧩 Writing Custom Hooks

You can create your own custom validation logic using JavaScript ES modules.

### ✅ Example

```js
// ./custom-hooks/commitCheck.mjs

export default async function (ctx) {
  const { commitMessage, branchName, config, ticket } = ctx;
  
  const now = new Date();
  const isLateNightFriday =
    now.getDay() === 5 && now.getHours() >= 21;

  if (isLateNightFriday) {
    throw new Error("🚨 Who commits on Friday night? Go live your life. ❌");
  }
}
```

### 📌 Notes

- Use `.mjs` extension for the hook file.
- Export a default `async` function.
- If an error is thrown, the commit will be rejected with the provided message.

---

## 🧠 Hook Context Parameters

Each hook receives a single `ctx` (context) object:

| Key            | Description                                |
|----------------|--------------------------------------------|
| `commitMessage`| Raw commit message being validated         |
| `branchName`   | Current branch name                        |
| `config`       | The full PullBear configuration object     |
| `ticket`       | Extracted ticket from branch, if applicable|
| `stagedFiles`  | Staged files in the branch                 |
| `changedFiles` | Changed files in the branch                |

---

## 🧠 AI-Powered Code Review (Beta)

PullBear supports **AI-based code review** powered by [Groq](https://console.groq.com), helping you automatically detect:

- 🐞 Bugs and risky logic  
- 🚫 Code smells and anti-patterns  
- 🔒 Missing validations  
- ⚡ Performance issues  

The AI focuses only on the changes in your PR, giving structured feedback like a senior engineer.

---

### 🚀 Getting Started with AI Review

#### 1. 🔑 Get a Groq API Key

- Go to [https://console.groq.com](https://console.groq.com)
- Log in and generate an API key from your dashboard
- Accept the usage policies when prompted

> Groq currently offers generous free-tier usage. See [Groq Pricing](https://console.groq.com/docs/pricing) for details.

---

#### 2. ⚙️ Configure Environment

Create a `.env` file in the root of your project:

```env
PULLBEAR_GROQ_KEY=your_api_key_here
PULLBEAR_AI_MODEL=mistral-saba-24b
```

- ✅ `PULLBEAR_GROQ_KEY` is **required**  
- 🧠 `PULLBEAR_AI_MODEL` is **optional** (defaults to `mistral-saba-24b`)

---

#### 3. 🧪 Run an AI Review

Use the CLI:

```bash
npx pullbear review --target origin/main --intent "Refactor logging service to improve clarity"
```

- `--target` → The branch to compare changes against  
- `--intent` → What this PR is trying to do (helps the AI focus the review)

---

#### 4. 📥 Sample Output

```txt
🤖 AI Review Output:
1. [src/logger.js] Inefficient string interpolation
   - Description: Uses string concatenation inside a log statement.
   - Suggestion: Use template literals instead for readability.
```

---

#### ⚠️ Notes

- AI review runs **locally**, but makes a request to **Groq’s API**  
- Your code is **never stored or logged**  
- Only the **diff of changed files** is sent  
- Internet connection is required

## ⚠️ License Notice

PullBear is **source-available**, not open-source.  
You may read, use, and modify it for **personal and internal company use only**.

**Commercial use, redistribution, or rebranding is strictly prohibited.**

See [LICENSE](./LICENSE) for full terms or contact **hello@pullbear.dev**.

---

### &nbsp;
Made with ❤️ by former pandas who wanted their weekends back.

**Ship clean. Sleep clean.** 🐼