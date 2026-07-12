# Platform Notes

Read this before live publishing or troubleshooting platform-specific behavior. Platform UIs and undocumented endpoints can change; if a step fails, verify the live site before changing repo files.

## Real Screenshot Capture

Capture a publish preview only from the real target website with the userstyle installed and enabled.

1. Install the committed raw UserCSS in Stylus, or enable the existing local style.
2. Open a representative target page where the style's effect is clearly visible.
3. Verify the current URL matches a domain or URL rule in the UserCSS and confirm the style is active.
4. Capture the browser viewport at a useful desktop size, preferably 16:9. Do not substitute a generated graphic, mockup, title card, AI-created image, unstyled page, or another style's screenshot.
5. Save the screenshot to `assets/previews/<style-slug>.png`, keep it under 1 MB, and inspect the saved file visually.
6. Confirm the screenshot shows recognizable target-site content and the actual styled result. Check for account names, email addresses, tokens, private repository names, or other sensitive information before upload.

If the browser cannot expose or verify the installed style, stop and ask the user to capture or confirm the styled page. Do not manufacture a replacement preview.

## Browser File Uploads

Use the selected browser's supported file-chooser API for preview images. Read its `file-uploads` documentation before the first upload in a browser session.

1. Open the authenticated edit page and inspect the current DOM for the visible upload control.
2. Start waiting for the `filechooser` event before clicking that control.
3. Pass an absolute local path to `chooser.setFiles(...)`.
4. Verify the file input records the selected filename, then submit the platform form.
5. Verify the public page shows a complete, non-zero-size image hosted by the platform or listed as an attachment.

```js
const chooserPromise = tab.playwright.waitForEvent("filechooser", {
 timeoutMs: 10000,
});
await uploadButton.click();
const chooser = await chooserPromise;
await chooser.setFiles([
 "C:/Repos/UserStyles/assets/previews/<style-slug>.png",
]);
```

Do not use `locator.setInputFiles(...)`; this browser surface exposes uploads through the chooser object. On Chrome, if `setFiles(...)` fails, read the browser's `chrome-file-upload-troubleshooting` documentation before retrying or falling back to a raw GitHub image URL.

## UserStyles.world

User profile: <https://userstyles.world/user/Nick2bad4u>

Use for `.user.css` UserCSS/UserStyle files.

Preferred flow:

1. Open UserStyles.world in an authenticated browser session.
2. Search the user's profile for the style name from `@name`.
3. If an existing style exists, update/import/mirror that listing instead of creating a duplicate.
4. If creating a new style, use the raw GitHub `@downloadURL` as the source/import URL when the UI supports it. Otherwise paste the local CSS content.
5. Upload the inspected real screenshot at `assets/previews/<style-slug>.png` with the browser file-chooser flow above. Use a raw GitHub screenshot URL only when the upload flow remains unavailable after browser-specific troubleshooting; the image must still be an actual styled-site capture.
6. Save the edit and verify the listing page shows the expected `@name`, `@version`, description, target domain, license, screenshot, and install button. Confirm the screenshot resolves to a UserStyles.world-hosted URL, has non-zero natural dimensions, and still visibly represents the target website and style.
7. Re-open the user's newest profile page after publishing. For batches, also inspect the moderation log before claiming durable completion.
8. For mirror refreshes of existing style IDs, the repo's `UserstyleWorld-SyncStyles.user.js` can visit `https://userstyles.world/mirror/<styleID>` from an authenticated page.

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
5. Add the verified real screenshot from `assets/previews/<style-slug>.png` as an attachment for CSS style listings using the browser file-chooser flow above.
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
