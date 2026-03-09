origin-ui-analysis / 01-layout-blocks.md

**Page Container**
- **Structure:** `SidebarProvider` → `AppSidebar` → `SidebarInset` → `header` toolbar → main content.
- **Responsibilities:** Provides global frame, persistent navigation rail, and a content area with page padding.
- **Typical usage:** Seen in experiment pages where `SidebarInset` wraps the page header (breadcrumb, actions) and the primary content (stats, tables, charts).

**Header Toolbar**
- **Structure:** Left: `SidebarTrigger` + `Breadcrumb` + optional `Separator`; Right: contextual actions (dialogs, user menu, settings).
- **Responsibilities:** Page-level navigation context and quick actions; separates from content with `border-b` or gradient rule.
- **Typical usage:** Sticky or static header at top of `SidebarInset`.

**Sidebar Layout**
- **Structure:** `Sidebar` → `SidebarHeader` (team switcher, search) → `SidebarContent` (groups, menus) → `SidebarFooter` (account/action) → `SidebarRail`.
- **Responsibilities:** Primary navigation with collapsible/offcanvas modes; supports sections via `SidebarGroup`, labels, and menus with buttons/items.
- **Typical usage:** Left rail navigation with grouped links and a search input; collapses to icon mode on desktop and becomes offcanvas on mobile.

**Content Grid**
- **Structure:** Grid wrapper defining columns; item blocks inside (stats, charts).
- **Responsibilities:** Arrange data blocks responsively; use borders/pseudo elements to suggest column separation.
- **Typical usage:**
  - Stats grid: `grid grid-cols-2 min-[1200px]:grid-cols-4` with bordered, rounded container; each cell is a stat block.
  - Charts grid: `grid auto-rows-min @2xl:grid-cols-2 *:-ms-px *:-mt-px -m-px` to create seamless grid lines.

**Two-Column Layout**
- **Structure:** `flex flex-col md:flex-row gap-6` with main panel and a complementary sidebar panel.
- **Responsibilities:** Split page into primary content (e.g., chart) and secondary navigation or info (e.g., links sidebar).
- **Typical usage:** Chart + links panel composition in experiment-05.

**Stack Layout**
- **Structure:** Vertical stacks with `flex flex-col` and `gap-*` or `space-y-*`.
- **Responsibilities:** Provide readable vertical rhythm for headings, summaries, and bodies.
- **Typical usage:** Page intros (`space-y-1`), settings groups (`space-y-3`), message lists (`space-y-6`).

**Table Layout Block**
- **Structure:** Filter toolbar (inline controls) → `Table` with `TableHeader`/`TableBody` → Pagination bar.
- **Responsibilities:** Data browsing and manipulation with column filtering, selection, and row actions.
- **Typical usage:** Contacts table with inline filters, badges, and popovers; pagination aligned to the right.

**Composition Notes**
- Blocks compose by nesting: Page Container encloses Header Toolbar and one or more Content Grids or Stacks; Sidebar Layout is orthogonal and persistent; Two-Column Layout sits inside the Page Container when needed.

