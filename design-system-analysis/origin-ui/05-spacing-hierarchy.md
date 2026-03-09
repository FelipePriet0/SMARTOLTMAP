origin-ui-analysis / 05-spacing-hierarchy.md

**Page Spacing**
- **Outer padding:** `px-4 md:px-6 lg:px-8` on `SidebarInset` or inner wrappers; keeps consistent gutters.
- **Header height:** `h-16` or `min-h-20` with `py-4/5`; separated by `border-b` or a gradient rule.

**Section Spacing**
- **Stacks:** `gap-4 lg:gap-6` between major blocks (intro, metrics, table/grid).
- **Section blocks:** `py-5` per settings group; headings have `mb-4` gap to contents.

**Component Spacing**
- **Cards:** `py-6` vertical padding, `px-6` for header/content/footer; optional extra `mb-6` between header and content.
- **Stats cells:** `p-4 lg:p-5` per metric; inner elements use small gaps (`gap-4`).
- **Tables:** Compact row height controlled via `h-px` and cell padding; outer container uses standard gaps around pagination.

**Inline Spacing**
- **Forms:** Compact controls (`h-7`, `py-1 px-2`) with `gap-2` between label and control or among buttons.
- **Toolbars:** `gap-1`–`gap-2` for icon clusters; buttons sized to 32px (`size-8`) in chat input.

**Scale Indicators**
- Common scale units: 4px step approximations via Tailwind (`gap-1/2/3/4/6`, `px-4/6/8`, `py-4/5/6`), with responsive adjustments at `md`, `lg`, and container queries (e.g., `@2xl`).

**Spacing Hierarchy**
| Level | Typical spacing |
| --- | --- |
| Page gutter | `px-4` → `px-8` |
| Section spacing | `gap-4` → `gap-6` |
| Component padding | `p-4` → `p-6` |
| Inline spacing | `gap-1` → `gap-2` |
