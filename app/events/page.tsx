import { db } from "../../db";
import { events } from "../../db/schema";

export default async function EventsPage() {
  const allEvents = await db.select().from(events);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-[#00629B] mb-8">Events</h1>
      <ul className="flex flex-col gap-4">
        {allEvents.map((event) => (
          <li key={event.id} className="p-5 bg-zinc-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-1">{event.title}</h2>
            <p className="text-zinc-600">{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}