"use client";
import React, { useEffect, useState } from "react";
import appwriteService from "../constants/appwrite_config";
import { Models } from "appwrite";
import withAuth from "@/withAuth";

interface Event extends Models.Document {
  eventname: string;
  agenda: string;
  url: string;
  created: string;
}

function EventListing() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await appwriteService.databases.listDocuments(
          appwriteService.databaseId,
          appwriteService.activeCollId
        );
        setEvents(res.documents as Event[]);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEvents();
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

export default withAuth(EventListing);