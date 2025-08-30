'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function EventPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams?.get('id');
  const slug = searchParams?.get('slug');

  type EventType = {
    title: string;
    description: string;
    // Add more fields as needed
  };

  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id || !slug) {
      setError('Missing event ID or slug');
      setLoading(false);
      return;
    }

    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events?id=${id}&slug=${slug}`);
        if (!res.ok) throw new Error('Failed to fetch event');
        const data = await res.json();
        setEvent(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, slug]);

  if (loading) return <p>Loading event...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>No event found.</p>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      {/* Add more event details here */}
    </div>
  );
}
