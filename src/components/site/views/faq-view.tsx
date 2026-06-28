"use client";

import { HelpCircle, ArrowRight, FileText } from "lucide-react";
import { Reveal } from "../reveal";
import { SectionHeading, ForgeButton } from "../ui-bits";
import { useNav } from "../nav-context";
import { FAQS, SHOP } from "@/lib/site-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqView() {
  const { navigate } = useNav();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-silver/15 bg-black py-24 sm:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 grayscale"
          style={{ backgroundImage: "url(/images/gallery-enclosure.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-forge" /> Common Questions
            </p>
            <h1 className="max-w-4xl font-display text-5xl font-bold uppercase leading-[0.92] text-foreground sm:text-7xl">
              What You <span className="text-forge">Need to Know</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-silver/80 sm:text-lg">
              The honest answers to the questions contractors and homeowners ask
              before trusting us with their build.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Questions & Answers"
              title={
                <>
                  Your Questions: <span className="text-forge">Answered</span>
                </>
              }
              align="center"
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
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-silver/15 bg-steel px-5 data-[state=open]:border-forge/40"
                >
                  <AccordionTrigger className="gap-4 py-5 text-left font-display text-base font-semibold uppercase tracking-wide text-foreground hover:no-underline hover:text-forge data-[state=open]:text-forge">
                    <HelpCircle className="size-5 shrink-0 text-forge" />
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pl-9 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>

          {/* Still have questions */}
          <Reveal delay={0.15}>
            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-silver/15 bg-silver/15 sm:grid-cols-2">
              <div className="bg-steel p-8">
                <FileText className="size-7 text-forge" />
                <h3 className="mt-4 font-display text-lg font-bold uppercase text-foreground">
                  Still have questions?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Call the shop and talk directly to a craftsman — no
                  salespeople, no runaround.
                </p>
                <a
                  href={SHOP.phoneHref}
                  className="mt-4 inline-flex items-center gap-2 font-display text-sm font-bold uppercase text-forge hover:underline"
                >
                  {SHOP.phone} <ArrowRight className="size-4" />
                </a>
              </div>
              <div className="bg-steel p-8">
                <HelpCircle className="size-7 text-forge" />
                <h3 className="mt-4 font-display text-lg font-bold uppercase text-foreground">
                  Ready to build?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Send us your blueprint and get a fast, honest custom quote.
                </p>
                <ForgeButton
                  className="mt-4"
                  onClick={() => navigate("contact")}
                >
                  Get a Custom Quote
                </ForgeButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
