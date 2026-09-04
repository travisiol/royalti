/**
 * The assets a coin can be priced in. A launch picks one; from then on the
 * curve quotes in it and the tagged account is paid in it.
 *
 * `color` is only used to tint the monogram disc we draw for each ticker —
 * we render our own marks rather than shipping other companies' logo files.
 */
export type Asset = {
  symbol: string;
  name: string;
  color: string;
  /** the two currencies get a drawn symbol rather than a monogram */
  glyph?: "btc" | "usd";
};

export const assets: Asset[] = [
  { symbol: "ETH", name: "ether", color: "#627eea" },
  { symbol: "USDG", name: "global dollar", color: "#2e9e5b", glyph: "usd" },
  { symbol: "cbBTC", name: "coinbase wrapped btc", color: "#f7931a", glyph: "btc" },
  { symbol: "HOOD", name: "robinhood markets", color: "#00c805" },
  { symbol: "NVDA", name: "nvidia", color: "#76b900" },
  { symbol: "TSLA", name: "tesla", color: "#e31937" },
  { symbol: "AAPL", name: "apple", color: "#4b4b4b" },
  { symbol: "GOOGL", name: "alphabet", color: "#4285f4" },
  { symbol: "GME", name: "gamestop", color: "#e4131c" },
  { symbol: "SPY", name: "s&p 500 etf", color: "#1b5e9e" },
  { symbol: "QQQ", name: "nasdaq 100 etf", color: "#0a7cbf" },
  { symbol: "MSTR", name: "strategy", color: "#f7931a" },
  { symbol: "AMZN", name: "amazon", color: "#ff9900" },
  { symbol: "MSFT", name: "microsoft", color: "#00a4ef" },
  { symbol: "META", name: "meta", color: "#0866ff" },
  { symbol: "COIN", name: "coinbase", color: "#0052ff" },
  { symbol: "AMD", name: "amd", color: "#ed1c24" },
  { symbol: "PLTR", name: "palantir", color: "#101113" },
  { symbol: "MU", name: "micron", color: "#0072ce" },
  { symbol: "RBLX", name: "roblox", color: "#e2231a" },
  { symbol: "RIVN", name: "rivian", color: "#4f5b62" },
  { symbol: "COST", name: "costco", color: "#e31837" },
  { symbol: "TSM", name: "tsmc", color: "#c8102e" },
  { symbol: "RDDT", name: "reddit", color: "#ff4500" },
  { symbol: "HIMS", name: "hims & hers", color: "#1f1f1f" },
  { symbol: "SNAP", name: "snap", color: "#fffc00" },
  { symbol: "LULU", name: "lululemon", color: "#d31334" },
  { symbol: "GLD", name: "gold etf", color: "#d4af37" },
  { symbol: "USO", name: "oil fund", color: "#2b3a42" },
  { symbol: "LLY", name: "eli lilly", color: "#d52b1e" },
  { symbol: "PFE", name: "pfizer", color: "#0093d0" },
  { symbol: "MRNA", name: "moderna", color: "#e5232b" },
  { symbol: "JNJ", name: "johnson & johnson", color: "#d51900" },
];

const bySymbol = new Map(assets.map((a) => [a.symbol.toLowerCase(), a]));

export function getAsset(symbol: string): Asset {
  return (
    bySymbol.get(symbol.toLowerCase()) ?? {
      symbol,
      name: symbol.toLowerCase(),
      color: "#6b7d8a",
    }
  );
}
