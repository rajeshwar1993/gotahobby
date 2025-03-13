"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Event } from "@/types/event";

// Define the form schema with Zod
const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  bio: z
    .object({
      text: z.string().optional(),
    })
    .optional(),
  capacity: z.number().int().nonnegative().optional(),
  isPublic: z.boolean().optional(),
  fee: z
    .object({
      amount: z.number().nonnegative(),
      currency: z.string().default("USD"),
    })
    .optional(),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

interface EventFormProps {
  eventId?: string;
  initialData?: Partial<Event>;
  onSuccess: (eventId: string) => void;
}

export function EventForm({ eventId, initialData, onSuccess }: EventFormProps) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      bio: initialData?.bio || { text: "" },
      capacity: initialData?.capacity || 0,
      isPublic: initialData?.isPublic || true,
      fee: initialData?.fee || { amount: 0, currency: "USD" },
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    try {
      setError(null);
      const response = await fetch(
        eventId ? `/api/events/${eventId}` : "/api/events/create",
        {
          method: eventId ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save event");
      }

      const result = await response.json();

      if (result.data && (result.data.id || eventId)) {
        onSuccess(result.data.id || eventId);
        router.push(`/events/${result.data.id || eventId}`);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while saving the event"
      );
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
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

            <div className="space-y-2">
              <Label htmlFor="bio">Description</Label>
              <Textarea
                id="bio"
                placeholder="Enter event description"
                {...form.register("bio.text")}
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="0"
                  placeholder="Maximum number of attendees"
                  {...form.register("capacity", { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fee">Fee (USD)</Label>
                <Input
                  id="fee"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  {...form.register("fee.amount", { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPublic"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                {...form.register("isPublic")}
              />
              <Label htmlFor="isPublic">Make this event public</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Event"
          )}
        </Button>
      </div>
    </form>
  );
}
