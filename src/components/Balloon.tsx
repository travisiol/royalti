import { site } from "@/lib/site";

/**
 * The hero wordmark. Drawn, not photographed — the name is a string, so
 * renaming the site renames the balloon.
 */
export function Balloon({ text = site.wordmark }: { text?: string }) {
  return (
    <span className="balloon" data-text={text}>
      {text}
    </span>
  );
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
      <span
        className="balloon balloon-mark"
        data-text={site.mark}
        style={{ fontSize: size * 1.24 }}
      >
        {site.mark}
      </span>
    </span>
  );
}
