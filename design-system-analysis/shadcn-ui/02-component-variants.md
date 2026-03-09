# shadcn/ui v4 — Component Variant System

**Source**: `design-system-sources/ui/apps/v4/registry/new-york-v4/ui/`

---

## Architecture

| Pattern | Implementation |
|---|---|
| Variant engine | `cva` (class-variance-authority `^0.7.1`) |
| Class utility | `cn()` = `clsx ^2.1.1` + `tailwind-merge ^3.0.1` |
| Total `cva` definitions | 14 across 54 files |
| Components with CVA | 9 components (some files define multiple cva blocks) |
| Components without CVA | 35 components (fixed styles or `data-*` props) |

---

## Components WITH CVA — Full Variant Tables

### Button (`button.tsx`)

**Base classes**: `inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none`

| Dimension | Value | Classes |
|---|---|---|
| **variant** | `default` | `bg-primary text-primary-foreground hover:bg-primary/90` |
| | `destructive` | `bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20` |
| | `outline` | `border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground` |
| | `secondary` | `bg-secondary text-secondary-foreground hover:bg-secondary/80` |
| | `ghost` | `hover:bg-accent hover:text-accent-foreground` |
| | `link` | `text-primary underline-offset-4 hover:underline` |
| **size** | `default` | `h-9 px-4 py-2 has-[>svg]:px-3` |
| | `xs` | `h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5` |
| | `sm` | `h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5` |
| | `lg` | `h-10 rounded-md px-6 has-[>svg]:px-4` |
| | `icon` | `size-9` |
| | `icon-xs` | `size-6 rounded-md` |
| | `icon-sm` | `size-8` |
| | `icon-lg` | `size-10` |

**Default variants**: `variant="default"`, `size="default"`
**Special props**: `asChild?: boolean`
**Exported**: `Button`, `buttonVariants`

---

### Badge (`badge.tsx`)

**Base classes**: `inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap`

| Dimension | Value | Classes |
|---|---|---|
| **variant** | `default` | `bg-primary text-primary-foreground [a&]:hover:bg-primary/90` |
| | `secondary` | `bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90` |
| | `destructive` | `bg-destructive text-white [a&]:hover:bg-destructive/90` |
| | `outline` | `border-border text-foreground [a&]:hover:bg-accent` |
| | `ghost` | `[a&]:hover:bg-accent [a&]:hover:text-accent-foreground` |
| | `link` | `text-primary underline-offset-4 [a&]:hover:underline` |

**Default variants**: `variant="default"`
**Special props**: `asChild?: boolean`
**Exported**: `Badge`, `badgeVariants`
**Note**: `[a&]` selector — hover styles only apply when Badge renders as `<a>`

---

### Alert (`alert.tsx`)

**Base classes**: `relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3`

| Dimension | Value | Classes |
|---|---|---|
| **variant** | `default` | `bg-card text-card-foreground` |
| | `destructive` | `bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90` |

**Default variants**: `variant="default"`
**Accessibility**: `role="alert"` — live region

---

### Toggle (`toggle.tsx`)

**Base classes**: `inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none`

| Dimension | Value | Classes |
|---|---|---|
| **variant** | `default` | `bg-transparent` |
| | `outline` | `border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground` |
| **size** | `default` | `h-9 min-w-9 px-2` |
| | `sm` | `h-8 min-w-8 px-1.5` |
| | `lg` | `h-10 min-w-10 px-2.5` |

**Default variants**: `variant="default"`, `size="default"`
**Exported**: `Toggle`, `toggleVariants`
**Consumed by**: `ToggleGroup` via React context

---

### TabsList (`tabs.tsx`)

**Base classes**: `group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground`

| Dimension | Value | Classes |
|---|---|---|
| **variant** | `default` | `bg-muted` |
| | `line` | `gap-1 bg-transparent` |

**Default variants**: `variant="default"`
**Special props**: `orientation` on `Tabs` root: `horizontal | vertical`
**Note**: Orientation is set on the parent `<Tabs>` root and propagated via `group-data-[orientation=*]` selectors

---

### Item (`item.tsx`) — Two cva blocks

**`itemVariants` base**: `group/item flex flex-wrap items-center rounded-md border border-transparent text-sm transition-colors`

| Dimension | Value | Classes |
|---|---|---|
| **variant** | `default` | `bg-transparent` |
| | `outline` | `border-border` |
| | `muted` | `bg-muted/50` |
| **size** | `default` | `gap-4 p-4` |
| | `sm` | `gap-2.5 px-4 py-3` |

**`itemMediaVariants` base**: `flex shrink-0 items-center justify-center gap-2`

| Dimension | Value | Classes |
|---|---|---|
| **variant** | `default` | `bg-transparent` |
| | `icon` | `size-8 rounded-sm border bg-muted` |
| | `image` | `size-10 overflow-hidden rounded-sm` |

**Special props**: `asChild?: boolean`

---

### EmptyMedia (`empty.tsx`)

**`emptyMediaVariants` base**: `mb-2 flex shrink-0 items-center justify-center`

| Dimension | Value | Classes |
|---|---|---|
| **variant** | `default` | `bg-transparent` |
| | `icon` | `flex size-10 rounded-lg bg-muted text-foreground` |

---

### Field (`field.tsx`)

**`fieldVariants` base**: `group/field flex w-full gap-3 data-[invalid=true]:text-destructive`

