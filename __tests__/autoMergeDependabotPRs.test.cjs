const childProcess = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const scriptPath = path.join(__dirname, "..", "AutoMergeDependabotPRs.user.js");
const harnessPath = path.join(
    __dirname,
    "helpers",
    "autoMergeDependabotPRs.harness.cjs"
);
const script = fs.readFileSync(scriptPath, "utf8");

describe("Dependabot PR Merge Assistant userscript", () => {
    jest.setTimeout(30_000);

    let results;

    beforeAll(() => {
        results = JSON.parse(
            childProcess.execFileSync(process.execPath, [harnessPath], {
                cwd: path.join(__dirname, ".."),
                encoding: "utf8",
                timeout: 25_000,
            })
        );
    });

    test("ships a token-free least-privilege metadata block", () => {
        expect(script).toContain(
            "// @name         Dependabot PR Merge Assistant"
        );
        expect(script).toContain("// @version      3.0.0");
        expect(script).toContain("// @run-at       document-idle");
        expect(script).toContain("// @noframes");
        expect(script).not.toContain("// @grant        GM_xmlhttpRequest");
        expect(script).not.toContain("// @connect      api.github.com");
        expect(script).not.toContain("Authorization:");
    });

    test("renders one accessible assistant on Dependabot PR subroutes", () => {
        expect(results.render).toMatchObject({
            accessible: true,
            author: "Dependabot verified",
            rootCount: 1,
            subtitle: "Nick2bad4u/example #42",
            update: "Patch-level · 1 change",
        });
        expect(results.render.commandLabels).toContain(
            "Open Dependabot merge assistant settings"
        );
    });

    test("does not appear on pull requests from other authors", () => {
        expect(results.nonDependabot.hasAssistant).toBe(false);
    });

    test("supports keyboard dismissal and restores focus to the launcher", () => {
        expect(results.keyboardDismissal).toEqual({
            focusRestored: true,
            launcherVisible: true,
            panelHidden: true,
        });
    });

    test("opens GitHub's confirmation without submitting it", () => {
        expect(results.manual).toMatchObject({
            confirmationClicks: 0,
            nativeClicks: 1,
        });
        expect(results.manual.message).toMatch(/native confirmation/u);
    });

    test("automatically opens only the native confirmation for safe updates", () => {
        expect(results.automaticOpen).toEqual({
            confirmationClicks: 0,
            nativeClicks: 1,
        });
    });

    test("guarded automatic confirmation completes after its cancellation window", () => {
        expect(results.automaticConfirm).toEqual({
            confirmationClicks: 1,
            nativeClicks: 1,
        });
    });

    test("lets the user cancel a pending automatic confirmation", () => {
        expect(results.cancelAutomaticConfirm).toEqual({
            confirmationClicks: 0,
            nativeClicks: 1,
        });
    });

    test("blocks unattended confirmation when GitHub reports failed checks", () => {
        expect(results.failedChecks.nativeClicks).toBe(0);
        expect(results.failedChecks.message).toMatch(
            /blocked.*not successful/iu
        );
    });

    test("selects the preferred repository-supported merge method", () => {
        expect(results.preferredMethod).toEqual({
            methodMenuClicks: 1,
            nativeClicks: 1,
            nativeLabel: "Squash and merge",
        });
    });

    test("removes the insecure legacy cookie and displays remediation", () => {
        expect(results.legacyCookie).toEqual({
            cookieRemoved: true,
            leakedValueRendered: false,
            remediationUrl: "https://github.com/settings/tokens",
            warningRendered: true,
        });
    });

    test("repairs malformed settings to safe manual defaults", () => {
        expect(results.malformedSettings).toEqual({
            automation: "manual",
            majorAllowed: false,
            nativeClicks: 0,
            patchAllowed: true,
        });
    });
});
