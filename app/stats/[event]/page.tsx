import EventPageClient from "./EventPageClient";

interface PageProps {
  params: {
    event: string; // ✅ This must match your folder name [event]
  };
}

// ⬇️ Notice: no async/await issues here
export default async function EventPage({ params }: PageProps) {
  // Fetch event data here (dummy example for now)
  const eventWithDetails = {
    id: params.event,
    name: `Event: ${params.event}`,
    details: "This is a placeholder until we fetch from Appwrite",
  };

  return (
    <div>
      <h1>{eventWithDetails.name}</h1>
      <EventPageClient event={eventWithDetails} />
    </div>
  );
}
