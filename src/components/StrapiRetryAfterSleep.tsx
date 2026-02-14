"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const POLL_INTERVAL_MS = 15_000; // Check every 15 seconds
const MAX_WAIT_MS = 5 * 60 * 1000; // Give up after 5 minutes

/**
 * When Strapi was sleeping we showed cached content. This component pings
 * Strapi until it wakes up, then revalidates so the next render gets fresh data.
 */
export default function StrapiRetryAfterSleep() {
  const router = useRouter();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let cancelled = false;
    const startTime = Date.now();

    async function pollStrapi() {
      while (!cancelled && Date.now() - startTime < MAX_WAIT_MS) {
        try {
          // Ping Strapi to wake it up and check if it's responding
          const res = await fetch(`${STRAPI_URL}/api/content-type-builder/content-types`, {
            method: "HEAD",
            signal: AbortSignal.timeout(10_000),
          });
          if (res.ok || res.status === 401 || res.status === 403) {
            // Strapi is awake (any response means the server is up)
            break;
          }
        } catch {
          // Still sleeping, wait and retry
        }
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      }

      if (cancelled) return;

      try {
        await fetch("/api/revalidate");
        router.refresh();
      } catch (e) {
        console.warn("Strapi retry revalidate failed:", e);
      }
    }

    pollStrapi();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return null;
}
