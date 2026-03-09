# 1. Design System Philosophy

- Simplicity: Prefer minimal, predictable styles and small building blocks. Avoid bespoke one-off styling; express intent through semantic tokens and utilities.
- Composability: Compose pages from primitives (shadcn) and reusable layout blocks (OriginUI patterns). Favor slots and container components over monoliths.
- Accessibility: Build on Radix UI semantics; preserve focus-visible rings; ensure keyboard reachability and ARIA labeling across interactive elements.
- Performance: Use CSS variables + Tailwind mapping for constant-time theming. Avoid layout-thrashing animations; reserve motion for clarity.
- Motion restraint: Bias toward short, subtle transitions that clarify state and hierarchy. Reserve more visible effects for progress or emphasis.
- Consistency: Centralize color, radius, fonts, shadows, and motion timings via tokens. Enforce shared patterns for headers, sections, lists, and cards.

Intended UX and visual language: high-contrast, readable surfaces with clear surface pairs (background/foreground, card/popover), semantic action colors, subtle elevation via shadows, and restrained motion (opacity/translate/scale). Interactions feel instant with crisp focus states; larger changes use brief, composed transitions.


# 2. System Architecture

Project structure (Taxonomy-derived):
- app/: Route segments, layouts, page-level data fetching, route-group loading states.
- components/: Feature-agnostic composition (blocks) and wrappers around primitives; no business logic.
- ui/: Shadcn primitives (Button, Dialog, DropdownMenu, etc.). These are the source of truth for UI atoms.
- features/: Vertical slices (e.g., dashboard, users). Compose ui/ + components/ + data hooks.
- layouts/: Page shells and layout containers (sidebar, headers, grid scaffolding).
- providers/: Cross-cutting runtime providers (theme, sidebar, search, query clients).
- lib/: Utilities (cn, data hooks, helpers), constants, algorithms, schemas.
- styles/: Global CSS, Tailwind directives, theme variables injection.

Layer rules:
- Shared vs feature: ui/ is shared and immutable; components/ are shared blocks; features/ may include local, feature-only components. Do not duplicate ui/ primitives inside features/.
- Data flow: app/ fetches and passes data down; features/ orchestrate; components/ render; ui/ display.
- Theming: styles/ defines CSS variables; providers/ apply mode and fonts; Tailwind resolves utilities at render time.


# 3. Design Tokens

Source: tweakcn token system and Tailwind mapping.

Token categories:
- Colors: background, foreground, primary, secondary, accent, muted, destructive, border, input, ring, card/popover pairs, sidebar system, chart-1..5.
- Typography: font-sans, font-serif, font-mono, letter-spacing (tracking).
- Radius: radius (global), derived sm/md/lg/xl.
- Shadow: shadow-color/opacity/blur/spread/offset-x/offset-y; derived shadows (shadow-2xs..2xl).
- Spacing: spacing (global step for rhythm).
- Motion: timing expressed at component level; prefer 300ms hover/press transitions, 0.4s entrances (see Motion System).
- Z-index: No explicit tokens in sources; use semantic layer constants per component (header, overlays, tooltips) managed in CSS where relevant.

Semantic color naming (light/dark):
- primary, secondary, accent, muted, destructive: each with "-foreground" companion.
- background/foreground: base text on canvas.
- card/card-foreground, popover/popover-foreground: surface pairs.
- border, input, ring: structural colors.
- sidebar system: sidebar, sidebar-foreground, sidebar-primary (+-foreground), sidebar-accent (+-foreground), sidebar-border, sidebar-ring.

Tailwind token mapping:
- Colors: `hsl(var(--token))` mapped to `theme.extend.colors` (Taxonomy config). Utilities: `bg-background`, `text-foreground`, `border-border`, `ring-ring`, `bg-card`, `text-popover-foreground`, etc. Chart colors available as `chart.1..5` when configured.
- Radius: `--radius` → `borderRadius.{sm,md,lg,xl}` via calc offsets.
- Fonts: `--font-sans`, `--font-serif`, `--font-mono` → `fontFamily` entries.

Theme structure and switching:
- CSS variables emitted into `:root` (light) and `.dark` (dark). Tailwind `darkMode: ['class']` toggles mode.
- Common tokens (fonts, radius, raw shadow vars, tracking, spacing) applied once; color tokens overridden per mode.
- Derived shadows computed per mode (getShadowMap) into `--shadow-*` variables for consistent elevation.


# 4. Component Library

Base primitives (shadcn):
- Button, Input, Textarea, Select, Checkbox, Switch
- Dialog, Drawer/Sheet, Popover, Tooltip, DropdownMenu
- Tabs, Separator, Badge, Card, Table, Pagination
- Toast, Progress, Avatar, Breadcrumb, Label, Skeleton

Usage rules:
- Variant system: Use class-variance-authority (CVA) for variants/sizes/states; expose `data-*` where useful for composition.
- `cn()` utility: Compose Tailwind classes and variant outputs; prefer deterministic class merging.
- Composition: Primitives expose slots (`*Header`, `*Content`, `*Footer`) and align to semantic tokens. Wrap primitives in components/ only to add composition or feature logic, not to reimplement atoms.
- Immutable atoms: ui/ primitives must NEVER be recreated or forked in features/. Extend via props, composition, or light wrappers.


# 5. UI Blocks

