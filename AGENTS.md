# Agent contract (sengoku)

Instructions for Codex, Cursor, Claude Code, and other coding agents working in this repository.

## Project summary

**sengoku** is the InstaHeadshots web app: Next.js 15 App Router, React 19, TypeScript, Tailwind (design tokens), next-intl, TanStack Query, Zustand, pnpm.

- **UI** lives in `app/components/`
- **Logic** lives in `lib/`
- **Routes** are locale-scoped: `app/[locale]/…`

## Task routing

| Task type                    | Start here                                     | Skills / docs                                                                  |
| ---------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------ |
| **Architecture / data flow** | `docs/guide/ARCHITECTURE.md`                   | `CODEBASE-MAP.md`, `GLOSSARY.md`                                               |
| **UI from Figma / redesign** | `.claude/skills/README.md`                     | `scope-planner` → `code-updates` → `validate`; `sync-design-system` for tokens |
| **Analytics / event wiring** | `lib/analytics/events-config.ts`               | `docs/analytics/EVENT-CATALOG.md`, `ADD-EVENT.md`, `instrument-analytics`      |
| **Bugfix / behavior**        | `docs/guide/CODEBASE-MAP.md` for file location | _(dedicated bugfix skill TBD)_                                                 |
| **Token / icon sync**        | `docs/redesign/DESIGN-SYSTEM.md`               | `sync-design-system`                                                           |
| **Domain terms**             | `docs/guide/GLOSSARY.md`                       | —                                                                              |
| **Code conventions**         | `.claude/skills/_shared/code-standards.md`     | —                                                                              |

Default UI workflow: **spec first** (`docs/specs/<feature>.md`), then implement — do not skip the review gate.

## Hard guardrails

1. **i18n:** `i18n/messages/en.json` is agent-editable — add/update English keys there and use `t("key")` directly; **never `t.has()` fallback chains**. Translated locales (`de.json`, `fr.json`, …) are read-only (hook-enforced); new/changed keys get a translation handoff row (redesign process).
2. **Design tokens only** — use Tailwind classes wired to CSS vars (`text-text-primary`, `bg-surface-canvas`, etc.). No arbitrary values (`bg-[#fff]`, `p-[13px]`). Token source: `docs/redesign/tokens.json` → `app/globals.css` → `tailwind.config.ts`.
3. **`data-t` files** — any file with `data-t="…"` must pass `pnpm check:redesign-tokens`.
4. **Icons** — import only from `@/app/components/icons/ih`. Never `@fortawesome`, `lucide-react`, or legacy `app/components/icons/*.tsx` for new work. Missing icon → `sync-design-system` (icon track).
5. **Redesign is in-place** — edit existing `app/components/` files; no separate `redesign/` subtree.
6. **`pnpm validate` must stay green** before finishing work (`type-check`, `lint`, `circular-check`, `check:redesign-tokens`).
7. **No barrel `index.ts`** in component directories — import the component file directly.
8. **Branch off `main`** — never commit directly to `main`.
9. **Preserve analytics** on redesign — keep existing `captureEvent` calls unless the spec explicitly removes the action.
10. **Typography = plugin classes only** — apply the redesign type class (`heading-1/2`, `subheading-1/2`, `body-l/m/s`, `button-link`) via plain `className`; the `<Text>` component is banned in new/edited markup. Resolve the class from the Figma text-style name + cross-breakpoint values (`.claude/skills/_shared/design-system.md` §2a), never from one breakpoint's px.
11. **No comment noise** — no narrating comments, no Figma node ids / spec references / token values in comments (`.claude/skills/_shared/code-standards.md` §6).

## Analytics

