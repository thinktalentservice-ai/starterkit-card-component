import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Card } from "../Card";
import type { CardFill, CardPad, CardPreset, CardTone } from "../axes";
import "./CodeSwatch.css";

/**
 * Storybook's "Show code" panel shows the SOURCE OF THE STORY, so a matrix
 * story that maps over the axes documents the loop — not the card. A reader
 * looking at the third card in the second row still has to count rows to work
 * out which `fill` produced it.
 *
 * A Swatch fixes that by printing each card's own JSX underneath it. The
 * snippet is derived from the very props object that is spread onto `Card`, so
 * the two cannot drift: change the swatch and the code changes with it.
 *
 * This file is story-only scaffolding. `package.json#files` ships `dist` alone
 * and tsup builds from `src/index.ts`, so nothing here reaches consumers.
 */

export interface SwatchProps {
  variant?: CardPreset;
  tone?: CardTone;
  fill?: CardFill;
  pad?: CardPad;
  accent?: string;
  href?: string;
  interactive?: boolean;
  noBorder?: boolean;
  fullHeight?: boolean;
  disabled?: boolean;
  /** Restricted to a string so the printed snippet is always the literal JSX. */
  children: string;
  /** Story-only scaffolding rendered inside the card. Never printed. */
  body?: ReactNode;
}

// Printed in this order regardless of how the swatch was written, so two
// swatches with the same axes always produce a byte-identical snippet.
const STRING_PROPS = ["variant", "tone", "fill", "pad", "accent", "href"] as const;
const BOOLEAN_PROPS = ["interactive", "noBorder", "fullHeight", "disabled"] as const;

export function formatCardSnippet(props: SwatchProps): string {
  const parts: string[] = [];

  for (const key of STRING_PROPS) {
    const value = props[key];
    if (value !== undefined) parts.push(`${key}="${value}"`);
  }
  // `disabled={false}` is noise in a snippet meant to be pasted — a JSX boolean
  // is only worth printing when it is on, and then only as a bare attribute.
  for (const key of BOOLEAN_PROPS) {
    if (props[key]) parts.push(key);
  }

  const attrs = parts.length > 0 ? ` ${parts.join(" ")}` : "";
  return `<Card${attrs}>${props.children}</Card>`;
}

/** Non-secure contexts (plain-http Storybook on a LAN host) have no async clipboard. */
function copyFallback(text: string): void {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  document.body.removeChild(area);
}

/**
 * One card plus the exact JSX that produced it. Click the code to copy it.
 */
export function Swatch({ inverse = false, ...props }: SwatchProps & { inverse?: boolean }) {
  const code = formatCardSnippet(props);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Without this, unmounting a swatch mid-flash (docs re-render on every args
  // change) leaves a timeout writing state into a dead component.
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      copyFallback(code);
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1200);
  };

  const { children, body, href, ...axes } = props;

  return (
    <article className="ic-specimen" data-inverse={inverse || undefined}>
      <div className="ic-specimen__stage">
        {href !== undefined ? (
          <Card href={href} {...axes}>
            {children}
            {body}
          </Card>
        ) : (
          <Card {...axes}>
            {children}
            {body}
          </Card>
        )}
      </div>
      <button
        type="button"
        onClick={copy}
        className="ic-specimen__code"
        data-copied={copied || undefined}
        aria-label={`Copy code: ${code}`}
      >
        <span className="ic-specimen__code-meta" aria-hidden="true">
          <span>JSX</span>
          <span className="ic-specimen__copy-state">
            {copied ? (
              <>
                <CheckIcon />
                Copied
              </>
            ) : (
              <>
                <CopyIcon />
                Copy
              </>
            )}
          </span>
        </span>
        <code>{code}</code>
        <span className="ic-visually-hidden" aria-live="polite">
          {copied ? "Code copied to clipboard" : ""}
        </span>
      </button>
    </article>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <rect x="5.25" y="5.25" width="7.5" height="7.5" rx="1.5" />
      <path d="M10.75 5.25V4A1.75 1.75 0 0 0 9 2.25H4A1.75 1.75 0 0 0 2.25 4v5A1.75 1.75 0 0 0 4 10.75h1.25" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="m3 8.25 3.1 3.1L13 4.65" />
    </svg>
  );
}
