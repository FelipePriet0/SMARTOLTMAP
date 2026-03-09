# shadcn/ui v4 — Composition Patterns

**Source**: `design-system-sources/ui/apps/v4/registry/new-york-v4/ui/`

---

## The 5 Composition Patterns

| Pattern | Mechanism | Components |
|---|---|---|
| **Radix delegation** | Thin wrappers over Radix primitives adding `data-slot` + Tailwind | Select, Dialog, Tabs, Tooltip, Accordion, DropdownMenu, ContextMenu, Menubar, NavigationMenu, HoverCard, Popover, Collapsible, Sheet, Drawer, RadioGroup, Switch, Checkbox, Slider, ScrollArea, Separator, Toggle, ToggleGroup, Avatar, Label |
| **Context propagation** | `createContext` + `useContext` to share state across sub-components | Form, ToggleGroup, Carousel, Chart, Sidebar, InputOTP |
| **Provider wrapper** | Named `*Provider` component required before usage | Tooltip (`TooltipProvider`), Sidebar (`SidebarProvider`), Form (`FormProvider`), Chart, Direction, Carousel |
| **`asChild` / Slot** | Polymorphic rendering via `Slot.Root` from `radix-ui` | Button, Badge, Item, BreadcrumbLink, SidebarMenuButton, InputGroupButton |
| **Portal escape** | Renders outside DOM tree via `*Portal` | Dialog, Sheet, Drawer, AlertDialog, Select, Tooltip, Popover, DropdownMenu, ContextMenu, Menubar, HoverCard, Combobox |

---

## Complete Compound Component Map

### Overlay / Modal Group

```
Dialog
├── DialogTrigger
├── DialogPortal          ← portal escape hatch
├── DialogOverlay         ← backdrop (fixed inset black/50)
├── DialogContent         ← showCloseButton?: boolean
│   └── (DialogClose)     ← auto-injected when showCloseButton=true
├── DialogHeader
├── DialogFooter          ← showCloseButton?: boolean (renders DialogClose)
├── DialogTitle
└── DialogDescription

AlertDialog               ← confirmation variant of Dialog
├── AlertDialogTrigger
├── AlertDialogPortal
├── AlertDialogOverlay
├── AlertDialogContent
├── AlertDialogHeader
├── AlertDialogFooter
├── AlertDialogTitle
├── AlertDialogDescription
├── AlertDialogMedia      ← unique: icon/image slot before title
├── AlertDialogAction     ← confirm button (closes automatically)
└── AlertDialogCancel     ← cancel button (closes automatically)

Sheet                     ← Dialog variant anchored to a side
├── SheetTrigger
├── SheetPortal
├── SheetOverlay
├── SheetClose
├── SheetContent          ← side: top | right | bottom | left
├── SheetHeader
├── SheetTitle
└── SheetDescription

Drawer                    ← vaul; bottom-anchored sheet
├── DrawerTrigger
├── DrawerPortal
├── DrawerOverlay
├── DrawerClose
├── DrawerContent
├── DrawerHeader
├── DrawerFooter
├── DrawerTitle
└── DrawerDescription
```

### Floating / Anchor Group

```
Tooltip                   ← requires TooltipProvider in tree
├── TooltipProvider        ← delayDuration=0 (required wrapper)
├── TooltipTrigger
└── TooltipContent         ← auto-includes Arrow element

Popover
├── PopoverTrigger
├── PopoverAnchor          ← decouples anchor point from trigger
├── PopoverContent
└── PopoverDescription     ← sr-only by default

HoverCard
├── HoverCardTrigger
└── HoverCardContent
```

### Menu Group

