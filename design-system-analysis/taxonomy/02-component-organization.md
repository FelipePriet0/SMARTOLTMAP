# Taxonomy — Component Organization

## 1. Component Categories
- Primitive components (reusable UI primitives; `components/ui/*`)
  - Examples: `button.tsx`, `input.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, `sheet.tsx`, `toast.tsx`, `toaster.tsx`, `use-toast.ts`, `accordion.tsx`, `tabs.tsx`, `tooltip.tsx`, `card.tsx`, `select.tsx`.
  - Traits: accessible, presentational, minimal logic, app-agnostic, single file per primitive.

- Composed UI components (cross-section composition of primitives)
  - Examples: `main-nav.tsx`, `mobile-nav.tsx`, `icons.tsx`, `mdx-components.tsx`, `mdx-card.tsx`, `callout.tsx`, `site-footer.tsx`, `page-header.tsx`, `pager.tsx`, `toc.tsx` (dashboard TOC view).
  - Traits: build UI patterns from primitives; no domain rules; configurable via props.

- Feature components (application-specific behavior or domain wiring)
  - Examples: `editor.tsx`, `billing-form.tsx`, `post-create-button.tsx`, `post-item.tsx`, `post-operations.tsx`, `user-account-nav.tsx`, `user-auth-form.tsx`, `user-avatar.tsx`, `user-name-form.tsx`, `search.tsx` (DocsSearch), `empty-placeholder.tsx`.
  - Traits: tie UI to domain flows, call actions, reflect auth/session, or use server-provided props.

- Layout components (containers/shells and section scaffolds)
  - Examples in components/: `shell.tsx` (DashboardShell), `header.tsx` (DashboardHeader).
  - Section scaffolds primarily live in App Router layouts under `app/(...)/layout.tsx`.

## 2. Reusability Levels
- System-wide reusable primitives: `components/ui/*` (design-system level). Stable APIs, theme-token driven, no app logic.
- Cross-section composed UI: navigation, footers, MDX renderers. Reusable across marketing/docs/dashboard with config-provided data.
- Section-scoped feature components: dashboard, docs, auth, editor pieces; reusable within their section; may depend on domain utilities.
- Containers/shells: generic page scaffolds (e.g., DashboardShell/Header) reused across multiple pages within a section.

## 3. Composition Hierarchy
- Pages (Server) → Section Layouts (Server) → Shells/Headers (Client/Server) → Composed UI (Client) → Primitives (Client)
  - Pages/layouts fetch data/auth on server; pass minimal props to client components.
  - Navigation/sidebars rendered from config; content (MDX) rendered via `mdx-components` mapping to primitives.
  - Feature actions (create/edit) injected via header/action slots; lists composed of small item components.

Rules of thumb:
- Primitives never import feature components.
- Composed UI may import primitives and small utilities, not domain logic.
- Feature components can import primitives, composed UI, and call client APIs; server data comes via props.
- Shells/headers compose primitives/composed UI and expose slots for actions.

## 4. Naming Conventions
- Files: kebab-case filenames mapping to PascalCase exports, one component per file (e.g., `post-item.tsx` → `PostItem`).
- Domain prefixing for clarity: `DashboardHeader`, `DashboardShell`, `UserAccountNav`, `PostItem`.
- Primitives live under `components/ui/*` and export singular components/hooks (`use-toast`).
- Client-only components start with `"use client"` pragma; hooks are `use*` and colocated when specific.

## 5. Import Patterns Between Components
- Allowed flow:
  - `components/ui/*` → imported by any higher layer.
  - `components/*` (composed) → import from `components/ui/*` and `lib/utils` only.
  - Feature components → import from `components/ui/*`, composed UI, `hooks/*`, and receive server data as props; avoid importing server modules directly.
  - Layout shells → import primitives/composed UI and accept `children` for extensibility.
- Avoided:
  - Primitives importing app/config or feature logic.
  - Feature components importing server-only modules (`lib/db`, `lib/auth`) directly; those stay in server files.
  - Cross-section imports that create coupling (e.g., dashboard components inside marketing pages).

Placement rules (observed and recommended):
- Belongs in `/components/ui` when: it’s a styling-first, app-agnostic primitive with a stable API and no domain coupling.
- Belongs in `/components` (layout-like) when: it’s a shell/container/header/footer used across pages to enforce structure.
- Belongs in `/components` (feature) when: it binds UI to a domain flow (auth, posts, billing, editor) and may call client auth/actions.
- Logic in hooks instead of components when: behavior is non-visual (mount state, scroll lock, keyboard handling), shared across components, or adds side effects decoupled from rendering (e.g., `use-mounted`, `use-lock-body`).

