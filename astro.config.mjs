// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import qwikdev from '@qwikdev/astro';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [qwikdev()],
  image: {
    domains: ["images.unsplash.com", "placehold.co"],
    remotePatterns: [{ protocol: "https" }]
  }
});
