# RITCHIE ROYALE

Distributed band platform: EPK, member portal, merch shop, operational tools.

## PROJECT CONTEXT

Ritchie Royale is a 'distributed band' where the primary artist (Alex) tours to
different cities and 'activates' local musicians who learn the songs ahead of time.
This platform manages everything: public presence, member resources, merch, operations.

## TECH STACK

- Next.js 14+ (App Router, Server Components)
- TypeScript (strict mode)
- PostgreSQL + Prisma ORM
- TailwindCSS
- Stripe (payments)
- Cloudflare R2 (file storage)

## FILE STRUCTURE

```
ritchie-royale/
├── app/
│   ├── (public)/           # Public routes (no auth)
│   │   ├── page.tsx        # Homepage
│   │   ├── shows/
│   │   ├── music/
│   │   ├── press/          # EPK pages
│   │   └── shop/
│   ├── (member)/           # Member portal (auth required)
│   │   ├── dashboard/
│   │   ├── songs/
│   │   ├── agreements/
│   │   └── profile/
│   ├── (admin)/            # Admin only
│   │   ├── manage/
│   │   ├── orders/
│   │   └── members/
│   ├── api/
│   │   ├── auth/
│   │   ├── songs/
│   │   ├── shop/
│   │   └── webhooks/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                 # Reusable UI primitives
│   ├── forms/
│   ├── layout/             # Header, Footer, Nav
│   └── features/           # Feature-specific components
├── lib/
│   ├── db.ts               # Prisma client
│   ├── auth.ts             # Auth utilities
│   ├── stripe.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma
└── public/
    ├── images/
    └── fonts/
```

## DESIGN SYSTEM

Brand colors (use these Tailwind classes or extend config):

```css
/* Background */
--bg-cream: #faf8f5;

/* Text */
--text-dark: #2d2d2d;

/* Accents */
--purple: #8b5cf6;      /* Primary accent */
--pink: #ec4899;        /* Secondary accent */

/* Cards */
--card-bg: #ffffff;
--card-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
```

Typography: Clean, modern. Headings can use purple gradient.
Cards: White with subtle shadows on cream background.
Buttons: Purple primary, pink secondary, dark outline tertiary.

## DATABASE SCHEMA (Prisma)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String?
  role          Role      @default(MEMBER)
  member        Member?
  createdAt     DateTime  @default(now())
}

enum Role {
  ADMIN
  MEMBER
  PUBLIC
}

model Member {
  id           String   @id @default(cuid())
  userId       String   @unique
  user         User     @relation(fields: [userId], references: [id])
  displayName  String
  city         City     @relation(fields: [cityId], references: [id])
  cityId       String
  instruments  String[] 
  bio          String?
  isActive     Boolean  @default(true)
  agreements   Agreement[]
}

model City {
  id       String   @id @default(cuid())
  name     String
  state    String?
  country  String   @default("USA")
  members  Member[]
  shows    Show[]
}

model Song {
  id          String         @id @default(cuid())
  title       String
  key         String?
  tempo       Int?
  structure   Json?          // Array of sections
  lyrics      String?
  notes       String?
  isActive    Boolean        @default(true)
  resources   SongResource[]
  setlistItems SetlistItem[]
}

model SongResource {
  id        String       @id @default(cuid())
  songId    String
  song      Song         @relation(fields: [songId], references: [id])
  type      ResourceType
  name      String
  url       String       // R2 or external URL
  mimeType  String?
}

enum ResourceType {
  AUDIO_REFERENCE
  AUDIO_STEM
  AUDIO_PRACTICE
  TAB
  CHORD_CHART
  SHEET_MUSIC
  OTHER
}

model Show {
  id         String    @id @default(cuid())
  date       DateTime
  venue      String
  city       City      @relation(fields: [cityId], references: [id])
  cityId     String
  ticketUrl  String?
  notes      String?
  isPublic   Boolean   @default(true)
  setlist    Setlist?
}

