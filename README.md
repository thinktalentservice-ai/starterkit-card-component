# @devopsnext/starterkit-card-component

The Obsidian design-system card, extracted from the Next.js starterkit into a standalone package.

Zero runtime dependencies. React is a peer dep. All styling is CSS — the component renders data attributes and nothing else.

```bash
pnpm add @devopsnext/starterkit-card-component
```

```jsx
import { Card } from "@devopsnext/starterkit-card-component";
import "@devopsnext/starterkit-card-component/styles.css"; // once, at your app root

<Card fill="glass" accent="var(--primary)">…</Card>
<Card variant="primary" pad="lg">…</Card>
<Card as="article" fill="surface" onClick={open}>…</Card>
<Card href="/reports/42" fill="elevated">…</Card>
```

## Three orthogonal axes

There is no variant lookup table. The pre-extraction card had one — `glass | surface | elevated | cobalt | violet | mint | amber` — and it quietly mixed two unrelated decisions: how the surface is treated, and which brand hue fills it. A list like that grows a row per screenshot. There was no `danger` card because nobody had needed one, and no toned outline at all.

`tone` is a semantic **role**, not a hue — it follows `@devopsnext/starterkit-theme`'s token ABI, which renamed every hue-named custom property (mint, cobalt, electric, amber, rose, …) to a role name with no same-named replacement.

| Axis   | Values                                                              | Default   |
| ------ | --------------------------------------------------------------------| --------- |
| `tone` | `primary` `secondary` `accent` `success` `warning` `danger` `neutral` | `neutral` |
| `fill` | `glass` `surface` `elevated` `gradient` `outline`                    | `glass`   |
| `pad`  | `none` `sm` `md` `lg`                                                | `md`      |

A `tone` publishes `--ic-ch` (an `r g b` channel triplet), `--ic-grad`, `--ic-ink` (the family's measured on-solid ink), `--ic-mark` (the family's own border-ready colour) and `--ic-hover-bg` (the family's tinted background). A `fill` consumes them and knows nothing about which tone supplied them. Adding a tone is one CSS rule and it combines with every fill for free.

One cell in the grid is not universal: `neutral` publishes no gradient, so `fill="gradient" tone="neutral"` would be an invisible box with white text. It degrades to `surface` rather than disappearing.

`neutral` also splits identity from interaction: it draws its outline and focus ring from `--fg1-channel` (grey is what "no colour chosen" should look like) but hovers in `primary`, which is what the pre-extraction card did on every neutral surface (cobalt, pre-rename).

### Presets

`variant` is a named alias for a point in axis space. It is a convenience layer, never a source of styling — `variant="primary"` and `tone="primary" fill="gradient"` produce byte-identical DOM. Explicit axis props win over the preset.

| `variant`   | equals                        |
| ----------- | ------------------------------|
| `glass`     | `tone=neutral fill=glass`     |
| `surface`   | `tone=neutral fill=surface`   |
| `elevated`  | `tone=neutral fill=elevated`  |
| `outline`   | `tone=neutral fill=outline`   |
| `primary`   | `tone=primary fill=gradient`  |
| `secondary` | `tone=secondary fill=gradient`|
| `accent`    | `tone=accent fill=gradient`   |
| `success`   | `tone=success fill=gradient`  |
| `warning`   | `tone=warning fill=gradient`  |
| `danger`    | `tone=danger fill=gradient`   |

`glass`/`surface`/`elevated`/`outline`/`danger` are unchanged from the starterkit's old `variant` values. The other four colour presets are renamed from hue words to roles — `primary` replaces `cobalt`, `secondary` replaces `violet`, and `accent`/`warning` are new names for roles the old ABI didn't separate out this way. **There is no `variant="mint"` any more**: mint and cobalt both map to the `primary` role under the new ABI, `primary` keeps cobalt's slot (this package's own docs already called cobalt the "featured" hue), and mint's preset is dropped rather than silently overwriting it. A caller that needs mint's old look picks `tone="accent"` or `tone="success"` and reviews the result.

## Other props

| Prop          | Notes                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------- |
| `interactive` | Hover **and** focus lift. Defaults to `true` for a clickable card, `false` otherwise — a card that moves under the pointer but does nothing when clicked is a lie about affordance. |
| `accent`      | Top accent strip, any CSS colour. Drawn as a pseudo-element, so a hover `border-color` change cannot wipe it. |
| `noBorder`    | Border goes transparent, not `none` — dropping it would shrink the box by 2px and shift everything inside. |
| `fullHeight`  | `height: 100%`, for cards that must line up in a grid row.                                   |
| `pad="none"`  | For media cards: an image that bleeds to the corners cannot do it from inside padding.        |
| `as`          | `div` (default) `article` `section` `aside` `li`. Ignored when `href` is set.                 |
| `href`        | Renders `<a>`. The prop type is discriminated on it: with `href` you get anchor attributes (`target`, `rel`, `download`), without it you get `as`. |
| `onClick`     | Gives the card `role="button"`, a tab stop, and Enter/Space activation.                       |
| `disabled`    | Only meaningful on a clickable card. Blocks activation, drops the tab stop, announces the state. |
| `ref`         | Forwarded to the underlying element.                                                          |

Anything else is forwarded to the underlying element.

## Token contract

**Your token source is primary; `styles.css` is the backup.** Every token the component reads is aliased once on `.ic-card` as `var(--your-token, <vendored default>)`. A CSS fallback applies only to an *absent* custom property, so wherever you define the token it wins — no import order to get right, no `@layer`, and nothing you have to load first. Where you don't define it, the vendored value renders the card anyway.

