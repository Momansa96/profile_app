"use client";
import React, { useState } from "react";
import { Search, Briefcase, Star, PlusCircle, X, UserSearch, UserCheck, CircleHelp, Bell, Filter, BookmarkPlus, BookmarkMinus, Mail, Eye, Pen, Trash2, Download, CirclePlus, CircleMinus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

const jobPositions = ["Développeur Web", "Designer UX/UI", "Chef de Projet", "Administrateur Réseau", "Analyste de Données"];
const locations = ["Paris", "Lyon", "Marseille", "Télétravail"];
const experiences = ["Débutant", "Intermédiaire", "Confirmé"];
const candidateNames = ["Alice Dupont", "Jean Martin", "Sophie Bernard", "Thomas Leroy", "Nina Morel", "Lucas Dubois", "Emma Fontaine", "Matthieu Rousseau", "Isabelle Garnier", "David Lefevre", "Camille Blanchard", "Antoine Perrot", "Elodie Mercier", "Vincent Gauthier", "Caroline Lambert", "Guillaume Besson", "Julie Charpentier", "Pauline Richard", "Florent Chevalier", "Aurélie Noel"];
const emails = ["monemail@gamil.com", "monemail2@gamil.com" ]

type JobOffer = {
    id: number;
    title: string;
    description: string;
    location: string;
    positionType: string;
    experience: string;
};

type Candidate = {
    id: number;
    name: string;
    position: string;
    location: string;
    experience: string;
    email: string;
};

const candidates: Candidate[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: candidateNames[i],
    position: jobPositions[i % jobPositions.length],
    location: locations[i % locations.length],
    experience: experiences[i % experiences.length],
    email: emails[i],
}));

