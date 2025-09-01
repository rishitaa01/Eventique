// app/events/[event]/page.tsx
import EventPageClient from "./EventPageClient";

// Keep the same shape in both files
type Event = {
  id: string;
  name: string;
  details: string;
};

// Replace this with your real data fetch (Appwrite, etc.)
async function getEventData(eventId: string): Promise<Partial<Event>> {
  // Example only so the build succeeds even without your backend ready
  return { name: eventId.replace(/-/g, " "), details: "" };
}

export default async function Page({
  params,
}: {
  params: { event: string };
}) {
  // fetch event data on the server
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

// Optional: only if you want SSG. Otherwise you can remove this.
export async function generateStaticParams() {
  return [];
}
