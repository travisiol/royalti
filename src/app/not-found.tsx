import Link from "next/link";
import { Balloon } from "@/components/Balloon";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-16">
      <div className="flex justify-center">
        <Balloon text="404" />
      </div>
      <h1 className="hero-h1 mt-10 [font-size:clamp(30px,4vw,44px)]">nothing floats here.</h1>
      <p className="mt-4 max-w-md text-ink-60">
        that page, coin or handle isn&rsquo;t on this deployment.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link className="btn-primary" href="/">
          back to explore
        </Link>
        <Link className="btn-secondary" href="/coins">
          browse coins
        </Link>
      </div>
    </div>
  );
}
