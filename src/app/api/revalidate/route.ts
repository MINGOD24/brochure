import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Wake Strapi (if sleeping) then revalidate.
 * Polls Strapi server-side for up to 4 minutes, then busts both the
 * Data Cache (revalidateTag) and Full Route Cache (revalidatePath).
 *
 * Called by:
 *  - Vercel cron (every 6 hours)
 *  - StrapiRetryAfterSleep client component
 *  - Strapi webhook on content change
 *  - Manual visit to /api/revalidate
 */

const POLL_INTERVAL = 15_000; // 15 seconds between pings
const MAX_WAIT = 4 * 60 * 1000; // 4 minutes max wait for cold start

async function waitForStrapi(): Promise<boolean> {
  const start = Date.now();

  while (Date.now() - start < MAX_WAIT) {
    try {
      const res = await fetch(`${STRAPI_URL}/api/hero`, {
        headers: {
          ...(process.env.STRAPI_API_TOKEN
            ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
            : {}),
        },
        signal: AbortSignal.timeout(30_000),
        cache: "no-store",
      });
      // Any HTTP response means Strapi is awake
      if (res.ok || res.status === 401 || res.status === 403) {
        return true;
      }
    } catch {
      // Still waking up
    }
    await new Promise((r) => setTimeout(r, POLL_INTERVAL));
  }
  return false;
}

function checkSecret(secret: string | null) {
  return (
    !process.env.REVALIDATE_SECRET ||
    secret === process.env.REVALIDATE_SECRET
  );
}

export const maxDuration = 300; // Allow up to 5 min for Vercel serverless

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!checkSecret(secret)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const awake = await waitForStrapi();
  revalidateTag("strapi", { expire: 0 });
  revalidatePath("/");
  return Response.json({ revalidated: true, strapiAwake: awake, now: Date.now() });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const secret = body.secret ?? request.nextUrl.searchParams.get("secret");
  if (!checkSecret(secret)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const awake = await waitForStrapi();
  revalidateTag("strapi", { expire: 0 });
  revalidatePath("/");
  return Response.json({ revalidated: true, strapiAwake: awake, now: Date.now() });
}
