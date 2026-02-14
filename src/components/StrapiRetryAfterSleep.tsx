"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * When Strapi was sleeping we showed cached content. This component calls
 * /api/revalidate which wakes Strapi server-side, then refreshes the page.
 */
export default function StrapiRetryAfterSleep() {
  const router = useRouter();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // The revalidate endpoint now handles waking Strapi (up to 4 min),
    // then busts the cache. We just call it and refresh when done.
    fetch("/api/revalidate")
      .then(() => router.refresh())
      .catch(() => {});
  }, [router]);

  return null;
}
