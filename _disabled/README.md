# Disabled: auth, admin and member areas

The site is public read-only for now, so this whole surface is parked here
rather than deleted. Nothing in this folder is routed or bundled: Next.js only
picks up routes under `app/`, and middleware only from the repo root.

Still live outside this folder, unused but intact: `lib/auth.ts`, `lib/db.ts`,
`prisma/`, and the Prisma dependencies. The build keeps running
`prisma generate` so the types those files import stay available.

## Re-enabling

```sh
git mv "_disabled/app/(admin)"  "app/(admin)"
git mv "_disabled/app/(member)" "app/(member)"
git mv _disabled/app/login      app/login
git mv _disabled/app/api/auth   app/api/auth
git mv _disabled/middleware.ts  middleware.ts
```

Two things were already broken when this was parked, so fix them before
trusting it:

- Route groups in parentheses do not create URL segments, so the real URLs are
  `/manage`, `/brand-guide`, `/dashboard`, `/songs` and `/profile`. Roughly a
  dozen links and redirects still point at `/admin/...` and `/member/...` and
  will 404, including the post-login redirect in `middleware.ts` and the
  `redirect` default in `app/login/page.tsx`.
- `middleware.ts` matches those same non-existent `/admin` and `/member`
  prefixes, so it never actually guards anything. The pages were protected by
  the session checks in their layouts instead.
