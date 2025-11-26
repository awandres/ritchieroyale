import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function DeleteShowPage({
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

  async function deleteShow() {
    "use server";

    await db.show.delete({
      where: { id: params.id },
    });

    redirect("/admin/manage/shows");
  }

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

      <h1 className="text-3xl font-bold mb-8 text-rr-pink">Delete Show</h1>

      <div className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-pink/50 rounded-lg p-8">
        <div className="mb-6">
          <p className="text-rr-green text-lg mb-4">
            Are you sure you want to delete this show?
          </p>
          <div className="bg-rr-dark/60 border-2 border-rr-green/30 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-rr-green/70">Venue:</span>
              <span className="text-rr-green font-semibold">{show.venue}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-rr-green/70">Date:</span>
              <span className="text-rr-green">
                {new Date(show.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-rr-green/70">City:</span>
              <span className="text-rr-green">
                {show.city.name}
                {show.city.state && `, ${show.city.state}`}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-rr-pink/10 border border-rr-pink/30 rounded-lg p-4 mb-6">
          <p className="text-rr-pink text-sm">
            ⚠️ This action cannot be undone. This show will be permanently deleted.
          </p>
        </div>

        <form action={deleteShow} className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-rr-pink/20 border-2 border-rr-pink text-rr-pink px-6 py-3 rounded-lg hover:bg-red-500/30 hover:border-red-500 hover:text-red-400 transition-all font-semibold"
          >
            Yes, Delete Show
          </button>
          <Link
            href="/admin/manage/shows"
            className="px-6 py-3 border-2 border-rr-green/30 text-rr-green rounded-lg hover:border-rr-green hover:bg-rr-green/10 transition-all font-semibold"
          >
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

