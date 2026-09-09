"use client";

import { usePathname } from "next/navigation";

import Intro from "./Intro";

/**
 * The intro only belongs on the overview page, but main.css positions the
 * header with `#intro + #header`, so it has to render from the layout rather
 * than through the children slot to stay a direct sibling.
 */
export default function IntroSlot() {
  const pathname = usePathname();

  if (pathname !== "/") return null;
  return <Intro />;
}
