# Shadcn Admin — Navigation Patterns

## 1. Sidebar Navigation Structure
- Primary nav lives in AppSidebar and is composed from UI primitives in `ui/sidebar.tsx`: `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarRail`.
- Data-driven: `sidebarData` provides `user`, `teams`, and `navGroups` (each with `title` and `items`). AppSidebar maps `navGroups` to `NavGroup` components.
- Collapsible and mobile-aware: `SidebarProvider` controls desktop collapsed/icon mode and mobile off‑canvas mode.

## 2. Navigation Item Anatomy
- Base item (NavLink): `title`, `url`, optional `icon`, optional `badge`.
- Collapsible item (NavCollapsible): Base fields plus nested `items[]` (NavLink[]).
- Renderers:
  - `SidebarMenuButton` (`isActive`, `tooltip`, size/variant) wrapping a `Link`.
  - `SidebarMenuSubButton` for nested items.
  - `NavBadge` shows badge counts within items.

## 3. Active State Pattern
- Determination (`checkIsActive` in `nav-group.tsx`):
  - Exact match with `href` (including query) or path without query.
  - If a child item’s `url` equals current `href`, parent is considered active.
  - In `mainNav` mode, a first-path-segment match also activates the item (section-level highlighting).
- Application: `isActive` prop on `SidebarMenuButton`/`SidebarMenuSubButton` toggles active styles via data attributes.

## 4. Nested Navigation Pattern
- Expanded vs collapsed:
  - Desktop expanded: `Collapsible` with `CollapsibleTrigger` → `SidebarMenuSub` list of nested links; `ChevronRight` rotates on open.
  - Desktop collapsed: `SidebarMenuCollapsedDropdown` renders a `DropdownMenu` with nested links; preserves access without expanding the rail.
- Default open: Parent groups open by default if any child is active (`defaultOpen=checkIsActive(..., true)`).
- Mobile: Entire sidebar becomes a `Sheet`; clicking a `Link` closes mobile nav (`setOpenMobile(false)`).

## 5. Icon Usage
- Icons are optional per item and rendered before the label when provided (`item.icon && <item.icon />`).
- Icon‑only mode: When collapsed to icon, labels are hidden and a `TooltipProvider` supplies tooltips for `SidebarMenuButton`.
- Data source: Icons assigned in `sidebarData`, mixing Lucide icons and custom logos (e.g., `ClerkLogo`).

## 6. Navigation Accessibility Rules
- Keyboard and shortcuts: Sidebar supports Cmd/Ctrl+B to toggle; `SidebarRail` exposes a generous click target for toggling.
- Skip link: `SkipToMain` provides a focusable anchor to jump to `#content`.
- Focus/ARIA: shadcn/ui + Radix primitives (dropdown, collapsible, tooltip) handle ARIA roles, labels, and keyboard interaction.
- Mobile semantics: `SheetHeader`, `SheetTitle`, and `SheetDescription` label the off‑canvas navigation for assistive tech.

## Sidebar Implementation Details
- Layout and container: Sidebar primitives (`ui/sidebar.tsx`) define a wrapper with CSS vars (`--sidebar-width`, `--sidebar-width-icon`) and data attributes (`data-state`, `data-collapsible`, `data-variant`, `data-side`) to drive layout transitions. The desktop gap and fixed container are rendered separately to control width transitions smoothly.
- Item composition: Items render inside `SidebarMenu` as `SidebarMenuItem` → `SidebarMenuButton` (or `SidebarMenuSubButton` for nested). Buttons accept `isActive`, `variant` and `size` and are styled via a CVA config (`sidebarMenuButtonVariants`) to ensure consistent padding, height, truncation, and icon sizing.
- Icon usage: Icons precede labels; sizes normalize via `[&>svg]:size-4 [&>svg]:shrink-0`. In icon‑only mode (`data-collapsible=icon`), labels collapse and tooltips (via `TooltipProvider`) supply text on hover/focus.
- Collapsible/nested: Expanded desktops use `Collapsible` with a rotating `ChevronRight` to show `SidebarMenuSub`. Collapsed desktops use a `DropdownMenu` anchored to the parent item to list children without expanding the rail. Mobile uses `Sheet` with the same structure.
- Active state styling: `isActive` toggles `data-[active=true]` on buttons which promotes background, foreground, and font weight. Parents open by default if any child is active. Row/state classes also respond to `group/` and `[data-state=open]` selectors for smooth affordances.
- Spacing/alignment: Consistent 8px paddings (`p-2`) and controlled heights (`h-8`/size variants). Text truncation via `[&>span:last-child]:truncate`; rails expose a 4px hit target (`SidebarRail`) aligned to the sidebar edge for quick toggling.
