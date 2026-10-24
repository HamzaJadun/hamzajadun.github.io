# Menu Hub — static US restaurant menu site

v1: Hub homepage + Dutch Bros fully built (hub, menu, secret menu, Meal Builder).
Other brands (Firehouse Subs, Golden Corral, Popeyes, 7 Brew) are placeholders
in v1 — copy the `dutch-bros/` folder to add a brand.

## What this is

A static site: HTML + CSS + JavaScript + one JSON data file per brand.
No database, no login, no server code. That is why it deploys cleanly
from GitHub to shared hosting.

## Prices — read this before publishing live

- Dutch Bros prices in v1 are **typical US ranges**, compiled October 2026
  from secondary 2026 menu listings. Those listings conflict by $0.50–$1.50
  per drink because Dutch Bros prices vary by location/franchise.
- This site does **not** claim to be the official menu, and does not use
  any brand logo or copied official text.
- Every brand page carries a "Not affiliated" disclaimer.
- Before you present any price as exact, re-check it against the official
  app / local menu and update `data/dutch-bros.json` (and the matching
  HTML tables). Update the "last compiled" date only when you actually
  re-check.

## Files

- `index.html` — hub homepage
- `dutch-bros/index.html` — Dutch Bros brand hub
- `dutch-bros/menu.html` — full menu price table
- `dutch-bros/secret-menu.html` — fan-reported secret drinks
- `dutch-bros/meal-builder.html` — cost + calorie calculator
- `assets/style.css`, `assets/meal-builder.js`
- `data/dutch-bros.json` — the single source for Meal Builder prices;
  edit this file to update the calculator
- `firehouse-subs/`, `golden-corral/`, `popeyes/`, `7-brew/` — placeholders

## Deploy to shared hosting from GitHub

Option A — Hostinger Git (if available in your hPanel):
1. Create a new repo on GitHub, upload these files (or push this folder).
2. In hPanel, go to Git, connect the repo, set the deployment path to
   `public_html` (or a subdomain folder, e.g. `public_html/menu`).
3. Pull / deploy. The site is live at your domain.

Option B — Manual, no Git setup in hosting:
1. On GitHub, Code → Download ZIP.
2. In hosting File Manager, upload the ZIP to `public_html` and extract.
3. Make sure `index.html` is at the root of `public_html` (or the
   subdomain folder you want).

Option C — GitHub Action + FTP:
- Add FTP host / username / password as GitHub Secrets (never commit
  credentials to the repo) and use an FTP-deploy action on push to main.
- This is optional. Options A and B are enough to start.

## Add a new brand

1. Copy `dutch-bros/` to e.g. `firehouse-subs/` (already a placeholder).
2. Replace the HTML text and tables with that brand's real, checked
   menu data.
3. Create `data/<brand>.json` and point that brand's Meal Builder at it.
4. Add a brand card to `index.html`.
5. Commit and deploy the same way as above.

## Test locally before deploying

Open `index.html` in a browser, or serve the folder:
`python3 -m http.server 8000` from inside this folder, then open
http://localhost:8000/ — the Meal Builder needs http://, not file://,
to load its JSON data file (it falls back to built-in values if JSON
fails to load).

## Monetisation (later, not in v1)

AdSense after 30–50 pages are live and indexed, then Mediavine Journey /
Mediavine at their traffic thresholds. Do not add ad code until the
content is real and prices are re-checked — see the full plan in
`multi-brand-menu-hub-plan.md` (not in this repo).
