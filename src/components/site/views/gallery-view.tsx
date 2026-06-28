"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Maximize2 } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "../reveal";
import { SectionHeading, ForgeButton } from "../ui-bits";
import { DragCarousel } from "../drag-carousel";
import { useNav } from "../nav-context";
import { GALLERY, type GalleryItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Fabrication", "HVAC", "Architectural"] as const;
type Filter = (typeof FILTERS)[number];

export function GalleryView() {
  const [filter, setFilter] = useState<Filter>("All");
  const { navigate } = useNav();

  const filtered =
    filter === "All"
      ? GALLERY
      : GALLERY.filter((g) => g.category === filter);

  const featured = GALLERY.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-silver/15 bg-black py-24 sm:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 grayscale"
          style={{ backgroundImage: "url(/images/gallery-staircase.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-forge" /> The Anvil
            </p>
            <h1 className="max-w-4xl font-display text-5xl font-bold uppercase leading-[0.92] text-foreground sm:text-7xl">
              Real Metal. Real <span className="text-forge">Results</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-silver/80 sm:text-lg">
              From raw stock to finished masterpieces. Swipe through our recent
              Austin-area projects — fabrication, HVAC, and architectural
              metalwork that speaks for itself.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured carousel */}
      <section className="bg-black py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Featured"
              title={
                <>
                  Drag to <span className="text-forge">Swipe</span>
                </>
              }
              description="Auto-advancing carousel with rubber-band easing. Grab and drag on any device."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <DragCarousel autoplay autoplayDelay={4500}>
              {featured.map((item) => (
                <GallerySlide key={item.id} item={item} />
              ))}
            </DragCarousel>
          </Reveal>
        </div>
      </section>

      {/* Filter + grid */}
      <section className="bg-steel py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <SectionHeading
                eyebrow="Full Archive"
                title={
                  <>
                    The <span className="text-forge">Project</span> Wall
                  </>
                }
              />
              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "border px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider transition-colors",
                      filter === f
                        ? "border-forge bg-forge text-black"
                        : "border-silver/25 text-silver/70 hover:border-forge hover:text-forge",
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <StaggerGroup
            key={filter}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <StaggerItem key={item.id}>
                  <GalleryCard item={item} />
                </StaggerItem>
              ))}
            </AnimatePresence>
          </StaggerGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold uppercase text-foreground sm:text-5xl">
              Want Your Build on This Wall?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Bring us your blueprint. Let&apos;s forge something worth
              photographing.
            </p>
            <div className="mt-8 flex justify-center">
              <ForgeButton size="lg" onClick={() => navigate("contact")}>
                Start Your Project
              </ForgeButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function GallerySlide({ item }: { item: GalleryItem }) {
  return (
    <div className="group relative aspect-[16/10] overflow-hidden border border-silver/15">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${item.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <span className="bg-forge px-2.5 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-black">
          {item.category}
        </span>
        <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-tight text-foreground">
          {item.title}
        </h3>
        <p className="mt-2 max-w-md text-sm text-silver/75">{item.blurb}</p>
      </div>
      <Maximize2 className="absolute right-5 top-5 size-5 text-silver/50 transition-colors group-hover:text-forge" />
    </div>
  );
}

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <motion.div
      layout
      className="group relative aspect-square overflow-hidden border border-silver/15 bg-black"
    >
      <div
        className="absolute inset-0 bg-cover bg-center grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
        style={{ backgroundImage: `url(${item.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="bg-forge px-2 py-0.5 font-display text-[0.55rem] font-bold uppercase tracking-[0.2em] text-black">
          {item.category}
        </span>
        <h3 className="mt-2 font-display text-base font-bold uppercase leading-tight text-foreground">
          {item.title}
        </h3>
        <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-silver/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {item.blurb}
        </p>
      </div>
      <ArrowRight className="absolute right-4 top-4 size-5 text-forge opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}
