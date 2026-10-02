"use client";

import { useRouter } from "next/navigation";

export default function CommitteeFilter({
  committees,
  selected,
}: {
  committees: string[];
  selected: string;
}) {
  const router = useRouter();

  return (
    <div className="relative mb-8 w-fit">
      <select
        value={selected}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "All") {
            router.push("/committee");
          } else {
            router.push(`/committee?committee=${value}`);
          }
        }}
        className="px-5 py-2.5 pr-10 border border-zinc-300 rounded-xl shadow-sm bg-white text-zinc-700 font-medium appearance-none cursor-pointer hover:border-[#00629B] focus:outline-none focus:ring-2 focus:ring-[#00629B] focus:border-transparent transition"
      >
        <option value="All">All Committees</option>
        {committees.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
        ▼
      </div>
    </div>
  );
}