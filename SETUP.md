# Ritchie Royale - Quick Setup Guide

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Name it `ritchieroyale` and set a database password
3. Wait for it to provision (~2 minutes)
4. Go to Settings → Database → Connection string
5. Copy both connection strings

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Get these from Supabase → Settings → Database → Connection string
DATABASE_URL="postgresql://postgres:YOUR-PASSWORD@db.xxxxx.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:YOUR-PASSWORD@db.xxxxx.supabase.co:5432/postgres"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"
```

Replace:
- `YOUR-PASSWORD` with your Supabase database password
- `db.xxxxx.supabase.co` with your actual Supabase host

### 4. Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample cities (Los Angeles, NYC, Austin, etc.)
npm run db:seed
```

### 5. Logo Image

Your RR logo is located at `/public/rr-logo.png`. If you need to update it later, just replace this file.

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🎨 Admin CMS

### Accessing Admin Pages

Navigate to `/admin/manage` to access the admin dashboard.

**Note:** Currently there's no authentication - you'll want to add auth before deploying to production.

### Managing Shows

1. **Add Cities** (if needed): Go to `/admin/manage/cities`
   - The seed script already added 10 major US cities
   - Add more cities as needed

2. **Create Shows**: Go to `/admin/manage/shows`
   - Click "Add New Show"
   - Fill in venue, date, city, ticket URL
   - Toggle "Public" to make it visible on the site
   - Save!

3. **Edit/Delete Shows**: From the shows list
   - Click "Edit" to modify show details
   - Click "Delete" to remove a show

### Brand Guide

Visit `/admin/brand-guide` to see:
- Complete color palette with hex codes
- Tailwind CSS class references
- Typography examples
- UI component demos
- Design principles

## 📁 Key Files & Directories

```
ritchieroyale/
├── app/
│   ├── (public)/              # Public-facing pages
│   │   ├── page.tsx           # Homepage
│   │   ├── shows/             # Shows listing
│   │   ├── music/             # Music page
│   │   ├── press/             # Press/EPK
│   │   └── shop/              # Merch shop
│   ├── (admin)/               # Admin CMS
│   │   ├── manage/            # Main dashboard
│   │   │   ├── shows/         # Shows management
│   │   │   └── cities/        # Cities management
│   │   └── brand-guide/       # Brand guide
│   ├── globals.css            # Global styles + brand colors
│   └── layout.tsx             # Root layout
├── components/
│   ├── layout/                # Header, Nav, Footer
│   └── Intro.tsx              # Homepage hero
├── lib/
│   ├── db.ts                  # Prisma client
│   └── utils.ts               # Utilities
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed script
└── public/
    └── rr-logo.png            # Your RR logo
```

## 🎨 Design System

### Brand Colors

- **Neon Green** `#B3ECC8` - Main brand color
- **Yellow** `#F6F792` - Alternative 1
- **Pink** `#FEABC3` - Alternative 2  
- **Dark Green** `#334143` - Background

### Using Colors in Code

```tsx
// Text colors
<h1 className="text-rr-yellow">Heading</h1>
<p className="text-rr-green">Body text</p>
<span className="text-rr-pink">Accent</span>

// Backgrounds
<div className="bg-rr-dark">Dark background</div>
<div className="bg-rr-green/20">Subtle green tint</div>

// Borders
<div className="border-2 border-rr-green/30">Default border</div>
<div className="border-rr-yellow">Highlight border</div>
```

## 📝 Database Management

```bash
# View database in browser UI
npm run db:studio

# Create a migration (for production)
npm run db:migrate

# Reset and reseed database
npm run db:push
npm run db:seed
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `DATABASE_URL` (use a hosted PostgreSQL like Neon or Supabase)
4. Deploy!

### Domain Setup

The domain `ritchieroyale.com` is ready to be connected via Vercel dashboard.

## ⚠️ TODO Before Production

- [ ] Add authentication system
- [ ] Protect admin routes with auth middleware
- [ ] Replace placeholder logo with actual logo
- [ ] Add actual content (shows, songs, products)
- [ ] Configure Stripe for merch sales
- [ ] Set up Cloudflare R2 for file uploads
- [ ] Add contact email
- [ ] Add social media links

## 📞 Support

For questions about the codebase, refer to:
- `/RitchieRoyale.md` - Detailed project documentation
- `/README.md` - General project info
- `/admin/brand-guide` - Complete design system reference

