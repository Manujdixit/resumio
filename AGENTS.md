# Agent Guide for Resumio

This document provides essential context, commands, and guidelines for AI agents working on the Resumio codebase.

## Project Structure

- **Monorepo:** Turborepo managed.
- **Package Manager:** `bun` (use `bun run` for scripts).
- **Apps:**
  - `apps/web`: Next.js 16 application (App Router), React 19.
  - `apps/blog-agents`: Agentic blog generation.
- **Packages:**
  - `packages/db`: Drizzle ORM, Postgres schemas & migrations.
  - `packages/auth`: Authentication logic (Better Auth).
  - `packages/config`: Shared configurations.

## Tech Stack

- **Runtime:** Bun
- **Framework:** Next.js 16 (React 19)
- **Styling:** Tailwind CSS 4, Radix UI, Lucide React
- **State Management:** Zustand, Tanstack Query
- **Database:** Postgres, Drizzle ORM
- **Authentication:** Better Auth
- **Validation:** Zod
- **Forms:** React Hook Form
- **Linting/Formatting:** Biome

## Build & Validation Commands

Run these from the project root:

- **Install Dependencies:** `bun install`
- **Start Development:** `bun run dev` (starts all apps)
- **Build Production:** `bun run build` (builds all apps)
- **Lint & Format:** `bun run check` (runs `biome check --write .`)
  - **Important:** Run this after _any_ code changes to ensure formatting and linting compliance.
- **Type Check:** `bun run check-types`
- **Database:**
  - Push schema: `bun run db:push`
  - Generate migrations: `bun run db:generate`
  - Studio: `bun run db:studio`

> **Note on Tests:** No test suite (Jest/Vitest) is currently configured in the root `package.json` or visible in the codebase. Verify changes by building and linting.

## Code Style & Conventions

### Formatting & Linting

- **Strictly follow Biome rules.**
- Indentation: 2 spaces.
- Quotes: Double quotes.
- Semi-colons: Standard.
- Imports: Organized automatically by Biome. Use absolute imports with `@/` where configured.

### React / Next.js

- Use **functional components** with `export default function`.
- Use **Next.js App Router** patterns (`src/app`).
- Use **Tailwind CSS** for styling. Sort classes if required by tooling (Biome handles this).
- Use `shadcn/ui` (Radix UI) patterns for UI components.
- Prefer `zod` for schema validation.

### Database (Drizzle)

- Define schemas in `packages/db`.
- Use `drizzle-kit` for migrations.
- **Never** modify the database schema without running `db:generate` and `db:push` (or `migrate` if applicable).

### Error Handling

- Use `try/catch` blocks for async operations, especially DB and API calls.
- Use explicit error logging.

## Workflow for Agents

1. **Explore:** Use `ls -R` or `glob` to locate relevant files.
2. **Read:** Read content of files before editing.
3. **Plan:** Formulate a plan. **Important:** Do not attempt to edit files in PLAN mode.
4. **Edit:** Apply changes.
5. **Verify:**
   - Run `bun run check` to fix formatting and catch lint errors.
   - Run `bun run check-types` to ensure type safety.
   - Run `bun run build` to verify the build passes.
