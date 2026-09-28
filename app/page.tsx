import HomeClient from "@/components/HomeClient";
import { getUpcomingEvent } from "@/lib/events";

export const revalidate = 60; // Revalidate every minute

export default async function Page() {
  const upcomingEvent = await getUpcomingEvent();

  return <HomeClient initialEvent={upcomingEvent} />;
}
