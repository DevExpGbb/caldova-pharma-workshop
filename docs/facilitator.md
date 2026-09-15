# Facilitator guide

Use this guide to prepare and run the workshop, not as the learner's step-by-step handout.
Start participants at the [workshop README](../README.md); keep the [glossary](./glossary.md) nearby.
This guide contains instructor checkpoints: do not feed it to Copilot as an implementation prompt.

**Reference date: 2026-09-15.** Product documentation was checked on that date; this is not a claim of a completed live rehearsal.
The account-dependent checks below remain pending until an instructor records actual results.

## The small story

Learners improve a local Caldova Pharma document board containing six original, fictional records.
The starter shows every document and should already pass its baseline checks.
The one feature is an **All documents / Needs review** view with a result count.
Learners first do a task manually, then capture the useful repeated steps in their own skill.
Later they package their three authored skills; they do not deploy the website.

The app uses Node.js, Vite and a browser. There is no backend, account system, storage or cloud provisioning.
Editorial statuses are fictional labels, not clinical decisions or quality approvals.
Do not introduce patient data, real workplace records, sign-in, status editing or a second feature.

## People and timing

| Role | Responsibility |
|---|---|
| Participant | Own template copy, source checking, skill authoring, small spec, feature, tests and PR. |
| Facilitator | Rehearse the actual client/account combination, teach, inspect evidence and protect the public-data boundary. |
| Repository admin | Configure rulesets in an authorized workshop copy; confirm review eligibility and credits. |
| Training-tenant admin | Confirm pre-enabled WorkIQ access, consent, billing/licensing and permission to use fictional training content. |
| Optional enterprise admin | Review or demonstrate managed distribution in an explicitly authorized test enterprise only. |

One person may hold several roles, but repository admin is not enterprise admin.
Each participant creates their **own repository from the template**; nobody submits exercise work to the shared upstream repository.
Pairs may discuss together, but should identify whose copy and account each action uses.

