# Repo Conventions

Use this reference for `C:\Repos\UserStyles` metadata edits and validation choices.

## Artifact Types

- UserStyles.world target: `.user.css` files with a `/* ==UserStyle== ... ==/UserStyle== */` block.
- Greasy Fork target: `.user.js` files with a `// ==UserScript== ... // ==/UserScript==` block.
- Do not assume a CSS userstyle belongs on Greasy Fork. Route CSS to UserStyles.world unless the user explicitly requests otherwise and the platform accepts it.

## Metadata Defaults

Prefer these existing repo conventions when creating or repairing metadata:

```text
@namespace    nick2bad4u.github.io
@homepageURL  https://github.com/Nick2bad4u/UserStyles
@supportURL   https://github.com/Nick2bad4u/UserStyles/issues
@author       Nick2bad4u
@license      UnLicense
```

Default to `@license UnLicense` for Nick2bad4u-owned metadata, including forks the user asks to publish under their account. Keep upstream attribution in `@author`, notes, or additional info when the style is derived from another project.

Use the file-specific raw GitHub URL for both `@downloadURL` and `@updateURL` unless the artifact is already platform-managed, such as a Greasy Fork update URL for an existing userscript.

For files on `main`, build raw URLs as:

```text
https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/<path-from-repo-root>
```

URL-encode spaces and special characters in the path. Preserve path case exactly.

## Required Fields

For UserCSS/UserStyle:

- `@name`
- `@version`
- `@namespace`
- `@description`
- `@author`
- `@license`
- `@downloadURL`
- `@updateURL`
- At least one target rule in the CSS body, usually `@-moz-document domain(...)` or `url-prefix(...)`.

For publish-ready userstyles, capture the real target website with the style installed and enabled, then save the screenshot at `assets/previews/<style-slug>.png`. Use a 16:9 PNG under 1 MB. The image must visibly show recognizable target-site content and the style's actual effect. Generated mockups, AI-created images, title cards, placeholders, unstyled captures, and reused screenshots are not publish-ready.

When several artifacts apply substantially identical CSS to different domains, prefer one multi-domain userstyle. Publish separate listings only when they provide meaningful site-specific behavior and each has its own real screenshot.

For userscripts:

- `@name`
- `@namespace`
- `@version`
- `@description`
- `@author`
- `@license`
- At least one of `@match`, `@include`, or `@exclude`.
- `@downloadURL` and `@updateURL` for stable update behavior, unless the platform injects its own Greasy Fork URLs after publish.

## Versioning

When updating a public listing, compare against the published version first. If the code changed, bump the metadata version. Use the existing style in the file: many repo styles use simple decimal versions such as `3.5`; userscripts may use semver-like versions.

## Validation

Run the smallest meaningful validation first:

- Screenshot review: inspect `assets/previews/<style-slug>.png` and verify it shows the target website with the style active, contains no sensitive information, is 16:9, and is under 1 MB.
- CSS metadata/report: `node .\.codex\skills\userstyles-publishing\scripts\inspect-artifact.mjs .\File.user.css --markdown`
- CSS lint: `npm run lint:css`
- JS syntax: `node --check .\File.user.js`
- JS lint: `npm run lint -- File.user.js`
- Full repo confidence before broad publishing: `npm run lint:all`

If a command fails because of unrelated existing repo issues, report that boundary instead of widening the edit.
