import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "support",
  description: `questions about launching, claiming or the ${site.name} api.`,
};

const faq = [
  {
    q: "how do i create a token?",
    a: "click 'create', fill in your token details, optionally tag a beneficiary for the creator fees, and launch. the beneficiary claims from the claim page whenever they like.",
  },
  {
    q: "how do social beneficiaries claim fees?",
    a: "visit the claim page and log in with the social account that was tagged — the fees are collected straight to the embedded wallet keyed to that account. you can also export that wallet's private key and import it into any wallet you like.",
  },
  {
    q: "what are the fees?",
    a: `${site.name} is free to use. we don't charge a platform fee — only the network fee and, at launch, the ${site.launchFeeEth} eth that pays for the deployment.`,
  },
  {
    q: "can the recipient be changed after launch?",
    a: "no. the fee recipient is written into the contract at launch. that is the whole point: whoever you tag keeps it, including you if you tag yourself, and nobody can redirect it later.",
  },
  {
    q: "what happens if the tagged account never logs in?",
    a: "nothing is lost. the fees accrue to that account's wallet on-chain and sit there. the day the owner signs in, the whole balance is claimable.",
  },
  {
    q: "is my wallet safe?",
    a: `yes. ${site.name} is non-custodial. we never have access to your private keys — for social wallets, the embedded-wallet provider manages the keys and the account owner controls them.`,
  },
];

export default function SupportPage() {
  return (
    <div className="pt-8 lg:pt-12 pb-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-up">
        <div className="card px-6 py-8 sm:px-9 sm:py-10">
          <span className="kicker mb-4">support</span>
          <h1 className="text-[36px] sm:text-[44px] font-extrabold tracking-[-0.02em] leading-[1.05] mb-4">
            we&rsquo;re here to help.
          </h1>
          <p className="text-ink-60">
            reach us on x at{" "}
            <a className="link" href={site.xUrl} target="_blank" rel="noreferrer">
              {site.xHandle}
            </a>{" "}
            (dms open), or through the{" "}
            <Link className="link" href="/docs">
              docs
            </Link>{" "}
            — they cover the api and fee model in detail, and the integration section explains how to
            reach us about listings and endpoints.
          </p>
        </div>

        <div className="card px-6 py-7 sm:px-9 sm:py-9">
          <span className="kicker mb-5">
            <b>01</b> <i>/</i> faq
          </span>
          <div className="divide-y divide-divider">
            {faq.map((item) => (
              <div key={item.q} className="py-5 first:pt-0 last:pb-0">
                <h3 className="text-ink text-[18px] mb-2">{item.q}</h3>
                <p className="text-ink-60">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
