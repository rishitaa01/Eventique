// This page handles server-side logic and static generation
import { getEventData } from './yourDataFetchingLogic'; // Import your data fetching logic
import EventPageClient from './EventPageClient';// Import the client-side component

// Static Generation for Dynamic Paths
export async function generateStaticParams() {
  return [
    { event: 'event1' }, // Example dynamic param
    { event: 'event2' }  // Example dynamic param
  ];
}

export default async function EventPage({ params }: { params: { event: string } }) {
  const eventData = await getEventData(params.event); // Fetch data on the server

  return (
    <div>
      <h1>{eventData.name}</h1>
      {/* Pass data to client-side component */}
      <EventPageClient event={eventData} />
    </div>
  );
}
