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
  adapter: cloudflare(),
  vite: {
    build: {
      minify: 'terser',
      target: 'esnext',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate vendor chunks for better caching
            vendor: ['astro'],
            ui: ['@astrojs/cloudflare', '@astrojs/sitemap'],
          },
        },
      },
      // Optimize for faster builds
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    // Enable build caching for faster subsequent builds
    server: {
      fs: {
        strict: false,
      },
    },
  },
  // Optimized image configuration for build-time processing
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        format: ['webp', 'avif', 'jpg'],
        quality: 85,
        fallbackFormat: 'jpg'
      }
    },
    domains: ['megawe.net', 'api.megawe.net', 'images.unsplash.com']
  },
  devToolbar: {
    enabled: false,
  },
  experimental: {
    contentIntellisense: true,
  },
  // Performance optimizations
  prefetch: true,
  compressHTML: true,
});
