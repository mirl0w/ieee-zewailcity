import { db } from "../db";
import { events } from "../db/schema";

export default async function Home() {
  const allEvents = await db.select().from(events);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-[#00629B] mb-4">
        IEEE Zewail City Student Branch
      </h1>
      <p className="text-lg text-zinc-700 mb-10">
        We are the IEEE Student Branch at Zewail City of Science and
        Technology, bringing together students passionate about engineering,
        technology, and innovation.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
      <ul className="flex flex-col gap-3">
        {allEvents.map((event) => (
          <li key={event.id} className="p-4 bg-zinc-100 rounded-lg">
            {event.title}
          </li>
        ))}
      </ul>
    </div>
  );
}