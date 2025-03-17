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
      className="space-y-8 py-12"
      aria-labelledby={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
    >
      <div className="flex items-center justify-between">
        <h2
          id={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
          className="text-2xl font-bold text-foreground relative"
        >
          {title}
          <span className="absolute -bottom-2 left-0 w-16 h-1 bg-primary rounded-full"></span>
        </h2>
        {hasMoreEvents && (
          <Button
            variant="link"
            asChild
            className="text-primary hover:text-primary-700 dark:hover:text-primary-300"
          >
            <Link href={viewAllLink}>
              View All <span aria-hidden="true">→</span>
            </Link>
          </Button>
        )}
      </div>

      {/* Responsive event display */}
      <div className="space-y-6 lg:space-y-0">
        {/* Desktop: Improved horizontal scrollable gallery */}
        <div className="hidden lg:block overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-6 min-w-max">
            {loading
              ? // Skeleton loading state
                Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="w-[320px]">
                      <EventCardSkeleton />
                    </div>
                  ))
              : displayEvents.map((event, index) => (
                  <div
                    className="w-[320px] transition-all hover:-translate-y-1 duration-300"
                    key={index}
                  >
                    <EventCard {...event} />
                  </div>
                ))}
          </div>
        </div>

        {/* Mobile: Improved vertical stack */}
        <div className="block lg:hidden space-y-6">
          {loading
            ? // Skeleton loading state
              Array(3)
                .fill(0)
                .map((_, i) => <EventCardSkeleton key={i} />)
            : displayEvents.map((event, index) => (
                <div
                  className="transition-all hover:-translate-y-1 duration-300"
                  key={index}
                >
                  <EventCard key={index} {...event} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
