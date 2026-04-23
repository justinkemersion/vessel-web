"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const pillars = [
  {
    title: "Dedicated stack",
    body: "Your project, your lane in the collective — no noisy neighbors, no shared-runtime surprises.",
  },
  {
    title: "Human routing",
    body: "Direct line to the people who build the thing. No ticket tiers, no runaround.",
  },
  {
    title: "Operator-owned",
    body: "You steer the product and the domain; we orchestrate the metal and the mesh.",
  },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

const heroContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

const focusPrimary =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

const focusSecondary =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

export function VesselLanding() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-20 sm:px-10 sm:py-28">
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col"
      >
        <motion.h1
          variants={heroItem}
          className="font-sans text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl sm:leading-[1.06] md:text-6xl"
        >
          Boutique infrastructure
          <br />
          <span className="text-zinc-100">for the craft.</span>
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-500 sm:text-xl"
        >
          A private collective of high-utility web projects. Dedicated
          resources, zero jargon — built for developers who care and founders who
          value the vibe.
        </motion.p>

        <motion.div variants={heroItem} className="mt-10 w-full max-w-lg">
          <div
            className="overflow-hidden rounded-md border border-zinc-800 bg-zinc-900/80 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.55)]"
            role="img"
            aria-label="Example Vessel command"
          >
            <div className="flex items-center gap-2 border-b border-zinc-800 px-3 py-2">
              <span
                className="h-2 w-2 rounded-full bg-red-500/90"
                aria-hidden
              />
              <span
                className="h-2 w-2 rounded-full bg-amber-500/90"
                aria-hidden
              />
              <span
                className="h-2 w-2 rounded-full bg-emerald-500/80"
                aria-hidden
              />
              <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                vessel
              </span>
            </div>
            <div className="px-4 py-3 font-mono text-sm text-zinc-300">
              <span className="text-zinc-500">$ </span>
              <span>vessel open portal</span>
              <motion.span
                className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-zinc-400 align-middle"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{
                  duration: 1.1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                aria-hidden
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        id="pillars"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: easeOut }}
        className="mt-20 sm:mt-24"
      >
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          The bones
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {pillars.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.45 + i * 0.08,
                ease: easeOut,
              }}
            >
              <div className="h-full rounded-md border border-zinc-800 bg-zinc-950 px-5 py-5 sm:px-6 sm:py-6">
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {item.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.72, ease: easeOut }}
        className="mt-16 flex flex-col items-stretch gap-3 sm:mt-20 sm:flex-row sm:items-center sm:gap-4"
      >
        <Link
          href="/portal"
          className={`inline-flex w-full items-center justify-center rounded-md bg-white px-6 py-3.5 text-base font-semibold text-zinc-950 shadow-sm transition-colors hover:bg-zinc-100 sm:w-auto ${focusPrimary}`}
        >
          Get Started
        </Link>
        <Link
          href="#pillars"
          className={`inline-flex w-full items-center justify-center rounded-md border border-zinc-800/70 bg-zinc-950/40 px-6 py-3.5 text-base font-medium text-zinc-600 opacity-80 transition-colors hover:border-zinc-800 hover:bg-zinc-950/40 hover:text-zinc-600 sm:w-auto ${focusSecondary}`}
          scroll
        >
          Read the Docs
        </Link>
      </motion.div>
    </section>
  );
}
