import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function MusicPage() {
  const songs = await db.song.findMany({
    where: {
      isActive: true,
    },
    include: {
      resources: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-rr-yellow">Music</h1>
      {songs.length === 0 ? (
        <p className="text-center text-lg text-rr-green/70">
          Music coming soon. Stay tuned!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song) => (
            <div
              key={song.id}
              className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-6 hover:border-rr-pink/50 transition-all hover:shadow-lg hover:shadow-rr-green/20"
            >
              <h2 className="text-2xl font-bold mb-2 text-rr-green">{song.title}</h2>
              {(song.key || song.tempo) && (
                <div className="text-sm text-rr-green/60 mb-4">
                  {song.key && <span>Key: {song.key}</span>}
                  {song.key && song.tempo && " • "}
                  {song.tempo && <span>Tempo: {song.tempo} BPM</span>}
                </div>
              )}
              {song.notes && (
                <p className="text-sm text-rr-green/70 mb-4">{song.notes}</p>
              )}
              {song.resources.length > 0 && (
                <div className="space-y-2">
                  {song.resources
                    .filter((r) => r.type === "AUDIO_REFERENCE")
                    .map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-rr-yellow hover:text-rr-pink text-sm transition-colors"
                      >
                        🔊 Listen
                      </a>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

