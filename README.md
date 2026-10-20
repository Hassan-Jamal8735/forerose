# forerose

Online store for Forerose perfume testers and the Discovery Pack. Built with Next.js and deployed on Vercel. Customers pay with **Cash on Delivery**.

- **Store:** home, product pages, bag, checkout (COD), order confirmation
- **Admin (`/admin`):** dashboard, orders (change status, notes, delete, WhatsApp/call the customer), products (add, edit, delete, hide, stock, image upload), store settings (delivery fee, free-delivery threshold, announcement bar, WhatsApp)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The admin is at http://localhost:3000/admin and the default local password is `admin123`.
Locally, data is saved to `data/db.json`.

## Deploy on Vercel

1. Import this GitHub repo in Vercel.
2. **Settings → Environment Variables:** add `ADMIN_PASSWORD` (your admin password) and `ADMIN_SECRET` (any long random string).
3. **Storage → Create / Connect → Upstash for Redis (from the Marketplace):** this saves products, orders and settings. It adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` for you.
4. **Storage → Blob → Create:** this lets you upload product images from the admin. It adds `BLOB_READ_WRITE_TOKEN`.
5. Redeploy. The five testers and the Discovery Pack are added automatically the first time the site runs.
