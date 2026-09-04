import { getAsset } from "@/lib/assets";
import { AssetGlyph } from "./AssetGlyph";

/**
 * A glossy 3D asset tile — the objects that float around the hero.
 *
 * Built as one SVG rather than a rendered image so a new ticker costs a line
 * in lib/assets.ts instead of a trip through a 3D renderer: a rounded square
 * lit from the top left, a hard gloss across the upper third, a bevelled rim,
 * and the mark sunk into it.
 */
export function AssetTile({ symbol, size = 128 }: { symbol: string; size?: number }) {
  const asset = getAsset(symbol);
  const id = `tile-${asset.symbol.toLowerCase()}`;
  const dark = shade(asset.color, -0.42);
  const light = shade(asset.color, 0.32);

  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label={asset.name}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="46%" stopColor={asset.color} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
        <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.72" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id={`${id}-floor`} cx="0.5" cy="1" r="0.75">
          <stop offset="0%" stopColor={dark} stopOpacity="0.55" />
          <stop offset="100%" stopColor={dark} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* body */}
      <rect x="4" y="4" width="112" height="112" rx="36" fill={`url(#${id}-body)`} />
      {/* the pool of shadow the body sits in */}
      <rect x="4" y="4" width="112" height="112" rx="36" fill={`url(#${id}-floor)`} />
      {/* bevelled rim */}
      <rect
        x="5.5"
        y="5.5"
        width="109"
        height="109"
        rx="34.5"
        fill="none"
        stroke={`url(#${id}-rim)`}
        strokeWidth="3"
      />

      <g transform="translate(60 60) scale(0.62) translate(-50 -50)">
        {/* the mark, dropped a hair and darkened, reads as an engraved edge */}
        <g transform="translate(0 2.5)" opacity="0.28">
          <AssetGlyph symbol={asset.symbol} color={dark} />
        </g>
        <AssetGlyph symbol={asset.symbol} color="#ffffff" />
      </g>

      {/* gloss, last so it sits over the mark like real plastic */}
      <path
        d="M20 8h80a20 20 0 0 1 16 32c-18 10-40 15-56 15S32 50 14 40A20 20 0 0 1 20 8Z"
        fill={`url(#${id}-gloss)`}
      />
    </svg>
  );
}

/** lighten (amount > 0) or darken (amount < 0) a hex colour */
function shade(hex: string, amount: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const to = amount > 0 ? 255 : 0;
  const t = Math.abs(amount);
  const mix = (c: number) => Math.round(c + (to - c) * t);
  const r = mix((n >> 16) & 255);
  const g = mix((n >> 8) & 255);
  const b = mix(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}
