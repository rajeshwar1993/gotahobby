import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Gallery } from "@/components/image-gallery";
import { createPath } from "@/utils/url";
import { Event } from "@/types";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Event Details Component
const EventDetails = ({ event }: { event: Event }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-5">
      <div className="flex items-start gap-2 col-span-4">
        <CalendarIcon className="h-5 w-5 text-muted-foreground mt-1" />
        <div className="flex flex-col">
          <span className="font-semibold">Wednesday 24th March 2024</span>
          <span>10pm to 12pm</span>
        </div>
      </div>
      <span className="text-center">Add to calendar</span>
    </div>

    <div className="flex items-start gap-2 col-span-4">
      <MapPinIcon className="h-5 w-5 text-muted-foreground mt-1" />
      <div className="flex flex-col">
        <span className="font-semibold">Ryogoku Sports center</span>
        <span>5-1-8 Asakusabashi, Taito City, Tokyo 111-0053 · Tokyo</span>
      </div>
    </div>
  </div>
);

const HostAndGroupDetails = () => (
  <div className="flex gap-8 justify-between">
    <div className="flex flex-col gap-1">
      <span className="text-semibold text-foreground">Hosts</span>
      <Avatar>
        <AvatarFallback>RR</AvatarFallback>
      </Avatar>
    </div>
    <div className="flex gap-2 items-start">
      <div className="h-16 w-16 rounded-lg overflow-hidden">
        <img
          src="https://picsum.photos/id/34/400/400"
          alt="Event banner"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="font-semibold">Host group name</div>
    </div>
  </div>
);

const GoingList = () => (
  <div>
    <span className="text-semibold text-foreground">Going</span>
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
  const cookieStore = await cookies();

  // Pass cookies in the fetch request
  const res = await fetch(createPath(`/api/events/${eventId}`), {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const { data: event }: { data: Event } = await res.json();

  return (
    <div>
      {/* Banner and Title */}
      <section className="h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
        <img
          src={event.bannerImage?.src}
          alt="Event banner"
          className="object-cover w-full h-full"
        />
      </section>

      <section className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {event.title}
        </h1>
      </section>
      <div className="flex flex-col md:flex-row justify-between gap-8 mb-6">
        <div className="grid grid-cols-1 gap-8">
          {/* Event Details */}
          <Card className="">
            <CardContent className="p-6">
              <EventDetails event={event} />
            </CardContent>
          </Card>
          {/* Host Details */}
          <Card className="">
            <CardContent className="p-6">
              <HostAndGroupDetails />
            </CardContent>
          </Card>
          {/* Going Details */}
          <Card className="">
            <CardContent className="p-6">
              <GoingList />
            </CardContent>
          </Card>
        </div>
        {/* About Section */}
        <section className="mb-8 md:max-w-2xl" aria-labelledby="about-heading">
          <p className="text-foreground">{event.bio?.text}</p>
        </section>
      </div>
      {/* Gallery Section */}
      <section className="mb-8" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className="text-2xl font-semibold mb-4">
          Gallery
        </h2>
        <Gallery images={event.photos} />
      </section>
      {/* Comments Section */}
      {/* <section aria-labelledby="comments-heading">
        <h2 id="comments-heading" className="text-2xl font-semibold mb-4">
          Discussion
        </h2>
        {/* <Comments comments={event.comments} /> 
      </section> */}
      {/* Sticky Join Button */}
      <StickyJoinButton price={20} />
    </div>
  );
};

export default EventPage;
