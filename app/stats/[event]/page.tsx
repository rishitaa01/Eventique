import EventPageClient, { Event } from "./EventPageClient";
import { AppwriteConfig } from "@/constants/appwrite_config";

// Define the props Next.js gives us for dynamic routes
interface PageProps {
  params: {
    event: string; // event = document/collection id
  };
}

// Fetch event details from Appwrite
async function getEventData(eventId: string): Promise<Event> {
  const cfg = new AppwriteConfig();

  try {
    const doc = await cfg.databases.getDocument(
      process.env.NEXT_PUBLIC_EVENTDB!,          // Database ID
      process.env.NEXT_PUBLIC_EVENTCOLLECTION!,  // Collection ID
      eventId                                    // Document ID (from URL param)
    );

    return {
      id: doc.$id,
      name: (doc as any).name ?? "Untitled Event",
      details: (doc as any).details ?? "No details provided",
    };
  } catch (err) {
    console.error("Error fetching event:", err);

    // fallback event if fetch fails
    return {
      id: eventId,
      name: "Event not found",
      details: "Could not fetch event details.",
    };
  }
}

export default async function EventPage({ params }: PageProps) {
  const eventData = await getEventData(params.event);

  return (
    <div className="p-6">
      <EventPageClient event={eventData} />
    </div>
  );
}
