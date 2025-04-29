import React from 'react'
import Link from 'next/link'
import Grid from './Grid'
import ProfileBadge from './ProfileBadge'

const Banner = () => {
    return (
        <section className="bg-gray-50">
            <div className="mx-auto max-w-screen-lg px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl " >
                        Concevez et partagez votre CV en toute
                        <strong className="font-extrabold text-teal-700 sm:block"> simplicité ! </strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                    Une plateforme intuitive pour créer, personnaliser et partager votre CV en ligne. Simplifiez votre recherche d’emploi et rendez-vous visible auprès des recruteurs.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            className="block w-full rounded bg-teal-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring active:bg-teal-500 sm:w-auto"
                            href="#pricing"
                        >
                            Créer mon CV
                        </Link>

                        <Link
                            className="block w-full rounded px-12 py-3 text-sm font-medium text-teal-600 shadow hover:text-teal-700 focus:outline-none focus:ring active:text-teal-500 sm:w-auto"
                            href="#pricing"
                        >
                            Découvrir les profils
                        </Link>
                    </div>
                    <div className='flex justify-center mt-8 py-8'>
                        <ProfileBadge totalUsers={100} />
                    </div>
                </div>

            </div>
            <div className='flex justify-center flex-wrap '>
                <Grid />
            </div>
        </section>

    )
}

export default Banner