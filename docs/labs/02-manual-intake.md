# Lab 02 — Capture one request manually

## Start here

- **Role:** participant, acting as the human owner of the request.
- **Duration:** 25 minutes in the full journey.
- **Exact starting state:** your personal repository and six-record unsolved
  board are open. You have `CAL-TEAMS-001` from Lab 01, labeled live or offline.
  No learner feature issue or intake skill exists yet.
- **Keep:** the exact App checkout and branch from setup.

## Why

An [issue](../glossary.md) is a durable record of what should change and why.
Drafting it manually helps you see which questions and checks a future skill
should repeat. The model does not decide when private content is safe to publish.

## Actions

1. **Look at the board yourself.** Read
   [CAL-TEAMS-001](../../fixtures/teams-request.md) and inspect `src/documents.js`
   and the rendered page. On paper or in private notes, identify which records
   seem relevant and count them yourself. Do not ask Copilot to give you a
   finished acceptance rubric.

   Ask yourself: What does the request actually say? What will the person
   see? Which behavior is unspecified? What must stay unchanged?

2. **Ask for an ordinary draft—not a skill.** Replace your repository name:

   ```text
   Help me manually draft one issue for <OWNER/REPO> from CAL-TEAMS-001.
   Use only fixtures/teams-request.md, the verified public-safe quotations
   from that source, docs/templates/issue.md.example, and the current app
   files src/main.js, src/render.js, src/documents.js, src/styles.css, and index.html.
   Do not inspect instructor reference answers or other fixture stories.
   Do not use an intake skill or implement code. If a mandated overlapping
   skill loads, disclose it and label this contaminated draft practice.
   Ask me questions that separate the requested outcome from assumptions.
   Keep the draft in chat and do not create an issue yet. Use the public
   fixture permalink as provenance, not a fabricated native Teams link.
   Native WorkIQ citations must remain private.
   ```

   Answer the questions yourself. If you propose behavior not explicitly in
   the message, mark it as your workshop decision, not a quotation from Mira.

3. **Write the acceptance criteria.** Use the blank
   [issue worksheet](../templates/issue.md.example) if useful. Add your own
   observable criteria after considering:

   - How will you know the selected view and displayed count agree?
   - What happens on returning to the full list?
   - What would an empty result or unfamiliar status mean?
   - Can someone operate the view without a mouse or relying on color alone?
   - How will you know viewing did not alter a record?

   These are questions to answer, not a completed specification. Keep out
   storage, sign-in, remote data, approval actions, and clinical judgments.
   Use only this primary fixture as the source; alternate fixtures come later.

4. **Review exact text and destination.** Read the whole proposed issue.
   Verify short quotes against the public fixture, remove native tenant links,
   check the public permalink, and confirm `OWNER/REPO` is **your copy**.
   Review assumptions and exclusions. Do not reuse the workshop maintainer's
   issue as the feature.

   Only when you actually agree, send:

   ```text
   I have reviewed the exact draft above and confirm creating that one issue
   in <OWNER/REPO>. Use only that confirmed text and the public CAL-TEAMS-001
   fixture provenance. Do not inspect instructor reference answers or add
   workplace details. Create exactly one issue, then read it back and report
   its actual URL and stored text. Do not start implementation.
   ```

   Review any native confirmation card before accepting. If the App cannot
   create an issue, use **Issues → New issue** in **your repository**, paste
   the reviewed draft, and submit it yourself. Do not create it both ways.

5. **Read back the real issue.** Open its actual URL and compare the stored
   text with your confirmed draft. Save this URL as `<YOUR_ISSUE_URL>` in your
   notes. Replace that placeholder in all later prompts.

   Record the repeated steps you performed: selecting one source, checking
   wording, separating assumptions, deriving criteria, bounding scope,
   reviewing public safety, and confirming before creation. These are your
   observations, not a finished skill body.

## Checkpoint

- Exactly **one** learner feature issue exists in your personal repository.
- It links the public fictional source, carries your own criteria, and has no
  native tenant link or real workplace content.
- You have the actual issue URL and a record of human confirmation.
- The app is still unsolved; no skill has been authored.

## Recovery

- **Agent creates before confirmation:** stop; do not create another issue.
  Inspect what happened with the facilitator and correct the public record
  deliberately. Do not treat this as acceptable skill behavior.
- **No concrete criteria:** return to the page and write one observable
  before/after example yourself before posting.
- **An ambiguous or status-only source was used:** stop; those are draft-only
  practice inputs, not a reason to open another feature issue.
- **Private content appeared:** do not submit. If already published, stop and
  follow the facilitator's incident process rather than merely hiding it in
  a later edit.

## Next

[Lab 03 — Author and test your intake skill](03-intake-skill.md).
[Course index](../README.md).
