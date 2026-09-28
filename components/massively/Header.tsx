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
          /* Height-first: the template gives #header a fixed height, so the logo
             has to fit that rather than dictate its own. See ritchie.css. */
          style={{ width: "auto", height: "100%" }}
        />
      </Link>
    </header>
  );
}
