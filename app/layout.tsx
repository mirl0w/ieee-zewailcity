import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IEEE Zewail City Student Branch",
  description: "Official website of the IEEE Student Branch at Zewail City of Science and Technology",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="flex gap-6 items-center px-8 py-4 bg-[#00629B] text-white">
          <Link href="/" className="hover:underline font-medium">Home</Link>
          <Link href="/events" className="hover:underline font-medium">Events</Link>
          <Link href="/committee" className="hover:underline font-medium">Committee</Link>
          <Link href="/board" className="hover:underline font-medium">Board</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}