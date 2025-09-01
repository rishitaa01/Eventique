import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import EventPageClient from "./EventPageClient";
import { getEventData } from "./yourDataFetchingLogic";

// Event type
interface Event {
  id: string;
  name: string;
  details: string;
  image?: string;
}

// ✅ Correct generateMetadata typing (params is NOT a Promise)
export async function generateMetadata(
  { params }: { params: { event: string } },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { event } = params;
  const eventData = await getEventData(event);

  if (!eventData) {
    return {
      title: "Event Not Found | Eventique",
      description: "The event you are looking for does not exist.",
    };
  }

  return {
    title: `${eventData.name} | Eventique`,
    description: eventData.details ?? "Event details and information.",
    openGraph: {
      title: eventData.name,
      description: eventData.details ?? "",
      url: `https://yourdomain.com/events/${event}`,
      siteName: "Eventique",
      images: [
        {
          url: eventData.image ?? "/default-og.png",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: eventData.name,
      description: eventData.details ?? "",
      images: [eventData.image ?? "/default-og.png"],
    },
  };
}

// Optional: pre-generate some routes
export async function generateStaticParams() {
  return [{ event: "event1" }, { event: "event2" }];
}

// ✅ Page component (params is a plain object here too)
export default async function EventPage({
  params,
}: {
  params: { event: string };
}) {
  const eventData = await getEventData(params.event);

  if (!eventData) {
    notFound();
  }

  const eventWithDetails: Event = {
    id: params.event,
    name: eventData.name ?? "Untitled Event",
    details: eventData.details ?? "",
    image: eventData.image,
  };

  return (
    <div>
      <h1>{eventWithDetails.name}</h1>
      <EventPageClient event={eventWithDetails} />
    </div>
  );
}
