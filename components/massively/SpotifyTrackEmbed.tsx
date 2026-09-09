export default function SpotifyTrackEmbed({
  trackId,
  title = "Spotify player",
}: {
  trackId: string;
  title?: string;
}) {
  return (
    <iframe
      title={title}
      src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
      width="100%"
      height={352}
      style={{ borderRadius: 12, border: 0 }}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}
