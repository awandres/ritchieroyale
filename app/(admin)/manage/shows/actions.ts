"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createShow(formData: FormData) {
  const venue = formData.get("venue") as string;
  const date = formData.get("date") as string;
  const cityId = formData.get("cityId") as string;
  const ticketUrl = formData.get("ticketUrl") as string;
  const notes = formData.get("notes") as string;
  const isPublic = formData.get("isPublic") === "on";

  await db.show.create({
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

