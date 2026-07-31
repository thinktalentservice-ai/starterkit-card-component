import { useLayoutEffect } from "react";
import type { Preview } from "@storybook/react-vite";
import "../styles.css";
import "./preview.css";

const preview = {
  parameters: {
    layout: "fullscreen",
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: ["Components", ["Card"]],
      },
    },
  },
  tags: ["autodocs"],
  globalTypes: {
    scheme: {
      description: "Colour scheme the cards render against",
      toolbar: {
        title: "Scheme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  // Light, matching the sibling component workshops — a reader moving between
  // the button's docs and this one should not be handed a different-looking
  // site. The design system's own surfaces are dark-first, so Dark is the other
  // half of the toolbar rather than an afterthought: it is the scheme the
  // vendored token defaults were tuned for, and the only one where glass reads
  // as glass. Both are supported; only the workshop's resting state is light.
  initialGlobals: { scheme: "light" },
  decorators: [
    // Both attributes are set on purpose: `data-mui-color-scheme` is what the
    // Obsidian sheet itself keys off, `data-theme` is this library's alias for
    // hosts not running MUI — setting both exercises the pair that ships.
    //
    // The same value also goes on <html>, because the canvas background lives on
    // `body` and the docs page renders stories in blocks this wrapper does not
    // contain. Attribute rather than a class so the selector matches what a real
    // host looks like.
    (Story, context) => {
      const scheme = context.globals.scheme === "light" ? "light" : "dark";

      useLayoutEffect(() => {
        document.documentElement.dataset.scheme = scheme;
      }, [scheme]);

      return (
        <div data-mui-color-scheme={scheme} data-theme={scheme}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Preview;

export default preview;
