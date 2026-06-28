"use client";

import { cn } from "@/lib/utils";
import { SHOP } from "@/lib/site-data";

interface MapEmbedProps {
  /** Address to display. Defaults to the shop address. */
  address?: string;
  /** Optional business name to include in the search query. */
  placeName?: string;
  className?: string;
  /** iframe height in px. */
  height?: number;
  /** Compact mode for sidebars; wide for full-width sections. */
  variant?: "wide" | "compact";
}

/**
 * Google Maps embed — no API key required.
 *
 * Uses the classic `maps?q=...&output=embed` endpoint which renders an
 * interactive, draggable, zoomable Google Map centered on the query. Works
 * for any address/place without needing a Google Cloud API key.
 *
 * The map is keyboard-accessible (aria-label) and lazy-loads.
 */
export function MapEmbed({
  address = SHOP.address,
  placeName = "Pat's Sheet Metal",
  className,
  height = 420,
  variant = "wide",
}: MapEmbedProps) {
  const query = placeName
    ? `${placeName}, ${address}`
    : address;
  const src = `https://www.google.com/maps?q=${encodeURIComponent(
    query,
  )}&output=embed`;

  return (
    <div
      className={cn(
        "group relative overflow-hidden border border-silver/20 bg-steel",
        variant === "wide" && "aspect-[2/1] w-full",
        variant === "compact" && "w-full",
        className,
      )}
      style={variant === "compact" ? { height } : undefined}
    >
      <iframe
        title={`Google Map showing ${placeName || address}`}
        aria-label={`Map showing the location of ${placeName || address}`}
        src={src}
        className="absolute inset-0 h-full w-full grayscale transition-all duration-500 group-hover:grayscale-0"
        style={{ border: 0, filter: "contrast(1.1)" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      {/* Corner accent overlay so it blends with the dark theme */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 bg-gradient-to-r from-black/60 to-transparent p-4">
        <span className="bg-forge px-2 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-black">
          Find the Shop
        </span>
      </div>
    </div>
  );
}
