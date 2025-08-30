// app/myevents/page.tsx
'use client';
// In the app/myevents/page.tsx file

// In the app/myevents/page.tsx file

import { useEffect, useState } from 'react';

const MyEventPage = () => {
  const [event, setEvent] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the event dynamically
    const fetchEventData = async () => {
      const res = await fetch('/api/event'); // Example: fetch your event data from an API route
      const data = await res.json();
      setEvent(data.event); // Assuming the response contains the event
    };

    fetchEventData();
  }, []);

  return (
    <div>
      <h1>Event: {event}</h1>
      {/* Render your event data here */}
    </div>
  );
};

export default MyEventPage;
