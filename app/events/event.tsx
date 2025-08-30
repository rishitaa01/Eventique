"use client";
import { useRouter } from 'next/navigation';
const router = useRouter();
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

interface Event {
  $id: string;
  eventname: string;
  agenda: string;
  url: string;
}

const EventListing = () => {
  const [events, setEvents] = useState<Event[]>([]);

  function deleteEvent($id: any): void {
    throw new Error("Function not implemented.");
  }

  // Your existing code for fetching events...
  
  return (
    <div>
      <p className="text-3xl font-bold mb-2 text-center mx-auto py-5">All Active Events</p>
      <div className="py-10">
        {events.map((item: { $id: Key | null | undefined; url: string | Blob | undefined; eventname: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; agenda: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; created: any; }) => (
          <div key={item.$id} className="py-2">
            <section className="text-gray-600 body-font">
              <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                  <img
                    className="object-cover object-center rounded"
                    alt="event"
                    src={item.url}
                  />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                    {item.eventname}
                  </h1>
                  <p className="mb-8 leading-relaxed">{item.agenda}</p>
                  <div className="flex justify-center">
                    <button
                      className="inline-flex text-white bg-[#f02e65] border-0 py-2 px-6 focus:outline-none hover:bg-[#b51349] rounded text-lg"
                      onClick={() => router.push(`/events/${item.$id}`)}
                    >
                      Register
                    </button>

                    {JSON.parse(localStorage.getItem("userInfo") || "{}").$id ===
                    item.created ? (
                      <button
                        className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                        onClick={() => deleteEvent(item.$id)}
                      >
                        Delete Event
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

function useState<T>(arg0: never[]): [any, any] {
  throw new Error("Function not implemented.");
}
  