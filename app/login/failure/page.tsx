"use client";
import dynamic from "next/dynamic";

const LoginFailureClient = dynamic(() => import("./LoginFailureClient"), {
  ssr: false, // 🚀 disables server-side rendering
});

export default function Page() {
  return <LoginFailureClient />;
}
