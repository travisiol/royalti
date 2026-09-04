export function usdCompact(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}

export function usd(n: number): string {
  return `$${n.toFixed(2)}`;
}

/** prices here are tiny; show enough digits to actually be a price */
export function usdPrice(n: number): string {
  if (n >= 1) return `$${n.toFixed(4)}`;
  if (n >= 0.0001) return `$${n.toFixed(6)}`;
  return `$${n.toFixed(7)}`;
}

export function pct(n: number): string {
  return `${n.toFixed(1)}%`;
}

export function shortAddress(address: string, head = 4, tail = 4): string {
  if (address.length <= head + tail + 2) return address;
  return `${address.slice(0, 2 + head)}…${address.slice(-tail)}`;
}

export const platformLabel: Record<string, string> = {
  x: "X",
  github: "GitHub",
  twitch: "Twitch",
};

export function platformProfileUrl(platform: string, username: string): string {
  switch (platform) {
    case "github":
      return `https://github.com/${username}`;
    case "twitch":
      return `https://twitch.tv/${username}`;
    default:
      return `https://x.com/${username}`;
  }
}
