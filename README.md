# Ritchie Royale

A distributed band platform built with Next.js 14, featuring an EPK, member portal, merch shop, and operational tools.

## Project Overview

Ritchie Royale is a 'distributed band' where the primary artist (Alex) tours to different cities and 'activates' local musicians who learn the songs ahead of time. This platform manages everything: public presence, member resources, merch, and operations.

## Tech Stack

- **Next.js 14+** - App Router, Server Components
- **TypeScript** - Strict mode
- **PostgreSQL + Prisma ORM** - Database
- **Tailwind CSS** - Styling
- **Stripe** - Payments (to be configured)
- **Cloudflare R2** - File storage (to be configured)
- **Vercel** - Hosting

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm, yarn, or pnpm

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up your environment variables:

Create a `.env.local` file in the root directory:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/ritchieroyale?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

3. Set up the database:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with sample cities
npm run db:seed

# (Optional) Open Prisma Studio to view/manage data
npm run db:studio
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Project Structure

```
ritchieroyale/
├── app/
│   ├── (public)/           # Public routes (no auth)
│   │   ├── page.tsx        # Homepage
│   │   ├── shows/          # Shows page
│   │   ├── music/          # Music page
│   │   └── press/          # EPK pages
│   ├── (admin)/            # Admin routes (auth required)
│   │   └── manage/         # Admin dashboard
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   ├── layout/             # Header, Footer, Nav
│   └── ...                 # Feature components
├── lib/
│   ├── db.ts               # Prisma client
│   └── utils.ts            # Utilities
└── prisma/
    └── schema.prisma       # Database schema
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio
- `npm run db:migrate` - Create database migration

## Deployment

This project is configured for deployment on Vercel. The domain `ritchieroyale.com` is ready to be connected.

### Vercel Deployment Steps

1. Push your code to a Git repository
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Connect the domain `ritchieroyale.com`
5. Deploy!

## Design System

**RR Brand Colors:**
- **Neon Green (Main)**: `#B3ECC8` - Primary text, borders, main UI elements
- **Yellow (Alt 1)**: `#F6F792` - Headings, highlights, hover states
- **Pink (Alt 2)**: `#FEABC3` - Accents, CTAs, special highlights
- **Dark Green (Background)**: `#334143` - Main background, card backgrounds

**Tailwind Classes:**
- `text-rr-green` - Main text color
- `text-rr-yellow` - Headings and highlights
- `text-rr-pink` - Accent elements
- `bg-rr-dark` - Background color
- `border-rr-green/30` - Default borders

The site features the RR logo as a background watermark throughout, with semi-transparent UI elements using backdrop blur for a modern, layered aesthetic.

**View the complete brand guide:** Visit `/admin/brand-guide` (admin only) for comprehensive color swatches, typography examples, and UI component demos.

## Current Phase

**Phase 1: Foundation & Public Site** ✅
- ✅ Project scaffolding
- ✅ Homepage
- ✅ Shows page
- ✅ Music page
- ✅ Press/EPK pages
- ✅ Admin dashboard skeleton

**Phase 2: Admin CMS** ✅
- ✅ Shows management (Create, Edit, Delete)
- ✅ Cities management
- ✅ Brand guide page
- ✅ New RR brand design system
- ✅ Logo integration

**Next Steps:**
- Authentication system
- Member portal  
- Songs management
- Products management
- Stripe integration
- Cloudflare R2 integration

## License

Private project - All rights reserved

