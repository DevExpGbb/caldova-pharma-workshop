# Lab 08 — Implement, test, and open the PR

## Start here

- **Role:** participant as developer and reviewer of the agent's changes.
- **Duration:** 40 minutes in the full journey.
- **Exact starting state:** same authored App checkout/branch; one confirmed
  feature issue; `docs/specs/document-view.md` explicitly human-approved;
  first two skills authored; original board still has no filter. Lab 07's
  native ruleset is ready, or its limitation is recorded.
- **Important:** `.github/skills/code-review/SKILL.md` must **not exist yet**.

## Why

A [pull request](../glossary.md) makes a proposed change inspectable. Tests and
the browser give evidence of behavior; a cloud review provides another,
advisory perspective. None is a substitute for your approved spec.

## Actions

1. **Recheck the exact state.** Use the App session's terminal, not your main
   clone or a new empty worktree.

   **Cross-platform:**

   ```sh
   node -p "process.cwd()"
   git rev-parse --show-toplevel
   git branch --show-current
   git status --short
   npm test
   ```

   Read the spec approval yourself. If it is missing or the scope has changed,
   stop and return to Lab 05. In the App, leave Plan mode for **Interactive**
   only after that decision.

2. **Have Copilot implement the bounded feature.**

   ```text
   Implement only the human-approved docs/specs/document-view.md for
   <YOUR_ISSUE_URL> in this actual checkout and authored branch.
   Use only that spec, docs/plans/document-view.md, the issue, and relevant
   app source, package configuration, and app tests. Do not inspect instructor
   reference answers, fixtures other than the confirmed source if needed,
   solution packages, or unrelated repository files.
   First restate the approved scope and check the approval. Add meaningful
   tests derived from our spec and run them against the pre-feature app to
   show the requested behavior is not already implemented. Then make the
   smallest code change and rerun them. Include the spec's negative case
   without changing the six original records or their statuses. Use separate
   synthetic test inputs for edge cases. Keep the app local and nonclinical.
   Do not weaken existing checks, add a backend or dependencies, author
   code-review skills, edit workflows, commit, push, create a PR, or merge.
   Stop and ask if the spec is ambiguous or the change needs wider scope.
   ```

   Read the changed files. Ask the agent to explain unfamiliar lines. Require
   the exact failing-before/passing-after output rather than a claim that
   tests “should pass.” If the proposed tests pass before the feature, ask
   what they actually prove.

3. **Verify yourself.** In a terminal in that same checkout:

   **Cross-platform:**

   ```sh
   npm test
   npm run build
   npm run check
   ```

   Start/reuse `npm run dev` there and open **http://127.0.0.1:5173**.
   Follow each step in **your spec**. Check the count against the IDs you
   counted manually. Use the keyboard, return to the full list, and verify
   the original data remains unchanged. Inspect test output for the empty
   result, unfamiliar label, and your negative case; do not edit the six
   records just to make a screenshot.

4. **Review and commit only intended files.**

   **Cross-platform, read-only inspection:**

   ```sh
   git --no-pager diff --stat
   git --no-pager diff
   git status --short
   ```

   Ensure no private source/citation, `.workshop` output, credential, instructor
   answer, or review skill entered the diff. Ask Copilot for a proposed file
   list if needed. Then, only after your review:

   ```text
   I have reviewed the intended app/tests, issue-linked plan/spec, and first
   two authored skills for <YOUR_ISSUE_URL>. Use only those files and the
   current Git diff; do not inspect instructor reference answers. Show the
   exact staging list, then commit that reviewed set on this authored branch
   and push only that branch to my <OWNER/REPO>. Do not stage unrelated files,
   add a code-review skill, push a tag, merge, or change repository settings.
   ```

   Confirm the staging/push actions in the App. Check the resulting commit
   with `git rev-parse HEAD` and save it as the baseline candidate SHA.

5. **Open the feature PR.**

   ```text
   Create one pull request in my <OWNER/REPO> from the authored branch we
   just pushed to its intended default branch. Use only the reviewed diff,
   <YOUR_ISSUE_URL>, our approved spec/plan and actual test outputs.
   Do not inspect instructor reference answers. Link the real issue and
   committed spec, summarize behavior, list checks actually run and any
   missing evidence. Do not claim cloud review has run, add a review skill,
   approve, merge, tag, or release. Return the actual PR URL.
   ```

   Review the creation card, or create the PR manually from **Pull requests →
   New pull request** in your copy. Record the actual `<YOUR_PR_URL>`.

6. **Observe baseline native cloud review before authoring the review skill.**
   On the PR, look for the automatic Copilot review request and its completed
   review. Save the review URL/date and reviewed candidate SHA. Open the
   actual comments and Actions check results; do not substitute a previous run.

   If automatic review did not occur, inspect the ruleset scope and the
   entitlement/author/budget prerequisites with the owner. An eligible human
   can use **Reviewers → Copilot → Request** as a fallback; label it
   **manually requested**, not automatic.

   Read the baseline review without accepting every suggestion. Note useful
   findings, misses, and missing evidence. Leave the PR open for Lab 09.
   If review is queued, wait or finish this receipt later **before creating
   the review skill**. An App-only review is not this checkpoint.

## Checkpoint

- Real app changes and spec-derived tests exist; relevant checks pass.
- The browser and source were checked in the same App checkout.
- One PR links the same real issue and approved spec.
- A baseline cloud review receipt identifies the candidate **without your
  review skill**, or cloud baseline is honestly marked not run.
- No merge, tag, release, or website deployment has happened.

## Recovery

- **Unexpected data edits or scope expansion:** reject that portion and return
  to the agreed spec; do not retrofit the spec to justify accidental changes.
- **Failing checks:** read the actual failure. Fix the feature, not the gate.
  Ask the facilitator for unrelated starter/toolchain failures.
- **Wrong branch/path:** stop before committing or opening a PR and reconcile
  the checkpoint. Don't copy files blindly between worktrees.
- **No cloud access:** keep local evidence, label cloud baseline unrun, and use
  the facilitator's demonstration. Never claim the App inherited CCR.

## Next

[Lab 09 — Add your review skill on PR HEAD](09-review-skill.md).
[Course index](../README.md).
