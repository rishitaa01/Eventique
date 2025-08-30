// app/stats/[event]/page.tsx

'use client';  // Make sure it's a client component

import { useEffect, useState } from 'react';

// Define the type for the PageProps
type PageProps = {
  params: {
    event: string;  // Assuming 'event' is a dynamic part of your URL
  };
};

const EventPage = ({ params }: PageProps) => {
  const [event, setEvent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch event data when the page is rendered
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // Make an API call or fetch event data
        const res = await fetch(`/api/event/${params.event}`);
        if (!res.ok) {
          throw new Error('Failed to fetch event data');
        }
        const data = await res.json();
        setEvent(data.event);  // Assuming the response has an 'event' field
      } catch (err) {
        setError('Error fetching event data');
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [params.event]);  // Re-run when the 'event' parameter changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Event: {event}</h1>
      {/* Render additional event details here */}
    </div>
  );
};

export default EventPage;
