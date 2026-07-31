import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import axe from "axe-core";
import { Card } from "./Card";
import { PRESETS, resolveAxes } from "./axes";

/**
 * These tests assert BEHAVIOUR and the DOM contract the CSS selects on — not
 * appearance. Appearance lives in styles.css and is verified visually.
 *
 * The DOM contract is worth pinning: rename `data-fill` here and every rule in
 * styles.css silently stops matching, producing an unstyled box that no type
 * checker would catch.
 */

const attrs = (el: HTMLElement) => ({
  tone: el.getAttribute("data-tone"),
  fill: el.getAttribute("data-fill"),
  pad: el.getAttribute("data-pad"),
});

const cardIn = (container: HTMLElement) => container.firstElementChild as HTMLElement;

describe("axis resolution", () => {
  it("defaults to neutral / glass / md", () => {
    const { container } = render(<Card>Body</Card>);
    expect(attrs(cardIn(container))).toEqual({ tone: "neutral", fill: "glass", pad: "md" });
  });

  it("maps every preset onto axes without styling anything itself", () => {
    for (const name of Object.keys(PRESETS) as Array<keyof typeof PRESETS>) {
      const { container, unmount } = render(<Card variant={name}>{name}</Card>);
      expect(attrs(cardIn(container))).toEqual({ ...resolveAxes({}, name), pad: "md" });
      unmount();
    }
  });

  it("produces identical axes for a preset and its explicit equivalent", () => {
    const { container: viaPreset } = render(<Card variant="cobalt">A</Card>);
    const { container: viaAxes } = render(
      <Card tone="blue" fill="gradient">
        A
      </Card>,
    );
    expect(attrs(cardIn(viaPreset))).toEqual(attrs(cardIn(viaAxes)));
  });

  it("lets an explicit axis override the preset", () => {
    const { container } = render(
      <Card variant="cobalt" tone="danger">
        A
      </Card>,
    );
    // tone overridden, fill still inherited from the preset
    expect(attrs(cardIn(container))).toMatchObject({ tone: "danger", fill: "gradient" });
  });

  it("degrades an unknown preset to the defaults instead of rendering unstyled", () => {
    // Reachable from plain JS consumers, where the union type is not enforced.
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { container } = render(<Card variant={"cobolt" as never}>A</Card>);
    expect(attrs(cardIn(container))).toMatchObject({ tone: "neutral", fill: "glass" });
    // Silent degradation would hide a typo forever; prop-types used to catch it.
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('Unknown variant "cobolt"'));
    warn.mockRestore();
  });

  it("does not warn for a valid preset — presets are supported API, not deprecated", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Card variant="elevated">A</Card>);
    render(<Card variant="danger">B</Card>);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("keeps the ic-card class when a caller passes className", () => {
    const { container } = render(<Card className="mt-4">A</Card>);
    expect(cardIn(container)).toHaveClass("ic-card");
    expect(cardIn(container)).toHaveClass("mt-4");
  });

  it("flags noBorder and fullHeight as data attributes rather than inline styles", () => {
    const { container } = render(
      <Card noBorder fullHeight>
        A
      </Card>,
    );
    expect(cardIn(container)).toHaveAttribute("data-no-border");
    expect(cardIn(container)).toHaveAttribute("data-full-height");
    expect(cardIn(container).getAttribute("style")).toBeNull();
  });
});

describe("element", () => {
  it("renders a div by default and the requested semantic tag otherwise", () => {
    const { container } = render(<Card>A</Card>);
    expect(cardIn(container).tagName).toBe("DIV");
    const { container: article } = render(<Card as="article">A</Card>);
    expect(cardIn(article).tagName).toBe("ARTICLE");
  });

  it("forwards unknown props to the underlying element", () => {
    const { container } = render(<Card data-testid="x" aria-label="Metrics" />);
    expect(cardIn(container)).toHaveAttribute("aria-label", "Metrics");
  });
});

describe("accent", () => {
  // The strip is drawn by CSS from --ic-accent; the component's only job is to
  // publish the custom property and flag the element for the ::before rule.
  it("publishes the colour as a custom property and flags the element", () => {
    const { container } = render(<Card accent="var(--cobalt)">A</Card>);
    expect(cardIn(container)).toHaveAttribute("data-accent");
    expect(cardIn(container).style.getPropertyValue("--ic-accent")).toBe("var(--cobalt)");
  });

  it("does not flag a card without an accent", () => {
    const { container } = render(<Card>A</Card>);
    expect(cardIn(container)).not.toHaveAttribute("data-accent");
  });

  it("keeps a caller's own style properties alongside the accent", () => {
    const { container } = render(
      <Card accent="#fff" style={{ marginTop: 8 }}>
        A
      </Card>,
    );
    expect(cardIn(container).style.marginTop).toBe("8px");
  });
});

describe("interactive state", () => {
  it("stays inert by default — a static card must not lift under the pointer", () => {
    const { container } = render(<Card>A</Card>);
    expect(cardIn(container)).not.toHaveAttribute("data-interactive");
  });

  it("lifts automatically once the card is clickable", () => {
    const { container } = render(<Card onClick={() => {}}>A</Card>);
    expect(cardIn(container)).toHaveAttribute("data-interactive");
    const { container: link } = render(<Card href="/x">A</Card>);
    expect(cardIn(link)).toHaveAttribute("data-interactive");
  });

  it("allows an explicit opt-in without a click handler, and an opt-out with one", () => {
    const { container } = render(<Card interactive>A</Card>);
    expect(cardIn(container)).toHaveAttribute("data-interactive");
    const { container: off } = render(
      <Card interactive={false} onClick={() => {}}>
        A
      </Card>,
    );
    expect(cardIn(off)).not.toHaveAttribute("data-interactive");
  });

  it("drops data-interactive when disabled", () => {
    const { container } = render(
      <Card onClick={() => {}} disabled>
        A
      </Card>,
    );
    expect(cardIn(container)).not.toHaveAttribute("data-interactive");
  });
});

