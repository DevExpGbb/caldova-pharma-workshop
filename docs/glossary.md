# Workshop glossary

New to the vocabulary? Start with the [workshop README](../README.md).
Instructors can use the separate [facilitator guide](./facilitator.md).
These definitions describe this small, fictional-data workshop, not a production approval system.

## Working in the App

1. **GitHub Copilot App** — The desktop application where you connect a repository, start an agent conversation and inspect work. Its local `/review` command is different from cloud Copilot Code Review on a GitHub pull request.

2. **Project** — The App's connection to a repository or folder. A project can contain several sessions working on different tasks; it is not a separate copy of every conversation.

3. **Session** — One task conversation and its working context in the App. A project session has a checkout where its files are edited. Check that your terminal and editor use that same location.

4. **Checkout and worktree** — A checkout is the set of repository files on disk for a particular branch or revision. A Git worktree provides another checkout with its own files and branch state while sharing the repository's history. Editing your original clone does not necessarily edit your App session's worktree.

5. **Prompt** — The request you give Copilot now: your goal, relevant context and limits. A prompt asks for work; it does not prove that work happened or grant permission to access or publish private information.

## From request to tested change

6. **Plan** — A proposed approach: which parts need attention, in what order and how you will check the result. In this workshop, planning comes before implementation.

7. **Specification, or spec** — A saved description of what the change must do and must not do. It makes the agreed behavior, acceptance checks and negative case readable outside the chat. A plan describes the approach; a spec describes the expected result.

8. **GitHub issue** — A durable work record on GitHub. Here it contains a reviewed, public-safe request, its actual fictional-source link and the agreed outcome. A drafted issue is not a created issue: look for its real URL.

9. **Pull request, or PR** — A proposal to merge changes from a head branch into a target branch. It shows the diff and provides a place for discussion, checks and review. Opening a PR does not merge it.

10. **Acceptance criterion** — One observable condition the change must satisfy. “The displayed count equals the displayed documents” is checkable; “the agent says it works” is not. Tests and a browser demonstration can provide different kinds of evidence.

11. **Negative case** — A check that something unwanted does not happen. For this workshop, viewing a filtered list must not change any document's status. It helps protect behavior that should remain unchanged.

## Tools and reusable guidance

12. **Model Context Protocol, or MCP** — A standard way for an agent to connect to tools and context. An MCP server may expose reads or actions, depending on its implementation. Adding a server does not make every tool safe or authorize every call.

13. **WorkIQ (Microsoft Work IQ)** — Microsoft's integration for working with Microsoft 365 information under the signed-in user's permissions and applicable policies. This workshop uses an MCP-only connection to pre-enabled fictional training content. Local fixtures provide offline practice, not evidence of live WorkIQ retrieval.

14. **Agent skill** — A folder containing `SKILL.md`, with a name, description and reusable task guidance. Learners write their own skills after trying the tasks manually. A skill guides the model; it does not add account permissions or guarantee correct results.

15. **Repository instructions** — Standing guidance for work in a repository or a defined file scope. Unlike a task-focused skill, instructions describe conventions that apply more broadly. They should not contain a finished solution to this workshop's exercise.

16. **Automatic selection and explicit use** — Automatic selection means Copilot chooses a skill based on relevance, including its description. Explicit use means you ask for that named skill. Check loading evidence and output in both cases: explicit use does not prove automatic selection will happen.

17. **Plugin** — An installable package that groups agent capabilities or guidance. Some plugins include tools and ready-made skills. The learner plugin here contains only the three authored skills, without WorkIQ access or credentials; producing it is not the same as installing it.

## Packaging and sharing

18. **APM** — Agent Package Manager, the CLI used later to describe, lock and package the learner skills. It is not needed to run the local website. Its tool version is separate from your package version; `apm update` updates project dependencies, not the CLI itself.

19. **Manifest** — A package's description file. APM uses `apm.yml` for source identity, package version and selected content. A portable Agent Plugin has root `plugin.json` describing the exported plugin. These are different files with different roles.

20. **Lockfile** — A recorded resolution of package inputs, named `apm.lock.yaml` for APM. It helps make repeated packaging predictable; the packed lockfile also records integrity information. A lockfile is not a clinical validation, security approval or digital signature.

**Development dependency versus runtime content** — A development dependency supports authoring or build-time requirements. This workshop locks one pinned public baseline without deploying its guidance; portable export excludes that content but preserves its provenance. The runtime plugin still contains only the three learner-authored skills and metadata.

21. **Format version and package version** — **Agent Plugins 1.0** names the portable format; its schema URL contains `1.0.0`. Your package might independently be version `0.1.0`, while APM is `0.31.0`. Changing your package number does not change the format. The explicit APM format name is `agent-plugin`, not the legacy alias `plugin`.

22. **Git tag and GitHub release** — A tag names a point in Git history. A release adds a description and downloadable assets, such as your plugin ZIP. A draft release awaits a human's publication decision. Tags and checksums alone do not guarantee immutability; the repository's release setting and publication process matter.

## Review and optional administration

23. **Ruleset** — GitHub repository settings that apply rules to selected branches or tags. The workshop's branch ruleset requests cloud Copilot Code Review for PRs, including configured draft/new-push events. An authorized admin must configure it; eligibility, policy and credits still matter. A skill is not a ruleset or an approval.

24. **Marketplace** — A catalog that tells a client where plugins can be found. It is separate from the plugin's files and a release ZIP. Adding a marketplace does not automatically make it the only allowed source, install every entry or prove every client supports the package.

25. **Managed settings** — Administrator-controlled settings for covered accounts and supported clients. They can add marketplaces and require plugins to be enabled or disabled. They govern availability, not perfect model obedience or universal offline enforcement. A personal install or reviewed example configuration is not proof of an enterprise-managed rollout.