```
DropdownMenu
├── DropdownMenuTrigger
├── DropdownMenuPortal
├── DropdownMenuContent
├── DropdownMenuGroup
├── DropdownMenuItem
├── DropdownMenuCheckboxItem
├── DropdownMenuRadioGroup
├── DropdownMenuRadioItem
├── DropdownMenuLabel
├── DropdownMenuSeparator
├── DropdownMenuShortcut
├── DropdownMenuSub
├── DropdownMenuSubTrigger
└── DropdownMenuSubContent

ContextMenu               ← same shape as DropdownMenu, right-click trigger
├── ContextMenuTrigger
├── ContextMenuContent
├── ContextMenuGroup
├── ContextMenuSub
├── ContextMenuSubTrigger
├── ContextMenuSubContent
├── ContextMenuItem
├── ContextMenuCheckboxItem
├── ContextMenuRadioGroup
├── ContextMenuRadioItem
├── ContextMenuLabel
├── ContextMenuSeparator
└── ContextMenuShortcut

Menubar                   ← horizontal application menu bar
├── MenubarMenu            ← individual dropdown within the bar
├── MenubarTrigger
├── MenubarContent
├── MenubarGroup
├── MenubarSub
├── MenubarSubTrigger
├── MenubarSubContent
├── MenubarItem
├── MenubarCheckboxItem
├── MenubarRadioGroup
├── MenubarRadioItem
├── MenubarLabel
├── MenubarSeparator
└── MenubarShortcut
```

### Navigation Group

```
NavigationMenu
├── NavigationMenuList
├── NavigationMenuItem
├── NavigationMenuTrigger   ← uses navigationMenuTriggerStyle (cva fn)
├── NavigationMenuContent
├── NavigationMenuViewport
├── NavigationMenuLink
└── NavigationMenuIndicator

Breadcrumb                  ← semantic nav > ol hierarchy
├── BreadcrumbList           ← <ol>
├── BreadcrumbItem           ← <li>
├── BreadcrumbLink           ← <a> with asChild support
├── BreadcrumbPage           ← <span> aria-current="page"
├── BreadcrumbSeparator      ← <li> role="presentation" aria-hidden
└── BreadcrumbEllipsis       ← <span> role="presentation" + sr-only "More"

Pagination                  ← built entirely on buttonVariants via asChild
├── PaginationContent        ← <ul>
├── PaginationItem           ← <li>
├── PaginationLink           ← <a> using buttonVariants
├── PaginationPrevious       ← PaginationLink + aria-label
├── PaginationNext           ← PaginationLink + aria-label
└── PaginationEllipsis       ← decorative aria-hidden + sr-only "More pages"
```

### Selection / Input Group

```
Select                      ← Radix; portal-based dropdown
├── SelectGroup
├── SelectValue
├── SelectTrigger            ← size: sm | default
├── SelectContent
├── SelectLabel
├── SelectItem
├── SelectSeparator
├── SelectScrollUpButton
└── SelectScrollDownButton

Combobox                    ← @base-ui/react (NOT Radix — only exception)
├── ComboboxValue
├── ComboboxTrigger
├── ComboboxInput            ← searchable text input
├── ComboboxClear
├── ComboboxContent
├── ComboboxCollection
├── ComboboxItem
├── ComboboxLabel
├── ComboboxSeparator
├── ComboboxChips            ← multi-select chip container
├── ComboboxChip             ← individual selected value chip
└── ComboboxChipsInput

Command                     ← cmdk; searchable command palette
├── CommandDialog            ← Command inside a Dialog
├── CommandInput
├── CommandList
├── CommandEmpty
├── CommandGroup
├── CommandItem
├── CommandSeparator
└── CommandShortcut

RadioGroup
└── RadioGroupItem

Tabs
├── TabsList                 ← variant: default | line
├── TabsTrigger
└── TabsContent

Toggle
ToggleGroup                  ← shares toggleVariants via context
└── ToggleGroupItem
```

### Form / Field Group

```
Form                        ← = FormProvider (react-hook-form)
├── FormField               ← Controller wrapper + FormFieldContext
├── FormItem                ← FormItemContext (generates unique id)
├── FormLabel
├── FormControl             ← Slot.Root; bridges field state → input aria
├── FormDescription
└── FormMessage             ← reads error from context automatically

Field                       ← layout-only system, no form lib dependency
├── FieldSet                ← <fieldset>
├── FieldLegend             ← variant: legend | label
├── FieldGroup              ← @container/field-group for responsive layout
├── Field                   ← orientation: vertical | horizontal | responsive
├── FieldLabel
├── FieldTitle
├── FieldContent
├── FieldDescription
├── FieldError              ← errors?: Array<{message?: string}>
└── FieldSeparator          ← optional divider with label text

InputGroup                  ← input with inline addons
├── InputGroupAddon         ← align: inline-start|end|block-start|end
├── InputGroupButton
├── InputGroupText
├── InputGroupInput
└── InputGroupTextarea

ButtonGroup
├── ButtonGroupText
└── ButtonGroupSeparator
```