model Setlist {
  id      String        @id @default(cuid())
  showId  String        @unique
  show    Show          @relation(fields: [showId], references: [id])
  name    String?
  items   SetlistItem[]
}

model SetlistItem {
  id         String   @id @default(cuid())
  setlistId  String
  setlist    Setlist  @relation(fields: [setlistId], references: [id])
  songId     String
  song       Song     @relation(fields: [songId], references: [id])
  position   Int
  notes      String?
}

model Agreement {
  id          String    @id @default(cuid())
  memberId    String
  member      Member    @relation(fields: [memberId], references: [id])
  title       String
  content     String    // Markdown or HTML
  signedAt    DateTime?
  signatureUrl String?
  createdAt   DateTime  @default(now())
}

model Product {
  id           String          @id @default(cuid())
  name         String
  description  String?
  price        Int             // Cents
  images       String[]
  category     ProductCategory
  isActive     Boolean         @default(true)
  variants     ProductVariant[]
  orderItems   OrderItem[]
}

enum ProductCategory {
  APPAREL
  MUSIC
  POSTER
  ACCESSORY
  DIGITAL
}

model ProductVariant {
  id         String     @id @default(cuid())
  productId  String
  product    Product    @relation(fields: [productId], references: [id])
  name       String     // e.g., "Large / Black"
  sku        String     @unique
  stock      Int        @default(0)
  orderItems OrderItem[]
}

model Order {
  id              String      @id @default(cuid())
  email           String
  stripePaymentId String?
  status          OrderStatus @default(PENDING)
  subtotal        Int
  shipping        Int         @default(0)
  total           Int
  shippingAddress Json
  items           OrderItem[]
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

enum OrderStatus {
  PENDING
  PAID
  FULFILLED
  SHIPPED
  DELIVERED
  CANCELLED
}

model OrderItem {
  id         String          @id @default(cuid())
  orderId    String
  order      Order           @relation(fields: [orderId], references: [id])
  productId  String
  product    Product         @relation(fields: [productId], references: [id])
  variantId  String?
  variant    ProductVariant? @relation(fields: [variantId], references: [id])
  quantity   Int
  unitPrice  Int
}
```

## CODE PATTERNS

### Server Components (default)
```tsx
// app/(public)/shows/page.tsx
import { db } from '@/lib/db';

export default async function ShowsPage() {
  const shows = await db.show.findMany({
    where: { isPublic: true, date: { gte: new Date() } },
    include: { city: true },
    orderBy: { date: 'asc' }
  });
  return <ShowsList shows={shows} />;
}
```

### Client Components (when needed)
```tsx
'use client';
// Only for: interactivity, browser APIs, hooks
```

### API Routes
```tsx
// app/api/songs/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth, requireRole } from '@/lib/auth';

export async function GET(req: Request) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const songs = await db.song.findMany({ where: { isActive: true } });
  return NextResponse.json(songs);
}
```

## COMMON COMMANDS

```bash
# Development
npm run dev

# Database
npx prisma generate       # After schema changes
npx prisma db push        # Push schema to DB
npx prisma migrate dev    # Create migration
npx prisma studio         # Visual DB browser

# Build
npm run build
npm run start
```

## AUTH FLOW

1. Session-based auth with HTTP-only cookies
2. Magic link option for passwordless login
3. Roles: ADMIN (Alex), MEMBER (band), PUBLIC (visitors)
4. Middleware protects /member/* and /admin/* routes

## IMPORTANT NOTES

- All prices stored in CENTS (multiply by 100)
- File uploads go to Cloudflare R2, store URL in DB
- Song structure is JSON: [{type: 'verse', bars: 8}, {type: 'chorus', bars: 8}]
- City activation = which cities have members ready for shows
- Design reference: themilestones.band (same author)

## CURRENT PHASE

Phase 1: Foundation & Public Site
- [ ] Project scaffolding
- [ ] Homepage
- [ ] Shows page
- [ ] Music page
- [ ] Press/EPK pages
- [ ] Admin dashboard skeleton
