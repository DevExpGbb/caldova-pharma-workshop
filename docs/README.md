# Workshop guide

Make a useful change before trying to automate the process around it. This
course alternates **do the task → notice repeated steps → author a skill →
compare evidence**. Three small skills are enough.

New terms are explained in the [glossary](glossary.md). The
[capability reference](capabilities.md) separates product support from things
your facilitator must observe on the actual account.

## Full-journey schedule

Allow **5–6 hours**, or split the workshop into two sessions. This suggested
schedule is **320 minutes of labs + two 10-minute breaks = 340 minutes
(5 hours 40 minutes)**. All **13 labs, numbered 00–12**, are included.
The three skill-authoring stages, native cloud review, APM packaging, and
release are required parts of this journey—not optional extensions.

Lab 12's distribution and configuration-review lesson is also required.
**Only actual enterprise-admin execution is optional and role-gated**;
participants can complete that lesson by reviewing the proposal without
applying enterprise settings.

Durations assume accounts, downloads, and administrator preparation have been
preflighted; service queues can take longer. Missing live prerequisites leave
the corresponding full-journey checkpoint pending for a later session.
Neither a demonstration nor a plausible response replaces actual execution
evidence.

| Lab | Minutes | What you leave with |
| --- | ---: | --- |
| [00 · Setup](labs/00-setup.md) | 20 | Personal copy; exact App checkout; working unsolved board |
| [01 · WorkIQ](labs/01-workiq.md) | 20 | Authorized fictional-source read; offline fallback leaves live evidence pending |
| [02 · Manual intake](labs/02-manual-intake.md) | 25 | One confirmed issue with your own acceptance criteria |
| [03 · Intake skill](labs/03-intake-skill.md) | 30 | Your first skill; draft-only comparison and non-action tests |
| **Break after Lab 03** | **10** | Save your checkpoint |
| [04 · Plan and spec](labs/04-plan-and-spec.md) | 30 | Bounded App plan, then a one-off no-skill Copilot prompt producing a reviewed spec baseline |
| [05 · Plan-to-spec skill](labs/05-plan-to-spec-skill.md) | 25 | Your second skill; comparison with the no-skill model baseline; explicit spec approval |
| [06 · Customization pattern](labs/06-customization-pattern.md) | 15 | A simple map of tools, skills, personas, rules, and packages |
| [07 · Automatic review](labs/07-automatic-review.md) | 15 | Native review settings ready before the feature PR |
| [08 · Implement and PR](labs/08-implement-and-pr.md) | 40 | Tested feature, linked PR, baseline cloud review |
| [09 · Review skill](labs/09-review-skill.md) | 30 | Your third skill on PR HEAD; fresh review and evidence comparison |
| **Break after Lab 09** | **10** | Save the review receipts and checkpoint |
| [10 · Package skills](labs/10-package-skills.md) | 25 | Verified skills-only Agent Plugins archive |
| [11 · Version and release](labs/11-version-and-release.md) | 20 | Human-chosen tag, validated draft/assets, deliberate human publication |
| [12 · Managed distribution](labs/12-managed-distribution.md) | 25 | Real plugin/catalog, clean consumer installation, and configuration review; live admin execution optional |

**Two-session option:** Session 1 covers Labs 00–06 plus the first break:
**175 minutes (2 hours 55 minutes)**. Session 2 covers Labs 07–12 plus the
second break: **165 minutes (2 hours 45 minutes)**. Preserve the authored
checkpoint between sessions; do not restart from a clean template.
Live enterprise-admin execution and propagation may add time beyond this
participant schedule. Installation and external review waits are not speed tests.

## Optional abbreviated track — about 3 hours

This is a **taster, not the full journey in less time**. Choose it explicitly
when the event has only three hours. It develops one skill hands-on and uses
facilitator previews for later stages; it does not certify completion of the
other skill, package, or release checkpoints.

| Selected activity | Minutes |
| --- | ---: |
| Labs 00–01: preflighted setup and fictional-source exercise | 25 |
| Lab 02: manual intake and one confirmed issue | 20 |
| Lab 03: author/test the intake skill | 25 |
| Lab 04 plus Lab 05's human-approval step: plan, one-off no-skill spec prompt, human review and explicit approval, without authoring plan-to-spec yet | 25 |
| Lab 06: customization discussion | 5 |
| Break | 10 |
| Labs 07–08: preflighted review setup, bounded implementation and PR | 40 |
| Labs 09–12: guided previews of review-skill authoring, packaging, release and distribution/configuration review | 30 |
| **Abbreviated total** | **180** |

