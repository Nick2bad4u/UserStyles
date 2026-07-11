#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

import { createCanvas } from "canvas";

const PREVIEW_DIR = path.resolve("assets", "previews");
const WIDTH = 1280;
const HEIGHT = 720;

function ensurePreviewDir() {
    fs.mkdirSync(PREVIEW_DIR, { recursive: true });
}

function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

function fillRounded(ctx, x, y, width, height, radius, fillStyle) {
    roundedRect(ctx, x, y, width, height, radius);
    ctx.fillStyle = fillStyle;
    ctx.fill();
}

function text(ctx, value, x, y, options = {}) {
    ctx.fillStyle = options.color ?? "#ffffff";
    ctx.font = `${options.weight ?? 600} ${options.size ?? 32}px ${options.family ?? "Segoe UI, Arial, sans-serif"}`;
    ctx.fillText(value, x, y);
}

function writePreview(filename, draw) {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    draw(ctx);

    const outputPath = path.join(PREVIEW_DIR, filename);
    fs.writeFileSync(outputPath, canvas.toBuffer("image/png"));
    return outputPath;
}

function drawGitHubSelectedTab(ctx) {
    const accent = "#4183c4";
    const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    gradient.addColorStop(0, "#0d1117");
    gradient.addColorStop(1, "#161b22");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    text(ctx, "GitHub Selected Tab Color", 80, 105, { size: 48, weight: 700 });
    text(ctx, "Refined GitHub fork", 82, 150, {
        color: "#8b949e",
        size: 26,
        weight: 500,
    });

    fillRounded(ctx, 80, 205, 1120, 390, 16, "#0b1017");
    fillRounded(ctx, 110, 240, 1060, 76, 10, "#161b22");

    const tabs = [
        "Code",
        "Issues",
        "Pull requests",
        "Actions",
        "Projects",
        "Wiki",
    ];
    let x = 150;
    for (const tab of tabs) {
        const selected = tab === "Pull requests";
        text(ctx, tab, x, 289, {
            color: selected ? "#ffffff" : "#8b949e",
            size: 24,
            weight: selected ? 700 : 500,
        });

        if (selected) {
            ctx.fillStyle = accent;
            fillRounded(ctx, x - 4, 306, 150, 5, 3, accent);
        }

        x += tab === "Pull requests" ? 190 : 120;
    }

    fillRounded(ctx, 140, 365, 460, 140, 10, "#161b22");
    fillRounded(ctx, 640, 365, 480, 140, 10, "#161b22");
    text(ctx, "Selected navigation underline", 170, 425, { size: 28 });
    text(ctx, "Works with modern GitHub UI", 670, 425, { size: 28 });
    text(ctx, "Accent: #4183c4", 170, 470, { color: accent, size: 24 });
    text(ctx, "Refined GitHub compatible", 670, 470, {
        color: accent,
        size: 24,
    });

    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.16;
    ctx.beginPath();
    ctx.arc(1125, 120, 180, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
}

function drawStylusFluent(ctx) {
    const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    gradient.addColorStop(0, "#101114");
    gradient.addColorStop(1, "#24272d");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    text(ctx, "Stylus Fluent", 80, 105, {
        size: 52,
        weight: 700,
        family: "Arimo, Segoe UI, Arial, sans-serif",
    });
    text(ctx, "Arimo UI + CodeNewRoman Mono", 82, 150, {
        color: "#aeb4bf",
        size: 26,
        weight: 500,
    });

    fillRounded(ctx, 80, 205, 1120, 405, 18, "#1c1f25");
    fillRounded(ctx, 112, 235, 1048, 64, 10, "#2a2e36");
    text(ctx, "Stylus", 145, 276, {
        size: 28,
        family: "Arimo, Segoe UI, Arial, sans-serif",
    });
    fillRounded(ctx, 985, 249, 132, 36, 6, "#3da8ff");
    text(ctx, "Save", 1024, 276, { color: "#07111b", size: 22, weight: 700 });

    fillRounded(ctx, 120, 330, 310, 210, 10, "#242832");
    fillRounded(ctx, 465, 330, 590, 210, 10, "#11151c");
    text(ctx, "Fluent controls", 150, 385, {
        size: 28,
        family: "Arimo, Segoe UI, Arial, sans-serif",
    });
    text(ctx, "Local font policy", 150, 435, {
        color: "#aeb4bf",
        size: 22,
        weight: 500,
    });
    text(ctx, "UI: Arimo Nerd Font Propo", 500, 390, {
        color: "#dbe7ff",
        size: 25,
        family: "Arimo, Segoe UI, Arial, sans-serif",
    });
    text(ctx, "Code: CodeNewRoman Nerd Font Mono", 500, 445, {
        color: "#8cd8ff",
        size: 24,
        family: "Consolas, Cascadia Mono, monospace",
    });

    ctx.strokeStyle = "#3da8ff";
    ctx.lineWidth = 3;
    roundedRect(ctx, 143, 468, 220, 42, 7);
    ctx.stroke();
    text(ctx, "Modern Stylus UI", 165, 497, {
        color: "#ffffff",
        size: 20,
        weight: 600,
    });
}

function drawInversionDarkMode(ctx, siteName) {
    const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    gradient.addColorStop(0, "#080c14");
    gradient.addColorStop(1, "#1b2537");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    text(ctx, siteName, 80, 105, { size: 52, weight: 700 });
    text(ctx, "Inversion-based dark mode", 82, 150, {
        color: "#aebbd0",
        size: 26,
        weight: 500,
    });

    fillRounded(ctx, 80, 205, 1120, 405, 18, "#111827");
    fillRounded(ctx, 112, 235, 1048, 62, 10, "#1f2937");
    text(ctx, siteName, 145, 275, { color: "#e5e7eb", size: 26 });
    fillRounded(ctx, 1002, 249, 110, 34, 17, "#60a5fa");
    text(ctx, "Dark", 1031, 275, { color: "#0f172a", size: 20, weight: 700 });

    fillRounded(ctx, 120, 334, 350, 215, 12, "#1f2937");
    fillRounded(ctx, 505, 334, 615, 96, 12, "#1f2937");
    fillRounded(ctx, 505, 453, 460, 96, 12, "#1f2937");
    text(ctx, "Dark interface", 150, 395, { size: 30 });
    text(ctx, "Readable colors", 150, 445, {
        color: "#aebbd0",
        size: 24,
        weight: 500,
    });
    text(ctx, "Media and embedded content", 535, 390, { size: 28 });
    text(ctx, "retain natural colors", 535, 413, {
        color: "#93c5fd",
        size: 22,
        weight: 500,
    });
    text(ctx, "Light pages, comfortably inverted", 535, 511, {
        color: "#aebbd0",
        size: 25,
        weight: 500,
    });
}

ensurePreviewDir();

const outputs = [
    writePreview(
        "github-selected-tab-color-refined-github-fork.png",
        drawGitHubSelectedTab
    ),
    writePreview("stylus-fluent-arimo-codenewroman-fork.png", drawStylusFluent),
    writePreview("liveswebench-ai-dark-mode.png", (ctx) =>
        drawInversionDarkMode(ctx, "liveswebench.ai")
    ),
    writePreview("livebench-ai-dark-mode.png", (ctx) =>
        drawInversionDarkMode(ctx, "livebench.ai")
    ),
    writePreview("artificialanalysis-ai-dark-mode.png", (ctx) =>
        drawInversionDarkMode(ctx, "artificialanalysis.ai")
    ),
    writePreview("epoch-ai-dark-mode.png", (ctx) =>
        drawInversionDarkMode(ctx, "epoch.ai")
    ),
    ...[
        ["ocaml-org-dark-mode.png", "OCaml.org"],
        ["r-project-org-dark-mode.png", "R Project"],
        ["nim-language-dark-mode.png", "Nim Language"],
        ["lua-org-dark-mode.png", "Lua.org"],
        ["kotlinlang-org-dark-mode.png", "Kotlinlang.org"],
        ["elixir-language-dark-mode.png", "Elixir Language"],
        ["haskell-org-dark-mode.png", "Haskell.org"],
        ["cloud-foundry-dark-mode.png", "Cloud Foundry"],
        ["umbraco-com-dark-mode.png", "Umbraco.com"],
        ["taskwarrior-org-dark-mode.png", "Taskwarrior.org"],
        ["ui5-github-pages-dark-mode.png", "UI5 GitHub Pages"],
        ["apache-org-dark-mode.png", "Apache.org"],
        ["buf-build-dark-mode.png", "Buf.build"],
        ["bazel-build-dark-mode.png", "Bazel.build"],
        ["aurelia-io-dark-mode.png", "Aurelia.io"],
    ].map(([filename, siteName]) =>
        writePreview(filename, (ctx) => drawInversionDarkMode(ctx, siteName))
    ),
];

for (const output of outputs) {
    const stats = fs.statSync(output);
    console.log(`${path.relative(process.cwd(), output)} ${stats.size} bytes`);
}
