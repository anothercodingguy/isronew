import type { Metadata } from "next";
import "./globals.css";
import { IsroAgent } from "@/components/IsroAgent";
import { AlertBanner } from "@/components/layout/AlertBanner";
import { LanguageProvider } from "@/src/context/LanguageContext";

export const metadata: Metadata = {
  title: "ISRO — Reaching for the stars | भारतीय अंतरिक्ष अनुसंधान संगठन",
  description: "Indian Space Research Organisation: space technology for the benefit of the nation and beyond."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <AlertBanner />
          {children}
          <IsroAgent />
        </LanguageProvider>
      </body>
    </html>
  );
}
