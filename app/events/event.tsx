"use client";
import React, { useEffect, useState } from "react";
import appwriteConfig from "../constants/appwrite_config"; 
import { Models } from "appwrite";

interface Event extends Models.Document {
  eventname: string;
  agenda: string;
  url: string;
  created: string;
}

export default function EventListing() {
  const [events, setEvents] = useState<Event[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Fetch events from Appwrite
    const fetchEvents = async () => {
      try {
        const res = await appwriteConfig.databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.activeCollId
        );
        setEvents(res.documents as Event[]);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEvents();

    // ✅ Load user info
    const stored = localStorage.getItem("userInfo");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserId(parsed.$id || null);
      } catch (e) {
        console.error("Failed to parse userInfo:", e);
      }
    }
  }, []);

  return (
    <div>
      <h1>All Active Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.$id}>
            <strong>{event.eventname}</strong> - {event.agenda}
          </li>
        ))}
      </ul>
    </div>
  );
}
