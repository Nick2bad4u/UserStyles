const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { loadDeclarations } = require("./helpers/sourceFunctions.cjs");

describe("local directory message boundary", () => {
    function createReceiver(url = "file:///C:/fixtures/") {
        const window = { location: new URL(url) };
        window.parent = window;
        const frame = { src: new URL("child/", url).href, contentWindow: {} };
        const showThis = jest.fn();
        const declarations = loadDeclarations(
            "SuperchargedLocalDirectoryWebUI.user.js",
            ["isManagedMessageSource", "messageReceive"],
            {
                window,
                URL,
                showThis,
                document: {
                    getElementById: (id) =>
                        id === "content_iframe" ? frame : null,
                },
            }
        );
        const event = {
            origin: window.location.origin,
            source: frame.contentWindow,
            data: { messageContent: "iframe_loaded", arguments: "fixture" },
        };
        return { ...declarations, window, frame, showThis, event };
    }

    test.each([
        "file:///C:/fixtures/",
        "https://www.example.com/path/to/directory/",
    ])("accepts the managed frame on %s", (url) => {
        const fixture = createReceiver(url);
        fixture.messageReceive(fixture.event);
        expect(fixture.showThis).toHaveBeenCalledWith(
            "iframe_loaded",
            false,
            true,
            "fixture"
        );
    });

    test.each([
        "null",
        "https://attacker.invalid",
        "https://example.com",
    ])("rejects mismatched origin %s before dispatch", (origin) => {
        const fixture = createReceiver(
            "https://www.example.com/path/to/directory/"
        );
        fixture.messageReceive({ ...fixture.event, origin });
        expect(fixture.showThis).not.toHaveBeenCalled();
    });

    test.each([
        null,
        {},
        undefined,
    ])("rejects an unrelated or absent source: %s", (source) => {
        const fixture = createReceiver();
        fixture.messageReceive({ ...fixture.event, source });
        expect(fixture.showThis).not.toHaveBeenCalled();
    });

    test.each([
        null,
        undefined,
        "iframe_loaded",
        {},
        { messageContent: 123 },
    ])("ignores malformed data: %s", (data) => {
        const fixture = createReceiver();
        expect(() =>
            fixture.messageReceive({ ...fixture.event, data })
        ).not.toThrow();
        expect(fixture.showThis).not.toHaveBeenCalled();
    });

    test("accepts a child's own parent but not a sibling or top-level self", () => {
        const fixture = createReceiver();
        expect(fixture.isManagedMessageSource(fixture.window)).toBe(false);
        fixture.window.parent = {};
        fixture.messageReceive({
            ...fixture.event,
            source: fixture.window.parent,
        });
        expect(fixture.showThis).toHaveBeenCalledTimes(1);
    });

    test("does not trust a managed frame navigated to an opaque data URL", () => {
        const fixture = createReceiver();
        fixture.frame.src = "data:text/html,untrusted";
        fixture.messageReceive(fixture.event);
        expect(fixture.showThis).not.toHaveBeenCalled();
    });

    test("keeps the locally generated blank error frame working", () => {
        const fixture = createReceiver();
        fixture.frame.src = "about:blank";
        fixture.messageReceive(fixture.event);
        expect(fixture.showThis).toHaveBeenCalledTimes(1);
    });
});

describe("Steam cookie display", () => {
    test.each([
        undefined,
        {},
        { store: null, community: "invalid" },
    ])("renders missing or invalid cookie groups safely: %s", (cookies) => {
        const fields = {};
        const { renderCookies } = loadDeclarations(
            "SteamCookieExtractor2/popup.js",
            ["renderCookies"],
            {
                document: { getElementById: (id) => (fields[id] ??= {}) },
            }
        );
        renderCookies(cookies);
        expect(fields.storeSteamLoginSecure.value).toBe("Not found");
        expect(fields.communitySessionid.value).toBe("Not found");
        expect(fields.lastFetched.textContent).toBe("Last fetched: N/A");
    });

    test("renders fake cookie values without writing them to a log", () => {
        const fields = {};
        const log = jest.fn();
        const { renderCookies } = loadDeclarations(
            "SteamCookieExtractor2/popup.js",
            ["renderCookies"],
            {
                console: { log },
                document: { getElementById: (id) => (fields[id] ??= {}) },
            }
        );
        renderCookies({
            store: [null, { name: "steamLoginSecure", value: "fixture-only" }],
            community: [{ name: "sessionid", value: "fake-session" }],
        });
        expect(fields.storeSteamLoginSecure.value).toBe("fixture-only");
        expect(fields.communitySessionid.value).toBe("fake-session");
        expect(log).not.toHaveBeenCalled();
    });
});

