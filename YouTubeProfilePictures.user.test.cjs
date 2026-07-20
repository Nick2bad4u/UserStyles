const fs = require("node:fs");
const path = require("node:path");

const { expect } = require("chai");
const { JSDOM } = require("jsdom");
const { describe, it } = require("mocha");

const cases = [
    {
        author: "Chat User",
        file: "EnlargeYouTubeChatProfilePictures.user.js",
        scenario: "live chat",
        markup: `
            <yt-live-chat-text-message-renderer>
                <a id="author-photo" href="/channel/chat-user">
                    <img alt="Chat User" src="https://yt3.ggpht.com/avatar=s88-c-k-c0x00ffffff-no-rj">
                </a>
                <span id="author-name">Chat User</span>
            </yt-live-chat-text-message-renderer>
        `,
    },
    {
        author: "Comment User",
        file: "EnlargeYouTubeCommentSectionProfilePictures.user.js",
        scenario: "comments",
        markup: `
            <ytd-comment-view-model>
                <a id="author-thumbnail" href="/@comment-user">
                    <img alt="Comment User" src="https://yt3.ggpht.com/avatar=s88-c-k-c0x00ffffff-no-rj">
                </a>
                <a id="author-text" href="/@comment-user">Comment User</a>
            </ytd-comment-view-model>
        `,
    },
    {
        author: "Combined User",
        file: "EnhanceYouTubeProfilePictures.user.js",
        scenario: "current comments",
        markup: `
            <yt-comment-view-model>
                <a id="author-thumbnail" href="/@combined-user">
                    <img alt="Combined User" src="https://yt3.ggpht.com/avatar=s88-c-k-c0x00ffffff-no-rj">
                </a>
                <a id="author-text" href="/@combined-user">Combined User</a>
            </yt-comment-view-model>
        `,
    },
    {
        author: "Paid Chat User",
        file: "EnhanceYouTubeProfilePictures.user.js",
        scenario: "paid live chat",
        markup: `
            <yt-live-chat-paid-message-renderer>
                <a id="author-photo" href="/channel/paid-chat-user">
                    <img alt="Paid Chat User" src="https://yt3.ggpht.com/avatar=s88-c-k-c0x00ffffff-no-rj">
                </a>
                <span id="author-name">Paid Chat User</span>
            </yt-live-chat-paid-message-renderer>
        `,
    },
    {
        author: "Legacy Comment User",
        file: "EnhanceYouTubeProfilePictures.user.js",
        scenario: "legacy comments",
        markup: `
            <ytd-comment-renderer>
                <a id="author-thumbnail" href="/@legacy-comment-user">
                    <img alt="Legacy Comment User" src="https://yt3.ggpht.com/avatar=s88-c-k-c0x00ffffff-no-rj">
                </a>
                <a id="author-text" href="/@legacy-comment-user">Legacy Comment User</a>
            </ytd-comment-renderer>
        `,
    },
    {
        author: "Creator Heart User",
        file: "EnhanceYouTubeProfilePictures.user.js",
        scenario: "creator hearts",
        markup: `
            <ytd-comment-view-model>
                <button id="creator-heart-button" aria-label="Heart from Creator Heart User">
                    <img alt="Creator Heart User" src="https://yt3.ggpht.com/avatar=s88-c-k-c0x00ffffff-no-rj">
                </button>
            </ytd-comment-view-model>
        `,
    },
];

