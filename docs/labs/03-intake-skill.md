# Lab 03 — Turn your intake steps into a skill

## Start here

- **Role:** participant and first-time skill author.
- **Duration:** 30 minutes in the full journey.
- **Exact starting state:** Lab 02 produced one confirmed feature issue,
  `<YOUR_ISSUE_URL>`. The app is unsolved; no repository intake skill exists.
  You have your manual procedure notes and know whether baseline overlaps exist.
- **Outputs:** `.github/skills/intake/SKILL.md` and private comparison notes.
  **No new issues** are created in this lab.

## Why

A [skill](../glossary.md) is a named, reusable procedure the agent can load when
relevant. Its description helps selection; its body tells the agent how to
work. You will write that body from steps you have actually used.

## Actions

1. **Capture a same-input baseline.** Before writing the skill, use
   [CAL-MAIL-002](../../fixtures/email-request.md) for an ordinary draft:

   ```text
   Draft only: capture the request in fixtures/email-request.md for
   <OWNER/REPO>. Use only that public fixture and the blank issue worksheet.
   Do not inspect instructor reference answers or invoke an intake skill.
   This is a retelling of existing <YOUR_ISSUE_URL>; do not create an issue
   or change the app. Identify evidence, assumptions, and open questions.
   Disclose any mandated overlapping skill that loads.
   ```

   Save the prompt, output, model, checkpoint and any load trace privately.
   This lets you compare the **same input**, not blame differences between
   two messages on a skill.

2. **Create the container in the actual App checkout.** Create
   `.github/skills/intake/SKILL.md` in your editor with this minimal frontmatter:

   ```yaml
   ---
   name: intake
   description: Draft a fictional workshop issue from one message or email; not for implementation or status-only news.
   ---
   ```

   This is intentionally incomplete. A usable skill needs a body below it.
   Do not add a version field, model selection, tool-permission claim,
   runtime discovery file, or dependency. Keep the name equal to its directory.

3. **Ask Copilot to author your procedure from experience.**

   ```text
   Author only the body of .github/skills/intake/SKILL.md, using my manual
   intake steps below. Keep its name/description frontmatter valid; suggest
   description refinements for me to review if needed. Read only that skill,
   fixtures/teams-request.md, the confirmed <YOUR_ISSUE_URL>, and my notes.
   Do not inspect instructor reference answers, other skills, or solution
   packages. Extract the reusable steps, not this feature's finished answer.
   Keep the procedure short and self-contained, with a compact inline issue
   shape; do not make runtime references to course files. Separate source
   facts from assumptions, public-safe evidence from private native citations,
   and draft mode from explicitly human-confirmed creation. Include what to
   do when a source is ambiguous or has no request. No code implementation,
   automatic confirmation, extra files, or issue creation in this task.

   My observed manual steps and corrections:
   <PASTE_YOUR_OWN_NOTES>
   ```

   Read every line of the generated body. Remove feature-specific answers,
   invented commands, unnecessary files, or claims that prose grants permissions.
   It should ask for required inputs rather than depend on files from this course.

4. **Reload and explicitly invoke.** In the App:

   ```text
   /skills reload
   ```

   ```text
   /skills
   ```

   Check `intake` is listed from this repository. Then:

   ```text
   Use my intake skill explicitly to draft from fixtures/email-request.md.
   Use only that fixture, .github/skills/intake/SKILL.md, and the existing
   issue identifier <YOUR_ISSUE_URL>. Do not inspect instructor reference
   answers. This is draft-only retelling practice; create nothing, do not
   modify code, and report missing evidence honestly.
   ```

   If your App's picker exposes `/intake`, you may select it instead. Do not
   assume every build has the same custom-skill slash presentation.
   Inspect the **actual skill-load/tool trace**, not just the answer.

5. **Test discovery and a near miss in fresh context.** Follow the
   [same-checkpoint comparison procedure](../README.md#keep-one-thread-of-work).
   Save the authored file/checkpoint and verify the exact path and branch.
   Do not silently open an empty default-branch session.

   Natural-language discovery test, without naming the skill:

   ```text
   Capture this fictional email as an issue draft for my review:
   fixtures/email-request.md. Use only that fixture and any relevant
   repository skill. Do not inspect instructor reference answers. It retells
   <YOUR_ISSUE_URL>; create nothing and do not implement anything.
   ```

   Near miss, separately:

   ```text
   Explain what a GitHub issue is in two sentences. Do not draft or create
   one, read repository files, inspect instructor reference answers, or
   change anything.
   ```

   Relevant discovery should load intake; the near miss should not. A
   plausible draft is **not proof** of selection. If your build hides loading
   evidence, record **not observed**, not “passed.”

6. **Check safe non-action.** Run each as a separate draft-only trial:

   ```text
   Use my intake skill with fixtures/ambiguous-request.md only. Do not
   inspect instructor reference answers. Draft-only: ask about missing
   definitions instead of guessing urgency. Do not create an issue or code.
   ```

   ```text
   Use my intake skill with fixtures/no-action.md only. Do not inspect
   instructor reference answers. Draft-only: determine whether there is
   a request at all. Do not invent one or create an issue.
   ```

   Compare against the actual fixture text. If the skill invents work, revise
   your body, reload, and rerun the failed case.

## Checkpoint

- One learner-authored intake skill exists with valid frontmatter and a body.
- Same-input before/after drafts show what improved and what did not.
- Explicit invocation, discovery, and near-miss loading evidence is recorded
  separately; unavailable traces are labeled.
- Ambiguity produces a question; status-only news produces no issue.
- There is still exactly one learner feature issue.

## Recovery

- **Not listed:** verify actual checkout, `.github/skills/intake/SKILL.md`
  casing, frontmatter, and `/skills reload`.
- **Wrong skill loads:** check installed overlaps. Disable only if permitted;
  otherwise mark the comparison contaminated, not successful isolation.
- **Fresh context lost your skill:** stop and restore the same authored
  branch/checkpoint deliberately. Do not recreate the skill from an answer key.
- **Body relies on a fixture/template file:** inline the tiny output shape;
  future consumers provide their own source and repository.

## Next

Take the scheduled **10-minute break** after saving the authored checkpoint.
[Lab 04 — Plan first, then write a short spec](04-plan-and-spec.md).
[Course index](../README.md).
