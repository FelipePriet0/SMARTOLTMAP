import React from "react";
import { DesignSystemSidebar } from "./_components/Sidebar";
import { OverlaysShowcase } from "./_components/OverlaysShowcase";

// Optional imports for primitives; adjust paths according to your project setup.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function DesignSystemPage() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="font-display text-2xl font-semibold">Design System</h1>
          <Badge variant="outline" className="text-muted-foreground">Live Reference</Badge>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
        <DesignSystemSidebar />

        <div className="space-y-14">
          {/* Colors */}
          <section id="colors" aria-labelledby="colors-heading" className="scroll-mt-24">
            <h2 id="colors-heading" className="mb-4 text-xl font-semibold">Colors</h2>
            <p className="mb-6 text-sm text-muted-foreground">Semantic color tokens rendered via Tailwind utilities.</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {[
                { name: "bg-background", cls: "bg-background" },
                { name: "bg-card", cls: "bg-card" },
                { name: "bg-popover", cls: "bg-popover" },
                { name: "bg-primary", cls: "bg-primary" },
                { name: "bg-secondary", cls: "bg-secondary" },
                { name: "bg-accent", cls: "bg-accent" },
                { name: "bg-muted", cls: "bg-muted" },
                { name: "bg-destructive", cls: "bg-destructive" },
                { name: "border-border", cls: "bg-background border border-border" },
                { name: "text-foreground", cls: "bg-background" },
              ].map((swatch) => (
                <div key={swatch.name} className="rounded-md border border-border p-3">
                  <div className={`h-12 w-full rounded ${swatch.cls}`}></div>
                  <code className="mt-2 inline-block text-xs text-muted-foreground">{swatch.name}</code>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Typography */}
          <section id="typography" aria-labelledby="typography-heading" className="scroll-mt-24">
            <h2 id="typography-heading" className="mb-4 text-xl font-semibold">Typography</h2>
            <div className="space-y-4">
              <div>
                <div className="font-display text-3xl font-semibold">Heading Example</div>
                <code className="text-xs text-muted-foreground">font-display</code>
              </div>
              <div>
                <p className="font-sans text-sm text-muted-foreground">Body Text Example — uses font-sans mapped to var(--font-body).</p>
                <code className="text-xs text-muted-foreground">font-sans</code>
              </div>
              <div>
                <pre className="font-mono text-sm bg-muted text-muted-foreground rounded-md p-3">{`const hello = 'Code Example'`}</pre>
                <code className="text-xs text-muted-foreground">font-mono</code>
              </div>
            </div>
          </section>

          <Separator />

          {/* Radius */}
          <section id="radius" aria-labelledby="radius-heading" className="scroll-mt-24">
            <h2 id="radius-heading" className="mb-4 text-xl font-semibold">Radius</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { name: "rounded-sm", cls: "rounded-sm" },
                { name: "rounded-md", cls: "rounded-md" },
                { name: "rounded-lg", cls: "rounded-lg" },
                { name: "rounded-xl", cls: "rounded-xl" },
              ].map((r) => (
                <div key={r.name} className="border border-border p-3">
                  <div className={`h-14 w-full bg-card ${r.cls}`}></div>
                  <code className="mt-2 inline-block text-xs text-muted-foreground">{r.name}</code>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Shadows */}
          <section id="shadows" aria-labelledby="shadows-heading" className="scroll-mt-24">
            <h2 id="shadows-heading" className="mb-4 text-xl font-semibold">Shadows</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { name: "shadow-sm", cls: "shadow-sm" },
                { name: "shadow-md", cls: "shadow-md" },
                { name: "shadow-lg", cls: "shadow-lg" },
              ].map((s) => (
                <div key={s.name} className="rounded-lg border border-border bg-card p-4">
                  <div className={`h-20 w-full rounded-md bg-background ${s.cls}`}></div>
                  <code className="mt-2 inline-block text-xs text-muted-foreground">{s.name}</code>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Buttons */}
          <section id="buttons" aria-labelledby="buttons-heading" className="scroll-mt-24">
            <h2 id="buttons-heading" className="mb-4 text-xl font-semibold">Buttons</h2>
            <div className="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button disabled>Disabled</Button>
            </div>
          </section>

          <Separator />

          {/* Inputs & Forms */}
          <section id="inputs" aria-labelledby="inputs-heading" className="scroll-mt-24">
            <h2 id="inputs-heading" className="mb-4 text-xl font-semibold">Inputs & Forms</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Input placeholder="Text input" />
                <Textarea placeholder="Textarea input" />
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Option 1</SelectItem>
                    <SelectItem value="2">Option 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Checkbox id="c1" />
                  <label htmlFor="c1" className="text-sm text-foreground">Checkbox</label>
                </div>
                <RadioGroup defaultValue="a" className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="a" id="r1" />
                    <label htmlFor="r1" className="text-sm">Option A</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="b" id="r2" />
                    <label htmlFor="r2" className="text-sm">Option B</label>
                  </div>
                </RadioGroup>
                <div className="flex items-center gap-3">
                  <Switch id="s1" />
                  <label htmlFor="s1" className="text-sm">Switch</label>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Cards */}
          <section id="cards" aria-labelledby="cards-heading" className="scroll-mt-24">
            <h2 id="cards-heading" className="mb-4 text-xl font-semibold">Cards</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Basic card content</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Supporting description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Body content goes here.</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Action</Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Tables */}
          <section id="tables" aria-labelledby="tables-heading" className="scroll-mt-24">
            <h2 id="tables-heading" className="mb-4 text-xl font-semibold">Tables</h2>
            <div className="rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Ada Lovelace</TableCell>
                    <TableCell><Badge variant="outline">Active</Badge></TableCell>
                    <TableCell className="text-right"><Button size="sm" variant="outline">Edit</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Alan Turing</TableCell>
                    <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                    <TableCell className="text-right"><Button size="sm" variant="outline">Edit</Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>

          <Separator />

          {/* Dialogs & Overlays */}
          <section id="overlays" aria-labelledby="overlays-heading" className="scroll-mt-24">
            <h2 id="overlays-heading" className="mb-4 text-xl font-semibold">Dialogs & Overlays</h2>
            <OverlaysShowcase />
          </section>

          <Separator />

          {/* Motion */}
          <section id="motion" aria-labelledby="motion-heading" className="scroll-mt-24">
            <h2 id="motion-heading" className="mb-4 text-xl font-semibold">Motion</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent hover:text-accent-foreground">
                <p className="text-sm text-muted-foreground">Hover transitions using semantic tokens.</p>
                <code className="text-xs text-muted-foreground">hover:bg-accent hover:text-accent-foreground</code>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <Button variant="outline" disabled className="animate-pulse">Loading state</Button>
                <p className="mt-2 text-xs text-muted-foreground">Use disabled + subtle motion for loading affordances.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

