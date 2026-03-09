# shadcn/ui v4 — Accessibility Rules

**Source**: `design-system-sources/ui/apps/v4/registry/new-york-v4/ui/`

---

## Responsibility Split

| Concern | Handled by |
|---|---|
| Focus trap in modals | Radix |
| `aria-expanded` / `aria-haspopup` | Radix |
| `aria-checked` / `aria-pressed` / `aria-selected` | Radix |
| Keyboard navigation inside menus | Radix |
| Focus ring visual style | shadcn (Tailwind `focus-visible:*`) |
| `aria-label` on landmark / icon-only elements | shadcn (explicit prop) |
| `aria-invalid` on form fields | shadcn via react-hook-form state |
| `aria-describedby` linking input → description → error | shadcn `FormControl` |
| `role="alert"` on error/notification elements | shadcn |
| Semantic HTML element choice | shadcn |
| `sr-only` text on icon-only controls | shadcn |
| Global keyboard shortcuts | shadcn (Sidebar `Cmd+B`, Carousel arrows) |

---

## 1. ARIA Attributes

### Explicitly set by shadcn

| Attribute | Value | Component | Purpose |
|---|---|---|---|
| `aria-label` | `"breadcrumb"` | `Breadcrumb` (`<nav>`) | Names the landmark region |
| `aria-label` | `"pagination"` | `Pagination` (`<nav>`) | Names the landmark region |
| `aria-label` | `"Go to previous page"` | `PaginationPrevious` | Icon-only link label |
| `aria-label` | `"Go to next page"` | `PaginationNext` | Icon-only link label |
| `aria-label` | `"Toggle Sidebar"` | `SidebarTrigger` | Icon-only button label |
| `aria-label` | `"Loading"` | `Spinner` | SVG `role="status"` label |
| `aria-current` | `"page"` | `BreadcrumbPage` | Marks current page in trail |
| `aria-current` | `"page" \| undefined` | `PaginationLink` | Active page indicator via `isActive` prop |
| `aria-disabled` | `"true"` | `BreadcrumbPage` | `<span>` acting as a disabled link |
| `aria-hidden` | `"true"` | `BreadcrumbSeparator` | Decorative chevron icon |
| `aria-hidden` | `"true"` | `BreadcrumbEllipsis` | Decorative ellipsis icon |
| `aria-hidden` | `"true"` | `NavigationMenu` chevron | Decorative indicator arrow |
| `aria-hidden` | `"true"` | `NativeSelect` chevron | Decorative `<ChevronDownIcon>` |
| `aria-hidden` | `true` | `PaginationEllipsis` | Decorative ellipsis icon |
| `aria-roledescription` | `"carousel"` | `Carousel` root | Identifies widget type for screen readers |
| `aria-roledescription` | `"slide"` | `CarouselItem` | Identifies each slide |
| `aria-describedby` | `formDescriptionId` or `formDescriptionId + formMessageId` | `FormControl` | Links input to description and/or error |
| `aria-invalid` | `!!error` (boolean) | `FormControl` | Set programmatically from react-hook-form state |

### Managed automatically by Radix UI

| Attribute | Managed on | Trigger condition |
|---|---|---|
| `aria-expanded` | Dialog, Select, Popover, DropdownMenu, Collapsible, Accordion, Menubar, NavigationMenu | Open/close state change |
| `aria-haspopup` | Select trigger, Menubar trigger, DropdownMenu trigger | Presence of popup |
| `aria-controls` | All trigger → content pairs | Internal Radix wiring |
| `aria-checked` | Checkbox, RadioGroup, MenubarCheckboxItem, DropdownMenuCheckboxItem | Checked state |
| `aria-selected` | Tabs trigger, Select item, Calendar day | Active/selected state |
| `aria-pressed` | Toggle | On/off state |
| `aria-orientation` | Tabs, Separator, Slider, ResizableHandle | Direction prop |
| `aria-valuemin/max/now` | Slider, Progress | Range value props |
| `aria-modal` | Dialog, AlertDialog, Sheet, Drawer | Modal containment flag |

---

## 2. Role Attributes

| Role | Component | Element | Rationale |
|---|---|---|---|
| `role="alert"` | `Alert` | `<div>` | Live region — announced on mount without focus |
| `role="alert"` | `FieldError` | `<div>` | Error message announced immediately |
| `role="status"` | `Spinner` | `<svg>` | Polite live region for loading state |
| `role="navigation"` | `Pagination` | `<nav>` | Explicit landmark (redundant with `<nav>` but explicit) |
| `role="region"` | `Carousel` | `<div>` | Landmark paired with `aria-roledescription` |
| `role="group"` | `CarouselItem` | `<div>` | Groups slide content |
| `role="group"` | `ButtonGroup` | `<div>` | Groups related buttons |
| `role="group"` | `InputGroup` | `<div>` | Groups input with its addons |
| `role="group"` | `InputGroupAddon` | `<div>` | Sub-group within InputGroup |
| `role="group"` | `Field` | `<div>` | Groups label + control + error |
| `role="list"` | `ItemGroup` | `<div>` | Semantic list without `<ul>` |
| `role="link"` | `BreadcrumbPage` | `<span>` | Current page acts as disabled link |
| `role="presentation"` | `BreadcrumbSeparator` | `<li>` | Removes `<li>` semantics from separator |
| `role="presentation"` | `BreadcrumbEllipsis` | `<span>` | Decorative element, hidden from tree |
| `role="separator"` | `InputOTPSeparator` | `<div>` | Divider between OTP digit groups |