### Data Display Group

```
Card
├── CardHeader
├── CardTitle
├── CardDescription
├── CardAction              ← top-right grid slot (col-start-2)
├── CardContent
└── CardFooter

Table
├── TableHeader             ← <thead>
├── TableBody               ← <tbody>
├── TableFooter             ← <tfoot>
├── TableRow                ← <tr>
├── TableHead               ← <th>
├── TableCell               ← <td>
└── TableCaption            ← <caption>

Item                        ← generic list item primitive
├── ItemGroup               ← role="list" wrapper
├── ItemMedia               ← variant: default | icon | image
├── ItemContent
├── ItemTitle
├── ItemDescription
├── ItemActions
├── ItemHeader
├── ItemFooter
└── ItemSeparator

Empty                       ← empty state layout
├── EmptyHeader
├── EmptyMedia              ← variant: default | icon
├── EmptyTitle
├── EmptyDescription
└── EmptyContent

Accordion
├── AccordionItem
├── AccordionTrigger
└── AccordionContent

Carousel                    ← Embla; useCarousel context
├── CarouselContent
├── CarouselItem
├── CarouselPrevious
└── CarouselNext

Resizable                   ← react-resizable-panels
├── ResizablePanelGroup
├── ResizablePanel
└── ResizableHandle
```

### Navigation Sidebar

```
Sidebar                     ← requires SidebarProvider
├── SidebarProvider         ← state (open/closed/mobile) via context
├── SidebarInset            ← <main> content area offset
├── SidebarRail             ← clickable collapse strip
├── SidebarTrigger          ← external toggle button
├── SidebarHeader
├── SidebarContent
├── SidebarFooter
├── SidebarSeparator
├── SidebarInput
├── SidebarGroup
├── SidebarGroupLabel
├── SidebarGroupAction
├── SidebarGroupContent
├── SidebarMenu             ← <ul>
├── SidebarMenuItem         ← <li>
├── SidebarMenuButton       ← variant: default|outline; size: sm|default|lg
├── SidebarMenuAction
├── SidebarMenuBadge
├── SidebarMenuSkeleton
├── SidebarMenuSub          ← nested <ul>
├── SidebarMenuSubItem
└── SidebarMenuSubButton

Avatar                      ← can be grouped
├── AvatarImage
├── AvatarFallback
├── AvatarBadge             ← status indicator dot
├── AvatarGroup             ← overlapping stack with negative margin
└── AvatarGroupCount

Kbd
└── KbdGroup

ScrollArea
└── ScrollBar               ← orientation: horizontal | vertical

Collapsible
├── CollapsibleTrigger
└── CollapsibleContent
```

---

## Unique Composition Patterns Worth Noting

| Pattern | Component | Detail |
|---|---|---|
| **Auto-injected child** | `Dialog`, `DialogContent` | Injects `DialogClose` button internally when `showCloseButton=true` — consumer doesn't mount it |
| **Media slot** | `AlertDialog`, `EmptyMedia`, `ItemMedia` | Dedicated slot for icon/image with its own variant system, before the title |
| **Dual-form system** | `Form` vs `Field` | `Form` = react-hook-form bound; `Field` = layout-only with no library dependency |
| **Non-Radix primitive** | `Combobox` | Uses `@base-ui/react` instead of Radix — the only exception in the registry |
| **Context-only state** | `Sidebar` | Full open/closed/mobile state in `SidebarProvider` context; no prop drilling |
| **Composed from primitives** | `Pagination` | Built entirely from `Button asChild` + `buttonVariants` — no new primitives |
| **cva exported for reuse** | `Button`, `Toggle`, `Badge` | `buttonVariants`, `toggleVariants`, `badgeVariants` exported and consumed by other components |
| **`data-slot` targeting** | All components | Every element has `data-slot="<name>"`, enabling parent→child CSS targeting without className coupling |
| **Global keyboard shortcut** | `Sidebar` | `SidebarProvider` attaches `window.addEventListener("keydown")` → `Cmd/Ctrl + B` toggles sidebar |
| **Capture-phase keyboard** | `Carousel` | Uses `onKeyDownCapture` to intercept Arrow keys before Embla's internal handlers |
