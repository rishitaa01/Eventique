'use client';  // Marks this as a Client Component

import { useEffect, useState } from 'react';

const EventPage = () => {
  const [event, setEvent] = useState<string | null>(null); // Store event data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const res = await fetch('/api/event'); // API endpoint
        if (!res.ok) {
          throw new Error('Failed to fetch event data');
        }
        const data = await res.json();
        setEvent(data.event);  // Assuming 'event' is the key holding the event data
      } catch (err) {
        setError('Error fetching event data');
      } finally {
        setLoading(false);  // Stop loading
      }
    };

    fetchEventData();
  }, []); // Empty dependency array ensures it only runs on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Event: {event}</h1>
      {/* Render more event details */}
    </div>
  );
};

export default EventPage;
