const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";


export async function getEventData(eventId: string) {
  try {
    const res = await fetch(`${baseUrl}/api/events/${eventId}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch event data");

    return await res.json();
  } catch (err) {
    console.error("Error in getEventData:", err);
    return { name: "Unknown Event", details: "Could not load event." };
  }
}
