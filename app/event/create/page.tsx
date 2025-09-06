// app/event/create/page.tsx
"use client";
import React, { useState } from "react";

export default function CreateEventPage() {
  const [eventName, setEventName] = useState("");
  const [agenda, setAgenda] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating event:", { eventName, agenda, url });
    // here you will call Appwrite API to save event
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">
        Create Event
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4"
      >
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Agenda"
          value={agenda}
          onChange={(e) => setAgenda(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />
        <input
          type="url"
          placeholder="Event URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
