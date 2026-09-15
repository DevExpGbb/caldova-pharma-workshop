# Lab 05 — Make specification writing repeatable

## Start here

- **Role:** participant and skill author; human spec approver.
- **Duration:** 25 minutes in the full journey.
- **Exact starting state:** the same branch contains your confirmed issue link,
  bounded `docs/plans/document-view.md`, and the reviewed no-skill-prompt spec
  at `docs/specs/document-view.md`, plus your intake skill. You also saved
  Lab 04's exact prompt and raw model output. The app is still unsolved;
  spec approval is pending. No plan-to-spec skill exists.
- **Output:** `.github/skills/plan-to-spec/SKILL.md`; a comparison draft kept
  separate from the no-skill model baseline; explicit human approval before coding.

## Why

Repeated structure can help without replacing judgment. Your second skill
should turn an **existing issue and plan** into a short spec, not invent a
project or silently begin implementation.

## Actions

1. **Extract the useful steps.** Note what you actually did in Lab 04:
   prompted Copilot to parse the saved plan and confirmed issue, checked actual
   files, separated behavior from implementation details, questioned evidence
   and the negative case, and corrected the output. Use those repeated prompt
   steps and follow-up corrections as the authoring input—not a claim that
   the earlier spec was handwritten.

2. **Create the minimal container.** In the same App checkout, create
   `.github/skills/plan-to-spec/SKILL.md`:

   ```yaml
   ---
   name: plan-to-spec
   description: Turn an existing confirmed issue and agreed plan into a short implementation spec; not for intake, open-ended planning, or coding.
   ---
   ```

   Ask Copilot to write the body, not a memorized feature answer:

   ```text
   Write only .github/skills/plan-to-spec/SKILL.md from my notes below.
   Read only this skill, <YOUR_ISSUE_URL>, docs/plans/document-view.md,
   docs/specs/document-view.md, and the relevant app paths already named
   by the plan. Do not inspect instructor reference answers, other skills,
   or installed solution packages. Extract a short reusable procedure,
   with a compact inline output shape: outcome, behavior, files, tests,
   negative case, and out-of-scope work. Require an actual confirmed issue
   and agreed plan; stop for missing inputs or conflicting scope.
   Keep human approval separate and pending until actually given.
   Do not hardcode this feature's completed spec or depend on course files.
   No code changes, issue creation, PR, extra resource files, or publication.

   My repeated steps and corrections:
   <PASTE_YOUR_NOTES>
   ```

   Read the result. A future user must be able to supply their own issue/plan.
   No body instruction can grant authority to approve on the user's behalf.

3. **Reload and test explicitly without copying the no-skill baseline.**

   ```text
   /skills reload
   ```

   ```text
   /skills
   ```

   Save the authored checkpoint, then follow the
   [fresh-context procedure](../README.md#keep-one-thread-of-work) on the
   **same authored branch/checkpoint**. Verify exact path and branch first.
   Keep the confirmed issue, saved plan, app revision, and selected model
   the same as the no-skill baseline where possible. Record any differences.

   ```text
   Use my plan-to-spec skill explicitly. Derive a short draft in chat from
   <YOUR_ISSUE_URL> and docs/plans/document-view.md. Read only those inputs,
   the relevant current app files/tests, and that skill. Do not inspect
   instructor reference answers or docs/specs/document-view.md; I am
   comparing against the saved no-skill model output, not asking you to copy it.
   Do not save over my spec, implement code, create issues, or claim approval.
   Keep missing decisions explicit.
   ```

   If offered, select `/plan-to-spec` from the App picker. Inspect the actual
   load trace. Compare the new output with Lab 04's **raw no-skill model
   output**, using your reviewed spec to explain corrections: did the skill
   preserve intent, cite actual files, choose observable evidence, or reduce
   repeated follow-up prompts? Record weaknesses too; do not assume an improvement.

4. **Test natural discovery, then a near miss.** Use separate fresh contexts
   with the same checkpoint and model where selectable.

   ```text
   Turn the confirmed <YOUR_ISSUE_URL> and agreed
   docs/plans/document-view.md into a short implementation specification
   in chat. Use only those inputs, relevant repository skills and app
   files/tests. Do not inspect instructor reference answers or the saved
   no-skill spec/output. Do not implement, save files, or approve anything.
   ```

   Near miss:

   ```text
   Explain the difference between a plan and a specification in two sentences.
   Do not read repository files, inspect instructor reference answers,
   derive a specification, or change anything.
   ```

   Record which skill actually loaded for each. No visible trace means
   **not observed**, even if the wording looks right.

5. **Check a missing-input case.**

   ```text
   Use my plan-to-spec skill, but I have not provided an agreed plan.
   Use only the skill and this request; do not inspect instructor reference
   answers, look up an unrelated plan, invent one, or implement anything.
   Tell me what input is missing before deriving a spec.
   ```

   It should ask for the plan, not fabricate a ready-to-code document.
   Revise, reload, and retest if it does.

6. **Choose and approve the exact feature spec yourself.** Keep the reviewed
   no-skill-prompt spec or deliberately edit it with useful ideas from the comparison.
   Review every change. Save the final `docs/specs/document-view.md`, inspect
   its diff, and record its revision. Only if you actually agree, send:

   ```text
   I have read and approve the current docs/specs/document-view.md for
   <YOUR_ISSUE_URL> at <SPEC_REVISION_OR_CHECKPOINT>. This is the bounded
   spec to use in Lab 08. Record my approval without changing its behavior
   or scope. Read only that spec and issue; do not inspect instructor
   reference answers, implement yet, approve a PR, or merge anything.
   ```

   Update the spec's approval note to reflect that real decision and link the
   reviewed plan/spec from the issue. If approval is not given, stop before
   implementation; the model cannot provide it for you.

## Checkpoint

- Your second skill has a body based on repeated steps, not a completed answer.
- The no-skill model baseline and new skill output were compared on the same
  task inputs, with any input/model differences disclosed.
- Explicit/discovery/near-miss and missing-plan trials have separate evidence.
- Your chosen short spec is linked to the issue and **explicitly human-approved**.
- The app is still unchanged; no implementation has started.

## Recovery

- **Draft overwrote the no-skill baseline:** stop and use Git/editor history to
  recover the intended version; compare before accepting any replacement.
- **Missing plan does not stop the skill:** simplify its input preconditions
  and rerun that case.
- **Approval wording was generated without your decision:** leave approval
  pending. A label inside a document is not a human action.

## Next

[Lab 06 — Recognize the customization pattern](06-customization-pattern.md).
[Course index](../README.md).
