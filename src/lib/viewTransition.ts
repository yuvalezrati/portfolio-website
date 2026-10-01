import { flushSync } from "react-dom";

/**
 * Runs a state update inside a View Transition when the browser supports it, so elements
 * sharing a `view-transition-name` morph between the two states. Falls back to an
 * instant update (and respects reduced motion).
 */
export function withViewTransition(update: () => void) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduced || document.visibilityState !== "visible") {
    update();
    return;
  }
  const transition = document.startViewTransition(() => flushSync(update));
  // A transition can be skipped (e.g. the tab is hidden mid-way); the update still
  // happens, so the rejection is expected and not an error.
  transition.ready.catch(() => {});
  transition.finished.catch(() => {});
}
