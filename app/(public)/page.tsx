import Image from "next/image";

import ShowList from "@/components/massively/ShowList";
import SpotifyTrackEmbed from "@/components/massively/SpotifyTrackEmbed";
import { siteConfig } from "@/lib/site";

export default function OverviewPage() {
  const { single } = siteConfig;

  return (
    <>
      <section className="post">
        <span className="image fit">
          <Image
            src={single.artwork}
            alt={`${siteConfig.name} debut single "${single.title}" out now`}
            width={single.artworkWidth}
            height={single.artworkHeight}
            priority
            sizes="(max-width: 980px) 92vw, 900px"
            style={{ width: "100%", height: "auto" }}
          />
        </span>

        {single.spotifyTrackId && (
          <SpotifyTrackEmbed
            trackId={single.spotifyTrackId}
            title={`${single.title} on Spotify`}
          />
        )}
      </section>

      <article className="shows post featured">
        <h1>Upcoming Shows</h1>
        <ShowList shows={siteConfig.upcomingShows} />
      </article>
    </>
  );
}
