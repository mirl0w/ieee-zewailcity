import LoginForm from "../../../components/LoginForm";

export default function LoginPage() {
  async function login(formData: FormData) {
    "use server";

    const { cookies } = await import("next/headers");
    const role = formData.get("role") as string;
    const password = formData.get("password") as string;

    const validPasswords: Record<string, string | undefined> = {
      admin: process.env.ADMIN_PASSWORD,
      head: process.env.HEAD_PASSWORD,
      vicehead: process.env.VICEHEAD_PASSWORD,
      member: process.env.MEMBER_PASSWORD,
    };

    if (password !== validPasswords[role]) {
      throw new Error("Incorrect password");
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_session", `${role}:${password}`, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    const { redirect } = await import("next/navigation");
    redirect("/admin");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-6"
      style={{ backgroundImage: "url('/IEEEZC.jpg')" }}
    >
      <LoginForm login={login} />
    </div>
  );
}