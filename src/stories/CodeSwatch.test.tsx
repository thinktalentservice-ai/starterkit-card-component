import { fireEvent, render, screen } from "@testing-library/react";
import { Swatch, formatCardSnippet } from "./CodeSwatch";

/**
 * The snippet is the docs' source of truth for "how do I write this card", so
 * it is generated from the same props object the Card receives — never typed
 * out by hand. These tests pin that generation: a swatch whose printed code
 * disagrees with the rendered card is worse than no code at all.
 */

describe("formatCardSnippet", () => {
  it("prints a bare Card when no axes are set", () => {
    expect(formatCardSnippet({ children: "Revenue" })).toBe("<Card>Revenue</Card>");
  });

  it("emits props in a stable order, not insertion order", () => {
    expect(formatCardSnippet({ fill: "gradient", tone: "accent", children: "accent" })).toBe(
      '<Card tone="accent" fill="gradient">accent</Card>',
    );
  });

  it("writes true booleans bare and drops false ones", () => {
    expect(
      formatCardSnippet({ tone: "danger", disabled: true, noBorder: false, children: "Dead" }),
    ).toBe('<Card tone="danger" disabled>Dead</Card>');
  });

  it("keeps href with the other string props", () => {
    expect(
      formatCardSnippet({ href: "#link", tone: "primary", fill: "outline", children: "Anchor" }),
    ).toBe('<Card tone="primary" fill="outline" href="#link">Anchor</Card>');
  });

  it("prints preset, pad and accent", () => {
    expect(
      formatCardSnippet({ variant: "elevated", pad: "lg", accent: "#4DB3FF", children: "lg" }),
    ).toBe('<Card variant="elevated" pad="lg" accent="#4DB3FF">lg</Card>');
  });
});

describe("Swatch", () => {
  it("renders the real Card for the props it prints", () => {
    render(
      <Swatch tone="secondary" fill="outline" pad="sm">
        secondary
      </Swatch>,
    );
    const card = screen.getByText("secondary");
    expect(card.getAttribute("data-tone")).toBe("secondary");
    expect(card.getAttribute("data-fill")).toBe("outline");
    expect(card.getAttribute("data-pad")).toBe("sm");
    expect(
      screen.getByText('<Card tone="secondary" fill="outline" pad="sm">secondary</Card>'),
    ).toBeInTheDocument();
  });

  it("renders an anchor when href is set", () => {
    render(
      <Swatch href="#somewhere" tone="primary">
        Anchor
      </Swatch>,
    );
    expect(screen.getByRole("link", { name: "Anchor" })).toHaveAttribute("href", "#somewhere");
  });

  it("copies its snippet and acknowledges the copy", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<Swatch tone="warning">Ship</Swatch>);
    fireEvent.click(screen.getByRole("button", { name: /copy/i }));

    expect(writeText).toHaveBeenCalledWith('<Card tone="warning">Ship</Card>');
    expect(await screen.findByText(/^Copied$/)).toBeInTheDocument();
  });
});
