import React from 'react';
import Image from 'next/image'
import { personalDetailsPreset, skillsPreset, languagesPreset } from '@/preset';
import { Download, ExternalLink, Mail, SquareUserRound } from 'lucide-react';
const name = { personalDetailsPreset, skillsPreset, languagesPreset };

const Home: React.FC = () => {
  return (
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
              Je suis <span className="text-primary">{name.personalDetailsPreset.fullName}</span> <br />

            </h1>
            <p>{name.personalDetailsPreset.postSeeking}</p>
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
              {name.personalDetailsPreset.description}
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
            src={'/Avatar1.jpg'}
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
            <li >{name.skillsPreset.length}+</li>
            <li>Competences <span className="text-primary">maitrises</span></li>
            <br />
            <li >{name.languagesPreset.length}+</li>
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
  );
};

export default Home;
