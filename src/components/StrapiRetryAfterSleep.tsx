"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const POLL_INTERVAL_MS = 15_000; // Check every 15 seconds
const MAX_WAIT_MS = 5 * 60 * 1000; // Give up after 5 minutes

/**
 * When Strapi was sleeping we showed cached content. This component polls
 * our own API to wake Strapi and revalidate once it responds.
 */
export default function StrapiRetryAfterSleep() {
  const router = useRouter();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let cancelled = false;
    const startTime = Date.now();

    async function pollUntilAwake() {
      while (!cancelled && Date.now() - startTime < MAX_WAIT_MS) {
        try {
          const res = await fetch("/api/wake-strapi", {
            signal: AbortSignal.timeout(35_000),
          });
          const data = await res.json();
          if (data.awake) {
            // Strapi is up — bust caches and refresh
            await fetch("/api/revalidate");
            router.refresh();
            return;
          }
        } catch {
          // our API or Strapi still down
        }
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      }

      // Timed out but still try to revalidate in case Strapi woke on its own
      if (!cancelled) {
        try {
          await fetch("/api/revalidate");
          router.refresh();
        } catch {}
      }
    }

    pollUntilAwake();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return null;
}
