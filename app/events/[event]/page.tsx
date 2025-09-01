// app/Events/[event]/page.tsx

import { getEventData } from './yourDataFetchingLogic';
interface PageProps {
  params: {
    event: string;
  };
}

export default async function Page({ params }: PageProps) {
  const eventId = params.event;

  // Fetch event details using the provided event ID
  const eventDetails = await getEventData(eventId);

  return (
    <main>
      <h1>{eventDetails.name}</h1>
      <p>{eventDetails.details}</p>
    </main>
  );
}
