export default function LoginPage() {
  async function login(formData: FormData) {
    "use server";

    const { cookies } = await import("next/headers");
    const password = formData.get("password") as string;

    if (password !== process.env.ADMIN_PASSWORD) {
      throw new Error("Incorrect password");
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_session", process.env.ADMIN_PASSWORD!, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    const { redirect } = await import("next/navigation");
    redirect("/admin");
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold text-[#00629B] mb-6">Admin Login</h1>
      <form action={login} className="flex flex-col gap-3">
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
          Log In
        </button>
      </form>
    </div>
  );
}