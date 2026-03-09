# Shadcn Admin — Widget Patterns

## 1. Metric Card Pattern
- Composition: `Card` → `CardHeader` (small title + muted Lucide icon) → `CardContent` (large numeric value + muted delta text).
- Spacing: Header uses flex, justify-between, `space-y-0`, `pb-2`; value `text-2xl font-bold`; delta `text-xs text-muted-foreground`.
- Hierarchy: Title (secondary), Icon (decorative/muted), Value (primary), Delta (supporting context).
- Placement: Top KPI grid `grid gap-4 sm:grid-cols-2 lg:grid-cols-4`.

## 2. Chart Widget Pattern
- Overview chart: `Card` with `CardHeader` (title) and `CardContent` containing `Overview` (Recharts `BarChart` in `ResponsiveContainer` width=100%, height=350).
- Axis/Bar styling: Subtle ticks (`stroke="#888888"`, no tickLine/axisLine), bars use `currentColor` with `fill-primary` class and rounded tops.
- Rhythm: Extra left padding on content (`ps-2`) aligns chart elements with card gutters; title provides context.

## 3. Activity Feed Pattern
- RecentSales: Vertical list rows with `Avatar` + identity block (name/email) + right-aligned amount.
- Layout: Row `flex items-center gap-4`; inner `flex-1 flex-wrap justify-between` aligns amount flush right.
- Spacing/hierarchy: `space-y-8` between items; name `text-sm font-medium`; email muted; amount `font-medium`.
- Container: Typically within a `Card` with header (title/description) and `CardContent` list.

## 4. Widget Grid Layout
- KPI row: `grid gap-4 sm:grid-cols-2 lg:grid-cols-4` for metrics.
- Content row: `grid grid-cols-1 gap-4 lg:grid-cols-7` with main chart `col-span-4` and activity `col-span-3`.
- Section switching: Vertical `Tabs` (`TabsList`/`TabsTrigger`/`TabsContent`) toggle between “overview” and “analytics” widget sets.

## 5. Widget Interaction Patterns
- Tabs: Switch between widget groups; some tabs (reports/notifications) disabled until implemented.
- Hover emphasis: Icons/links use muted defaults and intensify on hover via typography utilities; cards provide consistent hit areas.
- Responsiveness: Grids collapse to one column on small screens; charts remain responsive via `ResponsiveContainer`; lists wrap content appropriately.

Explanation: spacing, hierarchy, compositions
- Spacing: `gap-4` across grids; `pb-2` in headers; consistent card paddings produce even rhythm across the dashboard.
- Visual hierarchy: Cards frame widgets; titles small/secondary, values prominent; muted descriptions avoid competing for attention; icons subtle.
- Typical compositions: KPI grid on top → content grid below (chart + activity rail); alternate widget sets behind Tabs.

## Card Anatomy
- Container: `Card` is a flex column with rounded corners, border, `bg-card`, `py-6`, and `shadow-sm`, establishing consistent padding and elevation.
- Header: `CardHeader` uses a two‑row grid with optional two‑column layout when `CardAction` is present (`grid-rows-[auto_auto]` + `grid-cols-[1fr_auto]`); it applies `px-6` and `pb-6` when a border follows.
- Title/Description: `CardTitle` (`font-semibold`, tight leading) and `CardDescription` (`text-sm text-muted-foreground`) define hierarchy.
- Action: `CardAction` positions controls in the second column, first row (`row-start-1 col-start-2`), aligned to the top‑right.
- Content/Footer: `CardContent` applies `px-6`; `CardFooter` is a flex row with `px-6` and `pt-6` when bordered. This consistent padding grid ensures widgets align across the dashboard.