OriginUI-derived reusable blocks:
- PageHeader: Breadcrumb + title + action cluster. Separators (`border-b` or subtle gradient rule). Sticky variants allowed.
- ContentSection: Labeled content group with xs uppercase heading; separated by thin gradient or border; `py-5` sections.
- FormSection: Single-column or inline row groups (Label left, compact control right). Use `space-y-3` within groups.
- MetricCard: Grid cell with icon, microcopy title, prominent value, and delta; grouped inside a bordered, rounded container.
- ListContainer: Toolbar (filters/actions) → Table (header/body) → Pagination. Maintain rounded first/last rows and subtle hover.
- Toolbar / FilterBar: Right-aligned action clusters with icon buttons; compact gaps (`gap-1..2`); filters inline above lists.

Spacing and hierarchy:
- Page gutters: `px-4 → px-8` with responsive steps.
- Section gaps: `gap-4 → gap-6`; section `py-5`.
- Components: Cards `py-6 px-6`; stats cells `p-4 lg:p-5`.
- Inline: Controls at `h-7`, `py-1 px-2`; icon clusters `gap-1..2`.


# 6. Dashboard Patterns

Shadcn Admin patterns:
- Sidebar layout: `SidebarProvider` + `AppSidebar` + `SidebarInset`. Collapsible (offcanvas/icon) with mobile sheet behavior. Content container uses container queries.
- Page headers: `Header` with scroll-responsive shadow/backdrop blur; left: `SidebarTrigger` + breadcrumb; right: search/theme/profile/config.
- List pages: Top Bar (filters/actions), `Table` with selection, sorting, pagination; URL state for table where applicable.
- Detail pages: Card-based content blocks; Tabs for sections; right rail optional.
- Metrics/widgets: Grid of `Card` tiles for KPIs; larger analytical cards with charts; recent activity list-card.
- Navigation: Top nav links + persistent sidebar groups; use `SidebarGroup` with labels, content, and `SidebarMenuButton` states.

Layout containers:
- Main/content wrapper manages vertical rhythm and overflow; headers sticky when fixed; grids use responsive columns (e.g., 1/2/4 columns by breakpoint).


# 7. Motion System

MagicUI-derived motion language:
- Motion primitives: opacity, translate (small offsets), scale (micro), background/gradient motion, value interpolation (stroke-dasharray, number spring).
- Interaction feedback:
  - Hover glow (Magic Card): pointer-tracked radial gradient; overlay fades in 300ms.
  - Label swap (Interactive Hover Button): 300ms translation/opacity; dot micro-scale.
  - Press ripple (Ripple Button): ~600ms ease-out circle from tap point.
  - Proximity magnification (Dock): spring-based icon scale (mass 0.1, k 150, damping 12).
  - Subscribe toggle: brief fade/slide between states.
- Loading patterns:
  - Determinate: Animated Circular Progress Bar (1s arc transitions; step 200ms).
  - Content reveal: Blur Fade (0.4s ease-out; optional delay) when content becomes available.
  - Affordances: Scroll Progress bar for reading; Progressive Blur for scrollable edges.

Timing standards:
- hover ≤ 300ms
- entrance ≤ 400ms
- press ≤ 150ms (press feedback must feel immediate; longer visualizations like ripple may continue independently)
- ambient loops ≥ 1.5s (pulsating/shimmer/shiny accents)

Allowed motion types:
- Opacity/transform transitions, small scale/translate, gradient/background shifts, determinate progress stroke animations, spring interpolation for proximity/value.


# 8. Disallowed Effects

Prohibited motion and layout animation (to protect clarity and performance):
- Motion types: 3D flips, aggressive parallax, elastic/bouncy entrances, large overshoot, disruptive attention-grabbing loops.
- Layout animation: Do not animate width/height/top/left or grid/flex reflows; avoid sibling-jumping reorders. Prefer transform and opacity.
- Long interactions: Keep hover/press below system limits; avoid lengthy, non-essential motion.

Rationale: Layout animations trigger reflow and jank; heavy 3D or bouncy effects reduce legibility and cognitive comfort; consistent, subtle motion improves perceived performance.


# 9. Accessibility Rules

Shadcn accessibility expectations:
- ARIA: Pass through roles/aria-* props from primitives; label controls with `Label` and `aria-*` as needed; ensure dialogs/menus have proper roles and labelledby.
- Keyboard navigation: All interactive elements must be reachable via Tab/Shift+Tab; Enter/Space to activate; Esc to dismiss overlays; Arrow keys for menu/list navigation (Radix handles much of this).
- Focus rings: Always visible on focus-visible; use ring token (`ring-ring` with `ring-offset-background`). Never remove focus outlines.
- Semantic HTML: Prefer native elements (button, input) via primitives; ensure headings and landmarks (header/main/nav) structure pages.
- Contrast: Use semantic tokens to maintain contrast in both light and dark modes; avoid hardcoded colors.


# 10. Implementation Rules

- Do not recreate ui/ primitives. Extend via variants, props, or composition in components/.
- Always use tokens (CSS variables via Tailwind utilities). No hardcoded colors or radii.
- Prefer composition: build blocks (PageHeader, ContentSection, ListContainer) from primitives rather than bespoke component trees.
- Prefer transform/opacity animations; avoid animating layout properties.
- Maintain motion timing standards (hover ≤ 300ms, entrance ≤ 400ms, press ≤ 150ms, ambient ≥ 1.5s). Choose easing (ease-out/springs) consistent with Motion System.
- Theming: Toggle dark mode via `class='dark'`; define tokens under `:root` and `.dark`; keep sidebar/chart tokens in sync.
- Spacing: Apply spacing hierarchy (page gutters, section spacing, component padding, inline gaps) for consistent rhythm.
- Testing & a11y: Verify keyboard paths and focus management whenever composing new blocks or adding motion.

