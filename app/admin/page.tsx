import { isAdmin } from "../../lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminPage() {
  const loggedIn = await isAdmin();

  if (!loggedIn) {
    redirect("/admin/login");
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#00629B] mb-6">Admin Panel</h1>
      <p className="text-zinc-600 mb-6">
        You&apos;re logged in. Go manage content:
      </p>
      <ul className="flex flex-col gap-2">
        <li>
          <Link href="/events" className="text-[#00629B] hover:underline">
            Manage Events
          </Link>
        </li>
        <li>
          <Link href="/committee" className="text-[#00629B] hover:underline">
            Manage Committee
          </Link>
        </li>
      </ul>
    </div>
  );
}