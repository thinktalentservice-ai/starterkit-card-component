/**
 * The card has three orthogonal axes. Nothing else.
 *
 * The pre-extraction card had a single `variant` list — glass | surface |
 * elevated | cobalt | violet | mint | amber — which quietly mixed two unrelated
 * decisions: how the surface is treated (glass/surface/elevated) and which
 * brand hue fills it (cobalt/violet/mint/amber). A list like that grows a row
 * per screenshot: there was no `danger` card because nobody had needed one, and
 * no way to get a toned outline at all.
 *
 * tone → colour identity. Publishes `--ic-ch` (an "r g b" channel triplet) and
 *        `--ic-grad` for the fills to consume.
 * fill → how that identity is applied to the surface.
 * pad  → inner padding scale. Independent of colour.
 */

export type CardTone = "mint" | "violet" | "amber" | "danger" | "blue" | "neutral";
export type CardFill = "glass" | "surface" | "elevated" | "gradient" | "outline";
export type CardPad = "none" | "sm" | "md" | "lg";

export interface CardAxes {
  tone: CardTone;
  fill: CardFill;
}

export const DEFAULT_AXES: CardAxes = { tone: "neutral", fill: "glass" };

/**
 * Presets are a convenience alias layer — a named point in axis space, never a
 * source of styling. `variant="cobalt"` and `tone="blue" fill="gradient"`
 * produce byte-identical DOM; the preset only fills in axes the caller left
 * unset.
 *
 * The seven names below are exactly the pre-extraction `variant` values, so a
 * consumer migrating from the starterkit's own Card changes an import and
 * nothing else. `danger` and `outline` are new — they cost no new CSS, they
 * were simply unreachable before the split.
 */
export const PRESETS = {
  glass: { tone: "neutral", fill: "glass" },
  surface: { tone: "neutral", fill: "surface" },
  elevated: { tone: "neutral", fill: "elevated" },
  outline: { tone: "neutral", fill: "outline" },
  cobalt: { tone: "blue", fill: "gradient" },
  violet: { tone: "violet", fill: "gradient" },
  mint: { tone: "mint", fill: "gradient" },
  amber: { tone: "amber", fill: "gradient" },
  danger: { tone: "danger", fill: "gradient" },
} as const satisfies Record<string, Partial<CardAxes>>;

export type CardPreset = keyof typeof PRESETS;

// Declared locally rather than pulling in @types/node: this is a browser
// package, and every bundler replaces process.env.NODE_ENV at build time. The
// typeof guard keeps it safe in a runtime that has no `process` at all — at the
// cost of staying quiet there, which is the right way to fail for a warning.
declare const process: { env?: Record<string, string | undefined> } | undefined;

const isDev = () => typeof process !== "undefined" && process?.env?.NODE_ENV !== "production";

const warned = new Set<string>();

/**
 * Explicit axis props always beat the preset, and the preset always beats the
 * default. Unknown preset strings (this package is consumed from plain JS as
 * well as TS) degrade to the defaults instead of rendering an unstyled box.
 *
 * Degrading silently is not good enough on its own: `variant="cobolt"` would
 * render a perfectly normal glass card and nothing would ever say why. The
 * starterkit's Card had prop-types for that; this package uses compile-time
 * types, which a JS caller never sees — hence a dev-only warning, once per bad
 * value. Valid presets never warn; they are supported API, not deprecated.
 */
export function resolveAxes(
  explicit: Partial<CardAxes>,
  preset: CardPreset | undefined,
): CardAxes {
  if (preset !== undefined && PRESETS[preset] === undefined && isDev() && !warned.has(preset)) {
    warned.add(preset);
    console.warn(
      `[@devopsnext/starterkit-card-component] Unknown variant "${preset}" — falling back to ` +
        `tone="${DEFAULT_AXES.tone}" fill="${DEFAULT_AXES.fill}". ` +
        `Valid: ${Object.keys(PRESETS).join(", ")}. ` +
        `Or set tone/fill directly.`,
    );
  }

  const base: Partial<CardAxes> = (preset && PRESETS[preset]) || {};
  return {
    tone: explicit.tone ?? base.tone ?? DEFAULT_AXES.tone,
    fill: explicit.fill ?? base.fill ?? DEFAULT_AXES.fill,
  };
}
