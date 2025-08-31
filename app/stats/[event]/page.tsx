import EventPageClient from './EventPageClient';

interface PageProps {
  params: { event: string };
}

export default function EventPage({ params }: PageProps) {
  return <EventPageClient eventId={params.event} />;
}
