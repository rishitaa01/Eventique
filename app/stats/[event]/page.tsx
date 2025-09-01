import { notFound } from "next/navigation";
import type { Metadata } from "next";
import EventPageClient from "./EventPageClient";
import { getEventData } from "./yourDataFetchingLogic"; // adjust path

// Props for this dynamic route
type Props = {
  params: { event: string };
};

// Define the shape of Event
interface Event {
  id: string;
  name: string;
  details: string;
}

// ✅ Generate metadata dynamically based on event
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const eventData = await getEventData(params.event);

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
      url: `https://yourdomain.com/events/${params.event}`,
      siteName: "My App",
      images: [
        {
          url: "/logo-tranparent-png.png", // ✅ replace with event-specific image if available
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
      images: ["/logo-transparent-png.png"],
    },
  };
}

// Optional: static generation
export async function generateStaticParams() {
  return [
    { event: "event1" },
    { event: "event2" },
  ];
}

// Page component
export default async function EventPage({ params }: Props) {
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
