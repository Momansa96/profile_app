import Navbar from '@/app/components/Navbar'
import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
export default function Page() {
  return (
    <section className="bg-white">
      <Navbar />
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-52 mt-9 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            src="/sign-in.jpeg"
            width={1000}
            height={1000}
            alt="Photo Connexion"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Bon retour sur Profile !
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Créez et partagez votre CV en ligne en quelques clics. Restez visible pour les recruteurs et opportunités professionnelles.
            </p>
          </div>
        </section>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative block lg:hidden">
              

              <h1 className="mt-2 text-2xl text-center font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Bon retour sur Profile !
              </h1>

              
            </div>
            <div className='mt-6 md:mt-0'>
              <SignIn />
            </div>


          </div>
        </main>
      </div>
    </section>
  )
}