# Elyia — Design System

> **More time for what matters.** · *Plus de temps pour l’essentiel.*

Elyia is an AI product studio for small businesses. We design and ship packaged AI
products, subscription apps and custom tools that give small companies more time,
autonomy and freedom. The guiding metaphor: **every business is a rough diamond;
Elyia cuts it so it blazes with light** — the cut is our creativity, the light
passing through is the AI. The feeling is *magical but premium* — never childish
or kitsch.

Surfaces this system dresses:
- **Marketing website** — the public story, offers, proof.
- **Product web app (dashboard)** — the working surface small teams log into.
- **Social / marketing templates** — repeatable posts and announcements.

Voice is warm, clear, a little sparkly, human and reliable — **zero jargon**
("time saved", not "synergies"). French-first, bilingual FR / EN.

---

## Sources

This system was authored **from a written brief only** — no codebase, Figma file,
or existing brand assets were provided. Everything here (colors, type scale, logo
mark, components) is an original interpretation of that brief. If a real
codebase, Figma library, or brand kit exists, share it and this system will be
reconciled against ground truth.

- Codebase: _none provided_
- Figma: _none provided_
- Existing brand assets / logo files: _none provided — mark drawn to brief (see below)_

---

## Content fundamentals — how Elyia writes

**Tone.** Warm, plain-spoken, quietly confident, with an occasional glint of
sparkle. We sound like a trusted maker sitting beside a small-business owner, not
a SaaS vendor. Optimistic without hype.

**Person.** We speak to **you** (the owner / operator) and refer to ourselves as
**we** / **Elyia**. Second person, active voice. "You get your evenings back."
"We build the tool; you keep the freedom."

**Casing.** Sentence case everywhere — headlines, buttons, nav, cards. Reserve
ALL-CAPS for tiny eyebrows/overlines only (tracked out, `--tracking-eyebrow`).
Never Title Case UI labels.

**Jargon.** Banned. Translate every abstraction into lived time and outcomes:
- ✅ "Save 6 hours a week on quotes." ❌ "Optimize your quoting workflow."
- ✅ "Your inbox, sorted before you wake up." ❌ "AI-powered email triage."
- ✅ "Time saved" ❌ "synergies / leverage / solutions"

**Rhythm.** Short sentences. One idea per line. Headlines are often a fragment or
a short claim; let the serif carry the weight. Body copy stays generous and
readable. A dash or a single well-placed metaphor (light, cut, facet, clarity)
is welcome — sparingly.

**Bilingual.** French is primary. Keep FR and EN parallel in length so layouts
don't reflow. Baseline: *"Plus de temps pour l’essentiel."* (EN: *"More time for what matters."*)

**Emoji.** Not used in product or marketing UI. The brand's "sparkle" is carried
by the 4-point spark mark and the fire-gradient facet — never by emoji.

**Sample copy.**
- Hero: *"Your business, cut to catch the light."* / *"Des outils d'IA qui vous rendent du temps."*
- Sub: *"We design and ship AI products that hand small teams their hours back."*
- CTA: *"Start free"* · *"Book a fitting"* (we say "fitting", like a jeweller, not "demo call").
- Empty state: *"Nothing here yet — let's cut the first facet."*

---

## Visual foundations

**The idea in pixels.** A near-white *nacre* page, a deep *anthracite ink* base for
inversion, fine hairlines, and a single facet of colour caught in light. Restraint
is the aesthetic: lots of white space, one accent at a time, soft-but-not-round
corners, and delicate serifs paired with a clean UI sans.

