"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const RETRY_AFTER_MS = 4 * 60 * 1000; // 4 minutes

/**
 * When Strapi was sleeping we showed cached content. This component schedules a
 * revalidation after 4 minutes so the next load fetches fresh data from Strapi.
 */
export default function StrapiRetryAfterSleep() {
  const router = useRouter();
  const scheduled = useRef(false);

  useEffect(() => {
    if (scheduled.current) return;
    scheduled.current = true;

    const t = setTimeout(async () => {
      try {
        await fetch("/api/revalidate");
        router.refresh();
      } catch (e) {
        console.warn("Strapi retry revalidate failed:", e);
      }
    }, RETRY_AFTER_MS);

    return () => clearTimeout(t);
  }, [router]);

  return null;
}
