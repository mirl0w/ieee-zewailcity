import { db } from "../../../db";
import { committee, committeeTasks } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { addMember, addTask } from "../actions";

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
  const regularMembers = members.filter(
    (m) => m.position !== "Head" && m.position !== "Vice Head"
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-[#00629B] mb-8">
        {committeeName}
      </h1>

      {(head || viceHead) && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {head && (
            <div className="p-5 bg-zinc-100 rounded-lg text-center">
              <p className="text-sm text-zinc-500 mb-1">Head</p>
              <h2 className="text-xl font-semibold">{head.name}</h2>
            </div>
          )}
          {viceHead && (
            <div className="p-5 bg-zinc-100 rounded-lg text-center">
              <p className="text-sm text-zinc-500 mb-1">Vice Head</p>
              <h2 className="text-xl font-semibold">{viceHead.name}</h2>
            </div>
          )}
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">Members</h2>
      <ul className="grid grid-cols-2 gap-4 mb-10">
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
        <input
          type="password"
          name="password"
          placeholder="Admin password"
          required
          className="px-4 py-2 border border-zinc-300 rounded-lg"
        />
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
        <input
          type="password"
          name="password"
          placeholder="Admin password"
          required
          className="px-4 py-2 border border-zinc-300 rounded-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#00629B] text-white rounded-lg hover:bg-[#004f7c] transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}