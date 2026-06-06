# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Academia Web is a static, single-page educational website (Spanish-language) consisting of three files with no build step, dependencies, or test framework. The entry point is `academiaWeb.html` (not `index.html`).

## Running

Open `academiaWeb.html` directly in a browser, or serve the directory statically (e.g. `python3 -m http.server` then visit `/academiaWeb.html`). There is nothing to build, lint, or test.

## Architecture

- `academiaWeb.html` — page structure. The three content sections (`#courses`, `#tutorials`, `#manuals`) and the search `<input>` are wired to the script. `busqueda.js` is loaded at the end of `<body>` so the DOM exists before it runs — keep the `<script>` tag in that position.
- `busqueda.js` — live search. On each `input` event, `filterContent` reads the search box and calls `filterSection` for each section. `filterSection` toggles the `display` of the section's `<p>` elements by text match, and hides the whole section when nothing matches (showing all sections again when the query is empty). It binds to `<p>` elements, so adding searchable items to a section means adding `<p>` content the selectors will pick up.
- `style.css` — flexbox header/nav, fixed color scheme; no preprocessor.

When changing section IDs, update the matching `querySelectorAll`/`getElementById` calls in `busqueda.js` in lockstep — they are coupled by hardcoded ID strings.
