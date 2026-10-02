import { cookies } from "next/headers";

export async function getRole() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session) return null;

  const [role, password] = session.value.split(":");

  const validPasswords: Record<string, string | undefined> = {
    admin: process.env.ADMIN_PASSWORD,
    head: process.env.HEAD_PASSWORD,
    vicehead: process.env.VICEHEAD_PASSWORD,
    member: process.env.MEMBER_PASSWORD,
  };

  if (password !== validPasswords[role]) return null;
  return role;
}

export async function isAdmin() {
  return (await getRole()) === "admin";
}

export async function isCommitteeAdmin() {
  const role = await getRole();
  return role === "admin" || role === "head" || role === "vicehead";
}

export async function logout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}