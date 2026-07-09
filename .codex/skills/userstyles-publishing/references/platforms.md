# Platform Notes

Read this before live publishing or troubleshooting platform-specific behavior. Platform UIs and undocumented endpoints can change; if a step fails, verify the live site before changing repo files.

## UserStyles.world

User profile: <https://userstyles.world/user/Nick2bad4u>

Use for `.user.css` UserCSS/UserStyle files.

Preferred flow:

1. Open UserStyles.world in an authenticated browser session.
2. Search the user's profile for the style name from `@name`.
3. If an existing style exists, update/import/mirror that listing instead of creating a duplicate.
4. If creating a new style, use the raw GitHub `@downloadURL` as the source/import URL when the UI supports it. Otherwise paste the local CSS content.
5. Add a preview image from `assets/previews/<style-slug>.png`. Prefer upload when editing a listing; use a raw GitHub preview image URL only if upload is inconvenient.
6. Verify the listing page shows the expected `@name`, `@version`, description, target domain, license, preview image, and install button.
7. For mirror refreshes of existing style IDs, the repo's `UserstyleWorld-SyncStyles.user.js` can visit `https://userstyles.world/mirror/<styleID>` from an authenticated page.

Useful source links:

- UserStyles.world repository: <https://github.com/userstyles-world/userstyles.world>
- UserStyles.world docs folder: <https://github.com/userstyles-world/userstyles.world/tree/main/docs>
- UserCSS format reference: <https://github.com/openstyles/stylus/wiki/Usercss>

## Greasy Fork

User profile: <https://greasyfork.org/en/users/872842-nick2bad4u>

Use for `.user.js` userscripts.

Preferred flow:

1. Open Greasy Fork in an authenticated browser session.
2. Search the user's profile and the script title before creating a new script.
3. For a new script, create from the local `.user.js` content or from the raw GitHub URL when the UI supports import.
4. For an update, use the existing script edit/update page and preserve the script ID. If the metadata already has Greasy Fork `@downloadURL` or `@updateURL`, keep those platform URLs unless intentionally migrating back to GitHub raw URLs.
5. Add the preview image from `assets/previews/<style-slug>.png` as an attachment for CSS style listings.
6. Review Greasy Fork warnings carefully. Fix code-rule, external-resource, license, and metadata issues locally before submitting.
7. Verify the public script page, version, license, preview/attachment, and update URL after submit.

Useful source links:

- Greasy Fork user-script API docs: <https://greasyfork.org/en/help/api>
- Greasy Fork code rules: <https://greasyfork.org/en/help/code-rules>
- Greasy Fork script posting/update route behavior is session-based; do not store the session cookie or authenticity token in the repo.

## Authentication Rules

- Never ask the user for a password in chat.
- Never write cookies, tokens, or browser storage exports into the repo.
- If login, 2FA, CAPTCHA, or moderation review blocks publishing, stop and report the exact blocker.
- Do not mark a publish complete until the public page is reachable and shows the expected version.
