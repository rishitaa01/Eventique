import EventPageClient from './EventPageClient';

export default function EventPage({
  params,
}: {
  params: { event: string };
}) {
  return <EventPageClient eventId={params.event} />;
}
