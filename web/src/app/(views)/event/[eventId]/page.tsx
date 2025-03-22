import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ShareIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gallery } from "@/components/image-gallery";
import { createPath } from "@/utils/url";
import { Event } from "@/types";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Suspense } from "react";

// Define types needed for the components
type AttendeeStatus = "confirmed" | "waiting" | "cancelled" | "applied";

interface Attendee {
  id: string;
  name: string;
  picture?: string;
  registrationDate: string;
  status: AttendeeStatus;
}

// Event Details Component
const EventDetails = ({ event }: { event: Event }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-5">
      <div className="flex items-start gap-2 col-span-4">
        <CalendarIcon className="h-5 w-5 text-muted-foreground mt-1" />
        {!event.timing.tbd ? (
          <div className="flex flex-col">
            <span className="font-semibold">
              {new Date(event.timing.startDate).toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>
              {new Date(event.timing.startDate).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })}{" "}
              to{" "}
              {new Date(event.timing.endDate).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
          </div>
        ) : (
          <span>Date and time to be determined</span>
        )}
      </div>
      <Button variant="ghost" size="sm" className="text-primary">
        <CalendarIcon className="h-4 w-4 mr-2" />
        Add to calendar
      </Button>
    </div>

    <div className="flex items-start gap-2">
      <MapPinIcon className="h-5 w-5 text-muted-foreground mt-1" />
      {/* Handle location display based on event type */}
      {"tbd" in event.location && event.location.tbd ? (
        <span>Location to be determined</span>
      ) : "location" in event.location && event.location.location ? (
        event.location.location.type === "OFFLINE" ? (
          <div className="flex flex-col">
            <span className="font-semibold">
              {event.location.location.details.address}
            </span>
            <span>
              {event.location.location.details.city &&
                `${event.location.location.details.city}, `}
              {event.location.location.details.country}
              {event.location.location.details.postalCode &&
                ` · ${event.location.location.details.postalCode}`}
            </span>
            {event.location.location.details.mapLocationUrl && (
              <a
                href={event.location.location.details.mapLocationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center mt-1"
              >
                <ExternalLinkIcon className="h-3 w-3 mr-1" />
                View on map
              </a>
            )}
          </div>
        ) : event.location.location.type === "ONLINE" ? (
          <div className="flex flex-col">
            <span className="font-semibold">Online Event</span>
            <a
              href={event.location.location.details.conferenceURL}
              className="text-primary hover:underline flex items-center mt-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLinkIcon className="h-3 w-3 mr-1" />
              Join online meeting
            </a>
          </div>
        ) : (
          <span>Location details unavailable</span>
        )
      ) : (
        <span>Location details unavailable</span>
      )}
    </div>
  </div>
);

const HostAndGroupDetails = ({ event }: { event: Event }) => (
  <div className="flex gap-8 justify-between">
    <div className="flex flex-col gap-1">
      <span className="text-semibold text-foreground">Hosts</span>
      <div className="flex gap-2 mt-2">
        {event.host.map((host) => (
          <Avatar key={host.id} title={host.id}>
            <AvatarFallback>
              {host.id.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
    <div className="flex gap-2 items-start">
      <div className="h-16 w-16 rounded-lg overflow-hidden">
        <img
          src={event.bannerImage?.src || "https://picsum.photos/id/34/400/400"}
          alt="Group banner"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="font-semibold">
        {event.groupID ? "Group Name" : "Independent Event"}
      </div>
    </div>
  </div>
);

// Going List Component
const GoingList = ({ attendees }: { attendees: Event["attendies"] }) => (
  <div>
    <span className="text-semibold text-foreground mb-2 block">
      Going ({attendees.length})
    </span>
    <div className="flex flex-wrap gap-2">
      {attendees
        .filter((a) => a.status === "confirmed")
        .slice(0, 8)
        .map((attendee) => (
          <Avatar key={attendee.id} title={attendee.name}>
            {attendee.picture ? (
              <AvatarImage src={attendee.picture} alt={attendee.name} />
            ) : (
              <AvatarFallback>
                {attendee.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        ))}
      {attendees.length > 8 && (
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted">
          <span className="text-xs">+{attendees.length - 8}</span>
        </div>
      )}
    </div>
  </div>
);

// Sticky Join Button Component
const StickyJoinButton = ({ event }: { event: Event }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg z-40">
    <div className="mx-auto max-w-4xl flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold">
          {event.fee
            ? `Price: ${event.fee.currency}${event.fee.amount}`
            : "Free"}
        </span>
        <Button variant="outline" size="icon" aria-label="Share event">
          <ShareIcon className="h-4 w-4" />
        </Button>
      </div>
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

  try {
    // Get cookies from the request
    const cookieStore = await cookies();

    // Pass cookies in the fetch request
    const res = await fetch(createPath(`/api/events/${eventId}`), {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch event: ${res.status}`);
    }

    const { data: event }: { data: Event } = await res.json();

    return (
      <div className="pb-20">
        {/* Banner and Title */}
        <section className="h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
          <img
            src={event.bannerImage?.src}
            alt="Event banner"
            className="object-cover w-full h-full"
          />
        </section>

        <section className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground">
            {event.title}
          </h1>
          {/* TAG SECTION */}
          {/* <div className="flex gap-2 mt-2">
            {event.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-sm"
              >
                {tag.id}
              </span>
            ))}
          </div> */}
        </section>
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-6">
          <div className="grid grid-cols-1 gap-8">
            {/* Event Details */}
            <Card>
              <CardContent className="p-6">
                <EventDetails event={event} />
              </CardContent>
            </Card>
            {/* Host Details */}
            <Card>
              <CardContent className="p-6">
                <HostAndGroupDetails event={event} />
              </CardContent>
            </Card>
            {/* Going Details */}
            <Card>
              <CardContent className="p-6">
                <GoingList attendees={event.attendies} />
              </CardContent>
            </Card>
          </div>
          {/* About Section */}
          <section
            className="mb-8 md:max-w-2xl"
            aria-labelledby="about-heading"
          >
            <h2 id="about-heading" className="text-2xl font-semibold mb-4">
              About
            </h2>
            <p className="text-foreground">{event.bio?.text}</p>
          </section>
        </div>
        {/* Gallery Section */}
        {event.photos.length > 0 && (
          <section className="mb-8" aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" className="text-2xl font-semibold mb-4">
              Gallery
            </h2>
            <Gallery images={event.photos} />
          </section>
        )}
        {/* Comments Section */}
        {/* <section aria-labelledby="comments-heading">
          <h2 id="comments-heading" className="text-2xl font-semibold mb-4">
            Discussion
          </h2>
          <Comments comments={event.discussion} eventId={event.id} />
        </section> */}
        {/* Sticky Join Button */}
        <StickyJoinButton event={event} />
      </div>
    );
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-4">Error Loading Event</h1>
        <p>We couldn't load this event. Please try again later.</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }
};

export default EventPage;
