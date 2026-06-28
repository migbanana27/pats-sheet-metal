"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Generates a dark industrial-ambient music bed entirely in-browser via the
 * Web Audio API — no audio files, no licensing. Fitting for a metal shop:
 *
 *   - A sustained A-minor pad (detuned saws through a slowly-sweeping filter)
 *   - A pulsing sub-bass on the root
 *   - Slow metallic "anvil" hits (filtered noise burst + high ping)
 *   - A sparse A-minor-pentatonic melodic motif that repeats every ~16s
 *   - Master compressor/limiter for a glued, audible mix
 *
 * The hook keeps the same { muted, toggle } signature so the hero button
 * works unchanged. Clicking toggle starts/stops the music.
 */
export function useIndustrialAudio() {
  const [muted, setMuted] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{
    master: GainNode;
    stop: () => void;
  } | null>(null);

  const start = useCallback(() => {
    if (nodesRef.current) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      ctxRef.current = ctx;
      // Some browsers create the context in a "suspended" state until a user
      // gesture explicitly resumes it.
      ctx.resume?.().catch(() => {});

      // ─── Master chain: gain → compressor (limiter) → destination ───
      const master = ctx.createGain();
      master.gain.value = 0;
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -18;
      comp.knee.value = 24;
      comp.ratio.value = 6;
      comp.attack.value = 0.005;
      comp.release.value = 0.25;
      master.connect(comp).connect(ctx.destination);

      // Gentle 2s fade-in to a healthy, audible level.
      const now = ctx.currentTime;
      master.gain.setValueAtTime(0, now);
      master.gain.linearRampToValueAtTime(0.5, now + 2);

      const running: { osc: OscillatorNode }[] = [];
      const intervals: ReturnType<typeof setInterval>[] = [];

      // ─── 1. A-minor pad (A2, C3, E3, A3) — detuned saws + slow filter ───
      const padFilter = ctx.createBiquadFilter();
      padFilter.type = "lowpass";
      padFilter.frequency.value = 700;
      padFilter.Q.value = 6;
      const padGain = ctx.createGain();
      padGain.gain.value = 0.18;
      padFilter.connect(padGain).connect(master);

      // Slow LFO sweeping the pad filter cutoff (400 ↔ 1200 Hz) for movement.
      const filterLfo = ctx.createOscillator();
      filterLfo.type = "sine";
      filterLfo.frequency.value = 0.06;
      const filterLfoGain = ctx.createGain();
      filterLfoGain.gain.value = 400;
      filterLfo.connect(filterLfoGain).connect(padFilter.frequency);
      filterLfo.start();
      running.push({ osc: filterLfo });

      const chord = [110, 130.81, 164.81, 220]; // A2, C3, E3, A3
      chord.forEach((freq, i) => {
        // Two detuned saws per note for a richer chorus.
        [0, 6].forEach((detuneCents) => {
          const o = ctx.createOscillator();
          o.type = "sawtooth";
          o.frequency.value = freq;
          o.detune.value = detuneCents + (i % 2 === 0 ? -3 : 3);
          o.connect(padFilter);
          o.start();
          running.push({ osc: o });
        });
      });

      // ─── 2. Sub-bass pulse on A1 (55 Hz) with a slow tremolo ───
      const sub = ctx.createOscillator();
      sub.type = "sine";
      sub.frequency.value = 55;
      const subGain = ctx.createGain();
      subGain.gain.value = 0.0;
      sub.connect(subGain).connect(master);
      sub.start();
      running.push({ osc: sub });
      // Tremolo: 0.4 Hz pulse between 0.12 and 0.30.
      const subLfo = ctx.createOscillator();
      subLfo.type = "sine";
      subLfo.frequency.value = 0.4;
      const subLfoGain = ctx.createGain();
      subLfoGain.gain.value = 0.09;
      const subBase = ctx.createConstantSource();
      subBase.offset.value = 0.21;
      subBase.connect(subGain.gain);
      subBase.start();
      subLfo.connect(subLfoGain).connect(subGain.gain);
      subLfo.start();
      running.push({ osc: subLfo }, { osc: subBase });

      // ─── 3. Metallic "anvil" hits — noise burst + high ping, every ~4.5s ───
      // Pre-build a reusable noise buffer.
      const noiseBuf = ctx.createBuffer(
        1,
        Math.floor(ctx.sampleRate * 0.4),
        ctx.sampleRate,
      );
      const nd = noiseBuf.getChannelData(0);
      for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;

      const playAnvil = (when: number) => {
        // Noise burst through a bandpass (metallic transient).
        const n = ctx.createBufferSource();
        n.buffer = noiseBuf;
        const nf = ctx.createBiquadFilter();
        nf.type = "bandpass";
        nf.frequency.value = 1800;
        nf.Q.value = 1.4;
        const ng = ctx.createGain();
        ng.gain.setValueAtTime(0.0001, when);
        ng.gain.exponentialRampToValueAtTime(0.22, when + 0.005);
        ng.gain.exponentialRampToValueAtTime(0.0001, when + 0.18);
        n.connect(nf).connect(ng).connect(master);
        n.start(when);
        n.stop(when + 0.25);

        // High metallic ping (sine, fast exponential decay).
        const p = ctx.createOscillator();
        p.type = "sine";
        p.frequency.value = 1420;
        const pg = ctx.createGain();
        pg.gain.setValueAtTime(0.0001, when);
        pg.gain.exponentialRampToValueAtTime(0.16, when + 0.004);
        pg.gain.exponentialRampToValueAtTime(0.0001, when + 0.9);
        p.connect(pg).connect(master);
        p.start(when);
        p.stop(when + 1.0);
      };

      // ─── 4. Sparse melodic motif (A-minor pentatonic) every ~16s ───
      // A4, C5, D5, E5, G5, A5 — a slow, mournful phrase.
      const scale = [440, 523.25, 587.33, 659.25, 783.99, 880];
      // Phrase: indices into the scale, with timings (seconds from motif start).
      const phrase: { note: number; t: number }[] = [
        { note: 0, t: 0 },
        { note: 2, t: 1.4 },
        { note: 4, t: 2.8 },
        { note: 3, t: 4.4 },
        { note: 1, t: 6.0 },
        { note: 2, t: 7.6 },
        { note: 0, t: 9.4 },
      ];
      // A feedback delay for the motif (echoey, spacious feel).
      const delay = ctx.createDelay(1.0);
      delay.delayTime.value = 0.42;
      const delayFb = ctx.createGain();
      delayFb.gain.value = 0.38;
      const delayWet = ctx.createGain();
      delayWet.gain.value = 0.5;
      delay.connect(delayFb).connect(delay);
      delay.connect(delayWet).connect(master);

      const playMotif = (when: number) => {
        phrase.forEach(({ note, t }) => {
          const o = ctx.createOscillator();
          o.type = "triangle";
          o.frequency.value = scale[note];
          const g = ctx.createGain();
          const at = when + t;
          g.gain.setValueAtTime(0.0001, at);
          g.gain.exponentialRampToValueAtTime(0.14, at + 0.05);
          g.gain.exponentialRampToValueAtTime(0.0001, at + 1.6);
          o.connect(g).connect(master);
          g.connect(delay); // send to echo
          o.start(at);
          o.stop(at + 1.8);
        });
      };

      // ─── Lookahead scheduler for anvil + motif ───
      // Schedule the first hits shortly after fade-in, then on a steady loop.
      let nextAnvil = now + 3.0;
      let nextMotif = now + 6.0;
      const ANVIL_PERIOD = 4.5;
      const MOTIF_PERIOD = 16.0;
      const SCHED_AHEAD = 0.2; // schedule 200ms ahead

      const scheduler = () => {
        const t = ctx.currentTime;
        while (nextAnvil < t + SCHED_AHEAD) {
          playAnvil(nextAnvil);
          nextAnvil += ANVIL_PERIOD;
        }
        while (nextMotif < t + SCHED_AHEAD) {
          playMotif(nextMotif);
          nextMotif += MOTIF_PERIOD;
        }
      };
      intervals.push(setInterval(scheduler, 100));

      nodesRef.current = {
        master,
        stop: () => {
          intervals.forEach(clearInterval);
          try {
            const t = ctx.currentTime;
            master.gain.cancelScheduledValues(t);
            master.gain.setValueAtTime(master.gain.value, t);
            master.gain.linearRampToValueAtTime(0, t + 0.5);
            setTimeout(() => {
              try {
                running.forEach(({ osc }) => {
                  try {
                    osc.stop();
                  } catch {
                    /* noop */
                  }
                });
                ctx.close();
              } catch {
                /* noop */
              }
            }, 600);
          } catch {
            /* noop */
          }
        },
      };
    } catch {
      /* Web Audio unavailable */
    }
  }, []);

  const stop = useCallback(() => {
    nodesRef.current?.stop();
    nodesRef.current = null;
    ctxRef.current = null;
  }, []);

  const toggle = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      if (next) {
        stop();
      } else {
        start();
      }
      return next;
    });
  }, [start, stop]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return { muted, toggle };
}
