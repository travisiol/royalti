import type { Metadata } from "next";
import { CoinTable } from "@/components/CoinTable";
import { seedCoins } from "@/lib/coins";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "coins",
  description: `every coin launched on ${site.name}, sorted by market cap.`,
};

export default function CoinsPage() {
  return (
    <div className="pb-24">
      <div className="mb-10 animate-fade-up">
        <span className="kicker mb-3">coins</span>
        <h1 className="text-[40px] font-extrabold text-ink tracking-tight leading-none">
          every coin here pays someone.
        </h1>
        <p className="text-ink-60 mt-4 max-w-xl">
          every coin launched on {site.name}, sorted by market cap — search by name, ticker, address
          or the handle it redirects fees to.
          {!site.isLive && (
            <>
              {" "}
              nothing is deployed yet, so this is the seed set rather than a live index.
            </>
          )}
        </p>
      </div>

      <CoinTable coins={seedCoins} />
    </div>
  );
}
