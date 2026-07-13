# Deploy Frontend + Backend on Vercel (one project)

Everything runs on Vercel — no Render needed.

## How it works

```
your-site.vercel.app/          → Frontend (Next.js)
your-site.vercel.app/api/*     → Backend (Express)
your-site.vercel.app/uploads/* → Backend (file uploads)
```

Your Neon database stays the same — just add its URL to Vercel.

## Step 1: Add environment variables in Vercel

1. Open [vercel.com/dashboard](https://vercel.com/dashboard) → your project
2. **Settings** → **Environment Variables**
3. Add these for **Production**, **Preview**, and **Development**:

| Name | Value |
|------|--------|
| `DATABASE_URL` | Your Neon connection string (same as `backend/.env`) |
| `JWT_SECRET` | Any long random secret string |

**`DATABASE_URL` is required for the contact form** — without it, message submissions fail on the live site.

4. **Remove** `NEXT_PUBLIC_API_URL` if it points to `localhost` — the frontend uses `/api` on the same domain automatically.

## Step 2: Deploy to Production

After pushing code, go to **Deployments** in Vercel:

1. Find the latest **Production** deployment from `main` (not an old "Redeploy")
2. If only Preview is updated, click the latest Preview → **Promote to Production**

Or push to `main` and wait for the automatic Production build to finish with **Ready** status.

## Step 3: Redeploy

1. Go to **Deployments**
2. Click **...** on the latest deployment → **Redeploy**

Vercel reads `vercel.json` and deploys both services.

## Step 3: Verify

| URL | Expected |
|-----|----------|
| `https://your-site.vercel.app` | Homepage loads |
| `https://your-site.vercel.app/health` | `{"status":"ok"}` |
| `https://your-site.vercel.app/api/cms` | JSON with your content |
| `https://your-site.vercel.app/admin/login` | Admin login page |

## Admin login

- **Email:** `abeernisar11@gmail.com`
- **Password:** `Abeer@UX2026`

(Data comes from your existing Neon database.)

## Notes

- **Uploads:** Admin image uploads may not persist across redeploys on Vercel (serverless). Use URLs or Cloudinary for production images.
- **Cold starts:** First API request after idle may take a few seconds on the free plan.
- **Local dev:** Still run `npm run dev:backend` and `npm run dev:frontend` as before.
