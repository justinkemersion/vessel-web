import type { Config } from "tailwindcss";

/**
 * Vessel — Warm Clinical design tokens.
 *
 * The palette intentionally pairs a deep zinc canvas (the lab) with an
 * amber primary (the warmth). Amber is the through-line across the
 * Vessel fraternity — it is the "fluorescent under the hood" cue that
 * something is alive, working, fermenting, broadcasting, listening.
 *
 * Tailwind v4 reads this file because globals.css references it via
 * `@config "../../tailwind.config.ts";`.
 */
const config: Config = {
  theme: {
    // Sharp corners, always. Overriding (not extending) borderRadius wipes
    // Tailwind's default radius scale so `rounded`, `rounded-md`, `rounded-lg`,
    // etc. all resolve to 0. The clinical aesthetic depends on this.
    borderRadius: {
      none: "0",
      DEFAULT: "0",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f59e0b",
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
      },
    },
  },
};

export default config;
