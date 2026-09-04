import { getAsset } from "@/lib/assets";
import { BRAND_ICON_BOX, brandIcons } from "@/lib/brand-icons";

/**
 * The mark we draw inside an asset chip or tile.
 *
 * A ticker with a real company logo gets it; the rest get a monogram in the
 * company's colour, and the two currencies get their own glyph. Everything is
 * authored in a 0 0 100 100 box so the 18px chip and the 150px hero tile can
 * share it.
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
  const brand = brandIcons[asset.symbol];

  if (brand) {
    // 24px artwork, scaled to fill 64 of the 100 units and centred
    const s = 64 / BRAND_ICON_BOX;
    const o = BRAND_ICON_BOX / 2;
    return (
      <g transform={`translate(50 50) scale(${s}) translate(${-o} ${-o})`}>
        <path d={brand} fill={color} />
      </g>
    );
  }

  if (asset.glyph === "usd" || asset.glyph === "btc") {
    return (
      <text
        x="50"
        y="50"
        fill={color}
        fontSize={asset.glyph === "btc" ? 58 : 56}
        fontWeight={800}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-sans), Montserrat, system-ui, sans-serif"
      >
        {asset.glyph === "btc" ? "₿" : "$"}
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
