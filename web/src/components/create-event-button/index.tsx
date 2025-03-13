"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { CreateEventDialog } from "./create-event-dialog";

interface CreateEventButtonProps {
  groupId: string;
}

export function CreateEventButton({ groupId }: CreateEventButtonProps) {
  return (
    <CreateEventDialog groupId={groupId}>
      <Button>
        <PlusIcon className="mr-2 h-4 w-4" />
        Create New Event
      </Button>
    </CreateEventDialog>
  );
}