describe.each([
    "OldRedditNewProfilePictures.user.js",
    "OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.user.js",
])("Reddit avatar requests: %s", (file) => {
    function createFetcher() {
        const requests = [];
        const cache = { cached: "cached.png" };
        const limitCacheSize = jest.fn();
        const declarations = loadDeclarations(
            file,
            ["fetchProfilePicture", "fetchProfilePictures"],
            {
                GM_xmlhttpRequest: (request) => requests.push(request),
                GM_setValue: jest.fn(),
                profilePictureCache: cache,
                cacheTimestamps: {},
                limitCacheSize,
                console: { error: jest.fn() },
            }
        );
        return { ...declarations, requests, cache, limitCacheSize };
    }

    test("preserves cached values and fetches only real uncached users", async () => {
        const fixture = createFetcher();
        const result = fixture.fetchProfilePictures([
            "cached",
            "new",
            "[deleted]",
        ]);
        expect(fixture.requests).toHaveLength(1);
        fixture.requests[0].onload({
            responseText: JSON.stringify({
                data: { icon_img: "avatar.png?size=32" },
            }),
        });
        await expect(result).resolves.toEqual([
            "cached.png",
            "avatar.png",
            undefined,
        ]);
        expect(fixture.limitCacheSize).toHaveBeenCalledTimes(1);
    });

    test("rejects malformed responses instead of leaving the batch pending", async () => {
        const fixture = createFetcher();
        const result = fixture.fetchProfilePictures(["new"]);
        fixture.requests[0].onload({ responseText: "invalid JSON" });
        await expect(result).rejects.toThrow();
        expect(fixture.limitCacheSize).not.toHaveBeenCalled();
    });

    test("handles missing avatars and network errors", async () => {
        const fixture = createFetcher();
        const missing = fixture.fetchProfilePicture("missing");
        fixture.requests[0].onload({ responseText: "{}" });
        await expect(missing).resolves.toBeNull();
        const failed = fixture.fetchProfilePicture("offline");
        fixture.requests[1].onerror("offline");
        await expect(failed).rejects.toThrow("offline");
    });
});

describe("custom npm links", () => {
    const { parseCustomLinks } = loadDeclarations(
        "NPM-Package-Mirror-Menu.user.js",
        [
            "fillCustomLinkTemplate",
            "validateCustomLink",
            "parseCustomLinks",
        ],
        { URL }
    );

    test("validates templates and preserves useful per-line errors", () => {
        const result = parseCustomLinks(
            "# comment\nGood | https://example.com/{{package}}\nBad | javascript:alert(1)\nUnknown | https://example.com/{{secret}}\nNo separator"
        );
        expect(result.mirrors).toHaveLength(1);
        expect(result.mirrors[0].label).toBe("Good");
        expect(result.errors).toHaveLength(3);
        expect(result.errors[0]).toContain("Line 3:");
        expect(result.errors[1]).toContain("unknown token {{secret}}");
    });

    test("limits valid entries to 25 without counting comments or failures", () => {
        const result = parseCustomLinks(
            [
                "invalid",
                "# comment",
                ...Array.from(
                    { length: 26 },
                    (_, i) => `Link ${i} | https://example.com/${i}`
                ),
            ].join("\n")
        );
        expect(result.mirrors).toHaveLength(25);
        expect(result.errors).toHaveLength(2);
        expect(result.errors[1]).toContain("limited to 25");
    });
});

