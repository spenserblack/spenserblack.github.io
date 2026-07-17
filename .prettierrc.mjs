export default {
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
  plugins: ["prettier-plugin-astro", "prettier-plugin-svelte"],
};
