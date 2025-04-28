"use client"
import React, { useState } from 'react';
import { Experiences } from '@/type';
import { Plus } from 'lucide-react';

type Props = {
  experience: Experiences[];
  setExperiences: (experience: Experiences[]) => void;
};

const ExperienceForm: React.FC<Props> = ({ experience, setExperiences }) => {
  const [newExperience, setNewExperience] = useState<Experiences>({
    jobTitle: '',
    companyName: '',
    startDate: '',
    endDate: '',
    description: '',
    tasks: [],
  });

  const [newTask, setNewTask] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Omit<Experiences, 'tasks'>
  ) => {
    setNewExperience({ ...newExperience, [field]: e.target.value });
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setNewExperience({
        ...newExperience,
        tasks: [...newExperience.tasks, { content: newTask }],
      });
      setNewTask('');
    }
  };

  const handleAddExperience = () => {
    setExperiences([...experience, newExperience]);
    setNewExperience({
      jobTitle: '',
      companyName: '',
      startDate: '',
      endDate: '',
      description: '',
      tasks: [],
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Poste occupé"
            value={newExperience.jobTitle}
            onChange={(e) => handleChange(e, 'jobTitle')}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Nom de l'entreprise"
            value={newExperience.companyName}
            onChange={(e) => handleChange(e, 'companyName')}
            className="input input-bordered w-full ml-4"
          />
        </div>

        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Date de début"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = 'text';
            }}
            value={newExperience.startDate}
            onChange={(e) => handleChange(e, 'startDate')}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Date de fin"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = 'text';
            }}
            value={newExperience.endDate}
            onChange={(e) => handleChange(e, 'endDate')}
            className="input input-bordered w-full ml-4"
          />
        </div>
        <textarea
          placeholder="Description des missions et réalisations"
          value={newExperience.description}
          onChange={(e) => handleChange(e, 'description')}
          className="input input-bordered w-full"
        ></textarea>

        {/* Input pour ajouter de nouvelles tâches */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Nouvelle tâche"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="input input-bordered w-full"
          />
          <button
            type="button"
            onClick={handleAddTask}
            className="btn btn-sm bg-teal-700 hover:bg-teal-950 text-white ml-2"
          >
            <Plus className="w-4" />
          </button>
        </div>

        {/* Affichage de la liste des tâches */}
        {newExperience.tasks.length > 0 && (
          <div>
            <p className="font-semibold">Tâches :</p>
            <ul>
              {newExperience.tasks.map((task, index) => (
                <li key={index} className="ml-4 list-disc">
                  {task.content}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={handleAddExperience}
        className="btn bg-teal-700 hover:bg-teal-950 text-white mt-4"
      >
        Ajouter
        <Plus className="w-4" />
      </button>
    </div>
  );
};

export default ExperienceForm;
