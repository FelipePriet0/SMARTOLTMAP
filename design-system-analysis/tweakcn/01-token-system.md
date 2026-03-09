tweakcn-analysis / 01-token-system.md

**Token Categories**
- **Colors:** background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring, chart-1..5, sidebar, sidebar-foreground, sidebar-primary, sidebar-primary-foreground, sidebar-accent, sidebar-accent-foreground, sidebar-border, sidebar-ring.
- **Radius:** radius (global corner radius; derived into sm/md/lg/xl in Tailwind).
- **Fonts:** font-sans, font-serif, font-mono.
- **Shadows:** shadow-color, shadow-opacity, shadow-blur, shadow-spread, shadow-offset-x, shadow-offset-y; derived tokens shadow-2xs, shadow-xs, shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl, shadow-2xl.
- **Typography Spacing:** letter-spacing (tracking), spacing (global spacing step).

**Token Naming Conventions**
- Kebab-case semantic names with foreground pairings: `primary` + `primary-foreground`, `card` + `card-foreground`, `popover` + `popover-foreground`, etc.
- Section-specific namespace for sidebar: `sidebar-*` (primary, accent, border, ring, foreground variants).
- Chart palette enumerated numerically: `chart-1` … `chart-5`.

**Token Hierarchy**
- **Base tokens:** Concrete color values per mode in theme presets and defaults (OKLCH, HEX). Defined in `tweakcn/config/theme.ts` for defaults and `tweakcn/utils/theme-presets.ts` for named presets.
- **Semantic tokens:** The CSS variables `--background`, `--foreground`, `--primary`, etc. generated per mode by `generateThemeVariables` in `tweakcn/utils/theme-style-generator.ts`.
- **Component scope tokens:** Sidebar-specific (`--sidebar-*`), surface tokens (`--card-*`, `--popover-*`), and chart tokens (`--chart-*`).
- **Derived tokens:** Tailwind-facing aliases (e.g., colors in `tailwind.config` mapping) and computed shadows via `getShadowMap` in `tweakcn/utils/shadows.ts`.

**Token Definition Locations**
- Defaults: `design-system-sources/tweakcn/config/theme.ts` (`defaultLightThemeStyles`, `defaultDarkThemeStyles`, `COMMON_STYLES`).
- Presets: `design-system-sources/tweakcn/utils/theme-presets.ts` (multiple named themes with light/dark dictionaries).
- Types: `design-system-sources/tweakcn/types/theme.ts` (schema enumerates all token keys and descriptions).

**Token Usage Pattern**
- CSS variables are emitted under `:root` (light) and `.dark` (dark) by `generateThemeVariables` and used via `var(--token)`.
- Tailwind mapping extends theme colors to `hsl(var(--token))`, enabling utilities like `bg-background`, `text-foreground`, `border-border`, `ring-ring`, and nested objects for `primary.foreground`, etc.
- Components consume semantic utilities (e.g., `bg-card text-card-foreground`, `bg-popover text-popover-foreground`, `text-muted-foreground`). Sidebar can use `bg-sidebar` and its related tokens.
- Non-color tokens map to Tailwind via `borderRadius` (derived from `--radius`) and `fontFamily` (from `--font-*`). Shadow classes can be overridden using generated `--shadow-*` variables.

**Token Architecture**
- **Primitive tokens:** Values defined in presets and defaults (OKLCH/HEX) for colors plus non-color primitives: `font-sans`, `font-serif`, `font-mono`, `radius`, raw shadow vars (`shadow-color`, `shadow-opacity`, `shadow-blur`, `shadow-spread`, `shadow-offset-x`, `shadow-offset-y`), `letter-spacing`, and `spacing`.
- **Semantic tokens:** Typed, named CSS variables exported per mode: background/foreground pairs, surface pairs (`card`, `popover`), actions (`primary`, `secondary`, `accent`, `destructive`), structure (`border`, `input`, `ring`), charts (`chart-1..5`). These are the main interface for Tailwind utilities.
- **Component tokens:** Contextual namespaces for specific UI regions: `sidebar*` system (surface/foreground/primary/accent/border/ring) and surface tokens (`card*`, `popover*`). Chart tokens are component-like but intended for data visualization.

**Token Resolution Flow**
- **CSS variables → Tailwind:** Colors mapped as `hsl(var(--token))` in Tailwind theme (or `@theme inline` aliases for v4). Radius and fonts mapped via `borderRadius` from `--radius` and `fontFamily` from `--font-*`. Shadows exposed as `--shadow-*` for optional class overrides.
- **Tailwind utilities → Components:** Components use utilities such as `bg-background`, `text-foreground`, `border-border`, `focus-visible:ring-ring`, `bg-card text-card-foreground`, `bg-popover text-popover-foreground`, and sidebar-specific colors. Utilities read the active mode’s variables (`:root` vs `.dark`).

**Token Governance Rules**
- **Prefer semantics:** Use semantic utilities (background/foreground, surface pairs, action pairs) instead of hardcoded colors or raw CSS variables in component styles.
- **Avoid direct colors:** Do not use HEX/OKLCH values in components. Add/adjust colors only via presets/defaults and schema-backed tokens.
- **Use structure tokens:** For borders/inputs/focus, use `border`, `input`, `ring` mappings; avoid ad-hoc grayscale values.
- **Scope component tokens:** Use `sidebar-*` only within sidebar context; use `card*`/`popover*` for surfaces instead of `background` when appropriate.
- **Reserve chart tokens:** `chart-1..5` are for data visualization palettes, not general UI chrome.
- **Schema first:** Any new token must be added to the typed schema and mapped through CSS variable generation and Tailwind extension to remain consistent.
