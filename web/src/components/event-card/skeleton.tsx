"use client";

import { Card } from "@/components/ui/card";

export function EventCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full transition-all duration-300 border-0 dark:bg-primary-900/10 animate-pulse">
      {/* Card container with responsive layout */}
      <div className="lg:block flex h-full">
        {/* Image container with hover effect */}
        <div className="lg:w-full w-1/3 relative overflow-hidden">
          {/* Desktop: aspect-video, Mobile: full height */}
          <div className="lg:aspect-video lg:relative lg:w-full h-full">
            <div className="lg:absolute inset-0 h-full bg-primary-100 dark:bg-primary-800/20" />
          </div>
        </div>

        {/* Content container with improved spacing and typography */}
        <div className="lg:w-full w-2/3 p-5 space-y-4 flex flex-col">
          {/* Date/time with subtle styling */}
          <div className="flex items-center space-x-4">
            <div className="h-4 w-4 rounded-full bg-primary-100 dark:bg-primary-800/30" />
            <div className="h-4 w-20 rounded bg-primary-100 dark:bg-primary-800/30" />
            <div className="h-4 w-4 rounded-full bg-primary-100 dark:bg-primary-800/30" />
            <div className="h-4 w-16 rounded bg-primary-100 dark:bg-primary-800/30" />
          </div>

          {/* Title */}
          <div className="h-6 w-full rounded bg-primary-100 dark:bg-primary-800/30" />

          {/* Location */}
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded-full bg-primary-100 dark:bg-primary-800/30" />
            <div className="h-4 w-32 rounded bg-primary-100 dark:bg-primary-800/30" />
          </div>

          {/* Price and attendees */}
          <div className="flex items-center justify-between pt-2 lg:mt-auto">
            <div className="h-5 w-16 rounded bg-primary-100 dark:bg-primary-800/30" />
            <div className="h-5 w-24 rounded-full bg-primary-100 dark:bg-primary-800/30" />
          </div>

          {/* Button */}
          <div className="w-full h-10 mt-2 hidden lg:block rounded-full bg-primary-100 dark:bg-primary-800/30" />
        </div>
      </div>
    </Card>
  );
}
