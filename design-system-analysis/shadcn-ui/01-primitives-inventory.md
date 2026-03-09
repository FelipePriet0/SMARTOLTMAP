# shadcn/ui v4 — Primitives Inventory

**Source**: `design-system-sources/ui/apps/v4/registry/new-york-v4/ui/`
**Style**: new-york-v4
**Total primitives**: 54 component files

---

## Architecture Patterns

| Pattern | Implementation |
|---|---|
| Variant system | `cva` (class-variance-authority) |
| Accessibility layer | Radix UI (`radix-ui` package) |
| Class utility | `cn()` = `clsx` + `tailwind-merge` |
| Polymorphic rendering | `asChild` prop → `Slot.Root` from `radix-ui` |
| Element targeting | `data-slot="<name>"` on every element |
| Dark mode | `dark:` Tailwind prefix |
| Focus ring | `focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50` |
| Error state | `aria-invalid:border-destructive aria-invalid:ring-destructive/20` |

---

## Primitives Catalog

### Layout / Structure

| Component | File | Sub-components | Notes |
|---|---|---|---|
| Card | `card.tsx` | CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter | No variants |
| Separator | `separator.tsx` | — | `orientation`: horizontal\|vertical |
| AspectRatio | `aspect-ratio.tsx` | — | Radix wrapper |
| ScrollArea | `scroll-area.tsx` | ScrollBar | Custom scrollbar |
| Resizable | `resizable.tsx` | ResizablePanelGroup, ResizablePanel, ResizableHandle | Panel splits |

### Inputs / Forms

| Component | File | Variants / Props | Notes |
|---|---|---|---|
| Button | `button.tsx` | **variant**: default\|destructive\|outline\|secondary\|ghost\|link; **size**: xs\|sm\|default\|lg\|icon\|icon-xs\|icon-sm\|icon-lg | `asChild` support |
| ButtonGroup | `button-group.tsx` | **orientation**: horizontal\|vertical | ButtonGroupText, ButtonGroupSeparator |
| Input | `input.tsx` | — | Plain styled `<input>` |
| InputGroup | `input-group.tsx` | InputGroupAddon (**align**: inline-start\|inline-end\|block-start\|block-end) | Wraps Input with prefix/suffix addons |
| Textarea | `textarea.tsx` | — | `field-sizing-content` auto-resize |
| Label | `label.tsx` | — | Radix Label |
| Checkbox | `checkbox.tsx` | — | Radix |
| RadioGroup | `radio-group.tsx` | RadioGroupItem | Radix |
| Switch | `switch.tsx` | **size**: sm\|default | Radix |
| Slider | `slider.tsx` | — | Multi-thumb range support |
| Select | `select.tsx` | SelectTrigger **size**: sm\|default | Full Radix Select compound |
| NativeSelect | `native-select.tsx` | NativeSelectOption, NativeSelectOptGroup | **size**: sm\|default |
| Toggle | `toggle.tsx` | **variant**: default\|outline; **size**: sm\|default\|lg | Radix, exports `toggleVariants` |
| ToggleGroup | `toggle-group.tsx` | ToggleGroupItem | Shares Toggle variants via context |
| Field | `field.tsx` | FieldSet, FieldGroup, FieldLabel, FieldTitle, FieldDescription, FieldError, FieldSeparator, FieldContent, FieldLegend | **orientation**: vertical\|horizontal\|responsive |
| Form | `form.tsx` | FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage | react-hook-form integration |
| Calendar | `calendar.tsx` | — | Date picker |
| InputOTP | `input-otp.tsx` | — | OTP input |

### Typography / Display

| Component | File | Variants / Props | Notes |
|---|---|---|---|
| Badge | `badge.tsx` | **variant**: default\|secondary\|destructive\|outline\|ghost\|link | `asChild` support, exports `badgeVariants` |
| Avatar | `avatar.tsx` | **size**: sm\|default\|lg | AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount |
| Kbd | `kbd.tsx` | — | Keyboard shortcut display; `KbdGroup` |
| Skeleton | `skeleton.tsx` | — | `animate-pulse` loading placeholder |
| Spinner | `spinner.tsx` | — | `Loader2Icon` animated |

### Feedback / Overlays

