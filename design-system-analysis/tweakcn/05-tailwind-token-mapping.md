tweakcn-analysis / 05-tailwind-token-mapping.md

**Tailwind Config Mapping**
- **Dark mode:** `darkMode: ["class"]`.
- **Color tokens → CSS vars:** Colors extend to `hsl(var(--token))` for semantic aliases:
  - `border: hsl(var(--border))`, `input: hsl(var(--input))`, `ring: hsl(var(--ring))`.
  - `background: hsl(var(--background))`, `foreground: hsl(var(--foreground))`.
  - `primary.DEFAULT: hsl(var(--primary))`, `primary.foreground: hsl(var(--primary-foreground))`.
  - Same structure for `secondary`, `muted`, `accent`, `destructive`.
  - `popover.DEFAULT/foreground`, `card.DEFAULT/foreground` map to their `--popover*`/`--card*` vars.
  - `sidebar` nested colors: `DEFAULT`, `foreground`, `primary`, `primary-foreground`, `accent`, `accent-foreground`, `border`, `ring`.
  - Chart palette: `chart.1..5` -> `hsl(var(--chart-n))`.

**Utility Class Patterns**
- Background/text: `bg-background`, `text-foreground`, `bg-card`, `text-card-foreground`, `bg-popover`, `text-popover-foreground`.
- Emphasis: `bg-primary text-primary-foreground`, `bg-secondary text-secondary-foreground`, `bg-accent text-accent-foreground`.
- Muted/description: `text-muted-foreground`, `bg-muted`.
- Structure: `border-border`, `focus-visible:ring-ring`, `ring-offset-background`, `border-input`.
- Sidebar: `bg-sidebar`, `text-sidebar-foreground`; color usage for `sidebar.primary`, `sidebar.accent`, borders, and rings available through nested color mappings.
- Charts: Utilities like `text-chart-1` or custom CSS using `theme('colors.chart.1')` for data viz.

**Non-Color Tokens in Tailwind**
- **Radius:** Derived via `borderRadius`: `sm/md/lg/xl` compute from `--radius` (`calc(var(--radius) ± offset)`). Components inherit consistent rounding.
- **Fonts:** `fontFamily` maps `sans/serif/mono` to `var(--font-*)`, enabling theme-driven typography.
- **Shadows:** Generator produces `--shadow-*` variables; shadow class overrides can be emitted at runtime (see live preview tooling), though Tailwind’s built-ins aren’t directly remapped by default.

**Inline Theme (Tailwind v4)**
- When generating v4 styles, `@theme inline` defines `--color-*` aliases that point to core CSS vars (e.g., `--color-background: var(--background)`), preserving the same utility naming while adopting v4 conventions.

