import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

// ✅ static metadata (works fine for root layout)
export const metadata: Metadata = {
  title: "Eventique - Create Events",
  description:
    "Eventique is a platform for event organizers to create and manage events.",
  icons: {
    icon: "/favicon.ico", // make sure this file is in your public/ folder
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
