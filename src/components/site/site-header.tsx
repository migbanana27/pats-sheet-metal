"use client";

import { useState, useEffect } from "react";
import { Anvil, Menu, Phone, X } from "lucide-react";
import { useNav } from "./nav-context";
import { NAV_ITEMS, SHOP } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ForgeButton } from "./ui-bits";

export function SiteHeader() {
  const { view, navigate } = useNav();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: (typeof NAV_ITEMS)[number]["id"]) => {
    navigate(id);
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-silver/15 bg-black/85 backdrop-blur-md"
          : "border-transparent bg-gradient-to-b from-black/80 to-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => go("home")}
          className="group flex items-center gap-2.5"
          aria-label={`${SHOP.name} home`}
        >
          <span className="relative flex size-9 items-center justify-center bg-forge text-black">
            <Anvil className="size-5" strokeWidth={2.5} />
            <span className="absolute -inset-px border border-forge/50" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
              Pat&apos;s
            </span>
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
              Sheet Metal
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={cn(
                "relative px-3 py-2 font-display text-xs font-semibold uppercase tracking-wider transition-colors",
                view === item.id
                  ? "text-forge"
                  : "text-silver/70 hover:text-foreground",
              )}
            >
              {item.label}
              {view === item.id && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 bg-forge" />
              )}
            </button>
          ))}
        </nav>

        {/* Right: phone CTA (desktop) + mobile menu */}
        <div className="flex items-center gap-2">
          <a
            href={SHOP.phoneHref}
            className="hidden items-center gap-2 font-display text-sm font-semibold text-foreground transition-colors hover:text-forge md:flex"
          >
            <Phone className="size-4 text-forge" />
            {SHOP.phone}
          </a>
          <ForgeButton
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => go("contact")}
          >
            Get a Quote
          </ForgeButton>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="flex size-10 items-center justify-center border border-silver/20 text-silver lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-silver/15 bg-black p-0"
            >
              <SheetHeader className="border-b border-silver/15 p-5 text-left">
                <div className="flex items-center justify-between">
                  <SheetTitle className="flex items-center gap-2 font-display uppercase text-foreground">
                    <span className="flex size-7 items-center justify-center bg-forge text-black">
                      <Anvil className="size-4" strokeWidth={2.5} />
                    </span>
                    Pat&apos;s Sheet Metal
                  </SheetTitle>
                  <SheetClose asChild>
                    <button
                      aria-label="Close menu"
                      className="text-silver/70 hover:text-forge"
                    >
                      <X className="size-5" />
                    </button>
                  </SheetClose>
                </div>
              </SheetHeader>
              <nav className="flex flex-col p-3">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => go(item.id)}
                    className={cn(
                      "border-b border-silver/10 px-4 py-4 text-left font-display text-sm font-semibold uppercase tracking-wider transition-colors",
                      view === item.id
                        ? "text-forge"
                        : "text-silver/80 hover:text-forge",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="mt-4 flex flex-col gap-3 px-1">
                  <ForgeButton onClick={() => go("contact")}>
                    Request a Custom Quote
                  </ForgeButton>
                  <a
                    href={SHOP.phoneHref}
                    className="flex items-center justify-center gap-2 border border-silver/30 px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-silver hover:text-forge"
                  >
                    <Phone className="size-4" /> {SHOP.phone}
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
