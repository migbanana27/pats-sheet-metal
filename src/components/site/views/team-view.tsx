"use client";

import {
  Award,
  Wrench,
  Quote,
  Hammer,
  Flame,
  Users,
  Heart,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowRight,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "../reveal";
import { SectionHeading, ForgeButton, NavCta } from "../ui-bits";
import {
  CRAFTSMEN,
  SHOP,
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

export function TeamView() {
  return (
    <>
      <TeamHero />
      <RosterSection />
      <CultureSection />
      <ApprenticeSection />
      <TeamStatsBand />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function TeamHero() {
  return (
    <section className="relative overflow-hidden border-b border-silver/15 bg-black py-24 sm:py-32">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 grayscale"
        style={{ backgroundImage: "url(/images/welder-portrait.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-forge" /> Our Team
          </p>
          <h1 className="max-w-4xl font-display text-5xl font-bold uppercase leading-[0.92] text-foreground sm:text-7xl">
            The Hands Behind the <span className="text-forge">Forge</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-silver/80 sm:text-lg">
            Three craftsmen. Eight decades of combined shop time. Every weld,
            cut, and bend that leaves Pat&apos;s Sheet Metal passes through
            their hands — and they sign off on every one of them.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Roster — full craftsman cards (not the flip cards from About)             */
/* -------------------------------------------------------------------------- */

function RosterSection() {
  return (
    <section className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="The Roster"
            title={
              <>
                Meet the <span className="text-forge">Crew</span>
              </>
            }
            description="Each one runs their own bench. Each one answers for the work that comes off it."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {CRAFTSMEN.map((c) => (
            <StaggerItem key={c.name}>
              <CraftsmanCard craftsman={c} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function CraftsmanCard({ craftsman }: { craftsman: Craftsman }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-silver/15 bg-steel transition-colors hover:border-forge/40">
      {/* Portrait area */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="brushed-metal absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/85" />

        {/* Monogram block (no portrait photo) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <div className="relative flex size-28 items-center justify-center border-2 border-forge/40 bg-black/40 backdrop-blur-sm">
            <span className="font-display text-4xl font-bold text-forge">
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

        <span className="absolute right-4 top-4 font-display text-[0.6rem] uppercase tracking-[0.25em] text-silver/50">
          {craftsman.name.split(" ")[0]}
        </span>
      </div>

      {/* Body: quote, certs, equipment */}
      <div className="flex flex-1 flex-col border-t border-silver/15 p-6">
        <Quote className="size-6 text-forge" />
        <p className="mt-2 font-display text-base font-bold uppercase leading-tight text-foreground">
          &ldquo;{craftsman.quote}&rdquo;
        </p>

        <div className="mt-5">
          <p className="flex items-center gap-2 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-silver/70">
            <Award className="size-3.5 text-forge" /> Certifications
          </p>
          <ul className="mt-2 space-y-1">
            {craftsman.certifications.map((cert) => (
              <li key={cert} className="text-xs font-medium text-silver/85">
                · {cert}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <p className="flex items-center gap-2 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-silver/70">
            <Wrench className="size-3.5 text-forge" /> Signature Equipment
          </p>
          <ul className="mt-2 space-y-1">
            {craftsman.equipment.map((eq) => (
              <li key={eq} className="text-xs font-medium text-silver/85">
                · {eq}
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className="mt-6 flex items-center gap-2 border-t border-silver/15 pt-4">
          {craftsman.social.map((link) => {
            const Icon = SOCIAL_ICONS[link.platform];
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${craftsman.name} on ${link.platform}`}
                className="flex size-8 items-center justify-center border border-silver/25 text-silver/70 transition-all hover:-translate-y-0.5 hover:border-forge hover:bg-forge hover:text-black"
              >
                <Icon className="size-3.5" />
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Culture — what it's like in the shop                                       */
/* -------------------------------------------------------------------------- */

function CultureSection() {
  const pillars = [
    {
      icon: Hammer,
      title: "Built Heavy",
      copy: "Heavy-gauge steel and structural welds that take a beating. We don't shy away from the hard jobs — we actively chase them.",
    },
    {
      icon: Flame,
      title: "Built Precise",
      copy: "Tolerances held to the millimeter. Every craftsman here owns their mistakes, which is why there are so few of them.",
    },
    {
      icon: Award,
      title: "Built Certified",
      copy: "AWS D1.1 structural, SMACNA HVAC, architectural sheet metal — the certs aren't decoration, they're the floor.",
    },
    {
      icon: Heart,
      title: "Built Honest",
      copy: "If your blueprint won't work, we'll tell you to your face. If we can do better for the same money, we will.",
    },
  ];

  return (
    <section className="bg-steel py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Shop Culture"
              title={
                <>
                  How the Bench <span className="text-forge">Runs</span>
                </>
              }
            />
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              We&apos;re a small shop on purpose. Three leads, one apprentice,
              and Pat in the back checking every joint before it ships. No
              silos, no handoffs, no &ldquo;not my job&rdquo; — every person
              here touches the metal.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              That flat structure is the only reason we can promise commercial
              turnaround on Monday and a museum-grade copper hood on Friday
              without dropping the bar on either.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <NavCta to="contact" label="Work With Us" variant="forge" />
              <NavCta to="gallery" label="See the Work" variant="outline" />
            </div>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 gap-px overflow-hidden border border-silver/15 bg-silver/15 sm:grid-cols-2">
            {pillars.map((p) => (
              <StaggerItem key={p.title}>
                <div className="h-full bg-black p-6">
                  <p.icon className="size-7 text-forge" />
                  <h3 className="mt-4 font-display text-base font-bold uppercase text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {p.copy}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Apprentice — recruiting / "join the shop" CTA                              */
/* -------------------------------------------------------------------------- */

function ApprenticeSection() {
  const { navigate } = useNav();
  return (
    <section className="border-y border-silver/15 bg-black py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto flex size-14 items-center justify-center border border-forge/40 bg-forge/10">
            <Users className="size-7 text-forge" />
          </div>
          <p className="eyebrow mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-forge" /> Apprenticeships
            <span className="h-px w-8 bg-forge" />
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight text-foreground sm:text-5xl">
            Want to <span className="text-forge">Join the Bench?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-silver/80">
            We take on one apprentice a year. You&apos;ll start on cleanup,
            earn your way onto the press brake, and — if you stick — sit for
            your AWS cert on our dime. No experience required, just a steady
            hand and the willingness to be told &ldquo;no, do it again&rdquo;
            until it&apos;s right.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ForgeButton size="lg" onClick={() => navigate("contact")}>
              Apply at the Shop <ArrowRight className="size-4" />
            </ForgeButton>
            <a
              href={SHOP.phoneHref}
              className="inline-flex items-center justify-center gap-2 border border-silver/30 px-6 py-3 font-display text-xs font-semibold uppercase tracking-wider text-silver transition-colors hover:border-forge hover:text-forge"
            >
              Or Call: {SHOP.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stats band                                                                 */
/* -------------------------------------------------------------------------- */

function TeamStatsBand() {
  const stats = [
    { value: "3", label: "Master Craftsmen" },
    { value: "80+", label: "Combined Years on the Bench" },
    { value: "1,200+", label: "Projects Shipped" },
    { value: "1", label: "Apprentice a Year" },
  ];
  return (
    <section className="bg-black py-16">
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
      </div>
    </section>
  );
}
