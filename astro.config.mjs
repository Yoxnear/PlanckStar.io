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
      logo: {
        src: '/src/assets/icons/planckstar.svg',
        replacesTitle: true,
      },
      disable404Route: true,
    
    social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Axolotlfire/PlanckStarUI.io',
        },
        { icon: 'x.com', label: 'X.com', href: 'https://x.com/Ramas_te' },
      ],
       sidebar: [
        {
          label: 'Get started',
          autogenerate: { directory: 'Get started' },
        },
        {
          label: 'Components',
          autogenerate: { directory: 'Components' },
        },
        {
          label: 'Backgrounds',
          autogenerate: { directory: 'Backgrounds' },
        },
        {
          label: 'Effects',
          autogenerate: { directory: 'Effects' },
        }
      ],
    }),
  ],
});