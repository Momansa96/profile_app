"use client";

import React from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const logos = [
  { src: "/eigLogo.png", alt: "Logo EIG" },
  { src: "/emLogo.png", alt: "Logo EM" },
  { src: "/emvLogo.png", alt: "Logo EMV" },
  { src: "/esdamLogo.png", alt: "Logo ESDAM" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Logo = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      boxShadow: [
        "0 0 10px 2px rgba(14, 116, 144, 0.8)",
        "0 0 20px 6px rgba(14, 116, 144, 1)",
        "0 0 10px 2px rgba(14, 116, 144, 0.8)",
      ],
      transition: { duration: 3, repeat: Infinity, repeatType: "loop" },
    });
  }, [controls]);

  return (
    <motion.div
      className="flex justify-center items-center bg-teal-500/70 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl">
        {logos.map(({ src, alt }, index) => (
          <motion.div
            key={index}
            className="flex flex-col justify-center items-center rounded-lg p-4 cursor-pointer relative overflow-hidden"
            variants={itemVariants}
            animate={controls}
            whileHover={{
              scale: 1.15,
              rotate: [0, 5, -5, 0],
              transition: { duration: 1, repeat: Infinity, repeatType: "mirror" },
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{
                background:
                  "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                transform: "skewX(-20deg)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <Image src={src} width={140} height={140} alt={alt} className="relative z-10" />
          </motion.div>
        ))}
      </dl>
    </motion.div>
  );
};

export default Logo;
