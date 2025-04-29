"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Navbar from "@/app/components/Navbar";
import { ArrowDownToLine, Expand, X, Send, Trash2, ChevronDown } from 'lucide-react';
import { Education, Experiences, Hobby, Language, PersonalDetails, Skill, Certification } from '@/type';
import PersonalDetailsForm from '@/app/components/forms/PersonalDetailsForm';
import ExperienceForm from '@/app/components/forms/ExperienceForm';
import EducationForm from '@/app/components/forms/EducationForm';
import LanguageForm from '@/app/components/forms/LanguageForm';
import SkillForm from '@/app/components/forms/SkillForm';
import HobbyForm from '@/app/components/forms/HobbyForm';
import { educationsPreset, experiencesPreset, hobbiesPreset, languagesPreset, personalDetailsPreset, skillsPreset, certificationPreset } from '@/preset';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import 'react-toastify/dist/ReactToastify.css';
import CvTemplatesselector from '@/app/components/CvTemplatesselector';
import Preview from '@/app/components/templates/Preview';
import ModelCascade from '@/app/components/templates/ModelCascade';
import ModelComptable from '@/app/components/templates/ModelComptable';
import ModelSquares from '@/app/components/templates/ModelSquares';
import ModelCaissiere from '@/app/components/templates/ModelCaissiere';
import ModelPrimo from '@/app/components/templates/ModelPrimo';
import ModelCubic from '@/app/components/templates/ModelCubic';
import ModelGraphiste from '@/app/components/templates/ModelGraphiste';
import ModelLumina from '@/app/components/templates/ModelLumina';
import CertificationForm from '@/app/components/forms/CertificateForm';
import { saveCvData } from '@/app/actions';
import { toast } from 'react-toastify';
const Page = () => {

  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(personalDetailsPreset)
  const [file, setFile] = useState<File | null>(null)
  const [experiences, setExperiences] = useState<Experiences[]>(experiencesPreset)
  const [educations, setEducations] = useState<Education[]>(educationsPreset)
  const [languages, setLanguages] = useState<Language[]>(languagesPreset)
  const [skills, setSkills] = useState<Skill[]>(skillsPreset)
  const [hobbies, setHobbies] = useState<Hobby[]>(hobbiesPreset);
  const [certification, setCertification] = useState<Certification[]>(certificationPreset);

  const [theme, setTheme] = useState<string>('forest')
  const [zoom, setZoom] = useState<number>(155)
  useEffect(() => {
    const defaultImageUrl = '/profile.png'
    fetch(defaultImageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const defaultFile = new File([blob], "profile.png", { type: blob.type })

        setFile(defaultFile)

      })
  }, [])



  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ]
  const handleResetPersonalDetails = () => setPersonalDetails(
    {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      photoUrl: '',
      postSeeking: '',
      description: ''
    }
  )
  const handleResetExperiences = () => setExperiences([])
  const handleResetEducations = () => setEducations([])
  const handleResetLanguages = () => setLanguages([])
  const handleResetSkills = () => setSkills([])
  const handleResetHobbies = () => setHobbies([]);

  const PreviewRef = useRef<HTMLDivElement>(null!)

  const handleDownloadPdf = async () => {
    const element = PreviewRef.current
    if (element) {
      try {

        const canvas = await html2canvas(element, {
          scale: 3,
          useCORS: true,
        })
        const imgData = canvas.toDataURL('image/jpeg', 0.8)

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: 'mm',
          format: "A4"
        })

        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${personalDetails.fullName}_cv.pdf`);

        const modal = document.getElementById('my_modal_3') as HTMLDialogElement
        if (modal) {
          modal.close()
        }

        confetti({
          particleCount: 500,
          spread: 180,
          origin: { y: 0 },
          zIndex: 9999
        })

      } catch (error) {
        console.error('Erreur lors de la génération du PDF :', error);
      }
    }
  }

  const [selectedTemplate, setSelectedTemplate] = useState("Modèle Squares");



  type CVTemplates = {
    id: number;
    name: string;
  };

  const handleTemplateSelect = (template: CVTemplates) => {
    setSelectedTemplate(template.name);

  };

  const handlePublish = async () => {
    try {
      const payload = {
        personalDetails: {
          fullName: personalDetails.fullName,
          email: personalDetails.email,
          phone: personalDetails.phone,
          linkedin: personalDetails.linkedin,
          address: personalDetails.address,
          postSeeking: personalDetails.postSeeking,
          description: personalDetails.description,
          photoUrl: personalDetails.photoUrl,
        },
        experiences,
        educations,
        languages,
        skills,
        hobbies,
        certifications: certification,
      };
      console.log(payload);

      await saveCvData(payload, userId as string);

      toast.success('CV publié avec succès !');

      const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Erreur : ' + error.message);
      } else {
        toast.error('Une erreur inconnue est survenue');
      }
    }
  };




  const { isLoaded, isSignedIn, user } = useUser();
  const userId = user?.id ?? '';

  if (!isSignedIn || !isLoaded) {
    return null
  }







  return (
    <div className='h-screen w-full no-scrollbar'>
      <Navbar />
      <div className=' hidden lg:block mt-9 '>
        <section className='flex items-center  w-full bg-base-200'>

          {/**Sidebar de modification du CV */}
          <div className='w-1/4 h-[90vh]  px-6 pt-1 bg-base-200 scrollable no-scrollbar'>
            <div className="mb-2 flex justify-between items-center text-teal-700 sticky top-0 bg-base-200 z-10 pt-3 pb-5">
              <p className='text-lg font-bold'>Bienvenue, {user.firstName} !</p>
              <button className="btn bg-teal-700 text-white hover:border-teal-600 hover:bg-teal-950" onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>
                Agrandir
                <Expand
                  width={20}
                />
              </button>
            </div>
            {/*Ensemble des formulaires pour la modification en temps reel*/}
            <div className='flex  flex-col gap-6 rounded-lg'>

              <div className="flex justify-between items-center">
                <h1 className="badge border-teal-700 text-teal-700 font-semibold p-4 badge-outline">Presentez vous !</h1>
                <button
                  onClick={handleResetPersonalDetails}
                  className="btn bg-teal-700 hover:bg-red-500 btn-sm">
                  <Trash2 className="w-4" color='white' />
                </button>
              </div>
              <PersonalDetailsForm
                personalDetails={personalDetails}
                setPersonalDetails={setPersonalDetails}
                setFile={setFile}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge border-teal-700 text-teal-700 font-semibold p-3 badge-outline">Expériences</h1>
                <button
                  onClick={handleResetExperiences}
                  className="btn bg-teal-700 hover:bg-red-500 btn-sm">
                  <Trash2 className="w-4" color='white' />
                </button>
              </div>
              <ExperienceForm
                experience={experiences}
                setExperiences={setExperiences}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge border-teal-700 text-teal-700 font-semibold p-3 badge-outline">Éducations</h1>
                <button
                  onClick={handleResetEducations}
                  className="btn bg-teal-700 hover:bg-red-500 btn-sm">
                  <Trash2 className="w-4" color='white' />
                </button>
              </div>
              <EducationForm
                educations={educations}
                setEducations={setEducations}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge border-teal-700 text-teal-700 font-semibold p-3 badge-outline">Langues</h1>
                <button
                  onClick={handleResetLanguages}
                  className="btn bg-teal-700 hover:bg-red-500 btn-sm">
                  <Trash2 className="w-4" color='white' />
                </button>
              </div>
              <LanguageForm
                languages={languages}
                setLanguages={setLanguages}
              />

              <div className="flex flex-col justify-between items-center gap-4">

                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <h1 className="badge border-teal-700 text-teal-700 font-semibold p-3 badge-outline">Compétences</h1>
                    <button
                      onClick={handleResetSkills}
                      className="btn bg-teal-700 hover:bg-red-500 btn-sm">
                      <Trash2 className="w-4" color='white' />
                    </button>
                  </div>
                  <SkillForm
                    skills={skills}
                    setSkills={setSkills}
                  />
                </div>

                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <h1 className="badge border-teal-700 text-teal-700 font-semibold p-3 badge-outline">Loisirs</h1>
                    <button
                      onClick={handleResetHobbies}
                      className="btn bg-teal-700 hover:bg-red-500 btn-sm">
                      <Trash2 className="w-4" color='white' />
                    </button>
                  </div>
                  <HobbyForm
                    hobbies={hobbies}
                    setHobbies={setHobbies}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <h1 className="badge border-teal-700 text-teal-700 font-semibold p-3 badge-outline">Vos Certifications</h1>
                  <button
                    onClick={handleResetHobbies}
                    className="btn bg-teal-700 hover:bg-red-500 btn-sm">
                    <Trash2 className="w-4" color='white' />
                  </button>
                </div>
                <CertificationForm
                  certification={certification}
                  setCertification={setCertification}
                />
              </div>

            </div>
          </div>

          {/*Espace de visualisation du CV  */}
          <div className='w-3/4 h-[90vh] bg-base-100 bg-[url("/grille.svg")] bg-cover  bg-center no-scrollbar scrollable-preview relative overflow-hidden'>
            <div className="fixed z-[9999] top-20 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-lg p-3 rounded-2xl border border-white/10 hover:border-teal-400/30 transition-all duration-300 group">
              <div className="flex gap-6 items-center justify-center">

                {/* Contrôle Zoom - Version Holographique */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-teal-700/20 to-teal-900/30 p-2 px-4 rounded-xl border border-white/5">
                    <span className="text-sm font-mono text-teal-300">ZOOM</span>
                    <input
                      type="range"
                      min={50}
                      max={200}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="range range-sm range-teal-500 glow-teal w-40"
                    />
                    <div className="w-16 text-right">
                      <p className="text-teal-400 font-bold text-sm tracking-widest font-mono">
                        {zoom}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sélecteur de Thème - Style Cyberpunk */}
                <div className="relative">
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="appearance-none bg-black/40 border-2 border-teal-500/20 rounded-xl py-2 pl-4 pr-8 text-teal-300 text-sm font-mono cursor-pointer hover:border-teal-400/50 transition-all"
                  >
                    {themes.map((themeName) => (
                      <option
                        key={themeName}
                        value={themeName}
                        className="bg-black text-teal-300"
                      >
                        {themeName.toUpperCase()}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                    <ChevronDown className="w-5 h-5 text-teal-400/50" />
                  </div>
                </div>

                {/* Sélecteur de Template - Interface HUD */}
                <div className="relative group">
                  <CvTemplatesselector
                    onSelect={handleTemplateSelect}

                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-[2px] w-8 bg-teal-400/30 group-hover:w-16 transition-all duration-300"></div>
                </div>

              </div>

              {/* Effet de lumière dynamique */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none">
                <div className="absolute -inset-1 bg-teal-500/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>





            <div
              className="flex justify-center items-center"
              style={{
                transform: `scale(${zoom / 200})`
              }}
            >
              {selectedTemplate === "Modele Default" && <Preview
                personalDetails={personalDetails}
                file={file}
                theme={theme}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobbies}
                skills={skills}
                download={true}
                ref={PreviewRef}

              />}
              {selectedTemplate === "Modèle Cascade" && <ModelCascade
                personalDetails={personalDetails}
                file={file}
                theme={theme}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobbies}
                skills={skills}
                certifications={certification}
                download={true}
                ref={PreviewRef}

              />}
              {selectedTemplate === "Modèle Comptable" && <ModelComptable
                personalDetails={personalDetails}
                file={file}
                theme={theme}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobbies}
                skills={skills}
                download={true}
                ref={PreviewRef}

              />}
              {selectedTemplate === "Modèle Squares" && <ModelSquares
                personalDetails={personalDetails}
                file={file}
                theme={theme}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobbies}
                skills={skills}
                download={true}
                ref={PreviewRef}

              />}
              {selectedTemplate === "Modèle Caissiere" && <ModelCaissiere
                personalDetails={personalDetails}
                file={file}
                theme={theme}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobbies}
                skills={skills}
                download={true}
                ref={PreviewRef}
              />}
              {selectedTemplate === "Modèle Primo" && <ModelPrimo
                personalDetails={personalDetails}
                file={file}
                theme={theme}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobbies}
                skills={skills}
                download={true}
                ref={PreviewRef}
              />}
              {selectedTemplate === "Modèle Cubic" && <ModelCubic
                personalDetails={personalDetails}
                file={file}
                theme={theme}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobbies}
                skills={skills}
                download={true}
                ref={PreviewRef}
              />}
              {selectedTemplate === "Modèle Graphiste" && <ModelGraphiste
                personalDetails={personalDetails}
                file={file}
                theme={theme}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobbies}
                skills={skills}
                certifications={certification}
                download={true}
                ref={PreviewRef}
              />}
              {selectedTemplate === "Modèle Lunmina" && <ModelLumina
                personalDetails={personalDetails}
                file={file}
                theme={theme}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobbies}
                skills={skills}
                certifications={certification}
                download={true}
                ref={PreviewRef}
              />}
            </div>

          </div>

        </section>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box w-full max-w-6xl mx-auto px-4 sm;px-6 lg:px-8">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-slate-200">
                <X className="w-4" />
              </button>
            </form>

            <div className="mt-5">
              <div className="flex justify-end mb-5 gap-3">
                <button onClick={handleDownloadPdf} className="btn bg-teal-700 text-white hover:bg-teal-950">
                  Télécharger
                  <ArrowDownToLine className='w-4' />
                </button>
                <button
                  className="btn bg-teal-700 text-white hover:bg-teal-950"
                  onClick={handlePublish}
                >
                  Publier
                  <Send className="w-4 ml-2" />
                </button>


              </div>

              <div className="w-full max-x-full overflow-auto">
                <div className="w-full max-w-full flex justify-center items-center">
                  {selectedTemplate === "Modele Default" && <Preview
                    personalDetails={personalDetails}
                    file={file}
                    theme={theme}
                    experiences={experiences}
                    educations={educations}
                    languages={languages}
                    hobbies={hobbies}
                    skills={skills}
                    download={true}
                    ref={PreviewRef}

                  />}
                  {selectedTemplate === "Modèle Cascade" && <ModelCascade
                    personalDetails={personalDetails}
                    file={file}
                    theme={theme}
                    experiences={experiences}
                    educations={educations}
                    languages={languages}
                    hobbies={hobbies}
                    skills={skills}
                    certifications={certification}
                    download={true}
                    ref={PreviewRef}

                  />}
                  {selectedTemplate === "Modèle Comptable" && <ModelComptable
                    personalDetails={personalDetails}
                    file={file}
                    theme={theme}
                    experiences={experiences}
                    educations={educations}
                    languages={languages}
                    hobbies={hobbies}
                    skills={skills}
                    download={true}
                    ref={PreviewRef}
                  />}
                  {selectedTemplate === "Modèle Squares" && <ModelSquares
                    personalDetails={personalDetails}
                    file={file}
                    theme={theme}
                    experiences={experiences}
                    educations={educations}
                    languages={languages}
                    hobbies={hobbies}
                    skills={skills}
                    download={true}
                    ref={PreviewRef}
                  />}
                  {selectedTemplate === "Modèle Caissiere" && <ModelCaissiere
                    personalDetails={personalDetails}
                    file={file}
                    theme={theme}
                    experiences={experiences}
                    educations={educations}
                    languages={languages}
                    hobbies={hobbies}
                    skills={skills}
                    download={true}
                    ref={PreviewRef}
                  />}
                  {selectedTemplate === "Modèle Primo" && <ModelPrimo
                    personalDetails={personalDetails}
                    file={file}
                    theme={theme}
                    experiences={experiences}
                    educations={educations}
                    languages={languages}
                    hobbies={hobbies}
                    skills={skills}
                    download={true}
                    ref={PreviewRef}
                  />}
                  {selectedTemplate === "Modèle Cubic" && <ModelCubic
                    personalDetails={personalDetails}
                    file={file}
                    theme={theme}
                    experiences={experiences}
                    educations={educations}
                    languages={languages}
                    hobbies={hobbies}
                    skills={skills}
                    download={true}
                    ref={PreviewRef}
                  />}
                  {selectedTemplate === "Modèle Graphiste" && <ModelGraphiste
                    personalDetails={personalDetails}
                    file={file}
                    theme={theme}
                    experiences={experiences}
                    educations={educations}
                    languages={languages}
                    hobbies={hobbies}
                    skills={skills}
                    certifications={certification}
                    download={true}
                    ref={PreviewRef}
                  />}
                  {selectedTemplate === "Modèle Lunmina" && <ModelLumina
                    personalDetails={personalDetails}
                    file={file}
                    theme={theme}
                    experiences={experiences}
                    educations={educations}
                    languages={languages}
                    hobbies={hobbies}
                    skills={skills}
                    certifications={certification}
                    download={true}
                    ref={PreviewRef}
                  />}
                </div>
              </div>

            </div>
          </div>
        </dialog>
      </div>

      {/* Affichage de la page version mobile */}
      <div className="sm:block md:block lg:hidden mt-8 mx-auto">
        <div className=" bg-teal-100/50  rounded-lg p-6 w-full max-w-md mx-auto">
          <div className="w-full">
            <h1 className="text-x font-bold">Oupss ! Pour des raison d&apos;ergonomie votre outils est uniquement disponible sur un ecran plus grand</h1>
            <Image
              src="/sorry.gif"
              width={200}
              height={200}
              alt="Désolé, fonctionnalité indisponible sur mobile"
              className="mx-auto my-3"
            />
            <p className="py-3">
              Mettez vous sur un ecran plus grand pour profiter de toutes les fonctionnalités de l&apos;application.
            </p>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Page
