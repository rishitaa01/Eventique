import EventPageClient from "./EventPageClient";

// Define the shape of your event data
type Event = {
  id: string;
  name: string;
  details: string;
};

// Replace with your actual Appwrite fetch
async function getEventData(eventId: string): Promise<Partial<Event>> {
  return {
    name: eventId.replace(/-/g, " "),
    details: "Sample event details",
  };
}

// ✅ Page component — params typed inline, no PageProps
export default async function Page({ params }: { params: { event: string } }) {
  const data = await getEventData(params.event);

  const eventWithDetails: Event = {
    id: params.event,
    name: data.name ?? "Untitled Event",
    details: data.details ?? "",
  };

  return (
    <div>
      <h1>{eventWithDetails.name}</h1>
      <EventPageClient event={eventWithDetails} />
    </div>
  );
}

// ✅ Optional if you want static params, otherwise delete
export async function generateStaticParams() {
  return [];
}
