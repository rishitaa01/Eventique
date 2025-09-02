"use client";
import React, { useEffect, useState } from "react";
import appwriteService from "../app/constants/appwrite_config";
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
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-10">
        All Active Events
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.$id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {event.eventname}
              </h2>
              <p className="text-gray-600 mb-4">{event.agenda}</p>
              {event.url && (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:underline"
                >
                  Join Event →
                </a>
              )}
              <p className="text-sm text-gray-400 mt-4">
                Created on {new Date(event.created).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default withAuth(EventListing);
