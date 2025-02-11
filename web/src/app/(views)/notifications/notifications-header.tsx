// components/messages/messages-header.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NotificationsHeaderProps {}

export function NotificationsHeader({}: NotificationsHeaderProps) {
  return (
    <div className="space-y-4 p-4 border-b w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <Button variant="ghost" size="sm" onClick={() => {}}>
          Mark all as read
        </Button>
      </div>
    </div>
  );
}
