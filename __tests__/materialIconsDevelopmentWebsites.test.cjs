const childProcess = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const repositoryRoot = path.join(__dirname, "..");
const scriptPath = path.join(
    repositoryRoot,
    "Material-Icons-for-Development-Websites.user.js"
);
const matchSourcePath = path.join(
    repositoryRoot,
    "CodeNewRoman-Nerd-Font-Mono-for-Development-Websites.user.js"
);
const harnessPath = path.join(
    __dirname,
    "helpers",
    "materialIconsDevelopmentWebsites.harness.cjs"
);
const script = fs.readFileSync(scriptPath, "utf8");

describe("Material Icons for Development Websites", () => {
    jest.setTimeout(30_000);

    let results;

    beforeAll(() => {
        results = JSON.parse(
            childProcess.execFileSync(process.execPath, [harnessPath], {
                cwd: repositoryRoot,
                encoding: "utf8",
                timeout: 25_000,
            })
        );
    });

    it("stays synchronized with every development-site match", () => {
        const getMatches = (contents) =>
            contents.match(/^\/\/ @match\s+.+$/gmu) ?? [];
        const sourceMatches = getMatches(
            fs.readFileSync(matchSourcePath, "utf8")
        );

        expect(getMatches(script)).toEqual(sourceMatches);
        expect(sourceMatches).toHaveLength(35);
        expect(sourceMatches.some((line) => line.includes("npmjs.com"))).toBe(
            true
        );
    });

    it("replaces npm Code-tab row images with associated Material icons", () => {
        expect(results.npm).toEqual({
            fileIcon: "nodejs",
            fileSourceIsEmbedded: true,
            folderIcon: "folder-javascript",
            folderSourceIsEmbedded: true,
        });
    });

    it("decorates GitHub and GitLab entries without duplicating their native icons", () => {
        expect(results.repositories).toEqual({
            githubIcon: "folder-github",
            githubInsertedIcons: 0,
            gitlabIcon: "folder-src",
            gitlabInsertedIcons: 0,
        });
    });

    it("uses the generic fallback only in file browsers and code-block titles", () => {
        expect(results.generic).toEqual({
            codeTitleIcon: "vite",
            ordinaryLinkDecorated: false,
            treeFileIcon: "javascript",
        });
    });

    it("handles repository rows added by client-side navigation", () => {
        expect(results.dynamicIcon).toBe("readme");
    });
});
