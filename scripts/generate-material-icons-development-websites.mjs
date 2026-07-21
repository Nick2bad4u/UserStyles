import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { format, resolveConfig } from "prettier";

const repositoryRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    ".."
);
const localFileScriptPath = path.join(
    repositoryRoot,
    "MaterialIcons-local-files.user.js"
);
const developmentFontScriptPath = path.join(
    repositoryRoot,
    "CodeNewRoman-Nerd-Font-Mono-for-Development-Websites.user.js"
);
const outputPath = path.join(
    repositoryRoot,
    "Material-Icons-for-Development-Websites.user.js"
);

const [localFileScript, developmentFontScript] = await Promise.all([
    readFile(localFileScriptPath, "utf8"),
    readFile(developmentFontScriptPath, "utf8"),
]);

const associationStart = localFileScript.indexOf("    const ICONS = {");
const localRuntimeStart = localFileScript.indexOf(
    "    const testHook = globalThis.__MATERIAL_ICONS_LOCAL_FILE_BROWSER_FULL_TEST__;"
);
if (associationStart === -1 || localRuntimeStart === -1) {
    throw new Error(
        "Could not find the generated Material Icon Theme data boundaries."
    );
}

const matchLines = developmentFontScript
    .split(/\r?\n/u)
    .filter((line) => line.startsWith("// @match"));
if (
    matchLines.length === 0 ||
    !matchLines.some((line) => line.includes("npmjs.com"))
) {
    throw new Error(
        "The development-site source must contain its userscript match list, including npmjs.com."
    );
}

const associationData = localFileScript
    .slice(associationStart, localRuntimeStart)
    .trimEnd();
const header = `// ==UserScript==
// @name         Material Icons for Development Websites (Full)
// @namespace    nick2bad4u.github.io
// @version      1.0.0
// @description  Adds the complete Material Icon Theme set to npm, GitHub, GitLab, and recognizable file browsers and code-block titles on popular development websites.
// @author       Nick2bad4u (based on Material Extensions)
// @license      UnLicense
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @downloadURL  https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/Material-Icons-for-Development-Websites.user.js
// @updateURL    https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/Material-Icons-for-Development-Websites.user.js
// @source       https://github.com/material-extensions/vscode-material-icon-theme
${matchLines.join("\n")}
// @run-at       document-start
// @grant        none
// @noframes
// ==/UserScript==

/*
 * Embedded Material Icon Theme assets and association data:
 * The MIT License (MIT)
 * Copyright (c) 2025 Material Extensions
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(() => {
    "use strict";

    // Generated from the association engine in MaterialIcons-local-files.user.js.
    // Run scripts/generate-material-icons-development-websites.mjs after updating it.
    // This file is self-contained and performs no network requests.
    // Bulk generated data is intentionally generated; edit the generator, not this file.`;

