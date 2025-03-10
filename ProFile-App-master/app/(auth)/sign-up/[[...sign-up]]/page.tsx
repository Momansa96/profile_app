import Navbar from '@/app/components/Navbar'
import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
export default function Page() {
  return (
    <section className="bg-white">
      <Navbar />
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image

            src="/sign-up.jpg"
            width={500}
            height={500}
            alt="Photo Inscription"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <Link className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <Image
              src={"/profile-app-logo.png"}
              width={150}
              height={150}
              alt='Profile Logo'
              />
            </Link>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Rejoignez ProFile dès aujourd’hui !
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
            <div className="relative -mt-16 block lg:hidden">
            <Link className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <Image
              src={"/profile-app-logo.png"}
              width={150}
              height={150}
              alt='Profile Logo'
              />
            </Link>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Rejoignez ProFile dès aujourd’hui !
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Créez et partagez votre CV en ligne en quelques clics. Restez visible pour les recruteurs et opportunités professionnelles.
              </p>
            </div>

            <div className='mt-6 md:mt-0'>
              <SignUp />
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}