import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { frFR } from '@clerk/localizations';



export const metadata: Metadata = {
  title: "Profile-App",
  description: "Application de gestion de Cv en ligne et de mise en relation pour les recruteurs.",
  icons: {
    icon: "/favicon.png", // Pour PNG
    shortcut: "/favicon.png", // Alternative
    apple: "/favicon.png", // Pour iOS
  },
};

const customFr = {
  ...frFR,
  signUp: {
    ...frFR.signUp,
    start: {
      ...frFR.signUp?.start,
      title: "Créer mon compte",
      subtitle: "Bienvenue ! Veuillez remplir les informations pour commencer.",
      actionLink: "Me connecter",
      actionLinkText: "",
    },
    
  },
  signIn: {
    ...frFR.signIn,
    start: {
      ...frFR.signIn?.start,
      title: "Connectez-vous à votre compte",
      subtitle: "Bienvenue ! Veuillez entrer vos informations de connexion.",
      actionLink: "Créer un compte",
      actionLinkText: "Pas encore de compte ?",
    },
    
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={customFr}>
      <html lang="fr" data-theme="light">
        <body

        >
          {children}
          <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
