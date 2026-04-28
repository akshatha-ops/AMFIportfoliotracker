# AMFI Portfolio Value Tracker

A lightweight web app that parses AMFI `NAVAll.txt`, helps you search a scheme, and calculates the portfolio value based on units held.

## Features

- Parses AMFI NAV format (`Scheme Code;...;Scheme Name;Net Asset Value;Date`)
- Search by mutual fund scheme name
- Pick a scheme and view latest NAV + date
- Calculate portfolio value using units held
- Three data input paths:
  - Try live AMFI fetch
  - Upload `NAVAll.txt`
  - Paste raw NAV text

## Project files

- `index.html` – app UI
- `styles.css` – styling
- `app.js` – parser + search + calculator logic
- `server.js` – minimal Node static server (Railway-friendly)
- `package.json` – app scripts/runtime
- `railway.toml` – Railway deployment config

## Run locally

```bash
npm start
```

Then open `http://localhost:3000`.

## Deploy to Railway

1. Push this project to a GitHub repository.
2. In Railway, choose **New Project** → **Deploy from GitHub repo**.
3. Select this repository and branch.
4. Railway auto-detects `railway.toml` and uses `npm start`.
5. After deploy, open the generated Railway URL.

## Important note about live AMFI loading

Direct browser fetch from `https://portal.amfiindia.com/spages/NAVAll.txt` may be blocked by CORS depending on environment.

If that happens, use **Upload** or **Paste** input options (most reliable).
