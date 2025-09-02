"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import appwriteService from "./constants/appwrite_config";

export default function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function ProtectedRoute(props: P) {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const user = await appwriteService.getCurUser();
        if (!user) {
          router.push("/login");
        } else {
          setAuthorized(true);
        }
        setLoading(false);
      };
      checkAuth();
    }, [router]);

    if (loading) return <p>Loading...</p>;
    if (!authorized) return null;

    return <Component {...props} />;
  };
}
