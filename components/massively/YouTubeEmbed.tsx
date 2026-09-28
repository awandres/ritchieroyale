"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Widths the YouTube player needs in order to lay itself out. Below these it
 * stops scaling its poster and controls down and crops them instead, which
 * zooms the thumbnail and clips the title. Narrower than this we render the
 * iframe at this size anyway and scale the whole frame down to fit.
 */
const MIN_RENDER_WIDTH = { vertical: 405, horizontal: 640 };

export default function YouTubeEmbed({
  videoId,
  title,
  /** Shorts are filmed vertically, so they need a 9:16 frame instead of 16:9. */
  vertical = false,
}: {
  videoId: string;
  title?: string;
  vertical?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState<{
    width: number;
    height: number;
    scale: number;
  } | null>(null);

  useEffect(() => {
    const element = box.current;
    if (!element) return;

    const measure = () => {
      const available = element.clientWidth;
      if (!available) return;

      // Only ever scale down, so a player with room to spare renders 1:1.
      const width = Math.max(
        MIN_RENDER_WIDTH[vertical ? "vertical" : "horizontal"],
        available,
      );

      setFrame({
        width,
        height: Math.round(width * (vertical ? 16 / 9 : 9 / 16)),
        scale: available / width,
      });
    };

    measure();
    // The iframe is taken out of flow, so resizing it cannot re-trigger this.
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [vertical]);

  return (
    <>
      {title && <h4 className="mb-4">{title}</h4>}
      <div
        ref={box}
        className={vertical ? "rr-video rr-video--vertical" : "rr-video"}
        style={
          frame
            ? ({
                "--rr-video-width": `${frame.width}px`,
                "--rr-video-height": `${frame.height}px`,
                "--rr-video-scale": frame.scale,
              } as CSSProperties)
            : undefined
        }
      >
        <iframe
          title={title || "YouTube video player"}
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </>
  );
}
