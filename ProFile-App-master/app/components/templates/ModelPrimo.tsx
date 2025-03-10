import { Education, Experiences, Hobby, Language, PersonalDetails, Skill } from '@/type';
import React from 'react'
import Image from 'next/image'
import { BriefcaseBusiness, Flag, GraduationCap, Puzzle, Speech, UserRound } from 'lucide-react';

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







const ModelPrimo: React.FC<Props> = ({ personalDetails, file, theme, experiences, educations, languages, skills, download, ref }) => {
    return (
        <div ref={ref} className={` flex flex-col  w-[950px]  shadow-lg ${download ? 'mb-10' : ''}`} data-theme={theme}>
            <div className='w-full h-full flex bg-white p-8'>
                <div className='w-3/4 h-auto bg-white  px-8'>
                    <div className='flex justify-start items-center gap-4 '>
                        <div className='h-24 w-24 bg-primary rounded-full relative'>
                            <h1 className=' text-2xl text-white font-semibold italic absolute right-4 bottom-2'>{personalDetails.fullName
                                .split(' ')
                                .map(word => word[0])
                                .join('')}</h1>
                        </div>
                        <div className='flex flex-col justify-start gap-1'>
                            <h1 className='text-3xl text-primary font-bold'>{personalDetails.fullName}</h1>
                            <p className='text-md text-primary'>{personalDetails.postSeeking}</p>
                        </div>
                    </div>

                    <div className='mt-8 pb-2 pl-14 relative w-full'>
                        <div className="absolute ml-4 h-full border  border-slate-600"></div>
                        <div className="mb-8 flex items-start gap-2 z-20">
                            <div className="relative size-10 flex justify-center items-center bg-primary  rounded-full">
                                <Speech className="text-white" />
                                <div className='w-3 h-3 bg-primary rounded-full absolute -bottom-9 left-2 ml-1'></div>
                            </div>
                            <div className={`ms-4 w-full `}>
                                <h3 className="text-2xl font-semibold text-primary">A propos de moi</h3>
                                <p className="text-md text-gray-600 mt-7">{personalDetails.description}</p>
                            </div>
                        </div>
                        <div className="mb-8 flex items-start gap-2 z-20">
                            <div className="relative size-10 flex justify-center items-center bg-primary  rounded-full">
                                <BriefcaseBusiness className="text-white" />
                            </div>
                            <div className="ms-4 w-full">
                                <h3 className="text-2xl font-semibold text-primary">Experience Professionnelle</h3>
                                {experiences.map((experience, index) => (
                                    <div key={index} className="mt-4 flex flex-col gap-2 w-full ">
                                        <div className='relative'>
                                            <div className='w-3 h-3 bg-primary rounded-full absolute -left-12 mt-3 '></div>
                                            <p className='text-slate-600  absolute -left-40 -top-2'>{(experience.startDate).substring(0,7)} <br/> {(experience.endDate).substring(0,7)}</p>
                                            <h3 className="text-2xl font-semibold text-slate-600">{experience.jobTitle}</h3>
                                        </div>
                                        <p className="text-md text-gray-600 italic font-medium">{experience.companyName}</p>
                                        <ul className="list-disc ms-6 mt-3 space-y-1.5">
                                            {experience.tasks && experience.tasks.map((task, taskIndex) => (
                                                <li key={taskIndex} className="ps-1 text-sm text-gray-600 dark:text-gray-400">{task}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mb-8 flex items-start gap-2 z-20">
                            <div className="relative size-10 flex justify-center items-center bg-primary  rounded-full">
                                <GraduationCap className="text-white" />
                            </div>
                            <div className="ms-4 w-full">
                                <h3 className="text-2xl font-semibold text-primary">Formation</h3>
                                {educations.map((education, index) => (
                                    <div key={index} className="mt-4 flex flex-col gap-2 w-full ">
                                        <div className='relative'>
                                            <div className='w-3 h-3 bg-primary rounded-full absolute -left-12 mt-3 '></div>
                                            <p className='text-slate-600  absolute -left-40 -top-2'>{(education.startDate).substring(0,7)} <br/> {(education.endDate).substring(0,7)}</p>
                                            <h3 className="text-xl font-semibold text-slate-600">{education.degree}</h3>
                                        </div>
                                        <p className="text-md text-gray-600 italic font-medium">{education.school}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    

                    
                </div>
                <div className='w-1/4 h-auto  '>

                    <div className='h-56 w-56 overflow-hidden mt-4'>
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
                    <div className='flex items-center justify-start gap-2 w-full my-4'>
                        <UserRound
                            className='w-8 h-8 rounded-full bg-primary p-1'
                        />
                        <p className='text-primary text-xl font-bold'>Informations<br /> Personnelles</p>
                    </div>
                    <div className='flex flex-col gap-2 text-slate-600 text-md px-1 text-balance'>
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
                            <p>{personalDetails.linkedin}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-start gap-2 w-full my-4'>
                        <Puzzle
                            className='w-8 h-8 rounded-full bg-primary p-1'
                        />
                        <p className='text-primary text-xl font-bold'>Competences</p>
                    </div>
                    <div className='flex flex-col gap-2 text-slate-600 text-md  text-balance'>
                        {skills.map((skill, index) => (
                            <div key={index} className='flex justify-start gap-4 text-slate-600'>
                                <p className='text-sm text-balance'>{skill.name}</p>
                            </div>
                        ))}
                    </div>
                    {/*<div className='flex items-center justify-start gap-2 w-full my-4'>
                        <Monitor
                            className='w-8 h-8 rounded-full bg-primary p-1'
                        />
                        <p className='text-primary text-xl font-bold'>Informatique</p>
                    </div>
                    <div className='flex flex-col gap-2 text-slate-600 text-md  text-balance'>
                        <h1>---</h1>
                    </div>*/}
                    <div className='flex items-center justify-start gap-2 w-full my-4'>
                        <Flag
                            className='w-8 h-8 rounded-full bg-primary p-1'
                        />
                        <p className='text-primary text-xl font-bold'>Langues</p>
                    </div>

                    <div className='flex flex-col text-slate-600 text-sm  text-balance gap-4'>
                        {languages.map((lang, index) => (
                            <div key={index} className='flex flex-col items-start gap-2'>
                                <span className='capitalize font-semibold'>
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
    )
}

export default ModelPrimo
