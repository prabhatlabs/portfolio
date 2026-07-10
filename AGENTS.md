# Project Rules

## Package Manager
- Use `bun` for all package management (install, add, remove, run scripts)
- Do NOT use `npm` or `yarn` for any package operations
- Scripts are defined in `package.json` and run via `bun run <script>` or `npm run <script>` (the scripts are configured for both)

## Build
- Do NOT run `build` or `dev` scripts unless explicitly asked
- Verification of changes should be done by reading files, not by building

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

## Data & Content
- Store page content and structured data in `data/*.ts` files (e.g. `data/root.ts`, `data/now.ts`)
- Do NOT hardcode content strings or personal info directly in page components
- Use TypeScript types for data exports to enable type-safe consumption

## Generate Scripts
- Generation scripts live in `scripts/` (e.g. `generate-blog.ts`, `generate-cli.ts`, `generate-llms.ts`)
- Each script exports a single async function that writes to `public/` or `contents/`
- Add a corresponding `npm run <name>:generate` script in `package.json`
- Generated output files (JSON, txt, sh) are committed to the repo — they serve as the published artifact
