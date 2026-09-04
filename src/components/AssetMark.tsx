import { getAsset } from "@/lib/assets";
import { AssetGlyph } from "./AssetGlyph";

/**
 * The small round asset chip used in tables, pickers and headers — a white
 * disc with the ticker's mark on it, so a row reads at 18px.
 */
export function AssetMark({ symbol, size = 18 }: { symbol: string; size?: number }) {
  const asset = getAsset(symbol);
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="shrink-0 rounded-full"
      /* always sits next to the ticker in text, so the mark itself is decoration */
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="50" fill="#fff" />
      <circle cx="50" cy="50" r="50" fill={asset.color} opacity="0.12" />
      <circle cx="50" cy="50" r="49" fill="none" stroke={asset.color} strokeOpacity="0.25" strokeWidth="2" />
      <AssetGlyph symbol={asset.symbol} color={asset.color} compact />
    </svg>
  );
}
