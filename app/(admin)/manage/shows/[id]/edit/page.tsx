import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditShowPage({
  params,
}: {
  params: { id: string };
}) {
  const show = await db.show.findUnique({
    where: { id: params.id },
    include: { city: true },
  });

  if (!show) {
    notFound();
  }

  const cities = await db.city.findMany({
    orderBy: {
      name: "asc",
    },
  });

  async function updateShow(formData: FormData) {
    "use server";

    const venue = formData.get("venue") as string;
    const date = formData.get("date") as string;
    const cityId = formData.get("cityId") as string;
    const ticketUrl = formData.get("ticketUrl") as string;
    const notes = formData.get("notes") as string;
    const isPublic = formData.get("isPublic") === "on";

    await db.show.update({
      where: { id: params.id },
      data: {
        venue,
        date: new Date(date),
        cityId,
        ticketUrl: ticketUrl || null,
        notes: notes || null,
        isPublic,
      },
    });

    redirect("/admin/manage/shows");
  }

  // Format date for datetime-local input
  const formattedDate = new Date(show.date).toISOString().slice(0, 16);

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link
          href="/admin/manage/shows"
          className="text-rr-green hover:text-rr-yellow transition-colors"
        >
          ← Back to Shows
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-rr-yellow">Edit Show</h1>

      <form action={updateShow} className="space-y-6">
        <div className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-6 space-y-6">
          <div>
            <label htmlFor="venue" className="block text-sm font-medium text-rr-green mb-2">
              Venue Name *
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              required
              defaultValue={show.venue}
              className="w-full px-4 py-2 bg-rr-dark border-2 border-rr-green/30 rounded-lg text-rr-green placeholder-rr-green/40 focus:outline-none focus:border-rr-yellow transition-colors"
              placeholder="The Venue Name"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-rr-green mb-2">
              Show Date *
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              required
              defaultValue={formattedDate}
              className="w-full px-4 py-2 bg-rr-dark border-2 border-rr-green/30 rounded-lg text-rr-green focus:outline-none focus:border-rr-yellow transition-colors"
            />
          </div>

          <div>
            <label htmlFor="cityId" className="block text-sm font-medium text-rr-green mb-2">
              City *
            </label>
            <select
              id="cityId"
              name="cityId"
              required
              defaultValue={show.cityId}
              className="w-full px-4 py-2 bg-rr-dark border-2 border-rr-green/30 rounded-lg text-rr-green focus:outline-none focus:border-rr-yellow transition-colors"
            >
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                  {city.state && `, ${city.state}`} ({city.country})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="ticketUrl" className="block text-sm font-medium text-rr-green mb-2">
              Ticket URL (optional)
            </label>
            <input
              type="url"
              id="ticketUrl"
              name="ticketUrl"
              defaultValue={show.ticketUrl || ""}
              className="w-full px-4 py-2 bg-rr-dark border-2 border-rr-green/30 rounded-lg text-rr-green placeholder-rr-green/40 focus:outline-none focus:border-rr-yellow transition-colors"
              placeholder="https://tickets.example.com"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-rr-green mb-2">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              defaultValue={show.notes || ""}
              className="w-full px-4 py-2 bg-rr-dark border-2 border-rr-green/30 rounded-lg text-rr-green placeholder-rr-green/40 focus:outline-none focus:border-rr-yellow transition-colors"
              placeholder="Additional information about this show..."
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              defaultChecked={show.isPublic}
              className="w-4 h-4 rounded border-rr-green/30 bg-rr-dark text-rr-green focus:ring-rr-yellow"
            />
            <label htmlFor="isPublic" className="ml-2 text-sm text-rr-green">
              Make this show publicly visible
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-rr-green/20 border-2 border-rr-green text-rr-green px-6 py-3 rounded-lg hover:bg-rr-green/30 hover:border-rr-yellow hover:text-rr-yellow transition-all font-semibold"
          >
            Update Show
          </button>
          <Link
            href="/admin/manage/shows"
            className="px-6 py-3 border-2 border-rr-green/30 text-rr-green/70 rounded-lg hover:border-rr-pink hover:text-rr-pink transition-all font-semibold"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

