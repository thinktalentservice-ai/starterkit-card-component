"use client";

import { forwardRef } from "react";
import type {
  AnchorHTMLAttributes,
  CSSProperties,
  ForwardedRef,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  Ref,
} from "react";
import { resolveAxes } from "./axes";
import type { CardFill, CardPad, CardPreset, CardTone } from "./axes";

/**
 * This component contains NO styling. Every visual — resting surface, hover
 * lift, focus ring, accent strip — is a CSS rule in `styles.css`, selected by
 * the data attributes rendered below. That is deliberate:
 *
 *   - `:hover` cannot be faked with onMouseOver/onMouseOut. The handler pair
 *     drops events during fast pointer movement and re-render, leaving a card
 *     stuck in its lifted state.
 *   - `:focus-visible` is impossible in JS. onFocus fires for mouse clicks too,
 *     so a JS focus ring punishes mouse users and tells you nothing about
 *     keyboard navigation. This is an accessibility fix, not a refactor.
 *   - a hover rule written in JS cannot be turned off by
 *     `prefers-reduced-motion`, which is where the lift belongs.
 *
 * The only computed attribute is `data-interactive` — pure state, not style.
 */

/** Semantic wrapper. Ignored when `href` is set, which always renders an `<a>`. */
export type CardElement = "div" | "article" | "section" | "aside" | "li";

interface CardOwnProps {
  /** Colour identity. Publishes `--ic-ch` / `--ic-grad` to the fill. */
  tone?: CardTone;
  /** How the tone is applied to the surface. */
  fill?: CardFill;
  /** Inner padding scale. Independent of colour. */
  pad?: CardPad;
  /** Named alias for a point in axis space. Explicit axis props win over it. */
  variant?: CardPreset;
  /**
   * Hover / focus lift. Defaults to `true` for a clickable card (`onClick` or
   * `href`) and `false` otherwise — a card that moves under the pointer but
   * does nothing when clicked is a lie about affordance.
   */
  interactive?: boolean;
  /** Top accent strip. Any CSS colour string; drawn as a pseudo-element. */
  accent?: string;
  /** Suppress the border without touching the background or shadow. */
  noBorder?: boolean;
  /** `height: 100%`, for cards that must line up in a grid row. */
  fullHeight?: boolean;
  /**
   * Only meaningful on a clickable card: blocks activation, removes it from the
   * tab order, and announces the state. A non-clickable card ignores it.
   */
  disabled?: boolean;
  /** Semantic element. Ignored when `href` is set. */
  as?: CardElement;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

type NativeDivProps = Omit<HTMLAttributes<HTMLElement>, keyof CardOwnProps>;
type NativeAnchorProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof CardOwnProps | "href"
>;

/**
 * Discriminated on `href`: pass it and you get an anchor with anchor-only
 * attributes (`target`, `rel`, `download`); omit it and you get the element
 * named by `as`. Mixing them is a compile error rather than a silently ignored
 * prop.
 */
export type CardProps =
  | (CardOwnProps & NativeDivProps & { href?: never })
  | (CardOwnProps & NativeAnchorProps & { href: string; as?: never });

const cx = (...parts: Array<string | undefined | false>): string =>
  parts.filter(Boolean).join(" ");

function CardImpl(props: CardProps, ref: ForwardedRef<HTMLElement>) {
  const {
    tone,
    fill,
    pad = "md",
    variant,
    interactive,
    accent,
    noBorder = false,
    fullHeight = false,
    disabled = false,
    as = "div",
    children,
    className,
    style,
    href,
    onClick,
    onKeyDown,
    ...rest
  } = props as CardOwnProps &
    NativeDivProps &
    NativeAnchorProps & { href?: string; as?: CardElement };

  const axes = resolveAxes({ tone, fill }, variant);

  const clickable = typeof onClick === "function" || href !== undefined;
  const lift = interactive ?? clickable;

  const look = {
    className: cx("ic-card", className),
    "data-tone": axes.tone,
    "data-fill": axes.fill,
    "data-pad": pad,
    ...(lift && !disabled ? { "data-interactive": "" } : {}),
    ...(accent ? { "data-accent": "" } : {}),
    ...(noBorder ? { "data-no-border": "" } : {}),
    ...(fullHeight ? { "data-full-height": "" } : {}),
    // A custom property cannot be expressed in CSSProperties without a cast;
    // the caller's own style object still wins on every real property.
    style: accent ? ({ "--ic-accent": accent, ...style } as CSSProperties) : style,
  };

  if (href !== undefined) {
    // An anchor ignores the `disabled` attribute, so a "disabled" card link
    // would still navigate, still take focus, and still fire onClick. It is
    // made inert by construction instead: no href, no click handler, out of the
    // tab order, pointer-events killed in CSS, and the state announced to
    // assistive tech. These props are spread LAST so a caller's tabIndex or
    // onClick cannot resurrect it.
    const stateProps = disabled
      ? ({ role: "link", "aria-disabled": true, tabIndex: -1 } as const)
      : ({ href, onClick } as const);

    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        {...(rest as NativeAnchorProps)}
        onKeyDown={onKeyDown}
        {...look}
        {...stateProps}
      >
        {children}
      </a>
    );
  }

