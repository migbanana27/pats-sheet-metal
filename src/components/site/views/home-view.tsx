"use client";

import { motion } from "framer-motion";
import {
  Hammer,
  Wind,
  Gem,
  ArrowRight,
  ShieldCheck,
  Ruler,
  Timer,
  Star,
  Quote,
} from "lucide-react";
import { Hero } from "../hero";
import { Reveal, StaggerGroup, StaggerItem } from "../reveal";
import { SectionHeading, ForgeButton, NavCta } from "../ui-bits";
import { DragCarousel } from "../drag-carousel";
import { useNav } from "../nav-context";
import {
  SERVICES,
  CRAFTSMEN,
  FAQS,
  GALLERY,
  SHOP,
  type Service,
} from "@/lib/site-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Hammer,
  Wind,
  Gem,
};

const TRUST_ICONS = [Star, Ruler, Timer];

export function HomeView() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <ServicesSection />
      <WhyChooseSection />
      <GallerySneakPeek />
      <HomeFaq />
      <FinalCta />
    </>
  );
}

/* ---------------- Trust Marquee ---------------- */
function TrustMarquee() {
  const items = [
    "5-STAR RATED IN AUSTIN",
    "PRECISION TOLERANCES · ±1mm",
    "FAST TURNAROUNDS",
    "CUSTOM FABRICATION",
    "HVAC DUCTWORK",
    "ARCHITECTURAL METAL",
    "ZERO-LEAK GUARANTEE",
    "FORGED IN AUSTIN",
  ];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-silver/15 bg-steel py-3">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-display text-xs font-semibold uppercase tracking-[0.25em] text-silver/60"
          >
            {t}
            <span className="size-1.5 bg-forge" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Services ---------------- */
function ServicesSection() {
  const { navigate } = useNav();
  return (
    <section className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our Expertise"
            title={
              <>
                What We <span className="text-forge">Build</span>
              </>
            }
            description="Whether you're building from the ground up or upgrading existing systems, our shop delivers flawless execution."
          />
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICES.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard
                service={service}
                onExplore={() => navigate("services", service.id)}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  onExplore,
}: {
  service: Service;
  onExplore: () => void;
}) {
  const Icon = ICONS[service.icon] ?? Hammer;
  return (
    <button
      onClick={onExplore}
      className="group relative flex h-full w-full flex-col overflow-hidden border border-silver/15 bg-steel text-left transition-all duration-300 hover:-translate-y-1 hover:border-forge/50"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
          style={{ backgroundImage: `url(${service.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-steel via-steel/30 to-transparent" />
        <span className="absolute left-4 top-4 bg-forge px-2.5 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-black">
          {service.tag}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex size-12 items-center justify-center border border-silver/20 text-forge transition-colors group-hover:bg-forge group-hover:text-black">
          <Icon className="size-6" />
        </div>
        <h3 className="font-display text-xl font-bold uppercase leading-tight text-foreground">
          {service.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {service.short}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-wider text-forge">
          Explore
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  );
}

/* ---------------- Why Choose ---------------- */
function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden bg-steel py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Image */}
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
            <div
              className="absolute inset-0 bg-cover bg-center grayscale"
              style={{ backgroundImage: "url(/images/welder-portrait.png)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3 border border-silver/20 bg-black/70 p-4 backdrop-blur-sm">
                <ShieldCheck className="size-8 shrink-0 text-forge" />
                <div>
                  <p className="font-display text-sm font-bold uppercase text-foreground">
                    Master Fabricators
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Decades of combined shop experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal delay={0.1}>
          <SectionHeading
            eyebrow="Why Choose Pat's"
            title={
              <>
                Not Just a Shop.
                <br />
                A <span className="text-forge">Team</span> of Master Fabricators.
              </>
            }
          />
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            At Pat&apos;s Sheet Metal, we treat every project like a personal
            standard. We don&apos;t cut corners; we cut precision. When you
            bring your specs to us, you&apos;re not just getting a vendor —
            you&apos;re getting a dedicated partner committed to the success of
            your build.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {TRUST_ICONS.map((Icon, i) => {
              const labels = [
                { t: "Trusted", s: "5-star Austin rated" },
                { t: "Precise", s: "Tolerances to 1mm" },
                { t: "On Time", s: "Schedule-driven" },
              ];
              return (
                <div
                  key={i}
                  className="border border-silver/15 bg-black p-4"
                >
                  <Icon className="size-6 text-forge" />
                  <p className="mt-3 font-display text-sm font-bold uppercase text-foreground">
                    {labels[i].t}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {labels[i].s}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <NavCta to="about" label="Meet the Craftsmen" variant="forge" />
            <NavCta to="gallery" label="See the Work" variant="outline" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Gallery Sneak Peek ---------------- */
function GallerySneakPeek() {
  const { navigate } = useNav();
  const slides = GALLERY.map((item) => (
    <div key={item.id} className="group relative aspect-[16/10] overflow-hidden border border-silver/15">
      <div
        className="absolute inset-0 bg-cover bg-center grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
        style={{ backgroundImage: `url(${item.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="bg-forge px-2 py-0.5 font-display text-[0.55rem] font-bold uppercase tracking-[0.2em] text-black">
          {item.category}
        </span>
        <h3 className="mt-2 font-display text-lg font-bold uppercase leading-tight text-foreground">
          {item.title}
        </h3>
      </div>
    </div>
  ));

  return (
    <section className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="The Anvil"
              title={
                <>
                  Real Metal.
                  <br />
                  Real <span className="text-forge">Results</span>.
                </>
              }
              description="From raw stock to finished masterpieces. Swipe through our recent Austin-area projects."
            />
            <NavCta to="gallery" label="Full Gallery" variant="outline" />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <DragCarousel autoplay autoplayDelay={4200}>
            {slides}
          </DragCarousel>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Home FAQ ---------------- */
function HomeFaq() {
  const { navigate } = useNav();
  const subset = FAQS.slice(0, 4);
  return (
    <section className="bg-steel py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Common Questions"
            title={
              <>
                What You <span className="text-forge">Need to Know</span>
              </>
            }
            className="mx-auto"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion
            type="single"
            collapsible
            className="mt-12 space-y-3"
            defaultValue="faq-0"
          >
            {subset.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-silver/15 bg-black px-5 data-[state=open]:border-forge/40"
              >
                <AccordionTrigger className="py-5 text-left font-display text-base font-semibold uppercase tracking-wide text-foreground hover:no-underline hover:text-forge data-[state=open]:text-forge">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 text-center">
            <ForgeButton variant="outline" onClick={() => navigate("faq")}>
              See All FAQs
            </ForgeButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */
function FinalCta() {
  const { navigate } = useNav();
  return (
    <section className="bg-forge py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl font-bold uppercase leading-[0.95] text-black sm:text-6xl"
        >
          Bring Your Blueprint to Life.
        </motion.h2>
        <p className="mx-auto mt-5 max-w-2xl text-base font-medium text-black/80 sm:text-lg">
          Stop settling for off-the-shelf solutions. Get a custom quote from
          Austin&apos;s premier sheet metal fabricators today.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => navigate("contact")}
            className="group inline-flex items-center justify-center gap-2 bg-black px-8 py-4 font-display text-base font-bold uppercase tracking-wider text-forge transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#111]"
          >
            Get My Quote Now
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href={SHOP.phoneHref}
            className="inline-flex items-center justify-center gap-2 border-2 border-black px-8 py-4 font-display text-base font-bold uppercase tracking-wider text-black transition-all duration-200 hover:bg-black hover:text-forge"
          >
            <Quote className="size-5" />
            {SHOP.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
