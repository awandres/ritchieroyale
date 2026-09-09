import type { Metadata } from "next";
import Image from "next/image";

import SpotifyArtistEmbed, {
  SpotifyAlbumEmbed,
} from "@/components/massively/SpotifyArtistEmbed";
import SpotifyTrackEmbed from "@/components/massively/SpotifyTrackEmbed";
import YouTubeEmbed from "@/components/massively/YouTubeEmbed";
import { albums, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} - Music`,
};

export default function MusicPage() {
  const { single } = siteConfig;

  return (
    <section className="post">
      <h1>Music</h1>

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
        <div className="col-6 col-12-medium">
          <h4>Debut Single</h4>
          <p>&ldquo;{single.title}&rdquo; - out now.</p>
          {single.spotifyTrackId && (
            <SpotifyTrackEmbed
              trackId={single.spotifyTrackId}
              title={`${single.title} on Spotify`}
            />
          )}
        </div>
      </div>

      {siteConfig.spotifyArtistId && (
        <>
          <h2>Top Tracks</h2>
          <SpotifyArtistEmbed artistId={siteConfig.spotifyArtistId} />
        </>
      )}

      {siteConfig.featuredVideoId && (
        <>
          <h2>Video</h2>
          <YouTubeEmbed
            videoId={siteConfig.featuredVideoId}
            title={siteConfig.featuredVideoTitle}
          />
        </>
      )}

      {albums.length > 0 && (
        <>
          <h2>Latest Releases</h2>
          {albums.map((album) => (
            <div className="row gtr-50" key={album.title}>
              <div className="col-6 col-12-medium">
                <span className="image fit">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={album.art} alt={`${album.title} cover art`} />
                </span>
                <h4>{album.title}</h4>
                <p>{album.subtitle}</p>
              </div>
              {album.spotifyAlbumId && (
                <div className="col-6 col-12-medium">
                  <SpotifyAlbumEmbed albumId={album.spotifyAlbumId} />
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </section>
  );
}
