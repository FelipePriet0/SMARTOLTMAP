"use client";

import React from "react";
import Link from "next/link";

const sections = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "radius", label: "Radius" },
  { id: "shadows", label: "Shadows" },
  { id: "buttons", label: "Buttons" },
  { id: "inputs", label: "Inputs & Forms" },
  { id: "cards", label: "Cards" },
  { id: "tables", label: "Tables" },
  { id: "overlays", label: "Dialogs & Overlays" },
  { id: "motion", label: "Motion" },
];

export function DesignSystemSidebar() {
  return (
    <aside className="sticky top-20 h-[calc(100vh-5rem)] overflow-auto pr-6 text-sm">
      <nav className="space-y-1">
        {sections.map((s) => (
          <Link
            key={s.id}
            href={`#${s.id}`}
            className="block rounded-md px-2 py-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {s.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

