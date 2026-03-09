magicui-analysis / 05-disallowed-effects.md

Repository status
- No explicit “disallowed effects” guidance is defined in MagicUI sources. Components demonstrate acceptable microinteractions; no central prohibition list exists.

Implications for usage
- Avoid introducing effects not present in the library’s patterns (e.g., large bouncy entrances, heavy 3D flips, disruptive parallax), as they would diverge from the observed motion language (short, smooth, or spring-based).
- Keep hover/press interactions within ~300–600ms and prefer opacity/transform/value animations, consistent with existing components.

**Disallowed Motion Types**
- Large bounce animations: exaggerated spring/bounce that distract from content.
- 3D flips: perspective flips or card-turn effects that break spatial continuity.
- Aggressive parallax: strong layered movement unrelated to intent or scroll.
- Elastic overshoot entrances: elastic-in overshoot on page/card entrance.
- Disruptive motion patterns: any animation that draws focus away from task flow.

**Disallowed Layout Animations**
- Do not animate layout properties: `width`, `height`, `top`, `left`, or properties that cause reflow.
- Avoid animating grid/flex layout reordering that shifts siblings unexpectedly.
- Prefer transform and opacity: `transform` (translate/scale/rotate) and `opacity` are the primary animated properties.

**Motion Duration Constraints**
- Hover: ≤ 300ms (matches observed hover transitions in MagicUI).
- Entrance: ≤ 400ms (aligns with Blur Fade defaults for subtle reveals).
- Press: ≤ 150ms (press feedback must feel immediate; longer motion belongs to post-press effects like ripples).
- Ambient loops: ≥ 1.5s (slow, non-distracting cycles; e.g., pulsating/shimmering effects).
