# Megawe Components - Mobile & Social Media Optimized

## 🚀 Overview

This directory contains production-ready components optimized for mobile and social media sharing, specifically designed for the Indonesian job market.

## 📱 Components

### 1. **JobCard Component**
Mobile-optimized job card with multiple variants and social sharing capabilities.

**Usage:**
```astro
---
import JobCard from '../components/JobCard.astro'
import type { Job } from '../lib/types/jobs'
---

<!-- Default detailed variant -->
<JobCard job={job} />

<!-- Compact variant for listings -->
<JobCard job={job} variant="compact" />

<!-- Featured variant with special styling -->
<JobCard job={job} variant="featured" />

<!-- With social sharing enabled -->
<JobCard job={job} showSocial={true} />
```

**Props:**
- `job: Job` - Job object with all required fields
- `variant?: 'compact' | 'detailed' | 'featured' | 'minimal'` - Card style (default: 'detailed')
- `showSocial?: boolean` - Show social sharing buttons (default: false)
- `lazy?: boolean` - Enable lazy loading (default: true)
- `priority?: boolean` - Priority loading for above-fold cards (default: false)

**Features:**
- ✅ Mobile-first responsive design
- ✅ Touch-friendly interactions (44px minimum touch targets)
- ✅ Hardware-accelerated animations
- ✅ Accessible with ARIA labels
- ✅ Social media sharing integration
- ✅ Indonesian date formatting ("Hari ini", "Kemarin", etc.)
- ✅ Company logo fallback handling

### 2. **MobileHeader Component**
Touch-optimized mobile header with slide-out navigation and search.

**Usage:**
```astro
---
import MobileHeader from '../components/MobileHeader.astro'
---

<!-- Default mobile header -->
<MobileHeader />

<!-- With custom path for active state -->
<MobileHeader currentPath="/jobs" />

<!-- Hide search functionality -->
<MobileHeader showSearch={false} />

<!-- Non-sticky header -->
<MobileHeader sticky={false} />
```

**Props:**
- `currentPath?: string` - Current page path for active states
- `showLogo?: boolean` - Show logo (default: true)
- `showSearch?: boolean` - Show search toggle (default: true)
- `sticky?: boolean` - Make header sticky (default: true)

**Features:**
- ✅ Touch-optimized menu with 44px minimum touch targets
- ✅ Slide-out navigation with smooth animations
- ✅ Mobile search panel with focus management
- ✅ Accessibility with ARIA attributes
- ✅ Keyboard navigation support (Escape to close)
- ✅ Quick stats display
- ✅ Social media optimized

### 3. **SocialShare Component**
Viral sharing component with support for major Indonesian social platforms.

**Usage:**
```astro
---
import SocialShare from '../components/SocialShare.astro'
---

<!-- Default variant -->
<SocialShare
  url={jobUrl}
  title={job.title}
  description={job.description}
  hashtags={['lowongankerja', 'karir', 'indonesia']}
/>

<!-- Compact variant for mobile -->
<SocialShare
  url={jobUrl}
  title={job.title}
  description={job.description}
  variant="compact"
  showLabels={false}
/>
```

**Props:**
- `url: string` - URL to share
- `title: string` - Content title
- `description: string` - Content description
- `image?: string` - Image URL for sharing (default: '/images/og-image.jpg')
- `hashtags?: string[]` - Hashtags for Twitter/Instagram (default: ['lowongankerja', 'karir', 'indonesia'])
- `variant?: 'default' | 'compact' | 'large'` - Button size variant (default: 'default')
- `showLabels?: boolean` - Show text labels on buttons (default: true)

**Platforms Supported:**
- ✅ WhatsApp (most popular in Indonesia)
- ✅ Facebook
- ✅ LinkedIn
- ✅ Twitter/X
- ✅ Telegram
- ✅ Copy link functionality

### 4. **Enhanced Layout Component**
Mobile-first layout with progressive web app features and enhanced social sharing.

**Usage:**
```astro
---
import Layout from '../layouts/Layout.astro'
---

<Layout
  title="Lowongan Kerja Indonesia"
  description="Platform lowongan kerja terpercaya"
  showMobileHeader={true}
  showSocialMeta={true}
>
  <main>Your content here</main>
</Layout>
```

**Enhanced Props:**
- `showMobileHeader?: boolean` - Use mobile-optimized header (default: true)
- `showSocialMeta?: boolean` - Include social media meta tags (default: true)
- `structuredData?: any` - Custom structured data for SEO

