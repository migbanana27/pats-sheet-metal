"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Hammer,
  Wind,
  Gem,
  ArrowRight,
  Check,
  ClipboardList,
  PencilRuler,
  Flame,
  Truck,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "../reveal";
import { SectionHeading, ForgeButton } from "../ui-bits";
import { useNav } from "../nav-context";
import { SERVICES, type ServiceId } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Hammer,
  Wind,
  Gem,
};

const PROCESS = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Consult",
    copy: "Send us your blueprint, sketch, or specs. We review every detail and quote fast.",
  },
  {
    icon: PencilRuler,
    step: "02",
    title: "Engineer",
    copy: "We plan the cut, bend, and weld sequence — tolerances locked to the millimeter.",
  },
  {
    icon: Flame,
    step: "03",
    title: "Fabricate",
    copy: "Heavy machinery meets hand-finish craftsmanship in the shop. Sparks fly.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Deliver",
    copy: "Quality-checked, finished, and delivered on schedule across Austin & Hill Country.",
  },
];

export function ServicesView() {
  const { service, navigate } = useNav();
  const active = SERVICES.find((s) => s.id === service) ?? SERVICES[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-silver/15 bg-black py-24 sm:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 grayscale"
          style={{ backgroundImage: `url(${active.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-forge" /> Our Services
            </p>
            <h1 className="max-w-4xl font-display text-5xl font-bold uppercase leading-[0.92] text-foreground sm:text-7xl">
              What We <span className="text-forge">Build</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-silver/80 sm:text-lg">
              Three specialties. One standard of precision. Whether you need
              structural fabrication, sealed ductwork, or hand-finished
              architectural metal — we build to your exact specs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tab selector */}
      <div className="sticky top-16 z-30 border-b border-silver/15 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 no-scrollbar sm:px-6 lg:px-8">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon] ?? Hammer;
            const isActive = s.id === active.id;
            return (
              <button
                key={s.id}
                onClick={() => navigate("services", s.id as ServiceId)}
                className={cn(
                  "flex shrink-0 items-center gap-2 border-b-2 px-4 py-4 font-display text-xs font-semibold uppercase tracking-wider transition-colors sm:text-sm",
                  isActive
                    ? "border-forge text-forge"
                    : "border-transparent text-silver/60 hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {s.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active service detail */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden border border-silver/15">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${active.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute left-5 top-5 bg-forge px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-black">
                  {active.tag}
                </span>
              </div>

              {/* Copy */}
              <div>
                <SectionHeading
                  eyebrow={active.tag}
                  title={active.h1}
                />
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {active.copy}
                </p>

                <ul className="mt-7 space-y-3">
                  {active.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-forge/15 text-forge">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-silver/85">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ForgeButton onClick={() => navigate("contact")}>
                    Get a Quote for {active.title}
                  </ForgeButton>
                  <ForgeButton
                    variant="outline"
                    onClick={() => navigate("gallery")}
                  >
                    See {active.title} Work
                  </ForgeButton>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Process */}
      <section className="bg-steel py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="The Process"
              title={
                <>
                  Blueprint to <span className="text-forge">Build</span>
                </>
              }
              description="A clear, communicative process that keeps your project on schedule and on spec."
              align="center"
              className="mx-auto"
            />
          </Reveal>

          <StaggerGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-silver/15 bg-silver/15 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <StaggerItem key={p.step}>
                <div className="group h-full bg-black p-7 transition-colors hover:bg-[#0a0a0a]">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center border border-silver/20 text-forge transition-colors group-hover:bg-forge group-hover:text-black">
                      <p.icon className="size-6" />
                    </span>
                    <span className="font-display text-3xl font-bold text-silver/15">
                      {p.step}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold uppercase text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.copy}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-forge py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <h2 className="font-display text-3xl font-bold uppercase leading-tight text-black sm:text-4xl">
            Got specs? We&apos;ve got the shop.
          </h2>
          <ForgeButton
            size="lg"
            variant="silver"
            onClick={() => navigate("contact")}
            icon={<ArrowRight className="size-5" />}
          >
            Request a Custom Quote
          </ForgeButton>
        </div>
      </section>
    </>
  );
}
