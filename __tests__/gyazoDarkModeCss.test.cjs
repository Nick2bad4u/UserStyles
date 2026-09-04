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
        const placeholderEnd = style.indexOf(
            "/* Keep collection previews visible",
            placeholderStart
        );
        const placeholderRules = style.slice(placeholderStart, placeholderEnd);

        expect(placeholderStart).toBeGreaterThanOrEqual(0);
        expect(placeholderEnd).toBeGreaterThan(placeholderStart);
        expect(placeholderRules).toContain(".tile-placeholder");
        expect(placeholderRules).toContain("box-shadow: none !important;");
        expect(placeholderRules).not.toContain("--capture-accent-color");
        expect(style).not.toContain(".B9QQGIFrwoa05qnyZvI5");
    });

    test("keeps collection images visible during hover", () => {
        const overlayStart = style.indexOf("& .hover-layer {");
        const overlayEnd = style.indexOf("body.edge {", overlayStart);
        const overlayRules = style.slice(overlayStart, overlayEnd);

        expect(overlayStart).toBeGreaterThanOrEqual(0);
        expect(overlayEnd).toBeGreaterThan(overlayStart);
        expect(overlayRules).toContain("background: transparent !important;");
        expect(overlayRules).toContain("opacity: 0% !important;");
        expect(overlayRules).toContain("pointer-events: none;");
    });

    test("gives the Tags grid capture-style cards and one aligned tooltip surface", () => {
        const tagsStart = style.indexOf(
            '@-moz-document url-prefix("https://gyazo.com/tags")'
        );
        const tagsEnd = style.indexOf(
            '@-moz-document domain("help.gyazo.com")',
            tagsStart
        );
        const tagsRules = style.slice(tagsStart, tagsEnd);

        expect(tagsStart).toBeGreaterThanOrEqual(0);
        expect(tagsEnd).toBeGreaterThan(tagsStart);
        expect(tagsRules).toContain(
            ".main-block-stage section:has(> .testing-swap-image-container)"
        );
        expect(tagsRules).toContain(
            "box-shadow: 0 3px 0 var(--capture-accent-color) !important;"
        );
        expect(tagsRules).toContain("& .react-tooltip-content-wrapper {");
        expect(tagsRules).toContain("padding: 0 !important;");
        expect(tagsRules).not.toContain(".B9QQGIFrwoa05qnyZvI5");
        expect(tagsRules).not.toContain(".k3nzGrC3hEubDzXyOg_r");
        expect(tagsRules).not.toContain(".caBpUIyLTfNBwvxfTyDa");
    });

    test("restores clean collection headings and dark API documentation surfaces", () => {
        expect(style).toContain(".board-show-page .title-input,");
        expect(style).toContain(".board-show-page .description-input {");
        expect(style).toContain("background-color: transparent !important;");
        expect(style).toContain("body.api-docs .breadcrumb {");
        expect(style).toContain("body.api-docs pre {");
        expect(style).toContain("navbar_logo_white-4f9533c2df.png");
    });

    test("uses readable, coherent surfaces across Gyazo Help pages", () => {
        const helpStart = style.indexOf(
            '@-moz-document domain("help.gyazo.com")'
        );
        const helpEnd = style.indexOf(
            '@-moz-document regexp("^https://(www\\\\.)?gyazo',
            helpStart
        );
        const helpRules = style.slice(helpStart, helpEnd);

        expect(helpStart).toBeGreaterThanOrEqual(0);
        expect(helpEnd).toBeGreaterThan(helpStart);
        expect(helpRules).toContain(".header .navbar {");
        expect(helpRules).toContain("body.contact-page form label {");
        expect(helpRules).toContain("body.contact-page form .form-control {");
        expect(helpRules).toContain("body.article-page .page-content,");
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
