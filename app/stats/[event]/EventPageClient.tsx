"use client";

import { useEffect, useState } from "react";
import { Models } from "appwrite";
import { AppwriteConfig } from "@/constants/appwrite_config";
import CsvDownloader from "react-csv-downloader";
import Header from "@/components/header";

// ✅ Event type
interface Event {
  id: string;
  name: string;
  details: string;
}

// ✅ Props for EventPageClient
interface EventPageClientProps {
  event: Event;
}

export default function EventPageClient({ event }: EventPageClientProps) {
  const appwriteConfig = new AppwriteConfig();
  const [docs, setDocs] = useState<Models.Document[]>([]);
  const [eventData, setEventData] = useState<Event>(event);

  // ✅ Example API call (SendGrid)
  const callAPI = async (email: string, subject: string, message: string) => {
    try {
      await fetch("https://send-grid-api.vercel.app/sendmail", {
        method: "POST",
        body: JSON.stringify({ email, subject, message }),
        headers: { "content-type": "application/json" },
      });
    } catch (err) {
      console.error("Email API error:", err);
    }
  };

  // ✅ Prepare CSV export data
  const asyncFnComputeData = () =>
    Promise.resolve(
      docs.map((doc) => ({
        name: doc.name,
        email: doc.email,
      }))
    );

  // ✅ Fetch attendees from Appwrite when event changes
  useEffect(() => {
    if (!event?.id) return;

    appwriteConfig.databases
      .listDocuments(process.env.NEXT_PUBLIC_REGDB!, event.id)
      .then((response) => setDocs(response.documents))
      .catch(() => setDocs([]));
  }, [appwriteConfig.databases, event?.id]);

  return (
    <div>
      <Header />

      <h2 className="text-xl font-bold">{eventData.name}</h2>
      <p className="text-gray-600 mb-4">{eventData.details}</p>

      {/* ✅ CSV download button */}
      <CsvDownloader
        filename={`${eventData.name}-attendees`}
        separator=","
        wrapColumnChar=""
        datas={asyncFnComputeData}
      >
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4">
          Download Attendees
        </button>
      </CsvDownloader>
    </div>
  );
}
