tweakcn-analysis / 03-theme-structure.md

**Theme Definition Method**
- **CSS variables:** Tokens emitted as `--background`, `--primary`, etc., under `:root` for light and `.dark` for dark (see `generateThemeVariables` in `utils/theme-style-generator.ts`).
- **Tailwind theme extension:** Colors extended as `hsl(var(--token))` in generated Tailwind v3 config; also supports Tailwind v4 via `@theme inline` mapping (same tokens).
- **Preset data:** Named themes define light/dark token dictionaries in `utils/theme-presets.ts`. Defaults in `config/theme.ts` (OKLCH base values and COMMON_STYLES).

**Theme Layers**
- **Root tokens:** Base CSS variables for semantic colors, fonts, radius, tracking, spacing, shadows. Dark mode writes overrides in `.dark` block.
- **Semantic tokens:** Background/foreground pairs, surface pairs (card/popover), action pairs (primary/secondary/accent/destructive), structure (`border`, `input`, `ring`), charts, sidebar system.
- **Component styles:** Components reference semantic utilities (e.g., `bg-card`, `text-muted-foreground`, `border-input`), not raw colors; sidebar uses its namespaced tokens.

**Theme Switching Mechanism**
- **Trigger:** Uses `class="dark"` strategy (Tailwind `darkMode: ["class"]`). `applyThemeToElement` toggles `dark` on root; `ThemeScript` selects mode using localStorage or `prefers-color-scheme`.
- **Propagation:** When the `dark` class toggles, the `.dark` variable set becomes active; components immediately resolve tokens via Tailwind utilities to the new values.
- **State management:** `defaultThemeState` seeds `currentMode`; `editor-store` persists theme state and manages undo/redo without polluting history on mere mode flips.

**Architecture Summary**
- Source of truth is a typed theme schema enumerating all tokens. Presets/Defaults provide values; generator emits CSS variables + Tailwind mappings; runtime utilities apply mode and variables to `documentElement`. Components consume tokens via Tailwind utilities, ensuring full theming without hardcoded colors.

**Theme Resolution Pipeline**
- Theme class (`.dark`): Mode is toggled on `documentElement` (class strategy).
- CSS variable overrides: `.dark` scope overrides light `:root` variables with dark values for all semantic tokens and derived shadow vars.
- Tailwind utilities: Utilities (e.g., `bg-background`, `text-foreground`, `border-border`, `focus-visible:ring-ring`) read current CSS variables.
- Component styles: Components reference only utilities; when mode flips, utilities resolve to updated variables without component changes.

**Theme Responsibilities**
- Tokens: Defined by schema and supplied by defaults/presets; emitted as CSS variables per mode (including fonts, radius, shadows, tracking, spacing).
- Utilities: Tailwind theme maps semantic tokens to utility namespaces (colors, radius, fonts). It does not own values—only indirection and composition.
- Components: Consume utilities exclusively (surfaces, text, borders, rings, sidebar system, charts). No direct color values or raw CSS variables in component styles.

**Theme Extensibility**
- Add themes: Create a new preset in `utils/theme-presets.ts` with `light` and `dark` dictionaries. The helper merges missing fields with defaults, preserving completeness.
- Brand variants: Tune `primary`, `accent`, `secondary`, and sidebar tokens; adjust fonts and radius to reflect brand voice.
- High contrast: Increase contrast in `background/foreground`, strengthen `border`, `input`, and `ring`, and refine `muted-foreground` for readability.
- Data viz palettes: Customize `chart-1..5` for thematic charts without affecting UI chrome.
- Safety: Keep within the typed schema; variables will be generated and mapped automatically, preserving dark-mode behavior and Tailwind utility coverage.
