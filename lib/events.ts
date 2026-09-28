import clientPromise from "@/lib/mongodb";
import { type Event } from "@/lib/types";

export async function getUpcomingEvent(): Promise<Event | null> {
  try {
    const client = await clientPromise;
    const collection = client.db("hackshastra").collection("events");
    const today = new Date().toISOString().split("T")[0];
    const event = await collection.findOne(
      { is_upcoming: true, date: { $gte: today } },
      { sort: { date: 1 } },
    );
    if (!event) return null;
    return {
      ...event,
      _id: event._id?.toString(),
    } as unknown as Event;
  } catch (error) {
    console.error("Failed to fetch upcoming event on server:", error);
    return null;
  }
}
