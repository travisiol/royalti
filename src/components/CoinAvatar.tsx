/**
 * A coin's picture. Real launches upload one; the seed market has none, so we
 * derive a stable disc from the contract address — same address, same face,
 * every render.
 */
export function CoinAvatar({
  address,
  symbol,
  size = 28,
  className = "",
}: {
  address: string;
  symbol: string;
  size?: number;
  className?: string;
}) {
  let h = 0;
  for (let i = 0; i < address.length; i++) h = (h * 31 + address.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  const hue2 = (hue + 42) % 360;
  const id = `av-${address.slice(2, 10)}`;
  const letters = symbol.slice(0, 2).toUpperCase();

  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={`shrink-0 rounded-full ${className}`}
      role="img"
      aria-label={symbol}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue} 82% 68%)`} />
          <stop offset="100%" stopColor={`hsl(${hue2} 74% 44%)`} />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill={`url(#${id})`} />
      <text
        x="20"
        y="21"
        fill="#fff"
        fontSize={letters.length > 1 ? 14 : 18}
        fontWeight={800}
        letterSpacing="-0.5"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-sans), Montserrat, system-ui, sans-serif"
      >
        {letters}
      </text>
    </svg>
  );
}
