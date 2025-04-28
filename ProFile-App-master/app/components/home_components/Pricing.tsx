import React from "react";
import { Check, X } from "lucide-react";
import { plans } from "@/plans";
import Link from "next/link";


const Pricing = () => {
    return (
        <div className="flex justify-center items-center flex-col mt-8" id="pricing">
            <div className="flex justify-center items-center flex-col">
                <div className="text-teal-700 font-semibold text-2xl capitalize tracking-wide">
                    Plans
                </div>

                <p className="text-gray-600 text-center max-w-2xl mt-3 px-2">
                    Trouvez l&apos;offre qui vous convient et optimisez votre gestion de CV avec ProFile.
                </p>
            </div>
            <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
                    <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="p-6 sm:px-8">
                            <h2 className="text-lg font-medium text-gray-900">
                                Offre Gratuite
                                <span className="sr-only">Plan</span>
                            </h2>

                            <p className="mt-2 text-gray-700">Idéal pour les étudiants et jeunes diplômés souhaitant créer et partager leur CV en ligne.</p>

                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> 0 FCFA </strong>

                                <span className="text-sm font-medium text-gray-700">/Mois</span>
                            </p>

                            <Link
                                className="mt-4 block rounded border border-teal-600 bg-teal-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                                href = "/sign-up"
                            >
                                Commencer gratuitement
                            </Link>
                        </div>

                        <div className="p-6 sm:px-8">
                            <p className="text-lg font-medium text-gray-900 sm:text-xl">Ce qui est inclus :</p>

                            <ul className="mt-2 space-y-2 sm:mt-4">
                                <li className="flex items-center gap-1">
                                    <Check
                                        color="green"
                                    />

                                    <span className="text-gray-700"> Création et personnalisation du CV </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <Check
                                        color="green"
                                    />

                                    <span className="text-gray-700"> Téléchargement en PDF </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <Check
                                        color="green"
                                    />

                                    <span className="text-gray-700 text-sm"> Hébergement en ligne du CV </span>
                                </li>



                                <li className="flex items-center gap-1">
                                    <X
                                        color="red"
                                    />

                                    <span className="text-gray-700 text-sm"> Acces aux opportunites de la plateforme </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <X
                                        color="red"
                                    />

                                    <span className="text-gray-700 text-sm"> Mise en avant du CV auprès des recruteurs </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-200 rounded-2xl border border-teal-500 shadow-xs scale-105 bg-teal-100/40">
                        <div className="p-6 sm:px-8">
                            <h2 className="text-lg font-medium text-gray-900">
                                Offre Candidat
                                <span className="sr-only">Plan</span>
                            </h2>

                            <p className="mt-2 text-gray-700 text-left text-sm">Parfait pour les professionnels souhaitant maximiser leur visibilité auprès des recruteurs.</p>

                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> {plans[0].price} FCFA </strong>

                                <span className="text-sm font-medium text-gray-700">{plans[0].duration}</span>
                            </p>

                            <Link
                                className="mt-4 block rounded border border-teal-600 bg-teal-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                                href="https://me.fedapay.com/profile-app-souscription"
                            >
                                Profiter de l&apos;offre Pro
                            </Link>
                        </div>

                        <div className="p-6 sm:px-8">
                            <p className="text-lg font-medium text-gray-900 sm:text-xl">Ce qui est inclus :</p>

                            <ul className="mt-2 space-y-2 sm:mt-4">
                                <li className="flex items-center gap-1 ">
                                    <Check
                                        color="green"
                                    />

                                    <span className="text-gray-700 text-sm"> Création et téléchargement illimité de CV </span>
                                </li>

                                <li className="flex items-center gap-1 ">
                                    <Check
                                        color="green"
                                    />

                                    <span className="text-gray-700 text-sm"> Accès à tous les modèles de CV </span>
                                </li>

                                <li className="flex items-center gap-1 ">
                                    <Check
                                        color="green"
                                    />

                                    <span className="text-gray-700 text-sm"> Acces aux opportunites de la plateforme </span>
                                </li>

                                <li className="flex items-center gap-1 ">
                                    <Check
                                        color="green"
                                    />

                                    <span className="text-gray-700 text-sm"> Hébergement en ligne du CV </span>
                                </li>

                                <li className="flex items-center gap-1 ">
                                    <Check
                                        color="green"
                                    />

                                    <span className="text-gray-700 text-sm"> Mise en avant du CV auprès des recruteurs </span>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-200 rounded-2xl border border-teal-500 shadow-sm">
                        <div className="p-6 sm:px-8">
                            <h2 className="text-lg font-medium text-gray-900">
                                Offre Entreprise
                                <span className="sr-only">Plan</span>
                            </h2>

                            <p className="mt-2 text-gray-700">Conçu pour les entreprises et recruteurs souhaitant optimiser leur processus de recrutement.</p>

                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> {plans[1].price} FCFA </strong>

                                <span className="text-sm font-medium text-gray-700">{plans[1].duration}</span>
                            </p>

                            <Link
                                className="mt-4 block rounded border border-teal-600 bg-teal-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                                href="https://me.fedapay.com/profile-app-recruter"  
                            >
                                Profiter de l&apos;offre entreprise
                            </Link>
                        </div>

                        <div className="p-6 sm:px-8">
                            <p className="text-lg font-medium text-gray-900 sm:text-xl">Ce qui est inclus :</p>

                            <ul className="mt-2 space-y-2 sm:mt-4">
                                <li className="flex items-center gap-1">
                                    <Check
                                        color="green"
                                    />

                                    <span className="text-gray-700"> Gestion et suivi des offres d&apos;emplois </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <Check
                                        color="green"
                                    />

                                    <span className="text-gray-700"> Accès à une base de candidats qualifiés</span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <Check
                                        color="green"
                                    />

                                    <span className="text-gray-700"> Création de listes de favoris </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <Check
                                        color="green"
                                    />

                                    <span className="text-gray-700"> Filtres avancés </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
