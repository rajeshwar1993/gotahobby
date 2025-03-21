import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Gallery } from "@/components/image-gallery";
import { createPath } from "@/utils/url";
import Form from "next/form";
import { handleEventImageUpload } from "@/app/serverActions/imageUpload";
import { Event } from "@/types";
import { cookies } from "next/headers";

// Event Details Component
const EventDetails = ({ event }: { event: Event }) => (
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
const EventPage = async ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const eventId = (await params).eventId;

  // Get cookies from the request
  const cookieStore = cookies();

  // Pass cookies in the fetch request
  const res = await fetch(createPath(`/api/events/${eventId}`), {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const { data: event }: { data: Event } = await res.json();
  console.log("event:", event);

  return (
    <>
      {/* Banner and Title */}
      <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
        <img
          src={event.bannerImage?.src}
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
          {/* <EventDetails event={event} /> */}
        </CardContent>
      </Card>
      {/* About Section */}
      {/* <section className="mb-8" aria-labelledby="about-heading">
        <h2 id="about-heading" className="text-2xl font-semibold mb-4">
          About
        </h2>
        <p className="text-muted-foreground">{event.bio?.text}</p>
      </section> */}
      {/* Gallery Section */}
      {/* <section className="mb-8" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className="text-2xl font-semibold mb-4">
          Gallery
        </h2>
        <Gallery images={event.photos} />
      </section> */}
      {/* Comments Section */}
      {/* <section aria-labelledby="comments-heading">
        <h2 id="comments-heading" className="text-2xl font-semibold mb-4">
          Discussion
        </h2>
        {/* <Comments comments={event.comments} /> 
      </section> */}
      {/* Sticky Join Button */}
      {/* <StickyJoinButton price={event.fee?.amount} /> */}
    </>
  );
};

export default EventPage;
