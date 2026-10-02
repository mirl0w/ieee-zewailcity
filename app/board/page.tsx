import { db } from "../../db";
import { board } from "../../db/schema";

export default async function BoardPage() {
  const allBoardMembers = await db.select().from(board);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-[#00629B] mb-8">Board</h1>
      <ul className="grid grid-cols-2 gap-4">
        {allBoardMembers.map((member) => (
          <li
            key={member.id}
            className="p-5 bg-zinc-100 rounded-lg flex flex-col items-center text-center"
          >
            {member.photoUrl && (
              <img
                src={member.photoUrl}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mb-3"
              />
            )}
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-zinc-600 mb-2">{member.position}</p>
            <p className="text-sm text-zinc-700 mb-2">{member.bio}</p>
            <a
              href={member.linkedin ?? "#"}
              className="text-[#00629B] hover:underline text-sm"
            >
              LinkedIn
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}