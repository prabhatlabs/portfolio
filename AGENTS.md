# Project Rules

## Package Manager
- Use `bun` for all package management (install, add, remove, run scripts)
- Do NOT use `npm` or `yarn` for any package operations
- Scripts are defined in `package.json` and run via `bun run <script>` or `npm run <script>` (the scripts are configured for both)

## Git
- NEVER commit, amend, push, or create PRs without asking the user first
- Always use `--no-commit` or ask before staging/committing
- Before any git operation, describe what will be committed and ask for confirmation

## Code Style
- Use TypeScript with strict types
- Follow existing project conventions (file structure, naming, patterns)
- Do NOT add comments to code unless the logic is genuinely complex
- Use functional components with arrow functions in React
- Prefer server components in Next.js App Router

## SEO & Metadata
- Every page needs: metadata export (title, description, openGraph)
- Use JSON-LD structured data on every page
- All blog posts need proper article schema
- Sitemap must include all public pages

## Performance
- Use `next/font` with `display: swap`
- Add `fetchPriority="high"` to above-the-fold images
- Use `loading="eager"` for hero/LCP images
- Preconnect to third-party origins in layout
