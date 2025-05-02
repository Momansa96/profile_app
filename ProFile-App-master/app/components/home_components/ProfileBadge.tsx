"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProfileBadgeProps {
  totalUsers: number;
}

const avatars = [
  { src: "/Avatar1.jpg", alt: "Avatar 1" },
  { src: "/Avatar2.jpg", alt: "Avatar 2" },
  { src: "/Avatar3.jpg", alt: "Avatar 3" },
  { src: "/Avatar4.jpg", alt: "Avatar 4" },
  { src: "/Avatar5.jpg", alt: "Avatar 5" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const avatarVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const hoverEffect = {
  scale: 1.2,
  boxShadow: "0 0 8px 2px rgba(14, 116, 144, 0.8)", // glow teal
  transition: { duration: 0.3, ease: "easeInOut" },
};

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6 } },
};

const ProfileBadge: React.FC<ProfileBadgeProps> = ({ totalUsers }) => {
  return (
    <motion.div
      className="flex items-center space-x-3 px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex -space-x-2">
        {avatars.map(({ src, alt }, index) => (
          <motion.div
            key={index}
            className="rounded-full border-2 border-white cursor-pointer"
            variants={avatarVariants}
            whileHover={hoverEffect}
          >
            <Image
              src={src}
              width={32}
              height={32}
              alt={alt}
              className="rounded-full"
              priority={index === 0} // Priorité pour le premier avatar
            />
          </motion.div>
        ))}
      </div>
      <motion.span
        className="text-gray-600 text-sm lowercase select-none"
        variants={textVariants}
      >
        +{totalUsers} utilisateurs
      </motion.span>
    </motion.div>
  );
};

export default ProfileBadge;