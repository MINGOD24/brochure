import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

/**
 * Revalidate the homepage so the next request refetches from Strapi.
 * Uses revalidateTag to bust the Next.js Data Cache for all Strapi fetches,
 * plus revalidatePath to bust the Full Route Cache.
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (
    process.env.REVALIDATE_SECRET &&
    secret !== process.env.REVALIDATE_SECRET
  ) {
    return new Response("Unauthorized", { status: 401 });
  }
  revalidateTag("strapi", { expire: 0 });
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
  revalidateTag("strapi", { expire: 0 });
  revalidatePath("/");
  return Response.json({ revalidated: true, now: Date.now() });
}
