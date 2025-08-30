// app/myevents/page.tsx
"use client";
import { useRouter } from 'next/router';

type PageProps = {
  event: string;
};

const MyEventPage = ({ event }: PageProps) => {
  // You can directly use event now
  return (
    <div>
      <h1>Event: {event}</h1>
      {/* Add other components or UI here */}
    </div>
  );
};

// If you're using getServerSideProps or getStaticProps
export async function getServerSideProps(context: any) {
  const { event } = context.params; // Extract event from params

  // Fetch event data here if necessary

  return {
    props: { event },
  };
}

export default MyEventPage;
