const childProcess = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const scriptPath = path.join(__dirname, "..", "MergeDependabotPRs.user.js");
const harnessPath = path.join(
    __dirname,
    "helpers",
    "mergeDependabotPRs.harness.cjs"
);
const script = fs.readFileSync(scriptPath, "utf8");

describe("Auto-Merge Dependabot PRs userscript", () => {
    jest.setTimeout(15_000);

    test("ships SPA-aware GitHub metadata", () => {
        expect(script).toContain("// @version      6.8");
        expect(script).toContain("// @match        https://github.com/*");
        expect(script).toContain("// @grant        window.onurlchange");
        expect(script).not.toContain(
            "// @match        https://github.com/notifications"
        );
    });

    test("adds, repositions, deduplicates, and removes its UI across soft navigation", () => {
        const result = JSON.parse(
            childProcess.execFileSync(process.execPath, [harnessPath], {
                cwd: path.join(__dirname, ".."),
                encoding: "utf8",
                timeout: 10_000,
            })
        );

        expect(result).toEqual({
            alertCount: 0,
            beforeNavigation: false,
            notificationButtonCount: 1,
            notificationsButtonVisible: true,
            pullPosition: {
                bottom: "20px",
                left: "20px",
                right: "auto",
            },
            removedAfterLeaving: true,
        });
    });
});
