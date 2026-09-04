"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Coin } from "@/lib/coins";
import { ageLabel } from "@/lib/coins";
import { usd, usdCompact } from "@/lib/format";
import { AssetMark } from "./AssetMark";
import { CoinAvatar } from "./CoinAvatar";

type Sort = "mcap" | "newest" | "oldest" | "progress";

const sorts: { key: Sort; label: string }[] = [
  { key: "mcap", label: "mcap" },
  { key: "newest", label: "newest" },
  { key: "oldest", label: "oldest" },
  { key: "progress", label: "progress" },
];

export function CoinTable({ coins }: { coins: Coin[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("mcap");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^@/, "");
    const filtered = q
      ? coins.filter((c) =>
          [
            c.name,
            c.symbol,
            c.address,
            ...c.beneficiaries.map((b) => b.username),
          ]
            .join(" ")
            .toLowerCase()
            .includes(q)
        )
      : coins;

    const sorted = [...filtered];
    switch (sort) {
      case "newest":
        sorted.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "oldest":
        sorted.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "progress":
        sorted.sort((a, b) => b.curvePct - a.curvePct);
        break;
      default:
        sorted.sort((a, b) => b.marketCapUsd - a.marketCapUsd);
    }
    return sorted;
  }, [coins, query, sort]);

  return (
    <div className="panel !px-4 sm:!px-6 !pt-5 sm:!pt-6 !pb-2 sm:!pb-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pb-4">
        <input
          className="input input-pill flex-1 min-w-0"
          type="text"
          placeholder="search name, ticker, address or handle"
          aria-label="search coins"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex flex-wrap items-center gap-2 shrink-0" aria-label="sort coins">
          {sorts.map((s) => (
            <button
              key={s.key}
              type="button"
              className={`${sort === s.key ? "btn-primary" : "btn-secondary"} btn-sm`}
              onClick={() => setSort(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="hidden sm:table-cell w-10">#</th>
              <th>coin</th>
              <th className="text-right">mc</th>
              <th>curve</th>
              <th className="hidden sm:table-cell">fees to</th>
              <th className="hidden sm:table-cell">fees in</th>
              <th className="hidden sm:table-cell text-right">age</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((coin, i) => {
              const to = coin.beneficiaries[0];
              return (
                <tr
                  key={coin.address}
                  className="trow cursor-pointer"
                  onClick={() => router.push(`/coin/${coin.address}`)}
                >
                  <td className="hidden sm:table-cell w-10 text-subtle font-semibold tabular-nums">
                    {i + 1}
                  </td>
                  <td className="min-w-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <CoinAvatar address={coin.address} symbol={coin.symbol} size={28} />
                      <Link
                        href={`/coin/${coin.address}`}
                        className="font-bold text-ink truncate"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {coin.name}
                      </Link>
                      <span className="text-muted font-semibold shrink-0">${coin.symbol}</span>
                    </div>
                  </td>
                  <td className="text-ink font-semibold tabular-nums text-right whitespace-nowrap">
                    {usdCompact(coin.marketCapUsd)}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-3">
                      <div
                        className="progress w-16 sm:w-28 shrink-0"
                        style={{ ["--fill" as string]: `${coin.curvePct}%` }}
                      />
                      <span className="text-muted font-semibold tabular-nums hidden md:inline">
                        {coin.curvePct}%
                      </span>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell truncate max-w-[220px]">
                    {to ? (
                      <>
                        <span className="text-lime-text font-semibold">@{to.username}</span>
                        {to.earnedUsd !== null && (
                          <span className="text-muted tabular-nums"> · {usd(to.earnedUsd)}</span>
                        )}
                      </>
                    ) : (
                      <span className="text-subtle">—</span>
                    )}
                  </td>
                  <td className="hidden sm:table-cell whitespace-nowrap">
                    <span className="inline-flex items-center gap-2 whitespace-nowrap">
                      <AssetMark symbol={coin.pair} />
                      <span className="text-ink font-semibold">{coin.pair}</span>
                    </span>
                  </td>
                  <td className="hidden sm:table-cell text-muted tabular-nums text-right whitespace-nowrap" suppressHydrationWarning>
                    {ageLabel(coin.createdAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {rows.length === 0 && (
          <p className="text-muted text-center py-10">
            nothing matches “{query}”. every coin is searchable by name, ticker, contract or the
            handle it pays.
          </p>
        )}
      </div>
    </div>
  );
}
