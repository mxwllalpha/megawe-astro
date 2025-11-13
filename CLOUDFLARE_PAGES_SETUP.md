# 🚀 Cloudflare Pages Setup Guide - Megawe Astro

## 📋 Prerequisites

### 1. Cloudflare Account
- Login ke: https://dash.cloudflare.com
- Account ID: **0177f55a2c1dee04a00c7fe255e78745** (dari MCP)
- Email: denykoerniawan@gmail.com

### 2. GitHub Repository
- Repository: https://github.com/mxwllalpha/megawe-astro
- Branch: `main`
- Status: ✅ Ready for connection

---

## 🔧 Setup Cloudflare Pages Project

### Step 1: Navigate to Cloudflare Pages
1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Klik **Workers & Pages** di sidebar kiri
3. Klik **Create application** → **Pages**

### Step 2: Connect to GitHub
1. Pilih **Connect to Git**
2. Pilih **GitHub** (dengan account mxwllalpha yang sudah login)
3. Authorize Cloudflare access ke repository (jika diminta)
4. Select repository: **mxwllalpha/megawe-astro**

### Step 3: Build Configuration

#### **Basic Settings**
```
Project name: megawe-astro
Production branch: main
```

#### **Framework Preset**
```
Framework preset: Astro
```

#### **Build Settings**
```
Build command: npm run build
Build output directory: dist
Root directory: / (biarkan kosong)
```

#### **Node.js Version**
```
Node.js version: 20.x
```

#### **Environment Variables (Production)**
```
NODE_ENV = production
SITE_URL = https://megawe.net
API_URL = https://api.megawe.net
```

#### **Advanced Settings**
```
Compatibility flags: nodejs_compat
Build method: Static
```

### Step 4: Deploy
1. Klik **Save and Deploy**
2. Tunggu proses build selesai (±2-3 menit)
3. Anda akan dapat URL: `https://megawe-astro.pages.dev`

---

## 🔧 Environment Variables Configuration

### Production Environment Variables
Di Cloudflare Pages dashboard → Settings → Environment variables:

#### **Production Variables**
```
NODE_ENV = production
SITE_URL = https://megawe.net
API_URL = https://api.megawe.net
```

#### **Preview Variables** (optional untuk testing)
```
NODE_ENV = development
SITE_URL = https://megawe-astro.pages.dev
API_URL = https://api.megawe.net
```

---

## 🌐 Custom Domain Configuration

### Step 1: Add Custom Domain
1. Di project dashboard, klik **Custom domains**
2. Add domain: `megawe.net`

### Step 2: DNS Configuration
Update DNS records di domain registrar Anda:

#### **Root Domain (megawe.net)**
```
Type: CNAME
Name: @
Target: megawe-astro.pages.dev
TTL: 300 (Auto)
Proxy: Enabled (orange cloud)
```

#### **WWW Subdomain (www.megawe.net)**
```
Type: CNAME
Name: www
Target: megawe-astro.pages.dev
TTL: 300 (Auto)
Proxy: Enabled (orange cloud)
```

#### **API Subdomain (api.megawe.net)**
```
Type: CNAME
Name: api
Target: megawe-worker.tekipik.workers.dev
TTL: 300 (Auto)
Proxy: Enabled (orange cloud)
```

### Step 3: SSL Certificate
- Cloudflare akan otomatis provision SSL certificate
- Tunggu proses validasi (5-10 menit)
- Status akan berubah menjadi **Active**

---

## ⚙️ Advanced Configuration

### 1. Build Settings Optimization
```json
{
  "build": {
    "command": "npm run build",
    "destination": "dist",
    "root_dir": "/",
    "environment_variables": {
      "NODE_ENV": "production",
      "SITE_URL": "https://megawe.net",
      "API_URL": "https://api.megawe.net"
    },
    "compatibility_flags": ["nodejs_compat"]
  }
}
```

### 2. Redirects Configuration
File `_redirects` sudah ada di root directory:
```
/api/* https://api.megawe.net/:splat 302
/home / 301
/index.html / 301
/* /404.html 404
```

### 3. Headers Configuration
File `_headers` sudah ada untuk optimization:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/static/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

---

## 🔄 CI/CD Configuration

### GitHub Actions Integration
File `.github/workflows/deploy.yml` sudah tersedia:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: megawe-astro
          directory: dist
```

### Required GitHub Secrets
Di GitHub repository → Settings → Secrets and variables → Actions:

```
CLOUDFLARE_API_TOKEN = [token dari Cloudflare account]
CLOUDFLARE_ACCOUNT_ID = 0177f55a2c1dee04a00c7fe255e78745
```

---

## 🚀 Deployment Commands

### Local Deployment
```bash
# Build project
npm run build

