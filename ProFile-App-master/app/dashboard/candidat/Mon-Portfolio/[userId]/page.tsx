"use client";
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { AlignRight, BriefcaseBusiness, Drama, Earth, GraduationCap, MapPin, Phone, User, Download, ExternalLink, Mail, SquareUserRound } from 'lucide-react';
import { CvData, Education, Experiences, Skill } from '@/type';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { getCvData } from '@/app/actions';
import emailjs from '@emailjs/browser'
import ModalSendMail from '@/app/components/portfolio/ModalSendMail';




const PortfolioPage: React.FC = () => {
  const [cvData, setCvData] = useState<CvData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };



  return (
    <>
      <header
        id='home'
        className="fixed xl:block w-full py-4 lg:px-2 px-4 z-[999] duration-300 bg-slate-300 rounded-lg "
      >
        <nav className="flex justify-between items-center max-w-6xl mx-auto px-2">
          <div className="flex gap-4 items-center">
            <div
              className="bg-primary text-white rounded-full size-10 text-xl grid place-items-center"
            >
              {cvData?.personalDetails.fullName[0]}
            </div>
            <div>
              <h4 className="font-bold text-lg uppercase">{cvData?.personalDetails.fullName}</h4>
              <p className="text-xs">Portfolio</p>
            </div>
          </div>

          {/* Menu desktop */}
          <ul className="gap-10 md:flex hidden hover:*:text-primary *:duration-200">
            <li>
              <a href="#home">Accueil</a>
            </li>
            <li>
              <a href="#about">A propos</a>
            </li>
            <li>
              <a href="#skills"> Mon parcours</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>

          </ul>
          <div className="flex items-center gap-2 ">
            <a href="#contact">
              <button className="px-3 py-2.5 hidden shadow-xl z-10  items-center gap-2 w-fit duration-300 border-2 border-gray-600 dark:text-gray-100  text-gray-600 leading-6 dark:bg-slate-800 bg-white  rounded-lg font-bold  md:flex">
                Discutons
              </button>
            </a>

          </div>

          {/* Bouton hamburger pour mobile */}
          <button
            className="block md:hidden"
            onClick={toggleMobileMenu}
          >
            <AlignRight className="w-8" />
          </button>

          {/* Menu mobile */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-gray-200 mx-4 my-1 absolute right-0 top-20 w-[50%] rounded-xl overflow-hidden shadow-lg menu-container">
              <nav aria-label="Mobile Navigation">
                <ul className="flex flex-col gap-6 text-sm bg-gray-100 p-3">
                  <li>
                    <a href="#home">Accueil</a>
                  </li>
                  <li>
                    <a href="#about">A propos</a>
                  </li>
                  <li>
                    <a href="#skills"> Mon parcours</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
          )}


        </nav>
      </header>
      <div>
        <section
          id="home"
          style={{
            backgroundImage: `url(https://preline.co/assets/svg/examples/polygon-bg-element.svg)`,
            backgroundSize: 'cover',
          }}
          className="min-h-screen container grid place-items-center relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-heroLight before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-heroDark"
        >
          <div
            id='home'
            className="w-full pt-20 grid md:grid-cols-6 h-full items-center max-w-7xl justify-around gap-3"
          >
            <div
              className="lg:col-span-2 sm:pl-2 md:col-span-3 md:text-left text-center"
            >
              <div>
                <h5 className="font-medium text-gray-600 dark:text-gray-200">
                  Salut et bienvenue !
                </h5>
                <h1
                  className="sm:text-5xl text-4xl dark:text-white !leading-normal relative font-medium"
                >
                  Je suis <span className="text-primary">{cvData?.personalDetails.fullName}</span> <br />

                </h1>
                <p>{cvData?.personalDetails.postSeeking}</p>
                <button className="px-3 py-2.5 shadow-xl z-10 inline-flex items-center gap-2 w-fit duration-300 rounded bg-primary border-2 border-primary text-white mt-5">
                  <Mail
                    className='w-4'
                  /> Contact
                </button>
                <button
                  className="font-semibold inline-flex items-center gap-2  dark:text-gray-200 border-b-2 border-gray-700 ml-4"
                >
                  Visiter mon profil
                  <ExternalLink
                    className='w-4'
                  />
                </button>
              </div>
              <div className="md:w-96 md:ml-auto flex mt-9 gap-2 dark:text-gray-300">
                <SquareUserRound
                  className=" mt-0.5 md:inline-block hidden w-32" />
                <p className="text-xs text-balance text-justify leading-5 max-w-md px-2 mx-auto">
                  {cvData?.personalDetails.description}
                </p>
              </div>
              <div
                className="flex items-center w-full  md:justify-start justify-start dark:text-gray-200 text-gray-600 gap-6 mt-9"
              >
                <p className="text-xs">Suivez moi</p>
                <div className="flex justify-start gap-3">
                  <a href="#" className="social-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                  </a>
                  <a href="#" className="social-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                  </a>
                  <a href="#" className="social-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 md:col-span-3 w-[380px]">
              <Image
                src="/profile.png"
                width={400}
                height={400}
                className="w-full mx-auto md:w-full max-w-80 md:mt-0 mt-5 rounded-lg"
                alt="Photo du Portfolio"
              />
            </div>
            <div
              className="lg:col-span-2 md:col-span-6 lg:bg-gradient-to-l md:bg-none  bg-gradient-to-l dark:from-slate-800 from-gray-100 lg:h-96 md:h-auto h-96 w-auto"
            >
              <ul
                className="text-2xl data-[slot=count]:*:text-3xl data-[slot=count]:*:font-bold leading-[3.14rem] text-center pt-5 lg:block md:flex items-center justify-between"
              >
                <li >{cvData?.skills.length}+</li>
                <li>Competences <span className="text-primary">maitrises</span></li>
                <br />
                <li >{cvData?.languages.length}+</li>
                <li>Langues <span className="text-primary">parles</span></li>
                <li>
                  <button className="border-2 border-gray-600 dark:text-gray-100  text-gray-600 shadow-xl leading-6 dark:bg-slate-800 bg-white  rounded-lg font-bold lg:mt-10 md:mt-0 mt-10 px-3 py-2.5 z-10 inline-flex items-center gap-2 w-fit duration-300">
                    <Download /> Telecharger CV
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section id="about" className="flex items-center justify-center">
          <div className="flex flex-col max-w-screen-lg w-full  gap-2 items-center justify-center">

            <div className='flex flex-col justify-between items-center md:flex-row gap-2 w-full'>
              {/* Image */}
              <div className="relative h-[450px] w-[380px] rounded-xl shadow-xl overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-primary to-transparent shadow-md z-10"
                  animate={{ y: ['-100%', '5000%'] }}
                  transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                />
                <Image
                  src="/profile.png"
                  width={400}
                  height={400}
                  alt="Photo de Mohamed Gnahoui"
                  className="object-cover w-[380px] h-full rounded-lg"
                />
              </div>

              {/* Contenu principal */}
              <div className="flex flex-col px-6 sm:w-1/2 gap-2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <User className="w-8 h-8 text-primary" /> À Propos de Moi
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {cvData?.personalDetails.description}
                </p>

                {/* Compétences */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-primary" /> Compétences
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {cvData?.skills.map((skill: Skill) => (
                      <span
                        key={skill.name}
                        className="bg-primary text-white rounded-full px-3 py-1 text-sm font-medium hover:bg-blue-600 transition duration-300"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>


              </div>
            </div>

            <div className='flex flex-col justify-between sm:flex-row gap-4 w-full '>
              {/* Langues */}
              <div className="mb-6 rounded-lg bordered border-r-2 border-gray-200 p-4 shadow-lg sm:w-1/2">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                  <Earth className="w-6 h-6 text-primary" /> Langues
                </h3>
                <ul>
                  {cvData?.languages.map((language) => (
                    <li key={language.name} className="flex justify-between text-gray-600 dark:text-gray-400 text-sm mb-2">
                      <span>{language.name}</span>
                      <span className="font-medium">{language.proficiency}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Loisirs */}
              <div className='mb-6 rounded-lg bordered border-l-2 border-gray-200 p-4 shadow-lg sm:w-1/2'>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                  <Drama className="w-6 h-6 text-primary" /> Loisirs
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
                  {cvData?.hobbies.map((hobby) => (
                    <li key={hobby.name}>{hobby.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div id='skills' className='container mx-auto py-20 mt-9'>

          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold text-gray-800 pt-2 mb-12'>Mon parcours</h1>

            {/* Ligne de parcours */}
            <div className="relative w-full max-w-5xl ">
              <p className='text-center mb-9'>Ce parcours est le récit d&apos;une évolution constante, d&apos;une curiosité insatiable et d&apos;une passion pour l&apos;apprentissage. Découvrez les étapes marquantes qui ont façonné mon profil, des expériences enrichissantes aux formations déterminantes.</p>
              <div className="absolute h-[94%] hidden sm:block  border z-0 border-primary/50 dark:border-gray-700 start-1/2 transform -translate-x-1/2 "></div>

              {/* Expériences professionnelles */}
              <h2 className='text-left w-full text-lg font-semibold mb-4'>Expériences professionnelles</h2>

              {cvData.experiences.map((experience: Experiences, index) => (
                <div key={index} className={`mb-8 flex items-start gap-2 z-20 ${index % 2 === 0 ? 'md:justify-end flex-row-reverse ' : 'md:justify-end  '}`}>
                  <div className="relative size-8 flex justify-center items-center bg-white dark:bg-slate-950 rounded-full shadow-xl">
                    <BriefcaseBusiness className="text-primary" />
                  </div>
                  <div className={`ms-4 md:ms-0 md:me-4 p-6  rounded-lg shadow-xl w-full md:w-1/2 ${index % 2 === 0 ? 'text-left' : 'text-left'}`}>
                    <h3 className="text-sm font-semibold text-primary">{experience.jobTitle}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{experience.companyName}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{experience.startDate} - {experience.endDate}</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 mt-2">{experience.description}</p>
                    <ul className="list-disc ms-6 mt-3 space-y-1.5">
                      {experience.tasks && experience.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="ps-1 text-sm text-gray-600 dark:text-gray-400">{task.content}</li>

                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {/* Formation */}
              <h3 className='text-left w-full text-lg font-semibold mb-4'>Ma formation</h3>
              {cvData?.educations.map((education: Education, index) => (
                <div key={index} className={`mb-8 flex items-start gap-2  ${index % 2 === 0 ? 'md:justify-end flex-row-reverse ' : 'md:justify-end  '}`}>
                  <div className=" size-8 flex justify-center items-center bg-white dark:bg-slate-900 rounded-full shadow-md">
                    <GraduationCap className="text-primary" />
                  </div>
                  <div className={`ms-4 md:ms-0 md:me-4 p-6 rounded-lg z-20 shadow-lg w-full md:w-1/2 ${index % 2 !== 0 ? 'text-left' : 'text-left'}`}>
                    <h3 className="text-sm font-semibold text-primary">{education.degree}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{education.school}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{education.startDate} - {education.endDate}</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 mt-2">{education.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <section
          id="contact"
          className="container relative max-w-4xl mx-auto min-h-screen flex items-center justify-center px-5 mt-9 pt-10"
        >
          <div className="pb-10">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-gray-800 pt-2 mb-4">Contactez-moi</h3>
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
                  Envoyez un <br /><span className="text-primary">Message</span>
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
                    className="px-4 py-3 shadow-xl z-10 inline-flex items-center gap-2 w-fit duration-300 rounded-md bg-primary hover:bg-blue-700 text-white font-medium ml-auto"
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
                  Retrouvez-moi <br />partout <span className="text-primary">.</span>
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
                <a className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800" href="#about">
                  A propos
                </a>
              </li>
              <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300">
                <a className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800" href="#story">
                  Parcours
                </a>
              </li>
              <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300">
                <a className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800" href="#contact">
                  Contact
                </a>
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


