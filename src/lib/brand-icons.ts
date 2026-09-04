import {
  siAmd,
  siApple,
  siBitcoin,
  siCoinbase,
  siDell,
  siEthereum,
  siGoogle,
  siMeta,
  siMicrostrategy,
  siNvidia,
  siPalantir,
  siReddit,
  siRoblox,
  siRobinhood,
  siSnapchat,
  siTaketwointeractivesoftware,
  siTesla,
} from "simple-icons";

/**
 * Real company marks for the tickers that have one, from simple-icons.
 *
 * Only the path is taken, never the icon's own colour: the tile palette in
 * lib/assets.ts is picked so the hero row reads as a set, and Robinhood's
 * official yellow-green in particular is close enough to our accent lime to
 * disappear against it.
 *
 * Anything missing here falls back to a drawn monogram — Amazon, GameStop and
 * Microsoft are absent from the set, having been withdrawn on trademark
 * request, so those tickers show their letters.
 *
 * Every path is authored in a 24×24 box.
 */
export const brandIcons: Record<string, string> = {
  AAPL: siApple.path,
  AMD: siAmd.path,
  COIN: siCoinbase.path,
  DELL: siDell.path,
  ETH: siEthereum.path,
  GOOGL: siGoogle.path,
  HOOD: siRobinhood.path,
  META: siMeta.path,
  MSTR: siMicrostrategy.path,
  NVDA: siNvidia.path,
  PLTR: siPalantir.path,
  RBLX: siRoblox.path,
  RDDT: siReddit.path,
  SNAP: siSnapchat.path,
  TSLA: siTesla.path,
  TTWO: siTaketwointeractivesoftware.path,
  cbBTC: siBitcoin.path,
};

export const BRAND_ICON_BOX = 24;
