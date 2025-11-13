// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://megawe.net',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      changefreq: 'daily',
      priority: 1.0,
    }),
  ],
  vite: {
    build: {
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
  image: {
    domains: ['megawe.net', 'api.megawe.net'],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        format: ['webp', 'avif', 'jpg'],
        quality: 85
      }
    }
  },
  devToolbar: {
    enabled: false,
  },
  experimental: {
    contentIntellisense: true,
  },
});