describe("clickable card", () => {
  it("gets button semantics and the tab stop a div does not have on its own", () => {
    render(<Card onClick={() => {}}>A</Card>);
    const el = screen.getByRole("button");
    expect(el).toHaveAttribute("tabindex", "0");
  });

  it("activates on Enter (keydown) and Space (keyup), like a native button", () => {
    const onClick = vi.fn();
    render(<Card onClick={onClick}>A</Card>);
    const el = screen.getByRole("button");

    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalledTimes(1);

    // Space must not fire on keydown — that is the keypress that would also
    // scroll the page, which is why it is preventDefault-ed and acted on at
    // keyup instead.
    fireEvent.keyDown(el, { key: " " });
    expect(onClick).toHaveBeenCalledTimes(1);
    fireEvent.keyUp(el, { key: " " });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  // The reason a clickable card is a div[role=button] and not a <button>: cards
  // hold links and buttons of their own, which a <button> may not contain.
  it("ignores a keypress that originated in a nested control", () => {
    const onClick = vi.fn();
    render(
      <Card onClick={onClick}>
        <button type="button">Inner</button>
      </Card>,
    );
    fireEvent.keyDown(screen.getByText("Inner"), { key: "Enter" });
    expect(onClick).not.toHaveBeenCalled();
  });

  it("still calls a caller's own onKeyDown, and lets it cancel activation", () => {
    const onClick = vi.fn();
    const onKeyDown = vi.fn((e: { preventDefault: () => void }) => e.preventDefault());
    render(
      <Card onClick={onClick} onKeyDown={onKeyDown}>
        A
      </Card>,
    );
    fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
    expect(onKeyDown).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("makes a disabled clickable card inert: no handler, out of tab order", () => {
    const onClick = vi.fn();
    render(
      <Card onClick={onClick} disabled>
        A
      </Card>,
    );
    const el = screen.getByRole("button");
    fireEvent.click(el);
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).not.toHaveBeenCalled();
    expect(el).toHaveAttribute("aria-disabled", "true");
    expect(el).toHaveAttribute("tabindex", "-1");
  });

  it("leaves a non-clickable card free of button semantics", () => {
    const { container } = render(<Card>A</Card>);
    expect(cardIn(container)).not.toHaveAttribute("role");
    expect(cardIn(container)).not.toHaveAttribute("tabindex");
  });
});

describe("anchor mode", () => {
  it("renders an anchor with the href and passes anchor-only attributes through", () => {
    render(
      <Card href="/reports" target="_blank" rel="noreferrer">
        A
      </Card>,
    );
    const el = screen.getByRole("link");
    expect(el.tagName).toBe("A");
    expect(el).toHaveAttribute("href", "/reports");
    expect(el).toHaveAttribute("target", "_blank");
  });

  // An <a> ignores the disabled attribute entirely. This is the riskiest code in
  // the component: get it wrong and a "disabled" card link still navigates.
  it("makes a disabled link inert: no href, out of tab order, aria-disabled", () => {
    render(
      <Card href="/reports" disabled>
        A
      </Card>,
    );
    const el = screen.getByRole("link");
    expect(el).not.toHaveAttribute("href");
    expect(el).toHaveAttribute("aria-disabled", "true");
    expect(el).toHaveAttribute("tabindex", "-1");
  });

  it("detaches onClick from a disabled link so it cannot fire programmatically", () => {
    const onClick = vi.fn();
    render(
      <Card href="/reports" disabled onClick={onClick}>
        A
      </Card>,
    );
    fireEvent.click(screen.getByRole("link"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("ignores a caller tabIndex that would resurrect a disabled link", () => {
    render(
      <Card href="/reports" disabled tabIndex={0}>
        A
      </Card>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("tabindex", "-1");
  });
});

describe("ref forwarding", () => {
  it("forwards to the underlying element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref}>A</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards to the underlying anchor node", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Card ref={ref} href="/reports">
        A
      </Card>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });
});

describe("accessibility", () => {
  /**
   * jsdom performs no layout, so axe's colour-contrast rule cannot run here and
   * is disabled explicitly rather than silently skipped — contrast is verified
   * against the real rendered page, not in this file. What this does catch is
   * role/name/aria-state breakage across the whole axis matrix.
   */
  it("reports no axe violations across the axis matrix", async () => {
    const tones = ["mint", "violet", "amber", "danger", "blue", "neutral"] as const;
    const fills = ["glass", "surface", "elevated", "gradient", "outline"] as const;

    const { container } = render(
      <div>
        {tones.map((tone) =>
          fills.map((fill) => (
            <Card key={`${tone}-${fill}`} tone={tone} fill={fill}>
              {tone} {fill}
            </Card>
          )),
        )}
        <Card onClick={() => {}}>Clickable</Card>
        <Card onClick={() => {}} disabled>
          Disabled
        </Card>
        <Card href="/reports">Link</Card>
        <Card href="/reports" disabled>
          Disabled link
        </Card>
        <Card as="article" accent="#4DB3FF">
          Accented
        </Card>
      </div>,
    );

    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  }, 20000);
});
