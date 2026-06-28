"use client";

import { Star, Quote, ArrowRight, PenLine, ExternalLink } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "../reveal";
import { SectionHeading, ForgeButton } from "../ui-bits";
import { useNav } from "../nav-context";
import { REVIEWS, SHOP } from "@/lib/site-data";

export function ReviewsView() {
  const { navigate } = useNav();
  const avg =
    REVIEWS.reduce((a, r) => a + r.rating, 0) / REVIEWS.length;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-silver/15 bg-black py-24 sm:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 grayscale"
          style={{ backgroundImage: "url(/images/gallery-copper-hood.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-forge" /> Reviews
            </p>
            <h1 className="max-w-4xl font-display text-5xl font-bold uppercase leading-[0.92] text-foreground sm:text-7xl">
              The Verdict is <span className="text-forge">In</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-silver/80 sm:text-lg">
              Don&apos;t take our word for it. Here&apos;s what contractors and
              homeowners across Austin are saying about Pat&apos;s Sheet Metal.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Rating summary */}
      <section className="bg-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 gap-px overflow-hidden border border-silver/15 bg-silver/15 sm:grid-cols-3">
              <div className="bg-steel p-8 text-center">
                <p className="font-display text-6xl font-bold text-forge">
                  {avg.toFixed(1)}
                </p>
                <div className="mt-2 flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-5 fill-forge text-forge"
                    />
                  ))}
                </div>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Average Rating
                </p>
              </div>
              <div className="bg-steel p-8 text-center">
                <p className="font-display text-6xl font-bold text-foreground">
                  {REVIEWS.length}+
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Customer Reviews
                </p>
              </div>
              <div className="bg-steel p-8 text-center">
                <p className="font-display text-6xl font-bold text-foreground">
                  100%
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Would Recommend
                </p>
              </div>
            </div>
          </Reveal>

          {/* Leave a review on Google CTA */}
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border border-forge/30 bg-forge/5 p-5 sm:flex-row sm:p-6">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <PenLine className="size-6 shrink-0 text-forge" />
                <div>
                  <p className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
                    Worked with us recently?
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Leave a review on Google and help other Austin builders find
                    a shop they can trust.
                  </p>
                </div>
              </div>
              <a
                href={SHOP.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 bg-forge px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#ff7a2e]"
              >
                Leave a Review on Google
                <ExternalLink className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="bg-steel py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <StaggerItem key={r.name}>
                <ReviewCard
                  name={r.name}
                  role={r.role}
                  rating={r.rating}
                  text={r.text}
                  project={r.project}
                  date={r.date}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-col items-center gap-4 border border-silver/15 bg-black p-8 text-center">
              <Quote className="size-8 text-forge" />
              <h3 className="font-display text-2xl font-bold uppercase text-foreground">
                Ready to Start Your Project?
              </h3>
              <p className="max-w-md text-sm text-muted-foreground">
                Become the next 5-star review. Bring your blueprint to the shop
                that Austin trusts.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <ForgeButton
                  size="lg"
                  onClick={() => navigate("contact")}
                  icon={<ArrowRight className="size-5" />}
                >
                  Request a Custom Quote
                </ForgeButton>
                <a
                  href={SHOP.googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-silver/30 px-6 py-4 font-display text-sm font-semibold uppercase tracking-wider text-silver transition-colors hover:border-forge hover:text-forge"
                >
                  Read More on Google
                  <ExternalLink className="size-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ReviewCard({
  name,
  role,
  rating,
  text,
  project,
  date,
}: {
  name: string;
  role: string;
  rating: number;
  text: string;
  project: string;
  date: string;
}) {
  return (
    <div className="group flex h-full flex-col border border-silver/15 bg-black p-6 transition-all duration-300 hover:-translate-y-1 hover:border-forge/40">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-forge text-forge" />
          ))}
        </div>
        <span className="font-display text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
          {date}
        </span>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-silver/85">
        &ldquo;{text}&rdquo;
      </p>
      <div className="mt-5 border-t border-silver/10 pt-4">
        <p className="font-display text-sm font-bold uppercase text-foreground">
          {name}
        </p>
        <p className="text-xs text-muted-foreground">{role}</p>
        <span className="mt-2 inline-block bg-forge/10 px-2 py-0.5 font-display text-[0.55rem] font-bold uppercase tracking-[0.15em] text-forge">
          {project}
        </span>
      </div>
    </div>
  );
}
