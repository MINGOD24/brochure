const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Server-side Strapi health check. Pings Strapi from the server (no CORS)
 * and reports whether it's awake. Used by StrapiRetryAfterSleep polling.
 */
export async function GET() {
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

    // Any response (even 401/403) means Strapi is awake
    return Response.json({ awake: true, status: res.status });
  } catch {
    return Response.json({ awake: false });
  }
}
