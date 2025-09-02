"use client";
import React, { useEffect, useState } from "react";
import appwriteService from "@/constants/appwrite_config";
import { Models } from "appwrite";
import withAuth from "@/withAuth";

interface Event extends Models.Document {
  eventname: string;
  agenda: string;
  url: string;
  created: string;
}

function EventsPage() {
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
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-10">
        All Active Events
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.$id}
              className="border border-gray-200 p-4 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {event.eventname}
              </h2>
              <p className="text-gray-600">{event.agenda}</p>
              <a
                href={event.url}
                target="_blank"
                className="text-pink-500 hover:underline mt-2 block"
              >
                Visit
              </a>
              <p className="text-xs text-gray-400">
                Created on: {new Date(event.created).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default withAuth(EventsPage);
