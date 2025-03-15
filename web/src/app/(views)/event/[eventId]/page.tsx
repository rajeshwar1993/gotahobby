import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Gallery } from "@/components/image-gallery";
import { createPath } from "@/utils/url";
import Form from "next/form";
import { handleEventImageUpload } from "@/app/serverActions/imageUpload";

// Event Details Component
const EventDetails = ({ event }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <CalendarIcon className="h-5 w-5 text-muted-foreground" />
      <span>
        {event.date} at {event.time}
      </span>
    </div>
    <div className="flex items-center gap-2">
      <MapPinIcon className="h-5 w-5 text-muted-foreground" />
      <span>{event.location}</span>
    </div>
    <div className="flex items-center gap-2">
      <UsersIcon className="h-5 w-5 text-muted-foreground" />
      <span>{event.participants} participants</span>
    </div>
  </div>
);

// Sticky Join Button Component
const StickyJoinButton = ({ price }: { price: number }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg z-40">
    <div className="mx-auto max-w-4xl flex justify-between items-center">
      <span className="text-lg font-semibold">Price: ${price}</span>
      <Button size="lg" className="w-40" aria-label="Join event">
        Join Event
      </Button>
    </div>
  </div>
);

// Main Event Page Component
const EventPage = async () => {
  const eventData: Event = await fetch(
    createPath(`/api/events/0d55a6dc-4b44-4a18-9d6b-2f8acad01687`)
  ).then((res) => res.json());

  const event = {
    title: "Tech Conference 2025",
    banner: "https://picsum.photos/id/31/400/400",
    date: "March 15, 2025",
    time: "9:00 AM",
    location: "Tech Center, San Francisco",
    participants: 250,
    price: 199,
    description:
      "Join us for the most innovative tech conference of the year. Connect with industry leaders, learn about cutting-edge technologies, and network with fellow enthusiasts.",
    images: [
      "https://picsum.photos/id/1/400/400",
      "https://picsum.photos/id/11/400/400",
      "https://picsum.photos/id/21/400/400",
      "https://picsum.photos/id/41/400/400",
      "https://picsum.photos/id/51/400/400",
      "https://picsum.photos/id/61/400/400",
      "https://picsum.photos/id/71/400/400",
      "https://picsum.photos/id/81/400/400",
    ],
    comments: [
      {
        name: "John Doe",
        avatar: "/api/placeholder/40/40",
        date: "2 days ago",
        content:
          "Looking forward to the AI session! Will there be hands-on workshops?",
      },
      {
        name: "Sarah Smith",
        avatar: "/api/placeholder/40/40",
        date: "1 day ago",
        content:
          "Are the presentation slides going to be shared after the event?",
      },
    ],
  };

  return (
    <>
      {/* Banner and Title */}
      <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
        <Form action={handleEventImageUpload}>
          {/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
          <input name="pictureType" value={"EVENT_GALLERY"} />
          <input
            name="eventId"
            value={"9e33f1fe-4384-4d90-84c7-5c06e377368b"}
            readOnly
          />
          <input name="files" type="file" multiple />
          <button type="submit">Submit</button>
        </Form>
        <img
          src={event.banner}
          alt="Event banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            {event.title}
          </h1>
        </div>
      </div>

      {/* Event Details */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <EventDetails event={event} />
        </CardContent>
      </Card>

      {/* About Section */}
      <section className="mb-8" aria-labelledby="about-heading">
        <h2 id="about-heading" className="text-2xl font-semibold mb-4">
          About
        </h2>
        <p className="text-muted-foreground">{event.description}</p>
      </section>

      {/* Gallery Section */}
      <section className="mb-8" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className="text-2xl font-semibold mb-4">
          Gallery
        </h2>
        <Gallery images={event.images} />
      </section>

      {/* Comments Section */}
      <section aria-labelledby="comments-heading">
        <h2 id="comments-heading" className="text-2xl font-semibold mb-4">
          Discussion
        </h2>
        {/* <Comments comments={event.comments} /> */}
      </section>

      {/* Sticky Join Button */}
      <StickyJoinButton price={event.price} />
    </>
  );
};

export default EventPage;
