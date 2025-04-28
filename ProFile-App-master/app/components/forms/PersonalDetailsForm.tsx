import { PersonalDetails } from '@/type';
import React from 'react'
import { uploadImage } from '../../actions';

type Props = {
  personalDetails: PersonalDetails;
  setPersonalDetails: (pd: PersonalDetails) => void;
  setFile: (file: File | null) => void;
}

const PersonalDetailsForm: React.FC<Props> = ({ personalDetails, setPersonalDetails, setFile }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fied: keyof PersonalDetails) => {
    setPersonalDetails({ ...personalDetails, [fied]: e.target.value })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      console.log("Taille du fichier :", selectedFile.size, "octets");
      if (selectedFile.size > 5 * 1024 * 1024) { // Limite de 5 Mo
        alert("Le fichier est trop volumineux. Veuillez sélectionner un fichier plus petit.");
        return;
      }
      setFile(selectedFile);
    }
    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      const result = await uploadImage(formData);
      if (result.url) {
        setPersonalDetails({ ...personalDetails, photoUrl: result.url });
        console.log("📸 Upload réussi ! URL : ", result.url);
      }
    } catch (error) {
      console.error("Erreur d'upload:", error);
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <input
        type="text"
        placeholder='Nom complet'
        value={personalDetails.fullName}
        onChange={(e) => handleChange(e, 'fullName')}
        className='input input-bordered w-full'
      />
      <div className='flex'>
        <input
          type="email"
          placeholder='Email'
          value={personalDetails.email}
          onChange={(e) => handleChange(e, 'email')}
          className='input input-bordered w-full'
        />
        <input
          type="tel"
          placeholder='Numéro de téléphone'
          value={personalDetails.phone}
          onChange={(e) => handleChange(e, 'phone')}
          className='input input-bordered w-full ml-4'
        />
      </div>

      <input
        type="text"
        placeholder='Addresse'
        value={personalDetails.address}
        onChange={(e) => handleChange(e, 'address')}
        className='input input-bordered w-full'
      />
      <input
        type="text"
        placeholder='Your LinkedIn'
        value={personalDetails.linkedin}
        onChange={(e) => handleChange(e, 'linkedin')}
        className='input input-bordered w-full'
      />

      <input
        type="file"
        accept='image/*'
        onChange={handleFileChange}
        className='file-input file-input-bordered w-full file:bg-teal-700 border-teal-700'
      />

      <input
        type="text"
        placeholder='Poste Occupé ou  Recherché'
        value={personalDetails.postSeeking}
        onChange={(e) => handleChange(e, 'postSeeking')}
        className='input input-bordered w-full'
      />

      <textarea
        placeholder='Decrivez vous !'
        value={personalDetails.description}
        onChange={(e) => handleChange(e, 'description')}
        className='input input-bordered w-full'
      ></textarea>


    </div>
  )
}

export default PersonalDetailsForm