function createPage() {
    const dom = new JSDOM("<!doctype html><html><body></body></html>", {
        pretendToBeVisual: true,
        runScripts: "outside-only",
        url: "https://www.youtube.com/watch?v=test",
    });
    const { window } = dom;
    const commands = [];
    const storedValues = new Map();

    window.GM = {
        async getValue(key, fallback) {
            if (storedValues.has(key)) return storedValues.get(key);
            return {
                ...(fallback && typeof fallback === "object" ? fallback : {}),
                enabled: true,
                hdSize: 1024,
                hdTargetSize: 1024,
                hoverDelay: 0,
                previewSize: 320,
                shape: "circle",
                showAuthor: true,
                showAuthorLabel: true,
            };
        },
        registerMenuCommand(label, callback) {
            commands.push({ callback, label });
        },
        async setValue(key, value) {
            storedValues.set(key, value);
        },
    };
    window.MutationObserver = class UnexpectedMutationObserver {
        constructor() {
            throw new Error(
                "These userscripts must not need a MutationObserver."
            );
        }
    };

    if (window.HTMLDialogElement) {
        window.HTMLDialogElement.prototype.showModal = function showModal() {
            this.setAttribute("open", "");
        };
        window.HTMLDialogElement.prototype.close = function close() {
            this.removeAttribute("open");
            this.dispatchEvent(new window.Event("close"));
        };
    }

    window.Image = class MockImage extends window.EventTarget {
        decoding = "auto";

        #source = "";

        get src() {
            return this.#source;
        }

        set src(value) {
            this.#source = String(value);
            window.setTimeout(() => {
                this.dispatchEvent(new window.Event("load"));
            }, 0);
        }
    };

    return { commands, dom };
}

function getShadowRoots(document) {
    return [...document.querySelectorAll("*")]
        .map((element) => element.shadowRoot)
        .filter(Boolean);
}

function waitForUi(window) {
    return new Promise((resolve) => window.setTimeout(resolve, 75));
}

function waitForInitialization(window) {
    return new Promise((resolve) => window.setTimeout(resolve, 0));
}

for (const testCase of cases) {
    describe(`${testCase.file} — ${testCase.scenario}`, () => {
        const script = fs.readFileSync(
            path.join(__dirname, testCase.file),
            "utf8"
        );

        it("handles dynamically inserted avatars without mutating YouTube's image", async () => {
            const { commands, dom } = createPage();
            const { document, MouseEvent } = dom.window;

            try {
                dom.window.eval(script);
                await waitForInitialization(dom.window);
                document.body.insertAdjacentHTML("beforeend", testCase.markup);
                const avatar = document.querySelector("img");
                const originalSource = avatar.getAttribute("src");
                avatar.getBoundingClientRect = () => ({
                    bottom: 140,
                    height: 48,
                    left: 80,
                    right: 128,
                    top: 92,
                    width: 48,
                    x: 80,
                    y: 92,
                });

                avatar.dispatchEvent(
                    new MouseEvent("pointerover", {
                        bubbles: true,
                        relatedTarget: document.body,
                    })
                );
                await waitForUi(dom.window);

                const roots = getShadowRoots(document);
                const previewImage = roots
                    .map((root) =>
                        [...root.querySelectorAll("img")].find((image) =>
                            image.src.includes("yt3.ggpht.com/avatar")
                        )
                    )
                    .find(Boolean);

                expect(previewImage, "an isolated preview image").to.exist;
                expect(previewImage.src).to.include(
                    "=s1024-c-k-c0x00ffffff-no-rj"
                );
                expect(avatar.getAttribute("src")).to.equal(originalSource);
                expect(
                    roots.some((root) =>
                        root.textContent.includes(testCase.author)
                    )
                ).to.equal(true);
                expect(commands).to.have.lengthOf(1);

                avatar.dispatchEvent(
                    new MouseEvent("pointerout", {
                        bubbles: true,
                        relatedTarget: document.body,
                    })
                );
                await waitForUi(dom.window);

                const previewCard = previewImage.closest(
                    '[role="status"], [role="tooltip"]'
                );
                expect(previewCard.hidden).to.equal(true);
            } finally {
                dom.window.close();
            }
        });

        it("opens an accessible settings dialog from the userscript menu", async () => {
            const { commands, dom } = createPage();

            try {
                dom.window.eval(script);
                await waitForInitialization(dom.window);
                expect(commands).to.have.lengthOf(1);
                commands[0].callback();
                await waitForInitialization(dom.window);

                const dialog = getShadowRoots(dom.window.document)
                    .map((root) => root.querySelector("dialog"))
                    .find(Boolean);
                expect(dialog, "a Shadow DOM settings dialog").to.exist;
                expect(dialog.open).to.equal(true);
                expect(dialog.getAttribute("aria-labelledby")).to.be.a(
                    "string"
                );
                expect(dialog.querySelector('button[type="submit"]')).to.exist;
                expect(
                    [...dialog.querySelectorAll("button")].some(
                        (button) => button.textContent.trim() === "Reset"
                    )
                ).to.equal(true);
            } finally {
                dom.window.close();
            }
        });
    });
}

