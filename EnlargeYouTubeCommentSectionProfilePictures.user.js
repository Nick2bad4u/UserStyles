// ==UserScript==
// @name         Enlarge YouTube Comment Profile Pictures
// @namespace    nick2bad4u.github.io
// @version      3.0.0
// @description  Shows configurable HD previews for comment and creator-heart avatars; use this comments-only script or the combined script, not both.
// @author       Nick2bad4u
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @match        https://www.youtube.com/*
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.registerMenuCommand
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @license      UnLicense
// @downloadURL  https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/EnlargeYouTubeCommentSectionProfilePictures.user.js
// @updateURL    https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/EnlargeYouTubeCommentSectionProfilePictures.user.js
// @run-at       document-idle
// @noframes
// @tag          youtube
// ==/UserScript==

void (async function () {
    "use strict";

    const SETTINGS_KEY = "youtube-comment-avatar-preview-settings-v3";
    const ROOT_ID = "youtube-comment-avatar-preview-root";
    const COMMENT_SCOPE_ATTRIBUTE = "data-nick-youtube-avatar-preview-comments";
    const COMMENT_ROOT_SELECTOR = [
        "ytd-comment-thread-renderer",
        "ytd-comment-renderer",
        "ytd-comment-view-model",
        "yt-comment-thread-view-model",
        "yt-comment-view-model",
    ].join(",");
    const HEART_ROOT_SELECTOR = [
        "ytd-creator-heart-renderer",
        "ytd-creator-heart",
        "ytd-creator-heart-view-model",
        "yt-creator-heart-renderer",
        "yt-creator-heart-view-model",
        "#creator-heart",
        "#creator-heart-button",
    ].join(",");
    const AVATAR_SHAPE_SELECTOR = "yt-avatar-shape, .yt-spec-avatar-shape";
    const AUTHOR_LINK_SELECTOR = [
        'a[href^="/@"]',
        'a[href^="/channel/"]',
        'a[href*="youtube.com/@"]',
        'a[href*="youtube.com/channel/"]',
    ].join(",");
    const SHAPES = new Set([
        "circle",
        "rounded",
        "square",
    ]);
    const DEFAULT_SETTINGS = Object.freeze({
        enabled: true,
        previewSize: 320,
        hoverDelay: 125,
        hdSize: 800,
        shape: "circle",
        showAuthorLabel: true,
    });
    const LIMITS = Object.freeze({
        previewSize: Object.freeze({ min: 180, max: 640 }),
        hoverDelay: Object.freeze({ min: 0, max: 1500 }),
        hdSize: Object.freeze({ min: 96, max: 1600 }),
    });

    if (document.documentElement.hasAttribute(COMMENT_SCOPE_ATTRIBUTE)) return;
    document.documentElement.setAttribute(
        COMMENT_SCOPE_ATTRIBUTE,
        "comments-only"
    );

    let settings = await loadSettings();
    let hoveredAvatar = null;
    let focusedAvatar = null;
    let lastInteraction = "pointer";
    let activeAvatar = null;
    let pendingPreviewTimer = 0;
    let scrollAnimationFrame = 0;
    let previouslyFocusedElement = null;
    let previewRequestController = null;
    let loadRequestId = 0;

    const host = document.createElement("div");
    host.id = ROOT_ID;
    const shadow = host.attachShadow({ mode: "open" });
    const ui = createInterface();
    shadow.append(ui.style, ui.preview, ui.dialog);
    document.documentElement.append(host);

    document.addEventListener("pointerover", handlePointerOver, true);
    document.addEventListener("pointerout", handlePointerOut, true);
    document.addEventListener("focusin", handleFocusIn, true);
    document.addEventListener("focusout", handleFocusOut, true);
    document.addEventListener("keydown", handleDocumentKeydown, true);
    document.addEventListener("yt-navigate-start", resetInteraction, true);
    window.addEventListener("popstate", resetInteraction);
    window.addEventListener("hashchange", resetInteraction);
    window.addEventListener("blur", resetInteraction);
    window.addEventListener("scroll", handleScroll, {
        capture: true,
        passive: true,
    });
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) resetInteraction();
    });

    try {
        GM.registerMenuCommand(
            "Configure comment avatar previews…",
            openSettings
        );
    } catch (error) {
        console.warn(
            "Unable to register the comment avatar settings command.",
            error
        );
    }

    function normalizeInteger(value, limits, fallback) {
        const number = Number(value);
        return Number.isInteger(number) &&
            number >= limits.min &&
            number <= limits.max
            ? number
            : fallback;
    }

    function normalizeSettings(value) {
        const stored = value && typeof value === "object" ? value : {};
        const previewSize = normalizeInteger(
            stored.previewSize,
            LIMITS.previewSize,
            DEFAULT_SETTINGS.previewSize
        );
        const hdSize = normalizeInteger(
            stored.hdSize,
            LIMITS.hdSize,
            DEFAULT_SETTINGS.hdSize
        );
        return {
            enabled:
                typeof stored.enabled === "boolean"
                    ? stored.enabled
                    : DEFAULT_SETTINGS.enabled,
            previewSize,
            hoverDelay: normalizeInteger(
                stored.hoverDelay,
                LIMITS.hoverDelay,
                DEFAULT_SETTINGS.hoverDelay
            ),
            hdSize: Math.max(previewSize, hdSize),
            shape: SHAPES.has(stored.shape)
                ? stored.shape
                : DEFAULT_SETTINGS.shape,
            showAuthorLabel:
                typeof stored.showAuthorLabel === "boolean"
                    ? stored.showAuthorLabel
                    : DEFAULT_SETTINGS.showAuthorLabel,
        };
    }

    async function loadSettings() {
        try {
            return normalizeSettings(
                await GM.getValue(SETTINGS_KEY, DEFAULT_SETTINGS)
            );
        } catch (error) {
            console.warn(
                "Unable to load comment avatar preview settings.",
                error
            );
            return { ...DEFAULT_SETTINGS };
        }
    }

    async function persistSettings(value) {
        try {
            await GM.setValue(SETTINGS_KEY, value);
            return true;
        } catch (error) {
            console.error(
                "Unable to save comment avatar preview settings.",
                error
            );
            return false;
        }
    }

    function createElement(tagName, className, text) {
        const element = document.createElement(tagName);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }

    function createInterface() {
        const style = document.createElement("style");
        style.textContent = `
			:host {
				all: initial;
				color-scheme: light dark;
				font-family: Roboto, Arial, sans-serif;
			}

			[hidden] {
				display: none !important;
			}

			.preview {
				--preview-size: 320px;
				position: fixed;
				z-index: 2147483646;
				box-sizing: border-box;
				width: var(--preview-size);
				overflow: hidden;
				pointer-events: none;
				color: #f8fafc;
				background: rgb(15 23 42 / 94%);
				border: 1px solid rgb(255 255 255 / 16%);
				border-radius: 18px;
				box-shadow: 0 20px 52px rgb(0 0 0 / 42%), 0 4px 14px rgb(0 0 0 / 28%);
				backdrop-filter: blur(18px) saturate(145%);
				transform-origin: center;
				animation: preview-enter 130ms ease-out;
			}

			.preview-media {
				position: relative;
				display: grid;
				width: 100%;
				aspect-ratio: 1;
				place-items: center;
				overflow: hidden;
				background:
					radial-gradient(circle at 30% 20%, rgb(59 130 246 / 24%), transparent 48%),
					linear-gradient(145deg, #172033, #0b1020);
			}

			.preview-image {
				display: block;
				box-sizing: border-box;
				width: calc(100% - 18px);
				height: calc(100% - 18px);
				object-fit: cover;
				background: #111827;
				border: 1px solid rgb(255 255 255 / 18%);
				box-shadow: 0 8px 24px rgb(0 0 0 / 30%);
			}

			.preview[data-shape='circle'] .preview-image {
				border-radius: 50%;
			}

			.preview[data-shape='rounded'] .preview-image {
				border-radius: 18%;
			}

			.preview[data-shape='square'] .preview-image {
				border-radius: 8px;
			}

			.preview-spinner {
				box-sizing: border-box;
				width: 42px;
				height: 42px;
				border: 4px solid rgb(255 255 255 / 18%);
				border-top-color: #60a5fa;
				border-radius: 50%;
				animation: preview-spin 700ms linear infinite;
			}

			.preview-fallback {
				max-width: 78%;
				color: #cbd5e1;
				font-size: 14px;
				font-weight: 500;
				line-height: 1.45;
				text-align: center;
			}

			.preview-footer {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 12px;
				box-sizing: border-box;
				min-height: 54px;
				padding: 10px 13px 11px;
				border-top: 1px solid rgb(255 255 255 / 10%);
			}

			.preview-author {
				overflow: hidden;
				color: #f8fafc;
				font-size: 14px;
				font-weight: 650;
				line-height: 1.3;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.preview-kind {
				flex: none;
				padding: 4px 7px;
				color: #bfdbfe;
				font-size: 10px;
				font-weight: 700;
				letter-spacing: 0.04em;
				text-transform: uppercase;
				background: rgb(37 99 235 / 26%);
				border: 1px solid rgb(96 165 250 / 32%);
				border-radius: 999px;
			}

			dialog {
				box-sizing: border-box;
				width: min(560px, calc(100vw - 32px));
				max-height: min(760px, calc(100vh - 32px));
				padding: 0;
				overflow: hidden auto;
				color: #e5e7eb;
				background: #111827;
				border: 1px solid rgb(255 255 255 / 14%);
				border-radius: 20px;
				box-shadow: 0 28px 80px rgb(0 0 0 / 55%);
			}

			dialog::backdrop {
				background: rgb(2 6 23 / 72%);
				backdrop-filter: blur(5px);
			}

			.dialog-header {
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				gap: 16px;
				padding: 22px 22px 18px;
				background: linear-gradient(135deg, rgb(37 99 235 / 18%), transparent 64%);
				border-bottom: 1px solid rgb(255 255 255 / 10%);
			}

			.dialog-title {
				margin: 0;
				color: #f8fafc;
				font-size: 22px;
				font-weight: 750;
				line-height: 1.2;
			}

			.dialog-subtitle {
				margin: 7px 0 0;
				color: #aeb9ca;
				font-size: 13px;
				line-height: 1.45;
			}

			.icon-button,
			.button {
				font: inherit;
				cursor: pointer;
			}

			.icon-button {
				display: grid;
				flex: none;
				width: 36px;
				height: 36px;
				padding: 0;
				place-items: center;
				color: #cbd5e1;
				font-size: 24px;
				line-height: 1;
				background: rgb(255 255 255 / 6%);
				border: 1px solid rgb(255 255 255 / 10%);
				border-radius: 10px;
			}

			.icon-button:hover,
			.icon-button:focus-visible {
				color: #fff;
				background: rgb(255 255 255 / 12%);
			}

			.settings-form {
				padding: 20px 22px 22px;
			}

			.settings-grid {
				display: grid;
				gap: 14px;
			}

			.field,
			.toggle {
				box-sizing: border-box;
				padding: 14px;
				background: rgb(255 255 255 / 4%);
				border: 1px solid rgb(255 255 255 / 9%);
				border-radius: 13px;
			}

			.field-label,
			.toggle-label {
				color: #f3f4f6;
				font-size: 14px;
				font-weight: 650;
			}

			.field-description,
			.toggle-description {
				display: block;
				margin-top: 4px;
				color: #9ca3af;
				font-size: 12px;
				font-weight: 400;
				line-height: 1.4;
			}

			.field input,
			.field select {
				box-sizing: border-box;
				width: 100%;
				margin-top: 10px;
				padding: 10px 11px;
				color: #f9fafb;
				font: inherit;
				font-size: 14px;
				background: #0b1220;
				border: 1px solid #3b475a;
				border-radius: 9px;
				outline: none;
			}

			.field input:focus,
			.field select:focus,
			.button:focus-visible {
				border-color: #60a5fa;
				box-shadow: 0 0 0 3px rgb(59 130 246 / 24%);
			}

			.toggle {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 18px;
				cursor: pointer;
			}

			.toggle-copy {
				min-width: 0;
			}

			.toggle input {
				width: 20px;
				height: 20px;
				margin: 0;
				accent-color: #3b82f6;
			}

			.form-status {
				min-height: 20px;
				margin: 14px 2px 0;
				color: #fca5a5;
				font-size: 12px;
				line-height: 1.4;
			}

			.form-status[data-kind='info'] {
				color: #93c5fd;
			}

			.dialog-actions {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				gap: 9px;
				margin-top: 4px;
			}

			.button {
				min-height: 39px;
				padding: 8px 14px;
				color: #e5e7eb;
				font-size: 13px;
				font-weight: 650;
				background: rgb(255 255 255 / 6%);
				border: 1px solid rgb(255 255 255 / 12%);
				border-radius: 9px;
			}

			.button:hover {
				background: rgb(255 255 255 / 11%);
			}

			.button-reset {
				margin-right: auto;
			}

			.button-primary {
				color: #fff;
				background: #2563eb;
				border-color: #3b82f6;
			}

			.button-primary:hover {
				background: #1d4ed8;
			}

			@keyframes preview-enter {
				from {
					opacity: 0;
					transform: translateY(4px) scale(0.985);
				}
			}

			@keyframes preview-spin {
				to {
					transform: rotate(360deg);
				}
			}

			@media (max-width: 520px) {
				.dialog-header,
				.settings-form {
					padding-right: 16px;
					padding-left: 16px;
				}

				.dialog-actions {
					flex-wrap: wrap;
				}
			}

			@media (prefers-reduced-motion: reduce) {
				.preview {
					animation: none;
				}

				.preview-spinner {
					animation-duration: 1.4s;
				}
			}

			@media (forced-colors: active) {
				.preview,
				dialog,
				.field,
				.toggle {
					border: 1px solid CanvasText;
				}
			}
		`;

        const preview = createElement("section", "preview");
        preview.hidden = true;
        preview.dataset.shape = settings.shape;
        preview.dataset.state = "loading";
        preview.setAttribute("role", "status");
        preview.setAttribute("aria-live", "polite");
        preview.setAttribute("aria-atomic", "true");

        const media = createElement("div", "preview-media");
        const image = createElement("img", "preview-image");
        image.hidden = true;
        image.decoding = "async";
        image.draggable = false;
        const spinner = createElement("div", "preview-spinner");
        spinner.setAttribute("aria-hidden", "true");
        const fallback = createElement(
            "p",
            "preview-fallback",
            "Unable to load this profile picture."
        );
        fallback.hidden = true;
        media.append(image, spinner, fallback);

        const footer = createElement("footer", "preview-footer");
        const author = createElement("div", "preview-author");
        const kind = createElement("span", "preview-kind");
        footer.append(author, kind);
        preview.append(media, footer);

        const dialog = document.createElement("dialog");
        dialog.setAttribute("aria-labelledby", "comment-avatar-settings-title");
        dialog.setAttribute(
            "aria-describedby",
            "comment-avatar-settings-description"
        );

        const header = createElement("header", "dialog-header");
        const headingGroup = createElement("div");
        const title = createElement(
            "h2",
            "dialog-title",
            "Comment avatar previews"
        );
        title.id = "comment-avatar-settings-title";
        const subtitle = createElement(
            "p",
            "dialog-subtitle",
            "Fine-tune previews without changing YouTube’s original images or layout."
        );
        subtitle.id = "comment-avatar-settings-description";
        headingGroup.append(title, subtitle);
        const closeButton = createElement("button", "icon-button", "×");
        closeButton.type = "button";
        closeButton.setAttribute("aria-label", "Close settings");
        header.append(headingGroup, closeButton);

        const form = createElement("form", "settings-form");
        form.noValidate = false;
        const grid = createElement("div", "settings-grid");
        const enabled = createToggle(
            "comment-avatar-enabled",
            "Enable avatar previews",
            "Show previews when a comment avatar is hovered or keyboard-focused."
        );
        const previewSize = createNumberField(
            "comment-avatar-preview-size",
            "Preview size",
            "Width and image height in pixels (180–640).",
            LIMITS.previewSize,
            1
        );
        const hoverDelay = createNumberField(
            "comment-avatar-hover-delay",
            "Hover delay",
            "Delay in milliseconds before a pointer preview opens (0–1500).",
            LIMITS.hoverDelay,
            25
        );
        const hdSize = createNumberField(
            "comment-avatar-hd-size",
            "HD image target",
            "Requested source resolution in pixels (96–1600).",
            LIMITS.hdSize,
            1
        );
        const shape = createSelectField(
            "comment-avatar-shape",
            "Preview shape",
            "Choose how the enlarged image is cropped.",
            [
                { value: "circle", label: "Circle" },
                { value: "rounded", label: "Rounded square" },
                { value: "square", label: "Square" },
            ]
        );
        const authorLabel = createToggle(
            "comment-avatar-author-label",
            "Show author label",
            "Display the channel name and avatar type below the image."
        );
        grid.append(
            enabled.wrapper,
            previewSize.wrapper,
            hoverDelay.wrapper,
            hdSize.wrapper,
            shape.wrapper,
            authorLabel.wrapper
        );

        const status = createElement("p", "form-status");
        status.setAttribute("role", "alert");
        const actions = createElement("footer", "dialog-actions");
        const resetButton = createElement(
            "button",
            "button button-reset",
            "Reset"
        );
        resetButton.type = "button";
        const cancelButton = createElement("button", "button", "Cancel");
        cancelButton.type = "button";
        const saveButton = createElement(
            "button",
            "button button-primary",
            "Save"
        );
        saveButton.type = "submit";
        actions.append(resetButton, cancelButton, saveButton);
        form.append(grid, status, actions);
        dialog.append(header, form);

        const controls = {
            enabled: enabled.input,
            previewSize: previewSize.input,
            hoverDelay: hoverDelay.input,
            hdSize: hdSize.input,
            shape: shape.select,
            showAuthorLabel: authorLabel.input,
        };

        closeButton.addEventListener("click", closeSettings);
        cancelButton.addEventListener("click", closeSettings);
        resetButton.addEventListener("click", () => {
            populateSettingsForm(controls, DEFAULT_SETTINGS);
            validateResolutionFields(controls);
            status.dataset.kind = "info";
            status.textContent =
                "Defaults restored in this form. Choose Save to apply them.";
        });
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            validateResolutionFields(controls);
            if (!form.reportValidity()) return;

            const nextSettings = normalizeSettings({
                enabled: controls.enabled.checked,
                previewSize: Number(controls.previewSize.value),
                hoverDelay: Number(controls.hoverDelay.value),
                hdSize: Number(controls.hdSize.value),
                shape: controls.shape.value,
                showAuthorLabel: controls.showAuthorLabel.checked,
            });

            if (!(await persistSettings(nextSettings))) {
                status.dataset.kind = "error";
                status.textContent =
                    "Settings could not be saved. Check the userscript manager console.";
                return;
            }

            settings = nextSettings;
            preview.dataset.shape = settings.shape;
            resetInteraction();
            dialog.close("saved");
        });
        controls.previewSize.addEventListener("input", () =>
            validateResolutionFields(controls)
        );
        controls.hdSize.addEventListener("input", () =>
            validateResolutionFields(controls)
        );
        dialog.addEventListener("click", (event) => {
            if (event.target !== dialog) return;
            const bounds = dialog.getBoundingClientRect();
            const outside =
                event.clientX < bounds.left ||
                event.clientX > bounds.right ||
                event.clientY < bounds.top ||
                event.clientY > bounds.bottom;
            if (outside) closeSettings();
        });
        dialog.addEventListener("close", () => {
            if (
                previouslyFocusedElement instanceof HTMLElement &&
                previouslyFocusedElement.isConnected
            ) {
                previouslyFocusedElement.focus({ preventScroll: true });
            }
            previouslyFocusedElement = null;
        });

        return {
            style,
            preview,
            previewImage: image,
            previewSpinner: spinner,
            previewFallback: fallback,
            previewFooter: footer,
            previewAuthor: author,
            previewKind: kind,
            dialog,
            form,
            status,
            controls,
        };
    }

    function createToggle(id, labelText, descriptionText) {
        const wrapper = createElement("label", "toggle");
        wrapper.htmlFor = id;
        const copy = createElement("span", "toggle-copy");
        const label = createElement("span", "toggle-label", labelText);
        const description = createElement(
            "span",
            "toggle-description",
            descriptionText
        );
        const input = document.createElement("input");
        input.id = id;
        input.type = "checkbox";
        copy.append(label, description);
        wrapper.append(copy, input);
        return { wrapper, input };
    }

    function createNumberField(id, labelText, descriptionText, limits, step) {
        const wrapper = createElement("div", "field");
        const label = createElement("label", "field-label", labelText);
        label.htmlFor = id;
        const description = createElement(
            "span",
            "field-description",
            descriptionText
        );
        const input = document.createElement("input");
        input.id = id;
        input.type = "number";
        input.required = true;
        input.min = String(limits.min);
        input.max = String(limits.max);
        input.step = String(step);
        label.append(description);
        wrapper.append(label, input);
        return { wrapper, input };
    }

    function createSelectField(id, labelText, descriptionText, options) {
        const wrapper = createElement("div", "field");
        const label = createElement("label", "field-label", labelText);
        label.htmlFor = id;
        const description = createElement(
            "span",
            "field-description",
            descriptionText
        );
        const select = document.createElement("select");
        select.id = id;
        for (const item of options) {
            const option = document.createElement("option");
            option.value = item.value;
            option.textContent = item.label;
            select.append(option);
        }
        label.append(description);
        wrapper.append(label, select);
        return { wrapper, select };
    }

    function populateSettingsForm(controls, value) {
        controls.enabled.checked = value.enabled;
        controls.previewSize.value = String(value.previewSize);
        controls.hoverDelay.value = String(value.hoverDelay);
        controls.hdSize.value = String(value.hdSize);
        controls.shape.value = value.shape;
        controls.showAuthorLabel.checked = value.showAuthorLabel;
    }

    function validateResolutionFields(controls) {
        const previewSize = Number(controls.previewSize.value);
        const hdSize = Number(controls.hdSize.value);
        const message =
            Number.isFinite(previewSize) &&
            Number.isFinite(hdSize) &&
            hdSize < previewSize
                ? "HD image target must be at least as large as the preview size."
                : "";
        controls.hdSize.setCustomValidity(message);
    }

    function openSettings() {
        resetInteraction();
        populateSettingsForm(ui.controls, settings);
        validateResolutionFields(ui.controls);
        ui.status.textContent = "";
        delete ui.status.dataset.kind;
        previouslyFocusedElement = document.activeElement;
        if (!ui.dialog.open) ui.dialog.showModal();
        ui.controls.enabled.focus();
    }

    function closeSettings() {
        if (ui.dialog.open) ui.dialog.close("cancel");
    }

    function handlePointerOver(event) {
        if (!settings.enabled || event.pointerType === "touch") return;
        const avatar = resolveAvatar(event.target);
        if (!avatar) return;
        if (
            event.relatedTarget instanceof Node &&
            avatar.root.contains(event.relatedTarget)
        )
            return;

        hoveredAvatar = avatar;
        lastInteraction = "pointer";
        reconcilePreview(settings.hoverDelay);
    }

    function handlePointerOut(event) {
        if (!hoveredAvatar || !(event.target instanceof Node)) return;
        if (!hoveredAvatar.root.contains(event.target)) return;
        if (
            event.relatedTarget instanceof Node &&
            hoveredAvatar.root.contains(event.relatedTarget)
        )
            return;

        hoveredAvatar = null;
        if (focusedAvatar) lastInteraction = "focus";
        reconcilePreview(0);
    }

    function handleFocusIn(event) {
        if (!settings.enabled) return;
        const avatar = resolveAvatar(event.target);
        if (!avatar) return;

        focusedAvatar = avatar;
        lastInteraction = "focus";
        reconcilePreview(0);
    }

    function handleFocusOut(event) {
        if (!focusedAvatar || !(event.target instanceof Node)) return;
        if (!focusedAvatar.root.contains(event.target)) return;
        if (
            event.relatedTarget instanceof Node &&
            focusedAvatar.root.contains(event.relatedTarget)
        )
            return;

        focusedAvatar = null;
        if (hoveredAvatar) lastInteraction = "pointer";
        reconcilePreview(0);
    }

    function handleDocumentKeydown(event) {
        if (event.key !== "Escape" || ui.dialog.open) return;
        resetInteraction();
    }

    function handleResize() {
        if (!activeAvatar) return;
        if (!activeAvatar.root.isConnected) {
            resetInteraction();
            return;
        }
        const bounds = activeAvatar.root.getBoundingClientRect();
        if (!isInViewport(bounds)) {
            resetInteraction();
            return;
        }
        positionPreview(bounds);
    }

    function handleScroll() {
        if (!activeAvatar || scrollAnimationFrame) return;
        scrollAnimationFrame = window.requestAnimationFrame(() => {
            scrollAnimationFrame = 0;
            if (!activeAvatar?.root.isConnected) {
                resetInteraction();
                return;
            }
            const bounds = activeAvatar.root.getBoundingClientRect();
            if (!isInViewport(bounds)) {
                resetInteraction();
                return;
            }
            positionPreview(bounds);
        });
    }

    function isInViewport(bounds) {
        return (
            bounds.bottom > 0 &&
            bounds.right > 0 &&
            bounds.top < window.innerHeight &&
            bounds.left < window.innerWidth
        );
    }

    function getPreferredAvatar() {
        if (lastInteraction === "focus" && focusedAvatar) return focusedAvatar;
        if (lastInteraction === "pointer" && hoveredAvatar)
            return hoveredAvatar;
        return hoveredAvatar || focusedAvatar;
    }

    function reconcilePreview(delay) {
        window.clearTimeout(pendingPreviewTimer);
        pendingPreviewTimer = 0;
        const candidate = settings.enabled ? getPreferredAvatar() : null;

        if (!candidate) {
            hidePreview();
            return;
        }

        if (activeAvatar?.root === candidate.root) {
            positionPreview(candidate.root.getBoundingClientRect());
            return;
        }

        hidePreview();
        if (delay === 0) {
            showPreview(candidate);
            return;
        }

        pendingPreviewTimer = window.setTimeout(() => {
            pendingPreviewTimer = 0;
            const current = getPreferredAvatar();
            if (current?.root === candidate.root) showPreview(current);
        }, delay);
    }

    function resolveAvatar(target) {
        if (!(target instanceof Element)) return null;
        const commentRoot = target.closest(COMMENT_ROOT_SELECTOR);
        if (!commentRoot) return null;

        const heartRoot = findOutermostRoot(
            target,
            HEART_ROOT_SELECTOR,
            commentRoot
        );
        if (
            heartRoot &&
            heartRoot.closest(COMMENT_ROOT_SELECTOR) === commentRoot
        ) {
            const image = findAvatarImage(heartRoot, target);
            if (!image) return null;
            return createAvatarDescriptor(
                heartRoot,
                image,
                commentRoot,
                "Creator heart"
            );
        }

        let authorRoot = findOutermostRoot(
            target,
            "#author-thumbnail",
            commentRoot
        );
        if (authorRoot?.closest(COMMENT_ROOT_SELECTOR) !== commentRoot)
            authorRoot = null;

        if (!authorRoot) {
            const shape = target.closest(AVATAR_SHAPE_SELECTOR);
            const authorLink = shape?.closest(AUTHOR_LINK_SELECTOR);
            if (authorLink?.closest(COMMENT_ROOT_SELECTOR) === commentRoot)
                authorRoot = authorLink;
        }

        if (!authorRoot) {
            const authorLink = target.closest(AUTHOR_LINK_SELECTOR);
            if (
                authorLink?.closest(COMMENT_ROOT_SELECTOR) === commentRoot &&
                authorLink.querySelector(AVATAR_SHAPE_SELECTOR)
            ) {
                authorRoot = authorLink;
            }
        }

        if (!authorRoot) return null;
        const image = findAvatarImage(authorRoot, target);
        if (!image || image.closest(COMMENT_ROOT_SELECTOR) !== commentRoot)
            return null;
        return createAvatarDescriptor(
            authorRoot,
            image,
            commentRoot,
            "Comment author"
        );
    }

    function findOutermostRoot(target, selector, commentRoot) {
        let root = target.closest(selector);
        if (root?.closest(COMMENT_ROOT_SELECTOR) !== commentRoot) return null;

        let outerRoot = root.parentElement?.closest(selector);
        while (outerRoot?.closest(COMMENT_ROOT_SELECTOR) === commentRoot) {
            root = outerRoot;
            outerRoot = root.parentElement?.closest(selector);
        }
        return root;
    }

    function findAvatarImage(root, target) {
        const eventImage =
            target instanceof HTMLImageElement ? target : target.closest("img");
        if (eventImage && root.contains(eventImage)) return eventImage;
        return root.querySelector("img");
    }

    function createAvatarDescriptor(root, image, commentRoot, kind) {
        const source = getImageSource(image);
        if (!source) return null;
        return {
            root,
            image,
            originalSource: source,
            hdSource: upgradeAvatarUrl(source, settings.hdSize),
            author: getAuthorLabel(root, image, commentRoot, kind),
            kind,
        };
    }

    function getImageSource(image) {
        const candidates = [
            image.currentSrc,
            image.getAttribute("src"),
            image.getAttribute("data-src"),
            image.getAttribute("data-thumb"),
        ];
        return (
            candidates.find(
                (source) => source && !source.startsWith("data:")
            ) || ""
        );
    }

    function upgradeAvatarUrl(source, size) {
        try {
            const parsed = new URL(source, location.href);
            if (!["http:", "https:"].includes(parsed.protocol)) return source;
        } catch {
            return source;
        }

        const replacements = [
            [/([=/])s\d{1,4}(?=[-/?#&]|$)/i, `$1s${size}`],
            [/([=/])w\d{1,4}-h\d{1,4}(?=[-/?#&]|$)/i, `$1w${size}-h${size}`],
            [/([?&](?:s|sz|size)=)\d{1,4}(?=(&|#|$))/i, `$1${size}`],
            [/([?&]w=)\d{1,4}(&h=)\d{1,4}(?=(&|#|$))/i, `$1${size}$2${size}`],
        ];

        for (const [pattern, replacement] of replacements) {
            if (pattern.test(source))
                return source.replace(pattern, replacement);
        }
        return source;
    }

    function cleanLabel(value) {
        return value?.replace(/\s+/g, " ").trim().slice(0, 120) || "";
    }

    function getAuthorLabel(root, image, commentRoot, kind) {
        const authorText = commentRoot.querySelector(
            '[id="author-text"], [id="author-name"]'
        );
        const candidates =
            kind === "Creator heart"
                ? [
                      image.getAttribute("alt"),
                      root.getAttribute("aria-label"),
                      root.getAttribute("title"),
                  ]
                : [
                      authorText?.textContent,
                      image.getAttribute("alt"),
                      root.getAttribute("aria-label"),
                      root.getAttribute("title"),
                  ];

        for (const candidate of candidates) {
            const label = cleanLabel(candidate);
            if (label) return label;
        }
        return kind === "Creator heart" ? "Channel creator" : "Comment author";
    }

    function showPreview(avatar) {
        if (!settings.enabled || !avatar.root.isConnected) return;
        previewRequestController?.abort();
        const requestController = new AbortController();
        previewRequestController = requestController;
        const requestId = ++loadRequestId;
        activeAvatar = avatar;
        ui.preview.dataset.shape = settings.shape;
        ui.preview.dataset.state = "loading";
        ui.previewAuthor.textContent = avatar.author;
        ui.previewKind.textContent = avatar.kind;
        ui.previewFooter.hidden = !settings.showAuthorLabel;
        ui.previewFallback.hidden = true;
        ui.previewImage.hidden = true;
        ui.previewSpinner.hidden = false;
        ui.previewImage.alt = `${avatar.author} profile picture`;
        ui.preview.hidden = false;
        positionPreview(avatar.root.getBoundingClientRect());

        loadPreviewSource(
            avatar,
            requestId,
            avatar.hdSource,
            "ready",
            requestController.signal
        );
    }

    function loadPreviewSource(avatar, requestId, source, state, signal) {
        const loader = new Image();
        loader.decoding = "async";
        loader.addEventListener(
            "load",
            () => showLoadedPreview(avatar, requestId, source, state),
            { signal }
        );
        loader.addEventListener(
            "error",
            () => handlePreviewImageError(avatar, requestId, source, signal),
            { signal }
        );
        loader.src = source;
    }

    function isCurrentImageRequest(avatar, requestId) {
        return (
            requestId === loadRequestId &&
            activeAvatar?.root === avatar.root &&
            avatar.root.isConnected
        );
    }

    function showLoadedPreview(avatar, requestId, source, state) {
        if (!isCurrentImageRequest(avatar, requestId)) return;
        ui.previewImage.src = source;
        ui.preview.dataset.state = state;
        ui.previewSpinner.hidden = true;
        ui.previewFallback.hidden = state === "ready";
        ui.previewFallback.textContent =
            state === "ready"
                ? ""
                : "HD unavailable — showing standard quality.";
        ui.previewImage.hidden = false;
        positionPreview(avatar.root.getBoundingClientRect());
    }

    function handlePreviewImageError(avatar, requestId, failedSource, signal) {
        if (!isCurrentImageRequest(avatar, requestId)) return;
        if (
            failedSource === avatar.hdSource &&
            avatar.originalSource !== avatar.hdSource
        ) {
            ui.previewFallback.hidden = false;
            ui.previewFallback.textContent =
                "HD unavailable — trying standard quality.";
            loadPreviewSource(
                avatar,
                requestId,
                avatar.originalSource,
                "fallback",
                signal
            );
            return;
        }

        ui.preview.dataset.state = "error";
        ui.previewSpinner.hidden = true;
        ui.previewImage.hidden = true;
        ui.previewFallback.hidden = false;
        ui.previewFallback.textContent = "Profile picture unavailable.";
        positionPreview(avatar.root.getBoundingClientRect());
    }

    function positionPreview(targetBounds) {
        if (ui.preview.hidden) return;
        const margin = 12;
        const gap = 14;
        const availableWidth = Math.max(96, window.innerWidth - margin * 2);
        const footerAllowance = settings.showAuthorLabel ? 56 : 0;
        const availableHeight = Math.max(
            96,
            window.innerHeight - margin * 2 - footerAllowance
        );
        const renderedSize = Math.max(
            96,
            Math.min(settings.previewSize, availableWidth, availableHeight)
        );
        ui.preview.style.setProperty("--preview-size", `${renderedSize}px`);
        ui.preview.style.left = "0";
        ui.preview.style.top = "0";

        const previewBounds = ui.preview.getBoundingClientRect();
        let left = targetBounds.right + gap;
        if (left + previewBounds.width > window.innerWidth - margin) {
            left = targetBounds.left - gap - previewBounds.width;
        }
        if (left < margin) {
            left =
                targetBounds.left +
                targetBounds.width / 2 -
                previewBounds.width / 2;
        }

        const centeredTop =
            targetBounds.top +
            targetBounds.height / 2 -
            previewBounds.height / 2;
        const top = Math.min(
            Math.max(margin, centeredTop),
            Math.max(margin, window.innerHeight - margin - previewBounds.height)
        );
        const clampedLeft = Math.min(
            Math.max(margin, left),
            Math.max(margin, window.innerWidth - margin - previewBounds.width)
        );
        ui.preview.style.left = `${Math.round(clampedLeft)}px`;
        ui.preview.style.top = `${Math.round(top)}px`;
    }

    function hidePreview() {
        previewRequestController?.abort();
        previewRequestController = null;
        loadRequestId += 1;
        activeAvatar = null;
        ui.preview.hidden = true;
        ui.previewImage.removeAttribute("src");
        ui.previewImage.hidden = true;
        ui.previewSpinner.hidden = true;
        ui.previewFallback.hidden = true;
    }

    function resetInteraction() {
        window.clearTimeout(pendingPreviewTimer);
        window.cancelAnimationFrame(scrollAnimationFrame);
        pendingPreviewTimer = 0;
        scrollAnimationFrame = 0;
        hoveredAvatar = null;
        focusedAvatar = null;
        hidePreview();
    }
})();
