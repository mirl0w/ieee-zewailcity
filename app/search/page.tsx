import { db } from "../../db";
import { events, committee, board } from "../../db/schema";
import { ilike, or } from "drizzle-orm";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";

  const matchedEvents = query
    ? await db
        .select()
        .from(events)
        .where(
          or(
            ilike(events.title, `%${query}%`),
            ilike(events.description, `%${query}%`)
          )
        )
    : [];

  const matchedCommittee = query
    ? await db
        .select()
        .from(committee)
        .where(
          or(
            ilike(committee.name, `%${query}%`),
            ilike(committee.role, `%${query}%`),
            ilike(committee.committeeName, `%${query}%`)
          )
        )
    : [];

  const matchedBoard = query
    ? await db
        .select()
        .from(board)
        .where(
          or(
            ilike(board.name, `%${query}%`),
            ilike(board.position, `%${query}%`)
          )
        )
    : [];

  const noResults =
    query &&
    matchedEvents.length === 0 &&
    matchedCommittee.length === 0 &&
    matchedBoard.length === 0;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-[#00629B] mb-8">
        Search results for &quot;{query}&quot;
      </h1>

      {noResults && <p className="text-zinc-600">No results found.</p>}

      {matchedEvents.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Events</h2>
          <ul className="flex flex-col gap-3">
            {matchedEvents.map((event) => (
              <li key={event.id} className="p-4 bg-zinc-100 rounded-lg">
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-zinc-600 text-sm">{event.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {matchedCommittee.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Committee Members</h2>
          <ul className="grid grid-cols-2 gap-4">
            {matchedCommittee.map((member) => (
              <li
                key={member.id}
                className="p-5 bg-zinc-100 rounded-lg text-center"
              >
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-zinc-600 text-sm">{member.role}</p>
                {member.committeeName && (
                  <Link
                    href={`/committee/${encodeURIComponent(
                      member.committeeName
                    )}`}
                    className="text-[#00629B] hover:underline text-sm"
                  >
                    {member.committeeName}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {matchedBoard.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Board</h2>
          <ul className="grid grid-cols-2 gap-4">
            {matchedBoard.map((member) => (
              <li
                key={member.id}
                className="p-5 bg-zinc-100 rounded-lg text-center"
              >
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-zinc-600 text-sm">{member.position}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
