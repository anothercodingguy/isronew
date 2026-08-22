import type { Metadata } from "next";
import "./globals.css";
import { IsroAgent } from "@/components/IsroAgent";
import { AlertBanner } from "@/components/layout/AlertBanner";

export const metadata: Metadata = {
  title: "ISRO — Reaching for the stars",
  description: "Indian Space Research Organisation: space technology for the benefit of the nation and beyond."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><AlertBanner />{children}<IsroAgent /></body></html>;
}
