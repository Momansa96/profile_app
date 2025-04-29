import React from 'react'
import Image from 'next/image'
const Grid = () => {
    return (
        <div className='flex justify-center items-center flex-col'>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
                <div className=" rounded-lg overflow-hidden object-cover">
                    <Image
                        src="/bannerbg.jpeg"
                        width={330}
                        height={330}
                        alt="Image de presentation"
                        className="rounded-lg shadow-lg"
                    />
                </div>
                <div className="h-full w-full rounded-xl overflow-hidden object-cover">
                    <Image
                        src="/Photo2.jpg"
                        width={330}
                        height={330}
                        alt="Image de presentation"
                        className="rounded-lg shadow-lg"
                    /></div>
                <div className="rounded-xl overflow-hidden object-cover">
                    <Image
                        src="/bannerbg2.jpeg"
                        width={330}
                        height={330}
                        alt="Image de presentation"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Plusieurs entreprises nous font confiance</h2>

                    <p className="mt-4 text-gray-500 sm:text-xl">
                        Ces entreprises nous font confiance pour simplifier leur processus de recrutement. Grâce à leur soutien,  <span className='text-teal-500 underline'>Profile</span> connecte les talents aux opportunités et propose une solution innovante pour la gestion du processus de recherche d’emploi.
                    </p>
                </div>


            </div>
        </div>
    )
}

export default Grid