  // The union of intrinsic tags is narrowed to one of them for JSX's benefit —
  // every member of CardElement takes the same HTMLAttributes, so the cast
  // costs no type safety and avoids a polymorphic-component generic that the
  // consumer would then have to satisfy at every call site.
  const Tag = as as "div";

  if (!clickable) {
    return (
      <Tag
        ref={ref as Ref<HTMLDivElement>}
        {...(rest as NativeDivProps)}
        onKeyDown={onKeyDown}
        {...look}
      >
        {children}
      </Tag>
    );
  }

  /**
   * A clickable non-anchor card is a `<div role="button">`, never a real
   * `<button>`: a button may not contain interactive descendants, and cards
   * routinely hold links, menus and their own buttons. The trade is that every
   * behaviour a real button gives for free has to be written out —
   *
   *   - Enter activates on keydown, Space on keyup. That is the native split:
   *     holding Space on a button scrolls nothing and fires nothing until
   *     release, so Space is preventDefault-ed on keydown to kill page scroll
   *     and acted on at keyup.
   *   - a keypress that originated inside a nested control (a link, an input,
   *     the card's own button) must not also activate the card.
   */
  const activate = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    (onClick as ((e: unknown) => void) | undefined)?.(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled) return;
    // Both branches are gated on the event originating at the card itself.
    // preventDefault() on a bubbled keypress would swallow Enter for the inner
    // link or button that actually received it.
    if (event.target !== event.currentTarget) return;
    if (event.key === " ") event.preventDefault();
    if (event.key === "Enter") {
      event.preventDefault();
      activate(event);
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLElement>) => {
    if (disabled) return;
    if (event.key === " ") {
      event.preventDefault();
      activate(event);
    }
  };

  const stateProps = disabled
    ? ({ role: "button", "aria-disabled": true, tabIndex: -1 } as const)
    : ({
        role: "button",
        tabIndex: 0,
        onClick: onClick as (e: MouseEvent<HTMLElement>) => void,
        onKeyDown: handleKeyDown,
        onKeyUp: handleKeyUp,
      } as const);

  return (
    <Tag ref={ref as Ref<HTMLDivElement>} {...(rest as NativeDivProps)} {...look} {...stateProps}>
      {children}
    </Tag>
  );
}

/**
 * Ref forwarding is required, not decorative: MUI Tooltip/Menu, Popper,
 * IntersectionObserver-driven reveals and scroll-into-view all reach for the
 * underlying node. A card that swallows its ref silently breaks every one.
 */
export const Card = forwardRef(CardImpl);
Card.displayName = "Card";
