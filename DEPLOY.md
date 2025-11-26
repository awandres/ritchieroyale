# Deploy to Vercel - Quick Guide

## ✅ Prerequisites

- [x] Supabase database created and configured
- [x] Site working locally (`npm run dev`)
- [x] Code pushed to GitHub

## 🚀 Deploy in 5 Minutes

### 1. Push to GitHub

```bash
cd /Users/alexwandres/claudecode/ritchieroyale

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial Ritchie Royale site"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/ritchieroyale.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your `ritchieroyale` repository
5. Click "Deploy" (don't configure anything yet)

### 3. Add Environment Variables

Once deployed, you'll need to add your environment variables:

1. Go to your project in Vercel
2. Click "Settings" tab
3. Click "Environment Variables" in sidebar
4. Add these variables (same as your `.env` file):

```
DATABASE_URL = postgresql://postgres:YOUR-PASSWORD@db.xxxxx.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1

DIRECT_URL = postgresql://postgres:YOUR-PASSWORD@db.xxxxx.supabase.co:5432/postgres

NEXTAUTH_URL = https://ritchieroyale.com

NEXTAUTH_SECRET = generate-a-new-secret-for-production
```

**Important:** 
- Use the same Supabase URLs as your local `.env`
- Generate a new `NEXTAUTH_SECRET` for production (run `openssl rand -base64 32`)
- Update `NEXTAUTH_URL` to your actual domain

4. Click "Save"
5. Go to "Deployments" tab
6. Click the "..." menu on the latest deployment
7. Click "Redeploy"

### 4. Connect Your Domain

1. In Vercel project settings, click "Domains"
2. Add your domain: `ritchieroyale.com`
3. Follow the DNS instructions to point your domain to Vercel
4. Wait for DNS propagation (~5-60 minutes)

### 5. Run Database Migrations

The first time you deploy, you need to set up your database:

```bash
# On your local machine, using your Supabase connection
npm run db:push
npm run db:seed
```

This will create all tables and seed cities in your Supabase database.

## 🎉 You're Live!

Your site is now live at:
- Vercel URL: `https://ritchieroyale.vercel.app`
- Custom domain: `https://ritchieroyale.com` (once DNS propagates)

## 🔄 Future Updates

After the initial deploy, any time you push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically redeploy! 🚀

## ⚠️ Before Going Live Checklist

- [ ] Add authentication to protect `/admin/*` routes
- [ ] Test all admin functions work in production
- [ ] Add real shows, content, and products
- [ ] Test checkout/payment flow (once implemented)
- [ ] Update contact email and social links
- [ ] Test on mobile devices
- [ ] Set up custom 404/error pages
- [ ] Add analytics (optional)

## 🆘 Troubleshooting

**Build fails?**
- Check environment variables are set correctly
- Make sure you pushed all files to GitHub
- Check build logs in Vercel dashboard

**Database connection errors?**
- Verify `DATABASE_URL` and `DIRECT_URL` are correct
- Make sure Supabase project is active
- Check you ran `npm run db:push` to create tables

**Admin pages not working?**
- Database tables might not be created - run `npm run db:push`
- Cities not seeded - run `npm run db:seed`

## 🔐 Security Notes

**For Production:**
- Add authentication before going live
- Use proper HTTPS everywhere
- Keep dependencies updated
- Don't commit `.env` file to git (it's already in `.gitignore`)
- Use strong database password
- Generate strong `NEXTAUTH_SECRET`

