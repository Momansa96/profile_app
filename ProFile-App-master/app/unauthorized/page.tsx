'use client';

import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Accès interdit</h1>
      <p className="text-gray-700 mb-6">
        Vous n&apos;avez pas les droits nécessaires pour accéder à cette page.
      </p>
      <button
        onClick={() => router.back()}
        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
      >
        Retour à la page précédente
      </button>
    </div>
  );
}