| Component | File | Variants / Props | Notes |
|---|---|---|---|
| Alert | `alert.tsx` | **variant**: default\|destructive | AlertTitle, AlertDescription; `role="alert"` |
| Tooltip | `tooltip.tsx` | — | `delayDuration=0`; requires `TooltipProvider` |
| Popover | `popover.tsx` | — | Radix; PopoverAnchor, PopoverDescription |
| Dialog | `dialog.tsx` | `showCloseButton?: boolean` | DialogHeader, DialogFooter, DialogTitle, DialogDescription |
| AlertDialog | `alert-dialog.tsx` | — | AlertDialogMedia, AlertDialogAction, AlertDialogCancel |
| Sheet | `sheet.tsx` | **side**: top\|right\|bottom\|left | Side panel |
| Drawer | `drawer.tsx` | — | Bottom drawer (vaul) |
| HoverCard | `hover-card.tsx` | — | Radix |
| Sonner | `sonner.tsx` | — | Toast notifications (sonner lib) |

### Navigation / Menus

| Component | File | Variants / Props | Notes |
|---|---|---|---|
| Tabs | `tabs.tsx` | TabsList **variant**: default\|line; **orientation**: horizontal\|vertical | Radix |
| Accordion | `accordion.tsx` | — | Radix |
| Collapsible | `collapsible.tsx` | — | Radix |
| DropdownMenu | `dropdown-menu.tsx` | — | Full compound |
| ContextMenu | `context-menu.tsx` | — | Right-click menu |
| Menubar | `menubar.tsx` | — | Menu bar |
| NavigationMenu | `navigation-menu.tsx` | — | Site navigation |
| Breadcrumb | `breadcrumb.tsx` | — | BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis |
| Pagination | `pagination.tsx` | — | Built on `buttonVariants` via `asChild` |
| Command | `command.tsx` | — | cmdk command palette |
| Combobox | `combobox.tsx` | — | `@base-ui/react` (not Radix) |
| Sidebar | `sidebar.tsx` | SidebarMenuButton **variant**: default\|outline; **size**: sm\|default\|lg | Requires `SidebarProvider` |

### Data Display

| Component | File | Sub-components | Notes |
|---|---|---|---|
| Table | `table.tsx` | TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption | Full semantic table |
| Item | `item.tsx` | ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemHeader, ItemFooter, ItemGroup, ItemSeparator | **variant**: default\|outline\|muted; **size**: sm\|default |
| Empty | `empty.tsx` | EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia | **EmptyMedia variant**: default\|icon |
| Progress | `progress.tsx` | — | `value: 0–100`; Radix aria-value* |
| Chart | `chart.tsx` | — | Recharts wrapper |
| Carousel | `carousel.tsx` | CarouselContent, CarouselItem, CarouselPrevious, CarouselNext | Embla carousel |

---

## External Dependencies

| Package | Purpose | Used by |
|---|---|---|
| `radix-ui` | Accessibility primitives | Most interactive components |
| `class-variance-authority` | Variant system | 14 cva definitions |
| `clsx` | Conditional class joining | `cn()` utility |
| `tailwind-merge` | Tailwind conflict resolution | `cn()` utility |
| `lucide-react` | Icon set | Throughout |
| `react-hook-form` | Form state management | `Form` component |
| `cmdk` | Command palette | `Command` |
| `@base-ui/react` | Combobox primitive | `Combobox` only |
| `embla-carousel-react` | Carousel engine | `Carousel` |
| `vaul` | Bottom drawer | `Drawer` |
| `sonner` | Toast notifications | `Sonner` |
| `input-otp` | OTP input | `InputOTP` |
| `recharts` | Chart library | `Chart` |

---

## Mandatory Components (Must Reuse)

These components must be treated as the single source of truth in the Design System. They must never be recreated, replaced, or reimplemented.

---

### Tier 1 — Never Recreate

