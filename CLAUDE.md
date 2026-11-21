# sengoku

Read `AGENTS.md` first. This file adds the Claude-specific entry points.
For general (non-redesign) engineering process, `docs/how-we-build.md` documents the mainline
spec → build → verify → review → merge workflow, with conventions in `docs/conventions.md`.

## Work Routing

- Redesign / Figma UI work: follow `docs/redesign/PROCESS.md`. Use the shipped skills in order:
  `figma-audit` -> `scope-planner` -> `code-updates` -> `validate`. Use `sync-design-system` when
  the Design System Figma file changed or icons/tokens need syncing.
- Bugfix work: use the PROCESS bugfix path: symptom -> reproduce -> root cause -> surgical fix ->
  blast-radius check -> targeted validation.
- Feature or logic work: use the PROCESS feature path: existing pattern -> contract/scope -> minimal
  implementation -> tests/validation -> docs only when the behavior changes.
- Instrumentation / analytics work: use the PROCESS instrumentation path and event catalog. Keep
  event definitions in `lib/analytics/events-config.ts` and preserve existing event contracts.

## Claude Context Control

- For Figma extraction, delegate to the `figma-frame-reader` subagent. The main context should only
  receive the compact cache summary, coverage table, dump paths, and fidelity flags. Exact Figma
  values come from `.claude/skills/_shared/figma-inspect.js` raw chunk dumps.
- For visual/fidelity verification, delegate to the `figma-fidelity-checker` subagent. The main
  context should only receive PASS/FAIL, concrete fix notes, and artifact paths.
- Do not read large Figma dumps, screenshots, or pixel-diff exhaust inline unless a compact
  subagent result is insufficient.

## Hard Rules

- `i18n/messages/en.json` is agent-editable and is the source of copy: add/update English keys
  there directly and use `t("key")` — **never `t.has()` fallback chains** (the key must exist).
  Translated locales (`de.json`, `fr.json`, …) are never hand-edited (hook-enforced); fill them by
  running the `translate` skill, which adds the missing keys and never touches existing ones.
- Redesign is in-place. Edit existing files under `app/components/` directly unless a shared
  primitive must be added or extended. Do not create a parallel redesign subtree for screen code.
- Design tokens live in `app/globals.css` (`:root`) and are wired through `tailwind.config.ts` via
  `var(--...)`. Token source of truth is `docs/redesign/tokens.json` plus
  `docs/redesign/DESIGN-SYSTEM.md`.
- Any file carrying `data-t="..."` is active redesign and must use named tokens only. This is
  enforced by `pnpm check:redesign-tokens`.
- Typography: ONE system — the redesign plugin classes (`heading-1/2`, `subheading-1/2`,
  `body-l/m/s`, `button-link`) applied via plain `className` on the semantic element
  (`<h2 className="font-greed subheading-2 text-text-primary">`). The `<Text>` component is
  **banned in new/edited markup** (its enum can't express the responsive ramp — a known source of
  wrong tablet/mobile type). Resolve each class per the protocol in
  `.claude/skills/_shared/design-system.md` §2a: Figma text-style NAME + the value tuple at EVERY
  breakpoint — never a single-breakpoint px match (mobile `subheading-2` ≡ `body-m`!), never copied
  from nearby code. Untouched existing `<Text>` lines stay; a line you're already editing migrates.
- Code comments: default none. Never narrate markup, never embed Figma node ids, spec/requirement
  references, or token values in comments (`.claude/skills/_shared/code-standards.md` §6).
- Icons come from `app/components/icons/ih` only:
  `import { XIcon } from "@/app/components/icons/ih"`. Never add new work with `@fortawesome`,
  `lucide-react`, another icon library, or legacy glyphs under `app/components/icons/*.tsx`. If an
  icon is missing, sync it through `sync-design-system` and
  `.claude/skills/_shared/icon-sync.md`. Browse the set at `/icons-demo`.

## Validation fidelity (non-negotiable)

- **Per-breakpoint fidelity:** typography (font-size, font-weight, line-height, letter-spacing), color tokens, and gaps/spacing must be verified at EVERY in-scope breakpoint — never generalized from one and assumed to hold for the rest. Figma is the source of truth _per breakpoint_; the same element routinely diverges (size, weight, gap, alignment) across mobile/tablet/web.
- **Token resolves to a visible value:** a named color/border/background token is only correct if it maps to a defined `:root` var in `globals.css` carrying the intended _visible_ value. `pnpm check:redesign-tokens` only proves the token NAME is on-system — it does not prove the value renders (an undefined/empty var = an invisible divider/border that still "passes" the name guard). Assert the resolved computed value, not just the class.
- **Validation honesty:** `pnpm validate` is static-only (type-check + lint + circular + token-name guard). It is necessary but NEVER sufficient to call a redesign requirement done. Rendered value + geometry + interaction-state checks must pass _per breakpoint_ first. "PASS-with-caveats" is not done.
