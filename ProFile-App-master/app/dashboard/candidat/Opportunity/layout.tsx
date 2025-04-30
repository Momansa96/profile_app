

      

import type { Metadata } from "next";
import "../../../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutClient from "../../../LayoutClient";
import Navbar from "@/app/components/Navbar";

export const metadata: Metadata = {
  title: "Profile-App",
  description:
    "Application de gestion de Cv en ligne et de mise en relation pour les recruteurs.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr" data-theme="light">
        <body>
          <LayoutClient>
          <div className="flex flex-col no-scrollbar  ">
        <Navbar />
        <main className="flex-1 py-2">{children}</main>
      </div>
          </LayoutClient>
        </body>
      </html>
    </ClerkProvider>
  );
}
