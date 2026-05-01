# symphony-e2e-01

Next.js 16 app (App Router, TypeScript, Tailwind v4, Turbopack) with shadcn/ui (slate base), Convex for the backend, Zod for schema validation, and Bun as the package manager and runtime. Hosted at https://github.com/Ddell12/symphony-e2e-01.

## Commands

```bash
bun install                        # Install dependencies
bun dev                            # Start dev server (Turbopack)
bun run lint                       # ESLint
bunx convex dev                    # Start Convex dev backend (provisions on first run)
bunx shadcn@latest add <component> # Add a shadcn/ui component
```

## Directory Layout

```
src/
├── app/          # Next.js App Router pages and layouts
├── components/   # Shared React components (shadcn primitives live here)
└── lib/          # Utilities, Zod schemas, helpers
convex/           # Convex schema, queries, mutations, actions
public/           # Static assets
```

## Conventions

1. **Type safety** — strict TypeScript throughout; no `any` without an explicit justification comment.
2. **Server components first** — default to React Server Components; add `"use client"` only when interactivity or browser APIs require it.
3. **Validate at boundaries (Next.js)** — all user input at Next.js API routes and Server Actions must pass through a Zod schema before use.
4. **Validate at boundaries (Convex)** — Convex function arguments must be validated with Convex's `v` validators (`convex/values`); do not use Zod inside Convex handlers.
5. **shadcn primitives** — use installed shadcn/ui components as the base for all UI; do not hand-roll buttons, dialogs, or form elements.
6. **Never commit Convex generated or deployment files** — `convex/_generated/` is auto-generated at dev time and is gitignored; do not commit it. `NEXT_PUBLIC_CONVEX_URL` and any Convex env values belong in `.env.local` (gitignored).

## Symphony E2E Target

This repo is a Symphony end-to-end test target. Archon may autonomously open pull requests against open GitHub issues in this repository as part of integration testing. Expect machine-authored PRs; review them as you would any contributor PR.
