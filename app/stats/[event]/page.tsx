import { FC } from "react";

interface EventPageProps {
  params: {
    event: string;
  };
}

const EventPage: FC<EventPageProps> = ({ params }) => {
  const { event } = params;

  return (
    <div>
      <h1>Event: {event}</h1>
    </div>
  );
};

export default EventPage;
