# Taxonomy — Page Composition Patterns

## 1. Page Structure Patterns
- App Router pages (`app/**/page.tsx`) are Server Components by default and focus on orchestration, not rendering details.
- Common structure inside pages:
  - Import feature and composed UI components (e.g., `DashboardShell`, `DashboardHeader`, `PostItem`, `Mdx`).
  - Perform server data fetching and gating first (e.g., `getCurrentUser`, `db.*`, `notFound`, `redirect`).
  - Compose shells and feature components, passing minimal, serializable props.
- Content-driven pages (Docs/Blog) pattern:
  - Use Contentlayer (`allDocs`, `allPosts`) + `generateStaticParams` for SSG and slugs.
  - Compute `generateMetadata` with dynamic OG images.
  - Render via `Mdx` mapping for consistent typography.
- Marketing pages pattern:
  - Structured sections inside a `container`; minimal server fetch (e.g., GitHub stars with `revalidate`).
  - Use design-system primitives for CTAs and cards.
- Dashboard pages pattern:
  - Server auth redirect; DB queries scoped to user; list/detail views inside `DashboardShell`.
- Editor page pattern:
  - Server validation (post belongs to user) + `notFound`; pass data to client `Editor` component.

## 2. Page vs Component Responsibilities
- Pages (Server):
  - Orchestrate data fetching and access control; choose which components to render.
  - Compute metadata; define static params for content pages.
  - Never contain client interactivity; delegate to client components via props.
- Components:
  - Composed UI: layout elements (headers, shells, nav) with no data fetching.
  - Feature components: interactive behavior (forms, menus, operations) using client APIs (`signIn`, `signOut`, `useToast`).
  - UI primitives: presentational only; reusable across the app.
- Hooks:
  - Non-visual behavior (e.g., `use-mounted`, `use-lock-body`), notifications (`useToast`), or component-scoped logic.
  - Page-specific business logic lives server-side, not in hooks.

## 3. Data Flow Patterns
- Server-first data:
  - Pages and section layouts call `getCurrentUser`/`getServerSession` and read from Prisma (`db.*`).
  - API routes under `app/api/*/route.ts[x]` handle mutations and enforce Zod validations with domain utilities (`lib/*`).
- Contentlayer data:
  - `allDocs`/`allPosts` feed Docs/Blog pages; `generateStaticParams` enumerates slugs; `Mdx` renders content.
- Prop flow:
  - Pages pass minimal props (e.g., `user`, `post`, `posts`) to client components; client components avoid importing server modules.
- Metadata and OG images:
  - Pages compute OpenGraph/Twitter metadata and call `/api/og` for dynamic social cards.

## 4. Layout Usage Inside Pages
- Wrapping order: RootLayout → RouteGroupLayout → Page (uses section shells like `DashboardShell`).
- Navigation elements live in RouteGroupLayouts (MainNav, DocsSidebarNav, DashboardNav); pages don’t duplicate nav.
- Page containers:
  - Use `container`, `max-w-*`, and responsive grid utilities (`grid`, `xl:grid-cols-[1fr_300px]`, `md:grid-cols-[200px_1fr]`).
  - Use shells (`DashboardShell`, `DashboardHeader`) for consistent spacing and action injection.

## 5. Best Practices Derived from the Project
- Keep pages thin, server-first, and declarative; delegate interactivity to client components.
- Avoid server imports in client components; pass data via props instead.
- Centralize nav and section scaffolding in route layouts; keep pages focused on content.
- Co-locate API handlers under `app/api` and validate with Zod; keep handlers thin by calling `lib/*`.
- Use Contentlayer for content and map MDX to styled components for consistent presentation.
- Use shells for page scaffolding and `children` slots for actions; don’t duplicate structure.

