import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin } from "lucide-react";

export interface EventCardProps {
  image: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string | number;
  attendees?: number;
  status?: "Confirmed" | "Pending";
  action?: "Join Event" | "View Details";
}

export default function EventCard({
  image,
  title,
  date,
  time,
  location,
  price,
  attendees,
  status,
  action = "View Details",
}: EventCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {/* Card container with responsive layout */}
      <div className="lg:block flex h-full">
        {/* Image container - full width on desktop, 1/3 width on mobile */}
        <div className="lg:w-full w-1/3 relative">
          {/* Desktop: aspect-video, Mobile: full height */}
          <div className="lg:aspect-video lg:relative lg:w-full h-full">
            <div
              className="lg:absolute inset-0 bg-cover bg-center h-full"
              style={{ backgroundImage: `url(${image})` }}
              aria-hidden="true"
            />
            {status && (
              <span
                className={`absolute top-2 right-2 px-2 py-1 rounded text-xs lg:text-sm ${
                  status === "Confirmed" ? "bg-green-500" : "bg-yellow-500"
                } text-white`}
              >
                {status}
              </span>
            )}
          </div>
        </div>

        {/* Content container - full width on desktop, 2/3 width on mobile */}
        <div className="lg:w-full w-2/3 p-4 space-y-3 lg:space-y-4 flex flex-col">
          {/* Date/time info */}
          <div className="flex items-center space-x-2 text-xs lg:text-sm text-muted-foreground">
            <CalendarDays
              className="h-3 w-3 lg:h-4 lg:w-4"
              aria-hidden="true"
            />
            <span>{date}</span>
            <Clock
              className="h-3 w-3 lg:h-4 lg:w-4 ml-1 lg:ml-2"
              aria-hidden="true"
            />
            <span>{time}</span>
          </div>

          {/* Title - different size based on viewport */}
          <h3 className="font-semibold text-base lg:text-lg">{title}</h3>

          {/* Location */}
          <div className="flex items-center space-x-2 text-xs lg:text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 lg:h-4 lg:w-4" aria-hidden="true" />
            <span>{location}</span>
          </div>

          {/* Price and attendees - pushed to bottom on desktop */}
          <div className="flex items-center justify-between lg:mt-auto">
            <span className="font-semibold text-sm lg:text-base">
              {price === "Free" ? "Free" : `$${price}`}
            </span>
            {attendees && (
              <span className="text-xs lg:text-sm text-muted-foreground">
                +{attendees} attending
              </span>
            )}
          </div>

          {/* Button - only shown on desktop */}
          <Button
            className="w-full mt-2 hidden lg:block"
            variant={action === "Join Event" ? "default" : "outline"}
          >
            {action}
          </Button>
        </div>
      </div>
    </Card>
  );
}
