// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://spenser.black",
  output: "static",
  integrations: [svelte()],
  markdown: {
    shikiConfig: {
      themes: {
        dark: "gruvbox-dark-soft",
        light: "rose-pine-dawn",
      },
    },
  },
});
