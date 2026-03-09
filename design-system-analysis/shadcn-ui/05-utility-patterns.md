# shadcn/ui v4 — Utility & Class Logic Patterns

**Source**: `design-system-sources/ui/apps/v4/registry/new-york-v4/lib/utils.ts`

---

## 1. `cn()` — The Core Utility

**File**: `lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### What each layer does

| Layer | Package | Version | Role |
|---|---|---|---|
| `clsx` | `clsx` | `^2.1.1` | Accepts strings, arrays, objects, conditionals — flattens into one string |
| `twMerge` | `tailwind-merge` | `^3.0.1` | Deduplicates conflicting Tailwind classes — last value wins (e.g., `p-4 p-2` → `p-2`) |
| `cn` | local | — | Single composable entrypoint used by every component |

### Usage count by component (top 10)

| Component | `cn()` calls |
|---|---|
| `calendar.tsx` | 30 |
| `sidebar.tsx` | 25 |
| `combobox.tsx` | 13 |
| `menubar.tsx` | 11 |
| `item.tsx` | 10 |
| `field.tsx` | 10 |
| `navigation-menu.tsx` | 9 |
| `dropdown-menu.tsx` | 9 |
| `context-menu.tsx` | 9 |
| `alert-dialog.tsx` | 9 |

---

## 2. `cva()` — Variant Engine

**Package**: `class-variance-authority ^0.7.1`

### Anatomy of a `cva` call

```ts
const buttonVariants = cva(
  // ① BASE — always applied, regardless of variant
  "inline-flex items-center ...",
  {
    variants: {
      // ② VARIANT DIMENSIONS — mutually exclusive per dimension
      variant: { default: "...", destructive: "...", outline: "..." },
      size:    { default: "...", sm: "...", lg: "..." },
    },
    defaultVariants: {
      // ③ DEFAULTS — used when prop is omitted
      variant: "default",
      size: "default",
    },
  }
)
```

### All 14 `cva` definitions in the registry

| Variable | File | Dimensions |
|---|---|---|
| `buttonVariants` | `button.tsx` | `variant` × `size` |
| `badgeVariants` | `badge.tsx` | `variant` |
| `alertVariants` | `alert.tsx` | `variant` |
| `toggleVariants` | `toggle.tsx` | `variant` × `size` |
| `tabsListVariants` | `tabs.tsx` | `variant` |
| `itemVariants` | `item.tsx` | `variant` × `size` |
| `itemMediaVariants` | `item.tsx` | `variant` |
| `emptyMediaVariants` | `empty.tsx` | `variant` |
| `fieldVariants` | `field.tsx` | `orientation` |
| `buttonGroupVariants` | `button-group.tsx` | `orientation` |
| `inputGroupAddonVariants` | `input-group.tsx` | `align` |
| `inputGroupButtonVariants` | `input-group.tsx` | `size` |
| `sidebarMenuButtonVariants` | `sidebar.tsx` | `variant` × `size` |
| `navigationMenuTriggerStyle` | `navigation-menu.tsx` | *(no dimensions — bare base string only)* |

---

## 3. Class Merging Patterns

### Pattern A — `className` passed inside `cva()` call

`cva` itself handles the merge. `cn()` runs a final `twMerge` pass on the result.

```ts
// button.tsx, toggle.tsx, item.tsx, empty.tsx
className={cn(buttonVariants({ variant, size, className }))}
```

`className` enters `cva` → merged with variant classes → `cn()` deduplicates.

### Pattern B — `className` passed outside as second arg to `cn()`

`cva()` resolves variants first, then `cn()` merges with the consumer's `className`. Consumer's `className` always wins via `twMerge` last-wins rule.

```ts
// alert.tsx, badge.tsx, tabs.tsx, sidebar.tsx, field.tsx
className={cn(alertVariants({ variant }), className)}
```

### Pattern C — Multi-string `cn()` (semantic grouping)

Strings split by concern — no cva. Used in components with fixed styles but complex state logic.

```ts
// input.tsx
className={cn(
  "h-9 w-full min-w-0 rounded-md border border-input bg-transparent ...",  // base layout
  "focus-visible:border-ring focus-visible:ring-[3px] ...",                 // focus state
  "aria-invalid:border-destructive ...",                                     // error state
  className                                                                  // consumer override
)}
```

### Pattern D — `cn()` with runtime conditional

Props evaluated at render time, not at `cva` definition time.

```ts
// select.tsx — JS boolean inside cn()
className={cn(
  "relative z-50 ...",
  position === "popper" && "data-[side=bottom]:translate-y-1 ...",
  className
)}

