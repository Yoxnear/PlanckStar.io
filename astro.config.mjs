// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  devToolbar: {
    enabled: false
  },

  integrations: [
    starlight({
      title: 'PlanckStar UI',
            disable404Route: true,
      customCss: [
        // Path to your Tailwind base styles:
        './src/styles/global.css',
      ],
    }),
  ],
});