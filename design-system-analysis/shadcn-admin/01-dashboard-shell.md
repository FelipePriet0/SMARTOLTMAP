# Shadcn Admin — Dashboard Shell

## 1. Dashboard Layout Structure
- Main layout: AuthenticatedLayout composes the frame with SearchProvider, LayoutProvider, and SidebarProvider, renders AppSidebar, and nests content inside SidebarInset (children or Outlet).
- Page scaffold: Pages place a Header (topbar) and a Main container for the page body; the root route mounts global toasts/devtools outside the shell.
- Responsibility split: Shell owns navigation and chrome; pages supply titles, tabs, filters, tables, and widgets.

## 2. Sidebar Architecture
- Provider/state: SidebarProvider manages open/collapsed state, persists to cookie sidebar_state, exposes toggleSidebar, and binds Cmd/Ctrl+B shortcut.
- Mobile behavior: Off‑canvas drawer via Sheet on small screens; SidebarTrigger toggles visibility.
- Variants and data attributes: Supports variant=sidebar|floating|inset, side=left|right, and collapsible=offcanvas|icon|none; styles driven by data attributes (e.g., data-state, data-collapsible).
- Composition: AppSidebar = SidebarHeader (TeamSwitcher) + SidebarContent (NavGroup built from sidebarData.navGroups) + SidebarFooter (NavUser) + SidebarRail (hit area for toggling).
- Data model: sidebarData defines teams, user, and nested nav groups/items (with icon/badge), enabling config‑driven navigation.
- Icon‑only mode: TooltipProvider scopes tooltips to collapsed (“icon”) mode for clarity without full labels.

## 3. Header/Topbar Structure
- Header component: Sticky (fixed flag) top bar with scroll‑aware shadow/backdrop; includes SidebarTrigger and Separator; accepts arbitrary children.
- Typical content: TopNav on the left (secondary links/tabs) and a right‑aligned actions cluster (Search, ThemeSwitch, ConfigDrawer, ProfileDropdown).
- Page header in Main: Below the topbar, pages render a row with title/description on the left and primary actions (e.g., Download/Add) on the right.

## 4. Dashboard Grid System
- KPI grid: grid gap-4 sm:grid-cols-2 lg:grid-cols-4 for metric cards (CardHeader with title/icon + CardContent with value/delta).
- Content grid: grid grid-cols-1 gap-4 lg:grid-cols-7 with a main chart area (col-span-4) and a complementary list rail (col-span-3).
- Section switching: Vertical Tabs (TabsList/TabsTrigger/TabsContent) to switch between “overview” and “analytics” widget sets.

## 5. Responsive Behavior
- Sidebar: Off‑canvas Sheet on mobile; collapsible on desktop with icon‑only mode (tooltips active when collapsed); keyboard toggling supported.
- Containers: Main constrains width via container queries (@7xl/content:max-w-7xl) unless fluid; SidebarInset marks @container/content to enable section‑scoped responsive styles and fixed‑layout height adjustments.
- Tables: Mobile adds extra bottom spacing when toolbars are present; header/row cells adapt via data-state classes for hover/selection.
- Header: In fixed mode, applies shadow and subtle backdrop after small scroll offset (offset > 10).

## 6. Layout Responsibilities
- Shell (AuthenticatedLayout + AppSidebar + Header/Main skeleton):
  - Owns persistent chrome (sidebar, rail, header structure) and navigation.
  - Manages sidebar state and device/variant behavior via SidebarProvider.
  - Provides layout/search context providers required by the frame.
- Pages (Dashboard, Users, Tasks, Settings):
  - Compose page header (title/actions) and content (tabs, KPIs, tables, widgets) within Main.
  - Orchestrate feature state (dialogs, table filters/pagination) and pass data to components.
- Data/config:
  - Navigation is config‑driven (sidebarData) and rendered by shell components.
  - Business/feature state remains in feature components/providers; shell stays structural and UI‑state–oriented only.

## Dashboard Content Composition
- Page scaffold: Dashboard page composes Header (TopNav + actions) and Main with a page header row (title/actions), followed by a vertical `Tabs` section (`overview`, `analytics`).
- KPI section: First row inside `overview` is a metric grid (`grid gap-4 sm:grid-cols-2 lg:grid-cols-4`) of Cards with concise titles, muted icons, large values, and small deltas.
- Content section: Second row is a split grid (`grid grid-cols-1 gap-4 lg:grid-cols-7`): a 4‑column chart card (Overview) and a 3‑column activity card (RecentSales with description).
- Rhythm and spacing: `space-y-4` within tab content; Cards use `py-6`, headers `pb-2`, and grid gaps unify visual rhythm across sections. TabsList sits in a horizontally scrollable bar for overflow safety.
- Variations: Alternate content lives under `analytics` tab, enabling multiple dashboard views under the same shell and preserving the metric+content rhythm.
