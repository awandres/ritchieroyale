"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/lib/site";

export function isActiveHref(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Desktop nav. main.css hides this below 980px, where NavPanel takes over —
 * the original moved the same DOM between the two on breakpoint change, but
 * rendering the links in both places is equivalent and avoids the reflow.
 */
export default function Nav() {
  const pathname = usePathname();

  return (
    <nav id="nav">
      <ul className="links">
        {siteConfig.nav.map((item) => (
          <li
            key={item.href}
            className={isActiveHref(pathname, item.href) ? "active" : undefined}
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <ul className="icons">
        {siteConfig.social.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={`icon brands ${item.icon}`}
            >
              <span className="label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
