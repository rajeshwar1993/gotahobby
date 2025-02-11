// app/messages/page.tsx
"use client";

import { useState } from "react";
import { MessageListItem } from "./message-list-item";
import { MessagesHeader } from "./messages-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "@/types/messages";

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    senderId: "user1",
    senderName: "Alice Johnson",
    senderAvatar: "/api/placeholder/32/32",
    lastMessage:
      "Looking forward to seeing you at the photography workshop tomorrow!",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    unread: true,
    eventTitle: "Photography Workshop",
    online: true,
  },
  {
    id: "2",
    senderId: "user2",
    senderName: "Bob Smith",
    lastMessage: "Can you share more details about the equipment needed?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    unread: true,
    eventTitle: "Photography Workshop",
  },
  {
    id: "3",
    senderId: "user3",
    senderName: "Carol White",
    senderAvatar: "/api/placeholder/32/32",
    lastMessage: "Thanks for the quick response!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    unread: false,
    online: true,
  },
  {
    id: "4",
    senderId: "user4",
    senderName: "David Brown",
    lastMessage: "See you at the cooking class next week!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    unread: false,
    eventTitle: "Cooking Masterclass",
  },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredMessages = messages
    .filter((message) => {
      const matchesSearch =
        message.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

      switch (filter) {
        case "unread":
          return matchesSearch && message.unread;
        case "events":
          return matchesSearch && message.eventTitle;
        default:
          return matchesSearch;
      }
    })
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)]">
      <MessagesHeader onSearch={setSearchQuery} onFilter={setFilter} />

      <ScrollArea className="flex-1">
        <div className="divide-y">
          {filteredMessages.map((message) => (
            <MessageListItem key={message.id} message={message} />
          ))}

          {filteredMessages.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No messages found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
