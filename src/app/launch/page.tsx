"use client";

import { useState } from "react";
import { AssetMark } from "@/components/AssetMark";
import { GithubIcon, TwitchIcon, XIcon } from "@/components/icons";
import { assets } from "@/lib/assets";
import type { Platform } from "@/lib/coins";
import { site } from "@/lib/site";

const platforms: { key: Platform; label: string; icon: React.ReactNode }[] = [
  { key: "x", label: "X", icon: <XIcon className="w-3 h-3" /> },
  { key: "github", label: "GitHub", icon: <GithubIcon className="w-3.5 h-3.5" /> },
  { key: "twitch", label: "Twitch", icon: <TwitchIcon className="w-3.5 h-3.5" /> },
];

export default function LaunchPage() {
  const [platform, setPlatform] = useState<Platform>("x");
  const [handle, setHandle] = useState("");
  const [pair, setPair] = useState("ETH");
  const [tax, setTax] = useState("0");
  const [submitted, setSubmitted] = useState(false);

  const taxNum = Math.min(site.maxCreatorTaxPct, Math.max(0, Number(tax) || 0));
  const cleanHandle = handle.trim().replace(/^@/, "");

  return (
    <div className="pt-10 lg:pt-16 pb-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 animate-fade-up">
          <span className="kicker mb-3">new launch</span>
          <h1 className="text-[40px] font-extrabold text-ink tracking-tight leading-none">
            create a coin.
          </h1>
          <p className="text-ink-60 mt-4 max-w-xl">
            redirect its creator rewards to any x, github or twitch account. launch fee{" "}
            {site.launchFeeEth} eth.
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <section className="card p-6 sm:p-7 animate-fade-up">
            <span className="kicker mb-3">
              clone a coin <span className="text-ink-40">(optional)</span>
            </span>
            <p className="text-ink-60 text-sm mb-4">
              paste a contract address from another launcher to copy its name, ticker, image and
              links, then relaunch it here with any @username as the recipient.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input className="input flex-1 font-mono text-sm" type="text" placeholder="0x… or solana mint address" />
              <button className="btn-secondary" type="button">
                clone
              </button>
            </div>
          </section>

          <section className="card p-6 sm:p-7 animate-fade-up">
            <span className="kicker mb-5">
              <b>01</b> <i>/</i> details
            </span>
            <div className="space-y-5">
              <div>
                <label className="kicker mb-2">image</label>
                <div className="flex items-end gap-3">
                  <div className="w-28 h-28 rounded-card-sm glass-strong border-dashed border-ink-40 hover:border-lime-deep flex items-center justify-center cursor-pointer overflow-hidden flex-shrink-0 transition-colors">
                    <span className="text-ink-60 text-sm font-semibold text-center px-3">
                      log in to add
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="kicker mb-2" htmlFor="coin-name">
                    name
                  </label>
                  <input id="coin-name" className="input w-full" type="text" placeholder="coin name" />
                </div>
                <div>
                  <label className="kicker mb-2" htmlFor="coin-ticker">
                    ticker
                  </label>
                  <input
                    id="coin-ticker"
                    className="input w-full uppercase font-semibold"
                    type="text"
                    placeholder="TICKER"
                    maxLength={10}
                  />
                </div>
              </div>

              <div>
                <label className="kicker mb-2" htmlFor="coin-desc">
                  description <span className="text-ink-40">(optional)</span>
                </label>
                <textarea
                  id="coin-desc"
                  className="input w-full resize-none"
                  rows={3}
                  placeholder="describe your coin"
                />
              </div>
            </div>
          </section>

          <section className="card p-6 sm:p-7 animate-fade-up">
            <span className="kicker mb-5">
              <b>02</b> <i>/</i> links <span className="text-ink-40">(optional)</span>
            </span>
            <div className="grid grid-cols-1 gap-3">
              <input className="input w-full" type="url" placeholder="website" />
              <input className="input w-full" type="url" placeholder="x / twitter" />
              <input className="input w-full" type="url" placeholder="telegram" />
            </div>
          </section>

          <section className="card p-6 sm:p-7 animate-fade-up">
            <span className="kicker mb-5">
              <b>03</b> <i>/</i> rewards to <span className="text-ink-40">(optional)</span>
            </span>
            <p className="text-ink-60">
              tag an x, github or twitch account to receive the creator tax
            </p>

            <div className="mt-5 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {platforms.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    aria-label={p.label}
                    aria-pressed={platform === p.key}
                    className={`${platform === p.key ? "btn-primary" : "btn-secondary"} btn-sm !px-3 gap-2`}
                    onClick={() => setPlatform(p.key)}
                  >
                    {p.icon}
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  className="input flex-1 min-w-0"
                  type="text"
                  placeholder="@username"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                />
                <button className="btn-secondary flex-shrink-0" type="button">
                  verify
                </button>
              </div>

              <p className="text-ink-60 text-sm">
                this account becomes the creator fee recipient: it receives 100% of the creator tax
                on every trade, claimable anytime on {site.name}.
              </p>
            </div>
          </section>

          <section className="card p-6 sm:p-7 animate-fade-up">
            <span className="kicker mb-5">
              <b>04</b> <i>/</i> paired asset
            </span>
            <p className="text-ink-60 text-sm mb-4">what your coin is priced in</p>
            <div className="flex flex-wrap gap-2" aria-label="paired asset">
              {assets.map((a) => (
                <button
                  key={a.symbol}
                  type="button"
                  aria-pressed={pair === a.symbol}
                  className={`${pair === a.symbol ? "btn-primary" : "btn-secondary"} btn-sm !px-3 gap-2`}
                  onClick={() => setPair(a.symbol)}
                >
                  <AssetMark symbol={a.symbol} size={16} />
                  <span>{a.symbol}</span>
                </button>
              ))}
            </div>
            <p className="text-ink-60 text-sm mt-4">
              your coin trades against {pair.toLowerCase()}, and the tagged account is paid in{" "}
              {pair.toLowerCase()}.
            </p>
          </section>

          <section className="card p-6 sm:p-7 animate-fade-up">
            <span className="kicker mb-5">
              <b>05</b> <i>/</i> creator tax{" "}
              <span className="text-ink-40">(0–{site.maxCreatorTaxPct}%)</span>
            </span>
            <div className="input flex items-center gap-2 focus-within:bg-white focus-within:border-lime-deep focus-within:shadow-[0_0_0_2px_#a5c603]">
              <input
                className="flex-1 min-w-0 bg-transparent text-ink font-semibold tabular-nums outline-none border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                min={0}
                max={site.maxCreatorTaxPct}
                step={0.1}
                placeholder="0"
                value={tax}
                onChange={(e) => setTax(e.target.value)}
              />
              <span className="text-ink-60 font-bold">%</span>
            </div>
            <p className="text-ink-60 text-sm mt-4">
              fixed at launch and never changeable. {taxNum}% of every trade goes to{" "}
              <span className="text-ink font-bold">
                {cleanHandle ? `@${cleanHandle}` : "the account you tag in rewards to"}
              </span>
              .
            </p>
          </section>

          <button
            className="btn-primary w-full py-4 animate-fade-up"
            type="button"
            onClick={() => setSubmitted(true)}
          >
            <span>connect to create</span>
          </button>

          {submitted && (
            <div className="card card-sm bg-elevated p-5 animate-fade-up">
              <span className="kicker mb-2">not yet</span>
              <p className="text-[14px] text-ink-60 leading-relaxed">
                the launch contract is not deployed on {site.chain.name} yet, so this form has
                nothing to sign against. everything above is real state — the paired asset, the tax
                and the tagged handle are exactly what would be written into the contract at launch,
                and the recipient can never be changed afterwards.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
