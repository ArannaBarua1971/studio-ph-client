<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Frontend (StudioGrid)

Next.js 16 App Router app: Turbopack, React Compiler, Tailwind v4, shadcn on `@base-ui/react`. Young project — there is **no test runner, no CI, no formatter, no pre-commit hooks**; `npm run build` + `npm run lint` are the only verification gates. Default branch is `master`.

## Commands

- `npm run dev` — dev server on :3000 (Turbopack).
- `npm run build` — production build; it also runs the TypeScript check, so it is the single "does it work" gate. Verified passing.
- `npm run lint` — runs `eslint` (flat config, ESLint 9) over the repo; the script passes no file paths. Errors fail the exit code, warnings do not.
- `npx tsc --noEmit` — typecheck only. **Requires `.next/` to exist**: `layout.tsx` uses the generated global `LayoutProps`, and `next-env.d.ts` (both gitignored) are produced by `next dev`/`next build`. On a fresh clone, build or dev once before typechecking, or you get "Cannot find name 'LayoutProps'".
- No tests exist — don't invent test commands; if tests are needed, agree on a runner first.

## Layout & entrypoints

- Real entrypoints: `src/app/layout.tsx` (root layout: font, metadata, `Navbar`) and `src/app/page.tsx`. README still says `app/page.tsx` — it's stale; app code lives under `src/app/`.
- Component homes: `src/components/ui/` = shadcn primitives, `src/app/components/` = page-level components, `src/app/layout/` = layout-level components. Follow the existing split.
- Path alias `@/*` → `./src/*` — use it for all cross-directory imports.

## Toolchain quirks

- React Compiler is on (`reactCompiler: true` in `next.config.ts`) — don't add manual `useMemo`/`useCallback`/`React.memo`.
- Tailwind v4 is CSS-first: there is no `tailwind.config.*`; tokens/dark mode live in `src/app/globals.css` (`@theme inline`, `.dark` variant). CSS is routed through the `@tailwindcss/turbopack` rule in `next.config.ts` — keep that rule.
- shadcn: `components.json` style is `base-nova`, components use `@base-ui/react` (**not Radix**), icons are `lucide-react`. The `cn` helper is the `cn` npm package re-exported by `src/lib/utils.ts`, not the usual clsx+tailwind-merge — import it from `@/lib/utils`.
- Never commit or hand-edit `.next/`, `next-env.d.ts`, or `*.tsbuildinfo`; they are gitignored build output.
