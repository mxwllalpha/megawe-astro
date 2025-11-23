// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://megawe.net',
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
          manualChunks(id) {
            // Split node_modules into optimized chunks
            if (id.includes('node_modules')) {
              if (id.includes('astro')) {
                return 'astro-vendor';
              }
              if (id.includes('@astrojs')) {
                return 'astro-integrations';
              }
              if (id.includes('tailwind')) {
                return 'tailwind-vendor';
              }
              if (id.includes('sharp')) {
                return 'image-processing';
              }
              return 'vendor';
            }

            // Split large application modules
            if (id.includes('Layout')) {
              return 'layout';
            }
            if (id.includes('client') || id.includes('fetchers')) {
              return 'api';
            }
            if (id.includes('CookieConsent')) {
              return 'cookies';
            }
            if (id.includes('logger')) {
              return 'utilities';
            }
          },
        },
      },
      // Production optimizations
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
        mangle: {
          safari10: true,
        },
      },
    },
    // Development server configuration
    server: {
      fs: {
        strict: false,
      },
    },
    // Dependency optimization
    optimizeDeps: {
      exclude: ['sharp'],
    },
  },
  // Optimized image configuration for Cloudflare Pages
  image: {
    // Use compile-time image optimization for Cloudflare Pages
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
