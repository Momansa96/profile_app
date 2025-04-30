import React from 'react'
import Image from 'next/image'
import { CircleCheck } from 'lucide-react';
import Link from 'next/link';
const Features = () => {
    return (
        <div className='flex flex-col justify-between gap-6 items-center my-8' id='features'>
            <div className='flex justify-center items-center  '>
                <div className="flex flex-wrap justify-center items-center gap-4 ">
                    <div className='flex justify-end mr-2 max-w-xl max-h-full'>
                        <Image
                            src="/features_jober.jpeg"
                            width={350}
                            height={350}
                            alt="Image de presentation"
                            className="rounded-xl shadow-lg"
                        />
                    </div>
                    <div className="rounded-lg bg-gray-100/80 max-w-2xl ">
                        <div className="p-6 sm:p-8">
                            <h3 className="text-3xl font-medium text-gray-900">
                                Créez, personnalisez et partagez
                            </h3>

                            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                                Gagnez du temps avec notre éditeur de CV en ligne intuitif. ProFile vous permet de concevoir un CV professionnel, de l’exporter en PDF et de le partager en un clic avec les recruteurs.
                            </p>

                            <ul className='mt-2'>
                                <li className='mb-2 flex gap-1 item-center'>
                                    <CircleCheck
                                        fill='green'
                                        color='white'
                                        width={20}
                                    />
                                    Modèles de CV personnalisables
                                </li>
                                <li className='mb-2 flex gap-1 item-center'>
                                    <CircleCheck
                                        fill='green'
                                        color='white'
                                        width={20}
                                    />
                                    Sauvegarde automatique
                                </li>
                                <li className='mb-2 flex gap-1 item-center'>
                                    <CircleCheck
                                        fill='green'
                                        color='white'
                                        width={20}
                                    />
                                    Génération de lien public
                                </li>
                                <li className='mb-2 flex gap-1 item-center'>
                                    <CircleCheck
                                        fill='green'
                                        color='white'
                                        width={20}
                                    />
                                    Export PDF instantané
                                </li>
                            </ul>

                            <Link href="/sign-up" className="btn group mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-600 border-teal-700">
                                Créer mon CV

                                <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                                    &rarr;
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center  '>
                <div className="flex flex-wrap justify-center items-center gap-4 ">
                    <div className="rounded-lg bg-gray-100/80 max-w-2xl">
                        <div className="p-4 sm:p-6">
                            <h3 className="text-3xl font-medium text-gray-900">
                                Trouvez les talents qu’il vous faut
                            </h3>

                            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                                Accédez à une base de profils qualifiés et filtrables selon vos critères de recherche. ProFile simplifie votre processus de recrutement en mettant à votre disposition des outils avancés pour identifier rapidement les candidats qui correspondent à vos besoins.
                            </p>

                            <ul className='mt-2'>
                                <li className='mb-2 flex gap-1 item-center'>
                                    <CircleCheck
                                        fill='green'
                                        color='white'
                                        width={20}
                                    />
                                    Recherche avancée
                                </li>
                                <li className='mb-2 flex gap-1 item-center'>
                                    <CircleCheck
                                        fill='green'
                                        color='white'
                                        width={20}
                                    />
                                    Accès rapide aux CV
                                </li>
                                <li className='mb-2 flex gap-1 item-center'>
                                    <CircleCheck
                                        fill='green'
                                        color='white'
                                        width={20}
                                    />
                                    Système de favoris
                                </li>
                                <li className='mb-2 flex gap-1 item-center'>
                                    <CircleCheck
                                        fill='green'
                                        color='white'
                                        width={20}
                                    />
                                    Contact direct
                                </li>
                            </ul>

                            <Link href="/sign-up" className=" btn group mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-600 border-teal-700">
                                Trouver un Candidat

                                <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                                    &rarr;
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className='flex justify-end mr-2 max-w-xl max-h-full'>
                        <Image
                            src="/features_recruiter.jpeg"
                            width={340}
                            height={350}
                            alt="Image de presentation"
                            className="rounded-xl shadow-xl"
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Features