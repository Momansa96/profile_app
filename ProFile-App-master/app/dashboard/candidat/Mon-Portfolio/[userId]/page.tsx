"use client";
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { AlignRight, BriefcaseBusiness, Drama, Earth, GraduationCap, MapPin, Phone, User, Download, ExternalLink, Mail, SquareUserRound, X } from 'lucide-react';
import { CvData } from '@/type';
import { AnimatePresence, motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { getCvData } from '@/app/actions';
import emailjs from '@emailjs/browser'
import ModalSendMail from '@/app/components/portfolio/ModalSendMail';
import Link from 'next/link';




const PortfolioPage: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'skills', label: 'Parcours' },
    { id: 'contact', label: 'Contact' },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };
  const [cvData, setCvData] = useState<CvData | null>(null);
  const user = useUser();
  const clerkId = user.user?.id;

  const formRef = useRef<HTMLFormElement>(null);
  const [ModalMsg, setModalMsg] = useState<string | null>(null)
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formRef.current) return

    emailjs
      .sendForm(
        'service_fgmdlon',    // Remplace avec ton Service ID
        'template_bzxmmnr',   // Remplace avec ton Template ID
        formRef.current,
        'ibYKorkappAW7TGRi'     // Remplace avec ta clé publique
      )
      .then(() => {
        setModalMsg('Message envoyé avec succès 🎉')
        formRef.current?.reset()
      })
      .catch((error) => {
        console.error('Erreur :', error.text)
        setModalMsg("Erreur lors de l'envoi du message.")
      })
  }

  useEffect(() => {
    const fetchCvData = async () => {
      const data = await getCvData(clerkId ?? '');
      setCvData(data);
    };

    fetchCvData();

    const header = document.querySelector("header");

    const toggleClasses = (element: HTMLElement | null, classes: string[], condition: boolean) => {
      if (!element) return;
      classes.forEach((className) => {
        element.classList.toggle(className, condition);
      });
    };

    const handleScroll = () => {
      toggleClasses(
        header,
        [
          "shadow-xl",
          "dark:sm:bg-slate-900"
        ],
        window.scrollY > 50
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [clerkId]);

  if (!cvData) {
    return <p>Erreur : CV introuvable.</p>;
  }





  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="fixed w-full py-4 px-4 xl:px-8 z-50 backdrop-blur-lg bg-white/90 border-b border-teal-100 shadow-sm"
      >
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="size-12 bg-teal-700 text-white rounded-xl font-bold text-2xl flex items-center justify-center shadow-lg">
              {cvData?.personalDetails.fullName[0]}
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 group-hover:text-teal-700 transition-colors">
                {cvData?.personalDetails.fullName}
              </h4>
              <p className="text-sm text-gray-500">Mon portfolio</p>
            </div>
          </motion.div>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <motion.a
                    href={`#${item.id}`}
                    className="text-gray-600 hover:text-teal-700 font-medium relative group"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full" />
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-teal-700 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-teal-200/40 transition-shadow"
            >
              <Mail className="w-5 h-5" />
              Discutons
            </motion.a>
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-teal-700 transition-colors"
              aria-label="Menu"
            >
              <AlignRight className="w-8 h-8" />
            </button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm rounded-md z-50"
                  onClick={closeMobileMenu}
                >
                  <motion.nav
                    className="absolute right-5 top-5 h-[70vh] w-80 rounded-lg   bg-slate-200 p-8"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center mb-12">
                      <h3 className="text-2xl font-bold text-teal-800">Menu</h3>
                      <button
                        onClick={closeMobileMenu}
                        className="p-2 hover:bg-gray-100 rounded-xl"
                      >
                        <X className="w-8 h-8 text-gray-600" />
                      </button>
                    </div>

                    <ul className="space-y-6">
                      {navItems.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            onClick={closeMobileMenu}
                            className="text-lg text-gray-700 hover:text-teal-700 px-4 py-3 block rounded-xl hover:bg-teal-50 transition-colors"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#contact"
                      className="mt-12 w-full px-6 py-4 bg-teal-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Mail className="w-6 h-6" />
                      Contactez-moi
                    </a>
                  </motion.nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </motion.header>
      <div>
        <section
          id="home"
          style={{
            backgroundImage: `url(https://preline.co/assets/svg/examples/polygon-bg-element.svg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="min-h-screen container relative overflow-hidden grid place-items-center before:absolute before:top-0 before:left-1/2 before:bg-heroLight before:bg-no-repeat before:bg-top before:w-full before:h-full before:-z-10 before:-translate-x-1/2 dark:before:bg-heroDark"
        >
          <div className="w-full pt-24 max-w-7xl grid md:grid-cols-6 gap-6 items-center justify-around h-full">
            {/* Texte d’intro */}
            <div className="md:col-span-3 lg:col-span-2 text-center md:text-left sm:pl-4">
              <h5 className="font-medium text-gray-600 dark:text-gray-300 mb-2">
                Salut et bienvenue !
              </h5>
              <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white leading-tight mb-4">
                Je suis{" "}
                <span className="text-teal-700 font-extrabold">
                  {cvData?.personalDetails.fullName}
                </span>
              </h1>
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-md">
                {cvData?.personalDetails.postSeeking}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button className="flex items-center gap-2 bg-teal-700 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-primary-dark transition">
                  <Mail className="w-5 h-5" />
                  Contact
                </button>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-gray-700 hover:border-primary transition"
                >
                  Visiter mon profil
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-start gap-4 mt-10 max-w-md mx-auto md:mx-0">
                <SquareUserRound className="hidden md:block w-32 text-teal-700" />
                <p className="text-sm leading-relaxed text-justify text-gray-600 dark:text-gray-400">
                  {cvData?.personalDetails.description}
                </p>
              </div>

              {/* Réseaux sociaux */}
              <div className="mt-10 flex items-center gap-6 text-gray-600 dark:text-gray-300">
                <span className="text-xs uppercase tracking-wider">Suivez-moi</span>
                <div className="flex gap-4">
                  {/* Facebook */}
                  <a href="#" aria-label="Facebook" className="social-icon hover:text-teal-700 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a href="#" aria-label="LinkedIn" className="social-icon hover:text-teal-700 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-linkedin"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  {/* GitHub */}
                  <a href="#" aria-label="GitHub" className="social-icon hover:text-teal-700 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-github"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Image Profil */}
            <div className="md:col-span-3 lg:col-span-2 w-full max-w-[380px] mx-auto">
              <Image
                src="/profile.png"
                alt="Photo du Portfolio"
                width={400}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full"
                priority
              />
            </div>

            {/* Statistiques & CV */}
            <div className="md:col-span-6 lg:col-span-2 bg-gradient-to-l from-gray-100 to-transparent dark:from-slate-800 p-8 rounded-lg h-96 flex flex-col justify-center items-center gap-6 text-center">
              <ul className="grid grid-cols-2 gap-4 w-full text-gray-700 dark:text-gray-300">
                <li className="text-4xl font-extrabold">{cvData?.skills.length}+</li>
                <li className="text-left self-center font-semibold">
                  Compétences <br />
                  <span className="text-teal-600">maîtrisées</span>
                </li>
                <li className="text-4xl font-extrabold">{cvData?.languages.length}+</li>
                <li className="text-left self-center font-semibold">
                  Langues <br />
                  <span className="text-teal-600">parlées</span>
                </li>
              </ul>
              <button className="mt-6 px-6 py-3 bg-white dark:bg-slate-800 border-2 border-teal-600 dark:border-gray-300 rounded-lg font-bold shadow-lg hover:bg-teal-600 hover:text-white transition">
                <Download className="inline-block w-5 h-5 mr-2" />
                Télécharger CV
              </button>
            </div>
          </div>
        </section>
        <section
          id="about"
          className="relative pt-24 overflow-hidden"
          style={{ background: "radial-gradient(circle at 10% 20%, rgba(5, 150, 105, 0.05), transparent 40%)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                <User className="w-10 h-10 text-teal-700 animate-bounce-slow" />
                À Propos de Moi
              </h2>
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image Column */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative h-[500px] w-full rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl"
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/30 to-black/60" />
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-700 via-teal-300 to-transparent z-20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                <Image
                  src="/profile.png"
                  alt="Photo de profil"
                  fill
                  className="object-cover object-top scale-105 hover:scale-100 transition-transform duration-500"
                  quality={100}
                />
              </motion.div>

              {/* Text Column */}
              <div className="space-y-8">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                    {cvData?.personalDetails.description}
                  </p>
                </motion.div>

                {/* Compétences */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <GraduationCap className="w-8 h-8 text-teal-700" />
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Compétences</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {cvData?.skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-primary/10 text-teal-600 rounded-full text-sm font-medium border border-primary/20 hover:bg-teal-700 hover:text-white transition-colors"
                      >
                        {skill.name}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Langues & Loisirs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Langues */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Earth className="w-8 h-8 text-teal-700" />
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Langues</h3>
                    </div>
                    <ul className="space-y-3">
                      {cvData?.languages.map((language) => (
                        <li key={language.name} className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300">{language.name}</span>
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-teal-600"
                              style={{ width: `${language.proficiency}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Loisirs */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Drama className="w-8 h-8 text-teal-700" />
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Loisirs</h3>
                    </div>
                    <ul className="grid grid-cols-2 gap-3">
                      {cvData?.hobbies.map((hobby) => (
                        <li key={hobby.name} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <span className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0" />
                          {hobby.name}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Effet de particules */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100],
                  opacity: [0.5, 0],
                  scale: [1, 2],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear",
                }}
              />
            ))}
          </motion.div>
        </section>
        <section
          id="skills"
          className="relative pt-24 overflow-hidden bg-gradient-to-b from-white/50 to-transparent dark:from-slate-900/50"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Mon Parcours Professionnel
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Ce parcours est le récit d&apos;une évolution constante, d&apos;une curiosité insatiable et
                d&apos;une passion pour l&apos;apprentissage.
              </p>
            </motion.div>

            {/* Timeline Container */}
            <motion.div
              className="relative"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
            >
              {/* Timeline Line */}
              <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-teal-700 via-primary/50 to-transparent hidden md:block" />

              {/* Experiences */}
              <div className="space-y-12 md:space-y-24">
                {/* Expériences Professionnelles */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
                    <BriefcaseBusiness className="w-8 h-8 text-teal-700" />
                    Expériences Professionnelles
                  </h2>

                  <div className="space-y-8">
                    {cvData.experiences.map((experience, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className={`group relative md:max-w-[calc(50%-80px)] ${index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                          }`}
                      >
                        <div className="md:absolute md:inset-0 flex items-center">
                          <div className={`hidden md:block absolute ${index % 2 === 0 ? "-left-24" : "-right-24"} top-6`}>
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                              <BriefcaseBusiness className="w-8 h-8 text-teal-700 group-hover:scale-110 transition-transform" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-shadow">
                          <motion.div
                            whileHover={{ translateX: index % 2 === 0 ? 10 : -10 }}
                            className="space-y-3"
                          >
                            <h3 className="text-xl font-semibold text-teal-700">{experience.jobTitle}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                              <span>{experience.companyName}</span>
                              <span className="w-1 h-1 bg-gray-400 rounded-full" />
                              <span>{experience.startDate} - {experience.endDate}</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-200">{experience.description}</p>

                            <ul className="space-y-2 mt-4">
                              {experience.tasks?.map((task, taskIndex) => (
                                <li
                                  key={taskIndex}
                                  className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                                >
                                  <span 
      className="w-2 h-2 bg-teal-700 rounded-full mt-2 flex-shrink-0" 
      aria-hidden="true"
    ></span>
                                  <span>{task.content}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Formations */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
                    <GraduationCap className="w-8 h-8 text-teal-700" />
                    Parcours Académique
                  </h2>

                  <div className="space-y-8">
                    {cvData.educations.map((education, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className={`group relative md:max-w-[calc(50%-80px)] ${index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                          }`}
                      >
                        <div className="md:absolute md:inset-0 flex items-center">
                          <div className={`hidden md:block absolute ${index % 2 === 0 ? "-left-24" : "-right-24"} top-6`}>
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                              <GraduationCap className="w-8 h-8 text-teal-700 group-hover:scale-110 transition-transform" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-shadow">
                          <motion.div
                            whileHover={{ translateX: index % 2 === 0 ? 10 : -10 }}
                            className="space-y-3"
                          >
                            <h3 className="text-xl font-semibold text-teal-700">{education.degree}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                              <span>{education.school}</span>
                              <span className="w-1 h-1 bg-gray-400 rounded-full" />
                              <span>{education.startDate} - {education.endDate}</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-200">{education.description}</p>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Effet de particules */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100],
                    opacity: [0.5, 0],
                    scale: [1, 2],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "linear",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </section>
        <section
          id="contact"
          className="container relative max-w-4xl mx-auto min-h-screen flex items-center justify-center px-5 mt-9 pt-20"
        >
          <div className="pb-10">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-teal-600 pt-2 mb-4">Contactez-moi</h3>
              <p className="px-4 mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                N&apos;hésitez pas à prendre contact. Je suis ouvert aux discussions, aux propositions de projets et aux opportunités de collaboration.
              </p>
            </div>
            <div
              className="mt-12 md:relative flex flex-col gap-5 sm:max-w-full mx-auto max-w-xs"
            >
              <div
                className="dark:bg-slate-800 bg-white border border-gray-200 dark:border-gray-700 dark:text-gray-100 text-gray-800 rounded-2xl shadow-2xl mx-auto md:w-2/3 py-14 px-7 w-full"
              >
                <h3 className="font-semibold text-3xl mb-4">
                  Envoyez un <br /><span className="text-teal-700">Message</span>
                </h3>
                <form
                  ref={formRef}
                  onSubmit={handleSendEmail}
                  className="*:flex *:flex-col *:gap-1 mt-5 md:w-2/3 w-full"
                >
                  <div>
                    <label htmlFor="name" className="font-medium">Nom</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="Entrez votre nom"
                      className="border dark:border-gray-500 rounded-md placeholder:text-sm font-Poppins outline-none py-2 px-3 mb-4 resize-none bg-transparent shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="font-medium">Adresse Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="Entrez votre adresse email"
                      className="border dark:border-gray-500 rounded-md placeholder:text-sm font-Poppins outline-none py-2 px-3 mb-4 resize-none bg-transparent shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="msg" className="font-medium">Message</label>
                    <textarea
                      id="msg"
                      name="message"
                      required
                      placeholder="Entrez votre message"
                      className="border dark:border-gray-500 rounded-md placeholder:text-sm font-Poppins outline-none py-2 px-3 mb-4 resize-none bg-transparent shadow-sm focus:border-primary focus:ring-primary"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-3 shadow-xl z-10 inline-flex items-center gap-2 w-fit duration-300 rounded-md bg-teal-600 hover:bg-teal-700 text-white font-medium ml-auto"
                  >
                    Envoyer
                  </button>
                  {ModalMsg && (
                    <ModalSendMail message={ModalMsg} onClose={() => setModalMsg(null)} />
                  )}
                </form>
              </div>
              <div
                className="bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-700 py-12 px-7 md:absolute lg:-right-9 right-28 rounded-2xl shadow-2xl md:w-2/5 h-5/6 top-28 w-full mx-auto"
              >
                <h3 className="font-semibold text-2xl border-b pb-4 border-gray-600 dark:text-gray-100">
                  Retrouvez-moi <br />partout <span className="text-teal-700">.</span>
                </h3>
                <div className="py-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-5">
                    N&apos;hésitez pas à me contacter directement en utilisant les informations ci-dessous.
                  </p>
                  <ul className="*:flex *:gap-4 *:items-center *:mt-4">
                    <li>
                      <MapPin className="text-gray-500 dark:text-gray-300" />
                      <div>
                        <h2 className="text-base font-semibold dark:text-gray-100">Adresse</h2>
                        <address className="text-xs text-gray-600 dark:text-gray-400">{cvData?.personalDetails.address}</address>
                      </div>
                    </li>
                    <li>
                      <Mail className="text-gray-500 dark:text-gray-300" />
                      <div>
                        <h2 className="text-base font-semibold dark:text-gray-100">Email</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{cvData?.personalDetails.email}</p>
                      </div>
                    </li>
                    <li>
                      <Phone className="text-gray-500 dark:text-gray-300" />
                      <div>
                        <h2 className="text-base font-semibold dark:text-gray-100">Telephone</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{cvData?.personalDetails.phone}</p>
                      </div>
                    </li>
                  </ul>
                  <div
                    className="flex items-center md:justify-end justify-center dark:text-gray-200 text-gray-600 gap-6 mt-9"
                  >
                    <p className="text-xs">Suivez-moi</p>
                    <div className="flex justify-end gap-3">
                      <a href="#" className="social-icon hover:text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>

                      </a>
                      <a href="#" className="social-icon hover:text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>

                      </a>
                      <a href="#" className="social-icon hover:text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">
            <div>
              <a className="flex-none text-xl font-semibold text-black focus:outline-none" href="#home" aria-label="Brand">{cvData?.personalDetails.fullName}</a>
            </div>


            <ul className="text-center">
            <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300">
                <Link className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800" href="#home">
                  Accueil
                </Link>
              </li>
              <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300">
                <Link className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800" href="#about">
                  A propos
                </Link>
              </li>
              <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300">
                <Link className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800" href="#skills">
                  Parcours
                </Link>
              </li>
              <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300">
                <Link className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800" href="#contact">
                  Contact
                </Link>
              </li>
            </ul>



            <div className="md:text-end space-x-2">
              <a className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </a>

            </div>

          </div>

        </footer>
      </div>
    </>
  );
}

export default PortfolioPage;

