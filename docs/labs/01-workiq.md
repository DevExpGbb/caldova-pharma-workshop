# Lab 01 — Read a fictional request with WorkIQ

## Start here

- **Role:** participant with a facilitator-provided authorized training account.
- **Duration:** 20 minutes in the full journey.
- **Exact starting state:** Lab 00 passes, the same App checkout is open, and
  no intake skill is installed. The facilitator has pre-enabled WorkIQ access,
  billing assignment and tenant consent, and seeded the **exact public
  fictional fixture** `CAL-TEAMS-001` in the authorized training tenant.
- **Alternative:** if those prerequisites are absent, use step 5 for clearly
  labeled offline practice. Do not create cloud resources.

## Why

A [tool](../glossary.md) retrieves information; a skill will later describe a
repeatable way to use it. Learn to verify the source before asking Copilot to
turn a conversation into work.

## Actions

1. **Confirm the account and source with the facilitator.** Read the
   [public fixture](../../fixtures/teams-request.md). The authorized live
   exercise retrieves only that seeded fiction, not “whatever recent work
   messages seem relevant.” Node is already installed from setup.

   WorkIQ has separate licensing/billing and consent requirements. Current
   Learn describes GA; its public repository still includes preview language.
   See the [preflight explanation](../capabilities.md). A GitHub Copilot
   subscription alone does not establish WorkIQ access.

2. **Configure MCP only.** In the App, open **Customize → MCP** and use the
   custom-server route. Follow the actual build's prompts to enter:

   | Connection setting | Value |
   | --- | --- |
   | Transport | Local / standard input-output (`stdio`) |
   | Command | `npx` |
   | Arguments, in order | `-y`, `@microsoft/workiq`, `mcp` |

   The full underlying command is:

   ```text
   npx -y @microsoft/workiq mcp
   ```

   Configure it in the App; do not leave a separate duplicate server running
   from a terminal. Exact dialog labels can differ by build; use the
   facilitator's verified mapping rather than guessing a catalog card.
   **Do not install the WorkIQ plugin**: it includes prebuilt skills that
   would contaminate the manual-first exercise.

3. **Complete human setup and restrict use.** Complete authentication and
   first-use EULA acceptance yourself after reviewing the prompts. Confirm
   the intended training account. Inspect the available tools and authorize
   only the query/read operations needed for this exercise. Do not enable
   blanket auto-approval, create/update/delete operations, or unattended
   consent. Seeing the MCP server in **Installed** is not proof of retrieval.

4. **Make one narrow read request.** Replace the training location with the
   exact name supplied by your facilitator:

   ```text
   Use only WorkIQ query/read operations to find the facilitator-seeded
   fictional training message CAL-TEAMS-001, "A quicker look at the document
   board", in <AUTHORIZED_TRAINING_LOCATION>. Retrieve its wording and retain
   the native citation in this private session. Do not search unrelated
   workplace content, accept an EULA for me, or write to Microsoft 365 or GitHub.
   Compare any quoted request text only with fixtures/teams-request.md in this
   checkout. Do not inspect instructor reference answers. If the exact seeded
   source cannot be identified, stop and say so; do not substitute another
   message or invent a citation.
   ```

   Inspect the actual read-tool result. Check the source ID and the short
   quotations **word for word** against the public file. Keep the native
   citation private: it may expose tenant/user identifiers. The public
   fixture permalink corroborates the fictional text; it is **not a native
   Teams link** and must never be labeled one.

5. **If live access fails, take the honest offline route.** Copy the request
   from [the same public fixture](../../fixtures/teams-request.md) and paste it
   into the App with:

   ```text
   OFFLINE FIXTURE PRACTICE — no WorkIQ retrieval occurred.
   Use only the CAL-TEAMS-001 public fixture text pasted below and its public
   fixture permalink. Do not use workplace tools or inspect instructor
   reference answers. Restate the request and identify questions; do not
   create an issue, code, or a native Teams citation.

   <PASTE_THE_EXACT_PUBLIC_FIXTURE_REQUEST_AND_PERMALINK>
   ```

   This is sufficient input for downstream labs, but it does **not** complete
   the live WorkIQ checkpoint. A facilitator demonstration is another honest
   option; record who observed what without publishing private account data.

## Checkpoint

Record one of these, not a blend:

- **Live:** actual WorkIQ query/read result, exact fictional source match,
  native citation retained privately, public-safe quotes verified.
- **Offline:** exact public fixture pasted, public provenance recorded,
  **live WorkIQ not completed**.

No issue has been created. No Microsoft 365 content was written or changed.

## Recovery

- **Wrong account, EULA, consent, billing, or search failure:** stop and ask the
  authorized facilitator. Do not provision resources or approve on another
  person's behalf.
- **Unexpected real content:** do not quote or publish it. Stop the retrieval
  and switch to the public fixture; follow the facilitator's privacy process.
- **Two WorkIQ connections or prebuilt skills appear:** ask the facilitator
  which authorized MCP-only configuration to keep. Do not disable mandated
  policy. Mark a contaminated comparison honestly.
- **No trace:** a convincing summary is not a live receipt. Use the offline
  label unless you can observe the actual source/tool result.

## Next

[Lab 02 — Turn the request into one issue manually](02-manual-intake.md).
[Course index](../README.md).
