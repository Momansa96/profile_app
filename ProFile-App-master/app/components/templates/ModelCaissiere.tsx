import { Education, Experiences, Hobby, Language, PersonalDetails, Skill } from '@/type';
import React from 'react'
import Image from 'next/image'
import { Globe, Mail, Smartphone } from 'lucide-react';

type Props = {
    personalDetails: PersonalDetails;
    file: File | null;
    theme: string;
    experiences: Experiences[];
    educations: Education[];
    languages: Language[];
    skills: Skill[];
    hobbies: Hobby[];
    download?: boolean;
    ref?: React.RefObject<HTMLDivElement>;
}


const getProficiencyValue = (level: string) => {
    switch (level) {
        case 'Débutant':
            return 33; 
        case 'Intermédiaire':
            return 66;
        case 'Avancé':
            return 100;
        default:
            return 0;
    }
};
const ModelCaissiere: React.FC<Props> = ({ personalDetails, file, experiences, educations, skills, languages, theme, download, ref }) => {
    return (
        <div ref={ref} className={` flex  w-[950px] shadow-lg ${download ? 'mb-10' : ''}`} data-theme={theme}>
            <div className='flex  w-full h-full px-10 bg-white relative'>

                <div className='flex justify-start gap-28 items-center  w-full h-56 absolute top-14 left-0 bg-slate-800 py-8 px-20'>
                    <div className='h-44 w-44 rounded-full  overflow-hidden  '>
                        {file && (
                            <Image
                                src={URL.createObjectURL(file)}
                                width={250}
                                height={250}
                                className='w-full h-full rounded-lg object-cover'
                                alt="Picture of the author"
                                onLoadingComplete={() => {
                                    if (typeof file !== 'string') {
                                        URL.revokeObjectURL(URL.createObjectURL(file))
                                    }
                                }}
                            />
                        )}
                    </div>
                    <div className='flex flex-col items-start justify-start gap-2'>
                        <h1 className='text-primary capitalize text-4xl font-semibold'>{personalDetails.fullName}</h1>
                        <h3 className='text-white text-2xl'>{personalDetails.postSeeking}</h3>
                    </div>
                </div>
                <div className='w-1/3 bg-rose-500/25 px-8 pt-80 h-full '>
                    <div className='flex flex-col gap-6 text-slate-600 text-sm text-balance'>
                        <div className='flex gap-2'><Globe width={25} height={30} className='text-primary' />{personalDetails.address}</div>
                        <div className='flex items-center gap-2'><Smartphone width={25} height={30} className='text-primary' />{personalDetails.phone}</div>
                        <div className='flex items-center gap-2'><Mail width={25} height={30} className='text-primary' />{personalDetails.email}</div>
                    </div>

                    <div className='flex flex-col gap-2 mt-8'>
                        <h1 className='text-primary font-bold text-xl'>Formation</h1>
                        {educations.map((education, index) => (
                            <div key={index} className='flex flex-col justify-start items-start text-slate-600'>
                                <h3 className=' text-primary font-bold'>Diplome</h3>
                                <p className='text-sm'>{education.endDate.substring(0, 4)} / {education.school}</p>
                                <p className='font-semibold'>{education.degree}</p>
                            </div>))
                        }
                    </div>

                    <div>
                        <h1 className='text-primary text-xl font-bold'>Competences</h1>
                        <div className='flex flex-col space-y-2'>
                            {skills.map((skill, index) => (
                                <div key={index} className='flex flex-col items-start'>
                                    <span className='text-slate-600 text-md capitalize font-semibold'>
                                        {skill.name}
                                    </span>
                                    <div key={index} >
                                        <progress className="progress progress-primary w-56" value={getProficiencyValue(skill.level)} max="100"></progress>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-primary font-bold text-xl'>Langues</h1>
                        <div className='flex gap-2 pb-4'>
                            {languages.map((language, index) => (
                                <p key={index} className='text-sm text-slate-600 font-bold'>
                                    {language.name} -
                                </p>))
                            }
                        </div>
                    </div>
                </div>
                <div className='w-2/3 bg-white pl-10 pt-80 h-full'>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-primary text-4xl font-semibold'>A propos de moi</h1>
                        <p className='text-sm text-slate-600 text-left'>{personalDetails.description}</p>
                    </div>

                    <div className='flex flex-col gap-2 mt-4'>
                            <h1 className='text-2xl text-primary uppercase font-bold'>EXPERIENCE</h1>
                            <div className='flex flex-col gap-4'>
                                {experiences.map((experience, index) => (
                                    <div key={index} className='flex flex-col gap-2'>
                                        <h3 className='text-primary font-bold'>{experience.endDate.substring(0,4)} - {experience.startDate.substring(0,4)} | {experience.jobTitle} | {experience.companyName}</h3>
                                        <p className='text-sm text-slate-600'>{experience.description}</p>
                                        <ul key={index} className='flex flex-col gap-2 list-disc pl-6'>
                                            {experience.tasks.map((task, index) => (
                                                <li key={index} className='text-slate-600 text-sm'>{task.content}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                    </div>
                </div>

            </div>

        </div >)
}

export default ModelCaissiere
