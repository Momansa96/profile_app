import React from 'react'

const Faq = () => {
    return (
        <div className='flex justify-center items-center flex-col my-14 p-2' id='faq'>
            <div className="flex justify-center items-center flex-col gap-4">
                <div className="text-teal-700 font-semibold text-3xl tracking-wide">
                    FAQ
                </div>
                <h3 className='text-2xl font-bold text-gray-900 text-center mt-2'>
                    Vous avez des questions ? Nous avons les réponses.
                </h3>
                <p className="text-gray-600 text-center max-w-xl mt-4">
                    Consultez les questions les plus fréquentes pour en savoir plus sur ProFile et son fonctionnement.
                </p>
            </div>
            <div className="space-y-4 max-w-screen-md mt-4">
                <details className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden border-gray-400/20 border-2 shadow-xs" open>
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                        <h2 className="font-medium text-lg">Comment créer mon CV en ligne sur ProFile ?</h2>

                        <span className="relative size-5 shrink-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </span>
                    </summary>

                    <p className="mt-4 leading-relaxed text-gray-700">
                        C’est simple ! Inscrivez-vous sur ProFile, remplissez vos informations professionnelles et choisissez un modèle de CV. Vous pouvez ensuite personnaliser la mise en page et télécharger votre CV en PDF ou le partager en ligne avec un lien.
                    </p>
                </details>

                <details className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden border-gray-400/20 border-2 shadow-xs">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                        <h2 className="font-medium">ProFile est-il gratuit ?</h2>

                        <span className="relative size-5 shrink-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute inset-0 opacity-100 group-open:opacity-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute inset-0 opacity-0 group-open:opacity-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </span>
                    </summary>

                    <p className="mt-4 leading-relaxed text-gray-700">
                        Oui, ProFile propose un plan gratuit qui permet de créer et de télécharger un CV. Pour accéder à des fonctionnalités avancées comme des modèles premium, des statistiques de consultation ou un espace de stockage supplémentaire, vous pouvez opter pour un abonnement payant.
                    </p>
                </details>

                <details className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden border-gray-400/20 border-2 shadow-xs">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                        <h2 className="font-medium">Qui peut voir mon CV en ligne ?</h2>

                        <span className="relative size-5 shrink-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute inset-0 opacity-100 group-open:opacity-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute inset-0 opacity-0 group-open:opacity-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </span>
                    </summary>

                    <p className="mt-4 leading-relaxed text-gray-700">
                        Par défaut, votre CV est privé. Vous pouvez choisir de le rendre public et accessible via un lien ou le partager uniquement avec les recruteurs de votre choix. Vous avez également la possibilité de le masquer à certaines entreprises.
                    </p>
                </details>

                <details className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden border-gray-400/20 border-2 shadow-xs">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                        <h2 className="font-medium">ProFile est-il adapté aux recruteurs à la recherche de talents ?</h2>

                        <span className="relative size-5 shrink-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute inset-0 opacity-100 group-open:opacity-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute inset-0 opacity-0 group-open:opacity-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </span>
                    </summary>

                    <p className="mt-4 leading-relaxed text-gray-700">
                        Absolument ! ProFile permet aux recruteurs d&apos;accéder à une base de CV qualifiés, filtrer les candidats selon leurs compétences et entrer en contact avec eux facilement. C&apos;est un outil idéal pour optimiser le processus de recrutement.
                    </p>
                </details>
            </div>
        </div>
    )
}

export default Faq