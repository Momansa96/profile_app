import React from 'react';
import { BriefcaseBusiness, GraduationCap } from 'lucide-react';
import { educationsPreset, experiencesPreset } from '@/preset';
import { Experiences, Education } from "@/type";

const Skills = () => {
  return (
    <div id='skills' className='container mx-auto py-20 mt-9'>

      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold text-gray-800 pt-2 mb-12'>Mon parcours</h1>

        {/* Ligne de parcours */}
        <div className="relative w-full max-w-5xl ">
        <p className='text-center mb-9'>Ce parcours est le récit d&apos;une évolution constante, d&apos;une curiosité insatiable et d&apos;une passion pour l&apos;apprentissage. Découvrez les étapes marquantes qui ont façonné mon profil, des expériences enrichissantes aux formations déterminantes.</p>
          <div className="absolute h-[94%] hidden sm:block  border z-0 border-primary/50 dark:border-gray-700 start-1/2 transform -translate-x-1/2 "></div>
          
          {/* Expériences professionnelles */}
          <h2 className='text-left w-full text-lg font-semibold mb-4'>Expériences professionnelles</h2>

          {experiencesPreset.map((experience: Experiences, index) => (
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
          {educationsPreset.map((education: Education, index) => (
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
  )
}

export default Skills
