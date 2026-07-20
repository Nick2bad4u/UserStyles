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
        expect(script).toContain("// @version      0.7.1");
        expect(script).toContain("// @grant        GM.registerMenuCommand");
        expect(script).not.toContain("data.jsdelivr.com");
        expect(script).toContain(
            "https://cdn.jsdelivr.net/gh/Nick2bad4u/nerd-fonts-woff2@v1.0.5/fonts/woff2/NerdFontsSymbolsOnly/SymbolsNerdFontMono-Regular.woff2"
        );

        expect(results.defaultSearch.commandLabels).toEqual([
            "Open NPM Enhancer settings",
        ]);
        expect(results.defaultSearch.dialogTitle).toContain(
            "NPM Package & Search Enhancer"
        );
        expect(results.defaultSearch.searchBadgesChecked).toBe(false);
    });

    test("uses one cached metadata request and no default search badge requests", () => {
        expect(results.defaultSearch.searchLinkRows).toBe(2);
        expect(results.defaultSearch.searchBadgeRows).toBe(0);
        expect(results.defaultSearch.requests).toHaveLength(1);
        expect(results.defaultSearch.requests[0]).toContain("/-/v1/search?");
        expect(
            results.defaultSearch.requests.some((url) =>
                url.endsWith("/latest")
            )
        ).toBe(false);
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
});
