# Ritchie Royale - Project Status

**Last Updated:** November 27, 2025  
**Live URL:** https://ritchieroyale.vercel.app  
**Domain:** ritchieroyale.com (pending DNS setup)

---

## ✅ What's Live

### Public Pages (Static)
| Page | Route | Status |
|------|-------|--------|
| Homepage | `/` | ✅ Live - Hero with RR branding |
| Shows | `/shows` | ✅ Live - "Coming soon" placeholder |
| Music | `/music` | ✅ Live - "Coming soon" placeholder |
| Press/EPK | `/press` | ✅ Live - Contact info |
| Shop | `/shop` | ✅ Live - "Coming soon" placeholder |

### Admin Pages (Static)
| Page | Route | Status |
|------|-------|--------|
| Dashboard | `/admin/manage` | ✅ Live - Links to Supabase |
| Brand Guide | `/admin/brand-guide` | ✅ Live - Full color reference |

### Design System
- ✅ RR Logo integrated as fixed background
- ✅ Brand colors implemented:
  - Neon Green `#B3ECC8` (main)
  - Yellow `#F6F792` (alt1)
  - Pink `#FEABC3` (alt2)
  - Dark Green `#334143` (background)
- ✅ Dark overlay for readability (85% opacity)
- ✅ Consistent card/border styling throughout

---

## 🚧 Deferred Features (Database-Dependent)

These features were built but removed due to Vercel build issues with Prisma:

### Admin CMS (Removed)
- ~~Shows management (CRUD)~~
- ~~Cities management (CRUD)~~
- ~~Songs management~~
- ~~Products management~~

**Workaround:** Use Supabase Dashboard directly to manage content.

### Dynamic Content (Removed)
- ~~Homepage upcoming shows from database~~
- ~~Shows page listing from database~~
- ~~Music page songs from database~~
- ~~Shop page products from database~~

**Current State:** All pages show static "coming soon" messages.

---

## 🗄️ Database Setup

### Supabase Configuration
- **Project:** ritchieroyale (Active)
- **Connection:** Configured with pooling
- **Tables Created:** User, Member, City, Show, Song, Product, Order, etc.

### Managing Content (Current Method)
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select the ritchieroyale project
3. Click **Table Editor**
4. Add/edit/delete rows directly

### Required Steps to Add Content:
1. Create Cities first (needed for Shows)
2. Create Shows with valid cityId
3. Shows will NOT appear on site until we re-enable database features

---

## 🔧 Technical Details

### Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL via Supabase
- **ORM:** Prisma (configured but not used in build)
- **Hosting:** Vercel
- **Domain:** Porkbun (ritchieroyale.com)

### Build Configuration
- All pages are currently **static** (no server-side data fetching)
- Database code exists but is not imported during build
- This was necessary to fix Vercel build errors

### Key Files
```
app/
├── (public)/          # Public pages (all static)
│   ├── page.tsx       # Homepage
│   ├── shows/         # Shows listing
│   ├── music/         # Music page
│   ├── press/         # Press/EPK
│   └── shop/          # Merch shop
├── (admin)/           # Admin pages
│   ├── manage/        # Dashboard
│   └── brand-guide/   # Color reference
├── globals.css        # Brand colors, background
└── layout.tsx         # Root layout

components/
├── Intro.tsx          # Hero section
└── layout/            # Header, Nav, Footer

lib/
├── db.ts              # Prisma client (not used in build)
└── utils.ts           # Utilities

prisma/
├── schema.prisma      # Database schema
└── seed.ts            # Seed script
```

---

## 📋 Next Steps

### Immediate (Domain Setup)
- [ ] Add domain in Vercel (ritchieroyale.com)
- [ ] Configure DNS in Porkbun:
  - A record: `@` → `76.76.21.21`
  - CNAME: `www` → `cname.vercel-dns.com`
- [ ] Wait for DNS propagation (5-60 min)
- [ ] Verify SSL certificate

### Short Term (Re-enable Database)
- [ ] Create API routes for data fetching (instead of Server Components)
- [ ] Add `/api/shows` endpoint
- [ ] Add `/api/songs` endpoint
- [ ] Update pages to fetch from API routes client-side
- [ ] Test build with new architecture

### Medium Term (Features)
- [ ] Re-add admin CMS functionality via API routes
- [ ] Add authentication for admin pages
- [ ] Seed database with real content
- [ ] Add social media links
- [ ] Add contact form

### Long Term
- [ ] Member portal
- [ ] Stripe integration for shop
- [ ] File uploads (Cloudflare R2)
- [ ] Email notifications

---

## 🐛 Known Issues

### Build Issues (Resolved by removing database)
- Prisma client initialization fails during Vercel build
- Server Actions in pages cause build-time database queries
- Dynamic routes (`[id]`) trigger static generation attempts

### Workaround Applied
- Removed all database imports from pages
- Made all pages fully static
- Content management moved to Supabase Dashboard

### Future Solution
- Use API routes (`/api/*`) for all database operations
- Fetch data client-side with `useEffect` or React Query
- Keep pages as static shells that hydrate with data

---

## 📝 Recent Changes Log

### November 27, 2025
- ✅ Initial site deployment to Vercel
- ✅ Implemented RR brand colors and logo
- ✅ Created brand guide page
- ❌ Removed database-dependent features (build issues)
- ✅ Made all pages static for successful deployment

### Files Modified
- All public pages converted to static
- Admin CMS pages removed
- Background styling updated for readability

---

## 🔗 Quick Links

- **Live Site:** https://ritchieroyale.vercel.app
- **GitHub:** https://github.com/awandres/ritchieroyale
- **Supabase:** https://supabase.com/dashboard
- **Vercel:** https://vercel.com/dashboard
- **Porkbun:** https://porkbun.com

---

*This document should be updated whenever significant changes are made to the project.*

