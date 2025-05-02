"use client";

import React from "react";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const buttonHover = {
  scale: 1.05,
  boxShadow: "0 0 10px rgba(14, 116, 144, 0.8)",
  transition: { duration: 0.3, ease: "easeInOut" },
};

const Features = () => {
  return (
    <motion.div
      className="flex flex-col justify-between gap-6 items-center my-8"
      id="features"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Section 1 */}
      <motion.div className="flex justify-center items-center" variants={fadeUp}>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <motion.div className="flex justify-end mr-2 max-w-xl max-h-full" variants={fadeUp}>
            <Image
              src="/features_jober.jpeg"
              width={350}
              height={350}
              alt="Image de presentation"
              className="rounded-xl shadow-lg"
            />
          </motion.div>
          <motion.div className="rounded-lg bg-gray-100/80 max-w-2xl" variants={fadeUp}>
            <div className="p-6 sm:p-8">
              <h3 className="text-3xl font-medium text-gray-900">
                Créez, personnalisez et partagez votre CV
              </h3>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                Gagnez du temps avec notre éditeur de CV en ligne intuitif.{" "}
                <span className="font-bold text-teal-700">ProFile</span> vous permet de concevoir un CV professionnel, de l&apos;exporter en PDF et de le partager en un clic avec les recruteurs.
              </p>

              <motion.ul className="mt-2" variants={containerVariants}>
                {[
                  "Modèles modernes et personnalisables",
                  "Sauvegarde automatique en ligne",
                  "Génération automatique de portfolio en ligne",
                  "Export PDF haute qualité",
                ].map((text, idx) => (
                  <motion.li
                    key={idx}
                    className="mb-2 flex gap-1 items-center"
                    variants={fadeUp}
                  >
                    <CircleCheck fill="green" color="white" width={20} />
                    {text}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }} className="mt-4 inline-flex">
                <Link
                  href="/sign-up"
                  className="btn group inline-flex items-center gap-1 text-sm font-medium text-teal-600 border-teal-700"
                >
                  Créer mon CV
                  <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                    &rarr;
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Section 2 */}
      <motion.div className="flex justify-center items-center" variants={fadeUp}>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <motion.div className="rounded-lg bg-gray-100/80 max-w-2xl" variants={fadeUp}>
            <div className="p-4 sm:p-6">
              <h3 className="text-3xl font-medium text-gray-900">
                Trouvez les talents qu’il vous faut
              </h3>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                Accédez à une base de profils qualifiés et filtrables selon vos critères de recherche.{" "}
                <span className="font-bold text-teal-700">ProFile</span> simplifie votre processus de recrutement en mettant à votre disposition des outils avancés pour identifier rapidement les candidats qui correspondent à vos besoins.
              </p>

              <motion.ul className="mt-2" variants={containerVariants}>
                {[
                  "Recherche avancée",
                  "Accès rapide aux CV",
                  "Système de favoris",
                  "Contact direct",
                ].map((text, idx) => (
                  <motion.li
                    key={idx}
                    className="mb-2 flex gap-1 items-center"
                    variants={fadeUp}
                  >
                    <CircleCheck fill="green" color="white" width={20} />
                    {text}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }} className="mt-4 inline-flex">
                <Link
                  href="/sign-up"
                  className="btn group inline-flex items-center gap-1 text-sm font-medium text-teal-600 border-teal-700"
                >
                  Trouver un Candidat
                  <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                    &rarr;
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          <motion.div className="flex justify-end mr-2 max-w-xl max-h-full" variants={fadeUp}>
            <Image
              src="/features_recruiter.jpeg"
              width={340}
              height={350}
              alt="Image de presentation"
              className="rounded-xl shadow-xl"
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Features;