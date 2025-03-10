import React from 'react';
import { personalDetailsPreset } from '@/preset'; // Assure-toi que le chemin est correct
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
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
            <form className="*:flex *:flex-col *:gap-1 mt-5 md:w-2/3 w-full">
              <div className="">
                <label htmlFor="name" className="font-medium">Nom</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Entrez votre nom"
                  className="border dark:border-gray-500 rounded-md placeholder:text-sm font-Poppins outline-none py-2 px-3 mb-4 resize-none bg-transparent shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="">
                <label htmlFor="email" className="font-medium">Adresse Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Entrez votre adresse email"
                  className="border dark:border-gray-500 rounded-md placeholder:text-sm font-Poppins outline-none py-2 px-3 mb-4 resize-none bg-transparent shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="">
                <label htmlFor="msg" className="font-medium">Message</label>
                <textarea
                  id="msg"
                  placeholder="Entrez votre message"
                  className="border dark:border-gray-500 rounded-md placeholder:text-sm font-Poppins outline-none py-2 px-3 mb-4 resize-none bg-transparent shadow-sm focus:border-primary focus:ring-primary"
                ></textarea>
              </div>
              <button className="px-4 py-3 shadow-xl z-10 inline-flex items-center gap-2 w-fit duration-300 rounded-md bg-primary hover:bg-blue-700 text-white font-medium ml-auto">
                Envoyer
              </button>
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
                    <address className="text-xs text-gray-600 dark:text-gray-400">{personalDetailsPreset.address}</address>
                  </div>
                </li>
                <li>
                  <Mail className="text-gray-500 dark:text-gray-300" />
                  <div>
                  <h2 className="text-base font-semibold dark:text-gray-100">Email</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{personalDetailsPreset.email}</p>
                  </div>
                </li>
                <li>
                  <Phone className="text-gray-500 dark:text-gray-300" />
                  <div>
                  <h2 className="text-base font-semibold dark:text-gray-100">Telephone</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{personalDetailsPreset.phone}</p>
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
  );
};

export default Contact;
