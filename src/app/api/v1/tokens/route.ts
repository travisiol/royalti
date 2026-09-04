import { json, preflight } from "@/lib/api";
import { seedCoins } from "@/lib/coins";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export function OPTIONS() {
  return preflight();
}

export function GET() {
  const tokens = [...seedCoins]
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((c) => ({
      mint: c.address,
      name: c.name,
      symbol: c.symbol,
      description: c.description,
      pair: c.pair,
      createdAt: c.createdAt,
      priceUsd: c.priceUsd,
      usdMarketCap: c.marketCapUsd,
      graduated: c.curvePct >= 100,
      graduationPercent: c.curvePct,
      creatorTaxPercent: c.taxPct,
      creator: { wallet: c.creator },
      beneficiaries: c.beneficiaries.map((b) => ({
        type: b.platform,
        value: b.username,
        walletAddress: b.wallet,
        percentage: b.percentage,
      })),
    }));

  return json({ tokens, source: site.isLive ? "indexer" : "seed" });
}