const developmentRuntime = String.raw`
    const STYLE_ID = "material-icons-development-websites-full";
    const ICON_CLASS = "material-development-site-icon";
    const ICON_ATTRIBUTE = "data-material-dev-icon";
    const TARGET_ATTRIBUTE = "data-material-dev-icon-target";
    const GENERIC_CONTAINER_SELECTOR = [
        "[role='tree']",
        "nav[aria-label*='file tree' i]",
        "[data-testid*='file-tree' i]",
        "[data-testid*='file-explorer' i]",
        "[class*='file-tree' i]",
        "[class*='file-explorer' i]",
        "[class*='directory-tree' i]",
        "[class*='tree-view' i]",
        ".directory-list",
        ".repository-tree",
    ].join(",");
    const CODE_TITLE_SELECTOR = [
        "[data-code-block-title]",
        "figcaption[data-rehype-pretty-code-title]",
        "figure[data-rehype-pretty-code-figure] > figcaption",
        "[class*='codeBlockTitle']",
    ].join(",");
    const lightMedia = globalThis.matchMedia?.("(prefers-color-scheme: light)");
    const contrastMedia = globalThis.matchMedia?.("(prefers-contrast: more)");

    const hostnameMatches = (domain) =>
        globalThis.location?.hostname === domain ||
        globalThis.location?.hostname?.endsWith("." + domain);

    const isLightAppearance = () => {
        try {
            const declaredScheme = globalThis
                .getComputedStyle?.(document.body)
                ?.colorScheme?.trim();
            if (declaredScheme === "dark") return false;
            if (declaredScheme === "light") return true;
        } catch {
            // Fall back to the operating-system preference below.
        }
        return lightMedia?.matches ?? false;
    };

    const currentMode = () => ({
        highContrast: contrastMedia?.matches ?? false,
        light: isLightAppearance(),
    });

    const cleanLabel = (value) =>
        String(value ?? "")
            .replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/gu, "")
            .replace(/,\s*\((?:directory|file)\)\s*$/iu, "")
            .trim();

    const splitCandidatePath = (value) =>
        cleanLabel(value)
            .replace(/[\\/]$/u, "")
            .split(/[\\/]/u)
            .filter(Boolean);

    const getCandidateName = (value) =>
        splitCandidatePath(value).at(-1) ?? "";

    const getParentName = (value) =>
        splitCandidatePath(value).at(-2) ?? "";

    const looksLikeFileName = (value) => {
        const name = getCandidateName(value);
        if (!name || name.length > 180) return false;
        if (resolveFileIconName(name) !== DEFAULT_ICONS.file) return true;
        return /^[^.\s/\\][^\s/\\]*\.[a-z\d][a-z\d._-]{0,24}$/iu.test(
            name
        );
    };

    const readControlLabel = (control) =>
        cleanLabel(
            control.getAttribute("data-qa-file-name") ||
                control.getAttribute("aria-label") ||
                control.getAttribute("title") ||
                control.textContent
        );

    const resolveIcon = (rawName, kind, parentName = "") => {
        const mode = currentMode();
        const iconName =
            kind === "folder"
                ? resolveFolderIconName(rawName, parentName, mode)
                : resolveFileIconName(rawName, mode);
        const fallbackName =
            kind === "folder" ? DEFAULT_ICONS.folder : DEFAULT_ICONS.file;
        return {
            dataUrl: ICONS[iconName] ?? ICONS[fallbackName],
            iconName,
        };
    };

    const decorateIconElement = (
        iconElement,
        rawName,
        kind,
        parentName = ""
    ) => {
        if (!(iconElement instanceof Element)) return;

        const { dataUrl, iconName } = resolveIcon(
            getCandidateName(rawName),
            kind,
            parentName
        );
        iconElement.setAttribute(ICON_ATTRIBUTE, iconName);
        iconElement.style.setProperty(
            "--material-dev-icon",
            'url("' + dataUrl + '")'
        );

        if (iconElement instanceof HTMLImageElement) {
            iconElement.removeAttribute("srcset");
            iconElement.src = dataUrl;
        }
    };

    const createIconElement = (control) => {
        const icon = document.createElement("span");
        icon.className = ICON_CLASS;
        icon.setAttribute("aria-hidden", "true");
        control.prepend(icon);
        return icon;
    };

    const decorateControl = ({
        control,
        existingIcon,
        kind,
        label,
        parentName = "",
    }) => {
        if (!(control instanceof Element) || !label) return;

        const icon =
            existingIcon ??
            control.querySelector(":scope > ." + ICON_CLASS) ??
            createIconElement(control);
        control.setAttribute(TARGET_ATTRIBUTE, kind);
        decorateIconElement(icon, label, kind, parentName);
    };

    const npmParentName = (table) => {
        const headingId = table.getAttribute("aria-labelledby");
        const heading = headingId ? document.getElementById(headingId) : null;
        return getCandidateName(heading?.textContent ?? "");
    };

    const applyNpmIcons = (root) => {
        root.querySelectorAll(
            "table[aria-labelledby='file-explorer-heading'] tbody tr"
        ).forEach((row) => {
            const cells = row.querySelectorAll("td");
            if (cells.length < 2) return;

            const control = cells[0].querySelector("button, a[href]");
            if (!control) return;

            const label = readControlLabel(control);
            const kind =
                cleanLabel(cells[1].textContent).toLowerCase() === "folder"
                    ? "folder"
                    : "file";
            decorateControl({
                control,
                existingIcon: cells[0].querySelector("img"),
                kind,
                label,
                parentName: npmParentName(row.closest("table")),
            });
        });
    };

    const applyGitHubIcons = (root) => {
        root.querySelectorAll(
            "[aria-labelledby='folders-and-files'] a[href*='/tree/'], " +
                "[aria-labelledby='folders-and-files'] a[href*='/blob/']"
        ).forEach((link) => {
            const href = link.getAttribute("href") ?? "";
            const label = readControlLabel(link);
            const kind = href.includes("/tree/") ? "folder" : "file";
            const cell = link.closest("td");
            const existingIcon = cell?.querySelector(
                "svg.icon-directory, svg.octicon-file, svg[data-component='Octicon']"
            );
            decorateControl({
                control: link,
                existingIcon,
                kind,
                label,
                parentName: getParentName(label),
            });
        });
    };

    const applyGitLabIcons = (root) => {
        root.querySelectorAll("main a.file-row[href]").forEach((link) => {
            const href = link.getAttribute("href") ?? "";
            const label = readControlLabel(link);
            const kind =
                link.classList.contains("folder") || href.includes("/-/tree/")
                    ? "folder"
                    : "file";
            decorateControl({
                control: link,
                existingIcon: link.querySelector(
                    "svg.folder-icon, svg.file-icon, svg[data-testid$='-icon']"
                ),
                kind,
                label,
                parentName: getParentName(label),
            });
        });
    };

    const classifyGenericControl = (control, label) => {
        const href = control.getAttribute("href") ?? "";
        const ariaLabel = cleanLabel(control.getAttribute("aria-label"));
        const classes = control.className;
        const classText =
            typeof classes === "string" ? classes : classes?.baseVal ?? "";
        const treeItem = control.closest("[role='treeitem']");
        const expandsDirectory = treeItem?.querySelector(
            "button[aria-label*='directory' i], button[aria-label*='folder' i]"
        );
        if (
            href.includes("/tree/") ||
            href.includes("/-/tree/") ||
            /(?:^|\s)folder(?:\s|$)/iu.test(classText) ||
            /\b(?:directory|folder)\b/iu.test(ariaLabel) ||
            expandsDirectory
        ) {
            return "folder";
        }
        if (
            href.includes("/blob/") ||
            href.includes("/-/blob/") ||
            /(?:^|\s)file(?:\s|$)/iu.test(classText) ||
            /\bfile\b/iu.test(ariaLabel) ||
            looksLikeFileName(label)
        ) {
            return "file";
        }
        return null;
    };

    const applyGenericFileBrowsers = (root) => {
        root.querySelectorAll(GENERIC_CONTAINER_SELECTOR).forEach((container) => {
            container.querySelectorAll("a[href], button").forEach((control) => {
                if (control.hasAttribute(TARGET_ATTRIBUTE)) return;
                const label = readControlLabel(control);
                const kind = classifyGenericControl(control, label);
                if (!kind) return;
                decorateControl({
                    control,
                    kind,
                    label,
                    parentName: getParentName(label),
                });
            });
        });
    };

    const applyCodeBlockTitles = (root) => {
        root.querySelectorAll(CODE_TITLE_SELECTOR).forEach((title) => {
            if (title.hasAttribute(TARGET_ATTRIBUTE)) return;
            const label = readControlLabel(title);
            if (!looksLikeFileName(label)) return;
            decorateControl({ control: title, kind: "file", label });
        });
    };

    const applyAll = (root = document) => {
        if (!(root instanceof Document || root instanceof Element)) return;
        if (hostnameMatches("npmjs.com")) applyNpmIcons(root);
        if (hostnameMatches("github.com")) applyGitHubIcons(root);
        if (hostnameMatches("gitlab.com")) applyGitLabIcons(root);
        applyGenericFileBrowsers(root);
        applyCodeBlockTitles(root);
    };

    const testHook =
        globalThis.__MATERIAL_ICONS_DEVELOPMENT_WEBSITES_TEST__;
    if (testHook && typeof testHook === "object") {
        Object.assign(testHook, {
            applyAll,
            hasIcon: (iconName) => Object.hasOwn(ICONS, iconName),
            iconCount: Object.keys(ICONS).length,
            resolveFileIconName,
            resolveFolderIconName,
        });
    }

    if (typeof document === "undefined") return;

    const installStyles = () => {
        if (document.getElementById(STYLE_ID)) return;
        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = [
            "." + ICON_CLASS + " {",
            "  background-image: var(--material-dev-icon) !important;",
            "  background-position: center !important;",
            "  background-repeat: no-repeat !important;",
            "  background-size: contain !important;",
            "  display: inline-block !important;",
            "  flex: 0 0 18px !important;",
            "  height: 18px !important;",
            "  margin-inline-end: 0.4rem !important;",
            "  vertical-align: text-bottom !important;",
            "  width: 18px !important;",
            "}",
            "svg[" + ICON_ATTRIBUTE + "] {",
            "  background-image: var(--material-dev-icon) !important;",
            "  background-position: center !important;",
            "  background-repeat: no-repeat !important;",
            "  background-size: contain !important;",
            "  color: transparent !important;",
            "  fill: transparent !important;",
            "}",
            "img[" + ICON_ATTRIBUTE + "] {",
            "  height: 18px !important;",
            "  object-fit: contain !important;",
            "  width: 18px !important;",
            "}",
        ].join("\n");
        (document.head || document.documentElement).append(style);
    };

    let scheduled = false;
    const scheduleApply = () => {
        if (scheduled) return;
        scheduled = true;
        queueMicrotask(() => {
            scheduled = false;
            applyAll(document);
        });
    };

    let started = false;
    const start = () => {
        if (started || !document.documentElement) return;
        started = true;
        installStyles();
        applyAll(document);

        const observer = new MutationObserver(scheduleApply);
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });

        for (const eventName of [
            "pjax:end",
            "turbo:load",
            "turbo:render",
        ]) {
            document.addEventListener(eventName, scheduleApply);
        }
        globalThis.addEventListener?.("hashchange", scheduleApply);
        globalThis.addEventListener?.("popstate", scheduleApply);
        lightMedia?.addEventListener?.("change", scheduleApply);
        contrastMedia?.addEventListener?.("change", scheduleApply);
    };

    if (document.documentElement) {
        start();
    } else {
        document.addEventListener("DOMContentLoaded", start, { once: true });
    }
`;

const output = `${header}\n${associationData}\n${developmentRuntime}\n})();\n`;
const prettierConfig = (await resolveConfig(outputPath)) ?? {};
await writeFile(
    outputPath,
    await format(output, { ...prettierConfig, filepath: outputPath }),
    "utf8"
);

console.log(
    `Generated ${path.relative(repositoryRoot, outputPath)} with ${matchLines.length} development-site matches.`
);
