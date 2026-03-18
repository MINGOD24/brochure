/**
 * Lightweight keep-alive endpoint for Strapi free tier.
 * Ping this every 20 minutes via cron-job.org (free) to prevent Strapi sleeping.
 * No auth required — it only pings Strapi, does not expose any data.
 */

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export const maxDuration = 30;

export async function GET() {
  const start = Date.now();
  try {
    const res = await fetch(`${STRAPI_URL}/api/hero`, {
      cache: "no-store",
      signal: AbortSignal.timeout(25_000),
    });
    return Response.json({
      ok: res.ok || res.status === 401 || res.status === 403,
      status: res.status,
      ms: Date.now() - start,
    });
  } catch (err) {
    return Response.json(
      { ok: false, error: String(err), ms: Date.now() - start },
      { status: 200 } // Always 200 so cron-job.org doesn't alarm on Strapi cold starts
    );
  }
}
