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



const getDottedRating = (proficiency: string) => {
    const maxStars = 5;
    let filledStars = 0;

    switch (proficiency) {
        case 'Débutant':
            filledStars = 1;
            break;
        case 'Intermédiaire':
            filledStars = 3;
            break;
        case 'Avancé':
            filledStars = 5;
            break;
        default:
            filledStars = 0;

    }
    return (
        <>
            {Array.from({ length: filledStars }, (_, index) => (
                <div key={index} className={`bg-primary w-3 h-3 mr-1  rounded-full`} />
            ))}
            {Array.from({ length: maxStars - filledStars }, (_, index) => (
                <div key={index + filledStars} className="bg-gray-300 w-3 h-3 mr-1  rounded-full " />
            ))}
        </>
    );



}







const ModelCubic: React.FC<Props> = ({ personalDetails, file, theme, experiences, educations, languages, skills, download, ref }) => {
    return (
        <div ref={ref} className={` flex flex-col  w-[950px]  shadow-lg ${download ? 'mb-10' : ''}`} data-theme={theme}>
            <div className='w-full h-full  bg-white'>
                <div className='flex flex-col items-start justify-start gap-2 bg-blue-900 p-4 w-full'>
                    <h1 className='text-white text-4xl px-3 py-2 font-semibold text-balance'>{personalDetails.fullName}</h1>
                    <h3 className='text-white text-xl mt-2 px-4'>{personalDetails.postSeeking}</h3>
                </div>
                <div className='flex items-start justify-start'>
                    <div className='w-3/4 h-full bg-white  p-8'>
                        <div className='pb-6 text-md text-slate-600'>
                            <p>{personalDetails.description}</p>
                        </div>
                        <h1 className='text-2xl text-primary font-semibold pb-1 border-b-2 border-gray-300'>Experience Professionnelle</h1>

                        <div className='mt-4 pb-2'>
                            {experiences.map((experience, index) => (
                                <div key={index} className='flex items-start gap-6 text-slate-600 mb-2'>
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
                        <h1 className='text-2xl text-primary font-semibold pb-1 border-b-2 border-gray-300'>Formation</h1>
                        <div className='mt-4 flex flex-col gap-2 pb-2'>
                            {educations.map((education, index) => (
                                <div key={index} className='flex items-start gap-6 text-slate-600 mb-2'>
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

                        <h1 className='text-2xl text-primary font-semibold pb-1 border-b-2 border-gray-300'>Certifications</h1>
                        <div className='mt-4 '>
                            <p className='text-sm text-slate-600'>---</p>
                        </div>
                    </div>
                    <div className='w-1/4 h-full bg-gray-200 '>

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
                        <div className='py-1 px-4  w-full  mt-4'>
                            <h2 className='text-primary text-xl border-b-2 border-gray-400 font-semibold'>Informations<br /> Personnelles</h2>
                        </div>
                        <div className='flex flex-col gap-2 text-slate-600 text-md p-4 text-balance'>
                            <div>
                                <h3 className='font-bold'>Adresse</h3>
                                <p>{personalDetails.address}</p>
                            </div>
                            <div>
                                <h3 className='font-bold'>Telephone</h3>
                                <p>{personalDetails.phone}</p>
                            </div>
                            <div>
                                <h3 className='font-bold'>E-mail</h3>
                                <p>{personalDetails.email}</p>
                            </div>
                            <div className='pr-1'>
                                <h3 className='font-bold'>LinkedIn</h3>
                                <p className='text-balance text-left'>{personalDetails.linkedin}</p>
                            </div>
                        </div>
                        <div className='py-2 px-4  w-full '>
                            <h2 className='text-primary text-xl font-semibold border-b-2 border-gray-400 pb-1'>Competences</h2>
                        </div>
                        <div className='flex flex-col px-4 '>
                            {skills.map((skill, index) => (
                                <div key={index} className='flex justify-start gap-4 text-slate-600'>
                                    <p className='text-sm text-balance'>{skill.name}</p>
                                </div>
                            ))}
                        </div>
                        <div className='py-2 px-4 w-full mt-4'>
                            <h2 className='text-primary text-xl font-semibold border-b-2 border-gray-400 pb-1'>Informatique</h2>
                        </div>
                        <div className='flex flex-col text-white text-sm p-4 text-balance'>
                            <h1>---</h1>
                        </div>
                        <div className='py-2 px-4  w-full'>
                            <h2 className='text-primary text-xl font-semibold border-b-2 border-gray-400 pb-1'>Langues</h2>
                        </div>
                        <div className='flex flex-col text-slate-600 text-sm p-4 text-balance'>
                        {languages.map((lang, index) => (
                            <div key={index} className='flex flex-col items-start gap-2 mt-2'>
                                <span className='capitalize font-semibol'>
                                    {lang.name} ( {lang.proficiency} )
                                </span>
                                <div key={index} className='flex justify-end items-end w-full'>
                                {getDottedRating(lang.proficiency)}
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModelCubic
