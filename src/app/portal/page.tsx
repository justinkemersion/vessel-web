"use client";

import Link from "next/link";
import type { SVGProps } from "react";
import { useUser } from "@clerk/nextjs";
import { VesselCard } from "@/components/ui/vessel-card";
import {
  manifestRows,
  projectDescriptionsByRepo,
  readmePathByRepo,
  type ManifestStatus,
  type ProjectKey,
} from "@/lib/portal-content";

/**
 * Vessel — the Portal (matches landing shell: zinc-950, zinc-800 hairlines, rounded-md).
 */

export default function PortalPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-950 text-zinc-100">
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

  const displayName = isLoaded
    ? user?.firstName ?? user?.username ?? "Operator"
    : "—";

  return (
    <header className="w-full border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 sm:px-10 sm:py-10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm font-semibold tracking-tight text-zinc-100 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-md"
            >
              Vessel
            </Link>
            <span className="rounded-md border border-zinc-800 bg-zinc-900/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
              Portal
            </span>
          </div>
          <Link
            href="/"
            className="text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-300"
          >
            Home
          </Link>
        </div>

        <h1 className="font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Welcome,{" "}
          <span className="text-zinc-300">{displayName}</span>.
        </h1>
      </div>
    </header>
  );
}

function FluxQuickLink() {
  return (
    <a
      href="https://flux.vsl-base.com"
      target="_blank"
      rel="noreferrer"
      className="group block"
    >
      <VesselCard className="flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <VesselCard.Eyebrow>Flux · Orchestration</VesselCard.Eyebrow>
          <h2 className="font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            flux.vsl-base.com
          </h2>
          <p className="font-mono text-sm text-zinc-500">
            Orchestrate your fleet.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 self-start rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-sm transition-colors group-hover:bg-zinc-100 sm:self-auto">
          Open Flux
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
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
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Flight manifest
          </h2>
          <p className="mt-1 max-w-xl text-[13px] leading-snug text-zinc-600">
            Expand a row for a short overview of the project. Active routes open
            in a new tab when you use the destination link.
          </p>
        </div>
        <span className="shrink-0 font-mono text-[11px] text-zinc-600">
          {manifestRows.length} services
        </span>
      </div>

      <div className="overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
        <div className="hidden grid-cols-[3rem_1fr_1.4fr_minmax(0,7.5rem)] items-center gap-4 border-b border-zinc-800 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600 sm:grid">
          <span>Gate</span>
          <span>Service</span>
          <span>Destination</span>
          <span className="flex items-center justify-end gap-1.5 text-right">
            <span>Status</span>
            <span className="sr-only">and details</span>
            <ChevronIcon className="size-3.5 shrink-0 text-zinc-700" aria-hidden />
          </span>
        </div>

        <ul>
          {manifestRows.map((row) => (
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
  repo,
}: {
  gate: string;
  service: string;
  destination: string;
  status: ManifestStatus;
  repo: ProjectKey;
}) {
  const isActive = status === "ACTIVE";
  const isInDevelopment = status === "IN_DEVELOPMENT";

  return (
    <li className="border-b border-zinc-800 last:border-b-0">
      <details className="group overflow-hidden open:bg-zinc-900/25">
        <summary
          className={`grid cursor-pointer list-none grid-cols-1 gap-1 px-5 py-4 transition-colors sm:grid-cols-[3rem_1fr_1.4fr_minmax(0,7.5rem)] sm:items-center sm:gap-4 [&::-webkit-details-marker]:hidden ${
            isInDevelopment
              ? "bg-zinc-950 text-zinc-600 hover:bg-zinc-900/40"
              : "hover:bg-zinc-900/50"
          }`}
        >
          <span className="font-mono text-xs text-zinc-500">{gate}</span>
          <span
            className={
              isInDevelopment
                ? "font-sans text-sm font-medium text-zinc-500"
                : "font-sans text-sm font-medium text-zinc-100"
            }
          >
            {service}
          </span>
          <span
            className={
              isInDevelopment
                ? "font-mono text-xs text-zinc-600"
                : "font-mono text-xs text-zinc-400"
            }
          >
            {isActive ? (
              <a
                href={`https://${destination}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-xs text-zinc-400 underline decoration-zinc-700 underline-offset-2 transition-colors hover:text-zinc-200"
              >
                {destination}
              </a>
            ) : (
              destination
            )}
          </span>
          <span className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.18em] sm:justify-end">
            <span className="flex items-center gap-2">
              <span
                aria-hidden
                className={
                  isActive
                    ? "inline-block size-1.5 rounded-full bg-emerald-500"
                    : "inline-block size-1.5 rounded-full border border-zinc-700"
                }
              />
              <span
                className={isActive ? "text-emerald-400/90" : "text-zinc-600"}
              >
                {isActive ? "ACTIVE" : "IN DEVELOPMENT"}
              </span>
            </span>
            <ChevronIcon
              className="size-4 shrink-0 text-zinc-500 transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            />
          </span>
        </summary>

        <div className="border-t border-zinc-800/80 bg-zinc-950/80 px-5 py-4 sm:px-5">
          <p className="font-sans text-sm leading-relaxed text-zinc-400">
            {projectDescriptionsByRepo[repo]}
          </p>
          <p className="mt-3 font-mono text-[10px] leading-relaxed text-zinc-600">
            Summary from{" "}
            <span className="text-zinc-500">{readmePathByRepo[repo]}</span>
          </p>
        </div>
      </details>
    </li>
  );
}

function ChevronIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function Desk() {
  return (
    <aside className="lg:col-span-1">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          The desk
        </h2>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
          <span
            aria-hidden
            className="inline-block size-1.5 rounded-full bg-emerald-500"
          />
          On standby
        </span>
      </div>

      <VesselCard className="flex h-[calc(100%-2rem)] flex-col">
        <VesselCard.Eyebrow>Direct to dev</VesselCard.Eyebrow>
        <VesselCard.Title>Skip the ticket queue.</VesselCard.Title>
        <p className="mt-3 font-sans text-sm leading-relaxed text-zinc-500">
          Need a new instance or a technical tweak? We&apos;re on standby.
          No support tickets, no tier triage — just a direct line to the
          person who builds the thing.
        </p>

        <dl className="mt-6 space-y-3 border-t border-zinc-800 pt-5">
          <div className="flex items-center justify-between gap-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Channel
            </dt>
            <dd className="font-mono text-xs text-zinc-300">
              dev@vsl-base.com
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Response
            </dt>
            <dd className="font-mono text-xs text-zinc-300">~ same day</dd>
          </div>
        </dl>

        <a
          href="mailto:dev@vsl-base.com"
          className="mt-6 inline-flex items-center justify-center gap-2 self-stretch rounded-md border border-zinc-700 bg-transparent px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-900/50"
        >
          Email the desk
        </a>
      </VesselCard>
    </aside>
  );
}
