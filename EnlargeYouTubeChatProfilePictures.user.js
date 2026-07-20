// ==UserScript==
// @name         Enlarge YouTube Chat Profile Pictures
// @namespace    nick2bad4u.github.io
// @version      3.0.0
// @description  Shows a configurable HD preview of YouTube live-chat avatars; use this chat-only script or the combined profile-picture script, not both.
// @author       Nick2bad4u
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @match        https://www.youtube.com/*
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.registerMenuCommand
// @run-at       document-idle
// @updateURL    https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/EnlargeYouTubeChatProfilePictures.user.js
// @downloadURL  https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/EnlargeYouTubeChatProfilePictures.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @license      UnLicense
// @tag          youtube
// ==/UserScript==

void (async function () {
    "use strict";

    const STORAGE_KEY = "youtubeChatAvatarPreview.settings";
    const HOST_ID = "youtube-chat-avatar-preview-root";
    const CHAT_SCOPE_ATTRIBUTE = "data-nick-youtube-avatar-preview-chat";
    const SETTINGS_LIMITS = Object.freeze({
        hdTargetSize: { max: 2048, min: 180 },
        hoverDelay: { max: 1000, min: 0 },
        previewSize: { max: 640, min: 180 },
    });
    const DEFAULT_SETTINGS = Object.freeze({
        enabled: true,
        hdTargetSize: 1024,
        hoverDelay: 120,
        previewSize: 320,
        shape: "circle",
        showAuthor: true,
    });
    const SHAPES = new Set([
        "circle",
        "rounded",
        "square",
    ]);
    const CHAT_RENDERER_SELECTOR = [
        "yt-live-chat-text-message-renderer",
        "yt-live-chat-paid-message-renderer",
        "yt-live-chat-membership-item-renderer",
        "yt-live-chat-membership-milestone-chat-renderer",
        "yt-live-chat-paid-sticker-renderer",
        "yt-live-chat-ticker-paid-message-item-renderer",
        "yt-live-chat-ticker-sponsor-item-renderer",
        "ytd-sponsorships-live-chat-gift-purchase-announcement-renderer",
        "ytd-sponsorships-live-chat-gift-redemption-announcement-renderer",
        "yt-live-chat-sponsorships-gift-purchase-announcement-renderer",
        "yt-live-chat-sponsorships-gift-redemption-announcement-renderer",
    ].join(",");

    if (document.documentElement.hasAttribute(CHAT_SCOPE_ATTRIBUTE)) return;
    document.documentElement.setAttribute(CHAT_SCOPE_ATTRIBUTE, "chat-only");

    let settings = await readSettings();
    let ui;
    let pointerAvatar;
    let focusedAvatar;
    let pendingAvatar;
    let activeAvatar;
    let showTimer;
    let positionFrame;
    let loadSequence = 0;
    let settingsReadSequence = 0;
    let lastInteraction = "pointer";

    function clampInteger(value, { max, min }, fallback) {
        const number = Number(value);
        return Number.isFinite(number)
            ? Math.min(max, Math.max(min, Math.round(number)))
            : fallback;
    }

    function normalizeSettings(value) {
        let candidate = value;

        if (typeof candidate === "string") {
            try {
                candidate = JSON.parse(candidate);
            } catch {
                candidate = {};
            }
        }

        if (!candidate || typeof candidate !== "object") candidate = {};

        return {
            enabled:
                typeof candidate.enabled === "boolean"
                    ? candidate.enabled
                    : DEFAULT_SETTINGS.enabled,
            hdTargetSize: clampInteger(
                candidate.hdTargetSize,
                SETTINGS_LIMITS.hdTargetSize,
                DEFAULT_SETTINGS.hdTargetSize
            ),
            hoverDelay: clampInteger(
                candidate.hoverDelay,
                SETTINGS_LIMITS.hoverDelay,
                DEFAULT_SETTINGS.hoverDelay
            ),
            previewSize: clampInteger(
                candidate.previewSize,
                SETTINGS_LIMITS.previewSize,
                DEFAULT_SETTINGS.previewSize
            ),
            shape: SHAPES.has(candidate.shape)
                ? candidate.shape
                : DEFAULT_SETTINGS.shape,
            showAuthor:
                typeof candidate.showAuthor === "boolean"
                    ? candidate.showAuthor
                    : DEFAULT_SETTINGS.showAuthor,
        };
    }

    function settingsAreEqual(first, second) {
        return Object.keys(DEFAULT_SETTINGS).every(
            (key) => first?.[key] === second[key]
        );
    }

    async function persistSettings(value) {
        try {
            await GM.setValue(STORAGE_KEY, value);
            return true;
        } catch (error) {
            console.error(
                "Unable to save YouTube chat avatar settings.",
                error
            );
            return false;
        }
    }

    async function readSettings() {
        let stored;

        try {
            stored = await GM.getValue(STORAGE_KEY, DEFAULT_SETTINGS);
        } catch (error) {
            console.error(
                "Unable to read YouTube chat avatar settings.",
                error
            );
            return { ...DEFAULT_SETTINGS };
        }

        const normalized = normalizeSettings(stored);
        if (!settingsAreEqual(stored, normalized)) {
            await persistSettings(normalized);
        }
        return normalized;
    }

    function createElement(tagName, options = {}) {
        const element = document.createElement(tagName);
        if (options.className) element.className = options.className;
        if (options.text) element.textContent = options.text;

        for (const [name, value] of Object.entries(options.attributes || {})) {
            element.setAttribute(name, value);
        }

        return element;
    }

    function appendField(form, input, labelText, hintText) {
        const field = createElement("div", { className: "field" });
        const label = createElement("label", {
            attributes: { for: input.id },
            text: labelText,
        });
        const hint = createElement("span", {
            className: "hint",
            text: hintText,
        });
        field.append(label, input, hint);
        form.append(field);
    }

    function createNumberInput(id, limits, step) {
        const input = createElement("input", {
            attributes: {
                id,
                inputmode: "numeric",
                max: String(limits.max),
                min: String(limits.min),
                required: "",
                step: String(step),
                type: "number",
            },
        });
        return input;
    }

    function createToggle(id, labelText, hintText) {
        const field = createElement("label", { className: "toggle-field" });
        const copy = createElement("span", { className: "toggle-copy" });
        const label = createElement("span", {
            className: "toggle-label",
            text: labelText,
        });
        const hint = createElement("span", {
            className: "hint",
            text: hintText,
        });
        const input = createElement("input", {
            attributes: { id, type: "checkbox" },
        });
        const control = createElement("span", {
            attributes: { "aria-hidden": "true" },
            className: "switch",
        });
        copy.append(label, hint);
        field.append(copy, input, control);
        return { field, input };
    }

    function buildSettingsDialog(shadow) {
        const dialog = createElement("dialog", {
            attributes: {
                "aria-describedby": "ytcap-settings-description",
                "aria-labelledby": "ytcap-settings-title",
            },
            className: "settings-dialog",
        });
        const form = createElement("form", {
            attributes: { novalidate: "" },
        });
        const header = createElement("header");
        const eyebrow = createElement("span", {
            className: "eyebrow",
            text: "YouTube live chat",
        });
        const title = createElement("h2", {
            attributes: { id: "ytcap-settings-title" },
            text: "Avatar preview settings",
        });
        const description = createElement("p", {
            attributes: { id: "ytcap-settings-description" },
            text: "Tune the preview without changing YouTube’s own images or layout.",
        });
        header.append(eyebrow, title, description);
        form.append(header);

        const enabled = createToggle(
            "ytcap-enabled",
            "Enable avatar previews",
            "Show a preview on pointer hover or keyboard focus."
        );
        form.append(enabled.field);

        const previewSize = createNumberInput(
            "ytcap-preview-size",
            SETTINGS_LIMITS.previewSize,
            10
        );
        appendField(
            form,
            previewSize,
            "Preview size (px)",
            "180–640 pixels; automatically reduced on small viewports."
        );

        const hoverDelay = createNumberInput(
            "ytcap-hover-delay",
            SETTINGS_LIMITS.hoverDelay,
            10
        );
        appendField(
            form,
            hoverDelay,
            "Hover delay (ms)",
            "0–1000 milliseconds before the preview appears."
        );

        const hdTargetSize = createNumberInput(
            "ytcap-hd-size",
            SETTINGS_LIMITS.hdTargetSize,
            1
        );
        appendField(
            form,
            hdTargetSize,
            "HD image target (px)",
            "180–2048 pixels; keep this at least as large as the preview."
        );

        const shape = createElement("select", {
            attributes: { id: "ytcap-shape" },
        });
        for (const [value, label] of [
            ["circle", "Circle"],
            ["rounded", "Rounded square"],
            ["square", "Square"],
        ]) {
            const option = createElement("option", {
                attributes: { value },
                text: label,
            });
            shape.append(option);
        }
        appendField(
            form,
            shape,
            "Preview shape",
            "Choose how the enlarged avatar is cropped."
        );

        const showAuthor = createToggle(
            "ytcap-show-author",
            "Show author label",
            "Display the chat author’s current visible name."
        );
        form.append(showAuthor.field);

        const status = createElement("p", {
            attributes: { "aria-live": "polite" },
            className: "form-status",
        });
        const actions = createElement("footer", { className: "actions" });
        const reset = createElement("button", {
            attributes: { type: "button" },
            className: "button secondary reset",
            text: "Reset",
        });
        const cancel = createElement("button", {
            attributes: { type: "button" },
            className: "button secondary",
            text: "Cancel",
        });
        const save = createElement("button", {
            attributes: { type: "submit" },
            className: "button primary",
            text: "Save",
        });
        actions.append(reset, cancel, save);
        form.append(status, actions);
        dialog.append(form);
        shadow.append(dialog);

        const controls = {
            enabled: enabled.input,
            hdTargetSize,
            hoverDelay,
            previewSize,
            shape,
            showAuthor: showAuthor.input,
        };

        reset.addEventListener("click", () => {
            populateSettingsForm(controls, DEFAULT_SETTINGS);
            status.dataset.kind = "info";
            status.textContent = "Defaults loaded. Select Save to apply them.";
        });
        cancel.addEventListener("click", () => dialog.close());
        dialog.addEventListener("close", () => {
            status.textContent = "";
            delete status.dataset.kind;
        });
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            status.textContent = "";
            delete status.dataset.kind;

            const firstInvalid = Object.values(controls).find(
                (control) => !control.checkValidity()
            );
            if (firstInvalid) {
                firstInvalid.reportValidity();
                return;
            }

            const candidate = normalizeSettings({
                enabled: controls.enabled.checked,
                hdTargetSize: controls.hdTargetSize.valueAsNumber,
                hoverDelay: controls.hoverDelay.valueAsNumber,
                previewSize: controls.previewSize.valueAsNumber,
                shape: controls.shape.value,
                showAuthor: controls.showAuthor.checked,
            });

            if (candidate.hdTargetSize < candidate.previewSize) {
                status.dataset.kind = "error";
                status.textContent =
                    "HD image target must be at least as large as the preview.";
                controls.hdTargetSize.focus();
                return;
            }

            if (!(await persistSettings(candidate))) {
                status.dataset.kind = "error";
                status.textContent =
                    "Settings could not be saved. Check the userscript manager console.";
                return;
            }

            settings = candidate;
            clearInteraction();
            dialog.close();
        });

        return { controls, dialog, status };
    }

    function populateSettingsForm(controls, value) {
        controls.enabled.checked = value.enabled;
        controls.hdTargetSize.value = String(value.hdTargetSize);
        controls.hoverDelay.value = String(value.hoverDelay);
        controls.previewSize.value = String(value.previewSize);
        controls.shape.value = value.shape;
        controls.showAuthor.checked = value.showAuthor;
    }

    function ensureUi() {
        if (ui) {
            if (!ui.host.isConnected) {
                (document.body || document.documentElement).append(ui.host);
            }
            return ui;
        }

        const host = createElement("div", {
            attributes: { id: HOST_ID },
        });
        const shadow = host.attachShadow({ mode: "open" });
        const style = createElement("style");
        style.textContent = `
            :host {
                all: initial;
                color-scheme: light dark;
                font-family: Roboto, Arial, sans-serif;
            }

            *, *::before, *::after { box-sizing: border-box; }

            .preview-card {
                --avatar-size: 320px;
                position: fixed;
                z-index: 2147483646;
                display: grid;
                gap: 9px;
                inline-size: calc(var(--avatar-size) + 18px);
                padding: 9px;
                overflow: hidden;
                color: #f8fafc;
                background: rgb(15 18 24 / 96%);
                border: 1px solid rgb(255 255 255 / 16%);
                border-radius: 18px;
                box-shadow:
                    0 24px 64px rgb(0 0 0 / 42%),
                    0 4px 18px rgb(0 0 0 / 30%);
                pointer-events: none;
                isolation: isolate;
                opacity: 1;
                transform: translateZ(0) scale(1);
                transition: opacity 140ms ease, transform 140ms ease;
            }

            .preview-card[hidden] { display: none; }

            .image-frame {
                position: relative;
                display: grid;
                place-items: center;
                inline-size: var(--avatar-size);
                block-size: var(--avatar-size);
                overflow: hidden;
                background:
                    radial-gradient(circle at 30% 20%, rgb(255 255 255 / 14%), transparent 42%),
                    #242832;
                border-radius: 50%;
            }

            .preview-card[data-shape="rounded"] .image-frame { border-radius: 18%; }
            .preview-card[data-shape="square"] .image-frame { border-radius: 8px; }

            .preview-image {
                display: block;
                inline-size: 100%;
                block-size: 100%;
                object-fit: cover;
                opacity: 0.24;
                transition: opacity 160ms ease;
            }

            .preview-card[data-state="ready"] .preview-image,
            .preview-card[data-state="fallback"] .preview-image { opacity: 1; }

            .spinner {
                position: absolute;
                inline-size: 34px;
                block-size: 34px;
                border: 3px solid rgb(255 255 255 / 22%);
                border-block-start-color: #ff3b30;
                border-radius: 50%;
                animation: spin 700ms linear infinite;
            }

            .preview-card:not([data-state="loading"]) .spinner { display: none; }

            .fallback {
                position: absolute;
                display: none;
                max-inline-size: 80%;
                padding: 8px 11px;
                color: #fff;
                background: rgb(0 0 0 / 66%);
                border-radius: 999px;
                font-size: 12px;
                font-weight: 600;
                line-height: 1.25;
                text-align: center;
            }

            .preview-card[data-state="fallback"] .fallback,
            .preview-card[data-state="error"] .fallback { display: block; }

            .author {
                min-inline-size: 0;
                padding: 0 4px 2px;
                overflow: hidden;
                color: #f8fafc;
                font-size: 13px;
                font-weight: 600;
                line-height: 1.35;
                text-align: center;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .author[hidden] { display: none; }

            .visually-hidden {
                position: absolute;
                inline-size: 1px;
                block-size: 1px;
                padding: 0;
                overflow: hidden;
                clip: rect(0 0 0 0);
                white-space: nowrap;
                border: 0;
            }

            .settings-dialog {
                inline-size: min(520px, calc(100vw - 32px));
                max-block-size: min(760px, calc(100vh - 32px));
                padding: 0;
                overflow: auto;
                color: #e8eaed;
                background: #1f2128;
                border: 1px solid rgb(255 255 255 / 14%);
                border-radius: 20px;
                box-shadow: 0 28px 90px rgb(0 0 0 / 55%);
                pointer-events: auto;
            }

            .settings-dialog::backdrop {
                background: rgb(3 5 10 / 68%);
                backdrop-filter: blur(5px);
            }

            .settings-dialog form { padding: 28px; }
            .settings-dialog header { margin-block-end: 24px; }

            .eyebrow {
                display: block;
                margin-block-end: 6px;
                color: #ff665e;
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 0.12em;
                text-transform: uppercase;
            }

            h2 {
                margin: 0;
                color: #fff;
                font-size: 24px;
                line-height: 1.25;
            }

            header p {
                margin: 8px 0 0;
                color: #aeb3be;
                font-size: 14px;
                line-height: 1.5;
            }

            .field,
            .toggle-field {
                display: grid;
                gap: 7px;
                padding: 14px 0;
                border-block-start: 1px solid rgb(255 255 255 / 9%);
            }

            .field label,
            .toggle-label {
                color: #f3f4f6;
                font-size: 14px;
                font-weight: 600;
                line-height: 1.3;
            }

            .hint {
                display: block;
                color: #9aa0aa;
                font-size: 12px;
                line-height: 1.4;
            }

            input[type="number"], select {
                inline-size: 100%;
                min-block-size: 42px;
                padding: 8px 11px;
                color: #f8fafc;
                background: #15171c;
                border: 1px solid #464a54;
                border-radius: 10px;
                font: inherit;
                font-size: 14px;
                outline: none;
            }

            input[type="number"]:focus, select:focus, button:focus-visible {
                border-color: #ff665e;
                box-shadow: 0 0 0 3px rgb(255 59 48 / 24%);
            }

            .toggle-field {
                position: relative;
                grid-template-columns: 1fr auto;
                align-items: center;
                cursor: pointer;
            }

            .toggle-copy { display: grid; gap: 4px; }

            .toggle-field input {
                position: absolute;
                inline-size: 1px;
                block-size: 1px;
                opacity: 0;
            }

            .switch {
                position: relative;
                inline-size: 44px;
                block-size: 24px;
                background: #555b66;
                border-radius: 999px;
                transition: background 140ms ease;
            }

            .switch::after {
                position: absolute;
                inset-block-start: 3px;
                inset-inline-start: 3px;
                inline-size: 18px;
                block-size: 18px;
                background: #fff;
                border-radius: 50%;
                box-shadow: 0 1px 3px rgb(0 0 0 / 38%);
                content: "";
                transition: transform 140ms ease;
            }

            .toggle-field input:checked + .switch { background: #ff3b30; }
            .toggle-field input:checked + .switch::after { transform: translateX(20px); }

            .toggle-field input:focus-visible + .switch {
                box-shadow: 0 0 0 3px rgb(255 59 48 / 28%);
            }

            .form-status {
                min-block-size: 18px;
                margin: 14px 0 0;
                color: #aeb3be;
                font-size: 12px;
                line-height: 1.45;
            }

            .form-status[data-kind="error"] { color: #ff8a84; }
            .form-status[data-kind="info"] { color: #8ab4f8; }

            .actions {
                display: flex;
                gap: 10px;
                justify-content: flex-end;
                margin-block-start: 8px;
            }

            .button {
                min-block-size: 40px;
                padding: 8px 16px;
                color: #f8fafc;
                background: transparent;
                border: 1px solid transparent;
                border-radius: 999px;
                font: inherit;
                font-size: 13px;
                font-weight: 700;
                cursor: pointer;
            }

            .button.secondary { border-color: #555b66; }
            .button.secondary:hover { background: rgb(255 255 255 / 7%); }
            .button.primary { background: #ff3b30; }
            .button.primary:hover { background: #ff5148; }
            .button.reset { margin-inline-end: auto; }

            @keyframes spin { to { transform: rotate(1turn); } }

            @media (prefers-reduced-motion: reduce) {
                .preview-card, .preview-image, .switch, .switch::after { transition: none; }
                .spinner {
                    border-color: rgb(255 255 255 / 55%);
                    animation: none;
                }
            }

            @media (max-width: 420px) {
                .settings-dialog form { padding: 22px 18px; }
                .actions { flex-wrap: wrap; }
                .button { padding-inline: 14px; }
            }
        `;

        const card = createElement("aside", {
            attributes: {
                "aria-live": "polite",
                role: "tooltip",
            },
            className: "preview-card",
        });
        card.hidden = true;
        card.dataset.shape = DEFAULT_SETTINGS.shape;
        card.dataset.state = "loading";
        const frame = createElement("div", { className: "image-frame" });
        const image = createElement("img", {
            attributes: { decoding: "async" },
            className: "preview-image",
        });
        const spinner = createElement("span", {
            attributes: { "aria-hidden": "true" },
            className: "spinner",
        });
        const fallback = createElement("span", { className: "fallback" });
        const author = createElement("span", { className: "author" });
        const liveStatus = createElement("span", {
            className: "visually-hidden",
        });
        frame.append(image, spinner, fallback);
        card.append(frame, author, liveStatus);
        shadow.append(style, card);
        const settingsDialog = buildSettingsDialog(shadow);
        (document.body || document.documentElement).append(host);

        ui = {
            author,
            card,
            fallback,
            host,
            image,
            liveStatus,
            ...settingsDialog,
        };
        image.addEventListener("error", () => {
            if (!activeAvatar || card.hidden) return;
            card.dataset.state = "error";
            fallback.textContent = "Image unavailable";
            liveStatus.textContent = "The profile picture could not be loaded.";
        });
        return ui;
    }

    function getAvatarFromTarget(target) {
        if (!(target instanceof Element)) return undefined;

        const photo = target.closest("#author-photo");
        if (!photo) return undefined;

        const avatar = photo.matches("img")
            ? photo
            : photo.querySelector("img");
        if (!avatar || !avatar.closest(CHAT_RENDERER_SELECTOR))
            return undefined;
        return avatar;
    }

    function getAvatarFromFocusTarget(target) {
        const directAvatar = getAvatarFromTarget(target);
        if (directAvatar || !(target instanceof Element)) return directAvatar;

        const authorControl = target.closest(
            "#author-name, yt-live-chat-author-chip"
        );
        const renderer = authorControl?.closest(CHAT_RENDERER_SELECTOR);
        const photo = renderer?.querySelector("#author-photo");
        return photo?.matches("img") ? photo : photo?.querySelector("img");
    }

    function getAuthorName(avatar) {
        const renderer = avatar.closest(CHAT_RENDERER_SELECTOR);
        // YouTube intentionally repeats this component-local id for every
        // renderer, so avoid document-wide id lookup optimizations.
        const author = renderer?.querySelector('[id="author-name"]');
        return (
            author?.textContent?.replace(/\s+/g, " ").trim() ||
            "Chat participant"
        );
    }

    function getAvatarSource(avatar) {
        for (const source of [
            avatar.currentSrc,
            avatar.src,
            avatar.getAttribute("src"),
        ]) {
            if (!source) continue;

            try {
                const url = new URL(source, location.href);
                if (url.protocol === "https:" || url.protocol === "http:") {
                    return url.href;
                }
            } catch {
                // Try the next source supplied by the native image.
            }
        }

        return undefined;
    }

    function upgradeAvatarUrl(source, targetSize) {
        if (!source) return undefined;

        try {
            const url = new URL(source, location.href);
            if (url.protocol !== "https:" && url.protocol !== "http:") {
                return undefined;
            }

            const transformIndex = url.pathname.lastIndexOf("=");
            let upgraded = false;

            if (transformIndex >= 0) {
                const prefix = url.pathname.slice(0, transformIndex + 1);
                const transform = url.pathname.slice(transformIndex + 1);
                const resized = transform
                    .replace(/^s\d+(?=-|$)/i, () => {
                        upgraded = true;
                        return `s${targetSize}`;
                    })
                    .replace(/(^|-)w\d+(?=-|$)/gi, (match, separator) => {
                        upgraded = true;
                        return `${separator}w${targetSize}`;
                    })
                    .replace(/(^|-)h\d+(?=-|$)/gi, (match, separator) => {
                        upgraded = true;
                        return `${separator}h${targetSize}`;
                    });
                url.pathname = `${prefix}${resized}`;
            }

            for (const parameter of ["sz", "size"]) {
                if (/^\d+$/.test(url.searchParams.get(parameter) || "")) {
                    url.searchParams.set(parameter, String(targetSize));
                    upgraded = true;
                }
            }

            const hostname = url.hostname.toLowerCase();
            const isGoogleImageHost =
                hostname === "ggpht.com" || hostname.endsWith(".ggpht.com");
            if (!upgraded && isGoogleImageHost && !url.pathname.endsWith("=")) {
                url.pathname += `=s${targetSize}-c`;
            }

            return url.href;
        } catch {
            return source;
        }
    }

    function getViewport() {
        const viewport = window.visualViewport;
        return {
            height: viewport?.height || window.innerHeight,
            left: viewport?.offsetLeft || 0,
            top: viewport?.offsetTop || 0,
            width: viewport?.width || window.innerWidth,
        };
    }

    function getEffectivePreviewSize() {
        const viewport = getViewport();
        const labelAllowance = settings.showAuthor ? 58 : 24;
        const available = Math.min(
            viewport.width - 38,
            viewport.height - labelAllowance - 24
        );
        return Math.max(96, Math.min(settings.previewSize, available));
    }

    function positionPreview(avatar) {
        if (!ui || ui.card.hidden || !avatar.isConnected) return;

        const gutter = 12;
        const gap = 14;
        const viewport = getViewport();
        const anchor = avatar.getBoundingClientRect();
        const card = ui.card.getBoundingClientRect();
        const viewportRight = viewport.left + viewport.width;
        const viewportBottom = viewport.top + viewport.height;
        const anchorIsVisible =
            anchor.width > 0 &&
            anchor.height > 0 &&
            anchor.right > viewport.left &&
            anchor.left < viewportRight &&
            anchor.bottom > viewport.top &&
            anchor.top < viewportBottom;
        if (!anchorIsVisible) {
            clearInteraction();
            return;
        }

        const rightCandidate = anchor.right + gap;
        const leftCandidate = anchor.left - gap - card.width;
        let left;

        if (rightCandidate + card.width <= viewportRight - gutter) {
            left = rightCandidate;
        } else if (leftCandidate >= viewport.left + gutter) {
            left = leftCandidate;
        } else {
            left = anchor.left + anchor.width / 2 - card.width / 2;
        }

        const centeredTop = anchor.top + anchor.height / 2 - card.height / 2;
        const top = Math.min(
            viewportBottom - gutter - card.height,
            Math.max(viewport.top + gutter, centeredTop)
        );
        left = Math.min(
            viewportRight - gutter - card.width,
            Math.max(viewport.left + gutter, left)
        );

        ui.card.style.left = `${Math.round(left)}px`;
        ui.card.style.top = `${Math.round(top)}px`;
        ui.card.style.visibility = "visible";
    }

    function schedulePreviewPosition() {
        if (!activeAvatar) return;
        window.cancelAnimationFrame(positionFrame);
        positionFrame = window.requestAnimationFrame(() => {
            positionFrame = undefined;
            if (!activeAvatar?.isConnected) {
                clearInteraction();
                return;
            }

            if (ui && !ui.card.hidden) {
                ui.card.style.setProperty(
                    "--avatar-size",
                    `${getEffectivePreviewSize()}px`
                );
                positionPreview(activeAvatar);
            }
        });
    }

    function setPreviewState(state, fallbackText, statusText) {
        if (!ui) return;
        ui.card.dataset.state = state;
        ui.fallback.textContent = fallbackText;
        ui.liveStatus.textContent = statusText;
    }

    function showPreview(avatar) {
        if (!avatar.isConnected) return;

        const currentSource = getAvatarSource(avatar);
        const hdSource = upgradeAvatarUrl(currentSource, settings.hdTargetSize);
        const authorName = getAuthorName(avatar);
        const preview = ensureUi();
        const sequence = ++loadSequence;
        activeAvatar = avatar;
        pendingAvatar = undefined;
        preview.card.dataset.shape = settings.shape;
        preview.card.style.setProperty(
            "--avatar-size",
            `${getEffectivePreviewSize()}px`
        );
        preview.author.hidden = !settings.showAuthor;
        preview.author.textContent = authorName;
        preview.image.alt = `${authorName}’s profile picture`;
        preview.card.hidden = false;
        preview.card.style.visibility = "hidden";

        if (!currentSource || !hdSource) {
            preview.image.removeAttribute("src");
            setPreviewState(
                "error",
                "Image unavailable",
                "The profile picture does not have a usable image source."
            );
            positionPreview(avatar);
            return;
        }

        preview.image.src = currentSource;
        setPreviewState(
            "loading",
            "",
            `Loading a high-resolution profile picture for ${authorName}.`
        );
        positionPreview(avatar);

        const loader = new Image();
        loader.decoding = "async";
        loader.addEventListener("load", () => {
            if (sequence !== loadSequence || activeAvatar !== avatar) return;
            preview.image.src = hdSource;
            setPreviewState(
                "ready",
                "",
                `High-resolution profile picture loaded for ${authorName}.`
            );
            positionPreview(avatar);
        });
        loader.addEventListener("error", () => {
            if (sequence !== loadSequence || activeAvatar !== avatar) return;
            setPreviewState(
                "fallback",
                "Standard quality",
                `A high-resolution image was unavailable for ${authorName}; showing the current profile picture.`
            );
            positionPreview(avatar);
        });
        loader.src = hdSource;
    }

    function hidePreview() {
        clearTimeout(showTimer);
        showTimer = undefined;
        pendingAvatar = undefined;
        activeAvatar = undefined;
        loadSequence += 1;
        window.cancelAnimationFrame(positionFrame);
        positionFrame = undefined;
        if (!ui) return;
        ui.card.hidden = true;
        ui.card.style.visibility = "hidden";
        ui.image.removeAttribute("src");
        ui.liveStatus.textContent = "";
    }

    function clearInteraction() {
        pointerAvatar = undefined;
        focusedAvatar = undefined;
        lastInteraction = "pointer";
        hidePreview();
    }

    async function synchronizePreview() {
        const readSequence = ++settingsReadSequence;
        const nextSettings = await readSettings();
        if (readSequence !== settingsReadSequence) return;
        settings = nextSettings;
        const avatar =
            lastInteraction === "focus"
                ? focusedAvatar || pointerAvatar
                : pointerAvatar || focusedAvatar;

        if (!settings.enabled || !avatar || !avatar.isConnected) {
            hidePreview();
            return;
        }

        if (activeAvatar === avatar || pendingAvatar === avatar) return;

        hidePreview();
        pendingAvatar = avatar;
        showTimer = window.setTimeout(() => {
            if (pendingAvatar === avatar) showPreview(avatar);
        }, settings.hoverDelay);
    }

    function handlePointerOver(event) {
        const avatar = getAvatarFromTarget(event.target);
        if (!avatar || getAvatarFromTarget(event.relatedTarget) === avatar)
            return;
        pointerAvatar = avatar;
        lastInteraction = "pointer";
        void synchronizePreview();
    }

    function handlePointerOut(event) {
        const avatar = getAvatarFromTarget(event.target);
        if (!avatar || pointerAvatar !== avatar) return;
        if (getAvatarFromTarget(event.relatedTarget) === avatar) return;
        pointerAvatar = undefined;
        if (focusedAvatar) lastInteraction = "focus";
        void synchronizePreview();
    }

    function handleFocusIn(event) {
        const avatar = getAvatarFromFocusTarget(event.target);
        if (!avatar) return;
        focusedAvatar = avatar;
        lastInteraction = "focus";
        void synchronizePreview();
    }

    function handleFocusOut(event) {
        const avatar = getAvatarFromFocusTarget(event.target);
        if (!avatar || focusedAvatar !== avatar) return;
        if (getAvatarFromFocusTarget(event.relatedTarget) === avatar) return;
        focusedAvatar = undefined;
        if (pointerAvatar) lastInteraction = "pointer";
        void synchronizePreview();
    }

    async function openSettingsDialog() {
        clearInteraction();
        settings = await readSettings();
        const currentUi = ensureUi();
        populateSettingsForm(currentUi.controls, settings);
        currentUi.status.textContent = "";
        delete currentUi.status.dataset.kind;
        if (!currentUi.dialog.open) currentUi.dialog.showModal();
        currentUi.controls.enabled.focus();
    }

    function shouldRegisterMenuCommand() {
        if (window.top === window.self) return true;

        try {
            const topHostname = window.top.location.hostname.toLowerCase();
            return !(
                topHostname === "youtube.com" ||
                topHostname.endsWith(".youtube.com")
            );
        } catch {
            // Keep the menu available when YouTube chat is embedded cross-origin.
            return true;
        }
    }

    document.addEventListener("pointerover", handlePointerOver, true);
    document.addEventListener("pointerout", handlePointerOut, true);
    document.addEventListener("focusin", handleFocusIn, true);
    document.addEventListener("focusout", handleFocusOut, true);
    document.addEventListener("scroll", schedulePreviewPosition, true);
    document.addEventListener(
        "keydown",
        (event) => {
            if (event.key === "Escape" && !ui?.dialog.open) clearInteraction();
        },
        true
    );

    for (const eventName of ["yt-navigate-start", "yt-page-data-updated"]) {
        document.addEventListener(eventName, clearInteraction, true);
    }

    for (const eventName of [
        "popstate",
        "hashchange",
        "pagehide",
    ]) {
        window.addEventListener(eventName, clearInteraction, true);
    }

    window.addEventListener("resize", schedulePreviewPosition, true);
    window.visualViewport?.addEventListener(
        "resize",
        schedulePreviewPosition,
        true
    );
    window.visualViewport?.addEventListener(
        "scroll",
        schedulePreviewPosition,
        true
    );

    if (shouldRegisterMenuCommand()) {
        GM.registerMenuCommand("Configure YouTube chat avatar preview…", () => {
            void openSettingsDialog();
        });
    }
})();
