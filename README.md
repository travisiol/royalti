# royalti

**redirect eth, usdg or stocks to any @username.**

Launch a coin priced in ETH, USDG or a tokenized stock, and point its creator
tax at any X, GitHub or Twitch account. The account owner doesn't need a wallet,
doesn't need to know it happened, and doesn't need anyone's permission — they log
in later and claim what accrued.

A rebrand of the design language behind `dividend.family`: same bright-day art
direction, same information architecture, new name and new art.

---

## The look

One idea, applied everywhere: **a bright day**.

- A fixed blue sky gradient behind the whole document, with six clouds sailing
  across it for minutes at a time.
- White glass panels floating on that sky (`--glass`, 14px backdrop blur, a
  1px white border and a long blue-tinted shadow).
- Exactly one accent — **lime** — reserved for anything that pays out: the
  primary button, the progress fill, an earnings figure, the handle a coin
  redirects to.
- Ink is a near-black **green** (`#10240f`), not grey. It keeps the page warm.

Every token is declared once at the top of [`src/app/globals.css`](src/app/globals.css)
and mirrored in [`tailwind.config.ts`](tailwind.config.ts).

### The two pieces of art

Both are drawn in the browser rather than shipped as images, which is what makes
the brand a string instead of a folder of PNGs.

**The wordmark** ([`Balloon.tsx`](src/components/Balloon.tsx)) is foil-balloon
lettering built from Baloo 2 at weight 800, fattened with a same-colour text
stroke so the limbs swell and the counters close up, then lit by the `#puff`
filter in [`PuffFilter.tsx`](src/components/PuffFilter.tsx). That filter blurs
the glyph's alpha into a height field and runs three lights over it: a diffuse
pass that rolls the tube away at its edges, a tight specular streak along the
top left, and a low warm bounce off the ground — plus an eroded silhouette
darkened to read as the weld between two sheets of foil. Blur radii are in user
units, so there are three tunings of it (`#puff`, `#puff-md`, `#puff-sm`) for
the hero, the hero on mobile, and the logo. The single-letter version is the
logo in the nav, the footer and the welcome card.

> **Using a rendered wordmark instead.** A 3D render will always beat an SVG
> filter running on live text — the site this design comes from ships a PNG for
> exactly that reason. Drop yours in `public/brand/` and name it in `brandArt`
> in [`src/lib/site.ts`](src/lib/site.ts) (`hero` for the wordmark, ~1600px wide
> transparent PNG; `mark` for the square single-letter logo, ~512px). The drawn
> version stays as the fallback, and still renders the 404 page's wordmark.

**The asset tiles** ([`Tile.tsx`](src/components/Tile.tsx)) are the glossy 3D
squares drifting around the hero: one SVG each, lit from the top left, with a
hard gloss across the upper third and the mark sunk into the face. We draw our
own marks rather than shipping other companies' logo files — adding a ticker is
a line in [`src/lib/assets.ts`](src/lib/assets.ts), not a trip through a 3D
renderer.

---

## Renaming it

The name lives in **one file**: [`src/lib/site.ts`](src/lib/site.ts) — `name`,
`wordmark`, `mark`, `ticker`, `url`, `domain`, `xHandle`, `xUrl`. Change those
and the wordmark, the logo, every page heading, the metadata and every curl
example in `/docs` follow.

Outside that file, the name only appears in `package.json`, `.claude/launch.json`,
the `NEXT_PUBLIC_ROYALTI_*` env prefixes, the `ROYALTI_RPC_URL` name in
[`register/route.ts`](src/app/api/v1/register/route.ts), the `royalti:welcomed`
localStorage key, and this README.

---

## What is real and what is waiting

Nothing is deployed. Rather than show an empty market or invent trades, the site
is explicit about it:

| Piece | State |
| --- | --- |
| Explore / coins tables | Render the seed set in [`src/lib/coins.ts`](src/lib/coins.ts), labelled **seed market** on the page. Handles are fictional on purpose — a demo shouldn't imply real people have coins pointed at them. |
| `GET /api/v1/tokens`, `GET /api/v1/tokens/{address}` | Live. They serve the seed set, CORS-open, no auth. |
| `GET /api/v1/socials/resolve` | Validates its input, then answers **501** naming `PRIVY_APP_SECRET`. Minting the wallet a handle resolves to needs the embedded-wallet provider; returning a made-up address would hand a caller a wallet nobody can ever claim. |
| `POST /api/v1/register` | Validates its input, then answers **501** naming `ROYALTI_RPC_URL`. The docs promise registration is trustless — that means re-reading the token on-chain, which needs an RPC. |
| Login / claim | The button says which env var is missing instead of opening a modal that can't work. |
| Create form | Fully interactive state — paired asset, creator tax, tagged handle — with an honest note on submit that there is no contract to sign against yet. |
| Trade panel | Quotes are arithmetic on the seed price, and say so when you press the button. |

### Before this goes live

1. `NEXT_PUBLIC_PRIVY_APP_ID` + `PRIVY_APP_SECRET` — social login and handle
   resolution. Without these the whole claim half of the product is inert.
2. `ROYALTI_RPC_URL` — lets `/api/v1/register` verify a token on-chain.
3. `NEXT_PUBLIC_ROYALTI_API` — point at a real indexer; the seed market and its
   badge disappear on their own.
4. `NEXT_PUBLIC_ROYALTI_URL` — the canonical origin. It feeds og tags and every
   curl example in `/docs`.
5. **The legal pages are boilerplate.** `/terms` and `/privacy` are structured
   and specific to this product — including a clause on tagging accounts you
   don't control — but they have not been near a lawyer.
6. The launch fee (`launchFeeEth`) and tax ceiling (`maxCreatorTaxPct`) in
   `site.ts` are quoted to users on the create page. They must match the
   deployed contract.

---

## Running it

```bash
npm install
npm run dev
```

`npm run build` type-checks and prerenders all routes.

Stack: Next.js 16 (App Router), React 19, Tailwind CSS 3.4, zero runtime
dependencies beyond those — the chart, the tiles, the wordmark and the icons are
all hand-drawn SVG/CSS.

## Routes

| Route | |
| --- | --- |
| `/` | explore — hero, seed market, how it works, api callout |
| `/coins` | the full market, searchable by name, ticker, address or handle |
| `/launch` | create a coin |
| `/claim` | were you tagged? |
| `/coin/[address]` | one coin: chart, stats, who its fees go to, trade panel |
| `/docs` | the public api |
| `/support` | contact + faq |
| `/terms`, `/privacy` | legal |
