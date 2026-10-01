"use client";

import { useState } from "react";
import type { Photo } from "@/lib/content";
import Slideshow, { withViewTransition } from "./Slideshow";

type Props = {
  sections: { title: string; photos: Photo[] }[];
};

/** One slideshow per project section (the work, Installation, Book), switched with tabs. */
export default function ProjectSlideshows({ sections }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {sections.length > 1 && (
        <div role="tablist" className="mb-6 flex gap-6 text-sm">
          {sections.map(({ title }, i) => (
            <button
              key={title}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => i !== active && withViewTransition(() => setActive(i))}
              className={
                i === active
                  ? "underline decoration-1 underline-offset-8"
                  : "opacity-40 hover:opacity-100"
              }
            >
              {title}
            </button>
          ))}
        </div>
      )}
      {/* Keyed so each tab starts on its first photo. */}
      <Slideshow key={active} photos={sections[active].photos} />
    </div>
  );
}
