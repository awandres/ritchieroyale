import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} - Shop`,
};

export default function ShopPage() {
  return (
    <section className="post">
      <h1>Shop</h1>
      <p>Merch coming soon. Check back later.</p>
    </section>
  );
}
