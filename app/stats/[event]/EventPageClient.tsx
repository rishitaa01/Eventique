"use client";

import { useEffect, useState } from "react";
import { Models } from "appwrite";
import CsvDownloader from "react-csv-downloader";
import Header from "@/components/header";
import { AppwriteConfig } from "@/constants/appwrite_config";

// Define the event shape
export interface Event {
  id: string;
  name: string;
  details: string;
}

interface EventPageClientProps {
  event: Event;
}

export default function EventPageClient({ event: eventProp }: EventPageClientProps) {
  const [eventData, setEventData] = useState<Event>(eventProp);
  const [docs, setDocs] = useState<Models.Document[]>([]);

  // ✅ API to send emails
  const callAPI = async (email: string, subject: string, message: string) => {
    try {
      const response = await fetch("https://send-grid-api.vercel.app/sendmail", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, subject, message }),
      });
      return await response.json();
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };

  // ✅ Prepare CSV data
  const computeCsvData = () =>
    Promise.resolve(
      docs.map((doc) => ({
        name: (doc as any).name ?? "",
        email: (doc as any).email ?? "",
      }))
    );

  // ✅ Fetch attendees from Appwrite
  useEffect(() => {
    if (!eventProp?.id) return;

    const cfg = new AppwriteConfig();

    cfg.databases
      .listDocuments(
        process.env.NEXT_PUBLIC_REGDB!,
        eventProp.id // collection ID = event ID
      )
      .then((res) => setDocs(res.documents))
      .catch((err) => {
        console.error("Error fetching documents:", err);
        setDocs([]);
      });
  }, [eventProp?.id]);

  return (
    <div className="space-y-6">
      <Header />

      <div className="p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-bold">{eventData.name}</h2>
        <p className="text-gray-700 mt-2">{eventData.details}</p>
      </div>

      {/* ✅ Download attendees CSV */}
      <CsvDownloader
        filename={`${eventData.name}-attendees`}
        separator=","
        wrapColumnChar=""
        datas={computeCsvData}
      >
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
          Download Attendees CSV
        </button>
      </CsvDownloader>

      {/* ✅ Example email trigger button */}
      <button
        onClick={() =>
          callAPI("test@example.com", "Hello from Eventique", "This is a test email.")
        }
        className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
      >
        Send Test Email
      </button>
    </div>
  );
}
