import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronUp } from 'lucide-react'
const Footer = () => {
    return (
        <div>
            <footer className=" relative bg-teal-700/50 text-white py-6">
                <div className=" mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
                    <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
                        <Link
                            className="inline-block rounded-full bg-teal-600 p-2 text-white shadow transition hover:bg-teal-500 sm:p-3 lg:p-4"
                            href="#MainContent"
                        >
                            <span className="sr-only">Back to top</span>

                            <ChevronUp
                             width={30}
                             height={30}
                             color='white'
                            />
                        </Link>
                    </div>

                    <div className="lg:flex lg:items-end lg:justify-between">
                        <div>
                            <div className="flex justify-center text-teal-700 lg:justify-start">
                                <Image
                                    src="/profile-app-logo.png"
                                    width={200}
                                    height={200}
                                    alt='Profile Logo'
                                />
                            </div>

                            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-white-500 lg:text-left">
                                La plateforme qui vous aide à créer, partager et optimiser votre CV en ligne pour maximiser vos opportunités professionnelles
                            </p>
                        </div>

                        <ul
                            className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12"
                        >
                            <li>
                                <Link className="text-white-700 transition hover:text-teal-700/75" href="#"> Accueil </Link>
                            </li>

                            <li>
                                <Link className="text-white-700 transition hover:text-teal-700/75" href="#features"> Fonctionnalites </Link>
                            </li>

                            <li>
                                <Link className="text-white-700 transition hover:text-teal-700/75" href="#pricing"> Plans </Link>
                            </li>

                            <li>
                                <Link className="text-white-700 transition hover:text-teal-700/75" href="#faq"> FAQ </Link>
                            </li>
                        </ul>
                    </div>

                    <p className="mt-12 text-center text-sm text-white-500 lg:text-right">
                        © 2025 ProFile. Tous droits réservés.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Footer