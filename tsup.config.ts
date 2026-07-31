import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  // NOT `treeshake: true`. That option post-processes the bundle through rollup,
  // which strips module-level directives — it silently removed the "use client"
  // banner below and shipped a build Next would treat as a server component.
  // esbuild already tree-shakes when bundling, so the option bought nothing.
  target: "es2020",
  // React is a peer dep — never bundle it, or consumers get two Reacts.
  external: ["react", "react-dom"],
  // esbuild strips top-of-file directives, so "use client" is re-attached to
  // every output chunk. Without it, Next's RSC compiler treats the card (which
  // attaches onClick and onKeyDown) as a server component.
  banner: { js: '"use client";' },
  outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".js" }),
});
