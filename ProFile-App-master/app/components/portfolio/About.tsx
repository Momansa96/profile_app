import React from 'react';
import Image from 'next/image';
import { personalDetailsPreset, skillsPreset, languagesPreset, hobbiesPreset } from '@/preset';
import { Skill } from "@/type";
import { Drama, Earth, GraduationCap, User } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
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
              src="/Avatar1.jpg"
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
              {personalDetailsPreset.description}
            </p>

            {/* Compétences */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-primary" /> Compétences
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillsPreset.map((skill: Skill) => (
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
              {languagesPreset.map((language) => (
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
              {hobbiesPreset.map((hobby) => (
                <li key={hobby.name}>{hobby.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
