import { json, preflight } from "@/lib/api";
import { findCoin } from "@/lib/coins";

export const dynamic = "force-dynamic";

export function OPTIONS() {
  return preflight();
}

export async function GET(_req: Request, { params }: { params: Promise<{ address: string }> }) {
  const { address } = await params;
  const coin = findCoin(address);

  if (!coin) {
    return json({ error: "not_found", message: `no token registered at ${address}` }, 404);
  }

  return json({
    mint: coin.address,
    name: coin.name,
    symbol: coin.symbol,
    description: coin.description,
    pair: coin.pair,
    createdAt: coin.createdAt,
    priceUsd: coin.priceUsd,
    usdMarketCap: coin.marketCapUsd,
    graduated: coin.curvePct >= 100,
    graduationPercent: coin.curvePct,
    creatorTaxPercent: coin.taxPct,
    creator: { wallet: coin.creator },
    links: coin.links ?? {},
    beneficiaries: coin.beneficiaries.map((b) => ({
      type: b.platform,
      value: b.username,
      walletAddress: b.wallet,
      percentage: b.percentage,
      earnedUsd: b.earnedUsd,
    })),
  });
}
