"use client";

import { useState } from "react";
import type { Photo } from "@/lib/content";
import Scribble from "./Scribble";
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
        <div role="tablist" className="mb-6 flex gap-6 font-mono text-xs uppercase tracking-wider">
          {sections.map(({ title }, i) => (
            <button
              key={title}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => i !== active && withViewTransition(() => setActive(i))}
              className={`relative ${i === active ? "" : "text-ink/45 hover:text-ink"}`}
            >
              {title}
              {i === active && <Scribble shape="underline" className="-bottom-2 left-0 h-2 w-full" />}
            </button>
          ))}
        </div>
      )}
      {/* Keyed so each tab starts on its first photo. */}
      <Slideshow key={active} photos={sections[active].photos} />
    </div>
  );
}
