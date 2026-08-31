const fs = require("node:fs");
const path = require("node:path");

const style = fs.readFileSync(
    path.join(__dirname, "..", "Gyazo-DarkMode.user.css"),
    "utf8"
);

describe("Gyazo dark mode regression boundaries", () => {
    test("keeps capture thumbnails visible and preserves the accent strip", () => {
        const hoverStart = style.indexOf(
            ".grid-view .card.medium-card .hover-layer:hover,"
        );
        const hoverEnd = style.indexOf(
            "#metadata-is-public-dropdown",
            hoverStart
        );
        const hoverRules = style.slice(hoverStart, hoverEnd);

        expect(hoverStart).toBeGreaterThanOrEqual(0);
        expect(hoverEnd).toBeGreaterThan(hoverStart);
        expect(hoverRules).toContain("opacity: 0%");
        expect(hoverRules).not.toContain("opacity: 100%");
        expect(hoverRules).not.toContain("color-mix(");
        expect(style).toContain(
            '@var color capture-accent-color "Capture Bar / Selection Color" #bb86fc6e'
        );
        expect(style).toContain(
            "--capture-accent-color: var(capture-accent-color);"
        );
        expect(style).toContain(
            "box-shadow: 0 3px 0 var(--capture-accent-color) !important;"
        );
        expect(style).not.toContain(
            "box-shadow: 0 1px 0 0 var(--primary-color);"
        );
        expect(style).not.toContain(".grid-view .card .card-footer,");
    });

    test("does not globally restyle reusable React controls", () => {
        expect(style).not.toMatch(
            /^\s*:is\(a, button\)\.explorer-action-btn\s*\{/mu
        );
        expect(style).not.toMatch(/^\s*\.tags > a\s*\{/mu);
        expect(style).not.toMatch(
            /^\s*\.side-block-items \.collection-item\s*\{/mu
        );
    });

    test("keeps the header link out of the full-screen overlay selector", () => {
        const overlayStart = style.indexOf("#headlessui-dialog-overlay-5,");
        const overlayEnd = style.indexOf(
            "background-color: #ffffff17 !important;",
            overlayStart
        );
        const overlayRule = style.slice(overlayStart, overlayEnd);

        expect(overlayStart).toBeGreaterThanOrEqual(0);
        expect(overlayEnd).toBeGreaterThan(overlayStart);
        expect(overlayRule).not.toContain("explorer-action-btn-toolbar");
    });

    test("uses the customizable accent for checked captures", () => {
        expect(style).toContain(
            ".grid-view.checking .card.checkable.checked .checking-overlay,"
        );
        expect(style).toContain(
            "border-color: var(--capture-accent-color) !important;"
        );
        expect(style).toContain(".grid-view .card.row-card .card-checkmark {");
    });

    test("keeps sidebar hover states visible without global link rules", () => {
        expect(style).toContain(
            ".side-block .side-block-items .toplevel-item-selectable:hover,"
        );
        expect(style).toContain(
            ".side-block .side-block-items .toplevel-item-selectable > a,"
        );
        expect(style).toContain("background-color: transparent !important;");
        expect(style).not.toMatch(/^\s*\.tags > a\s*\{/mu);
    });

    test("does not paint empty collection or tag grids with the accent", () => {
        const placeholderStart = style.indexOf(
            ".board-index\n        .collection-wrapper"
        );
        const placeholderEnd = style.indexOf("body.edge {", placeholderStart);
        const placeholderRules = style.slice(placeholderStart, placeholderEnd);

        expect(placeholderStart).toBeGreaterThanOrEqual(0);
        expect(placeholderEnd).toBeGreaterThan(placeholderStart);
        expect(placeholderRules).toContain(".tile-placeholder");
        expect(placeholderRules).toContain("box-shadow: none !important;");
        expect(placeholderRules).not.toContain("--capture-accent-color");
        expect(style).not.toContain(".B9QQGIFrwoa05qnyZvI5");
    });

    test("scopes history and edit-toolbar surface corrections", () => {
        expect(style).toContain("& .history-header,");
        expect(style).toContain("& .image-detail-container {");
        expect(style).toContain(".board-show-page .background-block,");
        expect(style).toContain(".board-show-page .main-block-stage {");
        expect(style).toContain(
            ".transform-page-header .explorer-action-btn-toolbar > label,"
        );
        expect(style).toContain('> input[type="checkbox"] {');
    });
});
