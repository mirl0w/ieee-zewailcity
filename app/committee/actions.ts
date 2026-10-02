"use server";

import { db } from "../../db";
import { committee, committeeTasks } from "../../db/schema";
import { revalidatePath } from "next/cache";
import { isAdmin } from "../../lib/auth";

export async function addMember(formData: FormData) {
  if (!(await isAdmin())) {
    throw new Error("Not authorized");
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
  if (!(await isAdmin())) {
    throw new Error("Not authorized");
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