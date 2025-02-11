import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

interface NotificationsFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export function NotificationsFilter({
  selectedFilter,
  onFilterChange,
}: NotificationsFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          {selectedFilter || "All Notifications"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onFilterChange("")}>
          All Notifications
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange("event_reminder")}>
          Event Reminders
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange("new_attendee")}>
          New Attendees
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange("event_update")}>
          Event Updates
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange("message")}>
          Messages
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
