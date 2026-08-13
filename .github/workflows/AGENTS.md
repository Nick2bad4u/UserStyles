# GitHub Actions instructions

These instructions specialize the repository-level `AGENTS.md` for files under
`.github/workflows/`.

## Repository workflow conventions

- Identify whether the file is local workflow logic or a thin caller of a
  reusable workflow before editing it. Keep reusable callers thin.
- Preserve the repository's full-commit-SHA pins for third-party actions and the
  adjacent version comments. Verify a new SHA against the upstream action before
  changing it.
- Calls to owner-controlled reusable workflows in
  `Nick2bad4u/workflow-templates` intentionally use `@main`; do not replace those
  references with SHA pins unless the user changes that policy.
- Keep `permissions` explicit and least-privileged. Several reusable callers use
  top-level `permissions: {}` and grant only the permissions required by the
  called job.
- Preserve `step-security/harden-runner` where present. Review new or changed
  network, secret, artifact, and write operations against its threat model.
- The primary CI workflow installs with `npm ci --legacy-peer-deps`, runs
  `npm run lint:css`, runs `npm run test:coverage`, and uploads LCOV to Codecov.
  Keep workflow commands aligned with real `package.json` scripts.
- This is a private npm tooling workspace, not an npm package publishing
  pipeline. Do not add registry publishing, provenance, staged environments, or
  application-deployment machinery without an explicit repository requirement.
- Current repository-specific automation includes CI, CodeQL, GitHub Pages,
  dependency/security reusable callers, repository metrics, greetings, rebasing,
  labels, stale management, and contribution-graph generation. Do not import
  generic release architecture that these jobs do not need.

## Security and correctness

- Treat pull request text, issue content, branch names, matrix values, workflow
  inputs, and repository metadata as untrusted. Pass expressions through `env`
  and quote them before use in shell commands.
- Do not use `pull_request_target` or another privileged trigger to check out and
  execute untrusted pull-request code.
- Do not echo secrets, dump whole contexts containing sensitive values, or pass
  secrets to untrusted code. Prefer `GITHUB_TOKEN` and grant only its required
  permission scopes.
- Verify action inputs against the pinned action's `action.yml` or current
  official documentation. Do not guess renamed or version-specific inputs.
- Preserve trigger, branch, concurrency, artifact, and output behavior unless the
  task explicitly changes it. A formatting-only workflow edit must not alter
  execution semantics.

## Validation

Run focused validation first:

```powershell
npx eslint ".github/workflows/changed-workflow.yml" --no-cache
yamllint -c .yamllint ".github/workflows/changed-workflow.yml"
actionlint ".github/workflows/changed-workflow.yml"
git diff --check
```

If `actionlint` is unavailable, report that and still run both repository YAML
linters. For changes spanning multiple workflows, run `npm run lint:yaml`,
`npm run lint:yamllint`, and the relevant local tests or scripts.
