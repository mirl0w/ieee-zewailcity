"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }}
      className="ml-auto"
    >
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 rounded-lg text-sm text-zinc-800 bg-white border-2 border-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-white w-48 shadow-sm"
      />
    </form>
  );
}