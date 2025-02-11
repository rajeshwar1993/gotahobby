"use client";

import { useState } from "react";
import { NotificationItem } from "./notification-item";
import { NotificationsFilter } from "./notifications-filter";
import { Button } from "@/components/ui/button";
import type { Notification } from "@/types";
import { NotificationsHeader } from "./notifications-header";

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "event_reminder",
    title: "Photography Workshop starts in 2 hours",
    message:
      "Don't forget to bring your camera and any additional equipment you might need.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    read: false,
    actionUrl: "/events/photography-workshop",
  },
  {
    id: "2",
    type: "new_attendee",
    title: "New attendee for Cooking Class",
    message: "Sarah Wilson has signed up for your Italian Cooking Masterclass",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: true,
    actionUrl: "/events/cooking-class",
  },
  {
    id: "3",
    type: "event_update",
    title: "Venue change for Yoga Session",
    message:
      "The venue has been changed to Central Park due to weather conditions",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    read: false,
    actionUrl: "/events/yoga-session",
  },
  {
    id: "4",
    type: "message",
    title: "New message from event organizer",
    message:
      "Hi! Just wanted to confirm if you're still coming to tomorrow's workshop?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: true,
  },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState("");
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const filteredNotifications = filter
    ? notifications.filter((n) => n.type === filter)
    : notifications;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-12">
      <NotificationsHeader />

      <div className="space-y-2">
        {filteredNotifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No notifications found
          </div>
        )}
      </div>
    </div>
  );
}
