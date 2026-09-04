import { site } from "./site";

export type Platform = "x" | "github" | "twitch";

export type Beneficiary = {
  platform: Platform;
  username: string;
  /** the embedded wallet the handle resolves to */
  wallet: string;
  percentage: number;
  /** null while nothing has accrued yet */
  earnedUsd: number | null;
};

export type Coin = {
  address: string;
  name: string;
  symbol: string;
  description: string;
  /** what the curve quotes in, and what the tagged account is paid in */
  pair: string;
  priceUsd: number;
  marketCapUsd: number;
  /** progress along the bonding curve towards graduation, 0–100 */
  curvePct: number;
  /** the creator tax written into the contract at launch, 0–10 */
  taxPct: number;
  createdAt: number;
  creator: string;
  beneficiaries: Beneficiary[];
  links?: { website?: string; x?: string; telegram?: string };
};

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;

/**
 * The seed market. Nothing is deployed yet, so rather than an empty table (or
 * invented volume passed off as real) the explore and coins pages render this
 * set and label it. Set NEXT_PUBLIC_ROYALTI_API and it is replaced wholesale
 * by the indexer's /api/v1/tokens response.
 *
 * The handles are deliberately fictional — a demo should not imply that real
 * accounts have coins pointed at them.
 */
export const seedCoins: Coin[] = [
  {
    address: "0x7a2f6c4e1d9b3a58c0e7f21d4b6a9c3e5f817d02",
    name: "Royalti",
    symbol: "ROYALTI",
    description: "the house coin. its creator tax funds nothing but the bill for the servers.",
    pair: "ETH",
    priceUsd: 0.0000062,
    marketCapUsd: 6210,
    curvePct: 6,
    taxPct: 4,
    createdAt: Date.now() - 14 * MINUTE,
    creator: "0x5905165f43e6c1a4bd7e2f0c8a91b3d6e04f2d11",
    beneficiaries: [],
    links: { website: site.url, x: site.xUrl },
  },
  {
    address: "0xb1c8d47f2a05e93b6c1f8de204a7b5c9d3e60f84",
    name: "Ship It Friday",
    symbol: "SHIP",
    description: "for the maintainer who merged your pr at 2am and never asked for anything.",
    pair: "ETH",
    priceUsd: 0.0000148,
    marketCapUsd: 14830,
    curvePct: 34,
    taxPct: 5,
    createdAt: Date.now() - 3 * HOUR,
    creator: "0x91af3c7d5e28b6104f9c2a7d83e5b0164c7fa229",
    beneficiaries: [
      {
        platform: "github",
        username: "nightbuilder",
        wallet: "0x9b6a4f1c78e05d2b3a9f6c14e8d70b52a13cf335",
        percentage: 100,
        earnedUsd: 41.2,
      },
    ],
  },
  {
    address: "0x3e0a95c7b418d62f0a7e4c531b9d86af20c74e19",
    name: "Chart Goblin",
    symbol: "GOBLIN",
    description: "a coin for the streamer who calls every top and takes it well.",
    pair: "USDG",
    priceUsd: 0.0000091,
    marketCapUsd: 9140,
    curvePct: 19,
    taxPct: 6,
    createdAt: Date.now() - 5 * HOUR,
    creator: "0x2d84f0e19b7c5a63d0f18e42a7c9b501e6d3a877",
    beneficiaries: [
      {
        platform: "twitch",
        username: "goblincharts",
        wallet: "0x4e18a7c05f9b26d31a8c07e4f52b9d60c8a1e743",
        percentage: 100,
        earnedUsd: 12.86,
      },
    ],
  },
  {
    address: "0xc57e1b0d9a34f2e8b06d1c7a45f39e820b6d14a3",
    name: "Semiconductor Enjoyer",
    symbol: "FAB",
    description: "priced in nvda, because the joke should cost what the joke is about.",
    pair: "NVDA",
    priceUsd: 0.0000205,
    marketCapUsd: 20510,
    curvePct: 52,
    taxPct: 3,
    createdAt: Date.now() - 9 * HOUR,
    creator: "0x7f36c2a8e05d194b7c0a3f68d25e9b41a07c6e58",
    beneficiaries: [
      {
        platform: "x",
        username: "fabnotes",
        wallet: "0x6c0d9f4a17e83b52c9a1d70f4e28b635d09a7c1e",
        percentage: 100,
        earnedUsd: 88.4,
      },
    ],
  },
  {
    address: "0x18d6a0c39f74e2b501a8c6d47e930fb25c1e7a06",
    name: "Please Respond",
    symbol: "DMS",
    description: "tagged at someone who has never once opened their dms. the fees wait.",
    pair: "ETH",
    priceUsd: 0.0000047,
    marketCapUsd: 4720,
    curvePct: 8,
    taxPct: 10,
    createdAt: Date.now() - 11 * HOUR,
    creator: "0xa03f7c15e28b64d09c7a1f36e5d820b47c9e013f",
    beneficiaries: [
      {
        platform: "x",
        username: "inboxzero_never",
        wallet: "0x81b5e2c7f09a3d641e8c05b7a42f9d36c07e5a19",
        percentage: 100,
        earnedUsd: null,
      },
    ],
  },
  {
    address: "0x9f47b8e015c3a26d07f9b41e58d02c6a3b7e91d5",
    name: "Rent Money",
    symbol: "RENT",
    description: "half to the artist who drew the icon, half to the dev who shipped the site.",
    pair: "USDG",
    priceUsd: 0.0000033,
    marketCapUsd: 3310,
    curvePct: 2,
    taxPct: 5,
    createdAt: Date.now() - 16 * HOUR,
    creator: "0x35c07a1f9e4b28d06a3f7c81e5b90d24f6a0c7e3",
    beneficiaries: [
      {
        platform: "x",
        username: "penpixels",
        wallet: "0x27f9c04a1e6b83d520c7a9f14e63b08d5c1a7e94",
        percentage: 50,
        earnedUsd: 6.4,
      },
      {
        platform: "github",
        username: "halfstack",
        wallet: "0x5b1e07c94a2f63d80c5a7f19e34b62d07a9c8e15",
        percentage: 50,
        earnedUsd: 6.4,
      },
    ],
  },
  {
    address: "0x64e0a7c19f3b58d02a7c6e14f9b35d80c2a7e163",
    name: "Tenure Track",
    symbol: "TENURE",
    description: "for the lecturer whose slides taught half of this timeline.",
    pair: "SPY",
    priceUsd: 0.0000076,
    marketCapUsd: 7630,
    curvePct: 15,
    taxPct: 4,
    createdAt: Date.now() - 22 * HOUR,
    creator: "0xe07a3c15b9f24d68a0c37e51f8b6d92a04c7e13b",
    beneficiaries: [
      {
        platform: "x",
        username: "lecture_notes",
        wallet: "0x3a7e09c1f54b28d67a0c9e13b85f2d40c6a7e918",
        percentage: 100,
        earnedUsd: 19.05,
      },
    ],
  },
  {
    address: "0x2b95c0e74a18f36d09c5a7e12b8d43f60a9c7e51",
    name: "Speedrun Any%",
    symbol: "ANY",
    description: "the tagged account has not logged in. eleven days of fees are sitting there.",
    pair: "GME",
    priceUsd: 0.0000029,
    marketCapUsd: 2880,
    curvePct: 0,
    taxPct: 7,
    createdAt: Date.now() - 31 * HOUR,
    creator: "0xc19a052f7e348b6d01a7c9f35e2b84d60c7a1e93",
    beneficiaries: [
      {
        platform: "twitch",
        username: "framerules",
        wallet: "0x7d2c0a91e58f34b607a1c9e25f83b4d60a7c9e12",
        percentage: 100,
        earnedUsd: 3.71,
      },
    ],
  },
];