**Features:**
- ✅ Mobile-first viewport configuration
- ✅ PWA manifest integration
- ✅ Enhanced social meta tags for Indonesian market
- ✅ Structured data for Indonesian content
- ✅ Performance optimizations
- ✅ Safe area support for notched devices
- ✅ Touch device optimizations

## 🎨 Mobile Optimizations

### **Touch Targets**
All interactive elements follow iOS HIG guidelines:
- Minimum 44px touch targets
- Spacious padding for fingers
- -webkit-tap-highlight-color removed for cleaner UX

### **Performance**
- Hardware-accelerated CSS transforms
- Intersection Observer for lazy loading
- Critical CSS inlining
- Font-display: swap for better loading

### **Responsive Design**
- Mobile-first breakpoints (375px, 640px, 768px, 1024px, 1280px, 1536px)
- Safe area support for iPhone X and beyond
- Viewport-fit=cover for immersive experience

### **Social Media Ready**
- Open Graph 1200x630 images
- Twitter Card support
- WhatsApp sharing optimization
- Indonesian language meta tags

## 🔧 Tailwind Configuration

Enhanced configuration with:
- Indonesian color system (primary, secondary, accent)
- Social media brand colors
- Mobile-first breakpoints
- Touch-friendly sizing
- Enhanced animations
- Performance shadows

## 🚀 PWA Features

### **App Installation**
- Automatic install banner for mobile users
- Native app-like experience
- Offline support capabilities
- Custom app shortcuts

### **Performance**
- Service Worker registration
- Image optimization
- Bundle size optimization
- Progressive enhancement

## 🇮🇩 Indonesian Market Features

### **Language Support**
- Full Indonesian language support
- Local date formatting
- Indonesian cultural design elements
- Appropriate color schemes

### **Platform Preferences**
- WhatsApp prioritized (most popular in Indonesia)
- Facebook integration
- Local SEO optimizations
- Indonesian structured data

## 📊 Usage Examples

### **Job Listing Page**
```astro
---
import Layout from '../layouts/Layout.astro'
import JobCard from '../components/JobCard.astro'
---

<Layout
  title="Lowongan Kerja Terbaru"
  description="Temukan lowongan kerja terbaru dari perusahaan ternama Indonesia"
>
  <div class="space-y-4">
    {jobs.map((job) => (
      <JobCard
        job={job}
        variant="detailed"
        showSocial={true}
        lazy={true}
      />
    ))}
  </div>
</Layout>
```

### **Job Detail Page**
```astro
---
import Layout from '../layouts/Layout.astro'
import SocialShare from '../components/SocialShare.astro'
import JobCard from '../components/JobCard.astro'
---

<Layout
  title={job.title}
  description={job.description}
  type="jobposting"
  structuredData={jobStructuredData}
>
  <!-- Job content -->
  <SocialShare
    url={jobUrl}
    title={job.title}
    description={job.description}
    image={job.company_logo_uri}
    hashtags={['lowongankerja', job.category?.toLowerCase()]}
  />
</Layout>
```

## 🎯 Best Practices

### **Mobile First**
- Design for mobile first, then enhance for desktop
- Use appropriate touch targets (minimum 44px)
- Consider thumb zone for mobile interactions
- Test on real devices, not just emulators

### **Social Media**
- Include compelling titles and descriptions
- Use high-quality images (1200x630 for OG)
- Add relevant Indonesian hashtags
- Test sharing on actual platforms

### **Performance**
- Lazy load images below the fold
- Optimize bundle sizes
- Use WebP images when possible
- Implement service workers for PWA features

### **Accessibility**
- Include ARIA labels for screen readers
- Support keyboard navigation
- Ensure sufficient color contrast
- Test with screen readers

## 🐛 Troubleshooting

### **Common Issues**
1. **Build errors**: Check for missing props or incorrect types
2. **Mobile layout issues**: Ensure viewport meta tag is correct
3. **Social sharing problems**: Verify image URLs and meta tags
4. **Performance issues**: Check bundle size and image optimization

### **Debug Tips**
- Use browser DevTools for mobile simulation
- Test actual social sharing on platforms
- Monitor performance with Lighthouse
- Check console for JavaScript errors

## 📈 Analytics Integration

Components include tracking hooks for:
- Job card impressions
- Social sharing interactions
- Mobile menu usage
- Search functionality
- PWA installation events

## 🔗 Related Documentation

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Astro Documentation](https://docs.astro.build/)
- [PWA Best Practices](https://web.dev/progressive-web-apps/)
- [Mobile Web Best Practices](https://web.dev/mobile/)
- [Social Media Sharing Guidelines](https://developers.facebook.com/docs/sharing/webmasters)