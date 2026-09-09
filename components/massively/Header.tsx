import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site";

export default function Header() {
  return (
    <header id="header">
      <Link href="/" className="logo">
        <Image
          src={siteConfig.logo.src}
          alt={siteConfig.name}
          width={siteConfig.logo.width}
          height={siteConfig.logo.height}
          priority
          sizes="(max-width: 736px) 60vw, 320px"
          style={{ width: "100%", height: "auto" }}
        />
      </Link>
    </header>
  );
}