| Component | Reason it must be reused |
|---|---|
| **Button** | Anchors the entire variant system. `buttonVariants` is imported directly by `Pagination` and `Calendar`. 6 variants × 8 sizes already defined. Recreating diverges the visual language across every interactive surface. |
| **Input** | Foundation of every form. Encodes three CSS state layers (base, focus, error) in a pattern shared with `Textarea`, `Select`, and `NativeSelect`. Recreating produces a divergent error ring and focus behavior. |
| **Textarea** | Identical state pattern to `Input` (`aria-invalid`, `focus-visible`, `disabled`). Must stay in sync with `Input`. Recreating creates two divergent form control languages. |
| **Label** | Radix `LabelPrimitive.Root` handles `htmlFor` association and `peer-disabled` state correctly. Every form field depends on it. Recreating risks breaking the label→input accessibility chain. |
| **Checkbox** | Radix manages `role="checkbox"`, `aria-checked`, `Space` key toggle, and `data-[state=checked]` visual state. Recreating these from scratch is a high-risk accessibility surface. |
| **RadioGroup** | Radix manages the roving tabindex pattern — Arrow keys navigate and select simultaneously, which is the WCAG-required behavior for radio groups. This pattern is extremely difficult to replicate correctly without Radix. |
| **Switch** | Radix manages `role="switch"`, `aria-checked`, and `Space` key. Has size variants. Recreating risks using an incorrect semantic role (`role="button"` or `role="checkbox"` instead of `role="switch"`). |
| **Select** | The most complex keyboard primitive in the library. Radix manages: typeahead search, Arrow navigation, `aria-expanded`, `aria-selected`, `aria-activedescendant`, scroll-into-view, and portal positioning. Recreating is months of accessibility work. |
| **Dialog** | Focus trap, `aria-modal`, scroll lock, `Escape` to close, return-focus-on-close — all handled by Radix. A broken or missing modal focus trap is a direct WCAG 2.1 SC 2.1.2 failure. |
| **AlertDialog** | Extends Dialog. Adds the `AlertDialogAction` / `AlertDialogCancel` semantic split for confirmation flows. Must stay paired with Dialog to maintain consistent modal behavior and focus management. |
| **Tabs** | Radix manages roving tabindex across triggers, `aria-selected`, `aria-controls` panel association, and Arrow key navigation. Tabs without roving tabindex fail WCAG 2.1 SC 2.1.1. |
| **Form / FormControl** | The `aria-describedby` chain linking input → description → error message, and `aria-invalid` set from react-hook-form state, are wired inside `FormControl`. Recreating this pattern is the highest-risk form accessibility surface. |
| **Alert** | `role="alert"` makes it a live region — screen readers announce it on mount without the user moving focus. Recreating as a styled `<div>` without the role silently breaks screen reader announcements. |
| **Tooltip** | Radix manages open delay, close on `Escape`, `aria-describedby` on trigger, and simultaneous hover + focus triggers. A handmade tooltip almost always fails keyboard-only users and fails WCAG SC 1.4.13. |
| **Toggle** | Radix manages `aria-pressed`. `toggleVariants` is exported and consumed by `ToggleGroup` via context. Recreating breaks the variant inheritance chain between `Toggle` and `ToggleGroup`. |
| **ToggleGroup** | Consumes `toggleVariants` from `Toggle` via React context and manages Radix keyboard navigation within the group. Must be kept paired with `Toggle` — they share variant logic by design. |
| **Table** | Full semantic HTML: `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<th>`, `<td>`, `<caption>`. Screen readers use this structure to announce row/column context. A `<div>`-based table is a direct WCAG SC 1.3.1 failure. |
| **Separator** | Radix manages the `decorative` vs semantic distinction — decorative separators receive `role="none"`, semantic ones receive `role="separator"` with `aria-orientation`. A recreated separator always defaults to decorative, silently losing the semantic case. |
| **Slider** | Radix manages `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, Arrow key step, `Home`/`End`, and `Page Up/Down`. Multi-thumb range is also handled. Critical for screen reader navigation of range inputs. |
| **Progress** | Radix manages `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`. Without these, screen readers cannot announce progress state. A styled `<div>` without Radix is a silent accessibility failure. |
| **Badge** | 6 variants exported as `badgeVariants`. Used as status indicators throughout any UI. Recreating with a different name or different variants diverges status semantics and breaks the visual vocabulary. |

---

### Tier 2 — Strong Recommendation to Reuse

| Component | Reason |
|---|---|
| **Avatar** | Image fallback logic + `AvatarGroup` stacking pattern. Recreating risks broken fallback behavior and inconsistent avatar sizing across the UI. |
| **Spinner** | `role="status"` + `aria-label="Loading"` must remain consistent. One loading indicator system-wide prevents screen reader confusion from multiple loading patterns. |
| **Skeleton** | `animate-pulse` — must stay visually consistent with `Spinner` as the loading state language. Two different loading placeholder styles creates UX inconsistency. |
| **Field / FieldGroup** | Container query-based responsive layout system (`@container`). Recreating produces layout inconsistency between vertical, horizontal, and responsive form field orientations. |
