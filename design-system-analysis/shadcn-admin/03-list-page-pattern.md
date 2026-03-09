# Shadcn Admin — List Page Pattern

## 1. List Page Layout Structure
- Shell: AuthenticatedLayout → Header (fixed) → Main (content area).
- Inside Main: page header row (title/description + primary actions), followed by the list block.
- List block: DataTableToolbar → bordered Table container → DataTablePagination → optional DataTableBulkActions.

## 2. Page Header Pattern
- Placement: Immediately inside Main, above filters/table.
- Structure: Left-aligned title (h2) with muted description; right-aligned primary actions (e.g., UsersPrimaryButtons for add/invite/import).
- Spacing: Flex layout with gap and responsive wrapping; consistent margins (e.g., sm:gap-6) across list pages.

## 3. Toolbar / Filter Bar
- Component: DataTableToolbar with props table, searchPlaceholder, optional searchKey, and filters[].
- Search modes:
  - Global search (no searchKey) updates table.getState().globalFilter.
  - Per-column search (with searchKey) sets a specific column’s filter value (e.g., username).
- Faceted filters: DataTableFacetedFilter for array-based columns (status, role, priority) with reset button to clear all filters.
- View options: DataTableViewOptions exposes column visibility toggles.
- Responsiveness: On small screens, toolbar presence adds extra bottom margin to the table area for better clarity.

## 4. Table Structure
- Table engine: TanStack Table (useReactTable) with core/filter/sort/pagination/faceted row models.
- State: sorting, pagination, rowSelection, columnVisibility, columnFilters; optionally globalFilter.
- URL-synced state: useTableUrlState maps route search params to table state (page, pageSize, filters), with ensurePageInRange guard.
- Markup: Table → TableHeader → header groups/rows → TableHead; TableBody → TableRow → TableCell using flexRender for header/cell renderers.
- Styling: meta.className/meta.thClassName/meta.tdClassName applied per column; selected rows marked via data-state="selected".
- Actions: Row-level actions provided via a dedicated actions column/cell; bulk actions separated into their own component.

## 5. Pagination Pattern
- Component: DataTablePagination reads table state and renders size selector, page counts, numbered buttons, and first/prev/next/last controls.
- Accessibility: sr-only labels for navigation buttons; page numbers collapsed to ranges with ellipses via getPageNumbers.
- Responsiveness: Layout reflows between compact and wide (utility classes like @max-2xl/content and visibility toggles for page count labels).

## 6. Empty State Pattern
- In-table fallback: When no rows, render a single TableRow with one TableCell spanning all columns (colSpan=columns.length) and text “No results.”
- Bulk actions: Only visible/enabled when selection exists; otherwise hidden, reducing empty-state clutter.

## Composition Hierarchy
Page
→ PageHeader (title/description + primary actions)
→ FilterToolbar (search + faceted filters + view options)
→ Table (headers, rows, row actions, selection)
→ Pagination (page size, numbers, nav controls)

## Table Component Architecture
- Layout structure: A bordered container (`overflow-hidden rounded-md border`) wraps `Table`, which renders a semantic `<table>` with head/body/footer split into `TableHeader`, `TableBody`, and row primitives (`TableRow`, `TableHead`, `TableCell`).
- Header + row composition: Header groups support multi‑column spans (`colSpan`) and per‑column meta classnames for alignment. Rows render visible cells using `flexRender` against column definitions.
- Sorting pattern: Column headers use `DataTableColumnHeader` which renders a compact `DropdownMenu` for Asc/Desc sorting and column hiding; current sort state reflected via icon (Caret/ArrowUp/ArrowDown) and active styles.
- Filtering pattern: `DataTableToolbar` drives global or per‑column text filters and facet filters via `DataTableFacetedFilter`. Reset clears both column and global filters.
- Pagination: `DataTablePagination` coordinates page size, numbers (with ellipses via `getPageNumbers`), and first/prev/next/last controls. Page labels are responsive (some hidden at small widths) and controls are `sr-only` labeled.
- Row action menus: Feature tables (users/tasks) include a dedicated actions column with a row menu for per‑row operations; bulk selection exposes a floating `DataTableBulkActions` toolbar with keyboard navigation and live region announcements for accessibility.
- Responsive behavior: Tables set minimum widths where needed (`min-w-xl`), collapse layout affordances on small screens, and add margin bottom when toolbars are visible on mobile (`max-sm:has-[div[role="toolbar"]]:mb-16`).
