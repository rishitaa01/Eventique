export async function getEventData(event: string) {
  // Replace this with your actual data fetching logic
  const mockEvents: Record<
    string,
    {
      image: string;
      details: string;
      name: string;
      
    }
  > = {
    event1: {
      name: 'Event One',
      details: '',
      image: "logo-png.png"
    },
    event2: {
      name: 'Event Two',
      details: '',
      image: "logo-png.png"
    },
  };
  return mockEvents[event] || { name: 'Unknown Event' };
}
