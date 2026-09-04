import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "privacy policy",
  description: `how ${site.name} collects, uses and shares information about you.`,
};

export default function PrivacyPage() {
  return (
    <div className="pt-8 lg:pt-12 pb-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto animate-fade-up">
        <div className="card px-6 py-8 sm:px-9 sm:py-10">
          <span className="kicker mb-4">legal</span>
          <h1 className="text-[36px] sm:text-[44px] font-extrabold tracking-[-0.02em] leading-[1.05] mb-2">
            privacy policy
          </h1>
          <p className="text-[12px] font-bold uppercase tracking-[0.13em] text-ink-60 mb-8 pb-6 border-b border-divider">
            last updated: September 4, 2026
          </p>

          <div className="space-y-7 text-ink-60">
            <section>
              <h3 className="text-ink text-[18px] mb-2">1. introduction</h3>
              <p>
                This Privacy Policy describes how {site.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
                &ldquo;us&rdquo;) collects, uses, and shares information about you when you use our
                website and related services.
              </p>
            </section>

            <section>
              <h3 className="text-ink text-[18px] mb-2">2. information we collect</h3>
              <ul className="list-disc pl-5 space-y-1 marker:text-lime-deep">
                <li>Wallet addresses when you connect your wallet</li>
                <li>Social account information when you authenticate</li>
                <li>Token information you provide when creating tokens</li>
                <li>Log data including browser type, IP address, and pages viewed</li>
                <li>Transaction information recorded on the blockchain</li>
              </ul>
            </section>

            <section>
              <h3 className="text-ink text-[18px] mb-2">3. how we use your information</h3>
              <ul className="list-disc pl-5 space-y-1 marker:text-lime-deep">
                <li>Provide and maintain the Services</li>
                <li>Process token creation and transactions</li>
                <li>Facilitate creator fee distribution</li>
                <li>Detect and prevent fraud and abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h3 className="text-ink text-[18px] mb-2">4. public handles</h3>
              <p>
                A token&rsquo;s fee recipient is a public on-chain fact, and the handle it was tagged
                with is shown on that token&rsquo;s page. We publish only the public username and the
                wallet it resolves to — never an email address, and never anything private to the
                account.
              </p>
            </section>

            <section>
              <h3 className="text-ink text-[18px] mb-2">5. data security</h3>
              <p>
                We implement reasonable security measures to protect your information. {site.name} is
                non-custodial — we never have access to your private keys. For social beneficiary
                wallets, the embedded-wallet provider manages the keys and the account owner controls
                them.
              </p>
            </section>

            <section>
              <h3 className="text-ink text-[18px] mb-2">6. contact</h3>
              <p>
                For questions about this Privacy Policy, reach out through the{" "}
                <Link className="link" href="/support">
                  support page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
