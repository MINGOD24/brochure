import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

/**
 * Revalidate the homepage so the next request refetches from Strapi.
 * Used after Strapi was sleeping: client waits ~4 minutes then calls this
 * so the page is revalidated and Strapi has time to wake up.
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (
    process.env.REVALIDATE_SECRET &&
    secret !== process.env.REVALIDATE_SECRET
  ) {
    return new Response("Unauthorized", { status: 401 });
  }
  revalidatePath("/");
  return Response.json({ revalidated: true, now: Date.now() });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const secret = body.secret ?? request.nextUrl.searchParams.get("secret");
  if (
    process.env.REVALIDATE_SECRET &&
    secret !== process.env.REVALIDATE_SECRET
  ) {
    return new Response("Unauthorized", { status: 401 });
  }
  revalidatePath("/");
  return Response.json({ revalidated: true, now: Date.now() });
}