const RecruiterDashboard = () => {
    const [search, setSearch] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedExperience, setSelectedExperience] = useState("");
    const [favorites, setFavorites] = useState<Candidate[]>([]);
    const [activeTab, setActiveTab] = useState("candidates");
    const [showJobForm, setShowJobForm] = useState(false);
    const [jobOffers, setJobOffers] = useState<JobOffer[]>([
        {
            id: 1,
            title: "Développeur Fullstack",
            description: "Recherche développeur fullstack React/Node.js",
            location: "Paris",
            positionType: "CDI",
            experience: "Confirmé"
        }
    ]);
    const [newJob, setNewJob] = useState<Omit<JobOffer, 'id'>>({
        title: "",
        description: "",
        location: "",
        positionType: "CDI",
        experience: ""
    });
    const [editingJob, setEditingJob] = useState<JobOffer | null>(null);
    const [previewJob, setPreviewJob] = useState<JobOffer | null>(null);
    const [jobToDelete, setJobToDelete] = useState<number | null>(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const toggleFavorite = (candidate: Candidate) => {
        setFavorites((prev) =>
            prev.some((fav) => fav.id === candidate.id)
                ? prev.filter((fav) => fav.id !== candidate.id)
                : [...prev, candidate]
        );
    };
    const initialCandidatures: Candidate[] = [
        { id: 1, name: "Alice Dupont", position: "Développeur Web", location: "Paris", experience: "Débutant", email: "monemail@gmail.com" },
        { id: 2, name: "Jean Martin", position: "Designer UX/UI", location: "Lyon", experience: "Intermédiaire", email: "monemail@gmail.com" },
        { id: 3, name: "Sophie Bernard", position: "Chef de Projet", location: "Marseille", experience: "Confirmé", email: "monemail@gmail.com" },
    ];
    const filteredCandidates = (activeTab === "candidates"
        ? candidates
        : activeTab === "favorites"
            ? favorites
            : activeTab === "candidatures"
                ? initialCandidatures // Affiche les candidatures si l'onglet est actif
                : candidates // Par défaut, affiche tous les candidats
    ).filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) &&
        (selectedPosition ? c.position === selectedPosition : true) &&
        (selectedLocation ? c.location === selectedLocation : true) &&
        (selectedExperience ? c.experience === selectedExperience : true)
    );

    const handleJobSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingJob) {
            setJobOffers(prev =>
                prev.map(job =>
                    job.id === editingJob.id ? { ...newJob, id: editingJob.id } : job
                )
            );
        } else {
            setJobOffers(prev => [...prev, { ...newJob, id: Date.now() }]);
        }

        setEditingJob(null);
        setNewJob({
            title: "",
            description: "",
            location: "",
            positionType: "CDI",
            experience: ""
        });
        setShowJobForm(false);
    };

    const handleDeleteJob = () => {
        if (jobToDelete !== null) {
            setJobOffers(prev => prev.filter(job => job.id !== jobToDelete));
            setJobToDelete(null);
            setShowConfirmationModal(false); // Ferme le modal après suppression
        }
    };

    const openConfirmationModal = (jobId: number) => {
        setJobToDelete(jobId);
        setShowConfirmationModal(true);
    };


    const handleViewProfile = (candidate: Candidate) => {
        setSelectedCandidate(candidate);
    };

    const handleCloseProfile = () => {
        setSelectedCandidate(null);
    };

    const handleContactCandidate = () => {
        // Logique pour contacter le candidat
        alert(`Contacter ${selectedCandidate?.name}`);
    };

    const handleDownloadCV = () => {
        // Logique pour télécharger le CV
        alert(`Télécharger le CV de ${selectedCandidate?.name}`);
    };

    const { isSignedIn } = useUser();

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md px-5 flex flex-col gap-4">
                <div className="flex">
                    <Link className="block text-teal-600" href="/">
                        <Image src="/profile-app-logo.png" width={110} height={40} alt="Logo Profile App" />
                    </Link>
                </div>
                <h2 className="text-2xl font-bold text-teal-600">Espace Recruteur</h2>
                <nav className="flex flex-col gap-2">

                    <button onClick={() => setActiveTab("candidates")} className={`flex items-center gap-2 p-2 rounded-md ${activeTab === "candidates" ? "bg-teal-200" : "hover:bg-teal-100"}`}>
                        <UserSearch /> Candidats
                    </button>
                    <button onClick={() => setActiveTab("jobs")} className={`flex items-center gap-2 p-2 rounded-md ${activeTab === "jobs" ? "bg-teal-200" : "hover:bg-teal-100"}`}>
                        <Briefcase /> Offres d&apos;emploi
                    </button>
                    <button onClick={() => setActiveTab("candidatures")} className={`flex items-center gap-2 p-2 rounded-md ${activeTab === "candidatures" ? "bg-teal-200" : "hover:bg-teal-100"}`}>
                        <UserCheck /> Mes Candidatures
                    </button>
                    <button onClick={() => setActiveTab("favorites")} className={`flex items-center gap-2 p-2 rounded-md ${activeTab === "favorites" ? "bg-teal-200" : "hover:bg-teal-100"}`}>
                        <Star /> Favoris
                    </button>
                    <button onClick={() => setActiveTab("tutoriels")} className={`flex items-center gap-2 p-2 rounded-md ${activeTab === "tutoriels" ? "bg-teal-200" : "hover:bg-teal-100"}`}>
                        <CircleHelp /> Tutoriel
                    </button>
                </nav>
                <button
                    onClick={() => setShowJobForm(true)}
                    className="bg-teal-600 text-white py-2 px-4 rounded-md flex items-center gap-2"
                >
                    <PlusCircle /> Publier une offre
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-5">
                <div className="flex justify-between gap-4 rounded-md items-center  px-4 py-1 mb-5 bg-white ">
                    <div className='flex gap-1 relative'>
                        <input
                            type="text"
                            placeholder="Rechercher un candidat..."
                            className="input bordered border-gray-600  focus:border-teal-600 focus:outline-none focus:border-2 w-auto pr-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Search className='w-11 absolute right-0 top-3 px-3' />
                    </div>
                    <div className="flex gap-4 justify-between items-center ">
                        <div className="relative">
                            <Bell className="fill-black cursor-pointer" />
                            <div className="absolute top-0 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                        </div>
                        {isSignedIn && <UserButton />}
                    </div>
                </div>
                {activeTab === "jobs" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {jobOffers.map((job) => (
                            <div key={job.id} className="bg-white p-4 shadow-md rounded-md relative group">
                                <div className="absolute top-2 right-2   transition-opacity">
                                    <button
                                        onClick={() => {
                                            setNewJob({
                                                title: job.title,
                                                description: job.description,
                                                location: job.location,
                                                positionType: job.positionType,
                                                experience: job.experience
                                            });
                                            setEditingJob(job);
                                            setShowJobForm(true);
                                        }}
                                        className="p-1 text-teal-600 hover:text-teal-800"
                                    >
                                        <Pen className="w-8 h-8 bg-slate-300 p-2 rounded-lg hover:bg-green-800 hover:text-white" />
                                    </button>
                                    <button
                                        onClick={() => openConfirmationModal(job.id)}
                                        className="p-1 text-red-600 hover:text-red-800 ml-2"
                                    >
                                        <Trash2 className="w-8 h-8 bg-slate-300 p-2 rounded-lg hover:bg-red-800 hover:text-white" />
                                    </button>
                                </div>

                                <button
                                    onClick={() => setPreviewJob(job)}
                                    className="flex items-center gap-2 p-2 bg-slate-300 rounded-lg text-sm text-teal-600  mb-2"
                                >
                                    Prévisualiser <Eye />
                                </button>
                                <h3 className="font-bold text-lg">{job.title}</h3>
                                <p className="text-gray-600">{job.positionType}</p>
                                <p className="text-sm text-gray-500">{job.location}</p>
                                <p className="text-sm text-gray-500">{job.experience}</p>
                                <p className="mt-2 text-gray-700">{job.description}</p>
                            </div>
                        ))}
                    </div>
                ) : activeTab === "candidatures" ? (
                    // Affichage des candidatures
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCandidates.length > 0 ? (
                            filteredCandidates.map((candidate) => (
                                <div key={candidate.id} className="bg-white p-4 shadow-lg rounded-md relative">
                                    <div className="flex gap-4 items-center">
                                        <div className="rounded-full  mb-2">
                                            <Image src="/Avatar6.jpg" width={100} height={100} className="rounded-full" alt="Candidat Photo Profil" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800">{candidate.name}</h3>
                                            <p className="text-gray-600">{candidate.position}</p>
                                            <p className="text-sm text-gray-500">{candidate.location}</p>
                                            <p className="text-sm text-gray-500">{candidate.experience}</p>
                                            <p className="text-sm text-gray-500">{candidate.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md mt-2"
                                            onClick={handleContactCandidate}
                                        >
                                            Contacter  <Mail />
                                        </button>
                                        <button className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md mt-2"
                                            onClick={() => handleViewProfile(candidate)}>
                                            Voir Profil  <Eye />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center col-span-3 text-gray-500">Aucun candidat trouvé.</p>
                        )}
                    </div>
                ) : activeTab === "tutoriels" ? (
                    <div className="p-4 bg-white rounded-md shadow-md">
                        <h2 className="text-3xl text-center text-teal-600 font-semibold mb-4">Bienvenue dans l&apos;Espace Recruteur</h2>
                        <p className="mb-4 text-justify text-gray-700 mx-4 ">
                            Bienvenue dans votre Espace Recruteur ! Cet outil a été conçu pour vous offrir une expérience de recrutement optimisée et intuitive. En un coup d&apos;œil, découvrez les différentes sections : sur la gauche, la barre latérale vous permet de naviguer entre la recherche de candidats, la gestion de vos offres d&apos;emploi, et vos profils favoris. En haut, la barre de recherche et les filtres vous aident à cibler les candidats idéaux, tandis que le bouton &quot;Publier une offre&quot; vous permet de diffuser vos opportunités en un clin d&apos;œil. Prêt à trouver votre prochain talent ? Laissez-vous guider et exploitez toutes les fonctionnalités à votre disposition !
                        </p>

                        <div className="space-y-4">
                            <details className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                                    <h2 className="font-medium">Comment publier une offre d&apos;emploi ?</h2>
                                    <span className="relative size-5 shrink-0">
                                        <CirclePlus className="absolute inset-0 size-5  opacity-100 group-open:opacity-0" />
                                        <CircleMinus className="absolute inset-0 size-5 opacity-0 group-open:opacity-100" />
                                    </span>

                                </summary>
                                <div className="mt-4 leading-relaxed text-gray-700">
                                    <p>
                                        En tant que recruteur, je souhaite publier une offre d&apos;emploi pour attirer des candidats qualifiés.
                                    </p>
                                    <p>
                                        Pour cela, cliquez sur le bouton <span className="font-semibold">&quot;Publier une offre&quot;</span> dans la barre latérale.
                                        Remplissez attentivement le formulaire avec toutes les informations nécessaires :
                                    </p>
                                    <ul className="list-disc ml-5">
                                        <li>Titre du poste</li>
                                        <li>Description du poste</li>
                                        <li>Localisation</li>
                                        <li>Type de contrat</li>
                                        <li>Expérience requise</li>
                                    </ul>
                                    <p>
                                        Une fois le formulaire soumis, votre offre sera visible par les candidats.
                                    </p>
                                </div>
                            </details>

                            <details className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                                    <h2 className="font-medium">Comment rechercher des candidats ?</h2>
                                    <span className="relative size-5 shrink-0">
                                        <CirclePlus className="absolute inset-0 size-5  opacity-100 group-open:opacity-0" />
                                        <CircleMinus className="absolute inset-0 size-5 opacity-0 group-open:opacity-100" />
                                    </span>
                                </summary>
                                <div className="mt-4 leading-relaxed text-gray-700">
                                    <p>
                                        En tant que recruteur, je souhaite trouver rapidement des profils pertinents parmi la base de données.
                                    </p>
                                    <p>
                                        Pour cela, vous disposez de plusieurs outils :
                                    </p>
                                    <ul className="list-disc ml-5">
                                        <li>
                                            La barre de recherche : entrez des mots-clés liés au poste, aux compétences ou au nom du candidat.
                                        </li>
                                        <li>
                                            Les filtres : affinez votre recherche par poste, localisation et niveau d&apos;expérience.
                                        </li>
                                    </ul>
                                    <p>
                                        Utilisez ces outils combinés pour une recherche efficace et ciblée.
                                    </p>
                                </div>
                            </details>

                            <details className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                                    <h2 className="font-medium">Comment ajouter un candidat aux favoris ?</h2>
                                    <span className="relative size-5 shrink-0">
                                        <CirclePlus className="absolute inset-0 size-5  opacity-100 group-open:opacity-0" />
                                        <CircleMinus className="absolute inset-0 size-5 opacity-0 group-open:opacity-100" />
                                    </span>
                                </summary>
                                <div className="mt-4 leading-relaxed text-gray-700">
                                    <p>
                                        En tant que recruteur, je souhaite sauvegarder les profils qui m&apos;intéressent pour les consulter ultérieurement.
                                    </p>
                                    <p>
                                        Pour cela, sur chaque carte de candidat, cliquez sur l&apos;icône en forme de marque page (<BookmarkPlus className="inline" size={16} />).
                                        Le candidat sera automatiquement ajouté à votre liste de favoris, accessible depuis l&apos;onglet <span className="font-semibold">&quot;Favoris&quot;</span>.
                                    </p>
                                </div>
                            </details>

                            <details className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                                    <h2 className="font-medium">Comment modifier ou supprimer une offre d&apos;emploi ?</h2>
                                    <span className="relative size-5 shrink-0">
                                        <CirclePlus className="absolute inset-0 size-5  opacity-100 group-open:opacity-0" />
                                        <CircleMinus className="absolute inset-0 size-5 opacity-0 group-open:opacity-100" />
                                    </span>
                                </summary>
                                <div className="mt-4 leading-relaxed text-gray-700">
                                    <p>
                                        En tant que recruteur, je souhaite pouvoir mettre à jour ou retirer une offre d&apos;emploi si nécessaire.
                                    </p>
                                    <p>
                                        Pour cela, rendez-vous dans l&apos;onglet <span className="font-semibold">&quot;Offres d&apos;emploi&quot;</span>.
                                        Survolez l&apos;offre que vous souhaitez modifier ou supprimer. Des icônes apparaîtront :
                                    </p>
                                    <ul className="list-disc ml-5">
                                        <li>
                                            <Pen className="inline" size={16} /> : pour modifier l&apos;offre.
                                        </li>
                                        <li>
                                            <Trash2 className="inline" size={16} /> : pour supprimer l&apos;offre (une confirmation vous sera demandée).
                                        </li>
                                    </ul>
                                </div>
                            </details>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Search & Filters */}
                        <div className="flex flex-wrap w-auto gap-4 mb-5">
                            <button className="btn bg-teal-600 text-lg hover:bg-white" >
                                <Filter className="fill-black" /> Filtre
                            </button>
                            <select className="select select-bordered" value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}>
                                <option value="">Poste</option>
                                {jobPositions.map((position, index) => (
                                    <option key={index} value={position}>{position}</option>
                                ))}
                            </select>
                            <select className="select select-bordered" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                                <option value="">Localisation</option>
                                {locations.map((location, index) => (
                                    <option key={index} value={location}>{location}</option>
                                ))}
                            </select>
                            <select className="select select-bordered" value={selectedExperience} onChange={(e) => setSelectedExperience(e.target.value)}>
                                <option value="">Expérience</option>
                                {experiences.map((exp, index) => (
                                    <option key={index} value={exp}>{exp}</option>
                                ))}
                            </select>
                        </div>

                        {/* Candidate Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredCandidates.length > 0 ? (
                                filteredCandidates.map((candidate) => (
                                    <div key={candidate.id} className="bg-white p-4 shadow-lg rounded-md relative">
                                        <div className="flex gap-4 items-center">
                                            <div className="rounded-full  mb-2">
                                                <Image src="/Avatar6.jpg" width={100} height={100} className="rounded-full" alt="Candidat Photo Profil" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800">{candidate.name}</h3>
                                                <p className="text-gray-600">{candidate.position}</p>
                                                <p className="text-sm text-gray-500">{candidate.location}</p>
                                                <p className="text-sm text-gray-500">{candidate.experience}</p>
                                                <p className="text-sm text-gray-500">{candidate.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md mt-2"
                                                onClick={handleContactCandidate}
                                            >
                                                Contacter  <Mail />
                                            </button>
                                            <button
                                                className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md mt-2"
                                                onClick={() => handleViewProfile(candidate)}
                                            >
                                                Voir Profil  <Eye />
                                            </button>
                                        </div>
                                        <a
                                            className="cursor-pointer absolute top-0 right-2"
                                            onClick={() => toggleFavorite(candidate)}
                                        >
                                            {favorites.some(f => f.id === candidate.id) ? <BookmarkMinus className="fill-teal-600 " size={35} /> : <BookmarkPlus size={35} />}
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center col-span-3 text-gray-500">Aucun candidat trouvé.</p>
                            )}
                        </div>
                    </>
                )}

            </main>

            {/* Modal de confirmation de suppression */}
            {showConfirmationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg font-bold mb-4">Confirmer la suppression</h2>
                        <p>Êtes-vous sûr de vouloir supprimer cette offre d&apos;emploi ?</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setShowConfirmationModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-md"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDeleteJob}
                                className="px-4 py-2 bg-red-600 text-white rounded-md"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de profil du candidat */}
            {selectedCandidate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative">
                        <button
                            onClick={handleCloseProfile}
                            className="absolute top-4 right-4 p-2 bg-slate-300 rounded-lg"
                        >
                            <X />
                        </button>
                        <div className="flex gap-4 items-center">
                            <div className="rounded-full  mb-2">
                                <Image src="/Avatar6.jpg" width={100} height={100} className="rounded-md" alt="Candidat Photo Profil" />
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-800">{selectedCandidate.name}</h2>
                                <p className="text-gray-600">{selectedCandidate.position}</p>
                                <p className="text-sm text-gray-500">{selectedCandidate.location}</p>
                                <p className="text-sm text-gray-500">{selectedCandidate.experience}</p>
                                <p className="text-sm text-gray-500">{selectedCandidate.email}</p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md"
                                onClick={handleContactCandidate}
                            >
                                Contacter <Mail />
                            </button>
                            <button
                                className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md"
                                onClick={handleDownloadCV}
                            >
                                Télécharger CV <Download />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {previewJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative">
                        <button
                            onClick={() => setPreviewJob(null)}
                            className="absolute top-4 right-4 p-2 bg-slate-300 rounded-lg"
                        >
                            <X />
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{previewJob.title}</h2>
                        <p className="text-gray-700 mb-4">{previewJob.description}</p>
                        <div className="flex justify-between">
                            <p>Localisation: {previewJob.location}</p>
                            <p>Type de poste: {previewJob.positionType}</p>
                            <p>Expérience: {previewJob.experience}</p>
                        </div>
                    </div>
                </div>
            )}
            {showJobForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                        <button
                            onClick={() => {
                                setShowJobForm(false)
                                setEditingJob(null)
                                setNewJob({
                                    title: "",
                                    description: "",
                                    location: "",
                                    positionType: "CDI",
                                    experience: ""
                                })
                            }}
                            className="absolute top-4 right-4 p-2 bg-slate-300 rounded-lg"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h3 className="text-xl font-bold mb-4">
                            {editingJob ? "Modifier l'offre" : "Nouvelle offre d'emploi"}
                        </h3>

                        <button
                            type="button"
                            onClick={() => setPreviewJob({ ...newJob, id: 0 })}
                            className="flex items-center mb-4 text-teal-600 hover:text-teal-800 text-sm p-2 bg-slate-300 rounded-lg"
                        >
                            Prévisualiser l&apos;offre <Eye className="ml-2" />
                        </button>

                        <form onSubmit={handleJobSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-2">Titre du poste</label>
                                <input
                                    type="text"
                                    required
                                    className="input input-bordered w-full"
                                    value={newJob.title}
                                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Description</label>
                                <textarea
                                    required
                                    className="textarea textarea-bordered w-full"
                                    value={newJob.description}
                                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Localisation</label>
                                <select
                                    className="select select-bordered w-full"
                                    value={newJob.location}
                                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                                    required
                                >
                                    <option value="">Sélectionnez une localisation</option>
                                    {locations.map((location, index) => (
                                        <option key={index} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2">Type de poste</label>
                                <select
                                    className="select select-bordered w-full"
                                    value={newJob.positionType}
                                    onChange={(e) => setNewJob({ ...newJob, positionType: e.target.value })}
                                >
                                    <option value="CDI">CDI</option>
                                    <option value="CDD">CDD</option>
                                    <option value="Freelance">Freelance</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2">Expérience requise</label>
                                <select
                                    className="select select-bordered w-full"
                                    value={newJob.experience}
                                    onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                                    required
                                >
                                    <option value="">Sélectionnez l&apos;expérience</option>
                                    {experiences.map((exp, index) => (
                                        <option key={index} value={exp}>{exp}</option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="btn bg-green-700 text-white text-lg w-full hover:bg-green-500">
                                {editingJob ? "Modifier l'offre" : "Publier l'offre"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecruiterDashboard;
