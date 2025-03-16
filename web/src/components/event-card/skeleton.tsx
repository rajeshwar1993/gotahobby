"use client";

export function EventCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden animate-pulse">
      <div className="lg:block flex">
        {/* Image skeleton - full width on desktop, 1/3 width on mobile */}
        <div className="lg:w-full w-1/3">
          <div className="lg:aspect-video h-full bg-muted" />
        </div>

        {/* Content skeleton - full width on desktop, 2/3 width on mobile */}
        <div className="lg:w-full w-2/3 p-4 space-y-4">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-6 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="flex justify-between pt-4">
            <div className="h-5 bg-muted rounded w-1/4" />
            <div className="h-5 bg-muted rounded w-1/4" />
          </div>
          <div className="h-9 bg-muted rounded w-full mt-2 hidden lg:block" />
        </div>
      </div>
    </div>
  );
}
