# UserStyles repository instructions

## Repository purpose

This repository is a collection of independently installable UserCSS themes
(`*.user.css`), userscripts (`*.user.js`), supporting Node.js utilities, tests,
and GitHub automation. Most root-level artifacts target third-party websites and
run in browser extensions such as Stylus, Tampermonkey, or Violentmonkey.

Treat each installable artifact as its own public product. A repository-wide
cleanup must not erase file-specific provenance, licensing, metadata, versioning,
browser compatibility, or target-site behavior.

More specific instructions apply under `.github/workflows/AGENTS.md` for GitHub
Actions files.

## Working safely

- Inspect `git status --short`, the unstaged diff, and the staged diff before
  editing. This repository is frequently used with mixed staged, unstaged, and
  untracked work; preserve unrelated changes and staging boundaries.
- Make focused changes. Do not reformat or modernize the whole collection to
  solve one artifact's problem.
- Do not commit, push, publish, create releases, or update live listings unless
  the user explicitly requests that operation.
- Use npm and the committed `package-lock.json`. CI installs with
  `npm ci --legacy-peer-deps`; do not switch package managers or rewrite the
  lockfile incidentally.
- Never commit credentials, private API keys, browser profiles, extension state,
  cookies, generated coverage, caches, or local diagnostic output.

## UserCSS requirements

- Preserve the `/* ==UserStyle== ... ==/UserStyle== */` header and its
  `@name`, `@namespace`, `@author`, `@license`, URL, update, and download fields.
  Do not invent ownership, remove attribution, or relicense third-party work.
- Check provenance and redistribution rights before importing, forking, or
  publishing external styles. `NONE`, `NO-REDISTRIBUTION`, and missing licenses
  are not permission to copy and relicense; use a clean-room implementation when
  redistribution is not authorized.
- Preserve the version scheme already used by the file. The collection includes
  SemVer, decimal, date-based, and timestamp-like versions; do not normalize them
  repository-wide.
- Treat selectors and custom properties from target sites as external API names.
  Do not rename them merely to satisfy naming rules. Verify modern replacements
  against the current site DOM when selector behavior is in scope.
- Legacy USO, UserCSS, and Stylus constructs may be intentional, including
  `@advanced`, `<<<EOT`, escaped placeholder comment closers, and
  `@preprocessor` directives. Diagnose with the declared parser or preprocessor
  before rewriting supported syntax.
- A successful Prettier or Stylelint run does not prove that Stylus can install
  or compile a preprocessed style. For parser-specific failures, reproduce with
  the applicable parser/version and retain the exact error as evidence.
- Avoid broad `stylelint --fix` runs across legacy UserCSS. Autofix has previously
  duplicated control blocks and changed compatibility-sensitive syntax. Apply a
  narrow patch, inspect the diff, and lint the individual file first.
- Prefer `#000000` over the named value `black` for UserCSS color-variable
  defaults because affected Stylus metadata parsers can reject the falsy numeric
  representation of named black.
- When visual behavior changes, verify the real target page when practical.
  Use a privacy-safe page or crop for screenshots and do not expose signed-in
  profile, notification, or account state.

## Userscript requirements

- Preserve the `// ==UserScript== ... // ==/UserScript==` header, grants, match
  patterns, update/download URLs, attribution, license, and existing version
  convention.
- Keep permissions and match scopes minimal. Do not add broad `@match`,
  `@connect`, `@grant`, cross-origin access, or credential storage without a
  demonstrated need.
- Maintain compatibility with the script manager and page context used by the
  existing artifact. Test DOM-dependent changes with representative fixtures or
  the real site when practical.
- Update or add the focused Jest test when changing behavior covered by a
  `*.test.cjs` file.

## Supporting code and generated artifacts

- Shared utilities live under `src/utils/` and use CommonJS (`*.cjs`). Keep them
  DOM-independent unless the module's contract explicitly requires browser APIs.
- Tests live under `__tests__/` and run with Jest through `jest.config.cjs`.
- Generator and synchronization scripts live under `scripts/`. When changing a
  generated or synchronized artifact, update the authoritative generator first
  and verify that rerunning it is deterministic.
- Follow the existing module format and local conventions. The package is an ESM
  project, while several test and utility surfaces intentionally remain CommonJS.

## Validation

Start with the smallest relevant command, then run the broader gate warranted by
the change.

### Focused checks

```powershell
npx stylelint "Path-To-Style.user.css" --no-cache
npx eslint "Path-To-Script.user.js" --no-cache
npx jest --config jest.config.cjs --runInBand "__tests__/matching.test.cjs"
npx prettier --check "Path-To-File"
git diff --check
```

For `@preprocessor stylus`, also compile with the applicable Stylus version. Do
not claim installability from CSS lint alone.

### Repository checks

```powershell
npm run lint:css
npm run lint:nocache
npm run compile
npm test
npm run lint:prettier
```

The aggregate `lint:all` and `lint:all:nocache` scripts currently reference a
missing `typecheck` script. Do not present either aggregate as a working gate
until `package.json` is repaired; run the applicable constituent commands above
instead.

If a check cannot run, report the exact unavailable tool or environmental
constraint and run the nearest meaningful alternative. Do not hide failures with
blanket disables, broad ignores, weakened rules, or unrelated suppressions.

## Git and review conventions

- Use branch names in `type/description` form when a branch is requested.
- When a commit message is requested, inspect the actual staged diff and follow
  `.github/agent-commit-message-instructions.md`.
- Keep metadata-only, behavior, tooling, and workflow changes logically distinct
  when staging or committing is explicitly requested.
- Review highest-risk changes first: licensing or attribution loss, broken
  metadata delimiters, widened execution scope, incompatible preprocessor syntax,
  exposed secrets, unsafe workflow permissions, and changes that silently stop a
  style or script from updating.
- Publication to UserStyles.world or Greasy Fork is a separate external action
  from editing or pushing this repository. Verify the exact published version,
  install artifact, description, and privacy-safe preview before calling a
  publication complete.
