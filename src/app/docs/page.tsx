import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "api",
  description: `route creator fees to any x, github or twitch account. no key, no auth, plain json.`,
};

const host = site.url.replace(/^https?:\/\//, "");

const quickstart = `curl "${site.url}/api/v1/socials/resolve?platform=x&username=someuser"

{ "wallet": "0x9b6a...f335" }`;

const resolveExample = `curl "${site.url}/api/v1/socials/resolve?platform=x&username=someuser"

{
  "verified": true,
  "username": "someuser",
  "userId": "2094063734041743360",   // platform-native user id
  "platform": "x",
  "wallet": "0x9b6a...f335",
  "walletCreated": true
}`;

const tokensExample = `curl ${site.url}/api/v1/tokens

{
  "tokens": [
    {
      "mint": "0x1234...abcd",
      "name": "Example",
      "symbol": "EXMPL",
      "imageUri": "https://gateway.pinata.cloud/ipfs/...",
      "createdAt": 1788100000000,
      "creator": { "wallet": "0x...", "username": "someuser", "type": "x" }
    }
  ]
}`;

const tokenExample = `curl ${site.url}/api/v1/tokens/0x1234...abcd

{
  "mint": "0x1234...abcd",
  "name": "Example",
  "symbol": "EXMPL",
  "beneficiaries": [
    { "type": "x", "value": "someuser", "walletAddress": "0x...", "percentage": 100 }
  ],
  "priceUsd": 0.0000189,
  "usdMarketCap": 18900,
  "graduated": false,
  "graduationPercent": 34
}`;

const registerExample = `curl -X POST ${site.url}/api/v1/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "mint": "0xYourTokenAddress",
    "beneficiaries": [{ "platform": "x", "username": "someuser", "walletAddress": "0xAbc...123" }]
  }'`;

const integrateExample = `curl "${site.url}/api/v1/socials/resolve?platform=x&username=someuser"
// → { "verified": true, "wallet": "0xAbc...123", ... }`;

export default function DocsPage() {
  return (
    <div className="pt-8 lg:pt-12 pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
        <div className="card px-6 py-8 sm:px-9 sm:py-10">
          <span className="kicker mb-4">api</span>
          <h1 className="text-[44px] sm:text-[60px] font-extrabold tracking-[-0.035em] leading-[0.98] mb-4">
            {site.name} api
          </h1>
          <p className="text-ink-60 text-[16px] sm:text-[17px] mb-7 max-w-xl">
            route creator fees to any x, github or twitch account. no key, no auth, plain json.
          </p>

          <span className="kicker mb-3">quickstart</span>
          <CodeBlock code={quickstart} />
          <p className="text-ink-60 mt-4 text-[14px]">
            one call turns a handle into a wallet you can pay fees to — the rest of this page is
            detail.
          </p>
        </div>

        <section className="card px-6 py-7 sm:px-9 sm:py-9">
          <span className="kicker mb-3">
            <b>01</b> <i>/</i> how it works
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-extrabold tracking-[-0.02em] leading-[1.05] mb-5">
            a handle becomes a wallet, the owner claims it
          </h2>

          <ol className="space-y-5">
            {[
              {
                title: "resolve a handle",
                body: `you call resolve with a platform and a username. ${site.name} verifies the account exists and returns a wallet address for it.`,
              },
              {
                title: "the wallet is keyed to the account",
                body: `if the account has never been seen before, an embedded wallet is created on the spot — keyed to the platform's native user id, so renames don't break it. it's non-custodial: ${site.name} holds no funds.`,
              },
              {
                title: "the owner logs in and claims",
                body: `whenever they like, the account owner signs in on ${site.name} with that same x, github or twitch account and collects everything their wallet has earned.`,
              },
            ].map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-lime text-ink text-[12px] font-extrabold tabular-nums inline-flex items-center justify-center shadow-glass-sm">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-ink mb-1">{step.title}</p>
                  <div className="text-ink-60">{step.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="card px-6 py-7 sm:px-9 sm:py-9">
          <span className="kicker mb-3">
            <b>02</b> <i>/</i> api reference
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-extrabold tracking-[-0.02em] leading-[1.05] mb-5">
            endpoints
          </h2>
          <p className="text-ink-60 mb-7">
            base url <code className="code-inline">{site.url}</code>. everything returns json, needs
            no authentication, and sends{" "}
            <code className="code-inline">Access-Control-Allow-Origin: *</code> so you can call it
            straight from a frontend. please cache responses where you can.
          </p>

          <div className="space-y-9">
            <div>
              <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                <span className="badge">GET</span>
                <code className="font-mono text-[13px] font-semibold text-ink break-all">
                  /api/v1/socials/resolve?platform={"{x|github|twitch}"}&amp;username={"{handle}"}
                </code>
              </div>
              <p className="text-ink-60 mb-4">
                resolves a social account to its wallet — the same resolution {site.name} uses at
                launch. if the account has never been seen before, an embedded wallet is created for
                it, claimable by the account owner via oauth login. use it to route fees, airdrops or
                payouts to any social account.
              </p>
              <CodeBlock code={resolveExample} />
            </div>

            <div>
              <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                <span className="badge">GET</span>
                <code className="font-mono text-[13px] font-semibold text-ink break-all">
                  /api/v1/tokens
                </code>
              </div>
              <p className="text-ink-60 mb-4">
                lists every token launched through {site.name}, newest first, with market data.
              </p>
              <CodeBlock code={tokensExample} />
            </div>

            <div>
              <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                <span className="badge">GET</span>
                <code className="font-mono text-[13px] font-semibold text-ink break-all">
                  /api/v1/tokens/{"{address}"}
                </code>
              </div>
              <p className="text-ink-60 mb-4">
                full detail for one token: metadata, tagged beneficiaries, and live market data.
              </p>
              <CodeBlock code={tokenExample} />
            </div>
          </div>

          <p className="text-ink-60 text-[14px] mt-8 pt-6 border-t border-divider">
            <span className="font-bold text-ink">what answers today.</span> the two token endpoints
            are live and serve the seed market. <code className="code-inline">resolve</code> and{" "}
            <code className="code-inline">register</code> reply{" "}
            <code className="code-inline">501</code> with the missing configuration named until the
            social-wallet provider and indexer are attached — they never return a made-up address.
          </p>
        </section>

        <section className="card px-6 py-7 sm:px-9 sm:py-9">
          <span className="kicker mb-3">
            <b>03</b> <i>/</i> register
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-extrabold tracking-[-0.02em] leading-[1.05] mb-5">
            give a launched token a {site.name} page
          </h2>

          <div>
            <div className="flex items-center gap-2.5 mb-3 flex-wrap">
              <span className="badge badge-neutral">POST</span>
              <code className="font-mono text-[13px] font-semibold text-ink break-all">
                /api/v1/register
              </code>
            </div>
            <p className="text-ink-60 mb-4">
              registers a launched token with {site.name} so it gets a page, a live chart and the{" "}
              <span className="font-semibold text-ink">fees → @handle</span> attribution.
              registration is trustless: name, ticker, image and socials are re-read on-chain, and
              beneficiaries are only accepted if they match the on-chain fee recipient — a spoofed
              body cannot fake any of it.
            </p>
            <CodeBlock code={registerExample} />
          </div>
        </section>

        <section className="card px-6 py-7 sm:px-9 sm:py-9">
          <span className="kicker mb-3">
            <b>04</b> <i>/</i> for launch platforms
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-extrabold tracking-[-0.02em] leading-[1.05] mb-5">
            add social fee routing to your launcher
          </h2>
          <p className="text-ink-60 mb-7">
            if you run a launch tool, a trading terminal or a bot, you can offer social fee routing
            with two api calls — no key, no contract changes on your side. your users type a handle,{" "}
            {site.name} turns it into a wallet, you launch as usual.
          </p>

          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-lime text-ink text-[12px] font-extrabold tabular-nums inline-flex items-center justify-center shadow-glass-sm">
                1
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-ink mb-1">resolve the handle into a wallet</p>
                <div className="text-ink-60">
                  <p className="mb-3">
                    works for any existing x, github or twitch account — the wallet is created on the
                    spot if needed.
                  </p>
                  <CodeBlock code={integrateExample} />
                </div>
              </div>
            </li>

            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-lime text-ink text-[12px] font-extrabold tabular-nums inline-flex items-center justify-center shadow-glass-sm">
                2
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-ink mb-1">
                  launch with that wallet as the fee recipient
                </p>
                <div className="text-ink-60">
                  pass the resolved wallet as{" "}
                  <code className="code-inline">creatorFeeRecipient</code> in your usual launch call.
                  the recipient is written into the contract at launch and can never be changed; from
                  the first trade, the creator tax accrues to the account&rsquo;s wallet.
                </div>
              </div>
            </li>

            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-lime text-ink text-[12px] font-extrabold tabular-nums inline-flex items-center justify-center shadow-glass-sm">
                3
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-ink mb-1">
                  (optional) register the token with {site.name}
                </p>
                <div className="text-ink-60">
                  call <code className="code-inline">POST /api/v1/register</code> (above) and the
                  token gets a {host} page, explore listing and claim visibility for the tagged
                  account. the claim flow is fully handled by {site.name} — the tagged account logs
                  in with their social account and collects, without ever needing to know which tool
                  launched the coin.
                </div>
              </div>
            </li>
          </ol>
        </section>

        <section className="card px-6 py-7 sm:px-9 sm:py-9">
          <span className="kicker mb-3">
            <b>05</b> <i>/</i> fee model
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-extrabold tracking-[-0.02em] leading-[1.05] mb-5">
            100% to the tagged account
          </h2>
          <p className="text-ink-60">
            whoever launches a coin sets a creator tax between 0% and {site.maxCreatorTaxPct}% —
            fixed at launch, never changeable afterwards. on every trade, the tagged x, github or
            twitch account receives 100% of that tax in its wallet. {site.name} charges nothing.
          </p>
        </section>

        <p className="text-ink-60 text-[14px] px-2">
          building an integration? reach out through the{" "}
          <Link className="link" href="/support">
            support page
          </Link>{" "}
          — we&rsquo;re happy to help, add endpoints, or list your platform.
        </p>
      </div>
    </div>
  );
}
