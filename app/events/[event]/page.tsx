// app/stats/[event]/page.tsx
'use client';  // Mark this as a Client Component

import { useEffect, useState } from 'react';

// Define the correct type for the `params`
type PageProps = {
  params: {
    event: string;  // or whatever the expected param is
  };
};

const EventPage = ({ params }: PageProps) => {
  const [event, setEvent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // Use the dynamic `event` from params
        const res = await fetch(`/api/event/${params.event}`);
        if (!res.ok) {
          throw new Error('Failed to fetch event data');
        }
        const data = await res.json();
        setEvent(data.event);  // Assuming the API returns an event field
      } catch (err) {
        setError('Error fetching event data');
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [params.event]);  // Depend on the event param

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Event: {event}</h1>
      {/* Render other event details */}
    </div>
  );
};

export default EventPage;
