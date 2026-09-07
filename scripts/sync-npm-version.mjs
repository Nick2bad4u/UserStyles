#!/usr/bin/env node

/**
 * Keep the npm development-engine floor aligned with the exact package-manager
 * pin.
 *
 * Source of truth:
 *
 * - `packageManager`, in exact `npm@x.y.z` form.
 *
 * Managed value:
 *
 * - `devEngines.packageManager.version`, as a minimum major such as `>=12`.
 *
 * The exact package-manager pin gives automation a reproducible npm release,
 * while the development-engine floor permits newer npm releases.
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const packageJsonPath = fileURLToPath(
    new URL("../package.json", import.meta.url)
);

/**
 * Check whether an unknown value is a non-null object record.
 *
 * @param {unknown} value
 *
 * @returns {value is Record<string, unknown>}
 */
const isRecord = (value) => typeof value === "object" && value !== null;

/**
 * Parse the exact npm package-manager pin.
 *
 * @param {unknown} packageManager
 *
 * @returns {{ majorVersion: string; packageManagerSpec: string }}
 *
 * @throws {TypeError} If the pin is not in exact `npm@x.y.z` form
 */
const parseNpmPackageManager = (packageManager) => {
    if (typeof packageManager !== "string") {
        throw new TypeError(
            "Expected package.json packageManager to be a string."
        );
    }

    const packageManagerSpec = packageManager.trim();
    const versionMatch =
        /^npm@(?<majorVersion>0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/v.exec(
            packageManagerSpec
        );
    const majorVersion = versionMatch?.groups?.["majorVersion"];

    if (majorVersion === undefined) {
        throw new TypeError(
            [
                "Expected package.json packageManager to pin an exact stable npm version",
                `in npm@x.y.z form, received: ${packageManager}`,
            ].join(" ")
        );
    }

    return { majorVersion, packageManagerSpec };
};

/**
 * Parse command-line arguments.
 *
 * Supported options:
 *
 * - No option: update package.json when synchronization is required
 * - `--check`: validate synchronization without writing
 * - `--print-package-manager`: print the validated exact npm pin for automation.
 *
 * @param {readonly string[]} argumentList
 *
 * @returns {"check" | "print" | "write"}
 *
 * @throws {TypeError} If an unsupported or conflicting option is provided
 */
const parseArguments = (argumentList) => {
    /** @type {"check" | "print" | "write"} */
    let mode = "write";

    for (const argument of argumentList) {
        if (argument !== "--check" && argument !== "--print-package-manager") {
            throw new TypeError(`Unsupported argument: ${argument}`);
        }

        const nextMode =
            argument === "--check" ? "check" : /** @type {const} */ ("print");

        if (mode !== "write") {
            throw new TypeError(
                "Use only one of --check or --print-package-manager."
            );
        }

        mode = nextMode;
    }

    return mode;
};

/**
 * Read and parse package.json.
 *
 * @returns {Promise<Record<string, unknown>>}
 */
const readPackageJson = async () => {
    try {
        const packageJsonContent = await readFile(packageJsonPath, "utf8");
        const packageJson = JSON.parse(packageJsonContent);

        if (!isRecord(packageJson)) {
            throw new TypeError("Expected package.json to contain an object.");
        }

        return packageJson;
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        throw new TypeError(
            `Failed to read package.json at ${packageJsonPath}: ${message}`,
            { cause: error }
        );
    }
};

/**
 * Resolve and validate the managed package-manager metadata.
 *
 * @param {Record<string, unknown>} packageJson
 *
 * @returns {{
 *     expectedEngineRange: string;
 *     packageManagerEngine: Record<string, unknown>;
 *     packageManagerSpec: string;
 * }}
 */
const resolvePackageManagerMetadata = (packageJson) => {
    const { majorVersion, packageManagerSpec } = parseNpmPackageManager(
        packageJson["packageManager"]
    );
    const devEngines = packageJson["devEngines"];

    if (!isRecord(devEngines)) {
        throw new TypeError(
            "Expected package.json devEngines to be an object."
        );
    }

    const packageManagerEngine = devEngines["packageManager"];

    if (!isRecord(packageManagerEngine)) {
        throw new TypeError(
            "Expected package.json devEngines.packageManager to be an object."
        );
    }

    if (packageManagerEngine["name"] !== "npm") {
        throw new TypeError(
            "Expected package.json devEngines.packageManager.name to be npm."
        );
    }

    return {
        expectedEngineRange: `>=${majorVersion}`,
        packageManagerEngine,
        packageManagerSpec,
    };
};

const main = async () => {
    const mode = parseArguments(process.argv.slice(2));
    const packageJson = await readPackageJson();
    const { expectedEngineRange, packageManagerEngine, packageManagerSpec } =
        resolvePackageManagerMetadata(packageJson);

    if (mode === "print") {
        process.stdout.write(packageManagerSpec);
        return;
    }

    const currentEngineRange = packageManagerEngine["version"];

    if (currentEngineRange === expectedEngineRange) {
        console.log(
            `npm package-manager metadata is synchronized: ${packageManagerSpec} (${expectedEngineRange})`
        );
        return;
    }

    if (mode === "check") {
        throw new TypeError(
            [
                "npm package-manager metadata is out of sync.",
                `Expected devEngines.packageManager.version=${expectedEngineRange}.`,
                `Actual: ${String(currentEngineRange)}.`,
                "Run npm run sync:npm-version to repair it.",
            ].join(" ")
        );
    }

    packageManagerEngine["version"] = expectedEngineRange;
    await writeFile(
        packageJsonPath,
        `${JSON.stringify(packageJson, null, 4)}\n`,
        "utf8"
    );
    console.log(
        `Updated devEngines.packageManager.version to ${expectedEngineRange} from ${packageManagerSpec}`
    );
};

try {
    await main();
} catch (error) {
    console.error("Failed to synchronize npm package-manager metadata:", error);
    process.exitCode = 1;
}