describe("mirror refresh batches", () => {
    class AuthenticationRequiredError extends Error {}

    function createPanel(refreshMirror) {
        const { MirrorSyncPanel } = loadDeclarations(
            "UserstyleWorld-SyncStyles.user.js",
            ["MirrorSyncPanel"],
            {
                AbortController,
                AuthenticationRequiredError,
                refreshMirror,
                getErrorMessage: (error) => error.message,
                formatStyleCount: (count) => `${count} styles`,
                console: { error: jest.fn() },
            }
        );
        const items = [1, 2].map((id) => ({
            style: { id, name: `Style ${id}` },
            checkbox: { checked: true },
            row: { dataset: {} },
        }));
        const panel = Object.assign(Object.create(MirrorSyncPanel.prototype), {
            running: false,
            items: new Map(items.map((item) => [item.style.id, item])),
            elements: { progressWrap: {}, progress: {}, progressCount: {} },
            setRunning(value) {
                this.running = value;
            },
            setItemState(item, state) {
                item.row.dataset.state = state;
            },
            setStatus: jest.fn(),
        });
        return { panel, items };
    }

    test("continues past failures, preserving only failed selections for retry", async () => {
        const refresh = jest
            .fn()
            .mockRejectedValueOnce(new Error("temporary"))
            .mockResolvedValueOnce(undefined);
        const { panel, items } = createPanel(refresh);
        await panel.syncSelected();
        expect(refresh).toHaveBeenCalledTimes(2);
        expect(items.map((item) => item.checkbox.checked)).toEqual([
            true,
            false,
        ]);
        expect(panel.elements.progress.value).toBe(2);
        expect(panel.running).toBe(false);
        expect(panel.controller).toBeNull();
        expect(panel.setStatus).toHaveBeenLastCalledWith(
            expect.stringContaining("1 accepted and 1 failed"),
            "error"
        );
    });

    test("stops after an authentication failure and clears queued state", async () => {
        const refresh = jest
            .fn()
            .mockRejectedValue(new AuthenticationRequiredError("Sign in"));
        const { panel, items } = createPanel(refresh);
        await panel.syncSelected();
        expect(refresh).toHaveBeenCalledTimes(1);
        expect(items[1].row.dataset.state).toBe("idle");
        expect(items.every((item) => item.checkbox.checked)).toBe(true);
        expect(panel.setStatus).toHaveBeenLastCalledWith(
            expect.stringContaining("1 not attempted"),
            "error"
        );
    });

    test("does not count aborted requests as failures or completed work", async () => {
        let panel;
        const refresh = jest.fn(() => {
            panel.controller.abort();
            return Promise.reject(new Error("aborted"));
        });
        ({ panel } = createPanel(refresh));
        await panel.syncSelected();
        expect(refresh).toHaveBeenCalledTimes(1);
        expect(panel.elements.progress.value).toBe(0);
        expect(panel.setStatus).toHaveBeenLastCalledWith(
            expect.stringContaining(
                "0 accepted, 0 failed, and 2 not completed"
            ),
            ""
        );
    });

    test("ignores repeated starts while running", async () => {
        const refresh = jest.fn();
        const { panel } = createPanel(refresh);
        panel.running = true;
        await panel.syncSelected();
        expect(refresh).not.toHaveBeenCalled();
    });
});

describe("Reddit comment batching", () => {
    test("deduplicates comments and preserves first/subsequent debounce delays", () => {
        jest.useFakeTimers();
        try {
            let observeChanges;
            const injectProfilePictures = jest.fn();
            const { setupObserver } = loadDeclarations(
                "OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js",
                ["setupObserver"],
                {
                    Node: { ELEMENT_NODE: 1 },
                    document: { body: {} },
                    setTimeout,
                    clearTimeout,
                    injectProfilePictures,
                    console: { log: jest.fn() },
                    MutationObserver: class {
                        constructor(callback) {
                            observeChanges = callback;
                        }
                        observe() {}
                    },
                }
            );
            setupObserver();
            const first = {};
            const second = {};
            const node = (comment) => ({
                nodeType: 1,
                querySelectorAll: () => [comment],
            });
            observeChanges([
                {
                    addedNodes: [
                        node(first),
                        node(first),
                        { nodeType: 3 },
                    ],
                },
            ]);
            jest.advanceTimersByTime(149);
            expect(injectProfilePictures).not.toHaveBeenCalled();
            jest.advanceTimersByTime(1);
            expect(injectProfilePictures).toHaveBeenLastCalledWith([first]);
            observeChanges([{ addedNodes: [node(first), node(second)] }]);
            jest.advanceTimersByTime(100);
            expect(injectProfilePictures).toHaveBeenCalledTimes(2);
            expect(injectProfilePictures).toHaveBeenLastCalledWith([second]);
        } finally {
            jest.useRealTimers();
        }
    });
});

describe("classic userscript compatibility", () => {
    test.each([
        "EnhanceYouTubeProfilePictures.user.js",
        "EnlargeYouTubeChatProfilePictures.user.js",
        "EnlargeYouTubeCommentSectionProfilePictures.user.js",
    ])("%s remains valid without module-only top-level await", (file) => {
        const source = fs.readFileSync(
            path.join(__dirname, "..", file),
            "utf8"
        );
        expect(() => new vm.Script(source)).not.toThrow();
        expect(() => new vm.Script("await Promise.resolve();")).toThrow(
            /await is only valid/u
        );
    });

    test("Strava hydration always returns a boolean", () => {
        const { isReactHydrated } = loadDeclarations(
            "StravaAutoGoogleSignIn.user.js",
            ["isReactHydrated"]
        );
        expect(isReactHydrated(null)).toBe(false);
        expect(isReactHydrated({})).toBe(false);
        expect(
            isReactHydrated({ __reactProps$fixture: {}, onclick() {} })
        ).toBe(true);
    });
});