---

## 3. Focus States

### Standard focus ring — used by ~40 components

```css
outline-none
focus-visible:border-ring
focus-visible:ring-[3px]
focus-visible:ring-ring/50
```

Applied to: `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Toggle`, `Tabs`, `Accordion`, `Collapsible`, `Item`, `Kbd`, `Badge`, `NativeSelect`, `Slider`, `InputOTP`

### Destructive variant focus ring

```css
focus-visible:ring-destructive/20
dark:focus-visible:ring-destructive/40
```

Applied when `aria-invalid` is true. Components: `Button (destructive)`, `Input`, `Select`, `Checkbox`, `RadioGroup`, `Textarea`, `Toggle`

### Menu item focus — uses `:focus` not `:focus-visible`

```css
focus:bg-accent
focus:text-accent-foreground
outline-hidden
```

Applied to: `DropdownMenuItem`, `ContextMenuItem`, `MenubarItem`, `NavigationMenuLink`, `CommandItem`

Reason: Radix manages virtual focus via `data-[highlighted]` / `data-[selected]` — `:focus-visible` would miss keyboard-driven Radix focus.

### Slider thumb — expanded ring

```css
focus-visible:ring-4
ring-ring/50
```

Larger ring on slider thumb for discoverability of the precise drag target.

### Resizable handle — compact ring

```css
focus-visible:ring-1
focus-visible:ring-ring
focus-visible:ring-offset-1
```

Thin ring to avoid interfering with adjacent panel borders.

### ButtonGroup — focus z-index stacking

```css
[&>*]:focus-visible:relative
[&>*]:focus-visible:z-10
```

Focused child elevated above siblings so the ring is not clipped by shared borders.

### InputOTP active cell — data-driven focus

```css
data-[active=true]:border-ring
data-[active=true]:ring-[3px]
data-[active=true]:ring-ring/50
```

Uses `data-[active=true]` instead of `:focus-visible` because OTP manages focus programmatically across cells.

---

## 4. Keyboard Interactions

### Implemented directly in shadcn

| Component | Key | Handler | Behavior |
|---|---|---|---|
| `Carousel` | `ArrowLeft` | `onKeyDownCapture` | Scroll to previous slide |
| `Carousel` | `ArrowRight` | `onKeyDownCapture` | Scroll to next slide |
| `Sidebar` | `Cmd/Ctrl + B` | `window.addEventListener("keydown")` | Toggle sidebar open/closed |

```ts
// Carousel — capture phase to intercept before Embla internal handlers
onKeyDownCapture={handleKeyDown}
// ArrowLeft → scrollPrev()   ArrowRight → scrollNext()

// Sidebar — global keyboard shortcut
const SIDEBAR_KEYBOARD_SHORTCUT = "b"
event.key === "b" && (event.metaKey || event.ctrlKey) → toggleSidebar()
```

### Delegated to Radix UI

| Component | Keys handled automatically |
|---|---|
| `Dialog / Sheet / Drawer / AlertDialog` | `Escape` closes; focus trap; `Tab` / `Shift+Tab` cycles within |
| `DropdownMenu / ContextMenu / Menubar` | `Arrow` keys navigate; `Enter` / `Space` activate; `Escape` closes; `Home` / `End` jump |
| `Select` | `Arrow` keys cycle options; `Enter` selects; `Escape` closes; typeahead |
| `Tabs` | `Arrow` keys switch tabs; `Home` / `End` jump to first/last |
| `Accordion` | `Arrow` keys navigate; `Enter` / `Space` toggle |
| `Collapsible` | `Enter` / `Space` on trigger |
| `RadioGroup` | `Arrow` keys navigate and select simultaneously (roving tabindex) |
| `Checkbox` | `Space` toggles |
| `Switch` | `Space` toggles |
| `Toggle` | `Enter` / `Space` toggles |
| `Slider` | `Arrow` keys step; `Home` / `End` min/max; `Page Up/Down` large step |
| `Popover / HoverCard / Tooltip` | `Escape` closes; focus management on open |
| `NavigationMenu` | `Arrow` keys navigate submenus; `Escape` closes |
| `Command` | `Arrow` keys navigate list; `Enter` selects; typeahead built-in |
| `ResizableHandle` | `Arrow` keys resize panels |

