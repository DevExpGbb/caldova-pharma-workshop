# Lab 09 — Author a review skill and compare a fresh review

## Start here

- **Role:** participant as review-skill author; review remains advisory.
- **Duration:** 30 minutes in the full journey.
- **Exact starting state:** your feature PR is open, with a linked approved
  spec and real test results. The baseline native cloud review from Lab 08 is
  saved **before** any repository review skill exists, or explicitly marked
  unavailable. Keep the exact authored PR branch/checkout.
- **Output:** `.github/skills/code-review/SKILL.md` on the **PR head branch**,
  local skill trials, and a fresh native cloud-review receipt.

## Why

Review should connect a finding to agreed behavior and evidence. Your skill
can make that procedure reusable, but it cannot make a model infallible or
give it authority to approve or merge.

## Actions

1. **Review manually once.** Read the spec, changed app lines, tests, and
   baseline cloud comments. Ask for an ordinary App review:

   ```text
   Review the current app diff for <YOUR_PR_URL> against
   docs/specs/document-view.md and <YOUR_ISSUE_URL>. Use only that diff,
   linked spec/issue, relevant app files/tests, and actual check results.
   Do not inspect instructor reference answers, author or invoke a
   code-review skill, fix files, publish comments, approve, or merge.
   Report concrete findings with file/line, violated behavior, and evidence.
   If there are no supported findings, say so; separate missing evidence
   from a proven defect. Disclose any overlapping skill that loads.
   ```

   The App's `/review` is also a local-session review surface; it is **not**
   the native GitHub.com review receipt. Save useful steps and corrections
   from your manual comparison.

2. **Create the minimal review container.** In this PR checkout, create
   `.github/skills/code-review/SKILL.md`:

   ```yaml
   ---
   name: code-review
   description: Review a workshop pull request against its agreed spec and available tests; not for implementation, approval, or merging.
   ---
   ```

   Then author from your own procedure:

   ```text
   Write only .github/skills/code-review/SKILL.md from my review notes below.
   Use only that file, <YOUR_PR_URL>, its app diff, linked approved spec/issue,
   relevant app tests, and the review notes I supply. Do not inspect
   instructor reference answers, other skills, or solution packages.
   Extract a small reusable advisory procedure rather than findings for
   this specific patch. Use a compact inline findings shape with file/line,
   criterion, evidence, and impact. Require actual candidate/spec inputs,
   allow a justified no-findings result, and state unavailable evidence.
   Keep it usable both in the App and native cloud code review: do not
   assume local WorkIQ login, MCP configuration, or private chat history.
   Do not add resources, implement fixes, publish review comments, approve,
   merge, or give the skill authority it does not have.

   My repeated steps and corrections:
   <PASTE_YOUR_NOTES>
   ```

   Review the whole body. Avoid a checklist so broad it invents defects
   unrelated to a small local document view.

3. **Test locally: explicit, discovery, near miss.** Reload:

   ```text
   /skills reload
   ```

   ```text
   /skills
   ```

   Explicit trial:

   ```text
   Use my code-review skill explicitly on <YOUR_PR_URL>. Read only that
   skill, the current app diff, its approved spec/issue, relevant app tests,
   and actual results. Do not inspect instructor reference answers.
   Return advisory findings or justified no findings. Do not fix files,
   publish, approve, or merge; identify unavailable evidence.
   ```

   If available, select `/code-review` from the App's picker. For separate
   discovery and near-miss trials, use fresh context at the
   [same authored checkpoint](../README.md#keep-one-thread-of-work), verifying
   path and branch each time.

   ```text
   Does <YOUR_PR_URL> meet its linked specification? Review the proposed
   app change against that spec, relevant app tests and actual check results.
   Use only those inputs and relevant repository skills. Do not inspect
   instructor reference answers, implement fixes, publish, approve, or merge.
   ```

   ```text
   Explain what a pull request review is in two sentences. Do not inspect
   repository files or instructor reference answers, review a candidate,
   implement code, or publish anything.
   ```

   Record observed skill-load traces separately from findings quality.
   Natural-language discovery is not proven by forced invocation.

4. **Put the skill on the PR HEAD, then request a fresh cloud review.**
   Current GitHub docs explicitly use the **head branch**, not the base
   branch ([public reference](../capabilities.md#current-cloud-review-branch-behavior)).
   You do not need to merge the skill first.

   Review the change and commit/push **only this intended skill addition**:

   **Cross-platform:**

   ```sh
   git --no-pager diff -- .github/skills/code-review/SKILL.md
   git status --short
   git add .github/skills/code-review/SKILL.md
   git --no-pager diff --cached --stat
   ```

   Read the complete file too: an untracked new file may not appear in plain
   `git diff`. Confirm the staging list contains no unrelated files before:

   ```sh
   git commit -m "Add learner-authored review skill"
   git push
   git rev-parse HEAD
   ```

   These commands assume Lab 08 established the branch's upstream in your
   personal repository. Save the new candidate SHA. On GitHub.com, use
   **Reviewers → Copilot → Request** for a fresh review. If “Review new pushes”
   already queued it, observe that new run rather than creating duplicate
   requests.

5. **Compare receipts honestly.** Record:

   | Evidence | Baseline | With your skill on HEAD |
   | --- | --- | --- |
   | Candidate SHA | Actual Lab 08 SHA | Actual new PR head SHA |
   | Native review URL and date | Actual receipt or unavailable | Actual fresh receipt or unavailable |
   | Requested automatically/manual | Observed trigger | Observed trigger |
   | Skill-load trace | Skill absent / overlaps disclosed | Observed path/name or **not observed** |
   | Findings and test evidence | What it actually said | What it actually said |

   The SHA changes because the skill is added. Keep feature code unchanged
   for this comparison if possible; disclose any additional fixes. Same
   model/input settings matter for local comparisons; cloud settings may not
   be selectable. Do not attribute every output difference to the skill.

   A fresh review on the correct SHA proves a review ran, **not necessarily
   visible skill loading**. If the cloud surface exposes no load trace, mark
   that part unverified. Do not use the agent's self-report as a substitute.

## Checkpoint

- All three learner skills now exist in `.github/skills`.
- The review skill is committed on the PR head and a new review was requested,
  or the native step is honestly marked unavailable.
- Local invocation/discovery/near-miss trials have trace and output notes.
- Review is advisory; preview approvals are not enabled and no merge occurred.

## Recovery

- **Old review displayed:** compare dates and reviewed SHA; request/await a
  genuinely new review after the skill push.
- **No cloud trace:** mark **not observed**. Preserve the native review receipt
  without claiming verified dispatch.
- **Skill assumes WorkIQ access:** remove that dependency. Local login/config
  is not inherited by CCR; remote OAuth MCP is unsupported there. Do not
  configure a cloud workaround.
- **A real defect is found:** agree the bounded correction, fix/test it, and
  record the new SHA/review. Do not silently compare different feature code.

## Next

Take the scheduled **10-minute break** after saving the skill and review receipts.
[Lab 10 — Package only your three authored skills](10-package-skills.md).
[Course index](../README.md).
