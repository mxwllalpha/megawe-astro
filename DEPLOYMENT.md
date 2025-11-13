# 🚀 Deployment Guide - Megawe Astro

## 📋 Prerequisites

1. **GitHub Repository**: `https://github.com/mxwllalpha/megawe-astro`
2. **Cloudflare Account**: Active account with Pages access
3. **Custom Domain**: `megawe.net` (already owned)
4. **API Backend**: `https://api.megawe.net` (already running)

## 🌐 Deployment Steps

### Step 1: GitHub Repository Setup

```bash
# 1. Update remote URL to new repository
git remote set-url origin https://github.com/mxwllalpha/megawe-astro.git

# 2. Add all files and commit
git add .
git commit -m "feat: Complete Astro refactor for 100/100 PageSpeed

- ✅ Static site generation with Astro 5.15.5
- ✅ Critical CSS optimization with Tailwind CSS
- ✅ 100/100 PageSpeed optimization checklist
- ✅ Complete accessibility implementation
- ✅ SEO optimization with structured data
- ✅ Performance optimizations for LCP < 1.5s
- ✅ Cloudflare Pages deployment ready
- ✅ Custom domain configuration ready

🎯 Target: 100/100 Google PageSpeed Insights"

# 3. Push to GitHub
git push -u origin main
```

### Step 2: Cloudflare Pages Configuration

1. **Login to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com/pages
   - Login dengan email: denykoerniawan@gmail.com

2. **Create New Project**
   - Click: "Connect to Git"
   - Pilih: GitHub repository `mxwllalphaalpha/megawe-astro`
   - Authorize GitHub jika diminta

3. **Build Configuration**
   ```
   Framework preset: Astro
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   Node.js version: 20.x
   ```

4. **Environment Variables**
   ```
   NODE_ENV = production
   SITE_URL = https://megawe.net
   API_URL = https://api.megawe.net
   ```

5. **Advanced Settings**
   - Compatibility flags: `nodejs_compat`
   - Build method: Static

### Step 3: Custom Domain Setup

1. **Add Custom Domain**
   - Di Cloudflare Pages project, klik "Custom domains"
   - Add domain: `megawe.net`
   - Follow DNS configuration steps

2. **DNS Configuration**
   ```
   Type: CNAME
   Name: megawe.net
   Target: megawe-astro.pages.dev
   Proxy: Enabled (orange cloud)
   TTL: Auto
   ```

3. **API Subdomain** (jika diperlukan)
   ```
   Type: CNAME
   Name: api
   Target: megawe-worker.tekipik.workers.dev
   Proxy: Enabled (orange cloud)
   TTL: Auto
   ```

4. **SSL Certificate**
   - Auto-provisioned oleh Cloudflare
   - Tunggu proses validasi (5-10 menit)

### Step 4: Deployment Verification

1. **Check Build Logs**
   - Pastikan build berhasil tanpa error
   - Verify output di `dist/` directory

2. **Visit Site**
   - https://megawe.net (seharusnya redirect ke production URL)

3. **Test Functionality**
   - Homepage loading
   - Search functionality
   - Navigation menu
   - Mobile responsiveness

## 🎯 Performance Testing

### Google PageSpeed Insights

1. **Mobile Testing**
   - URL: https://pagespeed.web.dev/
   - Test: https://megawe.net
   - Expected: 100/100 semua kategori

2. **Desktop Testing**
   - Form factor: Desktop
   - Expected: 100/100 semua kategori

### Core Web Vitals Targets

| Metric | Target | Expected |
|--------|--------|----------|
| LCP | < 2.5s | < 1.5s |
| FID | < 100ms | 0ms (no JS) |
| CLS | < 0.1 | 0.0 |
| TTI | < 3.8s | < 2s |

### Additional Testing Tools

1. **GTmetrix**: https://gtmetrix.com/
2. **WebPageTest**: https://www.webpagetest.org/
3. **Lighthouse**: Chrome DevTools

## 🔍 Post-Deployment Checklist

### ✅ Performance Verification
- [ ] Google PageSpeed: 100/100 (mobile & desktop)
- [ ] GTmetrix Grade: A
- [ ] Core Web Vitals: All green
- [ ] Loading time: < 1.5s
- [ ] Bundle size: < 500KB initial

### ✅ Functionality Testing
- [ ] All pages load correctly
- [ ] Search functionality works
- [ ] Mobile menu responsive
- [ ] Forms submit correctly
- [ ] External links work

### ✅ SEO Verification
- [ ] Meta tags present
- [ ] Structured data valid
- [ ] Sitemap accessible: /sitemap-index.xml
- [ ] Robots.txt accessible: /robots.txt
- [ ] SSL certificate valid

### ✅ Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Color contrast compliant
- [ ] ARIA labels present
- [ ] Focus indicators visible

## 🔄 Switching Domains

### From Next.js to Astro

1. **Update DNS** (if switching domains)
   ```
   # Old: megawe-nextjs.pages.dev
   # New: megawe-astro.pages.dev
   ```

2. **Update Repository References**
   - GitHub Actions workflow
   - Documentation
   - API endpoints (if any)

3. **Monitor Traffic**
   - Google Analytics
   - Search Console
   - Error monitoring

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Local testing
   npm run build
   npm run preview
   ```

2. **CSS Not Loading**
   - Check Tailwind configuration
   - Verify `@tailwind` directives
   - Clear CDN cache

3. **Images Not Loading**
   - Verify image paths
   - Check image optimization
   - Ensure files exist in `/public/`

4. **DNS Propagation**
   - Wait 24-48 hours
   - Check with: `dig megawe.net`
   - Flush local DNS: `ipconfig /flushdns`

### Performance Issues

1. **Slow Loading**
   - Check bundle size analyzer
   - Optimize images
   - Minimize CSS

2. **Low PageSpeed Score**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Optimize critical resources

## 📊 Monitoring

### Performance Monitoring
- **Google PageSpeed**: Weekly testing
- **Core Web Vitals**: Google Search Console
- **Real User Monitoring**: Google Analytics 4
- **Uptime Monitoring**: UptimeRobot or similar

### SEO Monitoring
- **Google Search Console**: Performance & indexing
- **Structured Data**: Schema markup testing
- **Rank Tracking**: Keyword positions

---

## 🎉 Deployment Complete!

### Expected Results
- **URL**: https://megawe.net
- **Performance**: 100/100 Google PageSpeed
- **Loading Time**: < 1.5 seconds
- **Bundle Size**: < 500KB initial
- **SEO Score**: 100/100
- **Accessibility**: 100/100

### Next Steps
1. **Monitor performance** for first week
2. **Collect user feedback**
3. **Optimize based on real data**
4. **Scale as needed**

---

**Last Updated**: 2025-11-13
**Framework**: Astro 5.15.5 + TypeScript + Tailwind CSS
**Target**: 100/100 Google PageSpeed Insights
**Status**: 🚀 Ready for Production