describe("YouTube avatar preview interaction regressions", () => {
    const chatScript = fs.readFileSync(
        path.join(__dirname, "EnlargeYouTubeChatProfilePictures.user.js"),
        "utf8"
    );
    const commentScript = fs.readFileSync(
        path.join(
            __dirname,
            "EnlargeYouTubeCommentSectionProfilePictures.user.js"
        ),
        "utf8"
    );
    const combinedScript = fs.readFileSync(
        path.join(__dirname, "EnhanceYouTubeProfilePictures.user.js"),
        "utf8"
    );

    it("lets a new chat hover outrank an avatar that still has focus", async () => {
        const { dom } = createPage();
        const { document, Event, MouseEvent } = dom.window;

        try {
            dom.window.eval(chatScript);
            await waitForInitialization(dom.window);
            document.body.insertAdjacentHTML(
                "beforeend",
                `
                    <yt-live-chat-text-message-renderer id="message-a">
                        <a id="author-photo" href="/channel/a"><img src="https://yt3.ggpht.com/a=s88-c"></a>
                        <span id="author-name">Focused User</span>
                    </yt-live-chat-text-message-renderer>
                    <yt-live-chat-text-message-renderer id="message-b">
                        <a id="author-photo" href="/channel/b"><img src="https://yt3.ggpht.com/b=s88-c"></a>
                        <span id="author-name">Hovered User</span>
                    </yt-live-chat-text-message-renderer>
                `
            );
            const focusedLink = document.querySelector(
                "#message-a #author-photo"
            );
            const hoveredImage = document.querySelector("#message-b img");
            for (const image of document.querySelectorAll("img")) {
                image.getBoundingClientRect = () => ({
                    bottom: 140,
                    height: 48,
                    left: 80,
                    right: 128,
                    top: 92,
                    width: 48,
                });
            }

            focusedLink.dispatchEvent(new Event("focusin", { bubbles: true }));
            await waitForUi(dom.window);
            hoveredImage.dispatchEvent(
                new MouseEvent("pointerover", {
                    bubbles: true,
                    relatedTarget: document.body,
                })
            );
            await waitForUi(dom.window);

            const root = document.getElementById(
                "youtube-chat-avatar-preview-root"
            ).shadowRoot;
            expect(root.querySelector(".author").textContent).to.equal(
                "Hovered User"
            );
        } finally {
            dom.window.close();
        }
    });

    it("keeps the chat defaults valid and hides an offscreen anchor", async () => {
        const { commands, dom } = createPage();
        const { document, Event, MouseEvent } = dom.window;

        try {
            dom.window.eval(chatScript);
            await waitForInitialization(dom.window);
            commands[0].callback();
            await waitForInitialization(dom.window);
            const root = document.getElementById(
                "youtube-chat-avatar-preview-root"
            ).shadowRoot;
            expect(
                root.querySelector("#ytcap-hd-size").checkValidity()
            ).to.equal(true);
            root.querySelector("dialog").close();

            document.body.insertAdjacentHTML(
                "beforeend",
                `
                    <yt-live-chat-text-message-renderer>
                        <a id="author-photo"><img src="https://yt3.ggpht.com/offscreen=s88-c"></a>
                        <span id="author-name">Offscreen User</span>
                    </yt-live-chat-text-message-renderer>
                `
            );
            const avatar = document.querySelector("img");
            avatar.getBoundingClientRect = () => ({
                bottom: 140,
                height: 48,
                left: 80,
                right: 128,
                top: 92,
                width: 48,
            });
            avatar.dispatchEvent(
                new MouseEvent("pointerover", {
                    bubbles: true,
                    relatedTarget: document.body,
                })
            );
            await waitForUi(dom.window);
            const card = root.querySelector(".preview-card");
            expect(card.hidden).to.equal(false);

            avatar.getBoundingClientRect = () => ({
                bottom: -40,
                height: 48,
                left: 80,
                right: 128,
                top: -88,
                width: 48,
            });
            document.dispatchEvent(new Event("scroll"));
            await waitForUi(dom.window);
            expect(card.hidden).to.equal(true);
        } finally {
            dom.window.close();
        }
    });

    it("clears a combined preview after its stale focused avatar is removed", async () => {
        const { dom } = createPage();
        const { document, Event, MouseEvent } = dom.window;

        try {
            dom.window.eval(combinedScript);
            await waitForInitialization(dom.window);
            document.body.insertAdjacentHTML(
                "beforeend",
                `
                    <yt-comment-view-model id="comment-a">
                        <a id="author-thumbnail" href="/@a"><img src="https://yt3.ggpht.com/a=s88-c"></a>
                        <a id="author-text">Focused User</a>
                    </yt-comment-view-model>
                    <yt-comment-view-model id="comment-b">
                        <a id="author-thumbnail" href="/@b"><img src="https://yt3.ggpht.com/b=s88-c"></a>
                        <a id="author-text">Hovered User</a>
                    </yt-comment-view-model>
                `
            );
            const focusedLink = document.querySelector(
                "#comment-a #author-thumbnail"
            );
            const hoveredImage = document.querySelector("#comment-b img");
            for (const image of document.querySelectorAll("img")) {
                image.getBoundingClientRect = () => ({
                    bottom: 140,
                    height: 48,
                    left: 80,
                    right: 128,
                    top: 92,
                    width: 48,
                });
            }

            focusedLink.dispatchEvent(new Event("focusin", { bubbles: true }));
            await waitForUi(dom.window);
            hoveredImage.dispatchEvent(
                new MouseEvent("pointerover", {
                    bubbles: true,
                    relatedTarget: document.body,
                })
            );
            await waitForUi(dom.window);
            document.querySelector("#comment-a").remove();
            hoveredImage.dispatchEvent(
                new MouseEvent("pointerout", {
                    bubbles: true,
                    relatedTarget: document.body,
                })
            );
            await waitForUi(dom.window);

            const card = document
                .getElementById("youtube-avatar-preview-host")
                .shadowRoot.querySelector(".preview");
            expect(card.hidden).to.equal(true);
        } finally {
            dom.window.close();
        }
    });

    it("covers the combined HD fallback and terminal error states", async () => {
        const { dom } = createPage();
        const { document, Event, MouseEvent } = dom.window;

        try {
            dom.window.eval(combinedScript);
            await waitForInitialization(dom.window);
            document.body.insertAdjacentHTML(
                "beforeend",
                `
                    <yt-comment-view-model>
                        <a id="author-thumbnail"><img src="https://yt3.ggpht.com/fallback=s88-c"></a>
                        <a id="author-text">Fallback User</a>
                    </yt-comment-view-model>
                `
            );
            const avatar = document.querySelector("img");
            avatar.getBoundingClientRect = () => ({
                bottom: 140,
                height: 48,
                left: 80,
                right: 128,
                top: 92,
                width: 48,
            });
            avatar.dispatchEvent(
                new MouseEvent("pointerover", {
                    bubbles: true,
                    relatedTarget: document.body,
                })
            );
            await waitForUi(dom.window);

            const root = document.getElementById(
                "youtube-avatar-preview-host"
            ).shadowRoot;
            const previewImage = root.querySelector(".image");
            const card = root.querySelector(".preview");
            previewImage.dispatchEvent(new Event("error"));
            expect(previewImage.src).to.include("fallback=s88-c");
            previewImage.dispatchEvent(new Event("load"));
            expect(card.dataset.state).to.equal("fallback");
            previewImage.dispatchEvent(new Event("error"));
            expect(card.dataset.state).to.equal("error");
        } finally {
            dom.window.close();
        }
    });

    it("verifies comment fallbacks before displaying them", async () => {
        const { dom } = createPage();
        const { document, Event, MouseEvent } = dom.window;
        const loaders = [];

        dom.window.Image = class ControllableImage extends (
            dom.window.EventTarget
        ) {
            decoding = "auto";

            #source = "";

            get src() {
                return this.#source;
            }

            set src(value) {
                this.#source = String(value);
                loaders.push(this);
            }
        };

        try {
            dom.window.eval(commentScript);
            await waitForInitialization(dom.window);
            document.body.insertAdjacentHTML(
                "beforeend",
                `
                    <yt-comment-view-model>
                        <a id="author-thumbnail"><img src="https://yt3.ggpht.com/comment-fallback=s88-c"></a>
                        <a id="author-text">Fallback User</a>
                    </yt-comment-view-model>
                `
            );
            const avatar = document.querySelector("img");
            avatar.getBoundingClientRect = () => ({
                bottom: 140,
                height: 48,
                left: 80,
                right: 128,
                top: 92,
                width: 48,
            });
            const hover = () =>
                avatar.dispatchEvent(
                    new MouseEvent("pointerover", {
                        bubbles: true,
                        relatedTarget: document.body,
                    })
                );

            hover();
            await waitForUi(dom.window);
            loaders.shift().dispatchEvent(new Event("error"));
            loaders.shift().dispatchEvent(new Event("error"));

            const root = document.getElementById(
                "youtube-comment-avatar-preview-root"
            ).shadowRoot;
            const preview = root.querySelector(".preview");
            expect(preview.dataset.state).to.equal("error");
            expect(
                root.querySelector(".preview-fallback").textContent
            ).to.equal("Profile picture unavailable.");

            avatar.dispatchEvent(
                new MouseEvent("pointerout", {
                    bubbles: true,
                    relatedTarget: document.body,
                })
            );
            hover();
            await waitForUi(dom.window);
            loaders.shift().dispatchEvent(new Event("error"));
            loaders.shift().dispatchEvent(new Event("load"));

            expect(preview.dataset.state).to.equal("fallback");
            expect(root.querySelector(".preview-image").src).to.include(
                "comment-fallback=s88-c"
            );
        } finally {
            dom.window.close();
        }
    });
});

