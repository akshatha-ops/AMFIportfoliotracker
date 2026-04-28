# AMFI Portfolio Value Tracker

This is a static frontend that can be uploaded directly to GitHub or deployed with GitHub Pages.

## What it does

- Loads AMFI NAV data from `NAVAll.txt`
- Lets the user search for a mutual fund scheme
- Accepts units held
- Calculates the latest portfolio value using the most recent NAV in the file

## Files

- `index.html`
- `styles.css`
- `app.js`

## How to use

1. Upload these files to a GitHub repository.
2. Open `index.html` locally or enable GitHub Pages for the repository.
3. On the page, either:
   - click `Try Live AMFI Data`, or
   - upload the AMFI `NAVAll.txt` file, or
   - paste the text content manually
4. Search for the fund name.
5. Enter units to see the portfolio value.

## Important note about live AMFI loading

Because this is a frontend-only app, direct loading from `https://portal.amfiindia.com/spages/NAVAll.txt` may be blocked by browser cross-origin rules on some browsers or hosting setups.

That is why the app supports three paths:

- direct live fetch
- file upload
- pasted text

The upload and paste options are the most reliable for GitHub Pages.

## AMFI format expected

The parser expects rows in this structure:

`Scheme Code;ISIN Div Payout / ISIN Growth;ISIN Div Reinvestment;Scheme Name;Net Asset Value;Date`

It automatically skips category headings and blank lines.
