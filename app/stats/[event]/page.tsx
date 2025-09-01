import EventPageClient from "./EventPageClient";

type Event = {
  id: string;
  name: string;
  details: string;
};

async function getEventData(eventId: string): Promise<Partial<Event>> {
  return {
    name: eventId.replace(/-/g, " "),
    details: "Sample event details",
  };
}

// ✅ Notice: no PageProps, no async props typing nonsense
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

export async function generateStaticParams() {
  return []; // or fetch from Appwrite
}
