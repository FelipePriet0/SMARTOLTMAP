# Taxonomy — Layout Patterns

## 1. Layout Component Inventory
- App shell: `app/layout.tsx` (global providers, fonts, metadata, body classes).
- Section layouts:
  - Marketing: `app/(marketing)/layout.tsx` (header with `MainNav`, CTA, `SiteFooter`).
  - Docs: `app/(docs)/layout.tsx` (sticky header, `DocsSearch`, `DocsSidebarNav`, footer).
  - Dashboard: `app/(dashboard)/dashboard/layout.tsx` (auth gate, sticky header, sidebar grid, footer).
  - Editor: `app/(editor)/editor/layout.tsx` (minimal container grid for editor pages).
  - Auth: `app/(auth)/layout.tsx` (bare `min-h-screen` scaffold).
- Shells/containers (components):
  - `components/shell.tsx` (DashboardShell grid wrapper).
  - `components/header.tsx` (DashboardHeader with action slot).
  - Content wrappers: `components/page-header.tsx`, docs TOC container in pages.

## 2. Shell Architecture
- Application shell (global):
  - Mounts ThemeProvider, Toaster, Analytics, TailwindIndicator once.
  - Applies font variables and base body classes.
  - Provides metadata defaults and OpenGraph/Twitter fallbacks.
- Section shells (route-group layouts):
  - Own header/navigation and footer for the section.
  - Establish container width, padding, and grid templates (e.g., dashboard two‑column grid `md:grid-cols-[200px_1fr]`).
- Page shells:
  - `DashboardShell` standardizes internal spacing and grid for list/detail pages.
  - `DashboardHeader` exposes a slot for contextual actions (e.g., create button).

## 3. Page Layout Composition
- Page containers: use `container`, `max-w-*`, and responsive spacing classes to ensure readable line length.
- Header: lives in the section layout; page headers (titles/actions) live in `DashboardHeader` or `page-header`.
- Sidebar: rendered by section layout (dashboard) via `DashboardNav` and config‑driven items.
- Grid systems:
  - Dashboard: `grid flex-1 gap-12 md:grid-cols-[200px_1fr]` for sidebar + content.
  - Docs page: `xl:grid xl:grid-cols-[1fr_300px]` for content + sticky TOC.
- Content wrappers:
  - Docs: `DocsPageHeader`, `Mdx`, `DashboardTableOfContents` inside a container with sticky TOC.
  - Marketing: sectioned `<section>` blocks inside a `container` for hero/features.

## 4. Nested Layout Strategy
- Route groups isolate concerns without changing URL structure; each group has its own `layout.tsx`.
- Nested layouts wrap pages as: Global App Shell → Section Layout → Page Shell (optional) → Page Content.
- Navigation elements (top nav, sidebar) belong to section layouts to avoid duplication and enforce consistency.
- Page‑level state and interactivity live in client components within the page (e.g., buttons, menus), not in layouts.

## 5. Layout Responsibilities
- Global layout:
  - Provide theming, notifications, analytics, fonts, and metadata.
  - Do not include section‑specific navigation.
- Section layouts:
  - Own header/footer and any permanent sidebars for the section.
  - Define containers and grids; keep main content as `{children}`.
  - Perform server‑side gates when needed (e.g., dashboard `getCurrentUser`/`notFound`).
- Shell components:
  - Standardize spacing and structure (headers, grids) and accept slots for actions/content.
  - Avoid data fetching; receive props only.
- Navigation:
  - Derives from `config/*` and is rendered in layouts (`MainNav`, `DashboardNav`, `DocsSidebarNav`).
- Page‑level state:
  - Lives in page/client components (e.g., toggles, menus, forms) using hooks; layouts remain stateless and structural.

## 1. Layout Component Inventory
- Root layout: `app/layout.tsx`.
- Route group layouts: `app/(marketing)/layout.tsx`, `app/(docs)/layout.tsx`, `app/(dashboard)/dashboard/layout.tsx`, `app/(editor)/editor/layout.tsx`, `app/(auth)/layout.tsx`.
- Nested route layout: `app/(docs)/docs/layout.tsx`.
- Shell/structure components:
  - `components/shell.tsx` (DashboardShell)
  - `components/header.tsx` (DashboardHeader)
  - `components/page-header.tsx` (DocsPageHeader)
  - `components/site-footer.tsx` (SiteFooter)
  - `components/main-nav.tsx` (MainNav)
  - `components/nav.tsx` (DashboardNav)
  - `components/sidebar-nav.tsx` (DocsSidebarNav)
  - `components/mobile-nav.tsx` (MobileNav)
  - `components/toc.tsx` (DashboardTableOfContents)
  - `components/mdx-components.tsx` (MDX content wrapper)
  - `components/analytics.tsx`, `components/theme-provider.tsx`, `components/ui/toaster.tsx`, `components/tailwind-indicator.tsx` (app shell utilities)

## 2. Shell Hierarchy
- RootLayout → RouteGroupLayout → Section Shell → Page Content
  - RootLayout: global providers, fonts, metadata, base body classes.
  - RouteGroupLayout: section header/footer, persistent navigation (top/side), container/grid.
  - Section Shell: `DashboardShell` + `DashboardHeader` (or equivalent) standardize page scaffolds.
  - Page Content: feature components and MDX/content; page-specific UI.

## 3. Layout Responsibility Rules
- Global layout:
  - Theme/Toast/Analytics providers, fonts, global CSS, default metadata.
  - No section-specific nav or page data fetching.
- Route layout:
  - Section nav (MainNav, DocsSidebarNav, DashboardNav), footers, and persistent sidebars.
  - Define containers/grids; run section auth gating when required.
- Page shell:
  - Structural scaffolding (headers, spacing, grid) and action slots; no data fetching.
- Page:
  - Server data fetching, composition of feature components, and page-level client state via hooks.
