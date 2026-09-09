import type { Metadata } from "next";

import ShowList from "@/components/massively/ShowList";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} - Shows`,
};

export default function ShowsPage() {
  return (
    <article className="shows post featured">
      <h1>Upcoming Shows</h1>
      <ShowList shows={siteConfig.upcomingShows} />
    </article>
  );
}
