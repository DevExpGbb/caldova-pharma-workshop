# Lab 12 — Distribute a plugin and review managed settings

## Start here

- **Role:** every participant completes distribution and configuration review.
  Only an authorized **training enterprise owner** may execute the optional
  live admin portion, with a covered participant on a clean approved client.
  Repository Admin is not enterprise ownership.
- **Duration:** 25 minutes in the full journey for the participant lesson.
  Optional live admin execution and propagation can take additional time.
- **Exact starting state:** the three skills have already been authored, the
  portable `0.1.0` archive passed verification, and its source/hash are known.
  Lab 11's real release is complete, or its missing evidence is explicitly
  pending. Even a completed release is not a substitute for the plugin source tree.
- **No default admin action:** all examples below are inert course text.
  Apply changes only after explicit human confirmation of the exact source
  commit, setting diff, training enterprise, and affected users.

## Why

A [marketplace](../glossary.md) tells clients where a plugin lives.
Enterprise-managed settings can require supported clients to install it.
Publishing a ZIP, personally installing it, and observing managed installation
are **three different outcomes**.

## Actions

1. **Separate the required lesson from optional admin execution.** Everyone
   works through the plugin/catalog, clean native installation, and additive
   configuration proposal. No enterprise owner is needed to review the
   fictional proposal. If you also execute it live, use only an authorized
   training enterprise whose owner has confirmed the covered users.
   Server-managed settings can affect everyone licensed by that enterprise,
   not just people with access to this workshop repo.

   Review the current [capability matrix](../capabilities.md#managed-plugin-support-is-not-universal)
   and [official managed settings guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started).
   Do not apply this exercise to an unrelated production enterprise.

2. **Materialize a real marketplace source from the verified ZIP.** In the
   learner repository, extract the **verified** archive using your OS archive
   tool to `.workshop/extracted`. Its root should be
   `.workshop/extracted/caldova-workshop-skills-0.1.0/`, containing root
   `plugin.json`, empty `mcp.json`, lock, and the three `skills/` folders.

   After verifying that path and inventory, this **cross-platform** command
   copies the generated portable plugin and refuses an existing destination:

   ```sh
   node -e "const fs = require('node:fs'); const dest = 'plugins/caldova-workshop-skills'; if (fs.existsSync(dest)) throw new Error('Destination exists; inspect before replacing'); fs.mkdirSync('plugins', { recursive: true }); fs.cpSync('.workshop/extracted/caldova-workshop-skills-0.1.0', dest, { recursive: true, errorOnExist: true, force: false });"
   ```

   The generated plugin is a distribution snapshot. Do not edit it as a
   second master; edit `.github/skills`, repack, verify, and deliberately
   refresh the snapshot for a future version.

3. **Create a catalog pointing to that directory.** In the learner repository,
   create `.github/plugin/marketplace.json` with this example. The identity
   is fictional training metadata; replace the owner name if appropriate.

   ```json
   {
     "name": "caldova-workshop",
     "owner": {
       "name": "Caldova Workshop Maintainers"
     },
     "plugins": [
       {
         "name": "caldova-workshop-skills",
         "description": "Three learner-authored Caldova workshop skills",
         "version": "0.1.0",
         "source": "./plugins/caldova-workshop-skills"
       }
     ]
   }
   ```

   `source` is relative to the **repository root**, not to the catalog file.
   The source directory **must exist in Git**. A Release asset does not
   populate that tree. The marketplace is a catalog; the portable package's
   manifest remains `plugins/caldova-workshop-skills/plugin.json`, not a
   replacement legacy `.github/plugin/plugin.json`.

   Review the generated content and catalog, then the authorized learner
   commits/pushes that specific set to their repository:

   **Cross-platform:**

   ```sh
   git add .github/plugin/marketplace.json plugins/caldova-workshop-skills
   git --no-pager diff --cached --stat
   ```

   Check the full staged files and exclude anything unrelated before:

   ```sh
   git commit -m "Add reviewed workshop plugin marketplace"
   git push
   git rev-parse HEAD
   ```

   Save the **full 40-character commit SHA**. On GitHub at that exact commit,
   verify both the catalog and plugin directory exist. Do not use a guessed
   SHA or a release-asset URL as the repository source.

4. **Verify a native install in a clean consumer.** This is part of the
   full participant journey, not proof of enterprise management. Use a clean
   approved consumer project **without** the author's `.github/skills`
   files. Never install the finished plugin before the authoring labs.
   Do not configure two installation owners for the same plugin.

   In the App, open **Customize → Plugins**, use marketplace settings to add
   your approved repository/Git URL, select the marketplace, find
   `caldova-workshop-skills`, and choose **Install**. Review the actual source
   and version shown by the client. Exact dialog fields vary by build.
   Confirm the catalog and plugin are present at the revision that this App
   configuration selects; a feature-branch push alone does not populate the
   repository's default revision.

   **Alternative: standalone Copilot CLI**, installed/preflighted separately:

   The unqualified `OWNER/REPO` example below uses the repository's default
   revision. Use it only if an authorized human has already made the reviewed
   catalog **and** plugin available there. A push to your authored feature
   branch alone is not enough. Do not merge a PR just to make the install
   command work.

   ```sh
   copilot plugin marketplace add OWNER/REPO
   copilot plugin marketplace browse caldova-workshop
   copilot plugin install caldova-workshop-skills@caldova-workshop
   copilot plugin list
   ```

   If the catalog is still only on your authored branch, the official CLI
   also supports a **local marketplace directory**. From the clean consumer,
   replace the first `marketplace add` command above with:

   ```sh
   copilot plugin marketplace add "<ABSOLUTE_PATH_TO_REVIEWED_AUTHOR_CHECKOUT>"
   ```

   That directory must contain the committed catalog and verified plugin
   from steps 2–3. Verify its branch/SHA beforehand and keep it unchanged
   during the installation test. Run the browse/install/list commands above
   afterward. This local native installation is not managed distribution or
   proof that the default-branch remote source is ready.

   These documented native commands install from the configured source;
   verify its actual revision before claiming an exact pinned installation.
   For the managed test below, prefer a separate clean consumer so a prior
   personal install cannot masquerade as automatic managed installation.
   If policy forbids a personal install, ask the facilitator for an authorized
   clean managed route or record installation pending; do not work around policy.

   Inspect `/skills` and test a draft-only invocation with a supplied public
   fixture. Do not assume course files are bundled:

   ```text
   Use the installed intake skill explicitly for this public fictional
   training text only. Do not inspect instructor reference answers or real
   workplace data. Draft only; create no issue and change nothing.
   If the installed skill or its load trace is unavailable, say so.

   <PASTE_CAL-MAIL-002_PUBLIC_REQUEST_AND_FIXTURE_PERMALINK>
   ```

   Record the actual installed source/version and observed load evidence.
   Listing alone is not invocation. If the client hides load traces, record
   that limitation rather than inventing evidence.

5. **Review an additive managed-settings proposal.** The authorized enterprise
   owner designates the configuration organization under **AI controls →
   Agents → Configuration source**. Its **`.github-private`** repository
   contains **`copilot/managed-settings.json` on the default branch**.

   This is a different repository from the learner's plugin catalog. Do not
   copy real existing enterprise configuration into this public workshop.
   An owner with an existing configuration source must preserve it and its
   policies; the exercise is not permission to replace that source.

   The following is an **add-only fragment to merge into the existing
   configuration**, not a replacement file. Replace `OWNER/REPO` with the
   reviewed marketplace repository and the ref with step 3's full SHA.
   If these keys/names already exist, reconcile with the owner; do not
   overwrite them silently.

   ```json
   {
     "extraKnownMarketplaces": {
       "caldova-workshop": {
         "source": {
           "source": "github",
           "repo": "OWNER/REPO",
           "ref": "<40-char reviewed commit>"
         },
         "autoUpdate": false
       }
     },
     "enabledPlugins": {
       "caldova-workshop-skills@caldova-workshop": true
     }
   }
   ```

   Explain each choice to a partner:

   - `extraKnownMarketplaces` **adds** discoverability; it is not an exclusive
     source restriction.
   - `enabledPlugins` set to `true` requires this plugin enabled/automatically
     installed for covered users.
   - A full commit ref and `autoUpdate: false` make the intended rollout
     explicit; users cannot override that managed update setting.
   - `strictKnownMarketplaces` is the **restriction** control, separate from
     adding a source. **Never insert an empty array: it denies all marketplace
     installation.** If restrictions already exist, the owner must preserve
     all approved sources and review whether this new one is allowed. Do not
     remove restrictions or block approved WorkIQ/other sources to make a demo.

   Proposal-only discussion prompt:

   ```text
   Explain the add-only marketplace proposal shown in this lab using only
   that fictional JSON, the reviewed public plugin metadata and the official
   managed-settings reference. Do not inspect instructor reference answers,
   real enterprise configuration, or workplace data. Identify source/version
   and supported-client prerequisites. Do not write files, overwrite policy,
   apply settings, install plugins, or claim enterprise enforcement.
   ```

6. **Optional, role-gated live admin execution.** Participants without this
   authorization finish with the completed configuration review from step 5
   and mark managed activation **not run**. The authorized owner reviews the
   exact diff in the configuration repository,
   the pinned plugin source, audience, existing restrictions and recovery
   plan. Only after explicit confirmation does that human use the normal
   approved process to commit/apply it to the configuration default branch.
   Course prompts must not apply it automatically.

   For the intended covered account, confirm the relevant enterprise supplies
   its Copilot license. If multiple billing entities apply, choose that
   enterprise under **Usage billed to**. Normal propagation is approximately
   one hour; restarting the client or signing in again triggers refresh.

   On a clean approved consumer, inspect **Customize → Installed / Skills**
   and `/skills`. Record the actual managed source and version shown. Repeat
   step 4's explicit draft-only invocation with the supplied public fixture.

   Save actual load evidence. Listing is not invocation; a prior personal
   install is not proof of managed activation.

   The admin may demonstrate a benign disallowed test plugin under
   **already-reviewed restrictions**. The add-only fragment alone does not
   promise such blocking. Never try bypasses, weaken policy, or add a global
   restrictive list just for this exercise.

## Checkpoint

For the **full participant lesson**, retain the actual catalog/plugin commit,
clean native-installation receipt and skill trial, plus your reviewed additive
configuration proposal. If an installation prerequisite was unavailable, record
that checkpoint pending. The proposal review remains required even when live
enterprise execution is unavailable.

Record enterprise execution separately:

- **Not run / configuration review only:** proposal reviewed; no admin
  settings changed. This is sufficient for the configuration-review portion.
- **Managed demonstration, if authorized:** settings revision, exact pinned
  marketplace commit, covered license/billing context, actual client
  installation and observed load behavior. Keep private account details private.

A personal installation is not evidence of managed distribution.

The supported-key matrix currently includes App, CLI, VS Code, cloud agent
and JetBrains. **Cloud Code Review is not separately listed**: do not infer
managed CCR delivery from that table. Server-managed fetch/cache limitations
also mean there is no blanket disconnected-client enforcement guarantee.

## Recovery

- **Plugin source missing:** add the verified extracted plugin to the catalog
  repository and commit it before selecting a pin. A release URL is not a fix.
- **Plugin not visible:** verify source commit, file paths, covered license,
  billing selection, current client support, and refresh; do not disable policy.
- **Existing policy conflict:** stop and let the authorized owner reconcile
  it using the normal process, preserving approved sources.
- **No enterprise owner or training scope:** finish with proposal review or
  an authorized facilitator demonstration. Mark admin activation **not run**.
- **Fetch/offline failure:** retain the failure receipt; do not claim a policy
  applied merely because JSON is valid.

## Next

Return to the [course index](../README.md). You have followed a request from
fictional source to a tested change and reusable skills. Keep the evidence
and human decisions alongside the artifacts, not just the final ZIP.
