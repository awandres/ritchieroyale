"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createCity(formData: FormData) {
  const name = formData.get("name") as string;
  const state = formData.get("state") as string;
  const country = formData.get("country") as string;

  await db.city.create({
    data: {
      name,
      state: state || null,
      country: country || "USA",
    },
  });

  redirect("/admin/manage/cities");
}

export async function deleteCity(formData: FormData) {
  const id = formData.get("id") as string;

  await db.city.delete({
    where: { id },
  });

  redirect("/admin/manage/cities");
}

