"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

import type { Photo } from "@/lib/photos";

/**
 * The template's mosaic grid, plus the click-to-enlarge behaviour the
 * Milestones site layered on with jQuery. Plain <img> rather than next/image
 * because `.grid-wrapper > div > img` relies on being a direct child.
 */
export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [enlarged, setEnlarged] = useState<Photo | null>(null);

  useEffect(() => {
    if (!enlarged) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setEnlarged(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enlarged]);

  return (
    <>
      <div className="grid-wrapper masonry-grid">
        {photos.map((photo) => (
          <div key={photo.src} className={photo.span || undefined}>
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              onClick={() => setEnlarged(photo)}
            />
          </div>
        ))}
      </div>

      {enlarged && (
        <button
          type="button"
          className="rr-lightbox"
          aria-label="Close photo"
          onClick={() => setEnlarged(null)}
        >
          <img src={enlarged.src} alt={enlarged.alt} />
        </button>
      )}
    </>
  );
}
