import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "create a coin",
  description: `launch a coin on ${site.chain.name} and redirect its creator rewards to any x, github or twitch account.`,
};

export default function LaunchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
