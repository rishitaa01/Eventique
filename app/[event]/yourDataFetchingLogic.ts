export async function getEventData(event: string) {
  // Replace this with your actual data fetching logic
  const mockEvents: Record<
    string,
    {
      details: string;
      name: string;
    }
  > = {
    event1: {
      name: 'Event One',
      details: '',
    },
    event2: {
      name: 'Event Two',
      details: '',
    },
  };
  return mockEvents[event] || { name: 'Unknown Event' };
}
