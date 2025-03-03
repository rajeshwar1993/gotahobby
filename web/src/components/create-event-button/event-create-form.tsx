"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

// Define the form schema with Zod
const eventCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  groupId: z.string().uuid("Invalid group ID"),
});

type EventCreateFormValues = z.infer<typeof eventCreateSchema>;

interface EventCreateFormProps {
  groupId: string;
  onSuccess: (eventId: string) => void;
}

export function EventCreateForm({ groupId, onSuccess }: EventCreateFormProps) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<EventCreateFormValues>({
    resolver: zodResolver(eventCreateSchema),
    defaultValues: {
      title: "",
      groupId,
    },
  });

  const onSubmit = async (data: EventCreateFormValues) => {
    try {
      setError(null);
      const response = await fetch("/api/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create event");
      }

      const result = await response.json();

      if (result.data && result.data.id) {
        onSuccess(result.data.id);
        router.push(`/events/edit/${result.data.id}`);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while creating the event"
      );
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          placeholder="Enter event title"
          {...form.register("title")}
        />
        {form.formState.errors.title && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.title.message}
          </p>
        )}
      </div>

      <input type="hidden" {...form.register("groupId")} />

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Event"
          )}
        </Button>
      </div>
    </form>
  );
}
