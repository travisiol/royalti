import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CoinView } from "@/components/CoinView";
import { findCoin, priceSeries, seedCoins } from "@/lib/coins";

type Params = { params: Promise<{ address: string }> };

export function generateStaticParams() {
  return seedCoins.map((c) => ({ address: c.address }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { address } = await params;
  const coin = findCoin(address);
  if (!coin) return { title: "coin not found" };
  return {
    title: `${coin.name} ($${coin.symbol})`,
    description: coin.description,
  };
}

export default async function CoinPage({ params }: Params) {
  const { address } = await params;
  const coin = findCoin(address);
  if (!coin) notFound();

  return <CoinView coin={coin} series={priceSeries(coin)} />;
}