describe("YouTube avatar preview ownership", () => {
    const chatScript = fs.readFileSync(
        path.join(__dirname, "EnlargeYouTubeChatProfilePictures.user.js"),
        "utf8"
    );
    const commentScript = fs.readFileSync(
        path.join(
            __dirname,
            "EnlargeYouTubeCommentSectionProfilePictures.user.js"
        ),
        "utf8"
    );
    const combinedScript = fs.readFileSync(
        path.join(__dirname, "EnhanceYouTubeProfilePictures.user.js"),
        "utf8"
    );

    it("lets the combined script claim both scopes when it loads first", async () => {
        const { commands, dom } = createPage();

        try {
            dom.window.eval(combinedScript);
            dom.window.eval(chatScript);
            dom.window.eval(commentScript);
            await waitForInitialization(dom.window);

            expect(commands).to.have.lengthOf(1);
            expect(
                dom.window.document.getElementById(
                    "youtube-avatar-preview-host"
                )
            ).to.exist;
            expect(
                dom.window.document.getElementById(
                    "youtube-comment-avatar-preview-root"
                )
            ).not.to.exist;
        } finally {
            dom.window.close();
        }
    });

    it("lets the two focused scripts split ownership when they load first", async () => {
        const { commands, dom } = createPage();

        try {
            dom.window.eval(chatScript);
            dom.window.eval(commentScript);
            dom.window.eval(combinedScript);
            await waitForInitialization(dom.window);

            expect(commands).to.have.lengthOf(2);
            expect(
                dom.window.document.getElementById(
                    "youtube-comment-avatar-preview-root"
                )
            ).to.exist;
            expect(
                dom.window.document.getElementById(
                    "youtube-avatar-preview-host"
                )
            ).not.to.exist;
        } finally {
            dom.window.close();
        }
    });
});
