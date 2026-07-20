import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    ".."
);
const enhancerPath = path.join(
    repositoryRoot,
    "NPM-Package-and-Search-Enhancer.user.js"
);

const integrations = [
    {
        begin: "/* BEGIN INTEGRATED NPM MORE INSTALL BUTTONS */",
        capabilityAttribute: "data-npm-enhancer-install-commands",
        end: "/* END INTEGRATED NPM MORE INSTALL BUTTONS */",
        feature: "install-commands",
        file: "NPM-More-Install-Buttons.user.js",
        name: "NPM - More Install Buttons",
    },
    {
        begin: "/* BEGIN INTEGRATED NPM BUNDLEPHOBIA PACKAGE SIZE */",
        capabilityAttribute: "data-npm-enhancer-package-size",
        end: "/* END INTEGRATED NPM BUNDLEPHOBIA PACKAGE SIZE */",
        feature: "package-size",
        file: "NPM-Bundlephobia-Package-Size.user.js",
        name: "NPM - Bundlephobia Package Size",
    },
];

function extractRuntime(source) {
    const runtimeStart = source.indexOf("(function () {");
    if (runtimeStart === -1) {
        throw new Error("Could not find userscript runtime wrapper.");
    }
    return source.slice(runtimeStart).trim();
}

function removeStandaloneGuard(runtime) {
    return runtime.replace(
        /\n\s*const MAIN_INTEGRATION_ATTRIBUTE =[\s\S]*?\n\s*\}\n(?=\s*(?:\/\/|const))/u,
        "\n"
    );
}

function createIntegrationBlock(definition) {
    const source = fs.readFileSync(
        path.join(repositoryRoot, definition.file),
        "utf8"
    );
    const runtime = removeStandaloneGuard(extractRuntime(source))
        .replaceAll(
            'npmEnhancementOwner = "standalone"',
            'npmEnhancementOwner = "main"'
        )
        .replaceAll(
            'npmEnhancementOwner !== "standalone"',
            'npmEnhancementOwner !== "main"'
        )
        .replaceAll(
            'data-npm-enhancement-owner="standalone"',
            'data-npm-enhancement-owner="main"'
        );
    return `${definition.begin}
/*
 * Embedded from ${definition.file}. Keep the standalone source authoritative and
 * run scripts/sync-npm-enhancer-integrations.mjs after changing it.
 */
if (readIntegratedFeatureSetting("${definition.feature}")) {
    document.documentElement.setAttribute(
        "${definition.capabilityAttribute}",
        "main"
    );
    ${runtime}
}
${definition.end}`;
}

function replaceOrAppend(content, definition, block) {
    const start = content.indexOf(definition.begin);
    const end = content.indexOf(definition.end);
    if (start === -1 && end === -1) return `${content.trimEnd()}\n\n${block}\n`;
    if (start === -1 || end === -1 || end < start) {
        throw new Error(
            `Malformed integration markers for ${definition.name}.`
        );
    }
    return `${content.slice(0, start)}${block}${content.slice(
        end + definition.end.length
    )}`;
}

let enhancer = fs.readFileSync(enhancerPath, "utf8");
const helper = `
function readIntegratedFeatureSetting(feature) {
    try {
        const saved = localStorage.getItem(
            \`npm-userscript:settings:feature:\${feature}\`
        );
        return saved === null || JSON.parse(saved) !== false;
    } catch {
        return true;
    }
}
`;
if (!enhancer.includes("function readIntegratedFeatureSetting(feature)")) {
    enhancer = `${enhancer.trimEnd()}\n${helper}`;
}
for (const definition of integrations) {
    enhancer = replaceOrAppend(
        enhancer,
        definition,
        createIntegrationBlock(definition)
    );
}
fs.writeFileSync(enhancerPath, enhancer, "utf8");
