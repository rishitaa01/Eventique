// In: app/events/[event]/page.tsx

import { notFound } from 'next/navigation';
import { getEventData } from './yourDataFetchingLogic'; // Make sure this path is correct
import EventPageClient from './EventPageClient'; // Make sure this path is correct

// Define the type for your page's props. This is best practice.
type Props = {
  params: {
    event: string;
  };
};

// This function helps Next.js know which pages to pre-build
export async function generateStaticParams() {
  // Replace this with your actual logic to get all event IDs
  const events = [{ event: 'event1' }, { event: 'event2' }];
  return events;
}

// Your main page component
export default async function EventPage({ params }: Props) {
  // Fetch data for the specific event using the ID from the URL
  const eventData = await getEventData(params.event);

  // If no data is found for the event, show a 404 page
  if (!eventData) {
    notFound();
  }

  // Ensure the 'details' property exists, even if it's an empty string
  const eventWithDetails = {
    id: params.event,
    ...eventData,
    details: eventData.details ?? '',
  };

  return (
    <div>
      <h1>{eventWithDetails.name}</h1>
      
      {/* The props you pass here MUST match what EventPageClient expects.
        The error could be in the EventPageClient.tsx file.
      */}
      <EventPageClient event={eventWithDetails} />
    </div>
  );
}