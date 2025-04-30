"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loading() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-teal-700 to-teal-600 z-[9999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Cercle animé */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0.8, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#fff"
                strokeWidth="6"
                fill="none"
                strokeDasharray="250"
                strokeDashoffset="60"
                className="opacity-40"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="#fff"
                strokeWidth="3"
                fill="none"
                strokeDasharray="180"
                strokeDashoffset="30"
                className="opacity-80"
              />
            </svg>
            {/* Glow au centre */}
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-teal-400 blur-2xl opacity-80"></span>
          </motion.div>

          {/* Texte futuriste */}
          <motion.p
            className="text-white text-2xl font-bold tracking-widest uppercase drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          >
            Chargement en cours...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
