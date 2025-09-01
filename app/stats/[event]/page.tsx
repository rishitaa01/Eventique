import EventPageClient from "./EventPageClient";
import { AppwriteConfig } from "@/constants/appwrite_config";

interface PageProps {
  params: { event: string };
}

// Next.js page
export default async function EventPage({ params }: PageProps) {
  const { event } = params;

  const appwrite = new AppwriteConfig();

  // fetch event details
  const eventDoc = await appwrite.databases.getDocument(
    process.env.NEXT_PUBLIC_EVENTDB!,
    process.env.NEXT_PUBLIC_EVENTCOLLECTION!,
    event
  );

  const eventWithDetails = {
    id: eventDoc.$id,
    name: (eventDoc as any).name,
    details: (eventDoc as any).details,
  };

  return (
    <div>
      <EventPageClient event={eventWithDetails} />
    </div>
  );
}
