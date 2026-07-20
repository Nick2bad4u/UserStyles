const fs = require("node:fs");
const path = require("node:path");

const { expect } = require("expect");
const { JSDOM } = require("jsdom");
const { describe, it } = require("mocha");
const sinon = require("sinon");

const script = fs.readFileSync(
    path.join(__dirname, "UserstyleWorld-SyncStyles.user.js"),
    "utf8"
);

function card(id, name) {
    return `
		<div class="card">
			<a class="card-header thumbnail" href="/style/${id}/${name.toLowerCase()}">
				<img alt="${name}">
			</a>
			<div class="card-body">
				<a class="name" href="/style/${id}/${name.toLowerCase()}">${name}</a>
			</div>
		</div>
	`;
}

function createPage(
    body = "",
    { profile = "Nick2bad4u", signedInProfile = "Nick2bad4u" } = {}
) {
    const navigation = signedInProfile
        ? `<nav class="navbar"><ul class="menu"><li><a href="/user/${signedInProfile}">Profile</a></li></ul></nav>`
        : '<nav class="navbar"><ul class="menu"><li><a href="/signin">Sign in</a></li></ul></nav>';
    const dom = new JSDOM(
        `<!doctype html><html data-color-scheme="dark"><body>${navigation}${body}</body></html>`,
        {
            runScripts: "outside-only",
            url: `https://userstyles.world/user/${profile}`,
        }
    );
    dom.window.matchMedia = () => ({ matches: true });
    return dom;
}

function runScript(dom) {
    dom.window.eval(script);
    if (!dom.window.document.querySelector("#usw-mirror-sync")) {
        dom.window.document.dispatchEvent(
            new dom.window.Event("DOMContentLoaded")
        );
    }
    return (
        dom.window.document.querySelector("#usw-mirror-sync")?.shadowRoot ??
        null
    );
}

function click(dom, element, options = {}) {
    element.dispatchEvent(
        new dom.window.MouseEvent("click", { bubbles: true, ...options })
    );
}

async function waitFor(dom, predicate) {
    for (let attempt = 0; attempt < 50; attempt += 1) {
        if (predicate()) {
            return;
        }
        await new Promise((resolve) => dom.window.setTimeout(resolve, 0));
    }
    throw new Error("Timed out waiting for the userscript state to settle.");
}

function successfulResponse(id) {
    return {
        ok: true,
        status: 200,
        statusText: "OK",
        text: async () => "",
        url: `https://userstyles.world/style/${id}/example`,
    };
}

