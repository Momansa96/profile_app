

import type { Metadata } from "next";
import "../../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutClient from "../../LayoutClient";

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
            <div className="flex h-screen">
              <main className="flex-1 pt-2 px-4">{children}</main>
            </div>
          </LayoutClient>
        </body>
      </html>
    </ClerkProvider>
  );
}
