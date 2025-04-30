"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { plans } from "@/plans";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const buttonHover = {
  scale: 1.04,
  boxShadow: "0 0 10px 2px rgba(14,116,144,0.4)",
  transition: { duration: 0.25 },
};

const Pricing = () => {
  return (
    <motion.div
      className="flex justify-center items-center flex-col mt-8"
      id="pricing"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex justify-center items-center flex-col">
        <motion.div
          className="text-teal-700 font-semibold text-2xl capitalize tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Plans
        </motion.div>
        <motion.p
          className="text-gray-600 text-center max-w-2xl mt-3 px-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Trouvez l&apos;offre qui vous convient et optimisez votre gestion de CV avec ProFile.
        </motion.p>
      </div>

      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8"
          variants={containerVariants}
        >
          {/* Carte Gratuite */}
          <motion.div
            className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm bg-white"
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 32px 0 rgba(14,116,144,0.14)" }}
          >
            <div className="p-6 sm:px-8">
              <h2 className="text-lg font-medium text-gray-900">Offre Gratuite</h2>
              <p className="mt-2 text-gray-700">
                Idéal pour les étudiants et jeunes diplômés souhaitant créer et partager leur CV en ligne.
              </p>
              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">0 FCFA</strong>
                <span className="text-sm font-medium text-gray-700">/Mois</span>
              </p>
              <motion.div whileHover={buttonHover} whileTap={{ scale: 0.97 }}>
                <Link
                  className="mt-4 block rounded border border-teal-600 bg-teal-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                  href="/sign-up"
                >
                  Commencer gratuitement
                </Link>
              </motion.div>
            </div>
            <div className="p-6 sm:px-8">
              <p className="text-lg font-medium text-gray-900 sm:text-xl">Ce qui est inclus :</p>
              <motion.ul className="mt-2 space-y-2 sm:mt-4">
                {[
                  { text: "Création et personnalisation du CV", ok: true },
                  { text: "Téléchargement en PDF", ok: true },
                  { text: "Hébergement en ligne du CV", ok: true },
                  { text: "Accès aux opportunités de la plateforme", ok: false },
                  { text: "Mise en avant du CV auprès des recruteurs", ok: false },
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-1"
                    variants={featureVariants}
                  >
                    {item.ok ? (
                      <Check color="green" />
                    ) : (
                      <X color="red" />
                    )}
                    <span className="text-gray-700 text-sm">{item.text}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          {/* Carte Candidat */}
          <motion.div
            className="divide-y divide-gray-200 rounded-2xl border border-teal-500 shadow-xs scale-105 bg-teal-100/40"
            variants={cardVariants}
            whileHover={{ scale: 1.06, boxShadow: "0 8px 32px 0 rgba(14,116,144,0.16)" }}
          >
            <div className="p-6 sm:px-8">
              <h2 className="text-lg font-medium text-gray-900">Offre Candidat</h2>
              <p className="mt-2 text-gray-700 text-left text-sm">
                Parfait pour les professionnels souhaitant maximiser leur visibilité auprès des recruteurs.
              </p>
              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {plans[0].price} FCFA
                </strong>
                <span className="text-sm font-medium text-gray-700">{plans[0].duration}</span>
              </p>
              <motion.div whileHover={buttonHover} whileTap={{ scale: 0.97 }}>
                <Link
                  className="mt-4 block rounded border border-teal-600 bg-teal-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                  href="https://me.fedapay.com/profile-app-souscription"
                >
                  Profiter de l&apos;offre Pro
                </Link>
              </motion.div>
            </div>
            <div className="p-6 sm:px-8">
              <p className="text-lg font-medium text-gray-900 sm:text-xl">Ce qui est inclus :</p>
              <motion.ul className="mt-2 space-y-2 sm:mt-4">
                {[
                  "Création et téléchargement illimité de CV",
                  "Accès à tous les modèles de CV",
                  "Accès aux opportunités de la plateforme",
                  "Hébergement en ligne du CV",
                  "Mise en avant du CV auprès des recruteurs",
                ].map((text, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-1"
                    variants={featureVariants}
                  >
                    <Check color="green" />
                    <span className="text-gray-700 text-sm">{text}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          {/* Carte Entreprise */}
          <motion.div
            className="divide-y divide-gray-200 rounded-2xl border border-teal-500 shadow-sm bg-white"
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 32px 0 rgba(14,116,144,0.14)" }}
          >
            <div className="p-6 sm:px-8">
              <h2 className="text-lg font-medium text-gray-900">Offre Entreprise</h2>
              <p className="mt-2 text-gray-700">
                Conçu pour les entreprises et recruteurs souhaitant optimiser leur processus de recrutement.
              </p>
              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {plans[1].price} FCFA
                </strong>
                <span className="text-sm font-medium text-gray-700">{plans[1].duration}</span>
              </p>
              <motion.div whileHover={buttonHover} whileTap={{ scale: 0.97 }}>
                <Link
                  className="mt-4 block rounded border border-teal-600 bg-teal-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                  href="https://me.fedapay.com/profile-app-recruter"
                >
                  Profiter de l&apos;offre entreprise
                </Link>
              </motion.div>
            </div>
            <div className="p-6 sm:px-8">
              <p className="text-lg font-medium text-gray-900 sm:text-xl">Ce qui est inclus :</p>
              <motion.ul className="mt-2 space-y-2 sm:mt-4">
                {[
                  "Gestion et suivi des offres d'emplois",
                  "Accès à une base de candidats qualifiés",
                  "Création de listes de favoris",
                  "Filtres avancés",
                ].map((text, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-1"
                    variants={featureVariants}
                  >
                    <Check color="green" />
                    <span className="text-gray-700 text-sm">{text}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Pricing;
