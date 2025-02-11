// components/notifications/notification-item.tsx
import { Calendar, MessageSquare, Users, Bell, Info } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Notification } from "@/types";

const iconMap = {
  event_reminder: Calendar,
  new_attendee: Users,
  event_update: Info,
  message: MessageSquare,
  system: Bell,
};

export function NotificationItem({
  notification,
}: {
  notification: Notification;
}) {
  const Icon = iconMap[notification.type];

  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4 rounded-lg transition-colors",
        notification.read ? "bg-background" : "bg-muted/50"
      )}
    >
      <div
        className={cn(
          "rounded-full p-2",
          notification.read ? "bg-muted" : "bg-primary/10"
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5",
            notification.read ? "text-muted-foreground" : "text-primary"
          )}
        />
      </div>

      <div className="flex-1 space-y-1">
        <p className="font-medium leading-none">{notification.title}</p>
        <p className="text-sm text-muted-foreground">{notification.message}</p>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(notification.timestamp), {
            addSuffix: true,
          })}
        </p>

        {notification.actionUrl && (
          <Button variant="link" className="px-0 h-auto font-normal" asChild>
            <a href={notification.actionUrl}>View Details</a>
          </Button>
        )}
      </div>
    </div>
  );
}
