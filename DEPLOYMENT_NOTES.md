# NISRAYA deployment notes

## Frontend

The Vite build automatically uses `/nisraya/` on GitHub Actions and `/` locally. The GitHub Pages workflow also creates `dist/404.html` from the built `index.html` so direct route loads can boot the SPA.

Production API: `https://nisraya-backend.onrender.com/api`

## Render environment variables

Set these on the Render backend service:

- `MONGO_URI`
- `JWT_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL=https://nisraya-backend.onrender.com/api/auth/google/callback`
- `FRONTEND_URL=https://shhhhhhaurya.github.io/nisraya`
- `SMTP_USER` / `SMTP_PASS` if password-reset email is enabled

Do not commit `.env` files or secrets.

## Make an existing account an admin

From the Backend folder, with a `.env` pointing at the same MongoDB database used by the deployed backend:

```bash
npm run make-admin -- your-admin-email@example.com
```

The script changes only that account's `role` to `admin`. It does not create or reveal a password.

## Google OAuth

The Google Cloud OAuth client must include this authorized redirect URI exactly:

`https://nisraya-backend.onrender.com/api/auth/google/callback`