export function findCoin(address: string): Coin | undefined {
  const wanted = address.toLowerCase();
  return seedCoins.find((c) => c.address.toLowerCase() === wanted);
}

/**
 * A deterministic price walk for a coin, so the chart is stable across renders
 * and reloads instead of dancing on every paint.
 */
export function priceSeries(coin: Coin, points = 96): { t: number; p: number }[] {
  let seed = 0;
  for (let i = 0; i < coin.address.length; i++) seed = (seed * 31 + coin.address.charCodeAt(i)) >>> 0;

  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0xffffffff;
  };

  const span = Date.now() - coin.createdAt;
  const out: { t: number; p: number }[] = [];
  // walk backwards from the current price so the last point is always exact.
  // stepping back shrinks the price, so forward in time it climbs — and it
  // climbs faster for a coin that has eaten more of its curve.
  const drift = 0.995 - (coin.curvePct / 100) * 0.012;
  let p = coin.priceUsd;
  for (let i = points - 1; i >= 0; i--) {
    out[i] = { t: coin.createdAt + (span * i) / (points - 1), p };
    p = p * (drift + rand() * 0.012);
  }
  return out;
}

export function ageLabel(createdAt: number): string {
  const ms = Date.now() - createdAt;
  const m = Math.floor(ms / MINUTE);
  if (m < 60) return `${Math.max(1, m)}m`;
  const h = Math.floor(m / 60);
  if (h < 48) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}
