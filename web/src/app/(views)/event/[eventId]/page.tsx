export default async function EventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const eventId = (await params).eventId;

  return <h1>Event Page : {eventId}</h1>;
}
