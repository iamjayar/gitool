import preprocess from "svelte-preprocess";
import vercel from "@sveltejs/adapter-vercel";
import { resolve } from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: vercel(),
    target: "#svelte",
    vite: {
      resolve: {
        alias: {
          $components: resolve("./src/components"),
        },
      },
    },
  },
};

export default config;
