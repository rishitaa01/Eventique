"use client"; // This line is necessary to let Next.js know it should be treated as a client-side component

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type EventData = {
  description: string;
  // Add other event properties here as needed
};

const MyEventPage = () => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const router = useRouter();
  const { event } = router.query; // Grab the event parameter from the URL

  useEffect(() => {
    if (event) {
      // Fetch the event details using the event parameter
      fetch(`/api/events/${event}`) // Assuming you have an API route like this
        .then((response) => response.json())
        .then((data) => setEventData(data))
        .catch((error) => console.error("Error fetching event data:", error));
    }
  }, [event]);

  if (!eventData) {
    return <p>Loading event data...</p>;
  }

  return (
    <div>
      <h1>Event: {event}</h1>
      <p>{eventData.description}</p>
      {/* Display other event details here */}
    </div>
  );
};

export default MyEventPage;
