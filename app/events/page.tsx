import { db } from "../../db";
import { events } from "../../db/schema";
export default async function EventsPage(){
    const allEvents=await db.select().from(events);
      return (
    <div>
      <h1>Events</h1>
      <ul>
        {allEvents.map((event) => (
          <li key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
