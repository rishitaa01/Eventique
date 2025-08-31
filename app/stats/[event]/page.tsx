import { getEventData } from "./yourDataFetchingLogic";
import EventPageClient from "./EventPageClient";

interface PageProps {
  params: {
    event: string;
  };
}

export default async function EventPage({ params }: PageProps) {
  // ✅ fetch event data by slug (eventId)
  const eventData = await getEventData(params.event);

  const eventWithDetails = {
    ...eventData,
    details: eventData?.details ?? "",
  };

  return (
    <div>
      <h1>{eventWithDetails.name}</h1>
      <EventPageClient eventId={params.event} />
    </div>
  );
}
