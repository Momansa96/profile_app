import { Education, Experiences, Hobby, Language, PersonalDetails, Skill, Certification } from '@/type';
import React from 'react'
import Image from 'next/image'
import {  Mail, MapPin, Phone, } from 'lucide-react';
import "../../globals.css";
type Props = {
    personalDetails: PersonalDetails;
    file: File | null;
    theme: string;
    experiences: Experiences[];
    educations: Education[];
    languages: Language[];
    skills: Skill[];
    hobbies: Hobby[];
    certifications: Certification[];
    download?: boolean;
    ref?: React.RefObject<HTMLDivElement>;
}



const ModelGraphiste: React.FC<Props> = ({ personalDetails, file, experiences, educations, skills, certifications,  theme, download, ref }) => {
    return (
        <div ref={ref} className={` flex  w-[950px] shadow-lg ${download ? 'mb-10' : ''}`} data-theme={theme}>
            <div className='flex flex-col  w-full h-full bg-white '>

                <div className='flex justify-between gap-28 items-center  w-full h-36 my-20 bg-gray-500  px-6 relative'>
                    
                    <div className='flex flex-col items-start justify-start gap-2'>
                        <h1 className='text-gray-950 capitalize text-5xl font-semibold'>{personalDetails.fullName}</h1>
                        <h3 className='text-white text-2xl'>{personalDetails.postSeeking}</h3>
                    </div>
                    <div className='h-72 w-60 hexagon  absolute right-10 overflow-hidden  '>
                        {file && (
                            <Image
                                src={URL.createObjectURL(file)}
                                width={250}
                                height={250}
                                className='w-full h-full  object-cover'
                                alt="Picture of the author"
                                onLoadingComplete={() => {
                                    if (typeof file !== 'string') {
                                        URL.revokeObjectURL(URL.createObjectURL(file))
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className='flex'>
                    <div className='w-1/3 bg-gray-200 px-8 py-4 h-auto '>
                        <div className='flex flex-col gap-6 text-slate-600 text-sm text-balance'>
                            <h1 className='uppercase font-bold text-primary text-xl'>Me contacter</h1>
                            <div className='flex gap-2'><MapPin width={25} height={30} className='text-primary' />{personalDetails.address}</div>
                            <div className='flex items-center gap-2'><Phone width={25} height={30} className='text-primary' />{personalDetails.phone}</div>
                            <div className='flex items-center gap-2'><Mail width={25} height={30} className='text-primary' />{personalDetails.email}</div>
                        </div>

                        <div className='flex flex-col gap-2 mt-8'>
                            <h1 className='text-primary font-bold text-xl uppercase'>Formation</h1>
                            {educations.map((education, index) => (
                                <div key={index} className='flex flex-col justify-start items-start text-slate-600 mb-2'>
                                    <p className='font-medium'>{education.degree}</p>
                                    <p className='text-sm'>{education.endDate.substring(0, 4)} - {education.school}</p>
                                </div>))
                            }
                        </div>

                        <div>
                            <h1 className='text-primary text-xl font-bold uppercase'>Competences</h1>
                            <div className='flex flex-col space-y-2'>
                                {skills.map((skill, index) => (
                                    <ul className='list-disc pl-6' key={index}>
                                        <li className='text-slate-600 pl-2'>{skill.name}</li>
                                    </ul>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 mt-4'>
                    <h1 className='text-primary uppercase mt-4'>CERTIFICATIONS</h1>
                    <div className='flex flex-col gap-4 mt-4'>
                        {certifications.map((certification, index) => (
                        <p key={index} className='text-slate-600'>{certification.name}</p>
                        ))}
                    </div>
                </div>
                    </div>
                    <div className='w-2/3 bg-gray-100 pl-10 pt-5 h-auto'>
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-primary text-2xl font-bold uppercase'>A propos de moi</h1>
                            <p className='text-sm text-slate-600 text-left'>{personalDetails.description}</p>
                        </div>

                        <div className='flex flex-col gap-2 mt-4'>
                            <h1 className='text-2xl text-primary uppercase font-bold'>EXPERIENCE PROFESSIONNELLE</h1>
                            <div className='flex flex-col gap-4'>
                                {experiences.map((experience, index) => (
                                    <div key={index} className='flex flex-col gap-2'>
                                        <h3 className='text-slate-600 font-medium'>{experience.jobTitle} | {experience.companyName}</h3>
                                        <h3 className='text-slate-600 font-medium'>{experience.endDate.substring(0, 4)} - {experience.startDate.substring(0, 4)} | {experience.jobTitle} | {experience.companyName}</h3>
                                        <ul key={index} className='flex flex-col gap-2 list-disc pl-6'>
                                            {experience.tasks.map((task, index) => (
                                                <li key={index} className='text-slate-600 text-sm pl-2'>{task}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div >)
}

export default ModelGraphiste
