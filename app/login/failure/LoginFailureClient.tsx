"use client";

import { useEffect } from "react";

export default function LoginFailureClient() {
  useEffect(() => {
    // safe to use document/localStorage here
    console.log("Mounted in browser");
  }, []);

  return (
    <div>
      <h1>Login Failed</h1>
    </div>
  );
}
