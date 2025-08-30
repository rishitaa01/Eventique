import { getEventData } from './yourDataFetchingLogic';
import EventPageClient from './EventPageClient';

// Static Generation for Dynamic Paths
export async function generateStaticParams() {
  return [{ event: 'event1' }, { event: 'event2' }];
}

export default async function EventPage({
  params,
}: {
  params: { event: string };
}) {
  const eventData = await getEventData(params.event);

  const eventWithDetails = {
    ...eventData,
    details: eventData.details ?? '',
  };

  return (
    <div>
      <h1>{eventWithDetails.name}</h1>
      <EventPageClient event={eventWithDetails} />
    </div>
  );
}
