# Lumière Haircare — Design Direction

## Three stylistic approaches

### Approach 1 — Botanical Editorial Luxury
Very warm, tactile, and campaign-led: ivory space, deep botanical green, muted champagne, and high-fashion serif typography. The page feels like a beauty magazine spread transformed into a calm, premium ritual.

**Probability:** 0.07

### Approach 2 — Modern Apothecary Minimalism
A quieter, studio-led direction with pale stone, ink, brushed metal, and precise product architecture. The mood is clinical in its restraint but softened by organic textures and close-up botanical photography.

**Probability:** 0.03

### Approach 3 — Golden Hour Cinema
A darker, more sensual campaign system built around warm shadow, amber light, black glass, and slow, filmic movement. The page would feel like a fragrance film with a beauty ritual at its center.

**Probability:** 0.08

## Chosen approach: Botanical Editorial Luxury

### Design Movement
Contemporary luxury editorial design, drawing from art-direction-led beauty campaigns, fashion lookbooks, and tactile botanical still life rather than conventional e-commerce templates.

### Core Principles
1. **Ritual before retail:** product selling is nested inside a quiet, sensory story.
2. **Asymmetry with intention:** layouts should feel composed like magazine spreads, using offset images, narrow text columns, and generous negative space.
3. **Warmth through material:** marble, paper grain, brushed gold, deep green, soft natural light, and botanical forms carry the visual identity.
4. **Restraint in motion:** movement is slow, soft, and purposeful; never bouncy, noisy, or decorative for its own sake.

### Color Philosophy
The palette uses warm ivory as an exhale, deep botanical green as grounding, rich ink as a sign of confidence, and muted champagne as a precise glint rather than a full surface. Gold appears only at moments of emphasis so it retains the feeling of something discovered: a foil detail, a hairline rule, a tiny icon, or the light catching glass.

### Layout Paradigm
A scroll-led editorial composition with full-bleed visual chapters alternating with narrow reading columns. The structure favors split planes, offset media, overlapping captions, horizontal ingredient shelves, and a few intentionally framed product moments over repetitive equal cards.

### Signature Elements
- A thin champagne rule with a small diamond marker to introduce chapters.
- Oversized italic serif emphasis paired with small tracked uppercase labels.
- Botanical linework and contour-like arcs that echo the silhouette of a hair strand and reappear as dividers, hover states, and background texture.

### Interaction Philosophy
Interactions should feel like handling a beautiful object. Navigation reveals are quiet, product images respond with a slight lift or scale, drawers glide in with the weight of a portfolio page, and controls use clear labels with generous touch targets. The storefront gives feedback without breaking the mood.

### Animation
Use reveal-on-scroll transitions that combine opacity and a 20–28px upward translate with 700–950ms editorial easing. Product and lifestyle images should use slow scale-in or parallax only on larger screens. Hover states use a 180–260ms transition; buttons compress to 0.97 on press. Keep all non-essential motion behind `prefers-reduced-motion: no-preference` and make mobile motion simpler.

### Typography System
Display: **Cormorant Garamond**, with weight 400 for editorial headlines, 500 for emphasis, and italic 400 for the most expressive lines. Body and UI: **Manrope**, with 400 for reading, 500 for labels, and 600 for action text. Uppercase eyebrow labels use Manrope at 10–11px with 0.18em tracking.

### Brand Essence
**Lumière is a botanical hair-care ritual for modern women who want high-performance nourishment wrapped in a slower, more beautiful daily practice.**

Personality: **luminous, grounded, discerning**.

### Brand Voice
Headlines are poetic but not vague. CTAs are direct and calm. Microcopy is specific, sensory, and never over-promises outcomes. Avoid generic filler and hard-sell urgency.

Example lines:
- “A little more light in the everyday.”
- “Let the ritual linger.”

### Wordmark & Logo
The logo is a compact crescent-and-strand symbol: two slender curved botanical strokes orbit a small champagne diamond, suggesting reflected light moving through hair. It should be used as a standalone mark in the header and footer, paired with a text wordmark rendered in the chosen serif/sans system rather than relying on default browser type.

### Signature Brand Color
**Lumière Moss — `#29483C`**. A deep, softened botanical green that feels mature, natural, and ownable against warm ivory and champagne.

## Implementation reminders
- Keep the hero cinematic and the text overlay minimal; never cover the main product action in the source video.
- Prefer asymmetric editorial compositions and whitespace over repeated card grids.
- Use real/generated visual assets only in prominent areas; keep lower-importance sections restrained.
- Document this direction at the top of every authored CSS/component/page file.
- When in doubt, ask: **Does this choice reinforce or dilute our design philosophy?**

## Style Decisions
- Use generated asset URLs directly in JSX, preferring compressed variants for below-the-fold imagery.
- Use the supplied product video as the first-viewport visual anchor with a generated product still as fallback.
- Keep commerce interactions functional-looking but clearly front-end-only until a live commerce backend is connected.
- Do not fabricate customer reviews or ratings; the testimonial area is intentionally omitted from this static build rather than filled with invented customer content.
- Treat the product collection as a curated visual shelf, not a generic catalog grid.
