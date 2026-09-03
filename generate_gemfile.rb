# frozen_string_literal: true

# Keep this version aligned with the github-pages gem bundled by the pinned
# actions/jekyll-build-pages release in .github/workflows/main.yml.
github_pages_version = "232"

File.binwrite(
  "Gemfile",
  <<~GEMFILE
    source "https://rubygems.org"

    # Keep this exact version aligned with the github-pages gem bundled by the
    # pinned actions/jekyll-build-pages release in .github/workflows/main.yml.
    gem "github-pages", "= #{github_pages_version}", group: :jekyll_plugins
  GEMFILE
)
