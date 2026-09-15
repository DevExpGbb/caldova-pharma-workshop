# Lab 06 — Choose the right kind of customization

## Start here

- **Role:** participant discussing the pattern with a partner or facilitator.
- **Duration:** 15 minutes in the full journey.
- **Exact starting state:** one confirmed issue, an agreed plan, a human-approved
  spec, and two authored skills exist on your branch. The feature and review
  skill do not exist yet.
- **Output:** a simple explanation, not another configuration file.

## Why

You have repeated the same learning loop twice. Recognizing it makes the
software-development lifecycle ([SDLC](../glossary.md)) easier to navigate.
Different jobs need different kinds of help; not every problem needs an agent,
policy, or package.

## Actions

1. **Match a need to a mechanism.**

   | Mechanism | Plain meaning | Example here |
   | --- | --- | --- |
   | Tool / MCP server | A way to perform an operation or retrieve data | WorkIQ reads a seeded fictional message |
   | Skill | A procedure loaded for a relevant task | Your intake steps turn one source into a reviewable draft |
   | Persona / custom agent | A role or perspective for a conversation | An optional “UI reviewer” viewpoint, not needed here |
   | Instruction / rule file | Guidance attached more broadly to work | A repository coding convention; still not guaranteed enforcement |
   | Package / plugin | A versioned unit for distributing capabilities | Your three skills in one portable archive |
   | Marketplace | A catalog pointing at installable plugins | A later entry points to a real plugin directory |
   | Native policy / ruleset | A supported product control | PR review requests or managed plugin availability |

   A skill describing permission is not a permission system. A rule in prose
   is not a branch ruleset. A marketplace entry is not the plugin's contents.

2. **Sketch your own three-stage map.** On paper, connect intake, specification,
   and review to their inputs and outputs. Put a human decision beside issue
   creation and spec approval. Leave implementation as a bounded coding task,
   not an all-purpose orchestration.

   Optional discussion prompt:

   ```text
   Explain the difference between the two skills I authored and the WorkIQ
   tool in this workshop. Use only .github/skills/intake/SKILL.md,
   .github/skills/plan-to-spec/SKILL.md, and my approved feature spec.
   Do not inspect instructor reference answers, create files, or implement.
   Ask me which part is guidance and which part needs a human or native
   product control. Keep this a beginner explanation, not a governance system.
   ```

3. **Name one thing not to automate.** Choose a human boundary: checking
   public-safe quotes, approving the spec, deciding a merge, publishing a
   release, or changing enterprise configuration. Explain why a convincing
   response is not enough authority.

4. **Save your place at the session boundary.** Review your diff and save your files.
   Record the actual checkout and branch using these **cross-platform** commands:

   ```sh
   node -p "process.cwd()"
   git branch --show-current
   git status --short
   git rev-parse HEAD
   ```

   In the two-session schedule, this ends Session 1. Keep the same authored
   checkout/checkpoint when you return; if you stopped the server, restart
   `npm run dev` there. In a single-day workshop, continue to Lab 07.

## Checkpoint

You can explain why:

- WorkIQ is a tool, intake is a skill, and the upcoming archive is a package.
- The next review ruleset requests a **cloud PR review**, not a local App run.
- You need only three small skills here—not a persona/rule for every phase
  or an autonomous governance framework.

## Recovery

If two mechanisms sound interchangeable, ask: **does it perform an operation,
provide task guidance, distribute files, or enforce a supported control?**
Use the [glossary](../glossary.md), then keep the simplest mechanism that fits.
Do not install extra tooling to complete this discussion.

## Next

[Lab 07 — Prepare automatic cloud review](07-automatic-review.md), next in the
single-day journey or at the start of Session 2.
[Course index](../README.md).
