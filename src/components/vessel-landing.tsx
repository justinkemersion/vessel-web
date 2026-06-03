"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { WorkStatusBadge } from "@/components/work-status-badge";
import { principles, registerWorks } from "@/lib/portal-content";

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
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

export function VesselLanding() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-20 sm:px-10 sm:py-28">
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col"
      >
        <motion.p
          variants={heroItem}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-500"
        >
          Vessel
        </motion.p>

        <motion.h1
          variants={heroItem}
          className="mt-4 font-sans text-4xl font-bold leading-[1.08] tracking-tight text-bone sm:text-5xl sm:leading-[1.06] md:text-6xl"
        >
          A house for useful things.
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-400 sm:text-xl"
        >
          Software, brewing, tools, places, and other standards. Built
          carefully, owned directly, and kept alive.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: easeOut }}
        className="mt-20 sm:mt-24"
      >
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-500">
          The Register
        </h2>
        <ul className="mt-8 divide-y divide-charcoal border-y border-charcoal">
          {registerWorks.map((work) => {
            const isLinkable =
              (work.status === "active" || work.status === "alpha") &&
              work.href;

            return (
              <li key={work.name} className="py-5 sm:py-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <div className="min-w-0 flex-1">
                    {isLinkable ? (
                      <a
                        href={work.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`font-sans text-base font-medium transition-colors sm:text-lg ${
                          work.status === "alpha"
                            ? "text-stone-200 hover:text-amber-100"
                            : "text-bone hover:text-white"
                        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-sm`}
                      >
                        {work.name}
                      </a>
                    ) : (
                      <span className="font-sans text-base font-medium text-bone sm:text-lg">
                        {work.name}
                      </span>
                    )}
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-stone-500">
                      {work.tagline}
                    </p>
                  </div>
                  <WorkStatusBadge status={work.status} />
                </div>
              </li>
            );
          })}
        </ul>
      </motion.div>

      <motion.div
        id="principles"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: easeOut }}
        className="mt-20 sm:mt-24"
      >
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-500">
          Principles
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {principles.map((item) => (
            <li
              key={item.title}
              className="h-full rounded-md border border-charcoal bg-zinc-950/60 px-5 py-5 sm:px-6 sm:py-6"
            >
              <h3 className="text-sm font-semibold text-bone">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.5, ease: easeOut }}
        className="mt-16 sm:mt-20"
      >
        <Link
          href="/portal"
          className={`inline-flex w-full items-center justify-center rounded-md bg-white px-6 py-3.5 text-base font-semibold text-zinc-950 shadow-sm transition-colors hover:bg-stone-100 sm:w-auto ${focusPrimary}`}
        >
          Enter Portal
        </Link>
      </motion.div>
    </section>
  );
}
