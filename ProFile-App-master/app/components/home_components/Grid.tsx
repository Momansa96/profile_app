"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const hoverEffect = {
  scale: 1.05,
  boxShadow: "0 0 10px 3px rgba(14, 116, 144, 0.8)", // glow teal
  transition: { duration: 0.3, ease: "easeInOut" },
};

const Grid = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <motion.div
        className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          { src: "/bannerbg.jpeg", alt: "Image de presentation 1" },
          { src: "/Photo2.jpg", alt: "Image de presentation 2" },
          { src: "/bannerbg2.jpeg", alt: "Image de presentation 3" },
        ].map(({ src, alt }, index) => (
          <motion.div
            key={index}
            className="rounded-lg overflow-hidden object-cover cursor-pointer"
            variants={itemVariants}
            whileHover={hoverEffect}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={src}
              width={300}
              height={300}
              alt={alt}
              className="rounded-lg shadow-lg"
              priority={index === 0}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Plusieurs entreprises nous font confiance
          </motion.h2>

          <motion.p
            className="mt-4 text-gray-500 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            Ces entreprises nous font confiance pour simplifier leur processus de recrutement. Grâce à leur soutien,{" "}
            <span className="text-teal-500 underline">Profile</span> connecte les talents aux opportunités et propose une solution innovante pour la gestion du processus de recherche d’emploi.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Grid;