"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Overview" },
    { href: "/shows", label: "Shows" },
    { href: "/music", label: "Music" },
    { href: "/press", label: "Press" },
    { href: "/shop", label: "Shop" },
  ];

  return (
    <nav id="nav" className="bg-rr-dark/80 backdrop-blur-sm border-b border-rr-green/20">
      <div className="container mx-auto px-4">
        <ul className="flex justify-center items-center space-x-6 py-4">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-rr-green border-b-2 border-rr-green"
                      : "text-rr-green/70 hover:text-rr-yellow"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

