import { Education, Experiences, Hobby, Language, PersonalDetails, Skill } from '@/type';
import React from 'react'
import Image from 'next/image'

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

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}



const ModelSquares: React.FC<Props> = ({ personalDetails, file, experiences, educations, skills, theme, download, ref }) => {
    return (
        <div ref={ref} className={` flex  w-[950px] shadow-lg ${download ? 'mb-10' : ''}`} data-theme={theme}>
            <div className='flex flex-col w-full h-full p-10 bg-white'>
                <div className='flex justify-between items-start  w-full'>
                    <div className='flex items-center justify-between space-x-2 gap-8'>
                        <div className='border-2 border-secondary relative h-20 w-20'>
                            <h1 className='bg-white text-4xl text-slate-600 font-bold italic absolute -right-4 top-5'>{personalDetails.fullName
                                .split(' ')
                                .map(word => word[0])
                                .join('')}</h1>
                        </div>
                        <h1 className='text-3xl font-bold text-slate-600'>{personalDetails.fullName}</h1>
                    </div>
                    <div className='p-2 w-32 h-32 border-2 border-secondary relative'>
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
                        <div className='h-28 w-4 absolute top-0 -left-2 bg-white'></div>


                    </div>
                </div>
                <div>
                    <h2 className='uppercase text-2xl text-secondary font-semibold mt-4 pb-2 border-b-2 border-slate-600'>
                        Coordonnes
                    </h2>
                    <div className='flex justify-between items-center'>
                        <div className='mt-4'>
                            <h3 className='text-lg text-slate-600 font-semibold'>EMAIL</h3>
                            <p className='text-lg text-slate-600'>{personalDetails.email}</p>
                        </div>
                        <div className='mt-4'>
                            <h3 className='text-lg text-slate-600 font-semibold'>TELEPHONE</h3>
                            <p className='text-lg text-slate-600'>{personalDetails.phone}</p>
                        </div>
                        <div className='mt-4'>
                            <h3 className='text-lg text-slate-600 font-semibold'>ADRESSE</h3>
                            <p className='text-lg text-slate-600'>{personalDetails.address}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='uppercase text-2xl text-secondary font-semibold mt-4 pb-2 border-b-2 border-slate-600'>EXPERIENCE</h1>
                    <div className='flex flex-col gap-4 mt-4'>
                        {experiences.map((experience, index) => (
                            <div className="relative pl-6" key={index}>
                                <div className="absolute top-2 left-0 w-3 h-3 rounded-full bg-secondary  dark:ring-gray-900"></div>
                                <div className="ml-4 space-y-2">
                                    <h2 className='text-xl font-semibold'>{experience.jobTitle}</h2>
                                    <div className='flex items-center justify-between w-full'>
                                        <p className='text-sm text-gray-600 dark:text-gray-400'>{experience.companyName}</p>
                                        <p className='text-sm text-gray-500 dark:text-gray-300'>
                                            {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
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



                </div>
                <div>
                    <h1 className='uppercase text-2xl text-secondary font-semibold mt-4 pb-2 border-b-2 border-slate-600'>ETUDES</h1>
                    <div className='flex flex-col gap-4 mt-4'>
                        {educations.map((education, index) => (
                            <div className="relative pl-6" key={index}>
                                <div className="absolute top-2 left-0 w-3 h-3 rounded-full bg-secondary  dark:ring-gray-900"></div>
                                <div className="ml-4 space-y-2">
                                    <h2 className='text-slate-700 text-xl font-semibold'>{education.degree}</h2>
                                    <div className='flex items-center justify-between w-full'>
                                        <p className='text-sm text-gray-600  dark:text-gray-400'>{education.school}</p>
                                        <p className='text-sm text-gray-500 dark:text-gray-300'>
                                            {formatDate(education.startDate)} - {formatDate(education.endDate)}
                                        </p>
                                    </div>
                                    <p className='text-slate-600 text-sm w-3/4' key={index}>{education.description}</p>
                                </div>
                                {index < educations.length - 1 && (
                                    <div className="absolute top-6 left-[6px] h-full border-l border-secondary dark:border-gray-700"></div>
                                )}
                            </div>
                        ))}
                    </div>



                </div>
                <div>
                    <h1 className='uppercase text-2xl text-secondary font-semibold mt-4 pb-2 border-b-2 border-slate-600'>COMPETEMCES</h1>
                    <div className='flex flex-col gap-4 mt-4'>
                        {skills.map((skill, index) => (
                            <ul key={index} className='flex items-center justify-start gap-4 ms-5 mt-2 space-y-1 '>
                                <div className='w-3 h-3 bg-secondary'></div>
                                <li className='text-slate-600 text-lg font-semibold'>{skill.name}</li>

                            </ul>
                        ))}
                    </div>



                </div>
            </div>

        </div >)
}

export default ModelSquares
