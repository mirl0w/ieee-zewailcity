import { cookies } from "next/headers";
export async function isAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === process.env.ADMIN_PASSWORD;
}
export async function logout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}