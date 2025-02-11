import EventCard from "../event-card";
import { Button } from "@/components/ui/button";

export default function EventShowcase() {
  const events = [
    {
      image: "https://picsum.photos/id/1/500/500",
      title: "Photography Workshop",
      date: "Nov 28",
      time: "2:00 PM",
      location: "Downtown Studio",
      price: "45",
      attendees: 28,
    },
    {
      image: "https://picsum.photos/id/10/500/500",
      title: "Photography Workshop",
      date: "Nov 28",
      time: "2:00 PM",
      location: "Downtown Studio",
      price: "45",
      attendees: 28,
    },
    {
      image: "https://picsum.photos/id/15/500/500",
      title: "Photography Workshop",
      date: "Nov 28",
      time: "2:00 PM",
      location: "Downtown Studio",
      price: "45",
      attendees: 28,
    },
    {
      image: "https://picsum.photos/id/4/500/500",
      title: "Photography Workshop",
      date: "Nov 28",
      time: "2:00 PM",
      location: "Downtown Studio",
      price: "45",
      attendees: 28,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Most Popular Events</h2>
        <Button variant="link">View All →</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </section>
  );
}
