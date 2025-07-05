import { runAIReview } from "../ai/index.js";
import { branchExists, getChangedFiles, getGitDiff } from "../utils.js";

export async function review(options) {
  const { target, intent } = options;
  if (!target) {
    console.error("Target branch not given use --target to pass branchname");
    process.exit();
  }
  if (!intent || intent.trim() === "") {
    console.error(
      '❌ Missing required --intent. Please describe the purpose of this PR.\nExample:\n  --intent "Fix logging bug in order service"'
    );
    process.exit(1);
  }

  if (!branchExists(target)) {
    console.error(
      `❌ Branch "${target}" does not exist (locally or remotely).\nTry:\n  git fetch origin\n  or check the branch name spelling.`
    );
    process.exit(1);
  }
  const diff = await getGitDiff(target);
  const filesChanged = await getChangedFiles();
  // console.log(diff);
  await runAIReview({ diff, filesChanged, intent });
}
