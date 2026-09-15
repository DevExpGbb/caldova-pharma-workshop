# Lab 10 — Package only your three skills

## Start here

- **Role:** participant as package author.
- **Duration:** 25 minutes in the full journey with preflighted downloads; allow extra
  time for a first native-tool download.
- **Exact starting state:** you authored and tested `intake`, `plan-to-spec`,
  and `code-review`; all three have real bodies under `.github/skills`.
  The same App checkout contains the supplied packaging helpers and
  `agent-package/apm.yml.example`. No active source manifest is assumed.
- **Output:** a verified `caldova-workshop-skills-0.1.0.zip`.

**Rehearsal caveat:** the positive real APM route is **NOT REHEARSED** for this
workshop build because mandatory-package policy stopped the rehearsal **at
`apm lock`, before a lockfile was produced**. Structural unit fixtures are
not a successful APM pack. Read the
[evidence status and authorized recovery](../capabilities.md#package-rehearsal-status)
before starting; app checks remain independent.

## Why

A [package](../glossary.md) lets someone else install your reusable work without
receiving the entire course or application. You will separate **authoring
source**, **generated staging**, and **release output**.

## Actions

1. **Understand the three versions.** APM **0.31.0** is the tool. Your package
   starts at **0.1.0**. Agent Plugins schema **1.0.0** is the portable format.
   None of these is the website's version.

   Use the [official released APM reference](https://github.com/microsoft/apm/blob/8fd10ac5eafee7ca77d41cc34ba139d812fdacd5/packages/apm-guide/.apm/skills/apm-usage/package-authoring.md),
   not a preinstalled authoring plugin. No Python or runtime dependency is
   required for the native binary used here.

2. **Acquire the pinned native APM binary, if needed.** If your approved
   installation already reports `0.31.0` with `apm --version`, continue to
   step 3. Otherwise use the standalone download below. It stays inside the
   ignored `.workshop/tools` directory and only changes this terminal's PATH.
   **Do not overwrite a Homebrew/WinGet/Scoop-owned installation.**

   Select the archive matching your machine from the
   [official v0.31.0 release](https://github.com/microsoft/apm/releases/tag/v0.31.0).
   Linux native binaries require **glibc 2.35+**. Windows ARM machines must
   use the x64 binary via supported emulation; there is no native Windows ARM
   asset in this release.

   | Platform | Archive | Expected SHA-256 |
   | --- | --- | --- |
   | macOS Apple Silicon | `apm-darwin-arm64.tar.gz` | `3b985ba7355b3cd925fd384f43af7d2d4591254431df28f5d0163f16d3a13e81` |
   | macOS Intel | `apm-darwin-x86_64.tar.gz` | `82582957856aa5d15f432431470027e05bdc04cdeb75eff99973a941701a0700` |
   | Linux ARM64 | `apm-linux-arm64.tar.gz` | `256703569520bd60503c63a526b63cb6d0382d5b9bf68909d716f2198739dbae` |
   | Linux x64 | `apm-linux-x86_64.tar.gz` | `866d7f2cc095e858e52c4c81e2fc0acb99d1fb1948fe5464165bb362d08e9645` |
   | Windows x64 | `apm-windows-x86_64.zip` | `a5b2b46378f560b3a2c4ff0c8a5e027cb851c5220ca8a31f9a44f9667ddb0f01` |

   These digests are pinned from the public release metadata. Verify the
   actual downloaded bytes **before extraction or execution**. A mismatch
   stops the exercise; do not skip the check or substitute a floating version.

   **macOS/Linux — from your actual App repository root.** Replace both
   placeholders from the same table row:

   ```sh
   mkdir -p .workshop/tools
   cd .workshop/tools
   ASSET="<ARCHIVE_FROM_TABLE>"
   EXPECTED="<SHA256_FROM_SAME_ROW>"
   curl --fail --location --show-error --output "$ASSET" "https://github.com/microsoft/apm/releases/download/v0.31.0/$ASSET"
   ```

   **macOS hash check:**

   ```sh
   printf '%s  %s\n' "$EXPECTED" "$ASSET" | shasum -a 256 --check -
   ```

   **Linux hash check:**

   ```sh
   printf '%s  %s\n' "$EXPECTED" "$ASSET" | sha256sum --check -
   ```

   Stop unless the result is **OK**. Then **macOS/Linux**:

   ```sh
   tar -tzf "$ASSET"
   tar -xzf "$ASSET"
   export PATH="$PWD/${ASSET%.tar.gz}:$PATH"
   apm --version
   cd ../..
   ```

   Keep the complete extracted directory beside its executable; do not copy
   only the binary over a system install. The archive has a platform-named
   top directory. If the inventory differs, stop and ask the facilitator.

   **Windows PowerShell — alternative, from the actual App repository root:**

   ```powershell
   $ErrorActionPreference = "Stop"
   New-Item -ItemType Directory -Force .workshop/tools | Out-Null
   $asset = ".workshop/tools/apm-windows-x86_64.zip"
   $expected = "a5b2b46378f560b3a2c4ff0c8a5e027cb851c5220ca8a31f9a44f9667ddb0f01"
   Invoke-WebRequest "https://github.com/microsoft/apm/releases/download/v0.31.0/apm-windows-x86_64.zip" -OutFile $asset
   if ((Get-FileHash $asset -Algorithm SHA256).Hash.ToLowerInvariant() -ne $expected) { throw "APM checksum mismatch; stop" }
   $destination = ".workshop/tools/extracted-apm-0.31.0"
   if (Test-Path $destination) { throw "Extraction directory already exists; inspect it before continuing" }
   Expand-Archive -Path $asset -DestinationPath $destination
   $binary = @(Get-ChildItem $destination -Filter apm.exe -Recurse -File)
   if ($binary.Count -ne 1) { throw "Expected exactly one APM executable" }
   $env:Path = "$($binary[0].DirectoryName);$env:Path"
   apm --version
   ```

   Confirm **0.31.0** before any pack command. Do not disable OS security
   controls if execution is blocked; consult the facilitator. A new terminal
   needs the same approved PATH setup again.

3. **Intentionally create the source manifest.** Back at the repository root,
   use this **cross-platform** command; it refuses to overwrite an existing
   manifest:

   ```sh
   node -e "const fs = require('node:fs'); fs.copyFileSync('agent-package/apm.yml.example', 'agent-package/apm.yml', fs.constants.COPYFILE_EXCL)"
   ```

   Open `agent-package/apm.yml`. Check package identity
   `caldova-workshop-skills`, quoted version `"0.1.0"`, `dependencies: {}`,
   and these exact includes:

   ```yaml
   includes:
     - .apm/skills/intake/SKILL.md
     - .apm/skills/plan-to-spec/SKILL.md
     - .apm/skills/code-review/SKILL.md
   ```

   These are **staging paths**. Keep editing your canonical source under
   `.github/skills`, not a second `.apm/skills` master tree. The source
   manifest is deliberately under `agent-package`, not the repository root.

4. **Stage, create the lock, and remember it.** Run each command in order and
   stop on any failure. **Cross-platform:**

   ```sh
   apm --version
   node scripts/package.mjs stage
   cd .workshop/package
   apm lock
   cd ../..
   node scripts/package.mjs remember-lock
   ```

   `stage` validates all three authored skills and copies only the explicit
   allowlist into `.workshop/package`. `apm lock` creates the resolution record
   there. `remember-lock` saves it as `agent-package/apm.lock.yaml` for source
   control. This local-only manifest declares no guide/plugin dependencies,
   but organization policy still applies and can block the operation.
   A generated staging directory does not remove inherited repository or
   organization policy. If `apm lock` is blocked, stop here and use the
   policy recovery below; do not continue to `remember-lock` or packing.

   If a source skill or manifest changes, run `stage` again. Refresh/remember
   the lock when needed before packing. Do not fix generated staging by hand.

5. **Produce the portable archive, then verify it.**

   **Cross-platform, starting at the repository root:**

   ```sh
   node scripts/package.mjs stage
   cd .workshop/package
   apm pack --format agent-plugin --archive --archive-format zip --output ../release
   cd ../..
   node scripts/verify-package.mjs .workshop/release/caldova-workshop-skills-0.1.0.zip 0.1.0
   ```

   Use **`--format agent-plugin`**. `--format plugin` and bare `apm pack`
   are legacy-format choices. `--target` does not isolate source content,
   and `--output` changes the destination, not the input root.

6. **Inspect what you would distribute.** Open the verified ZIP using your
   operating system's archive viewer. Its entire file inventory is:

   ```text
   caldova-workshop-skills-0.1.0/
     plugin.json
     mcp.json
     apm.lock.yaml
     skills/intake/SKILL.md
     skills/plan-to-spec/SKILL.md
     skills/code-review/SKILL.md
   ```

   Root `plugin.json` selects
   `https://agent-plugins.org/schemas/1.0.0/plugin.schema.json` and identifies
   package `0.1.0`. Root `mcp.json` contains an empty `mcpServers` object;
   it grants no WorkIQ access. `apm.lock.yaml` records package integrity.
   No tests, fixtures, instructor answers, authoring adapter, course docs,
   or MCP credentials belong in this archive.

   Optional explanation prompt:

   ```text
   Explain the package boundary using only agent-package/apm.yml,
   agent-package/apm.lock.yaml, my three authored .github/skills files,
   and the verifier output I provide. Do not inspect instructor reference
   answers or other repository content, change files, install a plugin,
   publish, or claim behavioral validation from structural checks.
   ```

## Checkpoint

- APM reports `0.31.0`; any downloaded binary passed the pinned hash check.
- Your source manifest and saved lock exist.
- Real portable packing and the repository verifier both succeeded.
- The archive contains exactly your three skills and the three metadata files.
- Generated staging/output are not an editable master or intended Git content.

## Recovery

- **Missing/empty skill:** return to its authoring lab. Do not insert a stub
  merely to make packaging pass.
- **Manifest already exists:** inspect it; do not overwrite or run `apm init`
  over your work.
- **Organization policy requires packages or blocks a local-only bundle:**
  stop and consult the facilitator or authorized administrator. Never use
  `--no-policy`, weaken policy, or move the work merely to evade a restriction.
  Ask them to confirm a legitimate permitted training scope. A personal
  template copy may have different applicable policy, but this is not
  guaranteed and does not authorize bypassing an existing restriction.
  Keep the package checkpoint pending until the authorized path works;
  do not add unrelated required packages to this three-skill portable bundle
  without reconciling its scope. Do not publish private policy configuration
  or sensitive diagnostic details.
- **Wrong directory/version/format:** check `process.cwd()`, source manifest,
  `apm --version`, and the exact command. Correct source and restage.
- **Unexpected resource:** do not silently drop it or relax the verifier.
  This course is entrypoint-only; a future resource needs an explicit include
  **and** reviewed verifier allowlist adjustment.
- **Wrong digest, unsupported platform, or blocked native execution:** stop.
  Use a facilitator demonstration and label local packaging unrun; don't
  replace it with a dry run or a fake successful receipt.

## Next

[Lab 11 — Version and publish through a human release decision](11-version-and-release.md).
[Course index](../README.md).
