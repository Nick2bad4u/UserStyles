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
        expect(script).toContain("// @version      0.9.1");
        expect(script).toContain("// @grant        GM.registerMenuCommand");
        expect(script).toContain("// @connect      bundlephobia.com");
        expect(script).toContain("// @connect      npm-compare.com");
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
        expect(results.defaultSearch.dependencyTableLayoutChecked).toBe(true);
        expect(results.defaultSearch.versionLimitValue).toBe("25");
    });

    test("keeps toggle knobs inside their tracks", () => {
        expect(script).toMatch(
            /#npm-userscript-settings \.setting > input::before \{[\s\S]*?height: 18px;[\s\S]*?width: 18px;/u
        );
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
        expect(results.versions.renderedBeforeNativeHistory).toBe(true);
        expect(results.versions.packumentRequests).toBe(1);
        expect(results.versions.versionDownloadRequests).toBe(1);
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

    test("keeps provenance beside the current version and shows the total opposite it", () => {
        expect(results.versionSidebar).toEqual({
            provenanceBesideVersion: true,
            rowWidth: "100%",
            totalCount: "5",
            totalCountFontSize: "1.25rem",
            totalHref:
                "https://www.npmjs.com/package/example?activeTab=versions",
            totalLabel: "Total versions",
            totalLabelFontSize: "0.75rem",
            versionValue: "3.2.1",
        });
    });

    test("renders dependency types as tabbed semantic tables and restores npm's layout", () => {
        expect(results.dependencies.nativeLayoutHidden).toBe(true);
        expect(results.dependencies.tabLabels).toEqual([
            "Dependencies (1)",
            "Peer (1)",
            "Optional Peer (1)",
            "Optional (1)",
            "Development (1)",
        ]);
        expect(results.dependencies.tableHeaders).toEqual([
            "Package",
            "Required range",
        ]);
        expect(results.dependencies.peerRows).toBe(1);
        expect(results.dependencies.peerRange).toBe("^2.0.0");
        expect(results.dependencies.nativeLayoutRestored).toBe(true);
    });

    test("adds filtering and package comparison to dependents", () => {
        expect(results.dependents.checkboxCount).toBe(3);
        expect(results.dependents.filteredCount).toBe("Showing 1 of 3");
        expect(results.dependents.totalCount).toBe("Showing 3 of 3");
        expect(results.dependents.compareIsEnabled).toBe(true);
        expect(results.dependents.compareHref).toBe(
            "https://npmtrends.com/alpha-vs-beta"
        );
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
                "homepage",
            ])
        );
        expect(results.repositoryCard.homepageHref).toBe(
            "https://example.test/docs"
        );
        expect(results.repositoryCard.collaboratorsHref).toBe(
            "https://github.com/example/example/graphs/contributors"
        );
        expect(results.repositoryCard.licenseHref).toBe(
            "https://github.com/example/example/blob/main/LICENSE"
        );
        expect(results.repositoryCard.weeklyChartHref).toBe(
            "https://npm-compare.com/example"
        );
        expect(results.repositoryCard.trendsHref).toBe(
            "https://npm-compare.com/example"
        );
        expect(results.repositoryCard.chartStartsLazy).toBe(true);
        expect(results.repositoryCard.chartSrcAfterOpen).toBe(
            "https://npm-compare.com/img/github-trend/example.png"
        );
        expect(results.repositoryCard.insightsAtContentBottom).toBe(true);
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
        expect(moreInstallButtons).toContain("// @version      1.4.0");
        expect(moreInstallButtons).toContain(
            '"data-npm-enhancer-install-commands"'
        );
        expect(packageSize).toContain("// @version      2.3.2");
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
            expect(result.bundlephobiaHref).toBe(
                "https://bundlephobia.com/package/example@1.0.0"
            );
            expect(result.packageMetricLabels).toEqual(
                expect.arrayContaining([
                    "Tarball",
                    "Unpacked",
                    "Files",
                ])
            );
            expect(result.versionLabel).toBe("v1.0.0");
        }
        expect(results.coexistence.tarballErrorIgnored).toBe(true);
    });

    test("keeps nested sidebar links and install commands intact while placing size above funding", () => {
        expect(results.sidebarIntegration.homepage).toEqual({
            display: "flex",
            minWidth: "0px",
            overflowWrap: "anywhere",
            text: "https://github.com/eslint/js/blob/main/packages/eslint-visitor-keys/README.md",
            width: "100%",
        });
        expect(results.sidebarIntegration.install).toEqual({
            commandCount: 5,
            defaultsToActiveTag: true,
            exactVersionCommands: true,
            followsInstallSection: true,
            nativeCopyButtonConnected: true,
            parentIsSidebar: true,
        });
        expect(results.sidebarIntegration.size).toEqual({
            avoidsNestedBundleLinkSection: true,
            parentIsSidebar: true,
            placement: "funding-button",
            precedesFundingButton: true,
        });
    });
});
