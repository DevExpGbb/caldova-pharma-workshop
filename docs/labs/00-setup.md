# Lab 00 — Open your own working board

## Start here

- **Role:** participant; facilitator helps with account/device setup.
- **Duration:** 20 minutes in the full journey.
- **Exact starting state:** you have the public starter URL, but have not made
  a learner issue, feature, skill, or plugin installation. Git and Node
  **24.21.0 LTS** are installed; your paid Copilot account and App access are
  preflighted. Use at least 24.21.0 within Node 24 LTS, not an arbitrary “latest.”
- **Finish with:** your own repository, an Interactive App session, and six
  documents visible in the browser with no filter.

Obtain Node from the [official Node 24.21.0 release downloads](https://nodejs.org/dist/v24.21.0/)
or your administrator-approved installation route, checking the publisher's
checksums for a downloaded archive. Do not try to install the Node runtime
as an npm package; npm is used here for the app's dependencies after Node
is installed.

## Why

Copilot edits files in a [checkout](../glossary.md). If your browser serves a
different checkout, you can make a correct change and never see it. Establish
one location now so the rest of the workshop is predictable.

## Actions

1. **Create your personal copy on GitHub.** On the public starter page, choose
   **Use this template → Create a new repository**. Select your account or an
   approved training organization, choose a name, and create the repository.
   The template is already enabled; you do not need upstream administrator
   changes. Write down your new `OWNER/REPO` and URL.

   Use the new copy for every issue, commit, PR, tag, and package exercise.
   Never use the shared upstream as your practice destination. Repository
   visibility must follow the facilitator's rules; all published content must
   remain public-safe fiction even if your copy is private.

2. **Add your copy to the App.** Install the
   [GitHub Copilot App](https://github.com/features/ai/github-app), open it, and
   complete **Sign in to GitHub** yourself. In **Projects**, use **+** and add
   your GitHub repository (or its existing local clone). Start an **Interactive**
   project session. Do not ask for an implementation yet.

   The App may create a session worktree separate from the initial clone.
   Ask this read-only question:

   ```text
   Before we start, report this session's exact working-directory path, Git
   repository root, current branch, origin, and HEAD commit using read-only
   commands. Confirm it is my personal training repository: <OWNER/REPO>.
   Read only repository metadata and README.md. Do not inspect instructor
   reference answers, create instructions/skills, or implement anything.
   ```

3. **Open a terminal in that exact App checkout.** Use your terminal's change
   directory command with the path just reported. Replace the placeholder.

   **Cross-platform:**

   ```sh
   cd "<ACTUAL_APP_CHECKOUT>"
   node --version
   git --version
   node -p "process.cwd()"
   git rev-parse --show-toplevel
   git branch --show-current
   git remote -v
   git status --short
   ```

   Confirm Node is the expected 24 LTS version and `origin` is **your copy**.
   Keep the App's authored branch; do not switch to another branch or create
   a second worktree behind its back. Write down the exact path and branch.

4. **Run the unsolved starter.** In that terminal:

   **Cross-platform:**

   ```sh
   npm ci
   npm run dev
   ```

   Open **http://127.0.0.1:5173**. Leave this terminal running. You should see
   “Caldova Pharma” and the lab document board: IDs `CDOC-101` through `CDOC-106`,
   titles, teams, and editorial labels. There are no filter controls yet.
   Do not change any statuses. The notice says this is fictional training data.

5. **Check the baseline in a second terminal.** Change to the **same exact**
   checkout, then run:

   **Cross-platform:**

   ```sh
   npm test
   npm run build
   npm run check
   ```

   `npm ci` installs the committed dependency lock; `dev` serves locally;
   `test` checks behavior; `build` prepares static output; `check` runs the
   repository's combined checks. No APM, WorkIQ, model call, or workplace
   account is needed for these commands.

6. **Protect the learning baseline.** Open **Customize → Installed** and
   **Customize → Skills**; enter `/skills` in the App. Note any installed
   intake, planning, review, or productivity skills that overlap the labs.
   Disable overlaps only when your organization and the setting allow it.
   Never bypass managed policy. If they cannot be disabled, label affected
   comparisons **contaminated draft practice**.

   Do not install a prepared workflow/plugin, root instruction file, or
   solution skill. Instructor reference files are deliberately inert, but
   Copilot can still read them if asked; exclude them from your task context.

## Checkpoint

- Your repository URL and terminal `origin` match.
- The App, both terminals, and the dev server use the same actual path/branch.
- All six records are visible; no filter is present.
- Baseline test/build/check commands succeeded, or you recorded their exact
  failures for the facilitator.
- You have an honest record of installed-skill overlaps.

## Recovery

| Problem | Do this |
| --- | --- |
| `npm` is missing or Node is too old | Install the approved Node 24 LTS build, reopen the terminal, and rerun the version check. Do not change dependencies to work around it. |
| npm warns that an esbuild install script is not approved | Run the test/build checks. The rehearsed install used the native optional package and built successfully without approving that script. If your build fails, show the exact error to the facilitator; do not grant blanket script approval. |
| Port 5173 is occupied | Stop **your known** old dev server with Ctrl+C in its terminal, then restart here. Strict-port failure is deliberate; don't keep using an unrelated page on 5174. |
| Browser looks different from App edits | Compare actual checkout paths first. Stop the old server and start the server from the App checkout. |
| Origin is the upstream | Stop before writing. Add/open your personal template copy in Projects and repeat the path check. |
| App access or policies block you | Ask the facilitator; use an authorized demonstration rather than changing organization policy. |

Do not “fix” setup by installing finished skills or copying an instructor answer.

## Next

[Lab 01 — Retrieve the fictional request with WorkIQ](01-workiq.md).
[Course index](../README.md).
