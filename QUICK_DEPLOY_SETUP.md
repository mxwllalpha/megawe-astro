# 🚀 Quick Deploy Setup - Megawe Astro

## 📋 Setup Cloudflare Pages Auto Deploy

### Step 1: Login ke Cloudflare Dashboard
- Buka: https://dash.cloudflare.com
- Login dengan: denykoerniawan@gmail.com

### Step 2: Buat Project Pages
1. Klik **Workers & Pages** di sidebar
2. Klik **Create application** → **Pages**
3. Pilih **Connect to Git**
4. Pilih **GitHub** (account mxwllalpha)
5. Select repository: **mxwllalpha/megawe-astro**

### Step 3: Configuration Settings

#### **Basic Settings**
```
Project name: megawe-astro
Production branch: main
```

#### **Build Settings**
```
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Root directory: (kosongkan)
Node.js version: 20.x
```

#### **Environment Variables**
```
NODE_ENV = production
SITE_URL = https://megawe.net
API_URL = https://api.megawe.net
```

### Step 4: Deploy
1. Klik **Save and Deploy**
2. Tunggu build selesai (2-3 menit)
3. Copy production URL

### Step 5: Custom Domain (Opsional)
1. Di project dashboard → **Custom domains**
2. Add domain: `megawe.net`
3. Update DNS records:
   ```
   Type: CNAME
   Name: @ (atau megawe.net)
   Target: megawe-astro.pages.dev
   Proxy: Enabled (orange cloud)
   ```

## ✅ Auto Deploy Status

Setelah setup selesai, setiap **push ke GitHub branch main** akan:
1. Trigger automatic build
2. Deploy ke production secara otomatis
3. Update website dengan changes terbaru

## 🔄 Testing Auto Deploy

```bash
# Test auto deploy dengan commit baru
git add .
git commit -m "Test auto deploy"
git push origin main
```

**Done! Website akan auto deploy dalam 2-3 menit** 🎉