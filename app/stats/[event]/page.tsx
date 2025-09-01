import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import EventPageClient from "./EventPageClient";
import { getEventData } from "./yourDataFetchingLogic";

// Shape of Event
interface Event {
  id: string;
  name: string;
  details: string;
}

// ✅ Next.js 15: params is a Promise in generateMetadata
export async function generateMetadata(
  { params }: { params: Promise<{ event: string }> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { event } = await params;              // <-- await the params
  const eventData = await getEventData(event);

  if (!eventData) {
    return {
      title: "Event Not Found | My App",
      description: "The event you are looking for does not exist.",
    };
  }

  return {
    title: `${eventData.name} | My App`,
    description: eventData.details ?? "Event details and information.",
    openGraph: {
      title: eventData.name,
      description: eventData.details ?? "",
      url: `https://yourdomain.com/events/${event}`,
      siteName: "My App",
      images: [
        {
          url: eventData.image ?? "/logo-png.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: eventData.name,
      description: eventData.details ?? "",
      images: [eventData.image ?? "/logo-png.png"],
    },
  };
}

// (Optional) pre-generate some routes
export async function generateStaticParams() {
  return [{ event: "event1" }, { event: "event2" }];
}

// Page component: params is still a plain object here
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
  };

  return (
    <div>
      <h1>{eventWithDetails.name}</h1>
      <EventPageClient event={eventWithDetails} />
    </div>
  );
}
