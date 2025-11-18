"use client";
import Navbar from '@/app/components/Navbar';
import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { trackAffiliateClick } from '@/app/actions';
import { Gift } from 'lucide-react';

export default function Page() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref");
  const [showReferralBanner, setShowReferralBanner] = useState(false);

  useEffect(() => {
    // Tracker le clic si code d'affiliation présent
    if (refCode) {
      trackAffiliateClick(refCode);
      // Stocker le code en localStorage pour l'utiliser après l'inscription
      localStorage.setItem("affiliateRef", refCode);
      setShowReferralBanner(true);

      console.log(`✅ Code de parrainage détecté : ${refCode}`);
    }
  }, [refCode]);

  return (
    <section className="bg-white">
      <Navbar />

      {/* Bannière de parrainage fixée sous la navbar */}
      {showReferralBanner && (
        <div className="fixed top-16 left-0 right-0 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-4 text-center z-[9] shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <Gift className="w-5 h-5" />
            <p className="text-sm sm:text-base font-medium">
              🎉 Code de parrainage activé : <strong className="font-bold">{refCode}</strong>
            </p>
          </div>
          <p className="text-xs mt-1">Profitez de votre inscription via un lien de parrainage !</p>
        </div>
      )}

      <div className={`lg:grid lg:min-h-screen lg:grid-cols-12 ${showReferralBanner ? 'mt-20' : ''}`}>
        <section className="relative flex h-52 mt-9 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            src="/login.jpg"
            width={500}
            height={500}
            alt="Photo Inscription"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-black sm:text-3xl md:text-4xl">
              Rejoignez ProFile
            </h2>

            <p className="mt-4 leading-relaxed text-black/90">
              Créez et partagez votre CV en ligne en quelques clics. Restez visible pour les recruteurs et opportunités professionnelles.
            </p>
          </div>
        </section>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative block lg:hidden">
              <h1 className="mt-2 text-2xl text-center font-bold text-black sm:text-3xl md:text-4xl">
                Rejoignez ProFile !
              </h1>
            </div>

            <div className='mt-6 md:mt-0'>
              <SignUp />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
