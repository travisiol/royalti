"use client";

import { useEffect, useRef, useState } from "react";

export const authConfigured = Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID);

/**
 * Log in with X, GitHub or Twitch. The social login is what turns a handle
 * into a claimable wallet, so it needs a real Privy app — until one is
 * configured the button says exactly what is missing instead of pretending to
 * open a modal.
 */
export function LoginButton({ className = "btn-secondary btn-sm", label = "login" }: {
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={wrap}>
      <button type="button" className={className} onClick={() => setOpen((v) => !v)}>
        {label}
      </button>
      {open && (
        <div className="card card-sm bg-elevated absolute right-0 top-full mt-2 w-64 p-4 z-50 text-left">
          <span className="kicker mb-2">login</span>
          <p className="text-[13px] text-ink-60 leading-relaxed">
            social login is not wired up on this deployment yet. it needs a privy app id in{" "}
            <code className="code-inline">NEXT_PUBLIC_PRIVY_APP_ID</code> — that is what mints the
            embedded wallet a handle resolves to.
          </p>
        </div>
      )}
    </div>
  );
}
