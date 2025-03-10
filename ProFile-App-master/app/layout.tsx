import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export const metadata: Metadata = {
  title: "Profile-App",
  description: "Application de gestion de Cv en ligne et de mise en relation pour les recruteurs.",
  icons: {
    icon: "/favicon.png", // Pour PNG
    shortcut: "/favicon.png", // Alternative
    apple: "/favicon.png", // Pour iOS
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
        <body

        >
          {children}
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
