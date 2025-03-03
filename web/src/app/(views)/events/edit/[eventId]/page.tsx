"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EventForm } from "@/components/event-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Event } from "@/types/event";

export default function EditEventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/events/${params.eventId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }

        const result = await response.json();

        if (result.data) {
          setEvent(result.data);
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setError(err instanceof Error ? err.message : "Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.eventId]);

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Event</h1>
        <Button
          onClick={() => router.push(`/events/${params.eventId}`)}
          variant="outline"
        >
          Preview
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <Card>
          <CardContent className="pt-6">
            <div className="bg-red-50 text-red-500 p-4 rounded-md">
              <p>{error}</p>
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="mt-4"
              >
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <EventForm
          eventId={params.eventId}
          initialData={event || undefined}
          onSuccess={(eventId) => {
            router.push(`/events/${eventId}`);
          }}
        />
      )}
    </div>
  );
}
