import { db } from "../../db";
import { events } from "../../db/schema";
import { addEvent, deleteEvent } from "./actions";
import { isAdmin } from "../../lib/auth";

export default async function EventsPage() {
  const allEvents = await db.select().from(events);
  const loggedIn = await isAdmin();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-[#00629B] mb-8">Events</h1>
      <ul className="flex flex-col gap-4">
        {allEvents.map((event) => (
          <li key={event.id} className="p-5 bg-zinc-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-1">{event.title}</h2>
            <p className="text-zinc-600">{event.description}</p>
            {loggedIn && (
              <form action={deleteEvent} className="mt-2 flex gap-2 items-center">
                <input type="hidden" name="id" value={event.id} />
                <button
                  type="submit"
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>

      {loggedIn && (
        <>
          <h2 className="text-2xl font-semibold mt-12 mb-4">Add Event</h2>
          <form action={addEvent} className="flex flex-col gap-3 max-w-sm">
            <input
              name="title"
              placeholder="Event title"
              required
              className="px-4 py-2 border border-zinc-300 rounded-lg"
            />
            <textarea
              name="description"
              placeholder="Description"
              className="px-4 py-2 border border-zinc-300 rounded-lg"
            />
            <input
              type="date"
              name="date"
              required
              className="px-4 py-2 border border-zinc-300 rounded-lg"
            />
            <input
              name="location"
              placeholder="Location"
              className="px-4 py-2 border border-zinc-300 rounded-lg"
            />
            <input
              name="registrationLink"
              placeholder="Registration link (optional)"
              className="px-4 py-2 border border-zinc-300 rounded-lg"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#00629B] text-white rounded-lg hover:bg-[#004f7c] transition"
            >
              Add Event
            </button>
          </form>
        </>
      )}
    </div>
  );
}