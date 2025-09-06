import { NextResponse } from "next/server";

// Handle GET requests to /api/events/[id]
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Fake event (later connect DB here)
  const event = {
    id,
    name: `Sample Event ${id}`,
    date: "2025-08-31",
    details: `This is event ${id} served from the API route.`,
  };

  return NextResponse.json(event);
}
