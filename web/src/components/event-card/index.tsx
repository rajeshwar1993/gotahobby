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
    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg border-0 dark:bg-primary-900/10 group">
      {/* Card container with responsive layout */}
      <div className="lg:block flex h-full">
        {/* Image container with hover effect */}
        <div className="lg:w-full w-1/3 relative overflow-hidden">
          {/* Desktop: aspect-video, Mobile: full height */}
          <div className="lg:aspect-video lg:relative lg:w-full h-full">
            <div
              className="lg:absolute inset-0 bg-cover bg-center h-full transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${image})` }}
              aria-hidden="true"
            />
            {status && (
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                  status === "Confirmed" ? "bg-green-500/90" : "bg-amber-500/90"
                } text-white backdrop-blur-sm`}
              >
                {status}
              </span>
            )}
          </div>
        </div>

        {/* Content container with improved spacing and typography */}
        <div className="lg:w-full w-2/3 p-5 space-y-4 flex flex-col">
          {/* Date/time with subtle styling */}
          <div className="flex items-center text-sm text-primary-600 dark:text-primary-300">
            <CalendarDays className="h-4 w-4 mr-2" aria-hidden="true" />
            <span>{date}</span>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4 mr-2" aria-hidden="true" />
            <span>{time}</span>
          </div>

          {/* Title with hover effect */}
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Location with subtle styling */}
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" aria-hidden="true" />
            <span>{location}</span>
          </div>

          {/* Price and attendees with improved styling */}
          <div className="flex items-center justify-between pt-2 lg:mt-auto">
            <span className="font-semibold text-primary-700 dark:text-primary-300">
              {price === "Free" ? "Free" : `$${price}`}
            </span>
            {attendees && (
              <span className="text-sm bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full">
                +{attendees} attending
              </span>
            )}
          </div>

          {/* Button with improved styling */}
          <Button
            className="w-full mt-2 hidden lg:block rounded-full bg-primary-50 hover:bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-800/50"
            variant="outline"
          >
            {action}
          </Button>
        </div>
      </div>
    </Card>
  );
}
