// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

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
  adapter: cloudflare({
    mode: 'directory'
  }),
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
  // Native image optimization with Sharp for Cloudflare Pages
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        format: ['webp', 'avif', 'jpg'],
        quality: 85,
        fallbackFormat: 'jpg'
      }
    },
    domains: ['megawe.net', 'api.megawe.net', 'images.unsplash.com'],
  },
  devToolbar: {
    enabled: false,
  },
  experimental: {
    contentIntellisense: true,
  },
});
