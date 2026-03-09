origin-ui-analysis / 03-form-patterns.md

**Single-Column Forms**
- **Structure:** Label above or inline with a control; stacked groups within a vertical container.
- **Grouping:** Content groups start with a small uppercase heading and are separated by a thin gradient rule.
- **Spacing:** Group `space-y-3` for controls; outer groups `py-5`.

**Inline Field Rows**
- **Structure:** `flex items-center justify-between` with left-aligned `Label` and right-aligned compact control (`SelectTrigger h-7 py-1 px-2`).
- **Label + Description:** Labels are plain-weight; additional context is conveyed via group headings rather than per-field descriptions.
- **Usage:** Preference/settings panels where controls fit on a single row.

**Textarea Input Block**
- **Structure:** Contained input area with rounded container, subtle border, and toolbar of icon buttons beneath.
- **Spacing:** Content padding `px-4 py-3` inside the container; toolbar `p-3` with small gap between buttons.
- **Usage:** Chat prompt input with attach/mic/action and submit controls.

**Grouped Fields**
- **Structure:** Section heading (xs uppercase, muted) → set of inline rows (selects/sliders) → next section separated by a top rule.
- **Usage:** Settings side panel with sliders for numeric ranges and selects for modes/types.

**Validation & Errors**
- Not explicitly surfaced in examples; no dedicated error placement patterns observed in the provided components.

**Spacing Between Fields**
- `space-y-3` within groups; small controls keep row height minimal (`h-7`). Larger inputs (textarea) use increased internal padding and follow the group spacing.

**Field Anatomy**
- **Label:** Uses the Label component; typically left-aligned in inline rows or stacked above in single-column blocks.
- **Control:** Selects, sliders, inputs, or textarea; compact sizing for settings (`h-7`), expanded for rich input (chat textarea).
- **Helper text:** Not commonly shown per-field; context is provided via section headings above groups.
- **Error message:** Not explicitly present in the examples; no canonical placement observed.

**Form Layout Types**
| Pattern | Structure | Typical usage |
| --- | --- | --- |
| Single column forms | Stacked Label → Control within vertical stacks | Generic forms, simple data entry |
| Inline field rows | Row with Label left, compact Control right | Settings/preferences panels |
| Grouped settings | Section label (xs uppercase) → multiple inline rows → separator | Categorized preferences with sliders/selects |
| Rich input blocks | Container with large textarea + toolbar of actions | Chat/prompt entry areas |

**Form Validation Patterns**
- No explicit validation UI was found in the provided sources. Error messages, error colors, and input invalid states are not demonstrated in these examples.
- Inputs commonly use structural tokens (`border-input`, `ring-ring`, `ring-offset-background`) for focus/affordance; an error state pattern is not shown.
