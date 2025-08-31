import { getEventData } from "./yourDataFetchingLogic"; // adjust path
import EventPageClient from "./EventPageClient";
import { Event } from "@/types/event";  // ✅ shared type

interface PageProps {
  params: {
    event: string;
  };
}

export async function generateStaticParams() {
  return [{ event: "event1" }, { event: "event2" }];
}

export default async function EventPage({ params }: PageProps) {
  const eventData = await getEventData(params.event);

  const eventWithDetails: Event = {
    id: params.event,
    name: eventData?.name ?? "Untitled Event",
    details: eventData?.details ?? "",
  };

  return (
    <div>
      <h1>{eventWithDetails.name}</h1>
      <EventPageClient event={eventWithDetails} /> {/* ✅ matches types */}
    </div>
  );
}
