/* eslint-disable @next/next/no-img-element */
import { brandArt, site } from "@/lib/site";

/**
 * The hero wordmark. Drawn, not photographed — the name is a string, so
 * renaming the site renames the balloon. Set `brandArt.hero` to swap in a
 * rendered PNG instead; the drawn version stays the fallback and still serves
 * anything that isn't the wordmark itself (the 404, for one).
 */
export function Balloon({ text = site.wordmark }: { text?: string }) {
  if (brandArt.hero && text === site.wordmark) {
    return (
      <img
        src={brandArt.hero}
        alt={site.wordmark}
        className="w-full max-w-[720px] h-auto select-none [filter:drop-shadow(0_28px_40px_#18426040)]"
      />
    );
  }

  return <span className="balloon">{text}</span>;
}

/**
 * The single-letter version used as the logo. `size` is the rendered box in
 * px; the glyph is sized to fill it.
 */
export function BalloonMark({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`inline-grid place-items-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {brandArt.mark ? (
        <img
          src={brandArt.mark}
          alt=""
          width={size}
          height={size}
          className="w-full h-full object-contain [filter:drop-shadow(0_6px_10px_#18426040)]"
        />
      ) : (
        <span className="balloon balloon-mark" style={{ fontSize: size * 1.24 }}>
          {site.mark}
        </span>
      )}
    </span>
  );
}
