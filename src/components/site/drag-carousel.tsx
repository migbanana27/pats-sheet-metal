"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DragCarouselProps {
  children: React.ReactNode[];
  autoplay?: boolean;
  autoplayDelay?: number;
  slideClassName?: string;
  className?: string;
  showArrows?: boolean;
}

/**
 * Drag-to-swipe carousel with native rubber-band easing (embla),
 * optional autoplay that pauses on hover/interaction.
 */
export function DragCarousel({
  children,
  autoplay = true,
  autoplayDelay = 3800,
  slideClassName,
  className,
  showArrows = true,
}: DragCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (!autoplay) return;
    // Clear any existing interval before starting a fresh one.
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    autoplayRef.current = setInterval(() => {
      if (pausedRef.current) return;
      emblaApi?.scrollNext();
    }, autoplayDelay);
  }, [autoplay, autoplayDelay, emblaApi]);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onTouchStart={() => {
        pausedRef.current = true;
      }}
      onTouchEnd={() => {
        pausedRef.current = false;
      }}
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {children.map((child, i) => (
            <div
              key={i}
              className={cn(
                "min-w-0 shrink-0 grow-0 basis-full pl-4 first:pl-0",
                slideClassName,
              )}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {showArrows && (
        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              aria-label="Previous"
              className="flex size-11 items-center justify-center border border-silver/25 text-silver transition-colors hover:border-forge hover:text-forge"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next"
              className="flex size-11 items-center justify-center border border-silver/25 text-silver transition-colors hover:border-forge hover:text-forge"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {children.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-1.5 transition-all duration-300",
                  i === selectedIndex
                    ? "w-8 bg-forge"
                    : "w-3 bg-silver/25 hover:bg-silver/50",
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
