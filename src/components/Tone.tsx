"use client";

import { useEffect } from "react";
import type { Tone } from "@/lib/content";

/** Sets the page's paper/ink colours; they transition smoothly (registered in globals.css). */
function applyTone(tone?: Tone) {
  const style = document.documentElement.style;
  if (tone) {
    style.setProperty("--background", tone.background);
    style.setProperty("--foreground", tone.foreground);
  } else {
    style.removeProperty("--background");
    style.removeProperty("--foreground");
  }
}

/** Tints the whole page with whichever `[data-tone]` section is at the centre of the screen. */
export function ToneScroller() {
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("[data-tone]")];
    let current: string | undefined;

    const update = () => {
      const middle = window.innerHeight / 2;
      const active = sections.find((el) => {
        const { top, bottom } = el.getBoundingClientRect();
        return top <= middle && bottom >= middle;
      });
      const tone = active?.dataset.tone;
      if (tone === current) return;
      current = tone;
      applyTone(tone ? (JSON.parse(tone) as Tone) : undefined);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      applyTone();
    };
  }, []);

  return null;
}

/** Gives a whole page one tone while it's mounted. */
export function PageTone({ tone }: { tone?: Tone }) {
  const background = tone?.background;
  const foreground = tone?.foreground;
  useEffect(() => {
    applyTone(background && foreground ? { background, foreground } : undefined);
    return () => applyTone();
  }, [background, foreground]);

  return null;
}
