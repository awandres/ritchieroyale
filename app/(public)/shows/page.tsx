import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

async function getShows() {
  try {
    return await db.show.findMany({
      where: {
        isPublic: true,
        date: {
          gte: new Date(),
        },
      },
      include: {
        city: true,
      },
      orderBy: {
        date: "asc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch shows:", error);
    return [];
  }
}

export default async function ShowsPage() {
  const shows = await getShows();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-rr-yellow">Upcoming Shows</h1>
      {shows.length === 0 ? (
        <p className="text-center text-lg text-rr-green/70">
          No upcoming shows scheduled. Check back soon!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shows.map((show) => (
            <div
              key={show.id}
              className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-6 hover:border-rr-yellow/50 transition-all hover:shadow-lg hover:shadow-rr-green/20"
            >
              <div className="text-sm text-rr-pink font-semibold mb-2">
                {new Date(show.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <h2 className="text-2xl font-bold mb-2 text-rr-green">{show.venue}</h2>
              <p className="text-rr-green/70 mb-4">
                {show.city.name}
                {show.city.state && `, ${show.city.state}`}
              </p>
              {show.notes && (
                <p className="text-sm text-rr-green/60 mb-4">{show.notes}</p>
              )}
              {show.ticketUrl && (
                <a
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-rr-green/20 border border-rr-green text-rr-yellow px-6 py-2 rounded-lg hover:bg-rr-green/30 hover:border-rr-yellow transition-colors"
                >
                  Get Tickets
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
