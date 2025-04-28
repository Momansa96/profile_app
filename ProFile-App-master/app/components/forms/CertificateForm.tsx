import { Certification } from '@/type';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'


type Props = {
    certification: Certification[];
    setCertification: (hobbies: Certification[]) => void;
};

const CertificationForm: React.FC<Props> = ({ certification, setCertification }) => {

    const [newCertification, setNewCertification] = useState<Certification>(
        {
            name: '',
        }
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, fied: keyof Certification) => {
        setNewCertification({ ...newCertification, [fied]: e.target.value })
    }

    const handleAddCertifivation = () => {
        setCertification([...certification, newCertification]);
        setNewCertification({ name: '' });
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Certification"
                value={newCertification.name}
                onChange={(e) => handleChange(e, 'name')}
                className='input input-bordered w-full mt-4'
            />
            <button
                onClick={handleAddCertifivation}
                className='btn bg-teal-700 hover:bg-teal-950 text-white mt-4'
            >
                Ajouter
                <Plus className='w-4' />
            </button>
        </div>
    )
}

export default CertificationForm
