"use client";
import { GoBroadcast } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import appwrite from "../constants/appwrite_config";

export const dynamic = "force-dynamic"; // disable prerender

export default function Body() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await appwrite.getCurUser();
        console.log("User session:", user);
        if (!user) {
          console.error("No active session, redirecting...");
          router.push("/login");
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Error checking user session:", err);
        router.push("/login");
      }
    };

    checkUser();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await appwrite.account.deleteSession("current");
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Loading your session...</p>;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Welcome to Eventique 🎉
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Manage your events seamlessly with Appwrite & Next.js
          </p>
        </div>

        {/* Create Event Button */}
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/events/event")}
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition-colors"
          >
            Create Event
          </button>
        </div>

        {/* Sign Out Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
}
