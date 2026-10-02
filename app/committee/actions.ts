"use server";

import { db } from "../../db";
import { committee, committeeTasks } from "../../db/schema";
import { revalidatePath } from "next/cache";

export async function addMember(formData: FormData) {
  const password = formData.get("password") as string;
  if (password !== process.env.ADMIN_PASSWORD) {
    throw new Error("Incorrect password");
  }

  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const committeeName = formData.get("committeeName") as string;
  const position = formData.get("position") as string;

  await db.insert(committee).values({
    name,
    role,
    committeeName,
    position,
  });

  revalidatePath("/committee");
}

export async function addTask(formData: FormData) {
  const password = formData.get("password") as string;
  if (password !== process.env.ADMIN_PASSWORD) {
    throw new Error("Incorrect password");
  }

  const committeeName = formData.get("committeeName") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  await db.insert(committeeTasks).values({
    committeeName,
    title,
    description,
  });

  revalidatePath("/committee");
}