# Render deployment

One Web Service (frontend + backend in one Node process) plus one Postgres,
both in Frankfurt. `render.yaml` at the repo root describes both.

## Steps
1. Render dashboard -> New -> Blueprint -> pick this repo -> Apply.
2. Fill the secrets marked `sync: false` (Resend, Razorpay, R2, admin login, ntfy topic).
3. First deploy runs `prisma migrate deploy`, which creates all tables.
4. Add the custom domain `globewithlocals.com` and `www` on the service.

## Notes
- `SITEMAP_CITIES` empty means no city appears in the sitemap. Add cities
  (comma-separated slugs) only after they are live and indexed.
- Take a database backup before any destructive change.
  The endpoint then returns `live:false` and the booking widget falls back.
