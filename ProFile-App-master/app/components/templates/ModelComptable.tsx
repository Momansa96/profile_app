import { Education, Experiences, Hobby, Language, PersonalDetails, Skill } from '@/type';
import React from 'react'
import Image from 'next/image'
import { Mail, MapPinCheckInside, Phone } from 'lucide-react';

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



const ModelComptable: React.FC<Props> = ({ personalDetails, file, experiences, educations, languages, skills, theme, download, ref }) => {
    return (
        <div ref={ref} className={` flex  w-[950px] h-[1200px] shadow-lg ${download ? 'mb-10' : ''}`} data-theme={theme}>
            <div className='flex flex-col w-full h-full '>
                <div className='w-full h-2/6 bg-slate-700 flex flex-col items-center justify-center gap-4 px-14 py-4'>
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
                    <h1 className='uppercase text-xl text-white'>{personalDetails.fullName}</h1>
                    <h3 className='text-lg text-primary font-bold uppercase'>{personalDetails.postSeeking}</h3>
                    <div className='flex justify-around items-center gap-2 space-x-2 mt-4'>
                        <div className='flex items-center space-x-2'>
                            <MapPinCheckInside size={24} className='text-primary' />
                            <p className='text-white text-lg text-balance'>{personalDetails.address}</p>
                        </div>
                        <div className='flex items-center space-x-2 '>
                            <Phone size={24} className='text-primary' />
                            <p className='text-white text-lg '>{personalDetails.phone}</p>
                        </div>
                        <div className='flex items-center space-x-2 '>
                            <Mail size={24} className='text-primary' />
                            <p className='text-white text-lg'>{personalDetails.email}</p>
                        </div>


                    </div>

                </div>
                <div className='w-full  bg-white flex items-start justify-center'>
                    <div className='w-2/5 h-full  bg-slate-400 p-7'>
                        <div className='flex flex-col gap-6 border-b-2 border-gray-900 pb-8 text-center '>
                            <h2 className='uppercase text-xl text-primary font-semibold'>A PROPOS DE MOI</h2>
                            <p className='text-white text-justify '>{personalDetails.description}</p>
                        </div>
                        <div className='flex flex-col gap-6 border-b-2 border-gray-900 pb-8 px-4 text-center mt-4 text-white'>
                            <h2 className='uppercase text-xl text-primary font-semibold'>Formation</h2>
                            <ul>
                                {educations.map((education, index) => (
                                    <li key={index} className='flex flex-col gap-4 mt-2'>
                                        <h3 className='text-md font-semibold'>{education.degree} - {(education.endDate.substring(0, 4))}</h3>
                                        <p className='text-base'>{education.school}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='flex flex-col gap-6  pb-8 px-4 text-center text-white mt-4'>
                            <h2 className='uppercase text-xl text-primary font-semibold'>Langues</h2>
                            <ul>
                                {languages.map((lang, index) => (
                                    <li key={index} className='flex flex-col gap-4 mt-2'>
                                        <h3 className='text-md font-semibold'>{lang.name} - {lang.proficiency}</h3>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='w-3/5 h-auto bg-white p-10'>
                        <h1 className='text-lg text-primary font-semibold uppercase'>Experience professionnelle</h1>
                        {experiences.map((experience, index) => (
                            <div key={index} className='flex flex-col gap-4 mt-4'>
                                <div className='flex flex-col justify-between items-start'>
                                    <h2 className='text-lg font-semibold mb-2'>{experience.jobTitle} | {experience.companyName}</h2>
                                    <h3 className='text-lg'>{(experience.startDate.substring(0, 4))} - {(experience.endDate.substring(0, 4))}</h3>
                                </div>
                                <div className='ml-6'>
                                    <ul className='list-disc'>
                                        {experience.tasks.map((task, index) => (
                                            <li key={index} className=' flex-col gap-4 mt-2 '>
                                                <h3 className='text-md'>{task}</h3>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>)
                        )}
                        <div className='ml-6'>
                            <h1 className='text-lg text-primary font-semibold uppercase mt-4'>Competences</h1>
                            <ul className='list-disc'>
                                {skills.map((skill, index) => (
                                    <li key={index} className='flex-col gap-4 mt-2'>
                                        <h3 className='text-md'>{skill.name}</h3>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default ModelComptable
