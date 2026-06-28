"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { useNav } from "./nav-context";
import { SHOP } from "@/lib/site-data";

/**
 * Sticky bottom CTA bar.
 * Appears after the user scrolls past the hero (~75vh) and softly pulses.
 * Hidden on the contact view (user is already there).
 */
export function StickyCta() {
  const { view, navigate } = useNav();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.75;
      setShow(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = show && view !== "contact";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-4 sm:pb-4"
        >
          <div className="pulse-forge mx-auto flex max-w-3xl items-center justify-between gap-3 border border-forge/40 bg-steel/95 px-4 py-3 backdrop-blur-md sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="hidden size-9 shrink-0 items-center justify-center bg-forge text-black sm:flex">
                <ArrowRight className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-bold uppercase tracking-wide text-foreground">
                  Bring Your Blueprint to Life
                </p>
                <p className="hidden truncate text-xs text-muted-foreground sm:block">
                  Free custom quote from Austin&apos;s premier fabricators.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={SHOP.phoneHref}
                className="flex size-10 items-center justify-center border border-silver/30 text-silver transition-colors hover:border-forge hover:text-forge sm:hidden"
                aria-label={`Call ${SHOP.phone}`}
              >
                <Phone className="size-4" />
              </a>
              <a
                href={SHOP.phoneHref}
                className="hidden items-center gap-2 border border-silver/30 px-4 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-silver transition-colors hover:border-forge hover:text-forge sm:flex"
              >
                <Phone className="size-4" />
                <span className="hidden md:inline">Call the Shop</span>
              </a>
              <button
                onClick={() => navigate("contact")}
                className="bg-forge px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#ff7a2e] sm:px-6"
              >
                Get My Quote
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
