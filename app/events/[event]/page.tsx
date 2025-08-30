'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import React from 'react';

interface EventProps {
  params: {
    event: string;
  };
}

interface EventData {
  name: string;
  description: string;
  // Add other fields as needed
}

const EventPage: React.FC<EventProps> = ({ params }) => {
  const [eventData, setEventData] = useState<EventData | null>(null);

  useEffect(() => {
    // Use the event param from URL
    const eventId = params.event;

    // Make an API call or perform any other logic here
    fetch(`/api/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => setEventData(data))
      .catch((error) => console.error('Error fetching event:', error));
  }, [params.event]);

  if (!eventData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Event: {eventData.name}</h1>
      <p>{eventData.description}</p>
    </div>
  );
};

// Use Next.js dynamic routes for params in the app directory
export async function generateStaticParams() {
  // You can fetch your dynamic routes here and return them
  return [
    { event: 'event1' }, // Example dynamic param
    { event: 'event2' }, // Example dynamic param
  ];
}

export default EventPage;
