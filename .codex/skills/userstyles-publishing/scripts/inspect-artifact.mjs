#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const REQUIRED_BY_KIND = {
    userscript: [
        "name",
        "namespace",
        "version",
        "description",
        "author",
        "license",
    ],
    userstyle: [
        "name",
        "version",
        "namespace",
        "description",
        "author",
        "license",
        "downloadURL",
        "updateURL",
    ],
};

const REPO_RAW_BASE =
    "https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/";

function usage() {
    return [
        "Usage: node .codex/skills/userstyles-publishing/scripts/inspect-artifact.mjs <file> [--markdown]",
        "",
        "Parses a .user.css or .user.js metadata block and prints publish-oriented checks.",
    ].join("\n");
}

function parseArgs(argv) {
    const args = argv.slice(2);
    const markdown = args.includes("--markdown");
    const positional = args.filter((arg) => arg !== "--markdown");

    if (positional.length !== 1) {
        throw new Error(usage());
    }

    return {
        filePath: positional[0],
        markdown,
    };
}

function detectKind(content, filePath) {
    if (content.includes("==UserStyle==") || filePath.endsWith(".user.css")) {
        return "userstyle";
    }

    if (content.includes("==UserScript==") || filePath.endsWith(".user.js")) {
        return "userscript";
    }

    return "unknown";
}

function extractMetadataBlock(content, kind) {
    const blockPattern =
        kind === "userstyle"
            ? /\/\*\s*==UserStyle==(?<body>[\s\S]*?)==\/UserStyle==\s*\*\//
            : /\/\/\s*==UserScript==(?<body>[\s\S]*?)\/\/\s*==\/UserScript==/;
    const match = content.match(blockPattern);

    return match?.groups?.body ?? "";
}

function parseMetadata(block) {
    const metadata = new Map();

    for (const line of block.split(/\r?\n/u)) {
        const match = line.match(
            /^\s*(?:\/\/)?\s*@(?<key>[A-Za-z][\w:-]*)\s+(?<value>.+?)\s*$/u
        );

        if (!match?.groups) {
            continue;
        }

        const { key, value } = match.groups;
        const values = metadata.get(key) ?? [];
        values.push(value.trim());
        metadata.set(key, values);
    }

    return metadata;
}

function first(metadata, key) {
    return metadata.get(key)?.[0] ?? "";
}

function pathToRawUrl(filePath) {
    const relativePath = path
        .relative(process.cwd(), path.resolve(filePath))
        .replaceAll(path.sep, "/");
    return `${REPO_RAW_BASE}${relativePath
        .split("/")
        .map((segment) => encodeURIComponent(segment))
        .join("/")}`;
}

function hasTargetRule(content, kind, metadata) {
    if (kind === "userstyle") {
        return /@-moz-document\s+(?:domain|url|url-prefix|regexp)\(/u.test(
            content
        );
    }

    return [
        "match",
        "include",
        "exclude",
    ].some((key) => metadata.has(key));
}

function greasyForkId(metadata) {
    const urls = [
        ...(metadata.get("downloadURL") ?? []),
        ...(metadata.get("updateURL") ?? []),
    ];
    const id = urls
        .map(
            (url) =>
                url.match(/update\.greasyfork\.org\/scripts\/(?<id>\d+)\//u)
                    ?.groups?.id
        )
        .find(Boolean);

    return id ?? "";
}

function buildReport(filePath, content) {
    const kind = detectKind(content, filePath);
    const block = extractMetadataBlock(content, kind);
    const metadata = parseMetadata(block);
    const expectedRawUrl = pathToRawUrl(filePath);
    const required = REQUIRED_BY_KIND[kind] ?? [];
    const missing = required.filter((key) => !metadata.has(key));
    const warnings = [];

    if (kind === "unknown") {
        warnings.push(
            "File is not recognized as .user.css UserStyle or .user.js UserScript."
        );
    }

    if (!block) {
        warnings.push("Metadata block was not found.");
    }

    if (!hasTargetRule(content, kind, metadata)) {
        warnings.push(
            kind === "userstyle"
                ? "No @-moz-document target rule found in CSS body."
                : "No @match, @include, or @exclude metadata found."
        );
    }

    for (const key of ["downloadURL", "updateURL"]) {
        const value = first(metadata, key);

        if (
            value &&
            !value.includes("greasyfork.org") &&
            value !== expectedRawUrl
        ) {
            warnings.push(`@${key} does not match expected GitHub raw URL.`);
        }
    }

    return {
        file: path.relative(process.cwd(), path.resolve(filePath)),
        kind,
        platform:
            kind === "userstyle"
                ? "UserStyles.world"
                : kind === "userscript"
                  ? "Greasy Fork"
                  : "unknown",
        name: first(metadata, "name"),
        version: first(metadata, "version"),
        description: first(metadata, "description"),
        namespace: first(metadata, "namespace"),
        downloadURL: first(metadata, "downloadURL"),
        updateURL: first(metadata, "updateURL"),
        expectedRawUrl,
        greasyForkId: greasyForkId(metadata),
        missing,
        warnings,
    };
}

function markdownReport(report) {
    const lines = [
        `# Publish Inspection: ${report.file}`,
        "",
        `- Kind: ${report.kind}`,
        `- Platform: ${report.platform}`,
        `- Name: ${report.name || "(missing)"}`,
        `- Version: ${report.version || "(missing)"}`,
        `- Namespace: ${report.namespace || "(missing)"}`,
        `- Expected raw URL: ${report.expectedRawUrl}`,
    ];

    if (report.greasyForkId) {
        lines.push(`- Greasy Fork script ID: ${report.greasyForkId}`);
    }

    if (report.missing.length > 0) {
        lines.push(
            "",
            "## Missing Required Metadata",
            ...report.missing.map((key) => `- @${key}`)
        );
    }

    if (report.warnings.length > 0) {
        lines.push(
            "",
            "## Warnings",
            ...report.warnings.map((warning) => `- ${warning}`)
        );
    }

    if (report.missing.length === 0 && report.warnings.length === 0) {
        lines.push("", "No blocking metadata issues found.");
    }

    return `${lines.join("\n")}\n`;
}

function main() {
    const { filePath, markdown } = parseArgs(process.argv);
    const absolutePath = path.resolve(filePath);
    const content = fs.readFileSync(absolutePath, "utf8");
    const report = buildReport(absolutePath, content);

    process.stdout.write(
        markdown
            ? markdownReport(report)
            : `${JSON.stringify(report, null, 2)}\n`
    );

    if (report.kind === "unknown" || report.missing.length > 0) {
        process.exitCode = 1;
    }
}

try {
    main();
} catch (error) {
    process.stderr.write(
        `${error instanceof Error ? error.message : String(error)}\n`
    );
    process.exitCode = 1;
}
