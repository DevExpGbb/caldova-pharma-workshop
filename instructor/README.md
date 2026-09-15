# Instructor reference material

**Learners: write your own procedures before opening this directory.**
The three files in [solutions](solutions) end in `.md.example`, not `SKILL.md`.
They are not automatically registered skills. That naming does **not** prevent
an agent from reading them: learner prompts exclude this directory explicitly.

These are original teaching examples, not installed dependencies or guaranteed
best answers. Never copy them into the participant starter's `.github/skills`.
For a facilitator packaging rehearsal, copy them into a disposable directory
outside skill discovery, naming each copied entrypoint `SKILL.md` only inside
that scratch package. Remove the scratch directory afterward.
Use the source manifest's exact public development pin and ordinary policy-active
`apm lock`, not `apm install`. The lock-only operation must deploy no baseline
instructions/agents. Keep its development/provenance metadata when verifying the
six-file export; the development input's content must remain outside the archive.

[evals.json](evals.json) has three content comparisons and twenty trigger
queries per skill, with a fixed balanced 60/40 training/validation split.
It intentionally records **not-run**: structural checks and a successful APM
package do not prove model behavior. Rehearse with the intended participant
client, same inputs and selected model, with and without the skill. Save real
outputs and loading evidence privately; publish only reviewed fictional data.

If both variants are equally useful, say so. Refine or omit unnecessary
instructions rather than claiming a benefit that was not measured. If a
matching request does not load the skill, improve its description and test
again; do not call an explicit invocation proof of automatic selection.

There is no solved filter implementation or executable feature-answer test
here. The facilitator's feature rubric is behavioral: default all records,
exact requested status, correct count, original order and data preserved,
useful zero-match message, neutral unknown state, and keyboard-accessible
controls. Participants decide how to implement and test those requirements.

See the [facilitator guide](../docs/facilitator.md) for preparation, timing,
recovery, and the distinction between a local exercise and a live integration.
