import Image from "next/image";

import ShowList from "@/components/massively/ShowList";
import SpotifyTrackEmbed from "@/components/massively/SpotifyTrackEmbed";
import YouTubeEmbed from "@/components/massively/YouTubeEmbed";
import { siteConfig } from "@/lib/site";

export default function OverviewPage() {
  const { single, promoVideo } = siteConfig;

  return (
    <>
      <section className="post">
        <div className="row gtr-50">
          <div className="col-6 col-12-medium">
            <span className="image fit">
              <Image
                src={single.artwork}
                alt={`${siteConfig.name} debut single "${single.title}" out now`}
                width={single.artworkWidth}
                height={single.artworkHeight}
                priority
                sizes="(max-width: 980px) 92vw, 460px"
                style={{ width: "100%", height: "auto" }}
              />
            </span>
          </div>
          {promoVideo.id && (
            <div className="col-6 col-12-medium">
              <div className="rr-video-col">
                <h4>Next single coming soon...</h4>
                <YouTubeEmbed
                  videoId={promoVideo.id}
                  vertical={promoVideo.vertical}
                />
              </div>
            </div>
          )}
        </div>

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
