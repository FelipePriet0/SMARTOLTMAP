# Taxonomy — Provider Patterns (Specification)

## 1. Provider Inventory
- ThemeProvider (context provider)
  - File: `components/theme-provider.tsx` (wraps `next-themes` ThemeProvider)
  - Purpose: theme class management via `attribute="class"`
  - Access: `useTheme` from `next-themes` in client components

- ToastProvider (context provider, mounted by Toaster)
  - Files: `components/ui/toast.tsx` (exports `ToastProvider`), `components/ui/toaster.tsx` (instantiates provider, renders queue/viewport)
  - Purpose: global toast queue and viewport; access via `components/ui/use-toast`

- TooltipProvider (context provider)
  - File: `components/ui/tooltip.tsx` (re-exports Radix `Provider`)
  - Purpose: configure tooltip delays/behavior for descendants

## 2. Global Mount Components
- Definition: components mounted once in the root layout that do not expose React context, but affect the app globally (analytics, indicators, portals).
- Inventory in this project:
  - Analytics — `components/analytics.tsx` (Vercel Analytics component). No context.
  - TailwindIndicator — `components/tailwind-indicator.tsx`. No context; dev aid.
- Note on Toaster: although mounted globally, it is not a pure “mount”; it internally creates a `ToastProvider` and thus is treated as a provider in this spec.

## 3. Provider Hierarchy
Root layout composition (as mounted in `app/layout.tsx`):

RootLayout
 └ ThemeProvider (global provider)
     ├ Application children (`{children}`)
     ├ Toaster (creates ToastProvider internally)
     ├ Analytics (global mount; no context)
     └ TailwindIndicator (global mount; no context)

Local UI provider usage (scoped where needed):

Page/Component
 └ TooltipProvider (local UI provider)
     └ Tooltip/Trigger/Content descendants

## 4. Provider Classification
- Global Provider
  - ThemeProvider: cross-cutting theme state; required app-wide for class-based theming.
  - ToastProvider (via Toaster): single global toast queue/viewport; must be unique.

- Section Provider
  - None present. Section state is handled by route group layouts and server-side gating, not by context providers.

- Feature Provider
  - None present. Feature flows (auth, posts, billing) use server data and local component state, not cross-feature context.

- Local UI Provider
  - TooltipProvider: UI-behavior configuration, scoped near consumers to minimize overhead.

Rationale: The repository favors server-side composition (RSC) and prop drilling of server-derived data over client context. Only UI-wide concerns (theme, toasts) are global.

## 5. Provider Composition Rules
- Mount only cross-cutting concerns in the root layout (ThemeProvider, Toaster).
- Do not place business state (auth, data models) in global providers; resolve on the server and pass props.
- Prefer server-side data/auth over client context; use `getCurrentUser`/`getServerSession` in layouts/pages.
- Scope UI-behavior providers (TooltipProvider) locally to the smallest subtree that needs them.
- Avoid stacking many global providers; keep the tree shallow for performance and clarity.
- Ensure exactly one Toaster (ToastProvider) instance exists at the app root.
- Mount providers inside Client Components only; do not attempt to create providers in Server Components.

## 6. When NOT to create a provider
- When state is server-derived or persisted: fetch in Server Components and pass to clients via props.
- When state is local UI-only: implement with a component-scoped hook (e.g., `useState`, `useMounted`, `useLockBody`).
- When one component (or its immediate children) can receive props instead of reading from context.
- When behavior comes from headless UI libs that already provide scoped primitives (Radix components without app-wide context).

## 7. Provider Decision Tree
- Is the state needed across distant, unrelated parts of the tree?
  - Yes → Consider a context provider (global or section)
  - No → Keep local or lift to nearest common parent
- Is the state UI-only and ephemeral (no persistence, no server dependency)?
  - Yes → Prefer a hook or a local UI provider (e.g., TooltipProvider)
  - No → Resolve on the server and pass props
- Must the state be available across routes?
  - Yes → Only if it is a cross-cutting UI concern (theme, toasts) → mount globally
  - No → Scope to feature or component
- Can an existing library/provider cover it?
  - Yes → Use that provider instead of inventing a new one

## 8. Summary
- Global providers: ThemeProvider and a single ToastProvider (via Toaster) live under RootLayout.
- Global mounts: Analytics and TailwindIndicator mount once but do not provide context.
- Local UI provider: TooltipProvider is scoped where tooltips are used.
- No section/feature business providers are present; server-side composition and props are preferred.

