"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { site } from "@/lib/site";
import { BalloonMark } from "./Balloon";

const KEY = "royalti:welcomed";

/** localStorage read as an external store, so nothing is guessed during render */
const noop = () => () => {};
const hasWelcomed = () => {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    // private mode / storage blocked — don't nag, and don't crash
    return true;
  }
};

/**
 * The first-visit card. Dismissal is remembered per browser, so it greets and
 * then gets out of the way. The server always renders it as already-seen: a
 * card that flashes on every prerendered page would be worse than a late one.
 */
export function WelcomeModal() {
  const welcomed = useSyncExternalStore(noop, hasWelcomed, () => true);
  const [dismissed, setDismissed] = useState(false);
  const open = !welcomed && !dismissed;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      // nothing to do; it will show again next visit
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-[#18426066] backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div className="card bg-elevated max-w-sm w-full p-7 sm:p-8 animate-fade-up relative text-center">
        <button
          type="button"
          className="icon-btn absolute top-3 right-3 text-lg leading-none"
          aria-label="close"
          onClick={dismiss}
        >
          ×
        </button>

        <div className="flex justify-center">
          <BalloonMark size={64} />
        </div>

        <h2 id="welcome-title" className="mt-4 text-[26px] sm:text-[28px] leading-[1.05]">
          welcome to {site.name}
        </h2>
        <p className="mt-3 text-muted leading-relaxed">
          launch a coin and redirect eth, usdg or stocks to any{" "}
          <span className="accent-word font-bold">@username</span>. they log in here and claim.
        </p>

        <button type="button" className="btn-primary w-full mt-6" onClick={dismiss}>
          get started
        </button>

        <p className="text-[12px] text-muted mt-4">
          by continuing you agree to the{" "}
          <Link className="link" href="/terms" onClick={dismiss}>
            terms
          </Link>{" "}
          and{" "}
          <Link className="link" href="/privacy" onClick={dismiss}>
            privacy policy
          </Link>
        </p>
      </div>
    </div>
  );
}
