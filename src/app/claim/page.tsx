import type { Metadata } from "next";
import { LoginButton } from "@/components/LoginButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "claim",
  description: `if someone routed a coin's creator fees to your account, the wallet already exists. log in on ${site.name} and it's yours.`,
};

export default function ClaimPage() {
  return (
    <div className="pt-8 lg:pt-12 pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="card max-w-lg mx-auto mt-6 lg:mt-12 px-7 py-8 sm:px-10 sm:py-10 text-center animate-fade-up">
          <span className="kicker mb-4">claim</span>
          <h2 className="text-[36px] font-extrabold tracking-[-0.02em] leading-[1.05] mb-4">
            were you tagged?
          </h2>
          <p className="text-ink-60 mb-1">
            if someone routed a coin&rsquo;s creator fees to your account, the wallet already exists.
          </p>
          <p className="text-ink-60 mb-7">log in and it&rsquo;s yours.</p>

          <div className="flex justify-center">
            <LoginButton className="btn-primary w-full sm:w-auto" label="log in to check" />
          </div>

          <p className="text-[13px] text-ink-60 mt-6">works with x, github and twitch</p>

          <p className="text-[13px] text-ink-60 mt-7 border-t border-divider pt-5">
            fees accrue on each coin&rsquo;s curve as people trade — they wait for you until you
            claim.
          </p>
        </div>
      </div>
    </div>
  );
}