describe("UserstyleWorld-SyncStyles.user.js", () => {
    it("discovers each style card once and uses the visible style name", () => {
        const dom = createPage(
            `${card("101", "Alpha Theme")}${card("202", "Beta Theme")}`
        );

        try {
            const shadow = runScript(dom);

            expect(shadow).not.toBeNull();
            expect(shadow.querySelectorAll(".style-item")).toHaveLength(2);
            expect(
                [...shadow.querySelectorAll(".style-name")].map(
                    (element) => element.textContent
                )
            ).toEqual(["Alpha Theme", "Beta Theme"]);
            expect(shadow.querySelector(".launcher-count").textContent).toBe(
                "2 styles found"
            );
        } finally {
            dom.window.close();
        }
    });

    it("filters the list and changes only the visible selection", () => {
        const dom = createPage(
            `${card("101", "Alpha Theme")}${card("202", "Beta Theme")}`
        );

        try {
            const shadow = runScript(dom);
            const search = shadow.querySelector(".search");
            const [selectAll, selectNone] =
                shadow.querySelectorAll(".small-button");

            click(dom, selectAll);
            expect(shadow.querySelector(".selected-count").textContent).toBe(
                "2 selected"
            );

            search.value = "beta";
            search.dispatchEvent(
                new dom.window.Event("input", { bubbles: true })
            );
            expect(shadow.querySelector(".visible-count").textContent).toBe(
                "1 of 2 visible"
            );
            expect(
                [...shadow.querySelectorAll(".style-item")].filter(
                    (row) => !row.hidden
                )
            ).toHaveLength(1);

            click(dom, selectNone);
            const checkboxes = [...shadow.querySelectorAll(".style-checkbox")];
            expect(checkboxes.map((checkbox) => checkbox.checked)).toEqual([
                true,
                false,
            ]);
            expect(shadow.querySelector(".primary-button").textContent).toBe(
                "Refresh 1 style"
            );
        } finally {
            dom.window.close();
        }
    });

    it("requires the success redirect and keeps server-rejected styles selected", async () => {
        const dom = createPage(
            `${card("101", "Alpha Theme")}${card("202", "Beta Theme")}`
        );
        const fetchStub = sinon.stub();
        fetchStub.onFirstCall().resolves(successfulResponse("101"));
        fetchStub.onSecondCall().resolves({
            ok: true,
            status: 200,
            statusText: "OK",
            text: async () =>
                "<html><head><title>You can use this again in 42m — UserStyles.world</title></head><body></body></html>",
            url: "https://userstyles.world/mirror/202",
        });
        dom.window.fetch = fetchStub;
        sinon.stub(dom.window.console, "error");

        try {
            const shadow = runScript(dom);
            click(dom, shadow.querySelector(".small-button"));
            click(dom, shadow.querySelector(".primary-button"));
            await waitFor(
                dom,
                () =>
                    shadow.querySelector(".panel").getAttribute("aria-busy") ===
                    "false"
            );

            expect(fetchStub.callCount).toBe(2);
            expect(fetchStub.firstCall.args[0]).toBe("/mirror/101");
            expect(fetchStub.firstCall.args[1].credentials).toBe("same-origin");
            expect(fetchStub.firstCall.args[1].cache).toBe("no-store");
            expect(
                [...shadow.querySelectorAll(".style-checkbox")].map(
                    (checkbox) => checkbox.checked
                )
            ).toEqual([false, true]);
            expect(
                [...shadow.querySelectorAll(".style-item")].map(
                    (row) => row.dataset.state
                )
            ).toEqual(["success", "error"]);
            expect(
                shadow.querySelector('[data-state="error"] .item-detail')
                    .textContent
            ).toBe("You can use this again in 42m");
            expect(shadow.querySelector(".status").textContent).toContain(
                "1 accepted and 1 failed"
            );
        } finally {
            dom.window.close();
        }
    });

    it("rejects a non-OK style response and continues with the next request", async () => {
        const dom = createPage(
            `${card("101", "Alpha Theme")}${card("202", "Beta Theme")}`
        );
        const fetchStub = sinon.stub();
        fetchStub.onFirstCall().resolves({
            ...successfulResponse("101"),
            ok: false,
            status: 500,
            statusText: "Internal Server Error",
        });
        fetchStub.onSecondCall().resolves(successfulResponse("202"));
        dom.window.fetch = fetchStub;
        sinon.stub(dom.window.console, "error");

        try {
            const shadow = runScript(dom);
            click(dom, shadow.querySelector(".small-button"));
            click(dom, shadow.querySelector(".primary-button"));
            await waitFor(
                dom,
                () =>
                    shadow.querySelector(".panel").getAttribute("aria-busy") ===
                    "false"
            );

            expect(fetchStub.callCount).toBe(2);
            expect(
                [...shadow.querySelectorAll(".style-item")].map(
                    (row) => row.dataset.state
                )
            ).toEqual(["error", "success"]);
            expect(
                shadow.querySelector('[data-state="error"] .item-detail')
                    .textContent
            ).toBe(
                "Mirror request failed with HTTP 500 Internal Server Error."
            );
        } finally {
            dom.window.close();
        }
    });

    it("stops the batch when the mirror endpoint redirects to sign-in", async () => {
        const dom = createPage(
            `${card("101", "Alpha Theme")}${card("202", "Beta Theme")}`
        );
        const fetchStub = sinon.stub().resolves({
            ok: true,
            status: 200,
            statusText: "OK",
            text: async () => "",
            url: "https://userstyles.world/signin?r=%2Fmirror%2F101",
        });
        dom.window.fetch = fetchStub;
        sinon.stub(dom.window.console, "error");

        try {
            const shadow = runScript(dom);
            click(dom, shadow.querySelector(".small-button"));
            click(dom, shadow.querySelector(".primary-button"));
            await waitFor(
                dom,
                () =>
                    shadow.querySelector(".panel").getAttribute("aria-busy") ===
                    "false"
            );

            expect(fetchStub.calledOnce).toBe(true);
            expect(shadow.querySelector(".status").textContent).toContain(
                "Sign in to UserStyles.world"
            );
            expect(shadow.querySelector(".status").textContent).toContain(
                "1 not attempted"
            );
            expect(
                [...shadow.querySelectorAll(".style-checkbox")].every(
                    (checkbox) => checkbox.checked
                )
            ).toBe(true);
        } finally {
            dom.window.close();
        }
    });

    it("cancels the active request without starting the next style", async () => {
        const dom = createPage(
            `${card("101", "Alpha Theme")}${card("202", "Beta Theme")}`
        );
        const fetchStub = sinon.stub().callsFake(
            (_url, { signal }) =>
                new Promise((_resolve, reject) => {
                    signal.addEventListener(
                        "abort",
                        () =>
                            reject(
                                new dom.window.DOMException(
                                    "Aborted",
                                    "AbortError"
                                )
                            ),
                        { once: true }
                    );
                })
        );
        dom.window.fetch = fetchStub;

        try {
            const shadow = runScript(dom);
            click(dom, shadow.querySelector(".small-button"));
            click(dom, shadow.querySelector(".primary-button"));
            await waitFor(dom, () => fetchStub.calledOnce);
            click(dom, shadow.querySelector(".cancel-button"));
            await waitFor(
                dom,
                () =>
                    shadow.querySelector(".panel").getAttribute("aria-busy") ===
                    "false"
            );

            expect(fetchStub.calledOnce).toBe(true);
            expect(shadow.querySelector(".status").textContent).toContain(
                "Refresh stopped"
            );
            expect(
                [...shadow.querySelectorAll(".style-item")].every(
                    (row) => row.dataset.state === "idle"
                )
            ).toBe(true);
            expect(
                [...shadow.querySelectorAll(".style-checkbox")].every(
                    (checkbox) => checkbox.checked
                )
            ).toBe(true);
        } finally {
            dom.window.close();
        }
    });

    it("mounts only on the signed-in user's own profile", () => {
        const ownPage = createPage(card("101", "Alpha Theme"));
        const otherPage = createPage(card("101", "Alpha Theme"), {
            profile: "SomeoneElse",
        });
        const signedOutPage = createPage(card("101", "Alpha Theme"), {
            signedInProfile: null,
        });

        try {
            expect(runScript(ownPage)).not.toBeNull();
            expect(runScript(otherPage)).toBeNull();
            expect(runScript(signedOutPage)).toBeNull();
        } finally {
            ownPage.window.close();
            otherPage.window.close();
            signedOutPage.window.close();
        }
    });

    it("moves focus between the panel and its minimized launcher", () => {
        const dom = createPage(card("101", "Alpha Theme"));

        try {
            const shadow = runScript(dom);
            const collapseButton = shadow.querySelector(".icon-button");
            const launcher = shadow.querySelector(".launcher");

            click(dom, collapseButton);
            expect(shadow.activeElement).toBe(launcher);
            expect(collapseButton.getAttribute("aria-expanded")).toBe("false");

            click(dom, launcher);
            expect(shadow.activeElement).toBe(shadow.querySelector(".search"));
            expect(collapseButton.getAttribute("aria-expanded")).toBe("true");
        } finally {
            dom.window.close();
        }
    });

    it("does not add the panel to pages without style cards", () => {
        const dom = createPage("<main><h1>No styles here</h1></main>");

        try {
            expect(runScript(dom)).toBeNull();
        } finally {
            dom.window.close();
        }
    });
});
