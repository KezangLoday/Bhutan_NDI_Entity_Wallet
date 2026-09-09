# CLAUDE.md — NDI Studio / Entity Wallet demo

## What this is

A **frontend-only clickable demo** of the Bhutan NDI Entity Wallet, built inside
the NDI-reskinned Studio console. The deliverable is not a product increment —
it is a story that makes someone understand what the Entity Wallet is and why it
exists. See `docs/demo-plan.md` for the story spine, build depth per screen, and
slice order.

There is **no backend, and there will not be one**. `src/lib/demoData.ts` +
`src/lib/demoStore.tsx` are the whole data layer, by design.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck  # tsc --noEmit — the only gate; there are no tests
```

TypeScript is strict with `noUnusedLocals` and `noUnusedParameters`, so an
unused import fails the build, not just a lint pass.

## Standing rules

1. **No new dependencies.** The repo runs on `next`, `react`, `react-dom` and
   nothing else. Do not install shadcn/ui, Radix, TanStack Table,
   react-hook-form, zod, Redux, a date picker or a QR library. Build the
   primitive in `src/components/ui/` in the existing style.
2. **Ignore §13 and §14 of the UX brief.** §13 audits a different repository
   (shadcn/Radix-based, Next 15, Redux, RHF+zod); following it would install a
   second design system into this app. §14 is backend alignment and out of
   scope. Everything else in the brief applies.
3. **Tokens only.** No hard-coded colour in any component — restyle by editing
   `globals.css`. Utilities like `bg-raised`, `text-muted`, `border-grid`,
   `font-display` come from the `@theme` blocks. Tailwind v4 is CSS-first;
   there is deliberately no `tailwind.config`.
4. **Both themes, checked as you go.** Dark is the default; light is a real
   supported mode, not an afterthought.
5. **Status is never colour-only.** Route every status through `StatusPill`,
   extending its map rather than bypassing it. WCAG throughout, full keyboard
   paths.
6. **No fetching, ever.** All data from `demoData.ts` through `demoStore`. No
   API calls, no auth, no network.
7. **File conventions.** Route stubs in `src/app/<path>/page.tsx` (metadata plus
   one view); real UI in `src/features/<area>/<Name>View.tsx`; shared primitives
   in `src/components/ui/`; fixtures in `src/lib/demoData.ts`.
8. **Every state reachable via the state switcher.** A state that cannot be
   reached does not count as built.
9. **Render server decisions, don't invent them.** Allow / deny / park are
   things that came back from the server — here, fixture values. Never
   client-side gating logic, even though it would be easy in a demo. The UI is
   not the authority boundary and must not be built as though it were.
10. **No statute numbers in primary copy.** Legal moments should read as
    natural, trustworthy steps. Keep the citations in comments and in this file.
11. **Sentence case everywhere** — titles, buttons, labels.
12. **Stop at the slice boundary.** Don't scaffold ahead.

## Honesty about what is simulated

A frontend-only demo shows a government register confirming a representative in
under two seconds, and revocation propagating instantly across a verifier.
People in the room will assume those are built. The shell carries a persistent
`prototype · data simulated` marker and the demo ships with a "what's real vs
simulated" page. Neither is optional decoration — do not remove them.

## Comment style

Comments in this codebase explain **why**, at length, and usually sit above the
thing they explain — including the alternatives that were tried and rejected.
Match that density. A comment restating what the line does is worse than none.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
