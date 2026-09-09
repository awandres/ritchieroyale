export default function YouTubeEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title?: string;
}) {
  return (
    <>
      {title && <h4 className="mb-4">{title}</h4>}
      <iframe
        title={title || "YouTube video player"}
        width="100%"
        height={415}
        src={`https://www.youtube.com/embed/${videoId}`}
        style={{ border: 0 }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </>
  );
}
