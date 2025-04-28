"use client"
import { Language } from '@/type';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    languages: Language[];
    setLanguages: (languages: Language[]) => void;
}

const LanguageForm: React.FC<Props> = ({ languages, setLanguages }) => {

    const [newLanguage, setNewLanguage] = useState<Language>(
        {
            name: '',
            proficiency: ''
        }
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, fied: keyof Language) => {
        setNewLanguage({ ...newLanguage, [fied]: e.target.value })
    }

    const handleAddLanguage = () => {
        setLanguages([...languages, newLanguage])
        setNewLanguage(
            {
                name: '',
                proficiency: ''
            }
        )
    }

    return (
        <div className='space-y-4'>
            <input
                type="text"
                placeholder="Langue"
                value={newLanguage.name}
                onChange={(e) => handleChange(e, 'name')}
                className='input input-bordered w-full'
            />
            <select
                value={newLanguage.proficiency}
                onChange={(e) => handleChange(e, 'proficiency')}
                className='select select-bordered w-full'
            >

                <option value="">Sélectionner votre niveau de maitrise</option>
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Avancé">Avancé</option>

            </select>

            <button
                onClick={handleAddLanguage}
                className='btn bg-teal-700 hover:bg-teal-950 text-white mt-4'
            >
                Ajouter
                <Plus className='w-4' />
            </button>
        </div>
    )
}

export default LanguageForm
