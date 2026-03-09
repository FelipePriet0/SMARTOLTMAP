magicui-analysis / 03-hover-patterns.md

**Magic Card (hover glow)**
- Visual change: Pointer-tracked radial glow and border gradient; overlay opacity rises on hover
- Timing: `transition-opacity duration-300` for overlay; background gradient follows pointer in real time
- Used by: `magic-card.tsx` (card surfaces)
- Combo: Color shift via gradient; no scale; no elevation

**Interactive Hover Button (label swap)**
- Visual change: Leading dot scales slightly; primary label slides out while alternate label + arrow slides in
- Timing: `transition-all duration-300` on both labels and dot
- Used by: `interactive-hover-button.tsx` (primary actions)
- Combo: Scale (dot) + horizontal translation + opacity change

**Dock (icon magnification)**
- Visual change: Icons scale up near cursor with smooth spring interpolation
- Timing: Spring (mass 0.1, stiffness 150, damping 12); continuous while hovering
- Used by: `dock.tsx` (icon bars)
- Combo: Scale only; no shadow/elevation

**Shimmer Button (hover highlight)**
- Visual change: Inner highlight shadow tightens/loosens on hover/active; shimmer is ambient
- Timing: `transition-all duration-300` for highlight; shimmer speed via `--speed`
- Used by: `shimmer-button.tsx` (marketing actions)
- Combo: Shadow micro-change; no scale on hover (press translates 1px)
