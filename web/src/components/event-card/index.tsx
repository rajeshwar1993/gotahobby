import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin } from "lucide-react";

interface EventCardProps {
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
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        {status && (
          <span
            className={`absolute top-2 right-2 px-2 py-1 rounded text-sm ${
              status === "Confirmed" ? "bg-green-500" : "bg-yellow-500"
            } text-white`}
          >
            {status}
          </span>
        )}
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{date}</span>
            <Clock className="h-4 w-4 ml-2" />
            <span>{time}</span>
          </div>

          <h3 className="font-semibold text-lg">{title}</h3>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold">
            {price === "Free" ? "Free" : `$${price}`}
          </span>
          {attendees && (
            <span className="text-sm text-muted-foreground">
              +{attendees} attending
            </span>
          )}
        </div>

        <Button
          className="w-full"
          variant={action === "Join Event" ? "default" : "outline"}
        >
          {action}
        </Button>
      </div>
    </Card>
  );
}
