"use client";

import { useEffect, useState } from "react";
import { Models } from "appwrite";
import { AppwriteConfig } from "@/constants/appwrite_config";
import CsvDownloader from "react-csv-downloader";
import Header from "@/components/header";
import { Event } from "@/types/event";
interface EventPageClientProps {
  event: Event;
}

export default function EventPageClient({ event }: EventPageClientProps) {
  const appwriteConfig = new AppwriteConfig();
  const [docs, setDocs] = useState<Models.Document[]>([]);
  const [Event, setEvent] = useState<Models.Document | null>(null);

  const callAPI = async (email: string, subject: string, message: string) => {
    try {
      await fetch("https://send-grid-api.vercel.app/sendemail", {
        method: "POST",
        body: JSON.stringify({ email, subject, message }),
        headers: { "content-type": "application/json" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const asyncFnComputeData = () =>
    Promise.resolve(
      docs.map((doc) => ({
        name: doc.name,
        email: doc.email,
      }))
    );

  useEffect(() => {
    // Fetch attendees
    appwriteConfig.databases
      .listDocuments(process.env.NEXT_PUBLIC_REGDB!, event.id)
      .then(
        (response) => setDocs(response.documents),
        () => setDocs([])
      );

    // Fetch event details
    appwriteConfig.databases
      .getDocument(
        process.env.NEXT_PUBLIC_DATABASEID!,
        process.env.NEXT_PUBLIC_EVENT_COLLID!,
        event.id
      )
      .then((response) => setEvent(response));

    // Subscribe to real-time updates
    const unsubscribe = appwriteConfig.client.subscribe(
      `databases.${process.env.NEXT_PUBLIC_REGDB}.collections.${event}.documents`,
      () => {
        appwriteConfig.databases
          .listDocuments(process.env.NEXT_PUBLIC_REGDB!, event.id)
          .then(
            (response) => setDocs(response.documents),
            () => setDocs([])
          );
      }
    );

    return () => {
      // ✅ unsubscribe properly to avoid memory leaks
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [event]); // ✅ only re-run when eventId changes

  const handleAcceptanceEmail = (id: string, name: string, email: string) => {
    appwriteConfig.databases
      .updateDocument(process.env.NEXT_PUBLIC_REGDB!, event.id, id, {
        confirm: "accept",
      })
      .then(() => {
        callAPI(
          email,
          "Knock Knock, Seems like your lucky day",
          `Hey ${name}, You have been accepted to attend ${
            event?.name
          }. Contact the host at ${
            JSON.parse(localStorage.getItem("userInfo") || "{}").email
          } for any queries.`
        );
      });
  };

  const handleRejectionEmail = (id: string, name: string, email: string) => {
    appwriteConfig.databases
      .updateDocument(process.env.NEXT_PUBLIC_REGDB!, event.id, id, {
        confirm: "reject",
      })
      .then(() => {
        callAPI(
          email,
          "We appreciate your interest in the event.",
          `Hey ${name}, we regret to inform you that your invitation has been cancelled to attend ${
            event?.name
          }. Contact the host at ${
            JSON.parse(localStorage.getItem("userInfo") || "{}").email
          } for any queries.`
        );
      });
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">
          {event ? event.name : "Event Attendees"}
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-200 text-gray-700 font-bold uppercase">
                  Name
                </th>
                <th className="py-3 px-6 bg-gray-200 text-gray-700 font-bold uppercase">
                  Email
                </th>
                <th className="py-3 px-6 bg-gray-200 text-gray-700 font-bold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {docs.map((attendee) => (
                <tr key={attendee.$id} className="bg-gray-100">
                  <td className="py-4 px-6">{attendee.name}</td>
                  <td className="py-3 px-6">{attendee.email}</td>
                  <td className="py-4">
                    {attendee.confirm === "accept" ? (
                      <button
                        className="bg-green-800 text-white px-4 py-2 rounded mr-2"
                        onClick={() => alert("Already sent Acceptance mail")}
                      >
                        Accepted
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
                        onClick={() =>
                          handleAcceptanceEmail(
                            attendee.$id,
                            attendee.name,
                            attendee.email
                          )
                        }
                      >
                        Accept
                      </button>
                    )}
                    {attendee.confirm === "reject" ? (
                      <button
                        className="bg-red-800 text-white px-4 py-2 rounded"
                        onClick={() => alert("Already sent Rejection mail")}
                      >
                        Rejected
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() =>
                          handleRejectionEmail(
                            attendee.$id,
                            attendee.name,
                            attendee.email
                          )
                        }
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-center">
          <CsvDownloader
            datas={asyncFnComputeData}
            filename="registrations"
            text="Export Registrations"
          />
        </div>
      </div>
    </div>
  );
}
