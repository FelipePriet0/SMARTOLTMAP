origin-ui-analysis / 04-content-grouping.md

**Section Grouping**
- **Pattern:** Sections begin with a small uppercase label and are separated by a 1px gradient rule (before pseudo-element) spanning the container.
- **Usage:** Settings panel groups (e.g., “Chat presets”, “Configurations”) and chat/header boundaries.
- **Visual hierarchy:** Label (muted, xs) → grouped controls; rules create clear segmentation without heavy dividers.

**Card Grouping**
- **Pattern:** Card header/body/footer slots establish intra-card grouping; optional header/foot borders reinforce separation.
- **Usage:** Chart cards where header controls are distinct from the chart body.
- **Visual hierarchy:** Title/description first, actions aligned to the opposite side; content follows with consistent padding.

**List/Table Grouping**
- **Pattern:** Toolbar → table header → rows → pagination; hover states and rounded first/last row corners create a cohesive list block.
- **Usage:** Contacts table with filters and row actions.
- **Visual hierarchy:** Muted meta text in cells; badges and icons encode status within rows.

**Header + Body Grouping**
- **Pattern:** Page header separated by `border-b` or gradient bottom rule; body contains stacks or grids.
- **Usage:** Pages with breadcrumb/action bars preceding content grids.
- **Visual hierarchy:** Navigation context at top; content blocks below with their own grouping (cards, grids).

**Toolbar Grouping**
- **Pattern:** Right-aligned action clusters with icon buttons and compact spacing; appears in page headers and input toolbars.
- **Usage:** Header action clusters, chat input toolbar, table actions.
- **Visual hierarchy:** Primary actions use solid buttons; secondary/tertiary are ghost/outline with muted icons.

