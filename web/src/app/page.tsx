import Hero from "@/components/hero";
import PopularEvents from "@/components/event-showcase";
import UpcomingEvents from "@/components/event-showcase";
import AttendingEvents from "@/components/event-showcase";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background container mx-auto px-4 space-y-12 pb-24 pt-8">
      <Hero />
      <PopularEvents />
    </main>
  );
}
