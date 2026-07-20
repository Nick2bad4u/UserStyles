// ==UserScript==
// @name         Enhance YouTube Profile Pictures
// @namespace    nick2bad4u.github.io
// @version      6.0.0
// @description  Preview chat, comment, and creator-heart avatars in one configurable HD overlay; this combined script replaces the two narrower alternatives.
// @author       Nick2bad4u
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @match        https://www.youtube.com/*
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.registerMenuCommand
// @run-at       document-idle
// @updateURL    https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/EnhanceYouTubeProfilePictures.user.js
// @downloadURL  https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/EnhanceYouTubeProfilePictures.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @license      UnLicense
// @tag          youtube
// ==/UserScript==

void (async function () {
    "use strict";

    const SETTINGS_KEY = "youtubeAvatarPreviewSettings";
    const CHAT_SCOPE_ATTRIBUTE = "data-nick-youtube-avatar-preview-chat";
    const COMMENT_SCOPE_ATTRIBUTE = "data-nick-youtube-avatar-preview-comments";
    const SETTINGS_LIMITS = Object.freeze({
        previewSize: Object.freeze({ min: 180, max: 640 }),
        hoverDelay: Object.freeze({ min: 0, max: 1500 }),
        hdSize: Object.freeze({ min: 256, max: 2048 }),
    });
    const DEFAULT_SETTINGS = Object.freeze({
        enabled: true,
        previewSize: 320,
        hoverDelay: 120,
        hdSize: 1024,
        shape: "circle",
        showAuthor: true,
    });
    const VALID_SHAPES = new Set([
        "circle",
        "rounded",
        "square",
    ]);

    const CHAT_RENDERERS = [
        "yt-live-chat-text-message-renderer",
        "yt-live-chat-paid-message-renderer",
        "yt-live-chat-membership-item-renderer",
        "yt-live-chat-paid-sticker-renderer",
        "yt-live-chat-member-milestone-chat-renderer",
        "yt-live-chat-membership-milestone-chat-renderer",
        "yt-live-chat-sponsorships-gift-purchase-announcement-renderer",
        "yt-live-chat-sponsorships-gift-redemption-announcement-renderer",
        "yt-live-chat-gift-purchase-announcement-renderer",
    ];
    const COMMENT_RENDERERS = [
        "ytd-comment-view-model",
        "ytd-comment-renderer",
        "ytd-comment-thread-renderer",
        "yt-comment-thread-view-model",
        "yt-comment-view-model",
    ];
    const CREATOR_HEART_RENDERERS = [
        "ytd-creator-heart-renderer",
        "yt-creator-heart-renderer",
    ];
    const ownsChatScope =
        !document.documentElement.hasAttribute(CHAT_SCOPE_ATTRIBUTE);
    const ownsCommentScope = !document.documentElement.hasAttribute(
        COMMENT_SCOPE_ATTRIBUTE
    );
    if (!ownsChatScope && !ownsCommentScope) return;
    if (ownsChatScope) {
        document.documentElement.setAttribute(CHAT_SCOPE_ATTRIBUTE, "combined");
    }
    if (ownsCommentScope) {
        document.documentElement.setAttribute(
            COMMENT_SCOPE_ATTRIBUTE,
            "combined"
        );
    }

    const CHAT_AVATAR_SELECTORS = [
        "yt-live-chat-app #author-photo img",
        "yt-live-chat-renderer #author-photo img",
        ...CHAT_RENDERERS.map((renderer) => `${renderer} #author-photo img`),
        "img.h-5.w-5.inline.align-middle.rounded-full.flex-none",
    ];
    const COMMENT_AVATAR_SELECTORS = [
        ...COMMENT_RENDERERS.map(
            (renderer) => `${renderer} #author-thumbnail img`
        ),
        ...COMMENT_RENDERERS.map(
            (renderer) => `${renderer} #creator-heart-button img`
        ),
        ...CREATOR_HEART_RENDERERS.map((renderer) => `${renderer} img`),
        "#creator-heart-button img",
    ];
    const AVATAR_SELECTORS = [
        ...(ownsChatScope ? CHAT_AVATAR_SELECTORS : []),
        ...(ownsCommentScope ? COMMENT_AVATAR_SELECTORS : []),
    ];
    const AVATAR_SELECTOR = AVATAR_SELECTORS.join(",");
    const AVATAR_CONTAINER_SELECTOR = [
        "#author-photo",
        "#author-thumbnail",
        "#creator-heart-button",
        ...CREATOR_HEART_RENDERERS,
        "img.h-5.w-5.inline.align-middle.rounded-full.flex-none",
    ].join(",");
    const CHAT_CONTEXT_SELECTOR = CHAT_RENDERERS.join(",");
    const COMMENT_CONTEXT_SELECTOR = COMMENT_RENDERERS.join(",");
    const CREATOR_HEART_CONTEXT_SELECTOR = [
        "#creator-heart-button",
        ...CREATOR_HEART_RENDERERS,
    ].join(",");

    const clampInteger = (value, { min, max }, fallback) => {
        const number = Number(value);
        if (!Number.isFinite(number)) return fallback;
        return Math.min(max, Math.max(min, Math.round(number)));
    };

    function normalizeSettings(value) {
        const candidate =
            value && typeof value === "object" && !Array.isArray(value)
                ? value
                : {};
        const previewSize = clampInteger(
            candidate.previewSize,
            SETTINGS_LIMITS.previewSize,
            DEFAULT_SETTINGS.previewSize
        );
        const requestedHdSize = clampInteger(
            candidate.hdSize,
            SETTINGS_LIMITS.hdSize,
            DEFAULT_SETTINGS.hdSize
        );

        return {
            enabled:
                typeof candidate.enabled === "boolean"
                    ? candidate.enabled
                    : DEFAULT_SETTINGS.enabled,
            previewSize,
            hoverDelay: clampInteger(
                candidate.hoverDelay,
                SETTINGS_LIMITS.hoverDelay,
                DEFAULT_SETTINGS.hoverDelay
            ),
            hdSize: Math.max(previewSize, requestedHdSize),
            shape: VALID_SHAPES.has(candidate.shape)
                ? candidate.shape
                : DEFAULT_SETTINGS.shape,
            showAuthor:
                typeof candidate.showAuthor === "boolean"
                    ? candidate.showAuthor
                    : DEFAULT_SETTINGS.showAuthor,
        };
    }

    async function loadSettings() {
        try {
            return normalizeSettings(await GM.getValue(SETTINGS_KEY, {}));
        } catch (error) {
            console.warn(
                "[YouTube Avatar Preview] Could not load settings; using defaults.",
                error
            );
            return normalizeSettings(DEFAULT_SETTINGS);
        }
    }

    let settings = await loadSettings();
    let settingsLoadSequence = 0;

    function createElement(tagName, options = {}) {
        const element = document.createElement(tagName);
        if (options.className) element.className = options.className;
        if (options.text !== undefined) element.textContent = options.text;
        for (const [name, value] of Object.entries(options.attributes ?? {})) {
            element.setAttribute(name, String(value));
        }
        return element;
    }

    function getAvatarSource(image) {
        return (
            image.currentSrc ||
            image.getAttribute("src") ||
            image.getAttribute("data-src") ||
            ""
        ).trim();
    }

    function upgradeAvatarUrl(source, targetSize) {
        if (!source) return source;

        try {
            const url = new URL(source, location.href);
            if (!/^https?:$/u.test(url.protocol)) return source;

            let changed = false;
            const sizedPath = url.pathname
                .replace(/=s\d+(?=-|$)/u, () => {
                    changed = true;
                    return `=s${targetSize}`;
                })
                .replace(/\/s\d+(?=-|\/|$)/u, () => {
                    changed = true;
                    return `/s${targetSize}`;
                })
                .replace(/=w\d+-h\d+(?=-|$)/u, () => {
                    changed = true;
                    return `=w${targetSize}-h${targetSize}`;
                })
                .replace(/\/w\d+-h\d+(?=-|\/|$)/u, () => {
                    changed = true;
                    return `/w${targetSize}-h${targetSize}`;
                });
            url.pathname = sizedPath;

            for (const parameter of ["s", "sz"]) {
                if (url.searchParams.has(parameter)) {
                    url.searchParams.set(parameter, String(targetSize));
                    changed = true;
                }
            }
            if (url.searchParams.has("w")) {
                url.searchParams.set("w", String(targetSize));
                changed = true;
            }
            if (url.searchParams.has("h")) {
                url.searchParams.set("h", String(targetSize));
                changed = true;
            }

            if (
                !changed &&
                /(?:^|\.)(?:ggpht\.com|googleusercontent\.com)$/iu.test(
                    url.hostname
                )
            ) {
                url.pathname += `=s${targetSize}-c`;
                changed = true;
            }

            return changed ? url.href : source;
        } catch {
            return source;
        }
    }

    function findAvatar(target) {
        if (!(target instanceof Element)) return null;

        const closestImage = target.closest("img");
        if (closestImage?.matches(AVATAR_SELECTOR)) return closestImage;

        const container = target.closest(AVATAR_CONTAINER_SELECTOR);
        const containerImage = container?.querySelector("img");
        if (containerImage?.matches(AVATAR_SELECTOR)) return containerImage;

        if (!target.matches("a,button,[role='button'],[tabindex]")) return null;
        const nestedContainer = target.querySelector(AVATAR_CONTAINER_SELECTOR);
        const nestedImage = nestedContainer?.matches("img")
            ? nestedContainer
            : nestedContainer?.querySelector("img");
        return nestedImage?.matches(AVATAR_SELECTOR) ? nestedImage : null;
    }

    function normalizedText(value) {
        return value?.replace(/\s+/gu, " ").trim() ?? "";
    }

    function firstContextText(context, selectors) {
        if (!context) return "";
        for (const selector of selectors) {
            const element = context.querySelector(selector);
            const text = normalizedText(
                element?.getAttribute("aria-label") || element?.textContent
            );
            if (text) return text;
        }
        return "";
    }

    function getAvatarDetails(image) {
        const creatorHeart = image.closest(CREATOR_HEART_CONTEXT_SELECTOR);
        if (creatorHeart) {
            const label = normalizedText(
                creatorHeart.getAttribute("aria-label") ||
                    creatorHeart
                        .closest("button")
                        ?.getAttribute("aria-label") ||
                    image.alt ||
                    image.title
            );
            return {
                context: "Creator heart",
                author: label || "Creator",
            };
        }

        const chatMessage = image.closest(CHAT_CONTEXT_SELECTOR);
        if (
            chatMessage ||
            image.closest("yt-live-chat-app,yt-live-chat-renderer")
        ) {
            const context =
                chatMessage ||
                image.closest("yt-live-chat-app,yt-live-chat-renderer");
            const author = firstContextText(context, [
                '[id="author-name"]',
                "yt-live-chat-author-chip",
                "[data-author-name]",
                ".author-name",
            ]);
            return {
                context: "Live chat",
                author:
                    author ||
                    normalizedText(image.alt || image.title) ||
                    "Author",
            };
        }

        const comment = image.closest(COMMENT_CONTEXT_SELECTOR);
        if (comment) {
            const author = firstContextText(comment, [
                '[id="author-text"]',
                '[id="author-name"]',
                "[data-author-name]",
                ".author-name",
            ]);
            return {
                context: "Comment",
                author:
                    author ||
                    normalizedText(image.alt || image.title) ||
                    "Author",
            };
        }

        return {
            context: "Live chat",
            author: normalizedText(image.alt || image.title) || "Author",
        };
    }

    function createPreviewOverlay() {
        const host = createElement("div", {
            attributes: {
                id: "youtube-avatar-preview-host",
            },
        });
        const shadow = host.attachShadow({ mode: "open" });
        const style = createElement("style");
        style.textContent = `
            :host {
                all: initial;
                position: fixed;
                inset: 0;
                z-index: 2147483647;
                pointer-events: none;
                color-scheme: dark;
            }

            .preview {
                --preview-size: 320px;
                position: absolute;
                box-sizing: border-box;
                width: var(--preview-size);
                padding: 8px;
                overflow: hidden;
                color: #fff;
                font: 500 13px/1.35 Roboto, Arial, sans-serif;
                background: color-mix(in srgb, #181818 92%, transparent);
                border: 1px solid rgb(255 255 255 / 16%);
                border-radius: 18px;
                box-shadow:
                    0 22px 55px rgb(0 0 0 / 46%),
                    0 4px 14px rgb(0 0 0 / 34%);
                backdrop-filter: blur(18px) saturate(140%);
                opacity: 1;
                transform: translateY(0) scale(1);
                transform-origin: center;
                transition:
                    opacity 140ms ease,
                    transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
            }

            .preview[hidden] {
                display: none;
            }

            .frame {
                position: relative;
                box-sizing: border-box;
                width: 100%;
                aspect-ratio: 1;
                overflow: hidden;
                isolation: isolate;
                background:
                    radial-gradient(circle at 30% 22%, #464646, #202020 54%, #121212);
                border: 1px solid rgb(255 255 255 / 12%);
                border-radius: 50%;
            }

            .preview[data-shape="rounded"] .frame {
                border-radius: 22%;
            }

            .preview[data-shape="square"] .frame {
                border-radius: 10px;
            }

            .image {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
                opacity: 0;
                transition: opacity 140ms ease;
            }

            .preview[data-state="ready"] .image,
            .preview[data-state="fallback"] .image {
                opacity: 1;
            }

            .status {
                position: absolute;
                inset: 0;
                z-index: 1;
                display: grid;
                place-content: center;
                gap: 10px;
                padding: 24px;
                color: #f1f1f1;
                text-align: center;
                text-wrap: balance;
                background: rgb(15 15 15 / 30%);
                transition: opacity 140ms ease;
            }

            .preview[data-state="ready"] .status {
                opacity: 0;
            }

            .spinner {
                width: 28px;
                height: 28px;
                margin: auto;
                border: 3px solid rgb(255 255 255 / 20%);
                border-top-color: #ff0033;
                border-radius: 50%;
                animation: spin 700ms linear infinite;
            }

            .preview:not([data-state="loading"]) .spinner {
                display: none;
            }

            .preview[data-state="fallback"] .status {
                inset: auto 10px 10px;
                display: block;
                padding: 6px 9px;
                color: #fff;
                font-size: 11px;
                background: rgb(0 0 0 / 72%);
                border-radius: 999px;
            }

            .footer {
                display: grid;
                grid-template-columns: auto minmax(0, 1fr);
                align-items: center;
                gap: 8px;
                padding: 9px 5px 3px;
            }

            .context {
                padding: 3px 7px;
                color: #fff;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 0.04em;
                text-transform: uppercase;
                background: #ff0033;
                border-radius: 999px;
            }

            .author {
                overflow: hidden;
                color: #f1f1f1;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .author[hidden] {
                display: none;
            }

            @keyframes spin {
                to { transform: rotate(1turn); }
            }

            @media (prefers-reduced-motion: reduce) {
                .preview,
                .image,
                .status {
                    transition: none;
                }

                .spinner {
                    animation-duration: 1.4s;
                }
            }
        `;

        const card = createElement("section", {
            className: "preview",
            attributes: {
                "aria-atomic": "true",
                "aria-live": "polite",
                role: "status",
            },
        });
        card.hidden = true;
        card.dataset.shape = settings.shape;
        card.dataset.state = "loading";

        const frame = createElement("div", { className: "frame" });
        const image = createElement("img", {
            className: "image",
            attributes: { alt: "" },
        });
        const status = createElement("div", { className: "status" });
        const spinner = createElement("span", {
            className: "spinner",
            attributes: { "aria-hidden": "true" },
        });
        const statusText = createElement("span", {
            className: "status-text",
            text: "Loading HD avatar…",
        });
        status.append(spinner, statusText);
        frame.append(image, status);

        const footer = createElement("div", { className: "footer" });
        const context = createElement("span", {
            className: "context",
            text: "YouTube",
        });
        const author = createElement("span", {
            className: "author",
            text: "Author",
        });
        footer.append(context, author);
        card.append(frame, footer);
        shadow.append(style, card);
        document.documentElement.append(host);

        return { author, card, context, host, image, statusText };
    }

    const preview = createPreviewOverlay();
    let activeAvatar = null;
    let focusedAvatar = null;
    let hoveredAvatar = null;
    let pendingAvatar = null;
    let hoverTimer = 0;
    let previewRequestController = null;
    let repositionFrame = 0;

    function clearHoverTimer() {
        if (!hoverTimer) return;
        clearTimeout(hoverTimer);
        hoverTimer = 0;
        pendingAvatar = null;
    }

    function positionPreview(avatar) {
        const anchor = avatar.getBoundingClientRect();
        const margin = 12;
        const gap = 14;
        const availableWidth = Math.max(120, window.innerWidth - margin * 2);
        const availableHeight = Math.max(120, window.innerHeight - margin * 2);
        const effectiveSize = Math.min(
            settings.previewSize,
            availableWidth,
            Math.max(120, availableHeight - 46)
        );

        preview.card.style.setProperty(
            "--preview-size",
            `${Math.round(effectiveSize)}px`
        );
        const cardRect = preview.card.getBoundingClientRect();
        let left = anchor.right + gap;
        if (left + cardRect.width > window.innerWidth - margin) {
            left = anchor.left - gap - cardRect.width;
        }
        left = Math.min(
            window.innerWidth - margin - cardRect.width,
            Math.max(margin, left)
        );

        const centeredTop =
            anchor.top + anchor.height / 2 - cardRect.height / 2;
        const top = Math.min(
            window.innerHeight - margin - cardRect.height,
            Math.max(margin, centeredTop)
        );
        preview.card.style.left = `${Math.round(left)}px`;
        preview.card.style.top = `${Math.round(top)}px`;
        preview.card.style.visibility = "visible";
    }

    function hidePreview() {
        clearHoverTimer();
        previewRequestController?.abort();
        previewRequestController = null;
        activeAvatar = null;
        preview.image.removeAttribute("src");
        preview.card.hidden = true;
        preview.card.style.visibility = "hidden";
    }

    function showPreview(avatar) {
        const source = getAvatarSource(avatar);
        if (!source || !settings.enabled || !avatar.isConnected) {
            hidePreview();
            return;
        }

        const anchor = avatar.getBoundingClientRect();
        if (anchor.width <= 0 || anchor.height <= 0) {
            hidePreview();
            return;
        }

        clearHoverTimer();
        previewRequestController?.abort();
        const requestController = new AbortController();
        previewRequestController = requestController;
        const hdSource = upgradeAvatarUrl(source, settings.hdSize);
        const details = getAvatarDetails(avatar);
        let usingFallback = false;

        activeAvatar = avatar;
        preview.card.hidden = false;
        preview.card.style.visibility = "hidden";
        preview.card.dataset.shape = settings.shape;
        preview.card.dataset.state = "loading";
        preview.context.textContent = details.context;
        preview.author.textContent = details.author;
        preview.author.hidden = !settings.showAuthor;
        preview.image.alt = `Large profile picture for ${details.author}`;
        preview.statusText.textContent = "Loading HD avatar…";

        preview.image.addEventListener(
            "load",
            () => {
                preview.card.dataset.state = usingFallback
                    ? "fallback"
                    : "ready";
                preview.statusText.textContent = usingFallback
                    ? "HD unavailable — showing original"
                    : "";
            },
            { signal: requestController.signal }
        );
        preview.image.addEventListener(
            "error",
            () => {
                if (!usingFallback && hdSource !== source) {
                    usingFallback = true;
                    preview.card.dataset.state = "loading";
                    preview.statusText.textContent = "Trying original avatar…";
                    preview.image.src = source;
                    return;
                }
                preview.card.dataset.state = "error";
                preview.statusText.textContent = "Avatar unavailable";
            },
            { signal: requestController.signal }
        );
        preview.image.src = hdSource;
        positionPreview(avatar);
    }

    async function schedulePreview(avatar) {
        const loadSequence = ++settingsLoadSequence;
        const nextSettings = await loadSettings();
        if (loadSequence !== settingsLoadSequence) return;
        settings = nextSettings;
        if (!settings.enabled) {
            hidePreview();
            return;
        }
        if (!avatar) return;
        if (hoveredAvatar !== avatar && focusedAvatar !== avatar) {
            hidePreview();
            return;
        }
        if (activeAvatar === avatar && !preview.card.hidden) {
            positionPreview(avatar);
            return;
        }
        if (pendingAvatar === avatar) return;

        clearHoverTimer();
        pendingAvatar = avatar;
        if (settings.hoverDelay === 0) {
            showPreview(avatar);
            return;
        }
        hoverTimer = window.setTimeout(() => {
            hoverTimer = 0;
            pendingAvatar = null;
            if (hoveredAvatar === avatar || focusedAvatar === avatar) {
                showPreview(avatar);
            }
        }, settings.hoverDelay);
    }

    function keepOrHidePreview(leavingAvatar) {
        if (focusedAvatar && !focusedAvatar.isConnected) focusedAvatar = null;
        if (hoveredAvatar && !hoveredAvatar.isConnected) hoveredAvatar = null;
        const replacement = focusedAvatar || hoveredAvatar;
        if (replacement) {
            if (replacement !== leavingAvatar)
                void schedulePreview(replacement);
            return;
        }
        hidePreview();
    }

    function handlePointerOver(event) {
        const avatar = findAvatar(event.target);
        if (!avatar) return;
        hoveredAvatar = avatar;
        void schedulePreview(avatar);
    }

    function handlePointerOut(event) {
        const avatar = findAvatar(event.target);
        if (!avatar || hoveredAvatar !== avatar) return;
        if (findAvatar(event.relatedTarget) === avatar) return;

        hoveredAvatar = null;
        keepOrHidePreview(avatar);
    }

    function handleFocusIn(event) {
        const avatar = findAvatar(event.target);
        if (!avatar) return;
        focusedAvatar = avatar;
        void schedulePreview(avatar);
    }

    function handleFocusOut(event) {
        const avatar = findAvatar(event.target);
        if (!avatar || focusedAvatar !== avatar) return;
        if (findAvatar(event.relatedTarget) === avatar) return;

        focusedAvatar = null;
        keepOrHidePreview(avatar);
    }

    function scheduleReposition() {
        if (repositionFrame) return;
        repositionFrame = window.requestAnimationFrame(() => {
            repositionFrame = 0;
            if (activeAvatar?.isConnected && !preview.card.hidden) {
                positionPreview(activeAvatar);
            } else if (activeAvatar) {
                hidePreview();
            }
        });
    }

    function handleKeyDown(event) {
        if (event.key === "Escape" && !preview.card.hidden) hidePreview();
    }

    function handleVisibilityChange() {
        if (document.hidden) resetInteraction();
    }

    function resetInteraction() {
        hoveredAvatar = null;
        focusedAvatar = null;
        pendingAvatar = null;
        hidePreview();
    }

    document.addEventListener("pointerover", handlePointerOver, true);
    document.addEventListener("pointerout", handlePointerOut, true);
    document.addEventListener("focusin", handleFocusIn, true);
    document.addEventListener("focusout", handleFocusOut, true);
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("visibilitychange", handleVisibilityChange, true);
    window.addEventListener("scroll", scheduleReposition, {
        capture: true,
        passive: true,
    });
    window.addEventListener("resize", scheduleReposition, { passive: true });

    for (const eventName of [
        "yt-navigate-start",
        "yt-navigate-finish",
        "yt-page-data-updated",
    ]) {
        document.addEventListener(eventName, resetInteraction, true);
    }
    window.addEventListener("hashchange", resetInteraction, { passive: true });
    window.addEventListener("blur", resetInteraction, { passive: true });
    window.addEventListener("pagehide", resetInteraction, { passive: true });

    function createSettingsDialog() {
        const host = createElement("div", {
            attributes: { id: "youtube-avatar-preview-settings-host" },
        });
        const shadow = host.attachShadow({ mode: "open" });
        const style = createElement("style");
        style.textContent = `
            :host {
                all: initial;
                position: fixed;
                z-index: 2147483647;
                color-scheme: dark;
                font-family: Roboto, Arial, sans-serif;
            }

            dialog {
                box-sizing: border-box;
                width: min(520px, calc(100vw - 28px));
                max-height: min(720px, calc(100vh - 28px));
                padding: 0;
                overflow: auto;
                color: #f1f1f1;
                background: #181818;
                border: 1px solid rgb(255 255 255 / 16%);
                border-radius: 18px;
                box-shadow: 0 28px 80px rgb(0 0 0 / 65%);
            }

            dialog::backdrop {
                background: rgb(0 0 0 / 62%);
                backdrop-filter: blur(5px);
            }

            form { margin: 0; }

            header {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 20px 22px 16px;
                border-bottom: 1px solid rgb(255 255 255 / 10%);
            }

            .mark {
                display: grid;
                flex: 0 0 auto;
                width: 38px;
                height: 38px;
                place-items: center;
                color: #fff;
                font-size: 12px;
                font-weight: 800;
                background: #ff0033;
                border-radius: 11px;
                box-shadow: 0 7px 18px rgb(255 0 51 / 28%);
            }

            h1 {
                margin: 0 0 2px;
                font-size: 18px;
                line-height: 1.25;
            }

            .subtitle,
            .description {
                margin: 0;
                color: #aaa;
                font-size: 12px;
                line-height: 1.45;
            }

            .fields {
                display: grid;
                gap: 4px;
                padding: 14px 22px;
            }

            .field {
                display: grid;
                grid-template-columns: minmax(0, 1fr) auto;
                gap: 4px 18px;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid rgb(255 255 255 / 8%);
            }

            .field:last-child { border-bottom: 0; }
            .field > label { font-size: 14px; font-weight: 600; }
            .description { grid-column: 1; }

            input[type="checkbox"] {
                width: 40px;
                height: 22px;
                margin: 0;
                appearance: none;
                cursor: pointer;
                background: #555;
                border-radius: 999px;
                transition: background 140ms ease;
            }

            input[type="checkbox"]::before {
                display: block;
                width: 16px;
                height: 16px;
                margin: 3px;
                content: "";
                background: #fff;
                border-radius: 50%;
                box-shadow: 0 1px 4px rgb(0 0 0 / 40%);
                transition: transform 140ms ease;
            }

            input[type="checkbox"]:checked { background: #ff0033; }
            input[type="checkbox"]:checked::before { transform: translateX(18px); }

            input[type="range"] {
                grid-column: 1 / -1;
                width: 100%;
                margin: 9px 0 1px;
                accent-color: #ff0033;
            }

            output {
                min-width: 64px;
                padding: 5px 8px;
                color: #fff;
                font: 600 12px/1 Roboto, Arial, sans-serif;
                text-align: center;
                background: #303030;
                border-radius: 7px;
            }

            select {
                min-width: 130px;
                padding: 8px 30px 8px 10px;
                color: #f1f1f1;
                background: #303030;
                border: 1px solid rgb(255 255 255 / 16%);
                border-radius: 8px;
            }

            input:focus-visible,
            select:focus-visible,
            button:focus-visible {
                outline: 2px solid #ff4e70;
                outline-offset: 2px;
            }

            .message {
                min-height: 17px;
                margin: 0;
                padding: 0 22px;
                color: #ff8099;
                font-size: 12px;
            }

            footer {
                display: flex;
                gap: 8px;
                justify-content: flex-end;
                padding: 14px 22px 20px;
            }

            button {
                padding: 9px 15px;
                color: #f1f1f1;
                font: 600 13px/1 Roboto, Arial, sans-serif;
                cursor: pointer;
                background: #303030;
                border: 1px solid rgb(255 255 255 / 12%);
                border-radius: 999px;
            }

            button:hover { background: #404040; }
            .reset { margin-right: auto; }
            .save { color: #fff; background: #ff0033; border-color: #ff0033; }
            .save:hover { background: #d9002b; }

            @media (prefers-reduced-motion: reduce) {
                input[type="checkbox"],
                input[type="checkbox"]::before { transition: none; }
            }
        `;

        const dialog = createElement("dialog", {
            attributes: {
                "aria-labelledby": "youtube-avatar-settings-title",
                "aria-describedby": "youtube-avatar-settings-subtitle",
            },
        });
        const form = createElement("form", {
            attributes: { method: "dialog" },
        });
        const header = createElement("header");
        const mark = createElement("span", {
            className: "mark",
            text: "YT",
            attributes: { "aria-hidden": "true" },
        });
        const headingGroup = createElement("div");
        const title = createElement("h1", {
            text: "Avatar preview settings",
            attributes: { id: "youtube-avatar-settings-title" },
        });
        const subtitle = createElement("p", {
            className: "subtitle",
            text: "Customize previews without changing YouTube’s own images.",
            attributes: { id: "youtube-avatar-settings-subtitle" },
        });
        headingGroup.append(title, subtitle);
        header.append(mark, headingGroup);

        const fields = createElement("div", { className: "fields" });
        const controls = {};

        function addCheckbox(id, labelText, descriptionText) {
            const field = createElement("div", { className: "field" });
            const label = createElement("label", {
                text: labelText,
                attributes: { for: id },
            });
            const input = createElement("input", {
                attributes: { id, type: "checkbox" },
            });
            const description = createElement("p", {
                className: "description",
                text: descriptionText,
            });
            field.append(label, input, description);
            fields.append(field);
            return input;
        }

        function addRange(id, labelText, descriptionText, limits, unit) {
            const field = createElement("div", { className: "field" });
            const label = createElement("label", {
                text: labelText,
                attributes: { for: id },
            });
            const output = createElement("output", {
                attributes: { for: id },
            });
            const description = createElement("p", {
                className: "description",
                text: descriptionText,
            });
            const input = createElement("input", {
                attributes: {
                    id,
                    max: limits.max,
                    min: limits.min,
                    step: id.includes("delay") ? 25 : 16,
                    type: "range",
                },
            });
            const updateOutput = () => {
                output.value = `${input.value} ${unit}`;
            };
            input.addEventListener("input", updateOutput);
            field.append(label, output, description, input);
            fields.append(field);
            return { input, updateOutput };
        }

        controls.enabled = addCheckbox(
            "youtube-avatar-enabled",
            "Enable previews",
            "Show an isolated preview when an avatar is hovered or focused."
        );
        controls.previewSize = addRange(
            "youtube-avatar-preview-size",
            "Preview size",
            "The overlay scales down automatically on smaller viewports.",
            SETTINGS_LIMITS.previewSize,
            "px"
        );
        controls.hoverDelay = addRange(
            "youtube-avatar-hover-delay",
            "Hover delay",
            "Increase this to avoid accidental previews while moving the pointer.",
            SETTINGS_LIMITS.hoverDelay,
            "ms"
        );
        controls.hdSize = addRange(
            "youtube-avatar-hd-size",
            "HD image target",
            "Requested source resolution; it is always at least the preview size.",
            SETTINGS_LIMITS.hdSize,
            "px"
        );

        const shapeField = createElement("div", { className: "field" });
        const shapeLabel = createElement("label", {
            text: "Image shape",
            attributes: { for: "youtube-avatar-shape" },
        });
        controls.shape = createElement("select", {
            attributes: { id: "youtube-avatar-shape" },
        });
        for (const [value, label] of [
            ["circle", "Circle"],
            ["rounded", "Rounded"],
            ["square", "Square"],
        ]) {
            controls.shape.append(
                createElement("option", { text: label, attributes: { value } })
            );
        }
        const shapeDescription = createElement("p", {
            className: "description",
            text: "Choose how the enlarged image is framed.",
        });
        shapeField.append(shapeLabel, controls.shape, shapeDescription);
        fields.append(shapeField);

        controls.showAuthor = addCheckbox(
            "youtube-avatar-show-author",
            "Show author label",
            "Display the author and whether the avatar came from chat, a comment, or a creator heart."
        );

        const message = createElement("p", {
            className: "message",
            attributes: { "aria-live": "polite" },
        });
        const footer = createElement("footer");
        const resetButton = createElement("button", {
            className: "reset",
            text: "Reset",
            attributes: { type: "button" },
        });
        const cancelButton = createElement("button", {
            text: "Cancel",
            attributes: { type: "button" },
        });
        const saveButton = createElement("button", {
            className: "save",
            text: "Save",
            attributes: { type: "submit" },
        });
        footer.append(resetButton, cancelButton, saveButton);
        form.append(header, fields, message, footer);
        dialog.append(form);
        shadow.append(style, dialog);
        document.documentElement.append(host);

        function populate(values) {
            controls.enabled.checked = values.enabled;
            controls.previewSize.input.value = String(values.previewSize);
            controls.hoverDelay.input.value = String(values.hoverDelay);
            controls.hdSize.input.value = String(values.hdSize);
            controls.shape.value = values.shape;
            controls.showAuthor.checked = values.showAuthor;
            controls.previewSize.updateOutput();
            controls.hoverDelay.updateOutput();
            controls.hdSize.updateOutput();
            message.textContent = "";
        }

        function valuesFromForm() {
            return normalizeSettings({
                enabled: controls.enabled.checked,
                previewSize: controls.previewSize.input.value,
                hoverDelay: controls.hoverDelay.input.value,
                hdSize: controls.hdSize.input.value,
                shape: controls.shape.value,
                showAuthor: controls.showAuthor.checked,
            });
        }

        resetButton.addEventListener("click", () => {
            populate(DEFAULT_SETTINGS);
            message.textContent =
                "Defaults restored. Select Save to apply them.";
        });
        cancelButton.addEventListener("click", () => dialog.close("cancel"));
        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) dialog.close("cancel");
        });
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const nextSettings = valuesFromForm();
            saveButton.disabled = true;
            message.textContent = "Saving…";
            try {
                await GM.setValue(SETTINGS_KEY, nextSettings);
                settings = nextSettings;
                hidePreview();
                dialog.close("save");
            } catch (error) {
                console.error(
                    "[YouTube Avatar Preview] Could not save settings.",
                    error
                );
                message.textContent =
                    "Settings could not be saved. Please try again.";
            } finally {
                saveButton.disabled = false;
            }
        });

        return {
            open() {
                populate(settings);
                if (!dialog.open) dialog.showModal();
                controls.enabled.focus();
            },
        };
    }

    let settingsDialog = null;
    function openSettings() {
        settingsDialog ??= createSettingsDialog();
        settingsDialog.open();
    }

    if (window.top === window.self) {
        GM.registerMenuCommand(
            "YouTube avatar previews: Settings…",
            openSettings
        );
    }
})();
