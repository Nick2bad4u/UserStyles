---
name: userstyles-publishing
description: Validate, prepare, publish, and update Nick2bad4u/UserStyles `.user.css` UserCSS/UserStyle files on UserStyles.world and `.user.js` userscripts on Greasy Fork, including capturing and verifying real styled-site screenshots. Use when Codex is asked to publish, sync, update, mirror, validate metadata, prepare previews, generate release notes/descriptions, or troubleshoot publishing for artifacts in `C:\Repos\UserStyles`, `userstyles.world/user/Nick2bad4u`, or `greasyfork.org/en/users/872842-nick2bad4u`.
---

# UserStyles Publishing

## Overview

Use this skill to move a local userstyle or userscript from repo state to a safe publish/update on the user's UserStyles.world or Greasy Fork accounts. Keep the flow evidence-based: inspect the file, validate metadata, confirm the raw GitHub source, then publish through an authenticated session only when the user asked for a live publish.

## Quick Workflow

1. Confirm the target file and platform:
   - `.user.css` / `==UserStyle==`: UserStyles.world.
   - `.user.js` / `==UserScript==`: Greasy Fork.
   - If the user says "gf", treat it as Greasy Fork.
2. Run the local inspector:

```powershell
node .\.codex\skills\userstyles-publishing\scripts\inspect-artifact.mjs .\GarminConnectDark.user.css --markdown
```

3. Fix blocking metadata issues before publishing. Do not silently rewrite unrelated style/script code.
4. Run the narrow validation that matches the artifact:
   - CSS: `npm run lint:css -- --fix` only when fixing stylelint-safe issues, then `npm run lint:css`.
   - JS: `node --check .\File.user.js`, then a focused test or `npm run lint -- File.user.js` when practical.
   - Metadata-only changes: run the inspector again and, if practical, the relevant linter.
5. Ensure `@license` is `UnLicense` unless the user explicitly overrides it for that file.
6. Ensure `@downloadURL` and `@updateURL` point at the committed raw GitHub file on `main`. If the file is not pushed yet, tell the user publishing will use the previous remote content until pushed.
7. Install or enable the userstyle, open its target website, and capture an actual screenshot showing the style in effect. Save it as `assets/previews/<style-slug>.png`. Inspect it before publishing and confirm that it depicts the correct website, visibly demonstrates the style, and contains no sensitive information.
8. Reject generated mockups, AI-created artwork, title cards, placeholders, unstyled website captures, or reused screenshots as publish previews. If a real screenshot cannot be captured, stop and report that the artifact is not publish-ready.
9. Upload the verified local screenshot through the browser's file chooser. Use an absolute path, save the listing, and verify the public page serves the uploaded image. See the platform reference for the exact capture and upload flow.
10. Publish or update on the target platform with the platform-specific reference below.
11. Verify the public page after publishing and report the exact public URL, version, screenshot status, and any platform or moderation warnings.

## Repo Rules

Read [references/repo-conventions.md](references/repo-conventions.md) when adding or editing metadata, deciding which validation command to run, or generating raw GitHub URLs.

Important defaults:

- Preserve the existing `@namespace nick2bad4u.github.io`, `@homepageURL`, `@supportURL`, and author conventions. Default `@license` to `UnLicense` for Nick2bad4u styles unless the user explicitly overrides it.
- Do not store credentials, cookies, API keys, CSRF tokens, or session exports in this repo.
- Do not publish a new userstyle without a real screenshot of the style running on its target website. The user cannot waive this requirement for UserStyles.world publication.
- Do not use generated graphics, mockups, AI-created images, title cards, placeholders, or a screenshot from another style as a publish preview.
- Use the user's authenticated browser/session for live publishing. If blocked by login or 2FA, stop and ask the user to complete sign-in.
- Distinguish "prepared for publishing" from "actually submitted and verified".

## Platform References

Read [references/platforms.md](references/platforms.md) before live publishing or when the user asks about UserStyles.world or Greasy Fork behavior. Re-check live platform pages/docs if the UI or API has changed.

## Publishing Guardrails

- Treat publish/update/delete operations as live external mutations. Proceed only when the user explicitly asked for publishing or updating.
- Prefer updating an existing listing over creating a duplicate. Search the user's platform profile and the metadata title before creating a new entry.
- Before publishing several styles with substantially identical CSS, consolidate them into one multi-domain userstyle unless each listing has meaningful site-specific behavior and its own real screenshot. Do not batch-publish near-duplicate inversion styles.
- Before changing a published listing, compare the local version and description against the current public listing. If the local version is not greater than the published version, either bump it or explain why the platform accepts the update anyway.
- After a publish, open the public page and the install/update URL. Verify HTTP success and that the page shows the expected title/version.
- Re-check the platform profile and moderation log after batch publication. Immediate HTTP success proves submission, not durable moderation acceptance.
- For UserStyles.world mirrors, this repo contains `UserstyleWorld-SyncStyles.user.js`, which can visit mirror URLs for existing style IDs from an authenticated page. Use it only for mirror refreshes, not as proof that a new style was created.

## Useful Commands

```powershell
# Inspect one artifact and get a publish checklist.
node .\.codex\skills\userstyles-publishing\scripts\inspect-artifact.mjs .\GarminConnectDark.user.css --markdown

# Validate all userstyles.
npm run lint:css

# Validate one userscript syntax.
node --check .\SomeScript.user.js
```
