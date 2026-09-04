import { json, notConfigured, preflight } from "@/lib/api";

export const dynamic = "force-dynamic";

export function OPTIONS() {
  return preflight();
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "bad_request", message: "body must be json" }, 400);
  }

  const mint = (body as { mint?: unknown })?.mint;
  if (typeof mint !== "string" || !/^0x[0-9a-fA-F]{40}$/.test(mint)) {
    return json({ error: "bad_request", message: "mint must be a contract address" }, 400);
  }

  // Registration is only trustworthy if we re-read the token on-chain and check
  // the submitted beneficiaries against the contract's fee recipient. That needs
  // an RPC endpoint; until there is one, accepting the body would mean trusting
  // it, which is exactly what the docs promise we never do.
  return notConfigured("token registration", "ROYALTI_RPC_URL");
}
