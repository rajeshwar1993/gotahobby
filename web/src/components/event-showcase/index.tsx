"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import EventCard, { EventCardProps } from "../event-card";
import { Button } from "@/components/ui/button";
import { EventCardSkeleton } from "../event-card/skeleton";

interface EventShowcaseProps {
  title: string;
  endpoint?: string; // API endpoint to fetch events
  events?: EventCardProps[]; // For mock data or server-side fetching
  viewAllLink?: string;
}

export default function EventShowcase({
  title,
  endpoint,
  events: initialEvents,
  viewAllLink = "#",
}: EventShowcaseProps) {
  // For client-side fetching with skeleton loading
  const [events, setEvents] = useState<EventCardProps[] | null>(
    initialEvents || null
  );
  const [loading, setLoading] = useState(!initialEvents && !!endpoint);

  // Fetch events if endpoint is provided and no initial events
  useEffect(() => {
    if (endpoint && !initialEvents) {
      fetchEvents();
    }
  }, [endpoint, initialEvents]);

  async function fetchEvents() {
    try {
      setLoading(true);
      const response = await fetch(endpoint!);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      // Show error state
    } finally {
      setLoading(false);
    }
  }

  // Determine if we need to show "View More" button
  const hasMoreEvents = (events?.length || 0) > 5;
  const displayEvents = events?.slice(0, 5) || [];

  return (
    <section
      className="space-y-6 py-8"
      aria-labelledby={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
    >
      <div className="flex items-center justify-between">
        <h2
          id={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
          className="text-2xl font-semibold"
        >
          {title}
        </h2>
        {hasMoreEvents && (
          <Button variant="link" asChild>
            <Link href={viewAllLink}>View All →</Link>
          </Button>
        )}
      </div>

      {/* Responsive event display */}
      <div className="space-y-6 lg:space-y-0">
        {/* Desktop: Horizontal scrollable gallery */}
        <div className="hidden lg:block overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            {loading
              ? // Skeleton loading state
                Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="w-[300px]">
                      <EventCardSkeleton />
                    </div>
                  ))
              : displayEvents.map((event, index) => (
                  <div className="w-[300px]" key={index}>
                    <EventCard {...event} />
                  </div>
                ))}
          </div>
        </div>

        {/* Mobile: Vertical stack */}
        <div className="block lg:hidden space-y-6">
          {loading
            ? // Skeleton loading state
              Array(3)
                .fill(0)
                .map((_, i) => <EventCardSkeleton key={i} />)
            : displayEvents.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
        </div>
      </div>
    </section>
  );
}
