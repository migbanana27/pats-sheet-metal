"use client";

import { Anvil, MapPin, Phone, Clock, Mail } from "lucide-react";
import { useNav } from "./nav-context";
import { NAV_ITEMS, SHOP } from "@/lib/site-data";

export function SiteFooter() {
  const { navigate } = useNav();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-silver/15 bg-black">
      {/* Hazard stripe accent */}
      <div className="hazard-stripes h-1.5 w-full" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center bg-forge text-black">
                <Anvil className="size-5" strokeWidth={2.5} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                  Pat&apos;s
                </span>
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                  Sheet Metal
                </span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Forged in Austin. Built to outlast. Premium custom sheet metal
              fabrication, HVAC ductwork, and architectural metalwork.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="eyebrow mb-4">Navigate</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => navigate(item.id)}
                    className="text-sm text-silver/70 transition-colors hover:text-forge"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="eyebrow mb-4">Our Services</h3>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => navigate("services", "fabrication")}
                  className="text-sm text-silver/70 transition-colors hover:text-forge"
                >
                  Heavy-Duty Fabrication
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("services", "hvac")}
                  className="text-sm text-silver/70 transition-colors hover:text-forge"
                >
                  HVAC &amp; Ductwork
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("services", "architectural")}
                  className="text-sm text-silver/70 transition-colors hover:text-forge"
                >
                  Architectural Metal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("gallery")}
                  className="text-sm text-silver/70 transition-colors hover:text-forge"
                >
                  Project Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="eyebrow mb-4">The Shop</h3>
            <ul className="space-y-3 text-sm text-silver/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-forge" />
                <span>{SHOP.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-forge" />
                <a href={SHOP.phoneHref} className="hover:text-forge">
                  {SHOP.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-forge" />
                <a href={`mailto:${SHOP.email}`} className="hover:text-forge">
                  {SHOP.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-forge" />
                <span>{SHOP.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-silver/10 pt-6 sm:flex-row">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            © {year} {SHOP.name}. All rights reserved.
          </p>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Forged in Austin · Built to Outlast
          </p>
        </div>
      </div>
    </footer>
  );
}