**Colour.**
- **Neutrals** are a near-neutral **anthracite** ramp from `--prune-950` (#161619) through
  `--prune-900` (#232327, *ink*) to `--prune-50` (#F7F6FC, *nacre*), with only a
  whisper of violet in the light greys. Almost everything is built from these.
  (The `--prune-*` token names are kept for continuity; the base is now anthracite,
  not violet.)
- **Three fires** refract through the stone: **amethyst violet** (primary),
  **turquoise-green**, and **azur blue**. Each has a *pastel* variant (fills, glows,
  dark-mode, the gradient) and a *readable* `-700` variant (AA text/links on nacre).
- **One accent at a time.** A given screen leans on violet *or* turquoise *or*
  azur — never a confetti of all three. The only place all three meet is the
  **fire gradient** (`--gradient-fire`), used for exactly one lit facet / hairline /
  highlight per composition.
- **Status** colours are muted and premium: garnet (danger), amber (warning),
  turquoise (success), azur (info).
- Both **light and dark** themes ship (`[data-theme="dark"]`), tuned for AA.

**Type.** **Belgant Aesthetic** for display & headings — a characterful, high-contrast serif
with real personality (it needs size to sing, so display starts large and leads
tight, `--leading-display` 1.04, slightly negative tracking). **Satoshi** for all
body & UI — a modern, friendly geometric-humanist sans (16px base, 1.6 leading).
The expressive-serif / clean-sans contrast *is* the brand's typographic signature.

**Backgrounds.** Predominantly flat nacre or prune — no busy textures, no
photographic hero washes by default. Permitted accents, used sparingly: a single
**fire-gradient hairline or facet shape**, and a very faint radial *glow*
(`--violet-glow`) behind a hero mark. No repeating patterns, no noise/grain, no
rainbow gradient fields.

**Celestial accents.** A signature decorative layer for hero/section moments:
**fine-line celestial motifs** — elliptical orbits, dotted concentric arcs, a
thin trajectory line (occasionally arrow-tipped), graduated dot sequences, and
4-point stars (one may be "lit" with the fire gradient). Hairline weight (~1px),
low opacity, used sparingly behind or beside content — most magical on
anthracite ink with a soft glow. It carries the brand metaphor (aim for the stars /
freedom) **without the literal decor: never draw planets or moons.** See
`assets/accents-celestial.svg` (inherits `currentColor`) and the *Accents
célestes* card.

**Corners.** Soft, restrained: inputs/buttons `--radius-md` (10px), cards
`--radius-lg`–`--radius-xl` (14–20px), pills for tags/toggles. Never fully rounded
blobs; never sharp 0px on primary surfaces.

**Borders & hairlines.** Fine 1px hairlines (`--border-hairline`,
~10% prune) do most of the separating work — dividers, card edges, table rows.
A 1.5px `--border-strong` for emphasis. Colour borders only to signal accent/focus.

**Shadows.** Soft, low-spread, violet-tinted, layered lightly:
`--shadow-sm/md/lg`. Cards prefer a hairline border + a whisper of `--shadow-sm`
over heavy drop shadows. `--shadow-glow` (violet) is reserved for the primary CTA
or a lifted, focused element — not everywhere.

**Cards.** White (`--surface-card`) on nacre, `--radius-lg`, `1px --border-hairline`,
`--shadow-sm`. On hover they lift gently (translateY(-2px) + `--shadow-md`). In dark
mode, `--prune-900` card on `--prune-950`.

**Elevation & transparency.** Blur/transparency is rare and purposeful: a sticky
top bar may use a translucent nacre with `backdrop-filter: blur(12px)`, and modals
sit over a `rgba(22,22,25,0.5)` scrim. Otherwise surfaces are opaque.

**Motion.** Gentle and premium — **no bounce**. Fades and small rises/settles,
`--ease-out` (cubic-bezier(.22,1,.36,1)), 140–420ms. Entrances translate ≤8px and
fade in. The spark may do a slow, subtle twinkle on hero only. Respect
`prefers-reduced-motion`.

**Hover / press.** Hover = a shade shift (accent → `--accent-hover`) and/or a
1–2px lift; links shift colour. Press = a slightly deeper shade (`--accent-press`)
and a 1px settle (translateY(1px)) — no shrink-scale. Focus = 2px `--focus-ring`
outline, 2px offset.

**Imagery vibe** (when photography is used): cool, calm, natural light with a
faint violet cast; generous negative space; a subtle facet/prism motif welcome.
Avoid warm stocky office clichés, heavy filters, or literal gem photos.

**Layout.** Centered containers (`--container-lg` 1120px typical), generous
vertical rhythm (sections `--space-24`+), left-aligned text, asymmetric white
space. Fixed elements: a slim top bar and (in-app) a left sidebar.

---

## Iconography

- **System:** [**Lucide**](https://lucide.dev) — thin, rounded-join, open line
  icons. Its ~1.75px stroke and geometric calm mirror the line-drawn diamond mark,
  so it's the house set. **⚠️ Substitution:** no icon set was provided in the
  brief; Lucide is a chosen stand-in. If Elyia has (or wants) a bespoke set, swap
  it and update this section.
- **Delivery:** loaded from CDN (`lucide` UMD) in cards/kits, or use inline SVG
  copied from lucide.dev for production. Recommended defaults: `1.75` stroke,
  `currentColor`, `20`/`24`px.
- **Colour:** icons inherit text colour (`currentColor`). Accent-coloured icons
  only when they *are* the accent moment (one per view). Never multicolour icons.
- **The brand marks are not icons:** the diamond mark and the 4-point spark
  (`assets/`) are identity, used for logo/hero/loading — not in icon rows.
- **Emoji / unicode as icons:** never.

---

## Assets

- **Official mark** (client-supplied artwork, transparent PNG) in three finishes:
  `assets/logo-mark-ink.png` (#232327, for light surfaces), `assets/logo-mark-white.png`
  (for dark surfaces) and `assets/logo-mark-fire.png` (violet→turquoise→azur gradient).
- `assets/logo-emblem.png` — the standalone emblem: the white mark on a rounded
  anthracite tile (app icon / avatar / favicon).
- The `Logo` component embeds these and adds the "Elyia" wordmark (Belgant
  Aesthetic, spark-dotted "i") + optional FR tagline; `assets/_src-logo-black.png`
  is the source artwork.
- `assets/spark.svg` — the 4-point geometric spark, standalone.

> **Logo note:** no logo files were provided, so this mark is an **original**
> interpretation of the brief, refined with the client across several rounds to
> the current *spark-in-orbit* direction (simple, celestial, unmistakably “light /
> AI”). The `Logo` component renders it in `auto` / `mono` / `fire` tones.

> **Fonts:** Belgant Aesthetic (display) & Satoshi (body) are **self-hosted** as
> `.otf` files in `assets/fonts/`, declared with local `@font-face` rules in
> `tokens/fonts.css`. Provided by the client; EULA in `uploads/belgan-aesthetic/`.
> Please share licensed font files if you'd like this.

---

## Index / manifest

**Root**
- `styles.css` — global entry point (link this). `@import` list only.
- `readme.md` — this guide.
- `SKILL.md` — portable skill front-matter for Claude Code.

**tokens/** — CSS custom properties
- `fonts.css` · `colors.css` · `typography.css` · `foundations.css` (spacing,
  radii, borders, shadows, motion, layout) · `base.css` (reset + defaults)

**assets/** — `logo-mark-ink.png` · `logo-mark-white.png` · `logo-mark-fire.png` · `logo-emblem.png` · `spark.svg` · `fonts/`

**guidelines/** — foundation specimen cards (Type, Colors, Spacing, Brand groups
in the Design System tab)

**components/** — reusable React primitives (see the `Components` group). Full inventory:
- **brand/** — `Logo` (mark / wordmark / lockup), `Icon` (curated Lucide-style line set)
- **forms/** — `Button`, `IconButton`, `Input`, `Select`, `Checkbox`, `Switch`
- **core/** — `Card`, `Badge`, `Tag`
- **navigation/** — `Tabs`
- **feedback/** — `Dialog`, `Toast`, `Tooltip`

**ui_kits/** — full-screen product recreations
- `marketing/` — public website
- `app/` — product dashboard

**templates/** — social / marketing layout templates

### Intentional additions
- **Icon set (Lucide):** added because the brief specified no icon system; a
  premium UI needs one. Flagged for confirmation above.
