const fs = require("node:fs");
const path = require("node:path");

const { JSDOM } = require("jsdom");

const script = fs.readFileSync(
    path.join(
        __dirname,
        "..",
        "..",
        "Material-Icons-for-Development-Websites.user.js"
    ),
    "utf8"
);

function createPage(body, url) {
    const dom = new JSDOM(body, {
        pretendToBeVisual: true,
        runScripts: "outside-only",
        url,
    });
    dom.window.matchMedia = () => ({
        addEventListener() {},
        matches: false,
    });
    dom.window.__MATERIAL_ICONS_DEVELOPMENT_WEBSITES_TEST__ = {};
    dom.window.eval(script);
    return dom;
}

async function inspectScenarios() {
    const results = {};
    const npm = createPage(
        `
            <h2 id="file-explorer-heading">/react/</h2>
            <table aria-labelledby="file-explorer-heading">
                <tbody>
                    <tr>
                        <td><div><img src="generic-folder.svg" alt=""></div><button>cjs/</button></td>
                        <td>folder</td><td>166 kB</td>
                    </tr>
                    <tr>
                        <td><div><img src="generic-file.svg" alt=""></div><button>package.json</button></td>
                        <td>application/json</td><td>1.25 kB</td>
                    </tr>
                </tbody>
            </table>
        `,
        "https://www.npmjs.com/package/react?activeTab=code"
    );
    try {
        const images = npm.window.document.querySelectorAll("tbody img");
        results.npm = {
            fileIcon: images[1].dataset.materialDevIcon,
            fileSourceIsEmbedded: images[1].src.startsWith(
                "data:image/svg+xml,"
            ),
            folderIcon: images[0].dataset.materialDevIcon,
            folderSourceIsEmbedded: images[0].src.startsWith(
                "data:image/svg+xml,"
            ),
        };
    } finally {
        npm.window.close();
    }

    const github = createPage(
        `
            <table aria-labelledby="folders-and-files"><tbody><tr><td>
                <svg class="octicon icon-directory"></svg>
                <a aria-label=".github, (Directory)" href="/owner/repo/tree/main/.github">.github</a>
            </td></tr></tbody></table>
        `,
        "https://github.com/owner/repo"
    );
    const gitlab = createPage(
        `
            <main><nav aria-label="File tree"><ul role="tree"><li role="treeitem">
                <a class="file-row folder" aria-label="src" href="https://gitlab.com/owner/repo/-/tree/main/src">
                    <svg class="folder-icon"></svg><span>src</span>
                </a>
            </li></ul></nav></main>
        `,
        "https://gitlab.com/owner/repo/-/tree/main"
    );
    try {
        results.repositories = {
            githubIcon:
                github.window.document.querySelector("svg").dataset
                    .materialDevIcon,
            githubInsertedIcons: github.window.document.querySelectorAll(
                ".material-development-site-icon"
            ).length,
            gitlabIcon:
                gitlab.window.document.querySelector("svg").dataset
                    .materialDevIcon,
            gitlabInsertedIcons: gitlab.window.document.querySelectorAll(
                ".material-development-site-icon"
            ).length,
        };
    } finally {
        github.window.close();
        gitlab.window.close();
    }

    const generic = createPage(
        `
            <a id="ordinary" href="/guide/config.js">config.js</a>
            <nav aria-label="File tree">
                <a id="tree-file" href="/guide/config.js">config.js</a>
            </nav>
            <div class="theme-code-block-highlighted-line codeBlockTitle_test">vite.config.js</div>
        `,
        "https://vite.dev/guide/"
    );
    try {
        results.generic = {
            codeTitleIcon: generic.window.document.querySelector(
                ".codeBlockTitle_test > .material-development-site-icon"
            )?.dataset.materialDevIcon,
            ordinaryLinkDecorated: Boolean(
                generic.window.document.querySelector(
                    "#ordinary > .material-development-site-icon"
                )
            ),
            treeFileIcon: generic.window.document.querySelector(
                "#tree-file > .material-development-site-icon"
            )?.dataset.materialDevIcon,
        };
    } finally {
        generic.window.close();
    }

    const dynamic = createPage(
        `
            <h2 id="file-explorer-heading">/react/</h2>
            <table aria-labelledby="file-explorer-heading"><tbody></tbody></table>
        `,
        "https://www.npmjs.com/package/react?activeTab=code"
    );
    try {
        dynamic.window.document
            .querySelector("tbody")
            .insertAdjacentHTML(
                "beforeend",
                "<tr><td><img src='generic.svg' alt=''><button>README.md</button></td><td>text/markdown</td><td>1 kB</td></tr>"
            );
        await new Promise((resolve) => dynamic.window.setTimeout(resolve, 0));
        results.dynamicIcon =
            dynamic.window.document.querySelector(
                "tbody img"
            ).dataset.materialDevIcon;
    } finally {
        dynamic.window.close();
    }

    return results;
}

inspectScenarios()
    .then((results) => process.stdout.write(JSON.stringify(results)))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
