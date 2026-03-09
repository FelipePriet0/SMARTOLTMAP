origin-ui-analysis / 02-card-patterns.md

**Card Composition**
- **Structure:** `Card` → (`CardHeader` with `CardTitle`, `CardDescription`, optional `CardAction`) → `CardContent` → `CardFooter`.
- **Responsibilities:** Provide a surface (`bg-card`, `border`, `rounded-xl`) with consistent padding (`py-6`, `px-6`) and typography hierarchy.
- **Typical usage:** Wrapping complex visualizations (e.g., charts) or dense content with header controls.

**Metric Cards (Stats)**
- **Structure:** Stat cell with icon, title (uppercase microcopy), value, and delta indicator; arranged in a bordered grid container.
- **Content hierarchy:** Title (muted, small) → Value (prominent) → Delta (colored by trend) → Optional affordance icon on hover.
- **Actions:** Entire stat cell may be clickable; hover affordances indicate interactivity.
- **Visual grouping:** Each cell separated by vertical pseudo-rule inside a single container; rounded container groups all metrics.

**Data Visualization Cards**
- **Structure:** Card with header (context: symbols, range, selectors) + content (chart area).
- **Content hierarchy:** Primary identity (symbol/ticker) → secondary metadata (range, pct change) → controls (selectors) → chart canvas.
- **Actions:** Header-level selectors (coin/period); no per-row actions inside canvas.
- **Visual grouping:** Elevated (`shadow-2xl` in example), with transparent or subtle borders; rounded corners emphasize containment.

**Action Cards**
- **Structure:** Card header includes `CardAction` slot for primary/secondary buttons aligned opposite to title/description.
- **Content hierarchy:** Title → description → aligned actions.
- **Visual grouping:** Header may include a bottom border to separate from body when actions are present.

**Notes**
- Media-specific or content-rich cards follow the same skeleton; variations come from header contents and control placement rather than structure changes.

