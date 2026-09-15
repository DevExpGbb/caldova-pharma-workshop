# Lab 07 — Prepare native automatic code review

## Start here

- **Role:** repository Admin or a custom role with **edit repository rules**;
  other participants observe their authorized owner.
- **Duration:** 15 minutes in the full journey.
- **Exact starting state:** your approved spec and first two skills exist;
  the implementation PR and `.github/skills/code-review/SKILL.md` do not.
  The facilitator has checked paid Copilot review entitlement, author
  eligibility, applicable policies, AI-credit budget and Actions resources.
- **Output:** a native review ruleset prepared **before** the feature PR.

## Why

Automatic review is a GitHub repository capability, not a promise in a skill.
You will observe the baseline cloud review before adding your own review
procedure, so you can tell the two experiences apart.

## Actions

1. **Verify authority and destination.** Open **your personal training
   repository** on GitHub. A participant with Write or Maintain permission
   alone should not assume they can edit rulesets. Ask the authorized owner
   if needed. Confirm the intended scoped change with that human.

   Public guidance: [configure code review](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review)
   and the [capability/role matrix](../capabilities.md).

2. **Have the authorized human create the native setting.** In the repository:

   1. Open **Settings → Rulesets**.
   2. Choose **New ruleset → New branch ruleset**.
   3. Give it a clear training name; set **Enforcement Status: Active**.
   4. Under **Target branches**, choose **Include all branches**.
   5. Select **Automatically request Copilot code review**.
   6. Select **Review new pushes**.
   7. Select **Review draft pull requests**.
   8. Review the complete proposed rule, then choose **Create**.

   Preserve unrelated settings. Do not add a replacement workflow, loosen
   protection, or enable preview approving reviews for this exercise.

3. **Understand the scope.** “Include all branches” means PRs with branch
   targets in that scope. It does **not** mean every Git push without a PR
   receives a review. “Review new pushes” requests fresh reviews for new
   pushes to covered PRs; draft review is separately enabled.

   Paid Copilot/AI credits, Actions resources, organizational policies, and
   PR-author eligibility can still affect whether a request runs. The
   Business/Enterprise option for members without a license requires its own
   policy and paid-usage setup; do not assume it is enabled.

4. **Record preparation, not execution.** Save the ruleset name/URL, target
   scope, active state, and selected review options in your private notes.
   This proves configuration only. The native review receipt arrives with
   Lab 08's actual PR.

   Optional read-only discussion prompt:

   ```text
   Explain what we should observe on the upcoming PR to distinguish a native
   automatic Copilot review from an App-only review. Use only the public
   GitHub code-review documentation and the ruleset settings I describe.
   Do not inspect instructor reference answers, change settings, author a
   review skill, configure MCP, create a PR, or claim a review has run.
   ```

## Checkpoint

- The authorized human has reviewed the active ruleset in your copy, or you
  explicitly record **configuration not completed**.
- All-branch target scope and both new-push/draft options are understood.
- No review skill exists yet. No review has been claimed just from settings.

Cloud review is a **Comment** review by default. Optional approvals are preview
and outside this course. A human remains responsible for the merge decision.

## Recovery

- **No permissions:** observe the facilitator's authorized setup or use the
  manual request fallback in Lab 08. Do not bypass the role requirement.
- **No paid entitlement, credits, policy eligibility, or Actions capacity:**
  have the owner resolve it outside the lab; label cloud review pending.
- **Cannot find a control:** compare the actual build/account with the current
  official docs. Do not fabricate a setting or substitute an App review.
- **A review plugin is already mandated:** keep policy intact and record the
  baseline as contaminated rather than disabling it without permission.

## Next

[Lab 08 — Implement the approved spec and open a PR](08-implement-and-pr.md).
[Course index](../README.md).
