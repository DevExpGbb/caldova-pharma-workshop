# Lab 11 — Version a package and release it deliberately

## Start here

- **Role:** participant as package maintainer; an authorized human chooses
  the release candidate and any publication action.
- **Duration:** 20 minutes in the full journey. Remote Actions waits may
  require a follow-up; do not omit the release stage to fit the clock.
- **Exact starting state:** all three learner skills and the verified `0.1.0`
  ZIP exist; `agent-package/apm.yml` and `agent-package/apm.lock.yaml` are
  saved. The feature PR remains subject to human review. No tag/release is
  assumed or required to exist.
- **Full-journey requirement:** prepare the handoff, then complete the
  human-authorized tag, draft verification, and deliberate publication.
  Run remote write steps only after explicit human confirmation naming the
  candidate and destination. A required lesson never grants automatic consent.

## Why

A version names a package revision. A [tag](../glossary.md) names the source
commit you choose to release. A draft release lets you inspect the actual
download before making it public. These are separate events, not a website
deployment.

## Actions

1. **Read the supplied workflow.** Open
   `.github/workflows/plugin-release.yml` in your editor. Identify:

   - The **tag push** trigger for `v*`, with stable `vMAJOR.MINOR.PATCH`
     validation—not ordinary pushes, a scheduled release, or an agent prompt.
   - Required authored skills, source manifest and committed lock.
   - Pinned/checksum-verified APM **0.31.0**, explicit portable pack and exact
     allowlist/version validation.
   - Exact pinned development-lock provenance, with no deployed baseline
     targets. Export reuses that committed lock offline; it does not resolve
     a floating dependency or require a runner's previous package cache.
   - The separate job that creates a **draft GitHub Release** with archive
     and checksum; human publication remains separate.

   App CI runs real npm checks independently. It does not require APM or
   WorkIQ. An ordinary starter push cannot create a plugin release; a tag
   without the learner-authored prerequisites must fail.

2. **Review and commit the package sources.** Inspect your manifest, lock,
   and three skills. Check the development pin, `is_dev: true`, content hash,
   declared license and empty deployments; keep that metadata intact.
   Keep the package version **0.1.0** for this first example.
   A future change to these skills might warrant **0.1.1**; that does not
   require changing the app's version, APM tool version, or schema version.

   **Cross-platform, read-only checks:**

   ```sh
   git status --short
   git --no-pager diff
   git rev-parse HEAD
   node scripts/verify-package.mjs .workshop/release/caldova-workshop-skills-0.1.0.zip 0.1.0
   ```

   Once reviewed, stage/commit only the intended source changes (the skills
   should already be committed from prior labs):

   ```sh
   git add agent-package/apm.yml agent-package/apm.lock.yaml
   git --no-pager diff --cached --stat
   ```

   Inspect the complete staged content and exclude unrelated staged files.
   Only after human review:

   ```sh
   git commit -m "Prepare version 0.1.0 of workshop skills"
   git push
   git rev-parse HEAD
   ```

   Use the existing personal-repository branch upstream. Do not commit
   `.workshop/package`, `.workshop/release`, or native tool binaries.

3. **Choose the exact candidate, not “whatever is latest.”** Confirm the new
   source commit includes all three authored skills, source manifest/lock,
   and the reviewed release workflow. Check the actual CI/review for that
   candidate and retain the human decision. If new commits arrive, reassess.

   Handoff prompt:

   ```text
   Prepare a read-only release handoff for caldova-workshop-skills 0.1.0.
   Use only my three authored skills, agent-package/apm.yml, the saved source
   lock, the release workflow, verifier output, and actual candidate check
   receipts for <REVIEWED_CANDIDATE_SHA> in <OWNER/REPO>.
   Do not inspect instructor reference answers or unrelated files.
   List missing evidence and confirm the intended tag is v0.1.0, matching
   the package version. Do not commit, tag, push, merge, dispatch a workflow,
   create/publish a release, change settings, or deploy anything.
   ```

   In the **abbreviated track**, this handoff may be the stopping point.
   In the **full journey**, continue through the real release steps after
   human confirmation. If confirmation or evidence is missing, leave the
   release checkpoint pending and arrange a follow-up; do not call it complete.

