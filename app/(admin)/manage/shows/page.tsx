import { db } from "@/lib/db";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminShowsPage() {
  const shows = await db.show.findMany({
    include: {
      city: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-rr-yellow">Manage Shows</h1>
        <Link
          href="/admin/manage/shows/new"
          className="bg-rr-green/20 border-2 border-rr-green text-rr-green px-6 py-2 rounded-lg hover:bg-rr-green/30 hover:border-rr-yellow hover:text-rr-yellow transition-all font-semibold"
        >
          + Add New Show
        </Link>
      </div>

      {shows.length === 0 ? (
        <div className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-12 text-center">
          <p className="text-rr-green/70 mb-4">No shows yet. Create your first show!</p>
          <Link
            href="/admin/manage/shows/new"
            className="inline-block bg-rr-green/20 border-2 border-rr-green text-rr-green px-6 py-3 rounded-lg hover:bg-rr-green/30 hover:border-rr-yellow hover:text-rr-yellow transition-all font-semibold"
          >
            + Add New Show
          </Link>
        </div>
      ) : (
        <div className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-rr-dark/60 border-b border-rr-green/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-rr-yellow uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-rr-yellow uppercase tracking-wider">
                  Venue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-rr-yellow uppercase tracking-wider">
                  City
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-rr-yellow uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-rr-yellow uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rr-green/20">
              {shows.map((show) => (
                <tr key={show.id} className="hover:bg-rr-green/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-rr-green">
                    {new Date(show.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-rr-green">
                    {show.venue}
                  </td>
                  <td className="px-6 py-4 text-sm text-rr-green/70">
                    {show.city.name}
                    {show.city.state && `, ${show.city.state}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {show.isPublic ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-rr-green/20 text-rr-green border border-rr-green/30">
                        Public
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-rr-pink/20 text-rr-pink border border-rr-pink/30">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Link
                      href={`/admin/manage/shows/${show.id}/edit`}
                      className="text-rr-yellow hover:text-rr-pink transition-colors"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/admin/manage/shows/${show.id}/delete`}
                      className="text-rr-pink hover:text-red-400 transition-colors"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

