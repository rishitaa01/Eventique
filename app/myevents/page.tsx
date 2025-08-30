import MyEvents from "./myevents";
import { useRouter } from "next/router";

// Main Events page component as default export
export default function Events() {
  return <MyEvents />;
}

// EventPage component as a named export
export function EventPage({ params }: { params: { event: string } }) {
  const { event } = params;  // Here, you can access the event string

  // You can now use this event in your component, for example, rendering it:
  return (
    <div>
      <h1>Event: {event}</h1>
    </div>
  );
}

// If you're using getServerSideProps or getStaticProps:
export async function getServerSideProps(context: any) {
  const { event } = context.params;  // Destructure event from params
  
  // If you are fetching data based on the event or performing other logic, do it here
  return {
    props: { params: { event } },  // Pass the event as props to the page
  };
}
