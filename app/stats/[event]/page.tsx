// app/events/[event]/page.tsx
import { Metadata } from "next";

type PageProps = {
  params: {
    event: string;
  };
};

export default function EventPage({ params }: PageProps) {
  return (
    <div>
      <h1>Event: {params.event}</h1>
    </div>
  );
}

// Optional metadata function
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Event ${params.event}`,
  };
}
