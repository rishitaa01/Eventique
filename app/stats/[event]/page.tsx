import EventPageClient from "./EventPageClient";

// ✅ Type for dynamic route params
interface PageProps {
  params: {
    event: string;
  };
}

export default async function EventPage({ params }: PageProps) {
  const { event } = params;

  // Simulate fetching event data
  const eventWithDetails = {
    id: event,
    name: "Sample Event",
    details: "This is a placeholder event description.",
  };

  return (
    <div>
      <h1>{eventWithDetails.name}</h1>
      <EventPageClient event={eventWithDetails} />
    </div>
  );
}
