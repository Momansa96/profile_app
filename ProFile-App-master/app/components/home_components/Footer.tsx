"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

const footerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const navVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const backToTopHover = {
  scale: 1.15,
  boxShadow: "0 0 16px 2px rgba(13,148,136,0.7)", // teal glow
  backgroundColor: "rgba(13,148,136,0.85)",
  transition: { duration: 0.3 },
};

const Footer = () => {
  return (
    <motion.footer
      className="relative bg-teal-700/50 text-white py-6"
      variants={footerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        <motion.div
          className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div whileHover={backToTopHover} whileTap={{ scale: 0.95 }}>
            <Link
              className="inline-block rounded-full bg-teal-600 p-2 text-white shadow transition hover:bg-teal-500 sm:p-3 lg:p-4"
              href="#MainContent"
            >
              <span className="sr-only">Back to top</span>
              <ChevronUp width={30} height={30} color="white" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <motion.div
              className="flex justify-center text-teal-700 lg:justify-start"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
            >
              <Image
                src="/profile-app-logo.png"
                width={200}
                height={200}
                alt="Profile Logo"
              />
            </motion.div>
            <motion.p
              className="mx-auto mt-6 max-w-md text-center leading-relaxed text-white-500 lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              La plateforme qui vous aide à créer, partager et optimiser votre CV en ligne pour maximiser vos opportunités professionnelles
            </motion.p>
          </div>

          <motion.ul
            className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12"
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { href: "#", label: "Accueil" },
              { href: "#features", label: "Fonctionnalites" },
              { href: "#pricing", label: "Plans" },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              <motion.li key={item.href} variants={navItemVariants}>
                <Link className="text-white-700 transition hover:text-teal-700/75" href={item.href}>
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.p
          className="mt-12 text-center text-sm text-white-500 lg:text-right"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          © 2025 ProFile. Tous droits réservés. <br className="lg:hidden" />
          <Link href="/mention_legales" className="underline hover:text-white">
            Mentions légales
          </Link>{" "}
          |{" "}
          <Link href="/privacy_policy" className="underline hover:text-white">
            Politique de confidentialité
          </Link>
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;