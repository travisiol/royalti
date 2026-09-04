import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "terms of service",
  description: `the terms governing your use of ${site.name}.`,
};

export const LAST_UPDATED = "September 4, 2026";

export default function TermsPage() {
  return (
    <div className="pt-8 lg:pt-12 pb-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto animate-fade-up">
        <div className="card px-6 py-8 sm:px-9 sm:py-10">
          <span className="kicker mb-4">legal</span>
          <h1 className="text-[36px] sm:text-[44px] font-extrabold tracking-[-0.02em] leading-[1.05] mb-2">
            terms of service
          </h1>
          <p className="text-[12px] font-bold uppercase tracking-[0.13em] text-ink-60 mb-8 pb-6 border-b border-divider">
            last updated: {LAST_UPDATED}
          </p>

          <div className="space-y-7 text-ink-60">
            <section>
              <h3 className="text-ink text-[18px] mb-2">1. introduction</h3>
              <p>
                These Terms of Service govern your access to and use of {site.name} (&ldquo;we,&rdquo;
                &ldquo;our,&rdquo; or &ldquo;us&rdquo;) website and all related services. By using
                our Services, you agree to be bound by these Terms.
              </p>
            </section>

            <section>
              <h3 className="text-ink text-[18px] mb-2">2. services</h3>
              <p>
                {site.name} provides tools to launch tokens on {site.chain.name}, with automatic
                creator fee routing to social accounts. We are non-custodial and never have access to
                your private keys.
              </p>
            </section>

            <section>
              <h3 className="text-ink text-[18px] mb-2">3. eligibility</h3>
              <p>
                You must be at least 18 years old and capable of forming a binding contract. You must
                not be located in any sanctioned jurisdiction.
              </p>
            </section>

            <section>
              <h3 className="text-ink text-[18px] mb-2">4. fees</h3>
              <p>
                {site.name} does not charge a platform fee. Standard network fees apply, plus the
                fixed launch fee shown on the create page at the time of launch.
              </p>
            </section>

            <section>
              <h3 className="text-ink text-[18px] mb-2">5. tagging third-party accounts</h3>
              <p>
                You may direct a token&rsquo;s creator fees to a social account you do not control.
                Doing so does not create any relationship between that account holder and you, and
                does not imply their endorsement of, or involvement in, the token. Do not present a
                token as authorised by, affiliated with, or issued by an account holder who has not
                said so.
              </p>
            </section>

            <section>
              <h3 className="text-ink text-[18px] mb-2">6. risk disclosure</h3>
              <p>
                Digital assets are volatile and may lose value. Blockchain transactions are
                irreversible. The fee recipient of a token is fixed at launch and cannot be changed
                afterwards. You assume all risks associated with using the Services and transacting
                in digital assets.
              </p>
            </section>

            <section>
              <h3 className="text-ink text-[18px] mb-2">7. prohibited uses</h3>
              <ul className="list-disc pl-5 space-y-1 marker:text-lime-deep">
                <li>Unlawful activity</li>
                <li>Fraud or market manipulation</li>
                <li>Impersonation of any person or organisation</li>
                <li>Intellectual property infringement</li>
                <li>Abusive activity or spam</li>
              </ul>
            </section>

            <section>
              <h3 className="text-ink text-[18px] mb-2">8. disclaimer</h3>
              <p className="uppercase text-[13px] tracking-[0.02em]">
                The services are provided &ldquo;as is&rdquo; without warranties of any kind.{" "}
                {site.name} is not a financial advisor. Nothing constitutes financial, investment,
                legal, or tax advice.
              </p>
            </section>

            <section>
              <h3 className="text-ink text-[18px] mb-2">9. contact</h3>
              <p>
                For questions about these Terms, reach out through the{" "}
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