---

## 5. Semantic HTML

| Element | Used in | Notes |
|---|---|---|
| `<nav>` | `Breadcrumb`, `Pagination` | Landmark regions |
| `<main>` | `SidebarInset` | Page content area offset from sidebar |
| `<ol>` | `BreadcrumbList` | Ordered — sequence matters for breadcrumb trail |
| `<ul>` | `PaginationContent`, `SidebarMenu`, `SidebarMenuSub` | Unordered lists |
| `<li>` | `BreadcrumbItem`, `BreadcrumbSeparator`, `PaginationItem`, `SidebarMenuItem`, `SidebarMenuSubItem` | List items |
| `<table>` + full family | `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption` | Complete semantic table structure |
| `<fieldset>` | `FieldSet` | Groups related form controls |
| `<legend>` | `FieldLegend` | Labels a `<fieldset>` |
| `<label>` | `Label`, `FormLabel`, `FieldLabel` | Via Radix `LabelPrimitive.Root` |
| `<button>` | `Button`, `SidebarTrigger`, `SidebarMenuButton` | Native button semantics |
| `<kbd>` | `Kbd`, `KbdGroup` | Keyboard shortcut representation |
| `<caption>` | `TableCaption` | Describes table content for screen readers |
| `<a>` | `BreadcrumbLink`, `PaginationLink` | Native anchor with `asChild` support |

---

## 6. Disabled State Patterns

| Pattern | Applied to | Behavior |
|---|---|---|
| `disabled:pointer-events-none disabled:opacity-50` | `Button`, `Toggle`, `Accordion`, `Checkbox`, `Switch`, `Slider`, `Select`, `Command` items | Native `disabled` prop — blocks interaction |
| `disabled:cursor-not-allowed disabled:opacity-50` | `Input`, `Textarea`, `NativeSelect`, `RadioGroup`, `Checkbox` | Inputs show cursor feedback |
| `aria-disabled:pointer-events-none aria-disabled:opacity-50` | `SidebarMenuButton`, `SidebarMenuSubButton` | Non-native disabled via `aria-disabled` attribute |
| `aria-disabled:opacity-50` | Calendar day cells | Disabled dates in date picker |
| `data-[disabled]:pointer-events-none data-[disabled]:opacity-50` | `DropdownMenuItem`, `ContextMenuItem`, `MenubarItem`, `CommandItem` | Radix sets `data-disabled` on items |

---

## 7. Screen Reader Text (`sr-only`)

| Component | Text | Why hidden visually |
|---|---|---|
| `Dialog` | `"Close"` | Icon-only `XIcon` close button |
| `Sheet` | `"Close"` | Icon-only `XIcon` close button |
| `Carousel` | `"Previous slide"` | Icon-only arrow button |
| `Carousel` | `"Next slide"` | Icon-only arrow button |
| `Pagination` | `"More pages"` | `MoreHorizontalIcon` only |
| `Breadcrumb` | `"More"` | `MoreHorizontalIcon` in ellipsis |
| `Command` | `DialogHeader` content | `CommandDialog` requires a titled dialog |
| `Sidebar` | `"Toggle Sidebar"` | Icon-only trigger button |
| `Sidebar` | `SheetHeader` | Mobile sidebar sheet requires accessible title |
| `Field` | Labels in horizontal layouts | `[&>.sr-only]:w-auto` — labels visually hidden but preserve layout width |

---

## 8. `aria-invalid` Error State — Universal Pattern

All interactive form inputs implement the same error visual pattern via Tailwind `aria-invalid:` selectors:

```css
/* Applied to: Button, Input, Textarea, Select, Checkbox, RadioGroup,
   Switch, Toggle, Badge, NativeSelect, InputOTP, Combobox */

aria-invalid:border-destructive
aria-invalid:ring-destructive/20
dark:aria-invalid:ring-destructive/40
```

In `FormControl`, `aria-invalid` is set programmatically:

```ts
aria-invalid={!!error}  // error comes from react-hook-form fieldState
```

In `InputGroup`, the parent container detects `aria-invalid` on any child:

```css
has-[[data-slot][aria-invalid=true]]:border-destructive
has-[[data-slot][aria-invalid=true]]:ring-destructive/20
```

---

## 9. `aria-describedby` Chain (Form)

`FormControl` wires three IDs automatically:

```
<FormItem>  ← generates unique id via React.useId()
  <FormLabel htmlFor={formItemId} />
  <FormControl
    id={formItemId}
    aria-describedby={
      !error
        ? formDescriptionId                           // only description
        : `${formDescriptionId} ${formMessageId}`    // description + error
    }
    aria-invalid={!!error}
  >
    {children}  ← the actual input
  </FormControl>
  <FormDescription id={formDescriptionId} />
  <FormMessage id={formMessageId} />   ← only renders when error exists
</FormItem>
```

Screen readers announce: label → description → error in sequence when the field is focused.
