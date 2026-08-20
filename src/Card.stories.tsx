import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, PRESETS } from "./index";
import type { CardFill, CardPad, CardPreset, CardTone } from "./index";
import { Swatch } from "./stories/CodeSwatch";
import "./Card.stories.css";

const tones: CardTone[] = [
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "danger",
  "neutral",
];
const fills: CardFill[] = ["glass", "surface", "elevated", "gradient", "outline"];
const pads: CardPad[] = ["none", "sm", "md", "lg"];
const presets = Object.keys(PRESETS) as CardPreset[];

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="ic-story-section">
      <div className="ic-story-section__header">
        <div>
          <h3 className="ic-story-section__title">{title}</h3>
          {description ? <p className="ic-story-section__description">{description}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

function StoryFrame({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="ic-story">
      <header className="ic-story__hero">
        <div>
          <p className="ic-story__eyebrow">IC / component specimen</p>
          <h2 className="ic-story__title">{title}</h2>
          <p className="ic-story__lede">{description}</p>
        </div>
        <div className="ic-story__axes" aria-label="Card design axes">
          <span>tone</span>
          <span>fill</span>
          <span>pad</span>
        </div>
      </header>
      <div className="ic-story__body">{children}</div>
    </main>
  );
}

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A token-driven container with independent tone, fill, and pad axes. " +
          "Pass `href` to render an anchor, `onClick` to get button semantics; " +
          "explicit axis props override named presets.\n\n" +
          "Every card below prints its own JSX underneath it — click the code to copy it. " +
          "The story-level **Show code** panel shows the surrounding loop, so the per-card " +
          "snippet is the one to copy.",
      },
    },
  },
  args: {
    children: "Quarterly revenue",
    pad: "md",
    noBorder: false,
    fullHeight: false,
    disabled: false,
  },
  argTypes: {
    tone: {
      control: "select",
      options: tones,
      description: "Colour identity.",
    },
    fill: {
      control: "select",
      options: fills,
      description: "How the tone is applied to the surface.",
    },
    pad: {
      control: "inline-radio",
      options: pads,
      description: "Inner padding scale.",
    },
    variant: {
      control: "select",
      options: [undefined, ...presets],
      description: "Named preset. Explicit axis props take precedence.",
    },
    accent: {
      control: "text",
      description: "Top accent strip. Any CSS colour string.",
    },
    href: {
      control: "text",
      description: "When set, renders an anchor instead of a div.",
    },
    interactive: {
      control: "boolean",
      description: "Hover/focus lift. Defaults to on for a clickable card.",
    },
    as: {
      control: false,
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ children, variant, tone, fill, pad, accent, href, interactive, noBorder, fullHeight, disabled }) => (
    <StoryFrame
      title="Card workbench"
      description="Tune the axes in Controls. The specimen and its paste-ready JSX update together."
    >
      <Section title="Live specimen" description="Click the dark code panel to copy this exact setup.">
        <div className="ic-story-grid">
          <Swatch
            variant={variant}
            tone={tone}
            fill={fill}
            pad={pad}
            accent={accent}
            href={href}
            interactive={interactive}
            noBorder={noBorder}
            fullHeight={fullHeight}
            disabled={disabled}
          >
            {typeof children === "string" ? children : "Quarterly revenue"}
          </Swatch>
        </div>
      </Section>
    </StoryFrame>
  ),
};

export const Presets: Story = {
  render: () => (
    <StoryFrame
      title="Preset index"
      description="glass/surface/elevated/outline/danger are the starterkit's own old Card values; primary/secondary/accent/success/warning are the roles the new token ABI defines. Convenience aliases only — never a separate styling API."
    >
      <Section
        title="Named presets"
        description="Each resolves to the same orthogonal axes shown in Controls."
      >
        <div className="ic-story-grid">
          {presets.map((variant) => (
            <Swatch key={variant} variant={variant}>
              {variant}
            </Swatch>
          ))}
        </div>
      </Section>
    </StoryFrame>
  ),
};

export const AxisMatrix: Story = {
  render: () => (
    <StoryFrame
      title="Tone × fill atlas"
      description="Every surface treatment against every colour identity. The old variant list could only reach the diagonal."
    >
      {fills.map((fill) => (
        <Section
          key={fill}
          title={fill}
          description={
            fill === "gradient"
              ? "neutral publishes no gradient, so that one cell degrades to `surface` rather than rendering an invisible box."
              : undefined
          }
        >
          <div className="ic-story-grid">
            {tones.map((tone) => (
              <Swatch key={tone} tone={tone} fill={fill}>
                {tone}
              </Swatch>
            ))}
          </div>
        </Section>
      ))}
    </StoryFrame>
  ),
};