- **Source of truth:** [`lib/analytics/events-config.ts`](lib/analytics/events-config.ts) — event names, `required_params`, destinations, transforms.
- **Derived catalog:** [`docs/analytics/EVENT-CATALOG.md`](docs/analytics/EVENT-CATALOG.md) — sync in the same PR when config changes; never catalog-only events.
- **How to add or extend:** [`docs/analytics/ADD-EVENT.md`](docs/analytics/ADD-EVENT.md) — **reuse or extend before creating new events**.
- **API:** `useUnifiedAnalytics().captureEvent(name, params)` from `@/lib/analytics`.
- **Skill:** [`.claude/skills/instrument-analytics/SKILL.md`](.claude/skills/instrument-analytics/SKILL.md) — event dump intake (Google Sheets URL → CSV export) + decision framework.
- **Product handoff:** tracking changes often arrive as a [Google Sheets event spec](https://docs.google.com/spreadsheets/d/1kMSExwR-yHknVCs_K2nWk0p8pyDpXl26fjVaO9z86Jg/edit?gid=726487829#gid=726487829); see [`ADD-EVENT.md`](docs/analytics/ADD-EVENT.md#how-product-shares-changes).

When the user **explicitly asks** for analytics in a UI scope, list events to **preserve**,
**extend**, or **add** in the requirements doc (scope-planner Analytics field). Otherwise omit
analytics from the spec — `code-updates` still must not drop existing `captureEvent` calls
(AGENTS.md guardrail #9).

## Documentation index

| Doc                                                                | Purpose                                                         |
| ------------------------------------------------------------------ | --------------------------------------------------------------- |
| [`docs/guide/ARCHITECTURE.md`](docs/guide/ARCHITECTURE.md)         | App Router, data flow, stores vs Query, analytics, experiments  |
| [`docs/guide/CODEBASE-MAP.md`](docs/guide/CODEBASE-MAP.md)         | Routes, features, hotspots, artifact paths                      |
| [`docs/guide/GLOSSARY.md`](docs/guide/GLOSSARY.md)                 | Domain & workflow vocabulary                                    |
| [`docs/guide/HOW-TO-USE.md`](docs/guide/HOW-TO-USE.md)             | Paths, prompts, verification                                    |
| [`docs/analytics/`](docs/analytics/)                               | Event catalog + add-event checklist                             |
| [`docs/redesign/DESIGN-SYSTEM.md`](docs/redesign/DESIGN-SYSTEM.md) | Token reference                                                 |
| [`CLAUDE.md`](CLAUDE.md)                                           | Claude-specific redesign guardrails (subset of this file)       |
| [`.claude/skills/README.md`](.claude/skills/README.md)             | Figma → code workflow diagram                                   |
| [`docs/how-we-build.md`](docs/how-we-build.md)                     | Mainline spec → build → verify → review → merge workflow        |
| [`docs/conventions.md`](docs/conventions.md)                       | Mainline naming, structure, HLD/LLD, reuse, styling, assets     |
| [`docs/codebase-map.md`](docs/codebase-map.md)                     | Mainline subsystem index                                        |
| [`docs/glossary.md`](docs/glossary.md)                             | Mainline domain vocabulary                                      |
| [`docs/state-persistence.md`](docs/state-persistence.md)           | Where client state lives (useState / session / local / backend) |

## Skills (`.claude/skills/`)

| Skill                  | Use when                                                  |
| ---------------------- | --------------------------------------------------------- |
| `scope-planner`        | Planning UI from Figma — writes `docs/specs/<feature>.md` |
| `code-updates`         | Implementing an approved spec                             |
| `validate`             | Pixel + interaction state verification                    |
| `sync-design-system`   | Pull tokens/icons from Figma DS                           |
| `figma-audit`          | Pre-flight frame lint                                     |
| `instrument-analytics` | Extend, reuse, or add analytics events; event dump intake |
| `design-to-code`       | Mainline intake-and-plan workflow for UI from a design    |
| `design-verify`        | Mainline design-conformance check (subagent)              |
| `bugfix`               | Mainline surgical bug diagnosis + fix path                |

Shared references: `_shared/code-standards.md`, `_shared/design-system.md`, `_shared/figma-to-code.md`, `_shared/figma-cache.md`.

## Deprecated names (do not use for new work)

| Deprecated                                           | Use instead                                       |
| ---------------------------------------------------- | ------------------------------------------------- |
| `design-token-sync` skill                            | `sync-design-system`                              |
| `app/components/redesign/` subtree                   | In-place edits under `app/components/`            |
| Legacy icons `app/components/icons/*.tsx` (non-`ih`) | `app/components/icons/ih/`                        |
| `[data-redesign]` scoping gate                       | Global `:root` tokens (see redesign session logs) |
| Hand-editing generated token values in `globals.css` | Update via `tokens.json` + `sync-design-system`   |
| Hand-maintained analytics without config             | `events-config.ts` first, then EVENT-CATALOG      |
| `<Text>` component in new/edited markup              | Redesign type class via plain `className`         |
| `t.has("key") ? t("key") : fallback` chains          | Add the key to `en.json`, use `t("key")` directly |

## Quick commands

```bash
pnpm dev:s        # local HTTPS server → https://test-local.instaheadshots.com:3000
pnpm validate     # required gate before PR
pnpm pixel-diff   # design verification (validate skill)
pnpm lint:fix     # autofix ESLint
```

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
