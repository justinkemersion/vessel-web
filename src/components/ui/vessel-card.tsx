import * as React from "react";

/**
 * VesselCard — the shared surface for the Warm Clinical lab.
 *
 * A flat zinc-900 panel with no rounded corners — sharp, professional,
 * lab-bench. On hover the panel warms with a subtle amber-500/10 glow
 * (a soft inner tint plus a low-spread outer halo) and the border edges
 * pick up a hint of amber. The effect is deliberately quiet: the card
 * acknowledges you, it doesn't perform for you.
 *
 * Composition:
 *   <VesselCard>
 *     <VesselCard.Eyebrow>SYS // 02</VesselCard.Eyebrow>   // Geist Mono
 *     <VesselCard.Title>PseudoChannel</VesselCard.Title>   // Geist Sans
 *     <VesselCard.Body>...</VesselCard.Body>               // Geist Sans
 *   </VesselCard>
 *
 * The eyebrow uses Geist Mono to speak the developer's language
 * (precise identifiers, status codes, file paths). Title and body use
 * Geist Sans for the entrepreneur's voice (clear, human, sellable).
 */

type DivProps = React.HTMLAttributes<HTMLDivElement>;

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const VesselCardRoot = React.forwardRef<HTMLDivElement, DivProps>(
  function VesselCardRoot({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          "group relative block bg-zinc-900 border border-zinc-800/80 p-6",
          "transition-[background-color,border-color,box-shadow] duration-300 ease-out",
          "hover:bg-amber-500/5 hover:border-amber-500/20",
          "hover:shadow-[0_0_0_1px_rgba(245,158,11,0.08),0_8px_40px_-12px_rgba(245,158,11,0.18)]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

const VesselCardEyebrow = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  function VesselCardEyebrow({ className, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        className={cx(
          "block font-mono text-[11px] uppercase tracking-[0.18em]",
          "text-zinc-500 group-hover:text-amber-500/80 transition-colors duration-300",
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

const VesselCardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  function VesselCardTitle({ className, children, ...props }, ref) {
    return (
      <h3
        ref={ref}
        className={cx(
          "mt-2 font-sans text-lg font-medium leading-tight text-zinc-100",
          className,
        )}
        {...props}
      >
        {children}
      </h3>
    );
  },
);

const VesselCardBody = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  function VesselCardBody({ className, children, ...props }, ref) {
    return (
      <p
        ref={ref}
        className={cx(
          "mt-3 font-sans text-sm leading-relaxed text-zinc-400",
          className,
        )}
        {...props}
      >
        {children}
      </p>
    );
  },
);

type VesselCardComponent = typeof VesselCardRoot & {
  Eyebrow: typeof VesselCardEyebrow;
  Title: typeof VesselCardTitle;
  Body: typeof VesselCardBody;
};

export const VesselCard = VesselCardRoot as VesselCardComponent;
VesselCard.Eyebrow = VesselCardEyebrow;
VesselCard.Title = VesselCardTitle;
VesselCard.Body = VesselCardBody;