export const Padding: Story = {
  render: () => (
    <StoryFrame
      title="Padding scale"
      description="Inner rhythm, independent of colour. `none` exists for media cards, where an image has to bleed to the corners."
    >
      <Section title="pad">
        <div className="ic-story-grid">
          {pads.map((pad) => (
            <Swatch key={pad} pad={pad} fill="surface">
              {pad}
            </Swatch>
          ))}
        </div>
      </Section>
    </StoryFrame>
  ),
};

export const States: Story = {
  render: () => (
    <StoryFrame
      title="Behaviour states"
      description="Lift, accent, links and the dead state as real interactive elements — not static approximations. Tab through them: focus gets the same treatment as hover."
    >
      <Section
        title="Interaction"
        description="A static card never lifts; a clickable one opts in automatically."
      >
        <div className="ic-story-grid">
          <Swatch fill="surface">Static</Swatch>
          <Swatch fill="surface" interactive>
            Lifts on hover
          </Swatch>
          <Swatch href="#card-link" fill="surface">
            Anchor card
          </Swatch>
          <Swatch href="#dead-link" fill="surface" disabled>
            Disabled anchor
          </Swatch>
        </div>
      </Section>
      <Section
        title="Accent strip"
        description="Drawn as a pseudo-element so a hover border-color change cannot wipe it."
      >
        <div className="ic-story-grid">
          <Swatch fill="glass" accent="#4DB3FF" interactive>
            Cobalt accent
          </Swatch>
          <Swatch fill="glass" accent="#B3D335" interactive>
            Mint accent
          </Swatch>
          <Swatch fill="surface" accent="#f43f5e" noBorder>
            Accent, no border
          </Swatch>
        </div>
      </Section>
    </StoryFrame>
  ),
};

export const OnAColouredSurface: Story = {
  render: () => (
    <StoryFrame
      title="Context surfaces"
      description="Glass is the one fill whose whole point is what shows through it — so it is shown over an expressive surface rather than a flat page."
    >
      <div className="ic-story-context">
        <Section
          title="Glass over a gradient"
          description="A flat canvas hides what glass does. This panel stays dark in either Scheme — a per-subtree scheme is a case the card has to survive, not just a screenshot."
        >
          <div className="ic-story-grid">
            <Swatch fill="glass" inverse interactive>
              Glass
            </Swatch>
            <Swatch fill="outline" tone="accent" inverse interactive>
              Outline
            </Swatch>
            <Swatch fill="gradient" tone="primary" inverse interactive>
              Gradient
            </Swatch>
          </div>
        </Section>
      </div>
    </StoryFrame>
  ),
};

/**
 * The KPI and feature cards in the starterkit are compositions, not variants —
 * they are this component plus content. Kept here as a worked example rather
 * than shipped as API: their typography and trend pills are product decisions,
 * and baking them in would put the library back in the business of guessing.
 */
export const Composition: Story = {
  render: () => (
    <StoryFrame
      title="Composition"
      description="A KPI card and a feature card are Card plus content. Neither needs a new variant."
    >
      <Section title="Built from the primitive">
        <div className="ic-story-grid">
          <Card fill="glass" accent="#4DB3FF" interactive>
            <p className="ic-demo-eyebrow">Monthly recurring</p>
            <p className="ic-demo-value">$48.2k</p>
            <p className="ic-demo-sub">vs $41.9k last month</p>
          </Card>
          <Card fill="gradient" tone="primary">
            <p className="ic-demo-eyebrow">Featured</p>
            <p className="ic-demo-title">Automated reconciliation</p>
            <p className="ic-demo-body">
              Matches ledger entries against settlement files, then flags only what disagrees.
            </p>
          </Card>
          <Card as="article" fill="outline" tone="accent" interactive>
            <p className="ic-demo-eyebrow">Semantic</p>
            <p className="ic-demo-title">as=&quot;article&quot;</p>
            <p className="ic-demo-body">
              The wrapper element is a prop, so a card in a feed can be an article and a card in a
              list can be an li.
            </p>
          </Card>
        </div>
      </Section>
    </StoryFrame>
  ),
};
