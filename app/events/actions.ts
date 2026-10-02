"use server";

import { db } from "../../db";
import { events } from "../../db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { isAdmin } from "../../lib/auth";

export async function addEvent(formData: FormData) {
  if (!(await isAdmin())) {
    throw new Error("Not authorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const location = formData.get("location") as string;
  const registrationLink = formData.get("registrationLink") as string;

  await db.insert(events).values({
    title,
    description,
    date: new Date(date),
    location,
    registrationLink,
  });

  revalidatePath("/events");
  revalidatePath("/");
}

export async function deleteEvent(formData: FormData) {
  if (!(await isAdmin())) {
    throw new Error("Not authorized");
  }

  const id = Number(formData.get("id"));

  await db.delete(events).where(eq(events.id, id));

  revalidatePath("/events");
  revalidatePath("/");
}