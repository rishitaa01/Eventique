"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import appwriteConfig from "@/constants/appwrite_config";

export default function SuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const u = await appwriteConfig.getCurUser();

        if (u) {
          setUser(u);
        } else {
          // If no user, send back to login
          router.push("/login");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Checking your session...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <h1 className="text-3xl font-bold">🎉 Login Successful!</h1>
      {user && (
        <p className="mt-4 text-lg">
          Welcome, <span className="font-semibold">{user.name || user.email}</span>
        </p>
      )}

      <button
        onClick={() => router.push("/events")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go to Events
      </button>
    </div>
  );
}
