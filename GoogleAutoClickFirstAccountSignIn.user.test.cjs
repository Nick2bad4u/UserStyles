const fs = require("node:fs");
const path = require("node:path");

const { expect } = require("chai");
const { JSDOM } = require("jsdom");
const { describe, it } = require("mocha");
const sinon = require("sinon");

const script = fs.readFileSync(
    path.join(__dirname, "GoogleAutoClickFirstAccountSignIn.user.js"),
    "utf8"
);
const stateKey = "google-auto-first-account-flow-v1";

function createPage(body) {
    const dom = new JSDOM(body, {
        pretendToBeVisual: true,
        runScripts: "outside-only",
        url: "https://accounts.google.com/AccountChooser?service=test",
    });
    dom.window.HTMLElement.prototype.getBoundingClientRect = () => ({
        bottom: 30,
        height: 30,
        left: 0,
        right: 200,
        top: 0,
        width: 200,
        x: 0,
        y: 0,
    });
    return dom;
}

function runScript(dom) {
    dom.window.eval(script);
}

function waitForInitialRun(dom) {
    return new Promise((resolve) => dom.window.setTimeout(resolve, 650));
}

describe("GoogleAutoClickFirstAccountSignIn.user.js", () => {
    it("selects only a real account row and supports Workspace addresses", async () => {
        const dom = createPage(`
			<button id="distractor">signed.in@gmail.com</button>
			<button id="account"><span data-identifier="person@example.org">Person</span></button>
		`);
        const account = dom.window.document.querySelector("#account");
        const distractor = dom.window.document.querySelector("#distractor");
        const accountClick = sinon.spy();
        const distractorClick = sinon.spy();
        account.addEventListener("click", accountClick);
        distractor.addEventListener("click", distractorClick);

        try {
            runScript(dom);
            await waitForInitialRun(dom);

            expect(accountClick.calledOnce).to.equal(true);
            expect(distractorClick.called).to.equal(false);
            expect(
                JSON.parse(dom.window.sessionStorage.getItem(stateKey))
            ).to.include({
                identifier: "person@example.org",
                phase: "account-selected",
            });
        } finally {
            dom.window.close();
        }
    });

    it("clicks Continue once after this script selected an account", async () => {
        const dom = createPage(
            '<button id="continue" aria-label="Continue">Continue</button>'
        );
        const continueButton = dom.window.document.querySelector("#continue");
        const continueClick = sinon.spy();
        continueButton.addEventListener("click", continueClick);
        dom.window.sessionStorage.setItem(
            stateKey,
            JSON.stringify({
                identifier: "person@example.org",
                phase: "account-selected",
                updatedAt: Date.now(),
            })
        );

        try {
            runScript(dom);
            await waitForInitialRun(dom);

            expect(continueClick.calledOnce).to.equal(true);
            expect(
                JSON.parse(dom.window.sessionStorage.getItem(stateKey))
            ).to.include({ phase: "completed" });
        } finally {
            dom.window.close();
        }
    });

    it("does not click Continue when the flow was not armed by an account selection", async () => {
        const dom = createPage('<button id="continue">Continue</button>');
        const continueClick = sinon.spy();
        dom.window.document
            .querySelector("#continue")
            .addEventListener("click", continueClick);

        try {
            runScript(dom);
            await waitForInitialRun(dom);
            expect(continueClick.called).to.equal(false);
        } finally {
            dom.window.close();
        }
    });

    it("does not restart the account picker after completing the flow", async () => {
        const dom = createPage(
            '<button id="account" data-identifier="person@example.org">Person</button>'
        );
        const accountClick = sinon.spy();
        dom.window.document
            .querySelector("#account")
            .addEventListener("click", accountClick);
        dom.window.sessionStorage.setItem(
            stateKey,
            JSON.stringify({ phase: "completed", updatedAt: Date.now() })
        );

        try {
            runScript(dom);
            await waitForInitialRun(dom);
            expect(accountClick.called).to.equal(false);
        } finally {
            dom.window.close();
        }
    });

    it("does not repeat account clicks when session storage is unavailable", async () => {
        const dom = createPage(
            '<button id="account" data-identifier="person@example.org">Person</button>'
        );
        const accountClick = sinon.spy();
        dom.window.document
            .querySelector("#account")
            .addEventListener("click", accountClick);
        sinon.stub(dom.window.Storage.prototype, "getItem").throws();
        sinon.stub(dom.window.Storage.prototype, "setItem").throws();

        try {
            runScript(dom);
            await new Promise((resolve) =>
                dom.window.setTimeout(resolve, 1_650)
            );
            expect(accountClick.calledOnce).to.equal(true);
        } finally {
            dom.window.close();
        }
    });
});