| Dimension | Value | Classes |
|---|---|---|
| **orientation** | `vertical` | `flex-col [&>*]:w-full [&>.sr-only]:w-auto` |
| | `horizontal` | `flex-row items-center [&>[data-slot=field-label]]:flex-auto` |
| | `responsive` | `flex-col @md/field-group:flex-row` (container-query based) |

**Note**: Uses cva with **array values** for multi-class orientation variants

---

### ButtonGroup (`button-group.tsx`)

| Dimension | Value | Classes |
|---|---|---|
| **orientation** | `horizontal` | `[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none` |
| | `vertical` | `flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0` |

---

### InputGroupAddon + InputGroupButton (`input-group.tsx`) — Two cva blocks

**`inputGroupAddonVariants`**:

| Dimension | Value | Classes |
|---|---|---|
| **align** | `inline-start` | `order-first pl-3 has-[>button]:ml-[-0.45rem]` |
| | `inline-end` | `order-last pr-3 has-[>button]:mr-[-0.45rem]` |
| | `block-start` | `order-first w-full justify-start px-3 pt-3` |
| | `block-end` | `order-last w-full justify-start px-3 pb-3` |

**`inputGroupButtonVariants`**:

| Dimension | Value | Classes |
|---|---|---|
| **size** | `xs` | `h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2` |
| | `sm` | `h-8 gap-1.5 rounded-md px-2.5` |
| | `icon-xs` | `size-6 rounded-[calc(var(--radius)-5px)] p-0` |
| | `icon-sm` | `size-8 p-0` |

---

### SidebarMenuButton (`sidebar.tsx`)

**Base classes**: `peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm`

| Dimension | Value | Classes |
|---|---|---|
| **variant** | `default` | `hover:bg-sidebar-accent hover:text-sidebar-accent-foreground` |
| | `outline` | `bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))]` |
| **size** | `default` | `h-8 text-sm` |
| | `sm` | `h-7 text-xs` |
| | `lg` | `h-12 text-sm group-data-[collapsible=icon]:p-0!` |

**Special props**: `isActive?: boolean`, `tooltip?: string | TooltipContentProps`

---

### NavigationMenuTrigger (`navigation-menu.tsx`)

**Note**: Uses `cva` with no variant dimensions — pure base string as a reusable style function.

```ts
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md ... focus:bg-accent ..."
)
// Called as: navigationMenuTriggerStyle() — no args
```

---

## Components WITHOUT CVA

### Props-only configuration (no cva, uses `data-size` or inline conditionals)

| Component | Configurable Props | Notes |
|---|---|---|
| **Switch** | `size: sm \| default` | `data-size` attr drives Tailwind selectors |
| **Avatar** | `size: sm \| default \| lg` | `data-size` attr on root |
| **SelectTrigger** | `size: sm \| default` | `data-size` attr |
| **NativeSelect** | `size: sm \| default` | `data-size` attr |
| **Sheet** | `side: top \| right \| bottom \| left` | Inline conditional class strings |

### Fixed styles (no variant system)

| Component | Notes |
|---|---|
| Input, Textarea | Single fixed style with state selectors |
| Label | Radix primitive, fixed style |
| Checkbox, RadioGroup | Radix, states via `data-[state=*]` |
| Slider, Progress | Radix range components |
| Separator | Orientation only via Radix |
| Skeleton, Spinner, Kbd | Single-purpose display components |
| Card and sub-components | Layout only |
| Table and sub-components | Semantic HTML, no variants |
| Tooltip, Popover, HoverCard | Radix compounds, fixed popover styles |
| Dialog, AlertDialog, Drawer | Radix modal compounds |
| Accordion, Collapsible | Radix disclosure compounds |
| DropdownMenu, ContextMenu, Menubar | Radix menu compounds |
| NavigationMenu, Breadcrumb, Pagination | Navigation compounds |
| Command, Combobox | Search/select compounds |
| ScrollArea, Resizable, Carousel | Layout/interaction compounds |
| Form | react-hook-form integration |
| Chart | Recharts wrapper |
| Sonner | Toast lib passthrough |

---

## Cross-Component Variant Reuse

| Exported from | Imported by | How used |
|---|---|---|
| `button.tsx` → `buttonVariants` | `pagination.tsx` | `PaginationLink` renders as `<a>` using `buttonVariants({ variant: isActive ? "outline" : "ghost" })` |
| `button.tsx` → `buttonVariants` | `calendar.tsx` | Day cells styled as buttons without mounting `<Button>` |
| `toggle.tsx` → `toggleVariants` | `toggle-group.tsx` | `ToggleGroupItem` inherits variant logic via React context |
| `button.tsx` → `Button` | `dialog.tsx` | `DialogFooter` optional close button |
| `button.tsx` → `Button` | `input-group.tsx` | `InputGroupButton` wrapper component |
| `button.tsx` → `Button` | `combobox.tsx` | Combobox trigger button |
| `label.tsx` → `Label` | `field.tsx` | `FieldLabel` composes over `Label` |
| `separator.tsx` → `Separator` | `field.tsx`, `button-group.tsx`, `item.tsx` | Shared divider primitive |

---

## Summary

| Category | Count |
|---|---|
| Components with full CVA variant system | 9 |
| Components with size-only prop (no cva) | 5 |
| Components with no variants at all | 35 |
| Total `cva()` definitions | 14 |
| Total variant dimensions defined | 21 |

**Rule**: CVA is used exclusively on interactive/actionable components. Structural, overlay, and Radix-wrapped components rely on `data-*` state attributes and fixed Tailwind classes.
