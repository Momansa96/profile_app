import { Education, Experiences, Hobby, Language, PersonalDetails, Skill, Certification } from '@/type';
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
    certifications: Certification[];
    download?: boolean;
    ref?: React.RefObject<HTMLDivElement>;
}



const getLevelValue = (proficiency: string) => {
    switch (proficiency) {
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







const ModelCascade: React.FC<Props> = ({ personalDetails, file, theme, experiences, educations, languages, skills, certifications, download, ref }) => {
    return (
        <div ref={ref} className={` flex flex-col  w-[950px]  shadow-lg ${download ? 'mb-10' : ''}`} data-theme={theme}>
            <div className='w-full h-full flex bg-white'>
                <div className='w-1/4 h-auto bg-teal-400 '>
                    <h1 className='text-white text-4xl px-3 py-2 font-semibold text-balance'>{personalDetails.fullName}</h1>
                    <h3 className='text-white text-xl mt-2 px-4'>{personalDetails.postSeeking}</h3>
                    <div className='h-52 w-52 overflow-hidden mt-4 mx-3'>
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
                    <div className='py-1 px-4 bg-teal-900 w-full mt-4'>
                        <h2 className='text-white text-xl font-semibold'>Informations<br /> Personnelles</h2>
                    </div>
                    <div className='flex flex-col gap-2 text-white text-md p-4 text-balance'>
                        <div>
                            <h3 className='font-semibold'>Adresse</h3>
                            <p>{personalDetails.address}</p>
                        </div>
                        <div>
                            <h3 className='font-semibold'>Telephone</h3>
                            <p>{personalDetails.phone}</p>
                        </div>
                        <div>
                            <h3 className='font-semibold'>E-mail</h3>
                            <p>{personalDetails.email}</p>
                        </div>
                        <div>
                            <h3 className='font-semibold'>LinkedIn</h3>
                            <p className='text-wrap'>{personalDetails.linkedin}</p>
                        </div>
                    </div>
                    <div className='py-2 px-4 bg-teal-900 w-full mt-4'>
                        <h2 className='text-white text-xl font-semibold'>Langues</h2>
                    </div>
                    <div className='flex flex-col text-white text-sm p-4 text-balance'>
                        {languages.map((lang, index) => (
                            <div key={index} className='flex flex-col items-start'>
                                <span className='capitalize font-semibold'>
                                    {lang.name}
                                </span>
                                <div key={index} >
                                    <progress className="progress progress-white w-52" value={getLevelValue(lang.proficiency)} max="100"></progress>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className='flex flex-col gap-4 mt-4'>
                        {certifications.map((certification, index) => (
                        <p key={index} className='text-slate-600'>{certification.name}</p>
                        ))}
                    </div>
                </div>

                <div className='w-3/4 h-auto bg-white  p-8'>
                    <div className='pb-6 text-md text-slate-600 border-b-2 border-gray-300'>
                        <p>{personalDetails.description}</p>
                    </div>
                    <h1 className='text-2xl text-teal-700 font-semibold pb-1 border-b-2 border-gray-300'>Experience Professionnelle</h1>

                    <div className='mt-4 border-b-2 border-gray-300 pb-2'>
                        {experiences.map((experience, index) => (
                            <div key={index} className='flex items-start gap-4 text-slate-600 mb-2'>
                                <div className='flex items-center justify-start'>
                                    <p className='text-sm text-balance'>{experience.startDate.substring(0, 7)} - {experience.endDate.substring(0, 7)}</p>
                                </div>
                                <div className='flex-1'>
                                    <h3 className='font-bold'>{experience.jobTitle}</h3>
                                    <h4 className='text-sm italic font-semibold'>{experience.companyName}</h4>
                                    <ul className='list-disc pl-6'>
                                        {experience.tasks.map((task, index) => (
                                            <li key={index}>{task.content}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h1 className='text-2xl text-teal-700 font-semibold pb-1 border-b-2 border-gray-300'>Formation</h1>
                    <div className='mt-4 border-b-2 border-gray-300 pb-2'>
                        {educations.map((education, index) => (
                            <div key={index} className='flex items-start gap-4 text-slate-600 mb-2'>
                                <div className='flex flex-col gap-1 items-start justify-start'>
                                    <p className='text-sm text-gray-600'>{education.startDate.substring(0, 7)} - {education.endDate.substring(0, 7)}</p>
                                </div>
                                <div className='flex-1'>
                                    <h3 className='font-bold'>{education.degree}</h3>
                                    <h4 className='text-sm italic font-semibold'>{education.school}</h4>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h1 className='text-2xl text-teal-700 font-semibold pb-1 border-b-2 border-gray-300'>Competences</h1>
                    <div className='mt-4 '>
                        {skills.map((skill, index) => (
                            <div key={index} className='flex items-start gap-4 text-slate-600 mb-2 ml-28'>
                                <p className='text-sm text-balance'>{skill.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModelCascade
