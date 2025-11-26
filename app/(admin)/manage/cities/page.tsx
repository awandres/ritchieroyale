import { db } from "@/lib/db";
import Link from "next/link";
import { createCity, deleteCity } from "./actions";

export const dynamic = 'force-dynamic';

type CityWithCount = {
  id: string;
  name: string;
  state: string | null;
  country: string;
  _count: {
    shows: number;
    members: number;
  };
};

async function getCities(): Promise<CityWithCount[]> {
  try {
    return await db.city.findMany({
      include: {
        _count: {
          select: {
            shows: true,
            members: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch cities:", error);
    return [];
  }
}

export default async function AdminCitiesPage() {
  const cities = await getCities();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-rr-yellow">Manage Cities</h1>
        <Link
          href="/admin/manage"
          className="text-rr-green hover:text-rr-yellow transition-colors"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Add City Form */}
      <div className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-rr-green">Add New City</h2>
        <form action={createCity} className="flex gap-4 flex-wrap">
          <input
            type="text"
            name="name"
            placeholder="City Name"
            required
            className="flex-1 min-w-[200px] px-4 py-2 bg-rr-dark border-2 border-rr-green/30 rounded-lg text-rr-green placeholder-rr-green/40 focus:outline-none focus:border-rr-yellow transition-colors"
          />
          <input
            type="text"
            name="state"
            placeholder="State (optional)"
            className="w-32 px-4 py-2 bg-rr-dark border-2 border-rr-green/30 rounded-lg text-rr-green placeholder-rr-green/40 focus:outline-none focus:border-rr-yellow transition-colors"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            defaultValue="USA"
            className="w-32 px-4 py-2 bg-rr-dark border-2 border-rr-green/30 rounded-lg text-rr-green placeholder-rr-green/40 focus:outline-none focus:border-rr-yellow transition-colors"
          />
          <button
            type="submit"
            className="bg-rr-green/20 border-2 border-rr-green text-rr-green px-6 py-2 rounded-lg hover:bg-rr-green/30 hover:border-rr-yellow hover:text-rr-yellow transition-all font-semibold"
          >
            Add City
          </button>
        </form>
      </div>

      {/* Cities List */}
      <div className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-rr-dark/60 border-b border-rr-green/30">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-rr-yellow uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-rr-yellow uppercase tracking-wider">
                State
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-rr-yellow uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-rr-yellow uppercase tracking-wider">
                Shows
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-rr-yellow uppercase tracking-wider">
                Members
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-rr-yellow uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rr-green/20">
            {cities.map((city) => (
              <tr key={city.id} className="hover:bg-rr-green/5 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-rr-green">
                  {city.name}
                </td>
                <td className="px-6 py-4 text-sm text-rr-green/70">
                  {city.state || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-rr-green/70">
                  {city.country}
                </td>
                <td className="px-6 py-4 text-sm text-rr-green/70">
                  {city._count.shows}
                </td>
                <td className="px-6 py-4 text-sm text-rr-green/70">
                  {city._count.members}
                </td>
                <td className="px-6 py-4 text-right text-sm">
                  <form action={deleteCity} className="inline">
                    <input type="hidden" name="id" value={city.id} />
                    <button
                      type="submit"
                      disabled={city._count.shows > 0 || city._count.members > 0}
                      className="text-rr-pink hover:text-red-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title={
                        city._count.shows > 0 || city._count.members > 0
                          ? "Cannot delete city with shows or members"
                          : "Delete city"
                      }
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
