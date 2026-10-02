"use client";

import { useState } from "react";

const roles = [
  { label: "Board / Admin", value: "admin" },
  { label: "Committee Head", value: "head" },
  { label: "Vice Head", value: "vicehead" },
  { label: "Member", value: "member" },
];

export default function LoginForm({
  login,
}: {
  login: (formData: FormData) => Promise<void>;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full max-w-sm bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[#00629B]">Admin Login</h1>
        <p className="text-zinc-500 text-sm mt-1">
          IEEE Zewail City Student Branch
        </p>
      </div>

      {!selected ? (
        <div className="grid grid-cols-2 gap-3">
          {roles.map((role) => (
            <button
              key={role.value}
              onClick={() => setSelected(role.value)}
              className="p-4 bg-zinc-100 rounded-xl text-center font-medium text-zinc-700 hover:bg-[#00629B] hover:text-white transition"
            >
              {role.label}
            </button>
          ))}
        </div>
      ) : (
        <form action={login} className="flex flex-col gap-4">
          <input type="hidden" name="role" value={selected} />
          <p className="text-sm text-zinc-600 text-center">
            Logging in as{" "}
            <span className="font-semibold text-[#00629B]">
              {roles.find((r) => r.value === selected)?.label}
            </span>
          </p>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            autoFocus
            className="px-4 py-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00629B] focus:border-transparent transition"
          />
          <button
            type="submit"
            className="px-4 py-3 bg-[#00629B] text-white font-medium rounded-xl hover:bg-[#004f7c] transition"
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="text-sm text-zinc-400 hover:underline"
          >
            Back
          </button>
        </form>
      )}
    </div>
  );
}