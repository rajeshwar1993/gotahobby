// components/messages/messages-header.tsx
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MessagesHeaderProps {
  onSearch: (value: string) => void;
  onFilter: (value: string) => void;
}

export function MessagesHeader({ onSearch, onFilter }: MessagesHeaderProps) {
  return (
    <div className="space-y-4 p-4 border-b">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Messages</h1>
        <Select defaultValue="all" onValueChange={onFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Filter messages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="events">Event Related</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Input
        type="search"
        placeholder="Search messages..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
