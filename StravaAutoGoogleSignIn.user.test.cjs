const fs = require("node:fs");
const path = require("node:path");

const { expect } = require("chai");
const { JSDOM } = require("jsdom");
const { describe, it } = require("mocha");
const sinon = require("sinon");

const script = fs.readFileSync(
    path.join(__dirname, "StravaAutoGoogleSignIn.user.js"),
    "utf8"
);

function createPage(body = "") {
    return new JSDOM(body, {
        runScripts: "outside-only",
        url: "https://www.strava.com/login",
    });
}

function runScript(dom) {
    dom.window.eval(script);
}

function waitForMutation(dom) {
    return new Promise((resolve) => dom.window.setTimeout(resolve, 0));
}

describe("StravaAutoGoogleSignIn.user.js", () => {
    it("clicks Strava's existing Google auth button immediately", () => {
        const dom = createPage(
            '<button data-testid="google_auth_btn">Sign In With Google</button>'
        );
        const googleButton = dom.window.document.querySelector(
            '[data-testid="google_auth_btn"]'
        );
        const googleClick = sinon.spy();
        googleButton.addEventListener("click", googleClick);

        try {
            runScript(dom);
            expect(googleClick.calledOnce).to.equal(true);
        } finally {
            dom.window.close();
        }
    });

    it("waits for Strava to render the Google auth button", async () => {
        const dom = createPage();
        const googleButton = dom.window.document.createElement("button");
        googleButton.dataset.testid = "google_auth_btn";
        googleButton.textContent = "Sign In With Google";
        const googleClick = sinon.spy();
        googleButton.addEventListener("click", googleClick);

        try {
            runScript(dom);
            dom.window.document.body.append(googleButton);
            await waitForMutation(dom);

            expect(googleClick.calledOnce).to.equal(true);
        } finally {
            dom.window.close();
        }
    });

    it("falls back to the button label when Strava's test id is unavailable", () => {
        const dom = createPage("<button>  SIGN IN WITH GOOGLE  </button>");
        const googleButton = dom.window.document.querySelector("button");
        const googleClick = sinon.spy();
        googleButton.addEventListener("click", googleClick);

        try {
            runScript(dom);
            expect(googleClick.calledOnce).to.equal(true);
        } finally {
            dom.window.close();
        }
    });
});
