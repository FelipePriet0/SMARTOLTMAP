magicui-analysis / 02-loading-patterns.md

**Animated Circular Progress Bar**
- Visual structure: SVG circular gauge with primary/secondary arcs and centered percentage label
- Trigger: When a numeric value updates (min→max range)
- Duration: `--transition-length` 1s (arcs), optional `--transition-step` 200ms; linear easing for label fade-in
- Replacement: Replaces placeholder with animated arcs and updates center label to the current percent

**Scroll Progress Indicator**
- Visual structure: Fixed 1px gradient bar at top; fills horizontally via `scaleX`
- Trigger: Page scroll (bound to `scrollYProgress`)
- Duration: Scroll-coupled (continuous)
- Replacement: Augments page during load/reading; no swap-in needed

**Blur Fade (Content Reveal)**
- Visual structure: Content block fades in from slight offset with blur that resolves to sharp
- Trigger: Element becomes visible in viewport
- Duration: Default 0.4s ease-out, optional delay stacking for sequences
- Replacement: Reveals final content without intermediate spinners; perceived faster rendering

**Progressive Blur (Scrollable Boundaries)**
- Visual structure: Layered backdrop-blur gradients at container edges (top/bottom/both)
- Trigger: Applied to scrollable regions to indicate overflow
- Duration: Static effect (no animation); perceived as “more content” affordance
- Replacement: Complements loading states by clarifying scroll affordance while content populates

Notes
- No skeleton loaders or button loading spinners are defined in this repository’s MagicUI registry. Patterns above are the observable async/feedback cues.

**Async UI State Model**
- Idle: Content is rendered and stable; no indicators active. Progressive Blur may remain to signal scrollable overflow.
- Loading: Use Blur Fade when revealing content as it becomes available. For measurable tasks, show Animated Circular Progress Bar tied to value.
- Success: Replace any interim visual with final content; reveal with Blur Fade (0.4s ease-out) to improve perceived responsiveness.
- Error: Not provided by MagicUI as a dedicated pattern; handle state swap at the app layer (outside this registry) without relying on loaders.
- Empty: Not provided by MagicUI; if data resolves to empty, show the app’s empty state. Blur Fade can introduce the empty presentation without a loader.

How patterns relate
- Blur Fade bridges Loading → Success (or Empty) by revealing the finalized content.
- Animated Circular Progress Bar visualizes Loading when progress is determinate.
- Scroll Progress is orthogonal (reading progress), not an async state indicator.
- Progressive Blur is orthogonal (overflow affordance), usable in Idle/Success.

**Loading Strategy Guidelines**
- Instant loads (< ~300ms): Render directly without loaders. Optionally apply Blur Fade for a gentle entrance if it does not delay content.
- Medium loads (~300ms–1.5s): Prefer Blur Fade reveal as content arrives; avoid blocking spinners (none in MagicUI). If progress is measurable, show the Animated Circular Progress Bar.
- Long async operations (> ~1.5s): Use a determinate indicator (Animated Circular Progress Bar) when possible. If not measurable, rely on app-level patterns; MagicUI does not include global skeletons or spinners.
