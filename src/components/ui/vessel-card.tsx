import * as React from "react";

/**
 * VesselCard — shared surface (zinc-950 / zinc-800, rounded-md, subtle lift).
 *
 * Composition:
 *   <VesselCard>
 *     <VesselCard.Eyebrow>FLUX // Tower</VesselCard.Eyebrow>
 *     <VesselCard.Title>...</VesselCard.Title>
 *     <VesselCard.Body>...</VesselCard.Body>
 *   </VesselCard>
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
          "group relative block rounded-md border border-zinc-800 bg-zinc-900/40 p-6",
          "shadow-sm transition-[background-color,border-color,box-shadow] duration-200 ease-out",
          "hover:border-zinc-700 hover:bg-zinc-900/60 hover:shadow-md",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

const VesselCardEyebrow = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function VesselCardEyebrow({ className, children, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cx(
        "block font-mono text-[11px] uppercase tracking-[0.18em]",
        "text-zinc-500 group-hover:text-zinc-400 transition-colors duration-200",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});

const VesselCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(function VesselCardTitle({ className, children, ...props }, ref) {
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
});

const VesselCardBody = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function VesselCardBody({ className, children, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={cx(
        "mt-3 font-sans text-sm leading-relaxed text-zinc-500",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
});

type VesselCardComponent = typeof VesselCardRoot & {
  Eyebrow: typeof VesselCardEyebrow;
  Title: typeof VesselCardTitle;
  Body: typeof VesselCardBody;
};

export const VesselCard = VesselCardRoot as VesselCardComponent;
VesselCard.Eyebrow = VesselCardEyebrow;
VesselCard.Title = VesselCardTitle;
VesselCard.Body = VesselCardBody;
