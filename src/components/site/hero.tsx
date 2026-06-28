"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX, ArrowRight, Phone, ChevronDown } from "lucide-react";
import { useIndustrialAudio } from "./use-industrial-audio";
import { useNav } from "./nav-context";
import { ForgeButton, CallCta } from "./ui-bits";
import { SHOP, TRUST_STATS } from "@/lib/site-data";

export function Hero() {
  const { muted, toggle } = useIndustrialAudio();
  const { navigate } = useNav();

  return (
    <section className="relative flex min-h-[92vh] w-full items-center overflow-hidden bg-black">
      {/* Background "video reel" — slow-zoom image + animated spark streaks */}
      <div className="absolute inset-0">
        <div
          className="animate-slow-zoom absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-foundry.png)" }}
        />
        {/* Darkening gradients for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        {/* Animated spark streaks */}
        <SparkStreaks />
      </div>

      {/* Unmute control */}
      <button
        onClick={toggle}
        className="absolute right-4 top-4 z-20 flex items-center gap-2 border border-silver/25 bg-black/50 px-3 py-2 font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-silver backdrop-blur-sm transition-colors hover:border-forge hover:text-forge sm:right-6 sm:top-6"
        aria-label={muted ? "Play background music" : "Mute background music"}
      >
        {muted ? (
          <>
            <VolumeX className="size-4" /> Play Music
          </>
        ) : (
          <>
            <Volume2 className="size-4 text-forge" /> Mute
            <span className="flex items-end gap-0.5">
              <span className="h-2 w-0.5 animate-pulse bg-forge [animation-delay:0ms]" />
              <span className="h-3 w-0.5 animate-pulse bg-forge [animation-delay:120ms]" />
              <span className="h-2 w-0.5 animate-pulse bg-forge [animation-delay:240ms]" />
            </span>
          </>
        )}
      </button>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-forge" />
            Austin, Texas · Est. Heavy Industry
          </p>
          <h1 className="font-display text-5xl font-bold uppercase leading-[0.92] text-foreground sm:text-7xl lg:text-8xl">
            Forged in Austin.
            <br />
            <span className="text-forge">Built to Outlast.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-silver/80 sm:text-lg">
            Premium custom sheet metal fabrication, HVAC ductwork, and
            architectural metalwork for contractors and homeowners who won&apos;t
            settle for off-the-shelf.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ForgeButton size="lg" onClick={() => navigate("contact")}>
              Request a Custom Quote
            </ForgeButton>
            <CallCta label={`Call the Shop: ${SHOP.phone}`} size="lg" />
          </div>
        </motion.div>

        {/* Trust stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-16 grid max-w-3xl grid-cols-1 gap-px overflow-hidden border border-silver/15 bg-silver/15 sm:grid-cols-3"
        >
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="bg-black/70 p-5 backdrop-blur-sm">
              <p className="font-display text-2xl font-bold uppercase text-forge">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-silver/70">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-silver/50"
        >
          <span className="font-display text-[0.6rem] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <ChevronDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function SparkStreaks() {
  const streaks = [
    { left: "12%", top: "30%", delay: "0s", dur: "2.4s" },
    { left: "28%", top: "55%", delay: "0.8s", dur: "3.1s" },
    { left: "47%", top: "22%", delay: "1.4s", dur: "2.7s" },
    { left: "63%", top: "48%", delay: "0.3s", dur: "3.4s" },
    { left: "78%", top: "35%", delay: "1.9s", dur: "2.2s" },
    { left: "88%", top: "60%", delay: "0.6s", dur: "2.9s" },
  ];
  return (
    <div className="absolute inset-0">
      {streaks.map((s, i) => (
        <span
          key={i}
          className="absolute block h-px w-16 bg-gradient-to-r from-transparent via-forge to-transparent opacity-0"
          style={{
            left: s.left,
            top: s.top,
            animation: `spark-fly ${s.dur} ${s.delay} ease-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes spark-fly {
          0% { opacity: 0; transform: translateX(-40px) scaleX(0.3); }
          35% { opacity: 0.9; transform: translateX(20px) scaleX(1); }
          100% { opacity: 0; transform: translateX(80px) scaleX(0.2); }
        }
      `}</style>
    </div>
  );
}
