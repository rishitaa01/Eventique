import EventPageClient from "./EventPageClient";

interface EventPageProps {
  params: {
    event: string;
  };
}

export default function EventPage({ params }: EventPageProps) {
  const { event } = params;

  return <EventPageClient eventId={event} />;
}
