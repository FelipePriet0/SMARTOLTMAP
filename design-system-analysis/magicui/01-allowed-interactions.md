magicui-analysis / 01-allowed-interactions.md

**Magic Card — Pointer-Tracked Glow**
- Interaction: Hover tracking
- Trigger: Pointer move/enter/leave on card
- Visual effect: Radial gradient border and inner glow follow pointer; overlay fades in/out (`transition-opacity duration-300`)
- Duration: 300ms overlay fade; pointer tracking is real-time (motion values)
- Use: Subtle emphasis and interactivity on cards without lifting elevation

**Interactive Hover Button — Label Slide + Dot Pulse**
- Interaction: Hover transition
- Trigger: Hover on button group
- Visual effect: Leading dot scales slightly; label slides out while a second label with arrow slides in (`transition-all duration-300`)
- Duration: 300ms
- Use: Reinforce affordance and directionality for primary actions

**Ripple Button — Press Ripple**
- Interaction: Press feedback
- Trigger: Click/tap within button bounds
- Visual effect: Expanding circular ripple from tap point (`@keyframes rippling`: scale 0→2, opacity 1→0)
- Duration: Configurable via `--duration` (default 600ms, ease-out)
- Use: High-discoverability press feedback on contained buttons

**Shimmer Button — Perimeter Shimmer + Press Highlight**
- Interaction: Ambient shimmer; press microfeedback
- Trigger: Continuous shimmer; hover/active adjust highlight
- Visual effect: Conic shimmer travels around border (`animate-shimmer-slide`/`spin-around`), with inner highlight adjusting on hover/active; button translates 1px on press
- Duration: Shimmer speed via `--speed` (default 3s, infinite); highlight transitions 300ms
- Use: Premium/marketing actions that benefit from motion accenting

**Pulsating Button — Ambient Pulse**
- Interaction: Ambient attention cue
- Trigger: Idle state of the button
- Visual effect: Soft box-shadow pulse (`@keyframes pulse`) emanating from button background
- Duration: Configurable via `--duration` (default 1.5s, ease-out, infinite)
- Use: Draw subtle attention to secondary CTAs without hover dependency

**Dock — Proximity Magnification**
- Interaction: Hover proximity scaling
- Trigger: Mouse move across dock
- Visual effect: Icons scale with a spring based on distance to cursor (mass 0.1, stiffness 150, damping 12)
- Duration: Spring-based (responsive, no fixed time)
- Use: Dense icon bars where spatial proximity conveys focus

**Animated Subscribe Button — State Toggle Transition**
- Interaction: Click toggles subscribed/unsubscribed states
- Trigger: Click on button
- Visual effect: Crossfade between labels with slight slide on exit (`exit: x: 50, duration: 0.1`); parent opacity fades (`AnimatePresence`)
- Duration: ~0.1s for exiting label; default opacity transitions for enter/exit
- Use: Binary follow/subscribe interactions with clear state change

**Blur Fade — In-View Reveal**
- Interaction: Reveal on enter viewport
- Trigger: Element enters view (useInView)
- Visual effect: Fade + position offset + blur reduction to 0 (`ease: easeOut`)
- Duration: Default 0.4s, optional delay
- Use: Staggered content entrance without heavy motion

**Number Ticker — Count Animation**
- Interaction: In-view numeric tick
- Trigger: Element enters view, optional delay
- Visual effect: Spring to target number (stiffness 100, damping 60)
- Duration: Spring-based; perceived 300–800ms depending on delta
- Use: KPIs and metrics that benefit from live counting

**Scroll Progress — Top Bar Fill**
- Interaction: Scroll feedback
- Trigger: Page scroll
- Visual effect: Fixed 1px gradient bar whose `scaleX` reflects `scrollYProgress`
- Duration: Scroll-coupled (no fixed duration)
- Use: Long pages to communicate reading progress
