import { getEventData } from "./yourDataFetchingLogic"; // adjust path if needed
import EventPageClient from "./EventPageClient";

// ✅ Props for Next.js dynamic routes
interface PageProps {
  params: {
    event: string; // dynamic segment from [event]
  };
}

// ✅ Static params for prerendering (optional, if you want SSG)
export async function generateStaticParams() {
  return [{ event: "event1" }, { event: "event2" }];
}

// ✅ Page component
export default async function EventPage({ params }: PageProps) {
  // fetch data for this event
  const eventData = await getEventData(params.event);

  // shape into Event type
  const eventWithDetails = {
    id: params.event,
    name: eventData?.name ?? "Untitled Event",
    details: eventData?.details ?? "",
  };

  return (
    <div>
      <h1>{eventWithDetails.name}</h1>
      <EventPageClient event={eventWithDetails} />
    </div>
  );
}