Use a separate facilitator demonstration checkout for previews. Do not install
solution skills or copy them into a participant's unfinished branch. Keep
remaining work—including plan-to-spec and code-review authoring/comparisons,
APM packaging, actual release, and distribution practice—on the follow-up list.
If the time limit arrives first, save the checkpoint; do not skip human
confirmation, spec approval, evidence checks, or policy to fit the clock.

## Keep one thread of work

Use **one personal repository and one authored branch/checkpoint** throughout
the participant journey.
The Copilot App may use a separate [worktree](glossary.md) for a session. Your
browser server, terminal, edits, Git commands, and `.github/skills` files must
all refer to the **same actual checkout**.

At each transition, run these **cross-platform** commands and compare them
with the path/branch shown for the App session:

```sh
node -p "process.cwd()"
git rev-parse --show-toplevel
git branch --show-current
git status --short
git rev-parse HEAD
```

Write down the path, branch, and commit ID. An uncommitted diff is also part of
your checkpoint. Never silently open a fresh session on the default branch to
“continue”: it may not contain any of your work.

For a **fresh comparison**, save/commit the authored checkpoint after reviewing
the diff. Use fresh chat context that is explicitly attached to that **same
authored branch/checkpoint**, then verify path, branch, skill files, and commit
again. Prefer keeping the same checkout. If your App build creates a different
worktree, stop and have the facilitator reconcile it deliberately before any
edits or npm commands. Do not run concurrent writers on a shared checkout.

## A small evidence notebook

Keep these notes locally; do not commit tenant citations, account names, billing
details, or private transcripts:

| Record | What to save |
| --- | --- |
| Starting point | Actual checkout, branch, commit, selected model/build |
| Source | Fictional ID and public fixture permalink; native citation privately if live |
| Work item | Actual `<YOUR_ISSUE_URL>` and the public-safe text you confirmed |
| Plan and spec | Your files, linked issue, and explicit approval of the exact revision |
| Comparison | Exact prompt, input/checkpoint, observed skill load trace, output, limitations |
| PR/review | PR URL, candidate SHA, review URL/date, test output for that SHA |
| Package/release | Package version, archive inventory/hash, source SHA, draft/published state |

Replace every `<YOUR_ISSUE_URL>`, `<YOUR_PR_URL>`, and path placeholder before
sending a prompt. They are not real identifiers. The workshop maintainer's
issue is **not** your feature issue.

## Baselines and boundaries

- Do not install solution plugins, workflow instructions, or skills before
  authoring. Inspect **Customize → Installed**, **Customize → Skills**, and
  `/skills` for overlaps. Disable personal/managed overlaps **only if allowed**.
  Otherwise label affected work **contaminated draft practice**; do not claim
  an uncontaminated baseline or bypass policy.
- Author only `.github/skills/intake/SKILL.md`,
  `.github/skills/plan-to-spec/SKILL.md`, and
  `.github/skills/code-review/SKILL.md` during their respective labs.
- A skill listing proves discoverability, not that a task loaded the skill.
  Ask to use it explicitly, try a natural-language request without its name,
  and try a near miss. Inspect the actual load/tool trace. A plausible output
  or the agent saying “I used it” is not enough.
- Instructor `.md.example` files are inert, **not inaccessible**. All authoring
  and implementation prompts limit context and exclude instructor answers.
- WorkIQ is query/read only here. Humans handle authentication/EULA and
  approve consequential GitHub actions. No automatic issue creation from
  alternate fixtures, approvals, merges, or tenant changes.
- The app and app CI do not require APM or WorkIQ. Packaging/release is a later
  lesson, not a website deployment or a formal governance system.

## If a live service is unavailable

**WorkIQ:** use the exact public fixture as offline copy/paste input and mark
the live retrieval checkpoint not completed.

**Cloud review:** an eligible human can request Copilot from the PR's Reviewers
control. That proves a manual cloud review, not automatic ruleset triggering.
If entitlement is unavailable, retain an App-only advisory review and mark the
cloud checkpoint not run.

**Enterprise administration:** review the inert example or watch the authorized
facilitator. The configuration-review lesson remains included; actual admin
execution is optional. Proposed JSON is not a managed installation.

**Packaging or release:** keep the failed/pending receipt and arrange a
follow-up. A local draft, preview, or handoff does not complete the full
journey's actual package/release checkpoint.

Start at [Lab 00](labs/00-setup.md), or use the
[facilitator guide](facilitator.md) to prepare an event.
