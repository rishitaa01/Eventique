"use client";
import React, { useEffect, useState } from "react";
import appwriteConfig from "../constants/appwrite_config";
import { Models } from "appwrite";

export default function SuccessPage() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const curUser = await appwriteConfig.getCurUser();
        setUser(curUser);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading user info...</p>;
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>✅ Login Successful!</h1>
      {user ? (
        <div>
          <p>
            Welcome, <strong>{user.name}</strong> 👋
          </p>
          <p>Email: {user.email}</p>
          <p>User ID: {user.$id}</p>
        </div>
      ) : (
        <p>No user info found. Please login again.</p>
      )}
    </div>
  );
}
