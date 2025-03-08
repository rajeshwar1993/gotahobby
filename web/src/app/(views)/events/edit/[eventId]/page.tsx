import { EventForm } from "@/components/event-form";
import { createPath } from "@/utils/url";

export default async function EditEventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const eventId = (await params).eventId;

  const response = await fetch(createPath(`/api/events/${eventId}`));
  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  const result = await response.json();

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Event</h1>
        {/* <Button
          onClick={() => router.push(`/events/${eventId}`)}
          variant="outline"
        >
          Preview
        </Button> */}
      </div>

      <EventForm
        eventId={eventId}
        initialData={result.data || undefined}
        onSuccess={(eventId) => {
          console.log("Success");
        }}
      />
    </div>
  );
}