`styles.css` declares **nothing on `:root`** and imports nothing. It will not hand your page a `--border` or a `--surface`, and it makes no network request. Component rules are deliberately *unlayered*, so they beat unlayered global resets such as Tailwind preflight on specificity.

The vendored defaults are a generated copy of the [Obsidian token sheet](https://cdn.thinktalentws48.click/starterkit/colors_and_type.css) — `pnpm sync:tokens` refetches it, `pnpm sync:tokens:check` fails when the copy has drifted, and `--source=<path>` reads a local checkout instead of the CDN. Only tokens the CSS actually uses are vendored; the seed list is scraped from `styles.css` itself, so it cannot fall out of date. If your app already loads that sheet, every default is overridden and none of this is reachable.

Tokens read: `--{primary,secondary,accent,success,warning,danger}` (the family's own border-ready mark) · `--{primary,secondary,accent,success,warning,danger,fg1}-channel` · `--{primary,secondary,accent,success,warning,danger}-on-solid` (the measured ink) · `--{primary,secondary,accent,success,warning,danger}-bg` (tinted hover background) · `--gradient-{primary,secondary,accent,success,warning,danger}` · `--surface` `--surface-elevated` `--fg1` `--border` · `--glass-bg` `--glass-border` · `--shadow-card` `--shadow-elevated` · `--radius-card` `--ease-entrance`

Light mode is keyed off `[data-mui-color-scheme="light"]` (what the Obsidian sheet uses) **or** `[data-theme="light"]` on any ancestor; with neither attribute present, `prefers-color-scheme` decides.

Three things the package owns rather than borrows:

- `--ic-card-focus-ring` — focus ring colour. Unset by default.
- `--ic-glow-a` / `--ic-glow-a-far` / `--ic-glow-a-hover` — glow alphas, `0.35 / 0.12 / 0.45` dark and `0.20 / 0.06 / 0.28` light. Every glow is derived from the card's own tone channel rather than the sheet's per-family `--glow-*` constants, which is what makes `tone="danger"` cost zero new CSS and covers `neutral`'s hover glow, which has no family constant to reach for at all. Only the alpha is scheme-dependent — the same 0.35 that reads as a halo on the void surface reads as a smear on white.
- `--ic-depth` — the drop-shadow colour under a lifted card.
- `--ic-on-grad` — label colour on a gradient fill. Defaults to `--ic-ink`, the tone's own **measured** `--<role>-on-solid` — legible on both the resting and hovered fill, never a hardcoded white. Gradient fills are for headings and short labels; set `--ic-on-grad` directly if body copy on one needs a different ink than the measured default.

## Why no JS styling

The pre-extraction card was already mostly CSS, and this package finishes the job. Hover, focus and the accent strip are CSS rules selected by data attributes, because:

- `:hover` cannot be faked with `onMouseOver`/`onMouseOut` — fast pointer movement or a re-render mid-hover leaves a card stuck in its lifted state.
- `:focus-visible` is impossible in JS. `onFocus` fires for mouse clicks too, so a JS focus ring punishes mouse users while telling you nothing about keyboard navigation.
- a lift written in JS cannot be turned off by `prefers-reduced-motion`, which is exactly where it belongs.

The only JS-computed attribute is `data-interactive`, which is state rather than style.

## Accessibility

- Every hover rule is also a `:focus-visible` rule. A keyboard user reaching a card sees what a mouse user sees.
- A clickable card is a `div[role="button"]`, **never** a real `<button>` — a button may not contain interactive descendants, and cards routinely hold links, menus and their own buttons. The cost is that native behaviour has to be written out, and it is: Enter activates on keydown, Space on keyup (that is the native split — holding Space on a button fires nothing until release), Space is `preventDefault`-ed so the page does not scroll, and a keypress that originated inside a nested control never activates the card.
- A disabled `<a>` is inert **by construction** — `<a>` ignores the `disabled` attribute, so the href is dropped, `onClick` is detached, `tabIndex` is forced to `-1`, `aria-disabled` is set, and `pointer-events` is killed in CSS. A caller-supplied `tabIndex` cannot resurrect it.
- `prefers-reduced-motion`: the lift is removed, the colour and shadow changes stay — they are the part that says *focused*, not the part that moves.
- `forced-colors`: gradients, alpha washes and shadows are all dropped by the OS, which would leave every fill as the same flat rectangle with no edge. A system border restores the boundary and the accent strip is redrawn in `Highlight`. No `forced-color-adjust` override — the user's palette wins.

## What this is not

`KpiCard` and `FeatureCard` stay in the starterkit. They are **compositions** — this component plus content — and their trend pills, number typography and icon wells are product decisions. Shipping them here would put the library back in the business of guessing what goes inside a card. The `Composition` story shows both built from the primitive.

No skeleton/loading state in v1: a card does not know the shape of what it is waiting for, so a useful skeleton has to be composed too.

## Development

```bash
pnpm install
pnpm verify           # tsc --noEmit && vitest run && tsup
pnpm storybook        # local component workshop on port 6007
pnpm build-storybook  # refresh the GitHub Pages site in docs/
```

Storybook's `preview.css` **does** `@import` the live token sheet, unlike the shipped `styles.css`. That file is workshop scaffolding and never reaches a consumer, so the stories render against the real current tokens rather than the vendored fallbacks — an upstream token change shows up in the docs instead of hiding behind a stale copy.

`tsc` in strict mode is the type gate; there is no ESLint here on purpose — the version pinned in the consuming starterkit is broken, and a second lint config that disagrees with it is worse than none.

The test suite asserts behaviour and the DOM contract the CSS selects on, not appearance. Rename `data-fill` and every rule in `styles.css` silently stops matching — no type checker catches that, so the tests pin it.
