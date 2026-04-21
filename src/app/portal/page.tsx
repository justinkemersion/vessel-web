"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { VesselCard } from "@/components/ui/vessel-card";

/**
 * Vessel — the Portal.
 *
 * First-class lounge for members of the collective. The page is
 * intentionally calm: a flight manifest of active services on the
 * left, a direct line to the desk on the right, and Flux up top
 * as the orchestration tower.
 */

type ManifestStatus = "ACTIVE" | "STANDBY";

const manifest: Array<{
  gate: string;
  service: string;
  destination: string;
  status: ManifestStatus;
}> = [
  { gate: "01", service: "YeastCoast", destination: "yeastcoast.vsl-base.com", status: "ACTIVE" },
  { gate: "02", service: "PseudoChannel", destination: "ch.vsl-base.com", status: "ACTIVE" },
  { gate: "03", service: "MailPilot AI", destination: "mail.vsl-base.com", status: "ACTIVE" },
  { gate: "04", service: "finances-ai", destination: "ledger.vsl-base.com", status: "ACTIVE" },
  { gate: "05", service: "Tone", destination: "tone.vsl-base.com", status: "ACTIVE" },
  { gate: "06", service: "Bachelor Cookbook", destination: "kitchen.vsl-base.com", status: "STANDBY" },
];

export default function PortalPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PortalHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 sm:px-10 sm:py-16">
        <FluxQuickLink />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Manifest />
          <Desk />
        </div>
      </main>
    </div>
  );
}

function PortalHeader() {
  const { user, isLoaded } = useUser();

  /*
   * Names degrade gracefully:
   *   firstName -> username -> "Operator"
   * The mono "Operator" fallback keeps the lab voice intact while Clerk
   * loads or when running in a dev shell without a session.
   */
  const displayName = isLoaded
    ? user?.firstName ?? user?.username ?? "Operator"
    : "—";

  return (
    <header className="w-full border-b border-zinc-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 sm:px-10 sm:py-10">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-mono text-sm font-semibold tracking-[0.2em] text-white hover:text-amber-400 transition-colors"
          >
            VESSEL
          </Link>
          <span className="border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-amber-500/80">
            PORTAL // 01
          </span>
        </div>

        <h1 className="font-sans text-2xl font-medium tracking-tight text-zinc-100 sm:text-3xl">
          Welcome to First Class,{" "}
          <span className="text-amber-400">{displayName}</span>.
        </h1>
      </div>
    </header>
  );
}

function FluxQuickLink() {
  return (
    <a
      href="https://app.vsl-base.com"
      target="_blank"
      rel="noreferrer"
      className="group block"
    >
      <VesselCard className="flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <VesselCard.Eyebrow>FLUX // Orchestration Tower</VesselCard.Eyebrow>
          <h2 className="font-sans text-2xl font-medium tracking-tight text-zinc-100 sm:text-3xl">
            app.vsl-base.com
          </h2>
          <p className="font-mono text-sm text-zinc-400">
            Orchestrate your fleet.
          </p>
        </div>

        <span className="inline-flex items-center gap-3 self-start border border-amber-500/40 bg-zinc-950/60 px-5 py-2.5 font-mono text-xs tracking-[0.18em] text-amber-500 transition-colors duration-300 group-hover:border-amber-500/80 group-hover:bg-amber-500/10 group-hover:text-amber-300 sm:self-auto">
          LAUNCH
          <span aria-hidden className="text-amber-500/70 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-transform duration-300">
            →
          </span>
        </span>
      </VesselCard>
    </a>
  );
}

function Manifest() {
  return (
    <section className="lg:col-span-2">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
          Flight Manifest
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600">
          {manifest.length} services
        </span>
      </div>

      <div className="border border-zinc-800/80 bg-zinc-900">
        {/* Column header — keeps the manifest readable as it grows. */}
        <div className="hidden grid-cols-[3rem_1fr_1.4fr_6rem] gap-4 border-b border-zinc-800/80 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600 sm:grid">
          <span>Gate</span>
          <span>Service</span>
          <span>Destination</span>
          <span className="text-right">Status</span>
        </div>

        <ul>
          {manifest.map((row) => (
            <ManifestRow key={row.gate} {...row} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ManifestRow({
  gate,
  service,
  destination,
  status,
}: {
  gate: string;
  service: string;
  destination: string;
  status: ManifestStatus;
}) {
  const isActive = status === "ACTIVE";
  return (
    <li className="group grid grid-cols-1 gap-1 border-b border-zinc-800/60 px-5 py-4 transition-colors duration-200 last:border-b-0 hover:bg-amber-500/5 sm:grid-cols-[3rem_1fr_1.4fr_6rem] sm:items-center sm:gap-4">
      <span className="font-mono text-xs text-zinc-500">{gate}</span>
      <span className="font-sans text-sm font-medium text-zinc-100">{service}</span>
      <span className="font-mono text-xs text-zinc-400">{destination}</span>
      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] sm:justify-end">
        <span
          aria-hidden
          className={
            isActive
              ? "inline-block size-1.5 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]"
              : "inline-block size-1.5 border border-zinc-600"
          }
        />
        <span className={isActive ? "text-amber-500/90" : "text-zinc-500"}>
          {status}
        </span>
      </span>
    </li>
  );
}

function Desk() {
  return (
    <aside className="lg:col-span-1">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
          The Desk
        </h2>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-amber-500/80">
          <span
            aria-hidden
            className="inline-block size-1.5 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]"
          />
          ON STANDBY
        </span>
      </div>

      <VesselCard className="flex h-[calc(100%-2rem)] flex-col">
        <VesselCard.Eyebrow>Direct to Dev</VesselCard.Eyebrow>
        <VesselCard.Title>Skip the ticket queue.</VesselCard.Title>
        <p className="mt-3 font-sans text-sm leading-relaxed text-zinc-400">
          Need a new instance or a technical tweak? We&apos;re on standby.
          No support tickets, no tier triage — just a direct line to the
          person who builds the thing.
        </p>

        <dl className="mt-6 space-y-3 border-t border-zinc-800/80 pt-5">
          <div className="flex items-center justify-between gap-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Channel
            </dt>
            <dd className="font-mono text-xs text-zinc-200">
              dev@vsl-base.com
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Response
            </dt>
            <dd className="font-mono text-xs text-zinc-200">~ same day</dd>
          </div>
        </dl>

        <a
          href="mailto:dev@vsl-base.com"
          className="group mt-6 inline-flex items-center justify-center gap-3 self-stretch border border-amber-500/40 bg-zinc-950/60 px-5 py-3 font-mono text-xs tracking-[0.18em] text-amber-500 transition-colors duration-300 hover:border-amber-500/80 hover:bg-amber-500/10 hover:text-amber-300"
        >
          <span aria-hidden className="text-amber-500/60 group-hover:text-amber-300">
            [
          </span>
          OPEN_LINE
          <span aria-hidden className="text-amber-500/60 group-hover:text-amber-300">
            ]
          </span>
        </a>
      </VesselCard>
    </aside>
  );
}
