"use client";
import React, { useEffect, useState } from "react";
import { Search, Briefcase, Star, PlusCircle, X, UserSearch, UserCheck, CircleHelp, Bell, Filter, BookmarkPlus, BookmarkMinus, Mail, Eye, Pen, Trash2, Download, CirclePlus, CircleMinus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { getDataJober,  } from "../actions";



type JobOffer = {
    id: string;
    jobTitle: string;
    companyName: string;
    locationJob: string;
    typeJob: string;
    description: string;
    salary?: string | null;
};

type Candidate = {
    id: string;
    fullName: string;
    postSeeking: string | null;
    address: string;
    phone: string;
    email: string;
    photoUrl: string | null;
    linkedin: string;
    description: string | null;
};



const RecruiterDashboard = () => {
    const { user, isSignedIn } = useUser();
    const userId = user?.id;
    const [search, setSearch] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [favorites, setFavorites] = useState<Candidate[]>([]);
    const [activeTab, setActiveTab] = useState("candidates");
    const [showJobForm, setShowJobForm] = useState(false);
    const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
    const [newJob, setNewJob] = useState<Omit<JobOffer, 'id'>>({
        jobTitle: "",
        companyName: "",
        locationJob: "",
        typeJob: "",
        description: "",
        salary: ""
    });
    const [editingJob, setEditingJob] = useState<JobOffer | null>(null);
    const [previewJob, setPreviewJob] = useState<JobOffer | null>(null);
    const [jobToDelete, setJobToDelete] = useState<string | null>(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const data = await getDataJober();
                if (Array.isArray(data)) {
                    // Correct mapping based on your schema
                    const mappedCandidates: Candidate[] = data.map((item: unknown) => ({
                        id: (item as Candidate).id,
                        fullName: (item as Candidate).fullName,
                        postSeeking: (item as Candidate).postSeeking || null,
                        address: (item as Candidate).address,
                        phone: (item as Candidate).phone,
                        email: (item as Candidate).email,
                        photoUrl: (item as Candidate).photoUrl || null,
                        linkedin: (item as Candidate).linkedin,
                        description: (item as Candidate).description || null
                    }));
                    setCandidates(mappedCandidates);
                } else {
                    console.error("Failed to fetch candidates");
                }
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        };

        fetchCandidates();
    }, []);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (candidate: Candidate) => {
        setFavorites((prev) =>
            prev.some((fav) => fav.id === candidate.id)
                ? prev.filter((fav) => fav.id !== candidate.id)
                : [...prev, candidate]
        );
    };

    useEffect(() => {
        const fetchJobOffers = async () => {
            if (!userId) {
                console.error("Cet utilisateur n'est pas connecté");
                return;
            }
            try {
                const jobs = await getAllJobOffers(userId);
                setJobOffers(jobs);
            } catch (err) {
                console.error("Erreur lors de la récupération des offres :", err);
            }
        };

        fetchJobOffers();
    }, [userId]);

    const initialCandidatures: Candidate[] = [
        { id: "1", fullName: "Alice Dupont", postSeeking: "Développeur Web", address: "Paris", phone: "", email: "monemail@gmail.com", photoUrl: null, linkedin: "", description: null },
        { id: "2", fullName: "Jean Martin", postSeeking: "Designer UX/UI", address: "Lyon", phone: "", email: "monemail@gmail.com", photoUrl: null, linkedin: "", description: null },
        { id: "3", fullName: "Sophie Bernard", postSeeking: "Chef de Projet", address: "Marseille", phone: "", email: "monemail@gmail.com", photoUrl: null, linkedin: "", description: null },
    ];
    const filteredCandidates = (activeTab === "candidates"
        ? candidates
        : activeTab === "favorites"
            ? favorites
            : activeTab === "candidatures"
                ? initialCandidatures // Affiche les candidatures si l'onglet est actif
                : candidates // Par défaut, affiche tous les candidats
    ).filter((c) =>
        c.fullName.toLowerCase().includes(search.toLowerCase()) &&
        (selectedPosition ? c.postSeeking === selectedPosition : true) &&
        (selectedLocation ? c.address === selectedLocation : true)
    );

    const handleJobSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) {
            console.error("User ID is missing");
            return;
        }

        try {
            if (editingJob) {
                // Mettre à jour l'offre existante
                if (newJob && typeof newJob === 'object') {
                    const result = await updateJobOffer(editingJob.id.toString(), { ...newJob, salary: newJob.salary || undefined });
                    setJobOffers((prev) =>
                        prev.map((job) => (job.id === editingJob.id ? result : job))
                    );
                } else {
                    console.error("New job data is missing or invalid");
                }
            } else {
                // Créer une nouvelle offre
                if (newJob && typeof newJob === 'object') {
                    const result = await createJobOffer({ ...newJob, salary: newJob.salary || undefined }, userId);
                    setJobOffers((prev) => [...prev, result]);
                } else {
                    console.error("New job data is missing or invalid");
                }
            }
            setNewJob({ jobTitle: "", companyName: "", locationJob: "", typeJob: "", description: "", salary: "" });
            setShowJobForm(false);
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'offre :", error);
        }
    };

    const handleDeleteJob = async () => {
        if (!userId) {
            console.error("User ID is missing");
            return;
        }
        if (jobToDelete !== null) {
            const result = await deleteJobOffer(jobToDelete, userId);
            if (result && result.success) {
                setJobOffers(jobOffers.filter((job) => job.id !== jobToDelete));
                setJobToDelete(null);
                setShowConfirmationModal(false); // Ferme le modal après suppression
            } else {
                alert("Erreur lors de la suppression de l'offre d'emploi.");
            }
        } else {
            console.error("Job to delete is missing");
        }
    };

    const openConfirmationModal = (jobId: string) => {
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
        alert(`Contacter ${selectedCandidate?.fullName}`);
    };

    const handleDownloadCV = () => {
        // Logique pour télécharger le CV
        alert(`Télécharger le CV de ${selectedCandidate?.fullName}`);
    };





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
                                                jobTitle: job.jobTitle,
                                                companyName: job.companyName,
                                                salary: job.salary || "",
                                                description: job.description,
                                                locationJob: job.locationJob,
                                                typeJob: job.typeJob,
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
                                <h3 className="font-bold text-lg">{job.jobTitle}</h3>
                                <p className="text-gray-600">{job.typeJob}</p>
                                <p className="text-sm text-gray-500">{job.locationJob}</p>
                                <p className="text-sm text-gray-500">{job.salary}</p>
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
                                            <h3 className="font-bold text-gray-800">{candidate.fullName}</h3>
                                            <p className="text-gray-600">{candidate.postSeeking}</p>
                                            <p className="text-sm text-gray-500">{candidate.address}</p>
                                            <p className="text-sm text-gray-500">{candidate.linkedin}</p>
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
                                {candidates.map((postSeeking, index) => (
                                    <option key={index} value={postSeeking.postSeeking || ''}>{postSeeking.postSeeking}</option>
                                ))}
                            </select>
                            <select className="select select-bordered" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                                <option value="">Localisation</option>
                                {candidates.map((Address, index) => (
                                    <option key={index} value={Address.address}>{Address.address}</option>
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
                                                <h3 className="font-bold text-gray-800">{candidate.fullName}</h3>
                                                <p className="text-gray-600">Poste: {candidate.postSeeking}</p>
                                                <p className="text-sm text-gray-500">Addrese: {candidate.address}</p>
                                                <p className="text-sm text-gray-500">Email: {candidate.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md mt-2"

                                            >
                                                <a href={`mailto:${selectedCandidate?.email}`} className="flex items-center gap-2 ">
                                                    Contacter  <Mail />
                                                </a>
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
                                <h2 className="font-bold text-gray-800">{selectedCandidate.fullName}</h2>
                                <p className="text-gray-600">{selectedCandidate.postSeeking}</p>
                                <p className="text-sm text-gray-500">{selectedCandidate.address}</p>
                                <p className="text-sm text-gray-500">{selectedCandidate.email}</p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md mt-2"

                            >
                                <a href={`mailto:${selectedCandidate?.email}`} className="flex items-center gap-2 ">
                                    Contacter  <Mail />
                                </a>
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
                        <h2 className="text-2xl font-bold mb-4">{previewJob.jobTitle}</h2>
                        <p className="text-gray-700 mb-4">{previewJob.description}</p>
                        <div className="flex justify-between">
                            <p>Localisation: {previewJob.locationJob}</p>
                            <p>Type de poste: {previewJob.typeJob}</p>
                            <p>Salaire: {previewJob.salary}</p>
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
                                    jobTitle: "",
                                    companyName: "",
                                    locationJob: "",
                                    typeJob: "",
                                    description: "",
                                    salary: ""
                                })
                            }}
                            className="absolute top-4 right-4 p-2 bg-slate-300 rounded-lg"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h3 className="text-xl font-bold mb-4">
                            {editingJob ? "Modifier l'offre" : "Nouvelle offre d'emploi"}
                        </h3>



                        <form onSubmit={handleJobSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-2">Titre du poste</label>
                                <input
                                    type="text"
                                    required
                                    className="input input-bordered w-full"
                                    value={newJob.jobTitle}
                                    onChange={(e) => setNewJob({ ...newJob, jobTitle: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Nom de l&apos;entreprise</label>
                                <input
                                    type="text"
                                    required
                                    className="input input-bordered w-full"
                                    value={newJob.companyName}
                                    onChange={(e) => setNewJob({ ...newJob, companyName: e.target.value })}
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
                                <label className="block mb-2">Localisation du poste</label>
                                <input
                                    type="text"
                                    required
                                    className="input input-bordered w-full"
                                    value={newJob.locationJob}
                                    onChange={(e) => setNewJob({ ...newJob, locationJob: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Type de poste</label>
                                <select
                                    required
                                    className="select select-bordered w-full"
                                    value={newJob.typeJob}
                                    onChange={(e) => setNewJob({ ...newJob, typeJob: e.target.value })}
                                >
                                    <option value="">Sélectionner le type de poste</option>
                                    <option value="CDI">CDI</option>
                                    <option value="CDD">CDD</option>
                                    <option value="Stage">Stage</option>
                                    <option value="Alternance">Alternance</option>
                                    <option value="Freelance">Freelance</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2">Salaire</label>
                                <input
                                    type="text"
                                    required
                                    className="input input-bordered w-full"
                                    value={newJob.salary ?? ""}
                                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                                />
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
