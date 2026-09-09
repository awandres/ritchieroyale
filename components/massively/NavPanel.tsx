"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/site";
import { isActiveHref } from "./Nav";

const VISIBLE_CLASS = "is-navPanel-visible";

/**
 * The off-canvas mobile menu. main.css only reveals #navPanel and
 * #navPanelToggle below 980px, and slides the panel in while <body> carries
 * `is-navPanel-visible` — which is all util.js's panel() plugin really did.
 */
export default function NavPanel() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Sync the body class the stylesheet keys off.
  useEffect(() => {
    document.body.classList.toggle(VISIBLE_CLASS, isOpen);
    return () => document.body.classList.remove(VISIBLE_CLASS);
  }, [isOpen]);

  // Close on navigation, matching the original's hideOnClick.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <a
        href="#navPanel"
        id="navPanelToggle"
        onClick={(event) => {
          event.preventDefault();
          setIsOpen(true);
        }}
      >
        Menu
      </a>

      <div id="navPanel" aria-hidden={!isOpen}>
        <nav>
          <ul className="links">
            {siteConfig.nav.map((item) => (
              <li
                key={item.href}
                className={
                  isActiveHref(pathname, item.href) ? "active" : undefined
                }
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <ul className="icons alt">
            {siteConfig.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`icon brands alt ${item.icon}`}
                >
                  <span className="label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#navPanel"
          className="close"
          aria-label="Close menu"
          onClick={(event) => {
            event.preventDefault();
            setIsOpen(false);
          }}
        />
      </div>
    </>
  );
}
