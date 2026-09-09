"use client";

import { MouseEvent, ReactNode } from "react";

/**
 * Replaces the template's jquery.scrolly plugin: smooth-scrolls to the
 * targeted anchor instead of jumping.
 */
export default function ScrollyLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
