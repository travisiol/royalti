import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { BalloonMark } from "./BalloonMark";
import { XIcon } from "./icons";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-20 pb-8">
      <div className="card px-6 py-6 sm:px-8 sm:py-7 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-flex items-center gap-3">
            <BalloonMark size={36} />
            <span className="text-[18px] font-extrabold tracking-[-0.03em] text-primary leading-none">
              {site.name}
            </span>
          </Link>
          <span className="hidden sm:inline text-[12px] font-semibold text-muted lowercase ml-3">
            built on {site.chain.name}
          </span>
        </div>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] font-bold uppercase tracking-kicker text-muted hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a
            className="icon-btn"
            href={site.xUrl}
            aria-label={`${site.name} on X`}
            target="_blank"
            rel="noreferrer"
          >
            <XIcon />
          </a>
        </nav>
      </div>
    </footer>
  );
}
