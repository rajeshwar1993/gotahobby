import Hero from "@/components/hero";
import PopularEvents from "@/components/event-showcase";
import UpcomingEvents from "@/components/event-showcase";
import AttendingEvents from "@/components/event-showcase";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularEvents />
    </>
  );
}
