import { db } from "../../../db";
import { committee, committeeTasks } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { addMember, addTask } from "../actions";
import { isAdmin } from "../../../lib/auth";

export default async function CommitteeDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const committeeName = decodeURIComponent(name);

  const members = await db
    .select()
    .from(committee)
    .where(eq(committee.committeeName, committeeName));

  const tasks = await db
    .select()
    .from(committeeTasks)
    .where(eq(committeeTasks.committeeName, committeeName));

  const head = members.find((m) => m.position === "Head");
  const viceHead = members.find((m) => m.position === "Vice Head");
  const loggedIn = await isAdmin();
  const regularMembers = members.filter(
    (m) => m.position !== "Head" && m.position !== "Vice Head"
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-[#00629B] mb-8">
        {committeeName}
      </h1>

      {head && (
        <div className="mb-8 p-8 bg-[#00629B] text-white rounded-xl text-center">
          <p className="text-sm uppercase tracking-wide text-blue-100 mb-2">
            Head
          </p>
          <h2 className="text-2xl font-bold">{head.name}</h2>
          <p className="text-blue-100 mt-1">{head.role}</p>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">Team</h2>
      <ul className="grid grid-cols-2 gap-4 mb-10">
        {viceHead && (
          <li className="p-5 bg-zinc-100 rounded-lg text-center">
            <p className="text-sm text-zinc-500 mb-1">Vice Head</p>
            <h3 className="text-lg font-semibold">{viceHead.name}</h3>
            <p className="text-zinc-600 text-sm">{viceHead.role}</p>
          </li>
        )}
        {regularMembers.map((member) => (
          <li
            key={member.id}
            className="p-5 bg-zinc-100 rounded-lg text-center"
          >
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-zinc-600 text-sm">{member.role}</p>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Tasks & Plans</h2>
      <ul className="flex flex-col gap-3 mb-10">
        {tasks.map((task) => (
          <li key={task.id} className="p-4 bg-zinc-100 rounded-lg">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-zinc-600 text-sm">{task.description}</p>
          </li>
        ))}
      </ul>

      {loggedIn && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Add Member</h2>
          <form action={addMember} className="flex flex-col gap-3 mb-10 max-w-sm">
            <input type="hidden" name="committeeName" value={committeeName} />
            <input
              name="name"
              placeholder="Name"
              required
              className="px-4 py-2 border border-zinc-300 rounded-lg"
            />
            <input
              name="role"
              placeholder="Role (e.g. Member)"
              required
              className="px-4 py-2 border border-zinc-300 rounded-lg"
            />
            <select
              name="position"
              className="px-4 py-2 border border-zinc-300 rounded-lg"
            >
              <option value="Member">Member</option>
              <option value="Head">Head</option>
              <option value="Vice Head">Vice Head</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-[#00629B] text-white rounded-lg hover:bg-[#004f7c] transition"
            >
              Add Member
            </button>
          </form>

          <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
          <form action={addTask} className="flex flex-col gap-3 max-w-sm">
            <input type="hidden" name="committeeName" value={committeeName} />
            <input
              name="title"
              placeholder="Task title"
              required
              className="px-4 py-2 border border-zinc-300 rounded-lg"
            />
            <textarea
              name="description"
              placeholder="Task description"
              className="px-4 py-2 border border-zinc-300 rounded-lg"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#00629B] text-white rounded-lg hover:bg-[#004f7c] transition"
            >
              Add Task
            </button>
          </form>
        </>
      )}
    </div>
  );
}