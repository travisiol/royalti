/**
 * Every string that carries the brand lives here. Renaming royalti means
 * editing this file and nothing else on the copy side.
 */
export const site = {
  name: "royalti",
  /** what the balloon wordmark spells on the hero */
  wordmark: "royalti",
  /** the single letter that becomes the logo in the nav, footer and modal */
  mark: "r",
  ticker: "ROYALTI",
  url: process.env.NEXT_PUBLIC_ROYALTI_URL ?? "https://royalti.fun",
  domain: "royalti.fun",
  xHandle: "@royalti_fun",
  xUrl: "https://x.com/royalti_fun",

  tagline: "redirect eth, usdg or stocks to any @username.",
  description:
    "launch a token on robinhood chain and route creator fees to any x, github, or twitch account. instant fair launches, powered by pons.",

  chain: {
    name: "robinhood chain",
    id: 4663,
    explorer: "https://robinhoodchain.blockscout.com",
  },

  /** the launch fee quoted on the create page */
  launchFeeEth: 0.0005,
  /** the creator tax range a launcher can pick from */
  maxCreatorTaxPct: 10,

  /**
   * false until a real indexer answers at NEXT_PUBLIC_ROYALTI_API. while it is
   * false the market tables render the seed set in lib/coins.ts and say so.
   */
  isLive: Boolean(process.env.NEXT_PUBLIC_ROYALTI_API),
  apiBase: process.env.NEXT_PUBLIC_ROYALTI_API ?? "",
} as const;

/**
 * Rendered brand art.
 *
 * The balloon is drawn live in CSS, which is what makes the name a string —
 * but a 3D render will always out-shine an SVG filter running on live text.
 *
 * The **hero wordmark needs nothing here**: `<Balloon />` looks for
 * `public/brand/hero.png` (or .webp / .svg) on every render and uses it the
 * moment it exists.
 *
 * The **logo** can't do that — it renders inside client components, which have
 * no filesystem — so point `mark` at a square PNG in `public/brand/` to swap
 * it. Leave it empty and the drawn `r` stands.
 */
export const brandArt: { mark: string } = {
  mark: "",
};

export const nav = [
  { href: "/", label: "explore" },
  { href: "/coins", label: "coins" },
  { href: "/launch", label: "create" },
  { href: "/claim", label: "claim" },
  { href: "/docs", label: "docs" },
] as const;

export const footerNav = [
  ...nav,
  { href: "/support", label: "support" },
  { href: "/terms", label: "terms" },
  { href: "/privacy", label: "privacy" },
] as const;
