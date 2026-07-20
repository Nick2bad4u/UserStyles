const childProcess = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const scriptPath = path.join(
    __dirname,
    "..",
    "NPM-Package-and-Search-Enhancer.user.js"
);
const harnessPath = path.join(
    __dirname,
    "helpers",
    "npmPackageAndSearchEnhancer.harness.cjs"
);
const script = fs.readFileSync(scriptPath, "utf8");

describe("NPM Package and Search Enhancer userscript", () => {
    jest.setTimeout(20_000);

    let results;

    beforeAll(() => {
        results = JSON.parse(
            childProcess.execFileSync(process.execPath, [harnessPath], {
                cwd: path.join(__dirname, ".."),
                encoding: "utf8",
                timeout: 15_000,
            })
        );
    });

    test("keeps the published metadata and userscript-manager settings command", () => {
        expect(script).toContain(
            "// @name         NPM Package and Search Enhancer"
        );
        expect(script).toContain("// @version      0.8.0");
        expect(script).toContain("// @grant        GM.registerMenuCommand");
        expect(script).toContain("// @connect      bundlephobia.com");
        expect(script).not.toContain("data.jsdelivr.com");
        expect(script).toContain(
            "https://cdn.jsdelivr.net/gh/Nick2bad4u/nerd-fonts-woff2@v1.0.5/fonts/woff2/NerdFontsSymbolsOnly/SymbolsNerdFontMono-Regular.woff2"
        );

        expect(results.defaultSearch.commandLabels).toEqual(
            expect.arrayContaining([
                "Open NPM Enhancer settings",
                "Configure install commands…",
                "Bundlephobia: change accent color…",
            ])
        );
        expect(results.defaultSearch.dialogTitle).toContain(
            "NPM Package & Search Enhancer"
        );
        expect(results.defaultSearch.searchBadgesChecked).toBe(false);
        expect(results.defaultSearch.versionLimitChecked).toBe(true);
        expect(results.defaultSearch.versionLimitValue).toBe("25");
    });

    test("uses static links without requests and preserves npm-owned download nodes", () => {
        expect(results.defaultSearch.searchLinkRows).toBe(2);
        expect(results.defaultSearch.searchBadgeRows).toBe(0);
        expect(results.defaultSearch.requests).toHaveLength(0);
        expect(results.defaultSearch.nativeDownloadsStayPut).toBe(true);
        expect(
            results.defaultSearch.requests.some((url) =>
                url.endsWith("/latest")
            )
        ).toBe(false);
    });

    test("makes search cost and settings previews explicit", () => {
        expect(results.defaultSearch.enhancedBadgesLabel).toBe(true);
        expect(results.defaultSearch.linkAndBadgeSectionsOpen).toBe(true);
        expect(results.defaultSearch.previewCount).toBeGreaterThanOrEqual(20);
        expect(results.defaultSearch.customIconHelp).toMatch(/PNG, SVG, ICO/u);
        expect(results.defaultSearch.customIconHelp).toMatch(/http\(s\)/u);
    });

    test("coexists with the install-button heading and restores its sidebar row", () => {
        expect(results.packagePage.rowImmediatelyBeforeInstall).toBe(true);
        expect(results.packagePage.hasOwnedClass).toBe(true);
        expect(results.packagePage.hasLegacySharedClass).toBe(false);
        expect(results.packagePage.restoredAfterRemoval).toBe(true);
        expect(results.packagePage.requests).toHaveLength(1);
    });

    test("limits opt-in search badge requests to two manifests at a time", () => {
        expect(results.advancedSearch.searchBadgeRows).toBe(4);
        expect(results.advancedSearch.manifestRequests).toBe(4);
        expect(results.advancedSearch.maximumActiveManifests).toBe(2);
        expect(results.advancedSearch.requestedJsDelivrFileLists).toBe(false);
        expect(results.advancedSearch.badgeIconFontFamily).toContain(
            "NPM Enhancer Nerd Font Symbols"
        );
        expect(results.advancedSearch.badgeIcons).toEqual(
            expect.arrayContaining([
                String.fromCodePoint(0xf0207), // nf-md-export
                String.fromCodePoint(0xf06e6), // nf-md-language_typescript
                String.fromCodePoint(0xf0399), // nf-md-nodejs
            ])
        );
    });

    test("ships the complete semantic Nerd Font badge map", () => {
        const badgeIconBlock =
            /BADGE_ICONS = \{(?<icons>[\s\S]*?)\n\s*\};/.exec(script)?.groups
                ?.icons;
        expect(badgeIconBlock).toBeDefined();

        const expectedEscapes = {
            alternatives: "\\u{F14CE}",
            binary: "\\uEAE8",
            cjs: "\\u{F0453}",
            cli: "\\uEA85",
            dts: "\\u{F06E6}",
            esm: "\\u{F0207}",
            lifecycle: "\\u{F1727}",
            node: "\\u{F0399}",
            untyped: "\\u{F0625}",
            vulnerable: "\\u{F0ECC}",
        };
        for (const [badge, escape] of Object.entries(expectedEscapes)) {
            expect(badgeIconBlock).toContain(`${badge}: "${escape}"`);
        }
    });

    test("renders delayed version history with semantic selectors and semver ordering", () => {
        expect(results.versions.tabLabels).toEqual([
            "Major Versions (2)",
            "Minor Versions (2)",
            "Patch Versions (7)",
        ]);
        expect(results.versions.selectorRole).toBe("group");
        expect(results.versions.usesPressedButtons).toBe(true);
        expect(results.versions.patchRows).toBe(5);
        expect(results.versions.patchLabels).toEqual([
            "1.0.0",
            "1.0.0+build.2",
            "1.0.0-beta.10",
            "1.0.0-beta.2",
            "1.0.0-alpha.1",
        ]);
        expect(results.versions.hiddenNativeRows).toBe(2);
    });

    test("keeps npm-owned repository metrics connected and only hides them with CSS", () => {
        expect(results.repositoryCard.nativeColumnsStayConnected).toBe(true);
        expect(results.repositoryCard.nativeColumnsHiddenByClass).toBe(true);
        expect(results.repositoryCard.metricKinds).toEqual(
            expect.arrayContaining([
                "stars",
                "issues",
                "pulls",
                "changelog",
            ])
        );
    });

    test("embeds both companion scripts and ships standalone coexistence guards", () => {
        const moreInstallButtons = fs.readFileSync(
            path.join(__dirname, "..", "NPM-More-Install-Buttons.user.js"),
            "utf8"
        );
        const packageSize = fs.readFileSync(
            path.join(__dirname, "..", "NPM-Bundlephobia-Package-Size.user.js"),
            "utf8"
        );
        expect(script).toContain(
            "/* BEGIN INTEGRATED NPM MORE INSTALL BUTTONS */"
        );
        expect(script).toContain(
            "/* BEGIN INTEGRATED NPM BUNDLEPHOBIA PACKAGE SIZE */"
        );
        expect(moreInstallButtons).toContain("// @version      1.3.1");
        expect(moreInstallButtons).toContain(
            '"data-npm-enhancer-install-commands"'
        );
        expect(packageSize).toContain("// @version      2.3.0");
        expect(packageSize).toContain('"data-npm-enhancer-package-size"');
        expect(packageSize).toMatch(/createMetric\(\s*"Tarball"/u);
        expect(packageSize).toMatch(/createMetric\(\s*"Unpacked"/u);
        expect(packageSize).toMatch(/createMetric\(\s*"Files"/u);
    });

    test("renders one integrated companion UI in either userscript load order", () => {
        expect(results.coexistence.installMainFirst).toEqual({
            count: 1,
            owner: "main",
            ownerAfterMainSettingsSave: "main",
        });
        expect(results.coexistence.installStandaloneFirst).toEqual({
            count: 1,
            owner: "standalone",
            ownerAfterMainSettingsSave: "standalone",
        });
        expect(results.coexistence.sizeMainFirst.count).toBe(1);
        expect(results.coexistence.sizeMainFirst.owner).toBe("main");
        expect(results.coexistence.sizeStandaloneFirst.count).toBe(1);
        expect(results.coexistence.sizeStandaloneFirst.owner).toBe(
            "standalone"
        );
        for (const result of [
            results.coexistence.sizeMainFirst,
            results.coexistence.sizeStandaloneFirst,
        ]) {
            expect(result.packageMetricLabels).toEqual(
                expect.arrayContaining([
                    "Tarball",
                    "Unpacked",
                    "Files",
                ])
            );
        }
        expect(results.coexistence.tarballErrorIgnored).toBe(true);
    });
});
