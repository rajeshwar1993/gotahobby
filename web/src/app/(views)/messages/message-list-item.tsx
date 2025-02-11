// components/messages/message-list-item.tsx
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Message } from "@/types/messages";

export function MessageListItem({ message }: { message: Message }) {
  const initials = message.senderName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="relative">
        <Avatar>
          <AvatarImage src={message.senderAvatar} alt={message.senderName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        {message.online && (
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-medium truncate">{message.senderName}</p>
          <p className="text-xs text-muted-foreground whitespace-nowrap">
            {format(new Date(message.timestamp), "MMM d, h:mm a")}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 mt-1">
          <p className="text-sm text-muted-foreground truncate">
            {message.lastMessage}
          </p>
          {message.unread && (
            <Badge variant="default" className="rounded-full w-2 h-2 p-0" />
          )}
        </div>

        {message.eventTitle && (
          <p className="text-xs text-primary mt-1">Re: {message.eventTitle}</p>
        )}
      </div>
    </div>
  );
}
