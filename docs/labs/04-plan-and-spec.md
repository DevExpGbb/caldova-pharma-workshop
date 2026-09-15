# Lab 04 — Plan first, then prompt for a spec without a skill

## Start here

- **Role:** participant as feature owner; Copilot is a planning partner.
- **Duration:** 30 minutes in the full journey.
- **Exact starting state:** one real `<YOUR_ISSUE_URL>`, your intake skill,
  and the unchanged six-record starter exist on the same authored branch.
  There is no plan-to-spec skill or completed feature specification.
- **Outputs:** `docs/plans/document-view.md` and
  `docs/specs/document-view.md`, authored during this lab.

## Why

A [plan](../glossary.md) explores the approach. A [spec](../glossary.md) records
the behavior you agree to build. Keeping them distinct prevents “we discussed
it” from becoming accidental permission to implement something different.
Here, **manual means a one-off Copilot prompt without a reusable skill**, not
handwriting the specification. You review the model's output and choices before
turning the repeated procedure into a skill in Lab 05.

## Actions

1. **Check your checkpoint.** In the terminal for the App checkout:

   **Cross-platform:**

   ```sh
   node -p "process.cwd()"
   git branch --show-current
   git status --short
   ```

   Open the actual issue. Check it is the human-confirmed feature, not an
   issue inferred from a chat summary or a maintainer preparation issue.

2. **Use the App's Plan mode.** In the current session, select **Plan** using
   the App's mode control. Use this prompt after replacing the URL:

   ```text
   Plan, do not implement, the confirmed issue <YOUR_ISSUE_URL>.
   Use only that issue, fixtures/teams-request.md, and the actual app files
   src/main.js, src/render.js, src/documents.js, src/styles.css, index.html, package.json,
   and existing tests relevant to this app. Do not inspect instructor
   reference answers, write a skill, or use a plan-to-spec skill.
   Explain the smallest approach in plain language. Ask me about unresolved
   behavior rather than inventing requirements. Identify actual files,
   proposed evidence, a negative case, and when we should stop and ask.
   Keep this a local view change: no new service, storage, sign-in, clinical
   decision, or deployment. Present the plan for discussion, not approval
   to code.
   ```

   Discuss the alternatives. If the plan grows beyond the issue, narrow it.
   Do not choose an “implement” continuation merely to save the plan.

3. **Save the agreed approach without starting code.** Once you agree on the
   bounded approach, ask:

   ```text
   Save only the agreed plan from this conversation as
   docs/plans/document-view.md, linked to <YOUR_ISSUE_URL>. Use only the
   issue, our agreed plan, and the app paths already inspected. Do not
   inspect instructor reference answers, write a completed spec, author
   skills, or implement code. If Plan mode cannot write the document,
   show the text for me to save manually instead.
   ```

   If necessary, create the Markdown file yourself in the editor. A human
   agreement on an approach is not yet approval of the final feature spec.

4. **Use an ordinary no-skill prompt to derive the spec.** Save the plan and
   use [fresh context on the same authored checkpoint](../README.md#keep-one-thread-of-work)
   so you can compare this run with the later skill run. Verify the actual
   checkout and branch; do not switch to a fresh default-branch workspace.

   ```text
   This is a one-off prompt, not a skill invocation. Parse the saved bounded
   docs/plans/document-view.md and confirmed <YOUR_ISSUE_URL> into a short
   implementation specification in chat, roughly one page.
   Use only that plan, issue, docs/templates/spec.md.example, and relevant
   current app files/tests named by the plan. Do not inspect instructor
   reference answers or use a plan-to-spec skill. If a mandated overlapping
   skill loads, disclose it and label this contaminated draft practice.
   Include outcome, observable behavior, actual files, tests/evidence,
   a negative case, and out-of-scope work. Preserve agreed choices; ask
   about missing decisions or scope conflicts instead of inventing them.
   Link the real issue and plan. Leave Human approval pending.
   Do not implement code, author skills, create another issue, approve
   anything, or save files yet.
   ```

   Save the exact prompt and **raw model output**, selected model, input
   checkpoint and available load trace in your private comparison notes.
   Then review/edit the draft and answer its questions. Use the
   [blank worksheet](../templates/spec.md.example) to check its structure,
   not as a completed answer. Preserve these scope/negative-case questions:

   - What should be visible initially, after a view change, and after returning?
   - What exact label qualifies? Count the matching IDs yourself.
   - How should the count and selected control communicate what is showing?
   - How will you test an empty result without replacing the six starter records?
   - What happens to an unrecognized or unspecified label?
   - What must not be mutated, reordered, or newly inferred?

   Correct the model's assumptions and record your choices; do not copy a
   solved rubric. Save the reviewed draft as `docs/specs/document-view.md`
   using your editor. Saving model output is not an exercise in typing a
   spec from scratch. Leave **Human approval: pending** until after Lab 05's
   comparison.

5. **Review for gaps, not implementation.**

   ```text
   Review only my docs/specs/document-view.md for ambiguity against
   <YOUR_ISSUE_URL>, docs/plans/document-view.md, and the relevant current
   app files/tests. Do not inspect instructor reference answers or author
   a replacement spec. Ask concise questions where behavior or evidence
   is missing. Do not write code, load a plan-to-spec skill, approve the
   document for me, or create another issue.
   ```

   Resolve the questions yourself. Add a public-safe comment to your issue
   pointing to the plan/spec on your authored branch once committed, or record
   their paths until you have a real branch permalink. Do not invent a link.
   Keep both the original no-skill model output and your reviewed spec
   baseline for Lab 05. Record the follow-up prompts and corrections that
   would be useful in a reusable procedure.

## Checkpoint

- A bounded plan exists and names real files and evidence.
- An ordinary no-skill Copilot prompt derived the short spec; you reviewed
  its choices and preserved the raw output and edited baseline separately.
- The spec refers to the real issue, has a negative case and scope exclusions,
  and still says approval is pending.
- No feature implementation or plan-to-spec skill has been created.

## Recovery

- **Plan mode offers immediate implementation:** decline that action; save
  the document manually if needed.
- **Issue cannot be read:** open the actual URL yourself and provide its
  reviewed public-safe text, labeling the fallback. Do not guess an issue.
- **Spec needs a backend, login, or status editing:** stop; reconcile that
  scope conflict with the issue before continuing.
- **Expected counts came from a guess:** inspect the six records and count
  manually. Preserve the data; tests can use separate synthetic inputs later.

## Next

[Lab 05 — Author a plan-to-spec skill and approve the spec](05-plan-to-spec-skill.md).
[Course index](../README.md).
