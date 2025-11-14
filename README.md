# Megawe - Indonesian Job Vacancy Aggregator

Platform aggregator lowongan kerja terpercaya di Indonesia yang dioptimasi untuk PageSpeed 100/100 dengan Astro 5.15.5 dan Cloudflare Pages.

## 🎯 Performance Goals

- **PageSpeed Insights**: 100/100 (Performance, Accessibility, Best Practices, SEO)
- **Build Time**: ~15 seconds with image caching
- **Bundle Size**: Optimized dengan critical CSS inlined
- **Loading**: Instant paint dengan lazy loading untuk gambar

## 🚀 Tech Stack

- **Framework**: Astro 5.15.5 (Static Site Generation)
- **Language**: TypeScript dengan strict mode
- **Styling**: Tailwind CSS 3.4.15 dengan PurgeCSS
- **Deployment**: Cloudflare Pages dengan custom domain
- **Images**: Native Astro Image optimization dengan Sharp
- **Linting**: ESLint v9+ dengan Astro plugin
- **Build**: Terser minification dan code splitting

## 📁 Project Structure

```text
/
├── public/
│   ├── favicon.svg
│   └── _redirects          # Cloudflare Pages redirects
├── src/
│   ├── assets/
│   │   └── images/         # Optimized local images
│   ├── components/         # Reusable Astro components
│   ├── layouts/           # Page layouts with critical CSS
│   ├── lib/               # Constants dan utilities
│   ├── pages/             # Astro routes (SSG)
│   └── styles/            # Global CSS dengan Tailwind
├── astro.config.mjs       # Astro configuration
├── eslint.config.js       # Modern ESLint configuration
├── package.json           # Dependencies dan scripts
└── wrangler.toml         # Cloudflare Workers config
```

## 🧞 Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build untuk production ke `./dist/` |
| `npm run preview` | Preview build secara lokal |
| `npm run lint` | Lint TypeScript dan Astro files |

## ⚡ Performance Optimizations

### Critical Rendering Path
- **Critical CSS inlined** langsung di HTML
- **Non-critical CSS deferred** dengan `media="print" onload`
- **Preconnect headers** untuk external domains
- **Minified HTML/CSS/JS** output

### Image Optimization
- **Native Astro Image** component dengan WebP/AVIF
- **Lazy loading** dengan `loading="lazy"` dan `decoding="async"`
- **Build-time optimization** dengan Sharp service
- **Local optimized SVG** logos (cached)

### SEO & Accessibility
- **Structured data** JSON-LD untuk WebSite schema
- **Semantic HTML5** dengan proper heading hierarchy
- **ARIA labels** dan accessibility features
- **Open Graph** dan Twitter Card meta tags

## 🔧 Configuration

### Astro Config
```javascript
// astro.config.mjs
export default defineConfig({
  output: 'static',
  adapter: cloudflare({ mode: 'directory' }),
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: { format: ['webp', 'avif', 'jpg'], quality: 85 }
    }
  }
})
```

### ESLint Config
```javascript
// eslint.config.js
export default [
  js.configs.recommended,
  ...pluginAstro.configs.recommended,
  // TypeScript dan JavaScript configs
]
```

## 🌐 Deployment

### Cloudflare Pages
1. Connect GitHub repository ke Cloudflare Pages
2. Set **Build Command**: `npm run build`
3. Set **Build Output**: `dist`
4. Configure custom domain: `megawe.net`
5. Set up redirects untuk API: `api.megawe.net`

### Environment Variables
Tidak ada environment variables yang diperlukan untuk static build.

## 📊 PageSpeed Results

Target metrics untuk PageSpeed 100/100:

### Performance
- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Accessibility
- Semantic HTML dengan proper structure
- ARIA labels dan screen reader support
- Keyboard navigation dengan focus management
- Color contrast compliance

### Best Practices
- HTTPS enforced
- Modern JavaScript dengan ES6+
- No security vulnerabilities
- Optimized loading strategies

### SEO
- Complete structured data
- Meta tags dan Open Graph
- Sitemap.xml otomatis
- Clean URLs dan breadcrumbs

## 🛠️ Development

### Adding New Pages
1. Create `.astro` file di `src/pages/`
2. Gunakan `Layout.astro` untuk consistent styling
3. Add proper structured data jika needed
4. Test dengan `npm run build`

### Image Optimization
```astro
---
import { Image } from 'astro:assets'
import optimizedImage from '../assets/images/image.jpg'
---

<Image
  src={optimizedImage}
  width={800}
  height={600}
  format="webp"
  quality={85}
  loading="lazy"
/>
```

### SEO Best Practices
- Gunakan semantic HTML tags (`<header>`, `<main>`, `<section>`)
- Add proper meta tags di Layout component
- Include structured data untuk rich snippets
- Maintain heading hierarchy (H1 → H2 → H3)

## 🔍 Troubleshooting

### Build Issues
- **Sharp Error**: Install Sharp dengan `npm install sharp`
- **Adapter Error**: Pastikan `@astrojs/cloudflare` terinstall
- **Linting Error**: Run `npm run lint` untuk check issues

### Performance Issues
- **Large Images**: Optimize dengan Sharp service
- **Render Blocking**: Check CSS loading strategy
- **Unused CSS**: Verify Tailwind PurgeCSS configuration

## 📝 License

Private project untuk Megawe Indonesian Job Vacancy Aggregator.

---

**Optimized by**: Astro 5.15.5 with Cloudflare Pages
**Performance Target**: PageSpeed 100/100
**Ready for Production**: ✅