# Deploy dengan Wrangler (jika diperlukan)
npx wrangler pages deploy dist --project-name=megawe-astro
```

### GitHub CLI Deployment
```bash
# Push untuk trigger deploy
git add .
git commit -m "Update content"
git push origin main
```

---

## 📊 Monitoring & Analytics

### 1. Build Logs
- Di Cloudflare Pages dashboard → Builds
- Monitor build success/failure
- Check build duration dan resource usage

### 2. Analytics
- Enable **Web Analytics** di project settings
- Setup **Real User Monitoring (RUM)**
- Monitor Core Web Vitals

### 3. Functions (jika diperlukan)
Untuk SSR atau API routes:
```javascript
// wrangler.toml
name = "megawe-astro"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[env.production]
name = "megawe-astro"

# Environment variables
[env.production.vars]
NODE_ENV = "production"
SITE_URL = "https://megawe.net"
```

---

## 🔍 Testing & Validation

### 1. Build Validation
```bash
# Local build test
npm run build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

### 2. Performance Testing
1. **Google PageSpeed Insights**:
   - Mobile: https://pagespeed.web.dev/analysis/https-megawe.net/nrmgg3r1su?form_factor=mobile
   - Desktop: https://pagespeed.web.dev/analysis/https-megawe.net/nrmgg3r1su?form_factor=desktop

2. **Expected Scores**:
   - Performance: 100/100
   - Accessibility: 100/100
   - Best Practices: 100/100
   - SEO: 100/100

### 3. Functional Testing
- [ ] Homepage loads correctly
- [ ] Navigation menu works
- [ ] Search functionality works
- [ ] Mobile responsive design
- [ ] All internal links work

---

## 🛠️ Troubleshooting

### Common Issues & Solutions

#### **Build Failures**
```bash
# Clear cache dan rebuild
rm -rf node_modules dist .astro
npm install
npm run build
```

#### **DNS Propagation Issues**
- Wait 24-48 hours untuk DNS propagation
- Clear local DNS: `ipconfig /flushdns` (Windows)
- Check dengan: `dig megawe.net`

#### **Environment Variables Not Working**
- Verify variable names di dashboard
- Check case sensitivity
- Restart deploy untuk apply changes

#### **SSL Certificate Issues**
- Check DNS configuration
- Verify domain ownership
- Contact Cloudflare support jika persist

#### **Performance Issues**
- Check build size optimization
- Verify caching headers
- Monitor Core Web Vitals
- Optimize images dan assets

---

## 📈 Optimization Checklist

### ✅ Pre-Deployment Checklist
- [ ] Build succeeds locally
- [ ] All tests pass
- [ ] Environment variables configured
- [ ] Custom domain added
- [ ] SSL certificate active
- [ ] Analytics enabled
- [ ] Monitoring setup

### ✅ Post-Deployment Checklist
- [ ] Site accessible via custom domain
- [ ] All pages load correctly
- [ ] Mobile responsive working
- [ ] PageSpeed scores 100/100
- [ ] SEO validation passed
- [ ] Accessibility features working
- [ ] Forms and interactions functional

---

## 🔗 Useful Links

### Cloudflare Resources
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Astro Framework Guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)
- [Environment Variables Guide](https://developers.cloudflare.com/pages/configuration/environment-variables/)
- [Custom Domains Guide](https://developers.cloudflare.com/pages/configuration/custom-domains/)

### Project Resources
- **Repository**: https://github.com/mxwllalpha/megawe-astro
- **Preview URL**: https://megawe-astro.pages.dev
- **Production URL**: https://megawe.net
- **API URL**: https://api.megawe.net

### Monitoring Tools
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)

---

## 🎉 Deployment Complete!

### Expected Final Results:
- **Production URL**: https://megawe.net
- **Performance**: 100/100 Google PageSpeed
- **Bundle Size**: < 500KB initial load
- **Core Web Vitals**: LCP < 1.5s, FID 0ms, CLS 0.0
- **SSL**: ✅ Active
- **CDN**: ✅ Cloudflare Global Network

### Next Steps:
1. **Monitor performance** untuk first week
2. **Set up alerts** untuk build failures
3. **Configure analytics** tracking
4. **Test all features** secara menyeluruh
5. **Scale resources** jika diperlukan

---

**Last Updated**: 2025-11-13
**Framework**: Astro 5.15.5 + TypeScript + Tailwind CSS
**Target**: 100/100 Google PageSpeed Insights
**Status**: 🚀 Ready for Production Deployment