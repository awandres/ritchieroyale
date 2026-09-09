export function SpotifyAlbumEmbed({ albumId }: { albumId: string }) {
  return (
    <iframe
      title="Spotify album player"
      src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0`}
      width="100%"
      height="100%"
      style={{ borderRadius: 12, border: 0, minHeight: 400 }}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}

export default function SpotifyArtistEmbed({ artistId }: { artistId: string }) {
  return (
    <iframe
      title="Spotify artist player"
      src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator&theme=0`}
      width="100%"
      height="100%"
      style={{ borderRadius: 12, border: 0, minHeight: 400 }}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}
