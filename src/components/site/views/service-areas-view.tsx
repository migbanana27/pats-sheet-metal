"use client";

import { MapPin, Truck, Clock, Star, Navigation } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "../reveal";
import { SectionHeading, ForgeButton } from "../ui-bits";
import { MapEmbed } from "../map-embed";
import { useNav } from "../nav-context";
import { SERVICE_AREAS, SHOP } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function ServiceAreasView() {
  const { navigate } = useNav();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-silver/15 bg-black py-24 sm:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 grayscale"
          style={{ backgroundImage: "url(/images/gallery-flashing.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-forge" /> Service Areas
            </p>
            <h1 className="max-w-4xl font-display text-5xl font-bold uppercase leading-[0.92] text-foreground sm:text-7xl">
              Serving the Heart of <span className="text-forge">Texas</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-silver/80 sm:text-lg">
              Based in Austin, we ship and deliver our custom metalwork to
              contractors and homeowners across Travis County and the
              surrounding Hill Country.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Areas grid */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Coverage Map"
              title={
                <>
                  Where We <span className="text-forge">Deliver</span>
                </>
              }
              description="Austin home base, with fast weekly routes across the Hill Country. Don't see your town? Just ask — we go where the work is."
            />
          </Reveal>

          <StaggerGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {SERVICE_AREAS.map((area) => (
              <StaggerItem key={area.name}>
                <div
                  className={cn(
                    "group relative h-full overflow-hidden border p-6 transition-all duration-300 hover:-translate-y-1",
                    area.primary
                      ? "border-forge bg-forge/5"
                      : "border-silver/15 bg-steel hover:border-forge/40",
                  )}
                >
                  <MapPin
                    className={cn(
                      "size-6",
                      area.primary ? "text-forge" : "text-silver/50 group-hover:text-forge",
                    )}
                  />
                  <h3 className="mt-4 font-display text-xl font-bold uppercase text-foreground">
                    {area.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {area.note}
                  </p>
                  {area.primary && (
                    <span className="absolute right-3 top-3 bg-forge px-2 py-0.5 font-display text-[0.55rem] font-bold uppercase tracking-[0.15em] text-black">
                      HQ
                    </span>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Delivery info */}
      <section className="bg-steel py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-silver/15 bg-silver/15 md:grid-cols-3">
            {[
              {
                icon: Truck,
                title: "Fast Delivery",
                copy: "Austin metro & close suburbs get priority turnaround — often same week.",
              },
              {
                icon: Clock,
                title: "Weekly Routes",
                copy: "Scheduled delivery routes to Georgetown, San Marcos, Buda & Lakeway.",
              },
              {
                icon: Star,
                title: "Shipping Available",
                copy: "Beyond Hill Country? We crate and ship custom pieces statewide.",
              },
            ].map((f) => (
              <div key={f.title} className="bg-black p-8">
                <f.icon className="size-8 text-forge" />
                <h3 className="mt-4 font-display text-lg font-bold uppercase text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.copy}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-silver/15 bg-black">
            <Reveal>
              <div className="border-b border-silver/15 p-6 text-center sm:p-8">
                <p className="eyebrow mb-2 flex items-center justify-center gap-2">
                  <Navigation className="size-3.5" /> Visit the Shop
                </p>
                <p className="font-display text-2xl font-bold uppercase text-foreground sm:text-3xl">
                  {SHOP.address}
                </p>
                <p className="mt-1 text-sm text-silver/70">{SHOP.hours}</p>
              </div>
              <MapEmbed variant="wide" />
              <div className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row sm:p-8">
                <p className="text-center text-sm text-muted-foreground sm:text-left">
                  Based in South Austin, just minutes from I-35. Drop by during
                  shop hours or schedule a visit.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                      SHOP.address,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-forge px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#ff7a2e]"
                  >
                    <Navigation className="size-4" /> Get Directions
                  </a>
                  <ForgeButton variant="outline" onClick={() => navigate("contact")}>
                    Check If We Cover Your Area
                  </ForgeButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
