import { useId } from "react";

type Props = {
  shape: "underline" | "circle";
  className?: string;
};

// Grease-pencil marks, like a photographer marking a contact sheet. Drawn on once when mounted.
const paths = {
  underline: "M1 6 C 20 2, 45 9, 70 4 S 94 3, 99 7",
  circle:
    "M14 22 C 34 3, 84 2, 96 34 C 106 70, 72 99, 40 95 C 9 91, -3 60, 6 37 C 13 20, 32 9, 58 7",
};

export default function Scribble({ shape, className = "" }: Props) {
  const maskId = `scribble-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const isLine = shape === "underline";

  // The span takes the position/insets; an absolutely positioned <svg> alone would keep
  // its intrinsic aspect ratio instead of stretching to the insets.
  //
  // The visible stroke uses non-scaling-stroke so the pencil line stays the same width at
  // any size, but browsers then measure dashes in screen pixels and ignore pathLength,
  // so a dash animation on it stops part-way. Instead an unscaled copy of the path in a
  // mask does the draw-on (pathLength works there) and reveals the visible stroke.
  return (
    <span aria-hidden className={`pointer-events-none absolute text-mark ${className}`}>
      <svg
        viewBox={isLine ? "0 0 100 10" : "0 0 100 100"}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible rtl:-scale-x-100"
      >
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-20" y="-20" width="140" height={isLine ? 50 : 140}>
          <path
            d={paths[shape]}
            pathLength={1}
            fill="none"
            stroke="white"
            strokeWidth={isLine ? 12 : 8}
            strokeLinecap="round"
            className="animate-[draw_0.5s_cubic-bezier(0.6,0,0.2,1)_both] [stroke-dasharray:1]"
          />
        </mask>
        <path
          d={paths[shape]}
          mask={`url(#${maskId})`}
          fill="none"
          stroke="currentColor"
          strokeWidth={isLine ? 2 : 2.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}
