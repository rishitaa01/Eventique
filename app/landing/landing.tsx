"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import appwrite from "../constants/appwrite_config";

export const dynamic = "force-dynamic"; // disable prerender

export default function Landing() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const user = await appwrite.getCurUser();
      if (user) {
        localStorage.setItem("userInfo", JSON.stringify(user));
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  fetchUser();
}, []);


  const handleSignOut = async () => {
    try {
      await appwrite.account.deleteSession("current");
      router.push("/login");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Loading your session...</p>;
  }

  return (
    <div>
      {/* NAVBAR */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <div className="text-2xl font-bold text-pink-600 cursor-pointer" onClick={() => router.push("/landing")}>
            Eventique
          </div>

          {/* Navigation links */}
          <div className="flex space-x-6 text-gray-700 font-medium">
            <button onClick={() => router.push("/myevents")} className="hover:text-pink-600 transition">
              My Events
            </button>
            <button onClick={() => router.push("/events")} className="hover:text-pink-600 transition">
              Find Events
            </button>
            <button onClick={() => router.push("/event")} className="hover:text-pink-600 transition">
              Create Event
            </button>
          </div>

          {/* Sign Out button */}
          <button
            onClick={handleSignOut}
            className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Landing page content */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Experience hassle free event
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Welcome to our innovative event management application Eventique, where organizing
          and executing unforgettable events becomes effortless. Streamline your planning
          process and create extraordinary experiences with our intuitive platform.
        </p>

        {/* Example cards (downloads, users, files, places) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-2xl font-bold text-pink-600">2.7K</p>
            <p className="text-gray-600">Downloads</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-2xl font-bold text-pink-600">1.3K</p>
            <p className="text-gray-600">Users</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-2xl font-bold text-pink-600">74</p>
            <p className="text-gray-600">Files</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-2xl font-bold text-pink-600">46</p>
            <p className="text-gray-600">Places</p>
          </div>
        </div>

        {/* Create Event button */}
        <button
          onClick={() => router.push("/create")}
          className="bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-700 transition"
        >
          + Create Event
        </button>
      </section>
    </div>
  );
}
