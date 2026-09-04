import { getAsset } from "@/lib/assets";

/**
 * The mark we draw inside an asset chip or tile.
 *
 * Crypto assets get their protocol glyph; equities get a monogram in the
 * company's colour. We draw our own rather than shipping other companies'
 * logo files — the tile is ours, the ticker is just a fact.
 *
 * Everything is authored in a 0 0 100 100 box so both the 18px chip and the
 * 150px hero tile can reuse it.
 */
export function AssetGlyph({
  symbol,
  color,
  compact = false,
}: {
  symbol: string;
  color: string;
  /** at chip size a four-letter ticker is a smudge — show two letters instead */
  compact?: boolean;
}) {
  const asset = getAsset(symbol);

  if (asset.glyph === "eth") {
    return (
      <g fill={color}>
        <path d="M50 14 30 51l20 12 20-12z" opacity="0.9" />
        <path d="M50 14 30 51l20-9z" opacity="0.62" />
        <path d="M50 68 30 56l20 30 20-30z" opacity="0.9" />
        <path d="M50 68 30 56l20 12z" opacity="0.62" />
      </g>
    );
  }

  if (asset.glyph === "btc") {
    return (
      <text
        x="50"
        y="50"
        fill={color}
        fontSize="58"
        fontWeight={800}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-sans), Montserrat, system-ui, sans-serif"
      >
        ₿
      </text>
    );
  }

  if (asset.glyph === "usd") {
    return (
      <text
        x="50"
        y="50"
        fill={color}
        fontSize="56"
        fontWeight={800}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-sans), Montserrat, system-ui, sans-serif"
      >
        $
      </text>
    );
  }

  const full = symbol.toUpperCase();
  const label = compact ? full.slice(0, 2) : full;
  // four-letter tickers need to come down a size or two to keep the margins even
  const fontSize = label.length >= 5 ? 24 : label.length === 4 ? 28 : label.length === 3 ? 34 : 46;

  return (
    <text
      x="50"
      y="51"
      fill={color}
      fontSize={fontSize}
      fontWeight={800}
      letterSpacing="-1"
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily="var(--font-sans), Montserrat, system-ui, sans-serif"
    >
      {label}
    </text>
  );
}
