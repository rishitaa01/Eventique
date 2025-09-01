"use client";

import { useEffect, useState } from "react";
import { Models } from "appwrite";
import CsvDownloader from "react-csv-downloader";
import Header from "@/components/header";
import { AppwriteConfig } from "@/constants/appwrite_config";

// Keep the same shape as page.tsx
interface Event {
  id: string;
  name: string;
  details: string;
}

interface EventPageClientProps {
  event: Event;
}

export default function EventPageClient({ event }: EventPageClientProps) {
  const [docs, setDocs] = useState<Models.Document[]>([]);
  const [eventData] = useState<Event>(event);

  // Example email API
  const callAPI = async (email: string, subject: string, message: string) => {
    try {
      await fetch("https://send-grid-api.vercel.app/sendmail", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, subject, message }),
      });
    } catch (err) {
      console.error("Email API error:", err);
    }
  };

  // CSV export data
  const computeCsvData = () =>
    Promise.resolve(
      docs.map((doc) => ({
        name: (doc as any).name,
        email: (doc as any).email,
      }))
    );

  // Fetch attendees from Appwrite when event.id changes
  useEffect(() => {
    if (!event?.id) return;

    // create the config inside the effect to avoid ESLint dep warnings
    const cfg = new AppwriteConfig();

    cfg.databases
      .listDocuments(process.env.NEXT_PUBLIC_REGDB!, event.id)
      .then((res) => setDocs(res.documents))
      .catch(() => setDocs([]));
  }, [event?.id]);

  return (
    <div className="space-y-4">
      <Header />
      <h2 className="text-xl font-semibold">{eventData.name}</h2>
      <p className="text-gray-600">{eventData.details}</p>

      <CsvDownloader
        filename={`${eventData.name}-attendees`}
        separator=","
        wrapColumnChar=""
        datas={computeCsvData}
      >
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
          Download Attendees CSV
        </button>
      </CsvDownloader>
    </div>
  );
}
