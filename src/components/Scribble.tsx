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
  // The span takes the position/insets; an absolutely positioned <svg> alone would keep
  // its intrinsic aspect ratio instead of stretching to the insets.
  return (
    <span aria-hidden className={`pointer-events-none absolute text-mark ${className}`}>
      <svg
        viewBox={shape === "underline" ? "0 0 100 10" : "0 0 100 100"}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <path
          d={paths[shape]}
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={shape === "underline" ? 2 : 2.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="animate-[draw_0.5s_cubic-bezier(0.6,0,0.2,1)_both] [stroke-dasharray:1]"
        />
      </svg>
    </span>
  );
}
