import Hero from "@/components/hero";
import EventShowcase from "@/components/event-showcase";
import { getUpcomingEvents, getPopularEvents } from "@/lib/mockApi";

export default async function HomePage() {
  // Server-side data fetching
  const upcomingEvents = await getUpcomingEvents();
  const popularEvents = await getPopularEvents();

  return (
    <div className="space-y-8">
      <Hero />

      <EventShowcase
        title="Upcoming Events"
        events={upcomingEvents}
        viewAllLink="/events/upcoming"
      />

      <EventShowcase
        title="Popular Events"
        events={popularEvents}
        viewAllLink="/events/popular"
      />
    </div>
  );
}
