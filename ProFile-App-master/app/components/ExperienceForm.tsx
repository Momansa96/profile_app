import { Experiences } from '@/type';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    experience: Experiences[];
    setExperiences: (experience: Experiences[]) => void
}



const ExperienceForm: React.FC<Props> = ({ experience, setExperiences }) => {

    const [newExperience, setNewExperience] = useState<Experiences>({
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        description: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fied: keyof Experiences) => {
        setNewExperience({ ...newExperience, [fied]: e.target.value })
    }

    const handleAddExperience = () => {
        setExperiences([...experience, newExperience])
        setNewExperience(
            {
                jobTitle: '',
                companyName: '',
                startDate: '',
                endDate: '',
                description: '',
            }
        )
    }



    return (

        <div>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <input
                        type="text"
                        placeholder='Poste occupé'
                        value={newExperience.jobTitle}
                        onChange={(e) => handleChange(e, 'jobTitle')}
                        className='input input-bordered w-full'
                    />
                    <input
                        type="text"
                        placeholder="Nom de l'entreprise"
                        value={newExperience.companyName}
                        onChange={(e) => handleChange(e, 'companyName')}
                        className='input input-bordered w-full ml-4'
                    />
                </div>

                <div className='flex justify-between'>
                    <input
                        type="text"
                        placeholder='Date de début'
                        onFocus={(e) => e.target.type = "date"}
                        onBlur={(e) => {
                            if (!e.target.value) e.target.type = "text"
                        }}
                        value={newExperience.startDate}
                        onChange={(e) => handleChange(e, 'startDate')}
                        className='input input-bordered w-full'
                    />
                    <input
                        type="text"
                        placeholder='Date de fin'
                        onFocus={(e) => e.target.type = "date"}
                        onBlur={(e) => {
                            if (!e.target.value) e.target.type = "text"
                        }}
                        value={newExperience.endDate}
                        onChange={(e) => handleChange(e, 'endDate')}
                        className='input input-bordered w-full ml-4'
                    />
                </div>
                <textarea
                    placeholder='Description des missions et réalisations'
                    value={newExperience.description}
                    onChange={(e) => handleChange(e, 'description')}
                    className='input input-bordered w-full'
                ></textarea>
            </div>

            <button
                onClick={handleAddExperience}
                className='btn bg-teal-700 hover:bg-teal-950 text-white mt-4'
            >
                Ajouter
                <Plus className='w-4' />
            </button>

        </div>
    )
}

export default ExperienceForm
