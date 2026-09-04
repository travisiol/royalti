"use client";

import { useState } from "react";
import { AssetMark } from "@/components/AssetMark";
import { CoinAvatar } from "@/components/CoinAvatar";
import { GithubIcon, TwitchIcon, XIcon } from "@/components/icons";
import { PriceChart, type Point } from "@/components/PriceChart";
import type { Coin } from "@/lib/coins";
import { platformProfileUrl, shortAddress, usd, usdCompact, usdPrice } from "@/lib/format";
import { site } from "@/lib/site";

const platformIcon = {
  x: <XIcon className="w-3.5 h-3.5" />,
  github: <GithubIcon className="w-3.5 h-3.5" />,
  twitch: <TwitchIcon className="w-3.5 h-3.5" />,
};

export function CoinView({ coin, series }: { coin: Coin; series: Point[] }) {
  const [copied, setCopied] = useState(false);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [tradeNote, setTradeNote] = useState(false);

  const earned = coin.beneficiaries.reduce((sum, b) => sum + (b.earnedUsd ?? 0), 0);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(coin.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard blocked; the address is selectable in the page
    }
  }

  return (
    <div className="pb-20 space-y-5">
      <div className="card p-5 sm:p-6 flex flex-wrap items-center gap-4 sm:gap-5">
        <span className="w-16 h-16 rounded-full overflow-hidden bg-glass-strong border border-glass-border shadow-glass-sm shrink-0 inline-flex items-center justify-center">
          <CoinAvatar address={coin.address} symbol={coin.symbol} size={64} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-x-3 gap-y-2 flex-wrap">
            <h1 className="text-[28px] font-extrabold tracking-[-0.02em] leading-none text-ink truncate max-w-full">
              {coin.name}
            </h1>
            <span className="text-muted font-semibold tabular-nums">${coin.symbol}</span>
            <span className="badge">curve {coin.taxPct.toFixed(1)}%</span>
          </div>
          <div className="mt-3 flex items-center gap-2 flex-wrap min-w-0">
            <span className="kicker !inline shrink-0">contract</span>
            <button
              type="button"
              className="btn-secondary btn-sm max-w-full min-w-0 normal-case tracking-normal"
              onClick={copyAddress}
            >
              <span className="font-mono text-[12px] font-semibold truncate">
                <span className="hidden sm:inline">{coin.address}</span>
                <span className="sm:hidden">{shortAddress(coin.address, 8, 8)}</span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-btn text-ink-60 shrink-0">
                {copied ? "copied" : "copy"}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-5 items-start">
        <div className="min-w-0 space-y-5">
          <div className="card p-5 sm:p-6">
            <span className="kicker mb-3">
              <b>01</b> <i>/</i> chart
            </span>
            <PriceChart series={series} label={coin.pair} />
          </div>

          <div className="card p-5 sm:p-6">
            <span className="kicker mb-4">
              <b>02</b> <i>/</i> stats
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5">
              <Stat label="mcap" value={usdCompact(coin.marketCapUsd)} />
              <Stat label="price" value={usdPrice(coin.priceUsd)} />
              <Stat label="curve" value={`${coin.taxPct.toFixed(1)}%`} />
              <Stat label="earnings" value={usd(earned)} accent />
            </div>
            <div className="mt-5 pt-4 border-t border-divider flex items-center gap-3">
              <span className="kicker shrink-0">graduation</span>
              <div
                className="progress flex-1"
                style={{ ["--fill" as string]: `${coin.curvePct}%` }}
              />
              <span className="text-ink font-bold tabular-nums shrink-0">
                {coin.curvePct.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="card px-5 sm:px-6 pt-5 pb-2">
            <span className="kicker mb-2">
              <b>03</b> <i>/</i> rewards
            </span>
            {coin.beneficiaries.length === 0 ? (
              <p className="text-ink-60 py-4">
                nobody was tagged at launch — the creator tax on this one goes back to the wallet
                that deployed it.
              </p>
            ) : (
              coin.beneficiaries.map((b) => (
                <div key={b.username} className="trow py-3 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full shrink-0 border border-glass-border shadow-glass-sm bg-white inline-flex items-center justify-center text-ink">
                    {platformIcon[b.platform]}
                  </span>
                  <div className="min-w-0 flex-1 flex items-baseline gap-x-3 gap-y-0.5 flex-wrap">
                    <a
                      className="font-bold text-lime-text truncate hover:text-ink"
                      href={platformProfileUrl(b.platform, b.username)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      @{b.username}
                    </a>
                    <span className="text-muted text-[14px]">
                      <span className="font-bold text-ink tabular-nums">{b.percentage}%</span>
                      <span className="inline-flex items-center gap-1.5 ml-2 text-ink-60 align-middle">
                        <AssetMark symbol={coin.pair} size={16} />
                        <span className="font-bold text-ink">{coin.pair}</span>
                      </span>
                    </span>
                  </div>
                  <span className="font-mono text-[12px] text-muted shrink-0">
                    {shortAddress(b.wallet, 2, 4)}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="card card-sm px-5 py-4 flex items-center gap-4 flex-wrap">
            <span className="kicker !inline">created by</span>
            <p className="min-w-0">
              <span className="font-bold font-mono text-ink">{shortAddress(coin.creator, 2, 4)}</span>
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="card p-5 sm:p-6">
            <span className="kicker mb-4">trade</span>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {(["buy", "sell"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`${side === s ? "btn-primary" : "btn-secondary"} btn-sm`}
                  onClick={() => setSide(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <label className="kicker mb-2" htmlFor="trade-amount">
              amount
            </label>
            <div className="relative">
              <input
                id="trade-amount"
                className="input pr-24 text-[18px] font-semibold tabular-nums"
                type="number"
                min={0}
                step="any"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-bold uppercase tracking-btn text-ink-60 pointer-events-none">
                {side === "buy" ? coin.pair : coin.symbol}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3">
              {["25%", "50%", "75%", "max"].map((p) => (
                <button key={p} type="button" className="btn-secondary btn-sm flex-1">
                  {p}
                </button>
              ))}
            </div>

            <p className="text-muted text-[13px] mt-3 tabular-nums">
              you receive{" "}
              <span className="text-ink font-semibold">
                {amount && Number(amount) > 0
                  ? side === "buy"
                    ? `≈ ${(Number(amount) / coin.priceUsd).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })} ${coin.symbol}`
                    : `≈ ${(Number(amount) * coin.priceUsd).toFixed(6)} ${coin.pair}`
                  : "-"}
              </span>
            </p>

            <button
              type="button"
              className="btn-primary w-full mt-4"
              onClick={() => setTradeNote(true)}
            >
              connect wallet to trade
            </button>

            {tradeNote && (
              <p className="text-[13px] text-ink-60 leading-relaxed mt-4 pt-4 border-t border-divider">
                there is no curve to trade against yet — the bonding-curve contracts are not deployed
                on {site.chain.name}. the quote above is the seed price doing arithmetic, not a
                routed order.
              </p>
            )}

            <p className="text-muted text-[13px] leading-snug mt-4 pt-4 border-t border-divider">
              trades settle on the bonding curve on {site.chain.name} until the launch graduates into
              its pool. your wallet signs every transaction.
            </p>
          </div>

          {coin.links && (
            <div className="flex flex-wrap gap-2">
              {coin.links.website && (
                <a className="btn-secondary btn-sm" href={coin.links.website} target="_blank" rel="noreferrer">
                  website
                </a>
              )}
              {coin.links.x && (
                <a className="btn-secondary btn-sm" href={coin.links.x} target="_blank" rel="noreferrer">
                  x
                </a>
              )}
              {coin.links.telegram && (
                <a className="btn-secondary btn-sm" href={coin.links.telegram} target="_blank" rel="noreferrer">
                  telegram
                </a>
              )}
            </div>
          )}

          <p className="text-muted text-[13px] leading-relaxed px-1">{coin.description}</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="kicker mb-1.5">{label}</p>
      <p
        className={`text-[22px] font-bold leading-none tabular-nums truncate ${
          accent ? "text-lime-text" : "text-ink"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
