tweakcn-analysis / 04-dark-mode-system.md

**Dark Mode Trigger**
- **Class strategy:** Tailwind configured with `darkMode: ["class"]`. Runtime toggles `document.documentElement.classList.add("dark")` for dark, removes for light (`utils/apply-theme.ts`).
- **Initial mode:** `ThemeScript` selects mode from persisted editor state or `window.matchMedia('(prefers-color-scheme: dark)')`.

**Token Overrides**
- All semantic color tokens have light/dark values: background/foreground, surface pairs (card/popover), action pairs (primary/secondary/accent/destructive), structure (border, input, ring), charts, and sidebar system.
- Non-color “common” tokens are effectively shared (defined once on light and reused): `font-sans`, `font-serif`, `font-mono`, `radius`, `shadow-* raw vars`, `letter-spacing`, `spacing` (see `COMMON_STYLES` in `config/theme.ts`).
- Computed shadow tokens (`--shadow-*`) are generated per mode based on raw shadow vars via `getShadowMap`, ensuring mode-specific elevation appearance.

**Component Adaptation**
- Components reference semantic utilities (e.g., `bg-background`, `text-foreground`, `border-border`, `focus-visible:ring-ring`). When the `dark` class is present, Tailwind resolves these to `.dark` variables automatically.
- Sidebar components can use dedicated tokens (`bg-sidebar`, `text-sidebar-foreground`, `ring-[hsl(var(--sidebar-ring))]` via mapped color), aligning its ecosystem with the app-wide theme.

**Behavioral Notes**
- Applying a theme uses `applyThemeToElement` to set mode, write common vars (from light), apply mode-specific colors, and set shadow CSS variables.
- Fonts are loaded dynamically for the active theme selection (`ThemeScript`) and mapped to CSS vars used by Tailwind font families.

