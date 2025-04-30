"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Grid from "./Grid";
import ProfileBadge from "./ProfileBadge";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const buttonHover = {
  scale: 1.05,
  boxShadow: "0 0 8px rgba(14, 116, 144, 0.8)", // glow teal
  transition: { duration: 0.3, ease: "easeInOut" },
};

const Banner = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-lg px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <motion.div
          className="mx-auto max-w-xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-3xl font-extrabold sm:text-5xl"
            variants={fadeUp}
          >
            Concevez et partagez votre CV en toute{" "}
            <strong className="font-extrabold text-teal-700 sm:block">
              simplicité !
            </strong>
          </motion.h1>

          <motion.p className="mt-4 sm:text-xl/relaxed" variants={fadeUp}>
            Une plateforme intuitive pour créer, personnaliser et partager
            votre CV en ligne. Simplifiez votre recherche d’emploi et rendez-vous
            visible auprès des recruteurs.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-4"
            variants={containerVariants}
          >
            <motion.div variants={fadeUp}>
              <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#pricing"
                  className="block w-full rounded bg-teal-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring active:bg-teal-500 sm:w-auto"
                >
                  Créer mon CV
                </Link>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#pricing"
                  className="block w-full rounded px-12 py-3 text-sm font-medium text-teal-600 shadow hover:text-teal-700 focus:outline-none focus:ring active:text-teal-500 sm:w-auto"
                >
                  Découvrir les profils
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center mt-8 py-8"
            variants={fadeUp}
          >
            <ProfileBadge totalUsers={100} />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="flex justify-center flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      >
        <Grid />
      </motion.div>
    </section>
  );
};

export default Banner;
