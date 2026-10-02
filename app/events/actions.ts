"use server";

import { db } from "../../db";
import { events } from "../../db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function addEvent(formData: FormData) {
  const password = formData.get("password") as string;
  if (password !== process.env.ADMIN_PASSWORD) {
    throw new Error("Incorrect password");
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
  const password = formData.get("password") as string;
  if (password !== process.env.ADMIN_PASSWORD) {
    throw new Error("Incorrect password");
  }

  const id = Number(formData.get("id"));

  await db.delete(events).where(eq(events.id, id));

  revalidatePath("/events");
  revalidatePath("/");
}