The **complete workshop takes about 5–6 hours**, or two sessions, including all three authored skills,
APM packaging, versioned draft release and the managed-configuration review.
Only executing the enterprise-admin rollout is optional; the distribution lesson is part of the full journey.
Use the [full 5h40 schedule](README.md#full-journey-schedule): 320 teaching minutes plus two 10-minute breaks.
The two-session split is 2h55 for Labs 00–06 and 2h45 for Labs 07–12.

### Three-hour abbreviated track (not full completion)

Use this compressed track when the room has only three hours. Assume tools, accounts and training access
have been prepared beforehand, and use paired work or prepared demonstrations where needed.
It ends before the third skill and packaging: schedule the required continuation rather than claiming the full course is finished.

| Elapsed | Activity | Instructor checkpoint |
|---|---|---|
| 00:00–00:25 | Open own copy; local baseline; WorkIQ read or labeled offline route | Correct checkout, six records, actual source. |
| 00:25–00:45 | Manually turn one request into a public-safe issue | Learner verifies quotation and confirms issue creation. |
| 00:45–01:10 | Author and compare an intake skill | Loading evidence, source-bound draft and a non-request case. |
| 01:10–01:35 | Plan; one-off no-skill spec prompt; human review and approval | Reviewed behavior, exclusions, acceptance evidence and negative case. |
| 01:35–01:40 | Discuss the customization pattern | Distinguish tools, reusable procedures and human decisions. |
| 01:40–01:50 | Break | Leave accounts and private results off the projector. |
| 01:50–02:30 | Preflighted review setup; implement the agreed feature and open a PR | Actual checks and baseline review, or explicit pending receipt. |
| 02:30–03:00 | Preview review-skill, packaging, release and distribution stages | Separate facilitator checkout; do not install answers in learner work. |

Do not rush beginners into treating a queued review as a completed review.
If implementation needs longer, finish it next session before starting dependent stages.
Record exactly which stages were completed and which service-dependent checkpoints remain pending.

### Required continuation for the full workshop

The abbreviated track authors only the intake skill. Schedule Lab 05's plan-to-spec authoring/comparison
and Labs 09–12 as real participant work, not just demonstrations, before claiming full completion.
Follow the course index for the canonical durations and ordering. Preserve every intermediate checkpoint.

Allow service queues and policy propagation outside these teaching blocks.
Installing a package in another client is an additional compatibility check, not a prerequisite for inspecting a valid archive.
An optional live enterprise-admin demonstration needs an additional 25–35 minutes and explicit test-environment authorization.

## T−1 day: preparation checklist

Keep the rehearsal record in an approved private location; never commit account or tenant details.
These boxes are deliberately unchecked. No rulesets or tenant settings were changed as documentation preparation.

- [ ] Record the exact Copilot App build and OS for each supported participant platform.
- [ ] Rehearse install, GitHub sign-in, Projects, Interactive sessions and Customize in that build.
- [ ] Confirm account policy permits the App; its policy is separate from the CLI policy.
- [ ] Check Git, the README's supported Node version and browser availability; record the versions used.
- [ ] Create a disposable **personal training copy**, not a branch for everyone in the upstream repository.
- [ ] Execute the README's dependency setup, baseline tests and production build in that copy; record actual results.
- [ ] Start the README's local development command; open the exact loopback URL printed by Vite and inspect all six records.
- [ ] Confirm the starter has no completed filter, spec or active learner `SKILL.md` implementations.
- [ ] Inventory personal, repository and managed customizations that could affect the manual baseline.
- [ ] Verify the actual App's custom-MCP setup, authorized sign-in and retrieval of the exact fictional source.
- [ ] Obtain admin confirmation of pre-enabled WorkIQ access, applicable billing/licensing, consent and first-use terms.
- [ ] If seeding is approved, manually seed only newly authored public fictional fixtures into the authorized training tenant.
- [ ] Check indexing/search titles and identify the real public fixture permalink to use in public issues.
- [ ] Confirm participants own their copies and can administer their workshop rulesets.
- [ ] Check paid Copilot review eligibility, organization policies, AI-credit budgets and Actions availability.
- [ ] Schedule a separately authorized rehearsal of a draft PR, new push and non-default target branch review.
- [ ] Before cloud customization, rehearse a head-branch review skill with actual source changes and a fresh cloud review.
- [ ] Before packaging, verify APM 0.31.0 and the archive inspection on the intended OS.
- [ ] Before releases, inspect the workflow's tag/version checks, tool pins, inventory checks and draft-only publication.
- [ ] Before any managed-distribution claim, test the supported client/account and approved test-enterprise policy.

**Tenant-only and administration-dependent activities have not been rehearsed by this guide.**
Mark unavailable checks “pending” or “blocked,” with a reason, rather than replacing them with another account's success.
Template copies do not establish that upstream settings, issues, budgets or rulesets were inherited.
WorkIQ access is a pre-enabled training dependency that may carry separate charges or licenses; this workshop does not provision it.
If access is missing, contact the responsible admin outside the teaching block or choose offline practice.

**APM preparation evidence:** the initial empty-development manifest was policy-blocked. The corrected
manifest resolves the exact pinned public baseline as a development dependency with policy active.
Real lock and six-file portable export passed on macOS; offline export without a project dependency cache
matched byte-for-byte. No baseline guidance was deployed or exported; its dev/provenance lock record stays intact.
See the [dated evidence and remaining limits](capabilities.md#package-rehearsal-status).
Rehearse the designed personal template-copy route with each account's actual policy; never move work or change policy to evade a restriction.
The website and ordinary app CI do not depend on APM.

## At the start of the room

1. Project the fictional-data notice and point out the one-feature boundary.
2. Have each learner show their own repository owner/name and App project session.
3. Check that editor, terminal and skill files use the **same session checkout**. The App may create a worktree distinct from the original clone.
4. Use the App's session terminal/editor; compare its folder and current branch before editing. Do not edit a second clone by accident.
5. Run the README's baseline checks and open the local website. Record a failure as a setup issue, not a learner feature failure.
6. Check Customize for existing skills/plugins. Disable only when authorized; never weaken managed policy to obtain a clean baseline.
7. If existing customization cannot be disabled, disclose it and compare explicit before/after behavior. Do not call that an uncontaminated baseline.
8. Tell learners which route is available: live authorized WorkIQ, facilitator demonstration, or offline fictional intake practice.

“No active `SKILL.md`” describes the **clean starter**, not a permanent restriction after learners begin authoring.
Do not install answer plugins, the WorkIQ plugin or a ready-made productivity kit before the manual tasks.
Do not add root Copilot instructions containing the entire workflow or the feature's solution.
Inactive reference answers are still readable files; keep them out of ordinary prompts, skill discovery and package inputs.

## Facilitate the manual-to-feature stages

### 1. Connect a read-only source

In **Customize → MCP**, use the rehearsed custom-server route, not **Customize → Plugins**.
The WorkIQ plugin supplies ready-made skills as well as tools and would change the manual-first experiment.
For the documented local/stdio server, the command is `npx`, with arguments `-y`, `@microsoft/workiq`, `mcp`.
Confirm the actual dialog in the chosen build; do not assume a particular catalog card or invent UI fields.
This tool setup is separate from the website's runtime.

Follow authorized sign-in and terms prompts. Inspect discovered tools and permit only the reads needed for the exercise.
Never grant blanket MCP approvals or allow create, update, delete or send operations for this lab.
Retrieval respects the signed-in account's permissions; it is not permission to publish the results.

Retrieve only the seeded fictional request. Check the excerpt against the approved public fixture.
Keep native tenant citations private: even a citation URL can reveal tenant, user or document identifiers.
The public issue should use the **actual public fixture permalink**, labeled as fixture provenance.
State that the live native citation was retained privately; never relabel that public link as a native WorkIQ citation.
Do not publish real messages, screenshots of private results, account identifiers or authentication material.

If live retrieval is unavailable, read the same public fixture locally and label the activity **offline fictional intake practice**.
It supports every downstream coding lesson but does **not** complete the live WorkIQ checkpoint.
A facilitator's successful retrieval is a demonstration, not evidence that each participant connected.

### 2. Manual intake, then the first skill

Have learners choose one source, quote the request, explain the desired outcome and identify missing information.
Before creating the issue, the learner reviews the public-safe draft and explicitly confirms it.
The receipt is the actual issue URL in their own copy, not an agent's claim that it created one.

Only then ask: “Which steps would you want to repeat next time?”
Learners author their own intake skill in the session checkout and use `/skills reload` and `/skills` to check availability.
Use the alternate fictional request for a **draft-only** comparison; do not create a duplicate issue.
Try an ambiguous request and a message containing no request. A useful skill does not invent scope or manufacture work.

Compare a relevant prompt without naming the skill, explicit use via the available picker/name, and an unrelated prompt.
Capture loading evidence and a concrete output difference tied to the source; style changes alone are weak evidence.
Explicit use proves neither automatic selection nor reliable selection on every future prompt.

### 3. A one-off plan-to-spec prompt, then the second skill

Open the confirmed issue in the App's planning experience and inspect the small actual application.
Have learners use Lab 04's ordinary Copilot prompt to derive a short specification from the saved bounded plan and issue,
without a plan-to-spec skill or instructor answers. This is the **manual-prompt baseline**, not a handwriting exercise.
Learners review and edit its desired behavior, excluded work, acceptance checks and negative case, then save the baseline.
The plan says how to approach the work; the spec says what the result must do.

Instructor rubric: default shows all records; Needs review matches only that exact status and reports the count.
Returning to All documents restores original order. Zero matches show an understandable empty state.
Unknown status does not match. Controls work by keyboard, expose the selected view and do not rely on color alone.
Filtering must not mutate source data or change any status.
A useful negative case is that a Current document stays unchanged and does not appear in Needs review.

After the no-skill baseline, learners author their plan-to-spec skill and compare a clean-context result on the same issue and plan.
Keep the same source checkpoint and authored skill available in the comparison checkout; do not accidentally switch to an older clone.
The skill should reload the source and preserve scope without starting to code.
After comparison, link the chosen reviewed spec from the issue and obtain one ordinary human scope agreement before implementation.
Discuss phase-specific customization: intake checks source intent; planning clarifies behavior; review checks evidence.
Instructions give standing guidance; skills capture reusable tasks; tools provide capabilities. None grants new authority.

### 4. Automatic review, implementation and PR

An authorized repository Admin, or custom role with edit-repository-rules permission, performs the live setup in their copy:
**Settings → Rulesets → New ruleset → New branch ruleset → Active → Include all branches**.
Select **Automatically request Copilot code review**, **Review new pushes** and **Review draft pull requests**, then create.
Confirm the saved rule targets all intended branches; default-branch-only targeting does not cover every target.
This concerns PRs in scope, not every push without a PR. Policy, author eligibility and funding still apply.

Missing admin access blocks that checkpoint, not permission to bypass it.
A manual **Reviewers → Copilot → Request** can provide review practice, but is not proof that automatic rules worked.
Copilot Free alone does not provide cloud code review; confirm paid access or the organization's permitted paid-usage arrangement.

Implement only the agreed feature. Ask learners to demonstrate it locally and add tests that would fail for incorrect behavior.
Inspect the diff and open a PR linked to the issue/spec. Check real Actions results for the current candidate.
Save the actual baseline cloud review link and identify what it did or did not assess.
App `/review` inspects session changes; it is **not** cloud Copilot Code Review on GitHub.
Reviews are advisory for this workshop; humans retain approval and merge decisions.

## Continue the full workshop

### Customize cloud review

After the baseline review, learners author `.github/skills/code-review/SKILL.md` and commit it to the PR's head branch.
Cloud Copilot Code Review supports relevant repository skills and reads them from the **head branch**.
Request or observe a fresh review after the new push; compare its actual output with the saved baseline and the spec.
Use real source changes, not only dependency or generated-file changes that the reviewer may exclude.
Record candidate and review links; if skill loading is not exposed, say so rather than inventing a trace.
A changed comment alone does not prove deterministic skill selection or complete instruction following.
The review skill grants no approval authority. Optional Copilot approval preview is outside this workshop.
Local WorkIQ sign-in and installed plugins do not automatically transfer to cloud review; use public-safe repository context.

### Package the learners' work

Install APM using the approved instructions for the learner's OS; verify `apm --version` reports **0.31.0**.
Do not overwrite a package-manager-owned install with a standalone installer or bypass checksum failures.
Use one dedicated package directory with an explicit allowlist of the three authored skill files and `dependencies: {}`.
Keep the example's one immutable `devDependencies.apm` pin and `compilation.source_attribution: true`.
Explain that this public development input is resolved during locking, not installed as App guidance
or exported as a fourth skill. Its manifest declares MIT and no transitive dependencies.
Keep one canonical editable source for each skill; inspect any deliberate copy into the package for drift.
Do not include fixtures, answer references, instructions, tools, credentials or WorkIQ configuration.

Follow [Lab 10](labs/10-package-skills.md) to copy the inert manifest into its active source location.
From the repository root, use the checked staging boundary rather than packing the repository:

```shell
node scripts/package.mjs stage
cd .workshop/package
apm lock
cd ../..
node scripts/package.mjs remember-lock
cd .workshop/package
apm pack --offline --format agent-plugin --archive --archive-format zip --output ../release
cd ../..
node scripts/verify-package.mjs .workshop/release/caldova-workshop-skills-0.1.0.zip 0.1.0
```

The commands work in a shell with `node` and `apm` available; use the platform-specific installation steps in Lab 10.
If a command fails, stop before running the next one. Commit `agent-package/apm.lock.yaml`, not generated staging output.
When a skill or manifest changes, stage and lock again before remembering the new lock.
Extra skill resources fail explicitly: deliberately extend both source and archive allowlists if the group chooses to include one.
If APM reports an organization-policy block, contact the responsible admin about the authorized training scope.
Do not use bypass flags, weaken policy, move work to evade a restriction or add an unrelated package to this teaching bundle.
Do not replace the lock-only path with `apm install`: installing the authoring manifest would deploy development guidance.
The saved lock must retain the exact pin, content hash, declared license, `is_dev: true`, and empty deployments.
Offline export reuses that reviewed lock; it is not a new policy approval or a way around a failed lock.

Do not use bare `apm pack` or `--format plugin` as synonyms for Agent Plugins 1.0.
`--target` is not a source-folder filter; `-o` changes output, not the input package.

Inspect the **actual** ZIP name and versioned top-level directory from pack output.
Verify root `plugin.json`, `mcp.json`, `apm.lock.yaml` and exactly the three intended `skills/<name>/SKILL.md` files.
Check `plugin.json` selects `https://agent-plugins.org/schemas/1.0.0/plugin.schema.json` and carries the intended package version.
An empty generated `mcp.json` is expected here; it does not add a server requirement.
A successful preview or exit code is not an inventory check or proof that the skills behave usefully.
APM documents native portable consumption for Copilot CLI 1.0.81+; separately verify the App build before promising installation there.

### Version and release

Have learners explain the difference between CLI version, package version and format version before changing anything.
Review the package change and lockfile, choose its version and tag the intended reviewed candidate.
Use the repository's reviewed Actions workflow; inspect the actual run, archive, inventory and version/tag agreement.
The workflow must leave the release **draft** for a human to inspect and publish.
A checksum detects a byte mismatch; it is not a signature or a guarantee of immutability.
An authorized human must verify release immutability is enabled before publication if claiming immutable assets.
Publishing a skill package neither deploys the website nor installs it for other people.

### Optional enterprise-admin demonstration

Without authorized access, perform a clearly labeled **configuration review**, not a managed-rollout claim.
Use only an approved test enterprise for live work; do not change an organization's operational configuration.
Review an additive proposal using `extraKnownMarketplaces` and `enabledPlugins`, preserving existing settings and overrides.
Pin the approved marketplace source and review update behavior; do not introduce `strictKnownMarketplaces: []`, which locks down installation.
After explicit authorization, the test admin follows the official managed-settings process for the intended audience.
Check supported client build, license source, selected billing entity and refresh; propagation may take about an hour.
Observe the intended managed plugin and policy effect without trying to bypass restrictions.
Managed settings enforce availability for supported clients/accounts, not perfect model obedience or universal offline enforcement.
Do not infer that cloud Code Review receives installed plugins from support for another client.

## Help without taking over

Use this assistance ladder: **hint → relevant location → observable checkpoint → optional inert reference answer**.
For example, ask what should remain unchanged before directing someone to the fixture or their spec.
Offer the reference only after an authoring attempt and label copied work honestly; never auto-install it.
Pause for missing required admin access, privacy concerns or unclear scope; otherwise use normal coaching, not repeated paperwork.

| Symptom | Non-destructive next step |
|---|---|
| App or website will not start | Compare actual versions with README prerequisites; read the error in the session terminal. |
| Port already in use | Stop only your own server with Ctrl+C in its terminal, or choose another local port; never kill unrelated processes. |
| Edits or skills seem missing | Compare editor and terminal checkout/branch; reload skills in that same session. |
| Manual task already uses a skill | Inspect installed customization; disable only if authorized, otherwise disclose and compare explicitly. |
| WorkIQ consent, billing or retrieval fails | Stop live retrieval and contact the training admin; use the labeled offline fixture route. |
| Automatic review never arrives | Check saved ruleset, PR target/draft/new-push settings, eligibility and credits; do not call a manual request automatic. |
| Custom cloud review seems unchanged | Confirm head-branch file and a fresh review; inspect evidence and report uncertainty. |
| Package is empty or has extra files | Check current package directory and explicit includes, then inspect the real archive; do not widen to the entire repo. |
| APM reports an organization-policy block | Stop packaging and ask the responsible admin to resolve the authorized training scope; do not bypass policy or claim a successful package. |
| Managed plugin is absent | Check authorized audience, supported build and refresh with the admin; do not disable policy or substitute a personal install as proof. |
| A learner needs to restart | Save their own work first; use a fresh personal template copy or branch. Never reset work, wipe directories or disable policies. |

## Completion receipts

Collect only public-safe evidence: source excerpt and fixture permalink; actual issue URL; skill-load trace and source-bound comparison;
agreed plan/spec file with acceptance checks and a negative case; feature PR plus current test/check URLs;
baseline and fresh customized cloud review URLs; actual archive name, schema, inventory and version; Actions run and draft-release URL.
For the admin extension, record observed live policy only when authorized; otherwise label the result configuration review.
“The agent said done,” a screenshot of settings alone and a green placeholder job are not substitutes for these outcomes.

## Version and source refresh

Before each event, recheck these official sources and record actual local/tenant rehearsal results separately.
Reference review date is **2026-09-15**, not a promise that future UI or entitlements stay unchanged.

- [ ] [App quickstart](https://docs.github.com/en/copilot/get-started/quickstart-copilot-app), [Customize](https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app) and [App slash commands](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands).
- [ ] [WorkIQ CLI and current prerequisites](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/cli); resolve older marketplace licensing language with the training admin.
- [ ] [Automatic review configuration](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review) and [repository skills](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills).
- [ ] [APM 0.31.0 release](https://github.com/microsoft/apm/releases/tag/v0.31.0), [pack contract](https://github.com/microsoft/apm/blob/v0.31.0/docs/src/content/docs/reference/cli/pack.md) and [portable consumption](https://github.com/microsoft/apm/blob/v0.31.0/docs/src/content/docs/consumer/copilot-agent-plugins.md).
- [ ] [Agent Plugins reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference) and [release immutability](https://docs.github.com/en/code-security/concepts/supply-chain-security/immutable-releases).
- [ ] [Managed settings setup](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started), [support matrix](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) and [deployment limits](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings).
