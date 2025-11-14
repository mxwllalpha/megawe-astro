import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules into smaller chunks
          if (id.includes('node_modules')) {
            if (id.includes('astro')) {
              return 'astro-vendor';
            }
            if (id.includes('@astrojs')) {
              return 'astro-integrations';
            }
            if (id.includes('sharp')) {
              return 'image-processing';
            }
            return 'vendor';
          }

          // Split large components
          if (id.includes('Layout')) {
            return 'layout';
          }
          if (id.includes('fetchers')) {
            return 'api';
          }
        },
      },
    },
    // Optimize for production
    minify: 'terser',
    sourcemap: false,
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['astro', '@astrojs/cloudflare', '@astrojs/sitemap'],
  },
});