// pagination.tsx — ternary inside cva call
className={cn(
  buttonVariants({
    variant: isActive ? "outline" : "ghost",
    size,
  }),
  className
)}
```

---

## 4. Advanced Tailwind Techniques in `cva` Bases

Rather than JavaScript logic, shadcn encodes state, context, and parent-child relationships directly into Tailwind class strings.

### `data-*` attribute selectors — component state

```
data-[state=checked]:bg-primary       ← Radix state (Checkbox)
data-[state=active]:bg-background     ← Tabs active tab
data-[state=open]:animate-in          ← Dialog open animation
data-[side=bottom]:slide-in-from-top  ← Popover/Select position
data-[placeholder]:text-muted         ← Select placeholder text
data-[active=true]:font-medium        ← Sidebar active item
```

### `group-data-*` — parent state propagates to child styling

```
group-data-[orientation=horizontal]/tabs:h-9    ← TabsList height based on Tabs orientation
group-data-[variant=default]/tabs-list:shadow   ← TabsTrigger shadow based on TabsList variant
group-data-[collapsible=icon]/sidebar:size-8    ← Sidebar icon mode collapses menu button
```

### `has-[>*]` — parent reacts to its children via CSS `:has()`

```
has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr]  ← Alert with icon changes grid layout
has-[>svg]:px-3                                     ← Button with icon adjusts padding
has-[>[data-slot=field-content]]:items-start        ← Field layout changes with content slot
has-[[data-slot][aria-invalid=true]]:border-destructive ← InputGroup reacts to child error
```

### `[&_*]` — arbitrary descendant selectors

```
[&_svg]:pointer-events-none                   ← All SVGs inside button
[&_svg:not([class*='size-'])]:size-4          ← SVGs without explicit size get default
[&>span:last-child]:truncate                  ← Last span in sidebar button truncates text
```

### `*:data-[slot=*]` — parent targets specific named slots

```
*:data-[slot=alert-description]:text-destructive/90  ← Alert targets its description slot
*:data-[slot=select-value]:line-clamp-1              ← SelectTrigger targets value slot
```

### `[a&]` — context-aware selector (Badge)

```
[a&]:hover:bg-primary/90   ← Hover only applies when Badge renders as <a>
```

Allows the same variant class to be inert on `<span>` and interactive on `<a>`.

### `aria-[*]` — style driven by ARIA state

```
aria-[orientation=vertical]:flex-col               ← ResizablePanelGroup direction
aria-[orientation=horizontal]:h-px                 ← ResizableHandle shape
aria-invalid:border-destructive                    ← Error border on form inputs
aria-disabled:pointer-events-none                  ← Sidebar disabled menu items
aria-selected:text-muted-foreground                ← Calendar selected day text
```

### Array syntax in `cva` values — multi-class grouping

Arrays in `cva` variant values are joined. Used for readability when a variant needs many classes.

```ts
// field.tsx
orientation: {
  horizontal: [
    "flex-row items-center",
    "[&>[data-slot=field-label]]:flex-auto",
    "has-[>[data-slot=field-content]]:items-start ...",
  ],
  responsive: [
    "flex-col @md/field-group:flex-row @md/field-group:items-center ...",
    "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
    "...",
  ],
}
```

---

## 5. Cross-Component Variant Reuse

`cva` functions are exported and imported by other components — variant logic is shared, not duplicated.

| Exported from | Imported by | Usage |
|---|---|---|
| `button.tsx` → `buttonVariants` | `pagination.tsx` | `PaginationLink` renders as `<a>` using `buttonVariants({ variant: isActive ? "outline" : "ghost" })` |
| `button.tsx` → `buttonVariants` | `calendar.tsx` | Day cells styled as buttons without mounting `<Button>` component |
| `toggle.tsx` → `toggleVariants` | `toggle-group.tsx` | `ToggleGroupItem` shares identical variant logic via React context |
| `button.tsx` → `Button` | `dialog.tsx` | `DialogFooter` optional close button |
| `button.tsx` → `Button` | `input-group.tsx` | `InputGroupButton` wrapper |
| `button.tsx` → `Button` | `combobox.tsx` | Combobox trigger |
| `label.tsx` → `Label` | `field.tsx` | `FieldLabel` composes over `Label` |
| `separator.tsx` → `Separator` | `field.tsx`, `button-group.tsx`, `item.tsx` | Shared divider primitive |

---

## 6. Summary — What Each Utility Handles

| Concern | Tool | Example |
|---|---|---|
| Conditional class inclusion | `clsx` (inside `cn`) | `isActive && "font-bold"` |
| Conflict deduplication | `twMerge` (inside `cn`) | Consumer's `p-2` overrides base `p-4` |
| Static variant mapping | `cva` | `variant="destructive"` → destructive classes |
| Prop-derived variants with defaults | `cva` + `defaultVariants` | Omitting `size` → `"default"` size applied automatically |
| Runtime conditional classes | `cn()` with `&&` / ternary | `position === "popper" && "translate-y-1"` |
| State-driven styling | Tailwind `data-[state=*]` | No JS needed; CSS handles open/closed/checked |
| Parent → child styling | Tailwind `group-data-*` | Variant of parent changes child appearance |
| Child → parent styling | Tailwind `has-[>*]` | Presence of icon changes parent layout |
| ARIA-driven styling | Tailwind `aria-[*]` | `aria-invalid:border-destructive` |
| Cross-component reuse | Exported `*Variants` functions | `buttonVariants` used in Pagination and Calendar |
| Slot-based targeting | `data-slot` + CSS selectors | `*:data-[slot=alert-description]:text-destructive/90` |
