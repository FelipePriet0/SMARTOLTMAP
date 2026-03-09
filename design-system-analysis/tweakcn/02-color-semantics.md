tweakcn-analysis / 02-color-semantics.md

**Semantic Palette**
- **background:** App canvas/surfaces; paired with `foreground` for body text. Used via `bg-background`.
- **foreground:** Primary text color on `background`. Used via `text-foreground`.
- **card / card-foreground:** Container surface and its text (cards, panels). Used via `bg-card text-card-foreground`.
- **popover / popover-foreground:** Floating surfaces (tooltips/menus/popovers) and text. Used via `bg-popover text-popover-foreground`.
- **primary / primary-foreground:** Brand/action color and inverse text for filled actions. Used in buttons, switches, focus accents.
- **secondary / secondary-foreground:** Secondary fills and contrasting text; subtle emphasis and alternate buttons.
- **accent / accent-foreground:** Hover states, highlights, subtle accents across UI.
- **muted / muted-foreground:** Subdued surfaces and low-emphasis text (placeholders, descriptions). Seen in `text-muted-foreground` utilities.
- **destructive / destructive-foreground:** Error/destructive actions and their contrasting text (alerts, danger buttons).
- **border:** Standard border color (component boundaries, separators). Consumed by `border-border` and `@apply border-border` in base layer.
- **input:** Input surface/border baseline (e.g., `border-input bg-transparent`).
- **ring:** Focus ring color; used via `focus-visible:ring-ring` and `ring-offset-background` combos.

**Section-Specific Semantics**
- **sidebar:** Sidebar surface and its system: `sidebar`, `sidebar-foreground`, `sidebar-primary` (+ `-foreground`), `sidebar-accent` (+ `-foreground`), `sidebar-border`, `sidebar-ring`.
- **chart-1..5:** Categorical palette for data viz; five slots used by charts.

**Where They’re Used**
- Global base styles: `@layer base` applies `border-border` to `*` and `bg-background text-foreground` to `body` (generator and taxonomy examples).
- Components: Buttons (`primary`, `secondary`, `destructive`, `outline` with `border-border`), Cards/Popovers (`bg-card`, `bg-popover`), Inputs (`border-input`), Tabs/Badges (`muted`, `accent`).
- Focus states: `focus-visible:ring-ring`, with `ring-offset-background` ensuring proper contrast.
- Sidebar patterns: Navs/rails can use `bg-sidebar`, `text-sidebar-foreground`, accents and primary variants for emphasis.

**Status Tokens**
- Not present: No explicit `success`, `warning`, or `info` tokens in the schemas or presets. Status styling typically leverages `primary`, `destructive`, `muted`, or custom component-level choices.

