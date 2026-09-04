import Link from "next/link";
import { Balloon } from "@/components/Balloon";
import { CoinTable } from "@/components/CoinTable";
import { Reveal } from "@/components/Reveal";
import { AssetTile } from "@/components/Tile";
import { seedCoins } from "@/lib/coins";
import { site } from "@/lib/site";

/** the assets drifting around the wordmark */
const heroTiles = [
  { symbol: "TSLA", cls: "left-[3%] top-[10%]", rot: -8, dur: 7, delay: 0, blur: 0, size: 150 },
  { symbol: "NVDA", cls: "right-[5%] top-[8%]", rot: 6, dur: 8, delay: -2, blur: 0, size: 128 },
  { symbol: "USDG", cls: "left-[10%] bottom-[16%]", rot: 5, dur: 6.5, delay: -4, blur: 0, size: 108 },
  { symbol: "ETH", cls: "right-[9%] bottom-[20%]", rot: -6, dur: 7.5, delay: -1, blur: 0, size: 118 },
  { symbol: "HOOD", cls: "right-[24%] top-[2%]", rot: -5, dur: 7.2, delay: -2.5, blur: 0, size: 132 },
  { symbol: "AAPL", cls: "left-[1%] top-[50%] hidden lg:block", rot: 10, dur: 9, delay: -3, blur: 1.2, size: 96 },
  { symbol: "GOOGL", cls: "right-[1%] top-[48%] hidden lg:block", rot: -9, dur: 6, delay: -5, blur: 1.5, size: 88 },
  { symbol: "META", cls: "left-[26%] bottom-[2%] hidden md:block", rot: 4, dur: 8.5, delay: -6, blur: 2, size: 76 },
  { symbol: "COIN", cls: "left-[22%] top-[3%] hidden md:block", rot: -4, dur: 7.8, delay: -1.5, blur: 1.8, size: 80 },
  { symbol: "AMD", cls: "right-[28%] bottom-[4%] hidden md:block", rot: 6, dur: 8.2, delay: -3.5, blur: 2.2, size: 72 },
];

const steps = [
  {
    n: "01",
    title: "create a coin",
    body: `name it, pick a ticker, drop an image. it launches on a bonding curve on ${site.chain.name} in one transaction.`,
  },
  {
    n: "02",
    title: "tag any handle",
    body: "point the creator fees at any x, github or twitch account — yours, a friend's, a stranger's. no wallet needed on their side.",
  },
  {
    n: "03",
    title: "they log in and claim",
    body: "the owner signs in with that account and the fees are theirs. no permission, no setup, no middleman.",
  },
];

export default function Home() {
  const tagged = seedCoins.filter((c) => c.beneficiaries.length > 0).length;

  return (
    <div className="pb-8">
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center py-16 sm:py-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {heroTiles.map((t) => (
            <span
              key={t.symbol}
              className={`tile ${t.cls}`}
              style={
                {
                  "--rot": `${t.rot}deg`,
                  "--dur": `${t.dur}s`,
                  "--delay": `${t.delay}s`,
                  "--blur": `${t.blur}px`,
                  width: t.size,
                  height: t.size,
                } as React.CSSProperties
              }
            >
              <AssetTile symbol={t.symbol} size={t.size} />
            </span>
          ))}
        </div>

        <div className="relative animate-fade-up">
          <span className="kicker relative z-[2]">
            built on {site.chain.name} · eth · usdg · stocks
          </span>

          <div className="mt-8 flex justify-center">
            <Balloon />
          </div>

          <h1 className="hero-h1 mt-10 max-w-5xl mx-auto [font-size:clamp(40px,6vw,72px)]">
            redirect eth, usdg or stocks to any <span className="accent-word">@username</span>.
          </h1>

          <p className="mt-6 mx-auto max-w-xl text-[17px] sm:text-[18px] leading-relaxed text-ink-60">
            launch a coin priced in eth, usdg or a tokenized stock like tsla or nvda, and redirect
            its fees to any x, github or twitch account. the owner logs in and claims — no wallet
            setup.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link className="btn-primary" href="/launch">
              start launching
            </Link>
            <a className="btn-secondary" href="#how">
              how it works
            </a>
          </div>
        </div>
      </section>

      <Reveal id="market" className="section pt-8 lg:pt-12 scroll-mt-16">
        <span className="kicker">
          <b>01</b> <i>/</i> market
        </span>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h2>every coin here pays someone.</h2>
          {!site.isLive && <span className="badge badge-neutral">seed market</span>}
        </div>
        <p className="mt-4 max-w-xl text-ink-60">
          {seedCoins.length} coins indexed, {tagged} of them redirecting fees to a handle.
          {!site.isLive && " nothing is deployed yet — these rows are a seeded example, not trades."}
        </p>
        <div className="mt-10">
          <CoinTable coins={seedCoins} />
        </div>
      </Reveal>

      <Reveal id="how" className="section scroll-mt-16">
        <span className="kicker">
          <b>02</b> <i>/</i> how it works
        </span>
        <h2 className="mt-4">three steps, zero permission.</h2>
        <p className="mt-4 max-w-xl text-ink-60">
          you don&rsquo;t need the recipient to know about it. you don&rsquo;t need their wallet. you
          only need their handle.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s) => (
            <div key={s.n} className="card p-7 sm:p-8">
              <span className="block text-[48px] font-extrabold leading-none tracking-hero text-lime-deep tabular-nums">
                {s.n}
              </span>
              <h3 className="mt-6 text-[20px] font-bold">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-60">{s.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="section pt-0 lg:pt-0">
        <div className="card p-8 sm:p-12 lg:p-14 overflow-hidden">
          <span className="orb orb-float-slow absolute -right-6 -top-6 w-[110px] h-[110px] opacity-90" />
          <div className="relative max-w-2xl">
            <span className="kicker">
              <b>03</b> <i>/</i> for builders
            </span>
            <h3 className="mt-4 [font-size:clamp(30px,4vw,40px)] font-extrabold tracking-tight">
              the api is open.
            </h3>
            <p className="mt-4 text-ink-60 text-[16px] leading-relaxed">
              list coins, resolve handles, register launches — every endpoint the site uses is
              public, versioned and cors-friendly at{" "}
              <span className="font-mono text-ink">/api/v1</span>.
            </p>
            <Link className="btn-secondary mt-8" href="/docs">
              read the docs
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
