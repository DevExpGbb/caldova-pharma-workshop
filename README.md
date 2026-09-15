# Caldova Pharma: from a request to reusable skills

**Build one small website improvement. Learn when a prompt is enough—and when
to turn repeated work into a skill.**

In this beginner GitHub Copilot App workshop, you start with a working lab
document board. You capture a fictional request, plan a change, implement it,
and review a real pull request. Along the way, you author three skills, then
package them for sharing.

**Full journey:** allow **5–6 hours**, or two sessions. The suggested schedule
is **5 hours 40 minutes including breaks**, covering all 13 labs: three
learner-authored skills, native cloud review, APM packaging, release, and
distribution/configuration review. Only live enterprise-admin execution is
optional and role-gated; the distribution lesson is included for everyone.

An **optional abbreviated ~3-hour track** covers selected hands-on work and
previews the later stages. It is not completion of the full journey.
No previous skill-authoring experience is needed.

> All Caldova people, messages, teams, and documents are original fiction for
> training. Editorial labels such as “Needs review” are not scientific or
> clinical judgments. This is not a validated quality-management system, and
> must not be used for patient care, laboratory operations, or regulated approval.
> Never put real workplace content or credentials in a public issue or commit.

## Start your own copy

1. Open this repository on GitHub. Choose **Use this template → Create a new
   repository**, under your own account or an approved training organization.
   **Do not perform exercises in the shared upstream repository.**
2. Install/sign in to the [GitHub Copilot App](https://github.com/features/ai/github-app).
   Add **your copy** in **Projects**, and start an Interactive project session.
3. Follow [Lab 00: setup](docs/labs/00-setup.md) to find that session's **actual
   worktree checkout**. Run the following in a terminal in that exact directory,
   not a different clone.

**Cross-platform** (macOS, Linux, or PowerShell; Node and npm on PATH):

```sh
npm ci
npm run dev
```

Open **http://127.0.0.1:5173**. The starter shows six fictional records, `CDOC-101`
through `CDOC-106`, with **no filter**. Keep the terminal running. In a second
terminal in the same checkout:

```sh
npm test
npm run build
npm run check
```

The app uses vanilla JavaScript, HTML, CSS, Vite **7.3.6**, and Node's built-in
test runner. Use **Node 24.21.0 LTS** for the rehearsed path (at least that patch
within Node 24 LTS) plus Git. No database, container, Azure setup, deployment,
website login, or WorkIQ connection is needed to run it. The local server binds
to loopback with a strict port; it will fail rather than silently use 5174.

## What is already here?

| Starter provides | You create during the workshop |
| --- | --- |
| Working six-document board and baseline tests | A small view/filter and count, with tests you derive |
| Public fictional source messages | One human-confirmed feature issue in your copy |
| Step-by-step labs and blank, inert worksheets | A bounded plan and short, human-approved spec |
| Packaging helpers and an inert manifest example | `intake`, `plan-to-spec`, and `code-review` skills |
| App CI and a tag-triggered draft-release workflow | A reviewed PR, package manifest/lock, verified archive, and human-published plugin release |

There are **no active solution skills or completed feature spec** in the starter.
Instructor reference files are optional teaching material, not learner context:
do not ask Copilot to inspect them. An inert filename prevents automatic
registration; it does **not** prevent an agent from reading that file.

## Before the event

**Participants:** Git, Node 24.21.0 LTS, a browser, the Copilot App, a GitHub
account with access to your training copy, and a paid Copilot entitlement for
cloud code review. Check AI-credit budgets and applicable App/review policies.
The App itself supports more access options, but those do not necessarily
include cloud review. APM **0.31.0** is introduced only after you author skills;
its native binary needs no Python.

**Facilitator / administrators:** preflight App builds, review eligibility and
Actions resources, and arrange the authorized WorkIQ training account, billing,
consent, and seeded fictional sources. Repository Admin or an **edit repository
rules** role is needed for the review ruleset. Enterprise ownership is needed
only to execute the optional live admin portion of the included distribution
lesson. Participants do not provision cloud services. If live prerequisites
are unavailable, use explicitly labeled offline practice or a facilitator
demonstration and schedule the missing full-journey evidence for later; do not
count those substitutes as completed live stages.

## Workshop map

- **[Full-journey schedule and abbreviated track](docs/README.md)** — start here
  after setup.
- [Capability and licensing preflight](docs/capabilities.md) — dated public
  references, supported surfaces, and limits.
- [Glossary](docs/glossary.md) — issue, worktree, skill, PR, package, and policy.
- [Facilitator guide](docs/facilitator.md) — preparation and honest fallback paths.
- [Fictional source](fixtures/teams-request.md) — the starting request, not a
  completed issue.

The story is small:

**fictional source → issue → plan/spec → PR and tests → reusable skills → plugin**

Human review remains at the issue, spec, merge, publication, and administration
boundaries. Releasing the skills does **not** deploy the website.
