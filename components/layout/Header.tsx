import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header
      id="header"
      className="sticky top-0 z-50 bg-rr-dark/95 backdrop-blur-sm border-b border-rr-green/20"
    >
      <Link href="/" className="logo flex items-center justify-center py-4 gap-4">
        <Image
          src="/rr-logo.png"
          alt="Ritchie Royale Logo"
          width={60}
          height={60}
          className="drop-shadow-lg"
        />
        <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-rr-green to-rr-yellow bg-clip-text text-transparent">
          Ritchie Royale
        </span>
      </Link>
    </header>
  );
}

