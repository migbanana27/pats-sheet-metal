"use client";

import { motion } from "framer-motion";
import {
  Award,
  Wrench,
  Quote,
  Hammer,
  Flame,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "../reveal";
import { SectionHeading, NavCta, ForgeButton } from "../ui-bits";
import {
  CRAFTSMEN,
  type Craftsman,
  type SocialLink,
} from "@/lib/site-data";
import { useNav } from "../nav-context";

const SOCIAL_ICONS: Record<
  SocialLink["platform"],
  React.ComponentType<{ className?: string }>
> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
};

/** Returns the craftsman's initials (e.g. "Pat McAllister" → "PM"). */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function AboutView() {
  return (
    <>
      <AboutHero />
      <CraftsmenSection />
      <PrincipleSection />
      <StatsBand />
    </>
  );
}

function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-silver/15 bg-black py-24 sm:py-32">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 grayscale"
        style={{ backgroundImage: "url(/images/gallery-structural.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-forge" /> The Forge
          </p>
          <h1 className="max-w-4xl font-display text-5xl font-bold uppercase leading-[0.92] text-foreground sm:text-7xl">
            The Makers Behind the <span className="text-forge">Metal</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-silver/80 sm:text-lg">
            Meet the craftsmen behind Pat&apos;s Sheet Metal in Austin, TX.
            Decades of combined experience in custom fabrication, HVAC, and
            architectural metal — and an obsession with quality you can see in
            every weld.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CraftsmenSection() {
  return (
    <section className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our Craftsmen"
            title={
              <>
                Hover to <span className="text-forge">Flip the Card</span>
              </>
            }
            description="Each card reveals their specialty, certifications, and signature equipment. Tap on mobile."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CRAFTSMEN.map((c, i) => (
            <StaggerItem key={c.name} delay={i * 0.05}>
              <FlipCard craftsman={c} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function FlipCard({ craftsman }: { craftsman: Craftsman }) {
  return (
    <div className="group h-[26rem] [perspective:1400px]">
      <div className="preserve-3d relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-y-180 group-focus-within:rotate-y-180">
        {/* FRONT */}
        <div className="backface-hidden absolute inset-0 flex flex-col overflow-hidden border border-silver/15 bg-steel">
          {/* Industrial texture backdrop (no portrait photo) */}
          <div className="brushed-metal absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />

          {/* Monogram + role */}
          <div className="relative flex flex-1 flex-col items-center justify-center px-6 pt-8">
            <div className="relative flex size-24 items-center justify-center border-2 border-forge/40 bg-black/40 backdrop-blur-sm">
              <span className="font-display text-3xl font-bold text-forge">
                {initials(craftsman.name)}
              </span>
              <span className="absolute -inset-1 border border-silver/10" />
            </div>
            <span className="mt-5 bg-forge px-2.5 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-black">
              {craftsman.role}
            </span>
            <h3 className="mt-3 text-center font-display text-2xl font-bold uppercase text-foreground">
              {craftsman.name}
            </h3>
            <p className="mt-1 font-display text-xs uppercase tracking-wider text-forge">
              {craftsman.specialty}
            </p>
          </div>

          {/* Social icons */}
          <div className="relative flex items-center justify-center gap-2 border-t border-silver/15 bg-black/50 px-6 py-4 backdrop-blur-sm">
            {craftsman.social.map((link) => {
              const Icon = SOCIAL_ICONS[link.platform];
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${craftsman.name} on ${link.platform}`}
                  className="flex size-9 items-center justify-center border border-silver/25 text-silver/70 transition-all hover:-translate-y-0.5 hover:border-forge hover:bg-forge hover:text-black"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>

          <span className="absolute right-4 top-4 font-display text-[0.6rem] uppercase tracking-[0.25em] text-silver/50">
            Flip →
          </span>
        </div>

        {/* BACK */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 overflow-hidden border border-forge/40 bg-gradient-to-br from-silver to-[#9a9a9a] p-6 text-black">
          <Quote className="size-8 text-black/70" />
          <p className="mt-3 font-display text-lg font-bold uppercase leading-tight">
            &ldquo;{craftsman.quote}&rdquo;
          </p>

          <div className="mt-5">
            <p className="flex items-center gap-2 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-black/70">
              <Award className="size-3.5" /> Certifications
            </p>
            <ul className="mt-2 space-y-1">
              {craftsman.certifications.map((cert) => (
                <li key={cert} className="text-xs font-medium text-black/85">
                  · {cert}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <p className="flex items-center gap-2 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-black/70">
              <Wrench className="size-3.5" /> Signature Equipment
            </p>
            <ul className="mt-2 space-y-1">
              {craftsman.equipment.map((eq) => (
                <li key={eq} className="text-xs font-medium text-black/85">
                  · {eq}
                </li>
              ))}
            </ul>
          </div>

          {/* Social icons on the back too */}
          <div className="absolute bottom-5 left-6 right-6 flex items-center gap-2 border-t border-black/15 pt-4">
            {craftsman.social.map((link) => {
              const Icon = SOCIAL_ICONS[link.platform];
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${craftsman.name} on ${link.platform}`}
                  className="flex size-8 items-center justify-center border border-black/25 text-black/70 transition-all hover:-translate-y-0.5 hover:border-black hover:bg-black hover:text-forge"
                >
                  <Icon className="size-3.5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function PrincipleSection() {
  return (
    <section className="bg-steel py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our Principle"
            title={
              <>
                The Work <span className="text-forge">Speaks</span> for Itself.
              </>
            }
          />
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            We built this shop on a simple principle: the work speaks for
            itself. Every weld, every cut, every bend is a testament to our
            obsession with quality. We don&apos;t chase volume — we chase
            the perfect build.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            When you bring your blueprint to Pat&apos;s, you join a roster of
            Austin builds built to last. From a single custom hood to a
            full commercial HVAC run, the standard never drops.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <NavCta to="services" label="Explore Services" variant="forge" />
            <NavCta to="contact" label="Get a Quote" variant="outline" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-4">
            <FeatureTile
              icon={Hammer}
              title="Built Heavy"
              copy="Heavy-gauge steel and structural welds that take a beating."
            />
            <FeatureTile
              icon={Flame}
              title="Built Precise"
              copy="Tolerances held to the millimeter. No guesswork."
              accent
            />
            <FeatureTile
              icon={Award}
              title="Built Certified"
              copy="AWS & SMACNA certified craftsmanship on every job."
              accent
            />
            <FeatureTile
              icon={Wrench}
              title="Built Local"
              copy="Austin-born, Hill Country proud. We build for Texas."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeatureTile({
  icon: Icon,
  title,
  copy,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  copy: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "border border-forge/40 bg-black p-6"
          : "border border-silver/15 bg-black p-6"
      }
    >
      <Icon className="size-7 text-forge" />
      <h3 className="mt-4 font-display text-base font-bold uppercase text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {copy}
      </p>
    </div>
  );
}

function StatsBand() {
  const { navigate } = useNav();
  const stats = [
    { value: "30+", label: "Years of Shop Experience" },
    { value: "1,200+", label: "Projects Forged" },
    { value: "±1mm", label: "Engineering Tolerance" },
    { value: "5★", label: "Austin Customer Rating" },
  ];
  return (
    <section className="border-y border-silver/15 bg-black py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerGroup className="grid grid-cols-2 gap-px overflow-hidden border border-silver/15 bg-silver/15 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="bg-black p-6 text-center">
                <p className="font-display text-4xl font-bold uppercase text-forge">
                  {s.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <div className="mt-10 text-center">
          <ForgeButton size="lg" onClick={() => navigate("contact")}>
            Partner With the Shop
          </ForgeButton>
        </div>
      </div>
    </section>
  );
}
