# Shadcn Admin — Detail Page Pattern

## 1. Detail Page Layout
- Page detail (settings): Header (fixed) + Main (fixed) + two‑pane layout — sticky aside (SidebarNav) and scrollable content (Outlet). Each sub‑page wraps its form in ContentSection with a section title, description, separator, and scrollable body.
- Modal detail (inline CRUD): On list pages (e.g., Users), row actions and primary buttons open Dialog-based detail forms without routing.

## 2. Header Structure
- Page detail: Shell Header includes SidebarTrigger, then Search on the left; right cluster holds ThemeSwitch, ConfigDrawer, ProfileDropdown. Below Header, an H1 and description introduce the settings area.
- Modal detail: DialogHeader contains DialogTitle and DialogDescription summarizing the operation (Add/Edit/Delete).

## 3. Metadata Display
- Page detail: ContentSection shows a section title (h3) with a muted description, separated from the form by a Separator; help text appears via FormDescription per field.
- Modal detail: Field groups use FormLabel/FormDescription/FormMessage; users dialog aligns label/value with a 6‑column grid (label col-span-2, control col-span-4) for readable scanning.

## 4. Action Buttons
- Page detail: Primary action (e.g., “Update profile”) at the end of the form; secondary actions (e.g., “Add URL”) inline near their sections.
- Modal detail: DialogFooter hosts primary/secondary actions (Save/Cancel); list row actions trigger dialogs via a dedicated actions cell.

## 5. Section Grouping
- Settings sidebar: SidebarNav lists Profile, Account, Appearance, Notifications, Display (with icons), acting as section anchors.
- Section body: ContentSection groups related fields with spacing and separators; repeated items (URLs) managed with field arrays and an “Add” button.
- Visual scaffolding: Dividers, headings, and constrained widths (e.g., lg:max-w-xl) keep detail views focused and scannable.

## 6. Responsive Behavior
- Layout: Aside becomes sticky on large screens; on small screens, content stacks and scrolls vertically within the section container.
- Dialogs: Constrained width (sm:max-w-lg); internal scroll regions prevent viewport overflow; form grid maintains readability on mobile.
- Forms: Labels can become sr-only for repeated fields; inputs grow to full width.

Explanation of visual structure
- Hierarchy: Header → H1/description → (aside | content) → section title/description → form groups.
- Rhythm: Consistent space-y/my/px utilities and separators establish a clear vertical flow.
- Affordance: Clear primary actions and icon+labeled navigation aid recognition and speed.
