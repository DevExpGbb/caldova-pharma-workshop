# Capability reference and preflight

**Documentation check: 2026-09-15.** These are public product/source references,
not receipts of live workshop execution. Product UI, entitlement, and client
support can change. Rehearse with the actual participant account and build.

## Working assumptions

| Capability | Publicly documented support | Workshop boundary / preflight |
| --- | --- | --- |
| Copilot App | macOS, Linux, Windows; Projects can add a GitHub repository or local folder; Interactive sessions [1] | Git and an eligible App account. Verify the actual installer/build; do not infer minimum OS versions. A separate CLI installation is not an App prerequisite. |
| App access | All Copilot plans; other provider options documented [1] | Use a paid Copilot entitlement for this course's cloud review. Business/Enterprise App policy is separate from CLI policy. |
| Customize | MCP, Skills, Plugins, Installed views [2] | WorkIQ uses **Customize → MCP → custom server**, not a solution-bearing plugin. Generic UI is documented; a guaranteed WorkIQ catalog card or exact custom-dialog field labels are not. |
| Repository skills | `.github/skills/<name>/SKILL.md`, `name` and `description` YAML frontmatter [3] | Learners author three files. `/skills` and `/skills reload` are App commands [4]. A list entry is not execution evidence. |
| Skill selection | Relevance uses request and description; selected skill text loads into context [3] | Test explicit invocation, natural-language discovery, and a near miss. Save observed load trace; label unavailable trace **not observed**. No deterministic trigger promise. |
| WorkIQ local MCP | `npx -y @microsoft/workiq mcp`; delegated user access and consent [5] | Facilitator supplies authorized, pre-enabled tenant and billing. Human login/EULA; only needed query/read operations; no auto-approval or writes. |
| WorkIQ availability | Learn says GA June 16, 2026, with usage-based billing; repository README still says preview [5][6] | Treat this discrepancy as a preflight requirement, not interchangeable licensing. Neither a GitHub license nor an M365 seat alone proves access. |
| Cloud Copilot Code Review (CCR) | Paid plans; automatic requests via repository ruleset; review new pushes/draft PR options [7] | Applicable policies, PR-author eligibility, AI credits, and Actions resources matter. Copilot Free does not include CCR. Repository access alone is insufficient. |
| Review ruleset editing | Admin or custom **edit repository rules** permission [8] | Include all branches for the exercise. This covers PRs in scope, not every branch push without a PR. Set up before the feature PR. |
| CCR skill source | Repository instructions and skills read from **PR head branch**, including `.github/skills/code-review/SKILL.md` [3][9] | Observe baseline review before that skill exists. Commit it on PR HEAD, push, request a fresh review, and record the reviewed SHA. Do not wait for a base-branch merge. |
| Review decision | Comment by default; optional approving reviews are preview [7] | Preview approvals are out of scope. App review and cloud review are distinct; humans decide merge/approval. |
| Cloud MCP | Configured in GitHub repository settings; tools only; no OAuth-authenticated remote MCP; CCR requires read-only hints [10] | Local App WorkIQ config and login are **not inherited**. Do not configure WorkIQ for CCR. Use public issue/spec/code context. |
| Portable package | Agent Plugins 1.0 root schema and fixed `skills/` layout [11] | Package only the three authored skills, empty MCP configuration, and lock/identity metadata. Format support is not enterprise authority. |
| APM | Released CLI **0.31.0**, native downloads; explicit portable export [12] | Verify archive SHA-256 before executing, then `apm --version`. Linux binaries need glibc ≥2.35. Windows ARM uses x64 emulation; no native ARM asset in this release. |
| Development dependency | APM distinguishes `devDependencies` from production inputs; portable export excludes development content [17] | One fixed public baseline satisfies the observed package policy at lock time. `apm lock` does not deploy targets. Preserve its dev/provenance lock record; do not install it as learner guidance. |
| Native plugin installation | App Customize → Plugins; CLI native marketplace/plugin commands [2][13] | Use a clean approved consumer only after authoring. APM's separate live registration path documents CLI 1.0.81+ [12]; don't infer an App minimum version from that. |
| Managed settings | Enterprise configuration organization `.github-private` repository; default-branch `copilot/managed-settings.json`; AI controls → Agents → Configuration source [14] | Authorized training enterprise owner only. Additive proposal; explicit human confirmation; existing policy preserved. A JSON example is not an applied rollout. |
| Plugin release | GitHub Actions can create draft releases; optional immutable-release controls [16] | Human chooses exact candidate/tag, then deliberately publishes a reviewed draft. Checksums detect changed bytes, not signer identity. No website deployment. |

### WorkIQ documentation discrepancy

