import { db } from "../../db";
import { committee } from "../../db/schema";
import Link from "next/link";

export default async function CommitteePage() {
  const allMembers = await db.select().from(committee);

  const committeeNames = Array.from(
    new Set(
      allMembers
        .map((m) => m.committeeName)
        .filter((name): name is string => name !== null)
    )
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-[#00629B] mb-8">Committees</h1>
      <ul className="grid grid-cols-2 gap-4">
        {committeeNames.map((name) => (
          <li key={name}>
            <Link
              href={`/committee/${encodeURIComponent(name)}`}
              className="block p-6 bg-zinc-100 rounded-lg text-center hover:bg-zinc-200 transition"
            >
              <h2 className="text-xl font-semibold text-[#00629B]">
                {name}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}