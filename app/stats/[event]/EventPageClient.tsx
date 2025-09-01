'use client';

import { useEffect, useState } from 'react';
import { Models } from 'appwrite'; // only needed if you want Appwrite typing
import { appwrite } from '@/constants/appwrite_config'; // gives you account, databases, etc.

interface EventData {
  $id?: string;
  name?: string;
  description?: string;
  details?: string;
  createdAt?: string;
  [key: string]: any; // allow extra fields from Appwrite
}

export default function EventPageClient({ event }: { event: EventData }) {
  const [eventData, setEventData] = useState<EventData>(event);

  // Example: fetch fresh event data from Appwrite (optional)
  useEffect(() => {
    async function fetchEvent() {
      try {
        if (!eventData.$id) return;
        const res = await appwrite.databases.getDocument(
          appwrite.databaseId,
          appwrite.activeCollId,
          eventData.$id
        );
        setEventData(res as unknown as EventData);
      } catch (err) {
        console.error('Error fetching event:', err);
      }
    }
    fetchEvent();
  }, [eventData.$id]);

  return (
    <div>
      <h2>{eventData.name ?? 'Untitled Event'}</h2>
      <p>{eventData.description ?? 'No description available'}</p>
      {eventData.details && <p>{eventData.details}</p>}
      {eventData.createdAt && <small>Created: {eventData.createdAt}</small>}
    </div>
  );
}
