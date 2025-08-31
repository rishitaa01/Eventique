// app/events/[event]/page.tsx
import { notFound } from "next/navigation";
import EventPageClient from "./EventPageClient";
import { getEventData } from "./yourDataFetchingLogic"; // adjust import if needed

// Define props for this dynamic route
type Props = {
  params: {
    event: string;
  };
};

// Define the shape of Event
interface Event {
  id: string;
  name: string;
  details: string;
}

// Optional: if you want static generation
export async function generateStaticParams() {
  return [{ event: "event1" }, { event: "event2" }];
}

// The page component
export default async function EventPage({ params }: Props) {
  // Fetch event data using event id
  const eventData = await getEventData(params.event);

  if (!eventData) {
    notFound();
  }

  const eventWithDetails: Event = {
    id: params.event,
    name: eventData.name ?? "Untitled Event",
    details: eventData.details ?? "",
  };

  return (
    <div>
      <h1>{eventWithDetails.name}</h1>
      <EventPageClient event={eventWithDetails} />
    </div>
  );
}
