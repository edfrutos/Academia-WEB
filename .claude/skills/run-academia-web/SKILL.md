---
name: run-academia-web
description: Launch and drive Academia Web (the static site in this repo) to confirm a change works in a real browser. Use when asked to run, start, screenshot, or verify the app — it serves academiaWeb.html and exercises the live search end-to-end.
---

# Running Academia Web

Static single-page site, no build step. Entry point is `academiaWeb.html`
(not `index.html`). "Running" it means serving the directory and driving the
live search in a real browser, not opening the file or importing functions.

## 1. Serve the directory

```bash
python3 -m http.server 8765 >/tmp/httpd.log 2>&1 &
sleep 1
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:8765/academiaWeb.html  # expect HTTP 200
```

`file://` also works, but serving avoids surprises and matches how the script
loads `busqueda.js` at the end of `<body>`.

## 2. Drive it with Playwright

Playwright (v1.60, Chromium-1223) is already installed in this environment at
`/tmp/node_modules` — **not** under the repo or the global npm root. Two gotchas
the bundled driver already handles:

- Import path is `/tmp/node_modules/playwright/index.js`.
- That module is CommonJS, so use the default import (`import pkg from ...; const { chromium } = pkg;`).
  A named import (`import { chromium }`) throws `Named export 'chromium' not found`.

Run the bundled driver (lives next to this file):

```bash
node "$(dirname "$0")/drive.mjs" 2>&1   # or: node .claude/skills/run-academia-web/drive.mjs
```

It prints a JSON report and writes screenshots to `/tmp/0{1..4}-*.png`. Override
`URL` or `OUT` via env vars if the port/output dir differ.

## 3. Look at the results

The driver exercises four search states. Expected outcomes:

- **Initial load** — all three sections (`#courses`, `#tutorials`, `#manuals`) visible.
- **Search `html`** — one `<li>` per section, each with a `<mark>` highlight ("HTML").
- **Search `basico`** (no accent) — matches "JavaScript básico"; highlight wraps the
  *accented* source text. Other sections hidden. This confirms accent-insensitive matching.
- **Search `zzz-no-existe`** — all sections hidden, only "Acerca de" remains.
- **Cleared** — all 9 items back, no `<mark>` elements.

`consoleErrors` must be `"none"`. **Open the screenshots and look** — a blank
frame means the page failed to render, not that the search works.

## 4. Clean up

```bash
pkill -f "http.server 8765"
```

## Notes

The search binds to `<li>` elements (one `<ul>` per section). Adding a searchable
item means adding `<li>` content. See `busqueda.js` for `normalizeText` (diacritic
stripping) and `highlight` (offset-mapped `<mark>` wrapping).
