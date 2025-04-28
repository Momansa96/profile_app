"use client"
import { Skill } from '@/type';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
}

const SkillForm: React.FC<Props> = ({ skills, setSkills }) => {

  const [newSkill, setNewSkill] = useState<Skill>(
    {
      name: '',
      level: ''
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, fied: keyof Skill) => {
    setNewSkill({ ...newSkill, [fied]: e.target.value })
  }

  const handleAddSkill = () => {
    setSkills([...skills, newSkill]);
    setNewSkill({ name: '', level: '' });
  }

  return (
    <div>
      <div className='mt-4'>
        <input
          type="text"
          placeholder="compétence"
          value={newSkill.name}
          onChange={(e) => handleChange(e, 'name')}
          className='input input-bordered w-full mb-3'
        />
        <select 
        value={newSkill.level}
        onChange={(e) => handleChange(e, 'level')}
        className='select select-bordered w-full'
        >
          <option value="">Niveau</option>
          <option value="Débutant">Débutant</option>
          <option value="Intermédiaire">Intermédiaire</option>
          <option value="Avancé">Avancé</option>
        </select>
      </div>

      <button
        onClick={handleAddSkill}
        className='btn bg-teal-700 hover:bg-teal-950 text-white mt-4 '
      >
        Ajouter
        <Plus className='w-4' />
      </button>
    </div>
  )
}

export default SkillForm
