magicui-analysis / 04-animation-guidelines.md

**Observed Duration Standards**
- Hover/press transitions: 300ms (`transition-all/opacity duration-300` in hover buttons, magic-card overlays)
- In-view reveals: 0.4s ease-out (BlurFade)
- Press ripple: ~600ms ease-out (RippleButton `--duration` default)
- Ambient effects: multi-second loops (ShimmerButton `--speed` ~3s; PulsatingButton `--duration` ~1.5s)
- List item entrance: spring-based, perceptually ~250–400ms (AnimatedList)

**Easing & Curves**
- Ease-out for entrances and hover transitions (BlurFade, many `transition-*` utilities)
- Springs for proximity/mass or value interpolation (Dock icon scale; NumberTicker count)
- Linear for scroll-coupled or continuous effects (ScrollProgress bar scale)

**Preferred Motion Primitives**
- Opacity + small positional offset (BlurFade)
- Scale (Dock icons, dot indicator), translate X for label swaps (InteractiveHoverButton)
- Background/gradient motion (MagicCard border glow, ShimmerButton perimeter)
- Value interpolation (NumberTicker; SVG stroke dasharray in CircularProgress)

**When to Be Subtle vs Visible**
- Subtle: hover affordances, card emphasis, in-view reveals (keep < 400ms, low offset/blur)
- Visible: progress indicators, perimeter shimmer, dock magnification (but retain smoothness and restraint)

Notes
- All patterns animate GPU-friendly properties (opacity, transform, stroke-dasharray); no repository-wide rules file detected beyond per-component settings.
