import Link from "next/link";
import { VesselLanding } from "@/components/vessel-landing";

/**
 * Vessel — landing (elite technical / Linear–Vercel family with Flux).
 */

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-950 text-zinc-100">
      <Header />

      <main className="flex flex-1 flex-col">
        <VesselLanding />
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="w-full border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-10">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-100 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-md"
        >
          Vessel
        </Link>
        <Link
          href="/portal"
          className="text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-md"
        >
          Portal
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-10">
        <p className="max-w-2xl text-xs leading-relaxed text-zinc-500">
          Built for developers who take pride in the craft, and entrepreneurs
          who value the vibe.
        </p>
      </div>
    </footer>
  );
}