Current [Microsoft Learn CLI guidance][5] describes GA, current CLI versions,
Copilot Studio usage-based billing assignment, and tenant administrative
consent. The inspected [official marketplace README][6] still calls the
integration preview, while its administrator material describes older
licensing. Ask the authorized facilitator to confirm **the account actually
works**, not simply which document sounds more permissive. Cloud resource
provisioning is not part of this workshop.

The official WorkIQ plugin includes prebuilt skills and uses its own remote
connection. Installing it would change the manual baseline. The course instead
configures the official **local/stdio MCP command** through Customize. This is
still a networked workplace service, not an offline data source.

### Current cloud-review branch behavior

The public [head-branch reference][9] was changed in
[July 2026](https://github.com/github/docs/commit/5a6909ab0635eae79c151d0167f8ea416fe4a5c3).
Older base-branch instructions are not the current contract. A skill committed
on the PR head can participate in a **new** review. That does not retroactively
change the baseline review, guarantee model obedience, or establish a visible
load trace on every client. Save native review URLs, dates, and candidate SHAs;
report trace visibility separately.

## Managed plugin support is not universal

The public managed-settings matrix [15] marks these three keys supported:

| Key | App | CLI | VS Code | Cloud agent | JetBrains | CCR separately listed? |
| --- | --- | --- | --- | --- | --- | --- |
| `extraKnownMarketplaces` | Yes | Yes | Yes | Yes | Yes | No |
| `enabledPlugins` | Yes | Yes | Yes | Yes | Yes | No |
| `strictKnownMarketplaces` | Yes | Yes | Yes | Yes | Yes | No |

Do not substitute “cloud agent” for “cloud Code Review.” Rehearse the actual
client build; the matrix is not a full minimum-version chart.

- `extraKnownMarketplaces` **adds** a source; it is not an exclusive allowlist.
  Its source can be `{ "source": "github", "repo": "OWNER/REPO",
  "ref": "<40-char reviewed commit>" }`. `autoUpdate: false` keeps managed
  automatic updates disabled for that marketplace.
- `enabledPlugins["caldova-workshop-skills@caldova-workshop"] = true` requires
  that plugin enabled/automatically installed for covered users.
- `strictKnownMarketplaces` **restricts** sources. An empty array is a
  **deny-all lockdown**, not a harmless default. The exercise never supplies
  one; an admin must preserve existing approved sources and any restrictions.
- Server-managed coverage depends on the relevant enterprise supplying the
  user's license. Select the matching **Usage billed to** entity when needed.
  Normal refresh is approximately hourly; restart/sign-in refreshes settings.
- A failed fetch with no cache can leave a CLI session without server-managed
  settings [14]. There is no universal disconnected/offline enforcement
  promise. Device-managed approaches are a separate admin concern.

## APM contract used here

The course follows the actual
[v0.31.0 authoring reference](https://github.com/microsoft/apm/blob/8fd10ac5eafee7ca77d41cc34ba139d812fdacd5/packages/apm-guide/.apm/skills/apm-usage/package-authoring.md)
and [pack command](https://github.com/microsoft/apm/blob/8fd10ac5eafee7ca77d41cc34ba139d812fdacd5/docs/src/content/docs/reference/cli/pack.md).
Reading a public reference does not install it. The guide is not a runtime
dependency.

| Version | Meaning |
| --- | --- |
| Node 24.21.0 / Vite 7.3.6 | Local website toolchain |
| APM 0.31.0 | Packaging executable |
| Package `0.1.0` | Your independently versioned skill bundle |
| Agent Plugins schema `1.0.0` | Portable manifest format, not the package version |

`apm pack --offline --format agent-plugin --archive --archive-format zip --output ../release`
is the portable export command, run from `.workshop/package`. Bare `apm pack`
or `--format plugin` chooses the **legacy** format. `--target` is not content
isolation. The dedicated staging directory, empty **production** dependency
mapping, exact development pin, and exact includes provide the packaging boundary.
`--offline` export reuses the saved lock; it does not override a failed policy-active lock.

The development input is
`devexpgbb/zava-agent-config/plugins/secure-baseline#931cfb58663154415f8a13e14680f548114d4555`.
Its [public manifest](https://github.com/DevExpGbb/zava-agent-config/blob/931cfb58663154415f8a13e14680f548114d4555/plugins/secure-baseline/apm.yml)
attributes Zava Engineering, declares MIT, and has no transitive APM dependencies.
This authoring-time dependency is intentionally different from the original
Caldova runtime skills. We do not copy its instructions or agents into the
website, learner context or portable payload. `compilation.source_attribution: true`
satisfies the observed attribution requirement; ordinary policy discovery stays active.

Canonical authoring is `.github/skills`; `.workshop/package` is generated.
The required archive shape is a top-level versioned directory, root `plugin.json` with
`https://agent-plugins.org/schemas/1.0.0/plugin.schema.json`, empty `mcp.json`,
`apm.lock.yaml`, and exactly three `skills/<name>/SKILL.md` files. Optional
resources require explicit include **and verifier** changes, not a broad copy.
Structural validation does not prove that a skill works well.
The helpers intentionally enforce the fixed APM 0.31.0 source-lock serialization,
exact baseline commit/content hash, `is_dev: true`, declared MIT license, and
empty deployments. A changed tool or dependency needs deliberate contract
review, not hand-editing the generated lock. The full development metadata
is retained in the archive.

The course's tag-only workflow is configured to use pinned/checksummed tooling
and create a **draft**. Ordinary starter pushes cannot trigger it, and absent learner
skills/source manifest/lock fail its prerequisites. App CI does not require
APM, WorkIQ, tenant login, or model calls.

### Package rehearsal status

**Positive APM route: REHEARSED on 2026-09-15, macOS Apple Silicon.**
The initial empty-development manifest was blocked by a required-package policy.
The corrected exact development pin passed ordinary `apm lock` with the
available organization policy reporting `enforcement=block`; no policy was
changed, skipped or weakened.

The checksum-verified APM 0.31.0 binary produced a real six-file portable ZIP.
All three skill entrypoints matched the original inert instructor examples
byte-for-byte. The embedded lock retained the exact commit, `is_dev: true`,
declared MIT license, content hash and `deployments: []`; no baseline target
guidance was deployed or exported.

Export from a fresh staging directory containing only the manifest, saved lock
and original `.apm/skills` also passed with `--offline`, without an
`apm_modules` project cache. Its archive was byte-identical:
`622022f52b1ae89de7685780b0bb2a74545658613b9675ea8be03a39feee513a` (SHA-256).
This is an instructor-sample artifact, not a learner release or behavioral
skill evaluation. Generated sample sources stay out of the published starter.

Native tag/release execution, Windows packaging, client installation, live
WorkIQ, cloud-review comparisons and managed activation remain unrun here.
The app and normal CI remain independent of APM and WorkIQ.

Organization-owned copies may inherit mandatory package policies. If blocked,
stop and contact the facilitator or authorized administrator. Follow the
designed genuine personal template-copy route only where authorized; its
applicable policy may differ, but permission and packaging success are not
guaranteed. See [Lab 10 recovery](labs/10-package-skills.md#recovery) and the
[facilitator guide](facilitator.md) for per-account preflight and remaining live gates.

## Inspiration, not copied solutions

The public [Zava storefront](https://github.com/DevExpGbb/zava-storefront/tree/9905f3f920aadf1ca9100d88f54faeb384940489)
and [Zava agent configuration catalog](https://github.com/DevExpGbb/zava-agent-config/tree/931cfb58663154415f8a13e14680f548114d4555)
illustrate general patterns: a small app, phase-specific customization, and
versioned distribution. Caldova's fiction and course text are original.
Public visibility is **not** blanket permission to copy those repositories;
check the license of any material before reusing it. Their older packaging
examples are not the authority for this course's portable export.
The separately declared public development baseline above is resolved only
as a pinned authoring input; its guidance is not reproduced in the course or runtime bundle.

## Public sources

[1]: https://docs.github.com/en/copilot/get-started/quickstart-copilot-app
[2]: https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app
[3]: https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills
[4]: https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands
[5]: https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/cli
[6]: https://github.com/microsoft/work-iq/blob/6ca659376475be962cbd763431832209d60bed71/README.md
[7]: https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review
[8]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository
[9]: https://github.com/github/docs/blob/6fad246e0589a100c44f00c82aa99826655165a9/data/reusables/copilot/code-review/custom-instructions-branch.md
[10]: https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers
[11]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference
[12]: https://github.com/microsoft/apm/releases/tag/v0.31.0
[13]: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing
[14]: https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started
[15]: https://github.com/github/docs/blob/6fad246e0589a100c44f00c82aa99826655165a9/content/copilot/reference/enterprise-administrators/enterprise-managed-settings.md
[16]: https://docs.github.com/en/code-security/concepts/supply-chain-security/immutable-releases
[17]: https://github.com/microsoft/apm/blob/8fd10ac5eafee7ca77d41cc34ba139d812fdacd5/docs/src/content/docs/reference/manifest-schema.md

- [App access and policies](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app)
- [Cloud review availability, billing, and defaults](https://docs.github.com/en/copilot/concepts/agents/code-review)
- [Managed settings deployment and failure behavior](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings)
- [Configuration-source repository](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/create-github-private-repo)
- [Marketplace file and repository-relative sources](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-marketplace)
- [APM native Copilot consumption](https://github.com/microsoft/apm/blob/8fd10ac5eafee7ca77d41cc34ba139d812fdacd5/docs/src/content/docs/consumer/copilot-agent-plugins.md)

Return to the [course index](README.md).
