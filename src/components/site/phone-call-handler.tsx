"use client";

import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { SHOP } from "@/lib/site-data";

/**
 * Global handler for every `tel:` link on the site.
 *
 * On click of any `<a href="tel:...">`:
 *  - Desktop: preventDefault (avoids the useless "open external app?" prompt),
 *    copy the shop number to the clipboard, and show a toast with the number.
 *  - Mobile: let the dialer open normally AND copy + toast as a convenience.
 *
 * This guarantees "Call the Shop" always does something visible, everywhere.
 */
export function PhoneCallHandler() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href^='tel:']") as HTMLAnchorElement | null;
      if (!anchor) return;

      const isMobile =
        /Android|iPhone|iPad|iPod|Mobile|Silk|BlackBerry|Windows Phone/i.test(
          navigator.userAgent || "",
        ) ||
        ("ontouchstart" in window && window.innerWidth < 1024);

      // On desktop, stop the tel: navigation (which is a no-op or an annoying
      // "open in app?" prompt). On mobile, let it dial.
      if (!isMobile) {
        e.preventDefault();
      }

      // Copy the number to the clipboard so the user can paste it anywhere.
      try {
        navigator.clipboard?.writeText(SHOP.phone).catch(() => {});
      } catch {
        /* clipboard unavailable — toast still shows the number */
      }

      toast({
        title: "Call Pat's Sheet Metal",
        description: `${SHOP.phone}  —  number copied to your clipboard.`,
        className: "border-forge/60 bg-steel text-foreground",
      });
    };

    // Use capture so we run before any per-link handlers / default actions.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
