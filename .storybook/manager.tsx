/* The manager bundle is compiled with the CLASSIC JSX runtime, so `React` has
   to be in scope by name — an unused-looking import that the toolbar button
   crashes without. React itself is a manager global, so this resolves against
   Storybook's own copy rather than pulling a second one into the bundle. */
import React from "react";
import { addons, types, useGlobals } from "storybook/manager-api";
import { IconButton } from "storybook/internal/components";

const ADDON_ID = "ic/scheme-toggle";

/* Sun and moon are drawn here rather than imported from @storybook/icons.
   That package ships with Storybook as a TRANSITIVE dependency, so under
   pnpm's strict node_modules layout it is not resolvable from this file —
   importing it would mean adding a direct devDependency to obtain two paths
   the manager already has to download. Inline SVG costs nothing and cannot
   drift out of step with a version bump. */

const Sun = () => (
  <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <circle cx="7" cy="7" r="2.8" />
    <path d="M7 .8v1.4M7 11.8v1.4M13.2 7h-1.4M2.2 7H.8M11.4 2.6l-1 1M3.6 10.4l-1 1M11.4 11.4l-1-1M3.6 3.6l-1-1" />
  </svg>
);

const Moon = () => (
  <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden fill="currentColor">
    <path d="M12.3 8.6A5.6 5.6 0 0 1 5.4 1.7a5.6 5.6 0 1 0 6.9 6.9Z" />
  </svg>
);

/* A named component rather than an inline `render` body: Storybook mounts the
   tool as a component and hooks work either way, but only this form is one to
   React's own naming rule, and the linter is right to hold the line. */
const SchemeToggle = () => {
  const [globals, updateGlobals] = useGlobals();
  /* Anything that is not the string "dark" is light. Same normalisation the
     preview decorator applies, so a hand-edited `?globals=scheme:nonsense` URL
     cannot leave the button and the canvas disagreeing. */
  const dark = globals.scheme === "dark";

  return (
    <IconButton
      active={dark}
      title={dark ? "Switch to light scheme" : "Switch to dark scheme"}
      onClick={() => updateGlobals({ scheme: dark ? "light" : "dark" })}
    >
      {dark ? <Moon /> : <Sun />}
      <span style={{ marginLeft: 6 }}>{dark ? "Dark" : "Light"}</span>
    </IconButton>
  );
};

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    type: types.TOOL,
    title: "Scheme",
    /* Docs pages render stories too, and the whole point of this component is
       that its surfaces flip — so the toggle has to be reachable from the docs
       view, not just the isolated-story view. */
    match: ({ tabId, viewMode }) => !tabId && (viewMode === "story" || viewMode === "docs"),
    render: () => <SchemeToggle />,
  });
});