4. **After explicit authorization, have a human create the tag.** The human
   must explicitly choose `<REVIEWED_CANDIDATE_SHA>`, `v0.1.0`, and **their own
   repository**. Verify that tag/release does not already exist. Only then,
   as that human, run:

   **Cross-platform; replace the SHA placeholder before running:**

   ```sh
   git tag -a v0.1.0 <REVIEWED_CANDIDATE_SHA> -m "Caldova workshop skills 0.1.0"
   git push origin v0.1.0
   ```

   A tag push publishes that ref and triggers the workflow. Do not use
   `--force`, push all tags, or move an existing release tag to new code.
   This does not merge the feature PR.

5. **Observe the actual draft, then decide publication separately.** On
   GitHub, open **Actions**, select the run for the exact tag and source SHA,
   and inspect validation/packaging jobs. A successful app CI run is not a
   successful package-release run.

   Open the resulting **draft** under **Releases**. Verify the candidate,
   version, archive name, and `.sha256` sidecar. Download both assets into
   a separate directory; compare the SHA-256 of the downloaded ZIP to the
   sidecar before trusting it.

   **macOS, in the download directory:**

   ```sh
   shasum -a 256 --check caldova-workshop-skills-0.1.0.zip.sha256
   ```

   **Linux, in the download directory:**

   ```sh
   sha256sum --check caldova-workshop-skills-0.1.0.zip.sha256
   ```

   **PowerShell, in the download directory:**

   ```powershell
   $expected = (Get-Content caldova-workshop-skills-0.1.0.zip.sha256 -Raw).Trim().Split()[0]
   $actual = (Get-FileHash caldova-workshop-skills-0.1.0.zip -Algorithm SHA256).Hash
   if ($actual.ToLowerInvariant() -ne $expected.ToLowerInvariant()) { throw "Package checksum mismatch; stop" }
   ```

   Then run the repository verifier against that downloaded path from the
   App checkout:

   ```sh
   node scripts/verify-package.mjs "<DOWNLOADED_ZIP_PATH>" 0.1.0
   ```

   A checksum detects changed bytes; it is **not a digital signature**.
   Optional release immutability is admin hardening, not assumed merely
   because a tag/checksum exists. See
   [GitHub's release integrity guidance](https://docs.github.com/en/code-security/concepts/supply-chain-security/immutable-releases).

   Only an authorized human who has reviewed the exact draft/assets should
   choose **Publish release** on GitHub. Record draft versus published state
   precisely. No automatic publication or website deployment is part of this
   course's workflow.

## Checkpoint

Record the strongest completed state—**handoff**, **tagged**, **draft created**,
or **published by a human**—with actual source SHA, version, URLs and hashes
where available. Do not infer later states from an earlier one.

The **full-journey release checkpoint** requires the reviewed source tag,
actual successful packaging/draft run, verified downloaded assets, and the
human-published release URL. A handoff or draft is useful progress, not the
completed full release stage. If the human does not authorize publication,
stop and record it as pending; never publish merely to obtain a completion mark.

## Recovery

- **Missing source skills/lock or version mismatch:** fix/review source and
  choose the appropriate new candidate/version. Do not weaken the release gate.
- **Tag or draft already exists:** stop and inspect it. Never force-overwrite
  a tag, delete a release to retry, or replace assets as an automatic recovery.
- **Workflow/permissions failure:** save the actual failing run and ask the
  owner; don't broaden credentials or add admin privileges.
- **No Actions/release entitlement:** keep the verified local ZIP and honest
  handoff, and arrange the missing release work later. A local artifact is
  not a GitHub Release or full-journey completion.

## Next

Continue to [Lab 12 — Distribution and managed-configuration review](12-managed-distribution.md).
The lesson is included for every participant; only applying enterprise settings
is optional and reserved for an authorized owner. [Course index](../README.md).
