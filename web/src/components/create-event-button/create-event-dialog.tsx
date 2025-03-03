"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { EventCreateForm } from "./event-create-form";

export function CreateEventDialog({
  children,
  groupId,
}: {
  children: React.ReactNode;
  groupId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <EventCreateForm
          groupId={groupId}
          onSuccess={(eventId) => {
            setOpen(false);
            // We'll implement this later
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
