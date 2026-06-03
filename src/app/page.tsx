import Link from "next/link";
import { VesselLanding } from "@/components/vessel-landing";

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
    <header className="w-full border-b border-charcoal bg-zinc-950">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-10">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-bone transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-md"
        >
          Vessel
        </Link>
        <Link
          href="/portal"
          className="text-xs font-medium text-stone-500 transition-colors hover:text-stone-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-md"
        >
          Portal
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-charcoal bg-zinc-950">
      <div className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-10">
        <p className="text-xs leading-relaxed text-stone-600">
          A house for useful things.
        </p>
      </div>
    </footer>
  );
}
