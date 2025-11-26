import Intro from "@/components/Intro";
import { db } from "@/lib/db";

export default async function HomePage() {
  // Fetch upcoming shows for homepage
  const upcomingShows = await db.show.findMany({
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
    take: 3,
  });

  return (
    <>
      <Intro />
      <div className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-rr-green via-rr-yellow to-rr-pink bg-clip-text text-transparent drop-shadow-lg">
            Ritchie Royale
          </h1>
          <p className="text-xl text-rr-green/90 max-w-2xl mx-auto drop-shadow-md">
           Rock N' Roll Revue!
          </p>
        </section>

        {upcomingShows.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-rr-yellow">
              Upcoming Shows
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingShows.map((show) => (
                <div
                  key={show.id}
                  className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-6 hover:border-rr-yellow/50 transition-all hover:shadow-lg hover:shadow-rr-green/20"
                >
                  <div className="text-sm text-rr-pink font-semibold mb-2">
                    {new Date(show.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-rr-green">{show.venue}</h3>
                  <p className="text-rr-green/70 mb-4">
                    {show.city.name}
                    {show.city.state && `, ${show.city.state}`}
                  </p>
                  {show.ticketUrl && (
                    <a
                      href={show.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rr-yellow hover:text-rr-pink font-semibold transition-colors"
                    >
                      Get Tickets →
                    </a>
                  )}
                </div>
              ))}
                        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-rr-yellow">
              Upcoming Shows
            </h2>
            <h2 className="text-3xl font-bold text-center mb-8 text-rr-yellow">
              No upcoming shows scheduled. Check back soon!
            </h2>
          </section>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

