"use client";

import { useEffect } from "react";

/**
 * Reimplements the template's assets/js/main.js without jQuery.
 *
 * Two behaviours matter:
 *  - `is-preload` on <body> suppresses transitions during the initial paint so
 *    the intro can animate in rather than snapping into place. An inline script
 *    in the public layout adds it; this removes it once the page has loaded.
 *  - The intro fades out as soon as you scroll, which hands the stage over to
 *    the header logo (`#intro.hidden + #header .logo` in main.css). The
 *    original drove this with scrollex; a scroll threshold is equivalent and
 *    survives resizes.
 */
export default function MassivelyEffects() {
  useEffect(() => {
    const body = document.body;

    const preloadTimer = window.setTimeout(() => {
      body.classList.remove("is-preload");
    }, 100);

    return () => {
      window.clearTimeout(preloadTimer);
      body.classList.remove("is-preload");
    };
  }, []);

  useEffect(() => {
    const intro = document.getElementById("intro");
    if (!intro) return;

    let frame = 0;

    const sync = () => {
      frame = 0;
      const threshold = window.innerHeight * 0.25;
      intro.classList.toggle("hidden", window.scrollY > threshold);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
