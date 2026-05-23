import sharedConfig from "stylelint-config-nick2bad4u";

/** @type {import("stylelint").Config} */
const stylelintConfig = {
    ...sharedConfig,
    // Legacy repo: avoid noisy meta warnings while we converge on stricter standards.
    reportNeedlessDisables: false,
    // Scope linting to UserCSS files only.
    // This prevents non-userstyle assets (HTML/JS snippets, generated files, etc.)
    // from being parsed by Stylelint in VS Code.
    ignoreFiles: ["**/*", "!**/*.user.css"],
    // Keep shared overrides that apply to CSS-compatible files,
    // but layer in UserStyle-specific rule tuning to avoid false positives
    // on legacy/userstyle patterns (e.g. @-moz-document, !important-heavy overrides).
    overrides: [
        ...(sharedConfig.overrides || []),
        {
            files: ["**/*.user.css"],
            rules: {
                // Userstyle scoping commonly relies on this at-rule.
                "at-rule-no-vendor-prefix": null,
                // Required in userstyles to beat site/app utility and inline styles.
                "declaration-no-important": null,
                // Legacy userstyles frequently include Stylus-compatible sentinel selectors.
                "selector-type-no-unknown": null,
                // These are app/docs-theme-specific and not meaningful for arbitrary target sites.
                "docusaurus/no-unscoped-content-element-overrides": null,
                // Performance budget rules are too strict for broad userstyle overrides.
                "css-performance-budget/no-global-expensive-effects": null,
                "css-performance-budget/no-paint-heavy-declarations": null,
                "css-performance-budget/no-heavy-selectors": null,
                "css-performance-budget/no-giant-selector-lists": null,
                "css-performance-budget/no-layout-thrashing-properties": null,
                "css-performance-budget/no-expensive-animation-properties":
                    null,
                "css-performance-budget/require-reduced-motion-for-expensive-animations":
                    null,
                "css-performance-budget/no-excessive-filter-effects": null,
                "css-performance-budget/no-expensive-positioning-patterns":
                    null,
                "css-performance-budget/no-fixed-background-attachment": null,
                "css-performance-budget/no-will-change-abuse": null,
                // Userstyles often target external IDs/classes that cannot be renamed.
                "selector-max-id": null,
                "selector-max-specificity": null,
                "selector-id-pattern": null,
                // Prefer not to enforce logical-only properties for website override styles.
                "property-layout-mappings": null,
                "unit-layout-mappings": null,
                "value-keyword-layout-mappings": null,
                // Legacy userstyles use mixed custom property naming conventions.
                "custom-property-pattern": null,
                // Third-party theme/framework specific guidance not applicable to arbitrary userstyles.
                "docusaurus/no-hardcoded-docusaurus-breakpoint-values": null,
                "docusaurus/no-important-on-infima-or-docusaurus-selector-overrides":
                    null,
                "docusaurus/no-mobile-navbar-stacking-context-traps": null,
                "docusaurus/no-color-scheme-on-docusaurus-html-root": null,
                "docusaurus/no-unstable-docusaurus-generated-class-selectors":
                    null,
                "docusaurus/prefer-infima-theme-tokens-over-structural-overrides":
                    null,
                "docusaurus/require-reduced-motion-override-for-interactive-transitions":
                    null,
                // Keep lint practical for legacy CSS corpus.
                "a11y/font-size-is-readable": null,
                "a11y/no-outline-none": null,
                "a11y/no-text-align-justify": null,
                "plugin/no-low-performance-animation-properties": null,
                "plugin/no-unsupported-browser-features": null,
                "plugin/declaration-block-no-ignored-properties": null,
                "scss/operator-no-unspaced": null,
                "scss/operator-no-newline-after": null,
                "scss/at-function-named-arguments": null,
                "scss/function-color-relative": null,
                "font-weight-notation": null,
                "no-descending-specificity": null,
                "no-duplicate-selectors": null,
                "selector-pseudo-class-no-unknown": null,
                "selector-pseudo-element-no-unknown": null,
                "selector-no-deprecated": null,
                "color-named": null,
                "time-min-milliseconds": null,
            },
        },
    ],
};

export default stylelintConfig;
