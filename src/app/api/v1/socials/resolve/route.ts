import { json, notConfigured, preflight } from "@/lib/api";

export const dynamic = "force-dynamic";

const PLATFORMS = new Set(["x", "github", "twitch"]);

export function OPTIONS() {
  return preflight();
}

export function GET(req: Request) {
  const url = new URL(req.url);
  const platform = (url.searchParams.get("platform") ?? "").toLowerCase();
  const username = (url.searchParams.get("username") ?? "").trim().replace(/^@/, "");

  if (!PLATFORMS.has(platform)) {
    return json(
      {
        error: "bad_request",
        message: "platform must be one of x, github, twitch",
        received: platform || null,
      },
      400
    );
  }

  if (!username) {
    return json({ error: "bad_request", message: "username is required" }, 400);
  }

  // Minting the wallet a handle resolves to needs the embedded-wallet provider.
  // Without it there is no address to return, and inventing one would hand a
  // caller a wallet nobody can ever claim.
  return notConfigured("social wallet resolution", "PRIVY_APP_SECRET");
}
