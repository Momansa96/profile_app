import { Certification, Education, Experiences, Hobby, Language, PersonalDetails, Skill } from '@/type';
import React from 'react'
import Image from 'next/image'
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

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

const ModelLumina: React.FC<Props> = ({ personalDetails, file, experiences, educations, skills, certifications, theme, download, ref }) => {
    return (
        <div ref={ref} className={` flex  w-[950px] shadow-lg ${download ? 'mb-10' : ''}`} data-theme={theme}>
            <div className='flex flex-col  w-full h-full bg-teal-100/90 relative p-10'>
                <div className='w-44 h-96 bg-teal-300/60 absolute left-16 top-0 rounded-bl-full rounded-br-full'></div>
                <div className='w-full h-96  flex justify-start items-start gap-4 z-10'>
                    <div className='flex flex-col gap-6 pt-4 border-t-2 border-teal-700 w-5/6'>
                        <h1 className='text-5xl text-slate-950 font-bold'>{personalDetails.fullName}</h1>
                        <p className='text-slate-600'>{personalDetails.description}</p>
                        <div className='flex justify-between gap-6 text-slate-600'>
                            <div>
                                <h3 className='uppercase font-bold'>Email</h3>
                                <p className='text-md'>{personalDetails.email}</p>
                            </div>
                            <div>
                                <h3 className='uppercase font-bold'>TELEPHONE</h3>
                                <p className='text-md'>{personalDetails.phone}</p>
                            </div>
                            <div>
                                <h3 className='uppercase font-bold'>ADRESSE</h3>
                                <p className='text-md'>{personalDetails.address}</p>
                            </div>


                        </div>
                    </div>
                    <div className='h-36 w-36 overflow-hidden'>
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
                <div className='flex flex-col gap-4 mt-4'>
                    <h1 className='text-primary uppercase'>EXPERIENCE PROFESSIONNELLE</h1>
                    {experiences.map((experience, index) => (
                        <div className="relative pl-6" key={index}>
                            <div className="absolute top-2 left-0 w-3 h-3 rounded-full bg-secondary  dark:ring-gray-900"></div>
                            <div className="ml-4 space-y-2 text-slate-600">
                                <h2 className='text-lg font-semibold'>{experience.jobTitle}</h2>
                                <div className='flex items-center justify-between w-full'>
                                    <p className='text-sm text-gray-600 dark:text-gray-400'>{experience.companyName}</p>
                                    <p className='text-sm text-gray-500 dark:text-gray-300'>
                                        {formatDate(experience.startDate).substring(3, 14)} - {formatDate(experience.endDate).substring(3, 12)}
                                    </p>
                                </div>
                                {experience.tasks && (
                                    <ul className='list-disc ms-5 mt-2 space-y-1'>
                                        {experience.tasks.map((task, taskIndex) => (
                                            <li key={taskIndex} className='text-sm text-gray-700 dark:text-gray-200'>{task.content}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {index < experiences.length - 1 && (
                                <div className="absolute top-6 left-[6px] h-full border-l border-secondary dark:border-gray-700"></div>
                            )}
                        </div>
                    ))}
                </div>
                <div className='flex flex-col gap-2 mt-4'>
                    <h1 className='text-primary uppercase mt-4'>FORMATION</h1>
                    <div className='flex flex-col gap-4 mt-4'>
                        {educations.map((education, index) => (
                            <div className="relative pl-6" key={index}>
                                <div className="absolute top-2 left-0 w-3 h-3 rounded-full bg-secondary  dark:ring-gray-900"></div>
                                <div className="ml-4 space-y-2">
                                    <h2 className='text-slate-700 text-xl font-semibold'>{education.degree}</h2>
                                    <div className='flex items-center justify-between w-full'>
                                        <p className='text-sm text-gray-600  dark:text-gray-400'>{education.school}</p>
                                        <p className='text-sm text-gray-500 dark:text-gray-300'>
                                            {formatDate(education.startDate).substring(3, 14)} - {formatDate(education.endDate).substring(3, 12)}
                                        </p>
                                    </div>
                                </div>
                                {index < educations.length - 1 && (
                                    <div className="absolute top-6 left-[6px] h-full border-l border-secondary dark:border-gray-700"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col  mt-6'>
                    <h1 className='text-primary uppercase mt-4'>Competences</h1>
                    <div className='flex flex-col '>
                        {skills.map((skill, index) => (
                            <ul key={index} className='flex items-center justify-start gap-4  mt-1 space-y-1 '>
                                <div className='w-3 h-3 bg-secondary'></div>
                                <li className='text-slate-600 text-lg font-semibold'>{skill.name}</li>

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

        </div >)
}

export default ModelLumina
