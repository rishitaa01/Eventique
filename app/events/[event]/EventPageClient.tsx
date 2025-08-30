'use client'; // Client-side component

import { useState, useEffect } from 'react';

interface EventPageClientProps {
  event: {
    details: string;
    // Add other event properties here as needed
  };
}

function EventPageClient({ event }: EventPageClientProps) {
  const [eventData, setEventData] = useState(event);

  useEffect(() => {
    // Your client-side logic (if needed)
    console.log('Client-side event data:', eventData);
  }, [eventData]);

  return (
    <div>
      <h2>Event Details: {eventData.details}</h2>
    </div>
  );
}

export default EventPageClient;

