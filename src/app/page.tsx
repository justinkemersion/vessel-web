import Link from "next/link";
import { VesselCard } from "@/components/ui/vessel-card";

/**
 * Vessel — landing page.
 *
 * Warm Clinical: a quiet lab readout, not a sales floor. Mono speaks
 * the developer's truth (status codes, identifiers, the exact thing).
 * Sans speaks the entrepreneur's promise (boutique, visionary, value).
 * The page is intentionally short — the work is the pitch.
 */

const labStatus = [
  { label: "Nodes Active", value: "06" },
  { label: "Status", value: "Nominal" },
  { label: "Location", value: "North_Base" },
] as const;

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <main className="flex flex-1 flex-col">
        <Hero />
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="w-full border-b border-zinc-900">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold tracking-[0.2em] text-white">
            VESSEL
          </span>
          <span className="border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-amber-500/80">
            V2.5 // STABLE
          </span>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-20 sm:px-10 sm:py-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
        SYS // 00 — Welcome
      </p>

      <h1 className="mt-5 max-w-3xl font-sans text-4xl font-medium leading-[1.1] tracking-tight text-zinc-100 sm:text-5xl md:text-6xl">
        Boutique Infrastructure
        <br />
        for the Visionary.
      </h1>

      <p className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-zinc-400 sm:text-base">
        A private collective of high-utility web projects.
        <br className="hidden sm:block" />
        Dedicated resources, zero jargon.
      </p>

      <div className="mt-12">
        <Link
          href="/portal"
          className="group inline-flex items-center gap-3 border border-amber-500/40 bg-zinc-900 px-6 py-3 font-mono text-sm tracking-[0.18em] text-amber-500 transition-[background-color,border-color,box-shadow,color] duration-300 ease-out hover:border-amber-500/80 hover:bg-amber-500/10 hover:text-amber-300 hover:shadow-[0_0_0_1px_rgba(245,158,11,0.15),0_8px_40px_-12px_rgba(245,158,11,0.35)]"
        >
          <span aria-hidden className="text-amber-500/60 group-hover:text-amber-400">
            [
          </span>
          ENTER_PORTAL
          <span aria-hidden className="text-amber-500/60 group-hover:text-amber-400">
            ]
          </span>
        </Link>
      </div>

      <div className="mt-20">
        <LabStatus />
      </div>
    </section>
  );
}

function LabStatus() {
  return (
    <VesselCard className="max-w-2xl">
      <VesselCard.Eyebrow>Current Lab Status</VesselCard.Eyebrow>
      <dl className="mt-5 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-3">
        {labStatus.map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              {label}
            </dt>
            <dd className="flex items-center gap-2 font-mono text-sm text-zinc-200">
              {label === "Status" && (
                <span
                  aria-hidden
                  className="inline-block size-1.5 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]"
                />
              )}
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </VesselCard>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900">
      <div className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-10">
        <p className="max-w-2xl font-sans text-xs leading-relaxed text-zinc-600">
          Built for developers who take pride in the craft, and entrepreneurs
          who value the vibe.
        </p>
      </div>
    </footer>
  );
}
